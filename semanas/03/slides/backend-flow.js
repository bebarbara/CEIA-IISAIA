/**
 * Backend Flow — interactive 2D diagram for §1.4
 *
 * Renders a vertical pipeline of the six backend pieces (HTTP -> REST ->
 * Endpoints -> Datos -> branch to Errores/Salto) and a side detail panel
 * that updates as you advance through the steps.
 *
 * Click "Avanzar" to step forward. At step 4 (Datos), a random outcome
 * (70% success / 30% error) is rolled to determine which branch lights
 * up at step 5. "Reiniciar" returns to the idle state.
 *
 * Usage:
 *   initBackendFlow({ containerId: 's14-backend-flow' })
 *
 * Dependencies on the page (loaded via CDN in <head>):
 *   - lucide (icons)
 *   - gsap is optional; if absent, transitions fall back to CSS
 */

function initBackendFlow(opts) {
  var container = document.getElementById(opts.containerId);
  if (!container) return;

  var STEPS = {
    1: {
      key: 'http',
      title: 'HTTP — el protocolo',
      desc: 'El servidor desempaca el pedido. Lee método (POST), ruta (/projects/4/tasks), headers y body. Es el idioma común con el que cliente y servidor se entienden.',
      code: 'POST /projects/4/tasks  HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\n\n{ "title": "Bibliografia" }'
    },
    2: {
      key: 'rest',
      title: 'REST — el estilo',
      desc: 'A partir de la URL reconoce el recurso solicitado. Sustantivo en plural, jerarquía explícita: tasks pertenece a projects/4. La acción viaja en el verbo, no en la ruta.',
      code: 'recurso : tasks\nparent  : projects/4\nformato : JSON'
    },
    3: {
      key: 'endpoints',
      title: 'Endpoints — el contrato',
      desc: 'Match contra la tabla de endpoints. Encuentra el handler que cumple este contrato: method + path + schema-in + schema-out + status codes.',
      code: 'POST /projects/{id}/tasks\n  in  : { title, due_date? }\n  201 : { id, title, project_id }\n  400 : title requerido\n  404 : proyecto no existe'
    },
    4: {
      key: 'datos',
      title: 'Datos — la memoria',
      desc: 'El handler ejecuta el INSERT. Es el momento de la verdad: la base puede aceptar la escritura o rechazarla por sus propias reglas (foreign keys, NOT NULL, etc.).',
      code: 'INSERT INTO tasks\n  (title, project_id)\nVALUES (?, ?);'
    },
    '5-success': {
      key: 'salto',
      title: 'Salto — response 200',
      desc: 'La base aceptó el INSERT. El handler arma la respuesta con el objeto creado, headers set, status 200. La cadena cierra y el cliente recibe el JSON.',
      code: '< 200 OK\nContent-Type: application/json\n\n{ "id": 17,\n  "title": "Bibliografia",\n  "project_id": 4,\n  "due_date": null }'
    },
    '5-error': {
      key: 'errores',
      title: 'Errores — response 500',
      desc: 'La base rechaza la inserción. El handler captura la excepción, escribe el stack trace al log y devuelve 500. Hay evidencia que se le puede pasar a la IA para razonar el fix.',
      code: '< 500 Internal Server Error\n\nlog:\n  IntegrityError: NOT NULL\n  constraint failed: project_id\n  app/routes/tasks.py:14'
    }
  };

  var state = {
    step: 0,           // 0 = idle, 1..4 = linear steps, 5 = branch (final)
    outcome: null      // 'success' | 'error' (rolled at step 4)
  };

  function render() {
    container.innerHTML = '' +
      '<div class="s14-grid">' +
        '<div class="s14-pipeline">' +
          buildNode('http',      'HTTP',      'protocolo',  'globe',          1) +
          buildArrow() +
          buildNode('rest',      'REST',      'estilo',     'git-fork',       2) +
          buildArrow() +
          buildNode('endpoints', 'Endpoints', 'contract',   'plug-zap',       3) +
          buildArrow() +
          buildNode('datos',     'Datos',     'memoria',    'database',       4) +
          buildFork() +
          '<div class="s14-branch-row">' +
            buildNode('errores', 'Errores',   'leer fallas', 'alert-triangle', '5-error',   's14-branch-node') +
            buildNode('salto',   'Salto',     'al stack',    'terminal-square','5-success', 's14-branch-node') +
          '</div>' +
        '</div>' +
        '<div class="s14-detail" id="s14-detail">' +
          '<div class="s14-detail-meta">paso 0 / 5</div>' +
          '<div class="s14-detail-title">Click en "Avanzar" para recorrer una request paso a paso</div>' +
          '<div class="s14-detail-desc">En el paso 4 se tira el dado: 70% sale 200 OK por Salto, 30% sale 500 por Errores. Los dos caminos los vas a leer durante la clase.</div>' +
          '<pre class="s14-detail-code"><code></code></pre>' +
        '</div>' +
      '</div>' +
      '<div class="s14-controls">' +
        '<button class="s14-button" data-action="next">Avanzar</button>' +
        '<button class="s14-button s14-button-ghost" data-action="reset">Reiniciar</button>' +
        '<span class="s14-progress" id="s14-progress">listo</span>' +
      '</div>';

    if (typeof lucide !== 'undefined') {
      try { lucide.createIcons({ attrs: { width: 22, height: 22 } }); } catch (e) {}
    }

    container.querySelector('[data-action="next"]').addEventListener('click', advance);
    container.querySelector('[data-action="reset"]').addEventListener('click', reset);
  }

  function buildNode(key, label, sub, icon, step, extraClass) {
    return '<div class="s14-node ' + (extraClass || '') + '" data-step="' + step + '" data-key="' + key + '">' +
      '<i data-lucide="' + icon + '" class="s14-node-icon"></i>' +
      '<div class="s14-node-label">' + label + '</div>' +
      '<div class="s14-node-sub">' + sub + '</div>' +
    '</div>';
  }

  function buildArrow() {
    return '<div class="s14-arrow"></div>';
  }

  function buildFork() {
    return '<div class="s14-fork"></div>';
  }

  function advance() {
    if (state.step >= 5) return;

    if (state.step === 3) {
      // About to advance into Datos. Roll the dice now so the branch is
      // already decided once Datos is active.
      state.outcome = Math.random() < 0.70 ? 'success' : 'error';
    }

    state.step += 1;
    applyState();
  }

  function reset() {
    state.step = 0;
    state.outcome = null;
    applyState();
  }

  function applyState() {
    // Clear previous classes on all nodes
    container.querySelectorAll('.s14-node').forEach(function (el) {
      el.classList.remove('is-active', 'is-visited', 'is-success', 'is-error', 'is-dimmed');
    });

    var stepNum = state.step;
    var detail = container.querySelector('#s14-detail');
    var progress = container.querySelector('#s14-progress');
    var nextBtn = container.querySelector('[data-action="next"]');

    // Mark nodes 1..min(step, 4) as visited
    for (var i = 1; i <= Math.min(stepNum, 4); i++) {
      var el = container.querySelector('.s14-node[data-step="' + i + '"]');
      if (!el) continue;
      el.classList.add(i === stepNum ? 'is-active' : 'is-visited');
    }

    // Branch nodes (always visible). At step 5, light the chosen one and dim the other.
    var errorEl = container.querySelector('.s14-node[data-step="5-error"]');
    var successEl = container.querySelector('.s14-node[data-step="5-success"]');
    if (stepNum === 5) {
      if (state.outcome === 'success') {
        successEl.classList.add('is-active', 'is-success');
        errorEl.classList.add('is-dimmed');
      } else {
        errorEl.classList.add('is-active', 'is-error');
        successEl.classList.add('is-dimmed');
      }
    }

    // Update detail panel
    var stepKey = stepNum;
    if (stepNum === 5) {
      stepKey = state.outcome === 'success' ? '5-success' : '5-error';
    }

    var info = STEPS[stepKey];
    if (info) {
      var titleColor = (stepNum === 5)
        ? (state.outcome === 'success' ? '#10b981' : '#ef4444')
        : 'var(--accent)';
      detail.innerHTML = '' +
        '<div class="s14-detail-meta">paso ' + stepNum + ' / 5' +
          (stepNum === 4 && state.outcome ?
            ' &middot; <span style="color:' + (state.outcome === 'success' ? '#10b981' : '#ef4444') + '">dado: ' + (state.outcome === 'success' ? 'éxito' : 'error') + '</span>'
            : '') +
        '</div>' +
        '<div class="s14-detail-title" style="color: ' + titleColor + ';">' + info.title + '</div>' +
        '<div class="s14-detail-desc">' + info.desc + '</div>' +
        '<pre class="s14-detail-code"><code>' + escapeHtml(info.code) + '</code></pre>';
    } else {
      // Idle state
      detail.innerHTML = '' +
        '<div class="s14-detail-meta">paso 0 / 5</div>' +
        '<div class="s14-detail-title">Click en "Avanzar" para recorrer una request paso a paso</div>' +
        '<div class="s14-detail-desc">En el paso 4 se tira el dado: 70% sale 200 OK por Salto, 30% sale 500 por Errores. Los dos caminos los vas a leer durante la clase.</div>' +
        '<pre class="s14-detail-code"><code></code></pre>';
    }

    // Update progress and button
    if (stepNum === 0) {
      progress.textContent = 'listo';
      progress.className = 's14-progress';
    } else if (stepNum < 5) {
      progress.textContent = 'paso ' + stepNum + ' / 5';
      progress.className = 's14-progress';
    } else {
      progress.textContent = state.outcome === 'success' ? '200 OK' : '500 ERROR';
      progress.className = 's14-progress ' + (state.outcome === 'success' ? 'success' : 'error');
    }

    nextBtn.disabled = stepNum >= 5;
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  render();
  applyState();
}
