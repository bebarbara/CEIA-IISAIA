# Shared Resources

## Contents
- `templates/week-template.html` — Base reveal.js template. Copy to `semanas/NN/slides/index.html` and replace placeholders (NN, TOPIC_TITLE) to start a new week.

## How to Use

For a new week:
1. Create `semanas/NN/` with subfolders: `source_material/`, `slides/`, `img/`.
2. Add source material markdown files to `source_material/` with an `index.md` listing the structure.
3. Inside `semanas/NN/`, run `/build-class`. The slide-generation skill takes over:
   - Phase 1: brainstorms the didactic spine and writes `spine.md`.
   - Phase 2: writes `plan.md` (one task per section).
   - Phase 3: generates `slides/index.html` section by section, with review checkpoints.
   - Phase 4: verifies and commits.

For manual setup (no skill): copy `templates/week-template.html` to `semanas/NN/slides/index.html`, replace `NN` with the week number and `TOPIC_TITLE` with the week's topic from `programa.md`, then add slide `<section>` elements following `_config/slide-conventions.md`.

## Patterns reference

- `_config/slide-conventions.md` — formatting rules.
- `_config/theme/components.css` — CSS classes for slide components.
- `shared/patterns/` — HTML snippet library, one per recurring slide pattern.
- `tools/skills/slide-generation/voice-and-didactics.md` — voice and didactic principles.
- `tools/skills/slide-generation/animation-pattern.md` — animation contract and reuse policy.
