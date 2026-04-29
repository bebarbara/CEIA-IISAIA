# Voice and Didactic Principles

Loaded by the `slide-generation` skill at the start of phase 1 (brainstorm) and consulted at every per-section review checkpoint in phase 3.

## Voice

- **Spanish, technical-but-accessible** for diploma-level students.
- **Second-person collaborative.** Address the student. "Vamos a ver", "podés probar", "recordá que".
- **Imperative for actions.** "Abrí Tik Tokenizer", "ejecutá el script", "mirá la salida".
- **Rhetorical questions for engagement.** "¿Qué pasa si...?", "¿Por qué la red predice esto?".
- **First-person plural for shared discovery.** "Vamos a abrir la caja negra", "estamos viendo cómo".

## Anti-AI-filler vocabulary

Never use:
- "revolucionario", "potenciar", "de vanguardia", "seamless", "robusto", "leverage", "streamline"
- "increíble", "asombroso", "espectacular" as filler intensifiers
- "Bienvenidos a esta increíble jornada de aprendizaje" — no welcome boilerplate.

CTAs and headings must be specific: "Ver tokenización en vivo", not "Empezar".

## Didactic principles distilled from week 01

1. **Hook before explanation.** Open a section with a mystery, question, or visual surprise when the section warrants it. Not every section. Never start with a definition.

2. **Why before what.** Motivate the filter before showing the filter. Motivate the algorithm before naming it. The student should understand the *problem the technique solves* before learning the technique's name.

3. **Layer-by-layer concept building.** Each slide assumes only what came before. Don't reference forward.

4. **Concrete numbers over abstractions.** "15 trillion tokens" not "a lot of data". "100,277 tokens" not "many vocabulary entries". "405B parameters" not "huge".

5. **Analogies bridge to the familiar.** Book pages = learning modes. Spiders = web crawl. Use one when it earns its keep — when an abstract idea becomes graspable through a concrete familiar domain. SKIP when the topic is already concrete enough that an analogy would dilute, not clarify.

6. **No bullet-list slides.** A slide whose entire content is a `<ul>` (with or without fragments) is a code smell. Replace with: a comparison-2col, a flow-with-arrows, a data-table, an annotated diagram, an animated demo. Visual structure carries the meaning.

7. **Live demo > prose explanation** when the concept is observable. If you can show inference happening, run inference. If you can show a tokenizer's output, embed the tokenizer animation.

## Speaker notes structure

Speaker notes go in `<aside class="notes">` blocks. **Two labeled blocks** separate silent stage direction from what the professor actually says aloud:

```html
<aside class="notes">
  <p><strong>Pantalla:</strong> Lo que el slide muestra y qué hacer en silencio. Cuándo abrir otra pestaña. Qué fragmento se revela. Qué demostración correr antes de avanzar.</p>
  <p><strong>Decir:</strong> "Lo que sale de tu boca, en primera persona, conversacional. Hooks, preguntas retóricas, transiciones. Como si fuera un guion de clase."</p>
</aside>
```

Rules:
- **`Decir:` is always present.** Even short slides have something to say.
- **`Pantalla:` appears only when there's silent stage direction.** If the slide just needs to be spoken without demos/tab-switches/specific things to point at, omit the `Pantalla:` block.
- **`Decir:` content goes in quotes** to make it scannable as "this is the script". Use natural conversational Spanish — second-person ("vamos a", "podés"), rhetorical questions, the actual phrasing the professor would use.
- **Word count target: ~80–200 words combined**, weighted toward `Decir:`. Stage direction stays terse.
- **Don't paraphrase the slide content in `Decir:`** — students can read the slide. Speak the *connective tissue*: why this slide matters, what to emphasize, the transition to the next idea.

## Tone calibration

The voice is "smart professor talking to capable students who are seeing this for the first time". It is NOT:
- A textbook (too distant, too dense).
- A blog post (too casual, too marketing).
- A whiteboard scribble (too sparse, too unstructured).

It IS:
- A live lecture script written down.
- The professor's voice as they would speak it, with hooks, analogies, demos, and calls to do something.

## Anti-patterns to refuse

- Bullet-list slides
- Emojis in slide content (anywhere)
- AI-sounding filler vocabulary (above)
- Placeholder text in committed files
- Em-dash overuse — one per slide max
- Gratuitous gradients, glassmorphism, purple-dominant palettes
- Headings that don't inform ("Introducción", "Resumen", "Conclusión" without specifics)
