# DecisionLab

An interactive client-advisory workspace for practising structured decisions with incomplete information, competing constraints, and a clock that keeps moving.

[Play DecisionLab](https://sirnicson.github.io/decisionlab/) · [Report an issue](https://github.com/sirnicson/decisionlab/issues)

## Why I built it

DecisionLab began with a simple question: could a problem-solving exercise feel less like a quiz and more like doing the work?

I wanted the learner to investigate a situation, decide what evidence matters, calculate an answer, make a recommendation, and then see how those choices hold together. That idea grew into two connected environmental workstreams for the fictional Fairhaven Environmental Trust.

- **Red Rock** asks you to turn research and numerical analysis into a decision-ready recommendation.
- **Sea Wolf** asks you to profile environmental sites, route microbial candidates, and assemble viable treatments.

Both can be explored in **Learning Mode**, with contextual guidance, or paired in **Simulation Mode** for a timed, feedback-light run.

## The journey so far

The first versions proved the core workflows. Later iterations focused on making every action carry through the experience: collected evidence became a working Research Journal, calculations became reusable results, reports became part of the decision rather than a final form, and feedback became a client debrief rather than a detached score.

The project also became stricter as it matured. Scenario data moved out of UI components, scoring and validation gained dedicated engine modules, browser state received version-aware persistence, and fixed datasets gained tests for their invariants and feasible outcomes. Recent releases have concentrated on clarity, consistency, accessibility, and giving the workspace enough visual calm for the reasoning to remain central.

DecisionLab is now at V2.4.8. It is playable end to end, but it is still a place to experiment. Better explanations, sharper interactions, additional accessibility work, new scenarios, and thoughtful challenges to the underlying assumptions are all welcome.

## What you will encounter

### Red Rock studies

Choose Salvanova Forest, Caldera Marsh, or Norvale Highlands and work through:

`Investigation → Analysis → Written Report → Graph Selection → Visual Report → Client Review`

Evidence can be collected into a Research Journal and reused across the assignment. An integrated calculator keeps a persistent history, and the final review connects the recommendation back to the decisions that produced it.

### Sea Wolf studies

Choose Cinder Bay, Tidal Reach, or Azure Shelf and work across three connected sites:

`Site profile → Categorisation → Prospect selection → Treatment → Client Review`

You identify site needs, route candidates, build a prospect pool, and select a three-microbe treatment. The datasets are deterministic so different approaches can be compared and tested reliably.

## Play locally

DecisionLab requires Node.js 20 or newer.

```bash
git clone https://github.com/sirnicson/decisionlab.git
cd decisionlab
npm ci
npm run dev
```

Open the local URL shown by Vite.

To run the project checks:

```bash
npm test
npm run build
```

For the browser smoke test, install Chromium once:

```bash
npx playwright install chromium
npm run test:e2e
```

## How it is organised

```text
src/
  app/          application shell and session state
  components/   shared interface pieces
  data/         scenario and research datasets
  engine/       persistence, scoring, access, and validation
  features/     home, Red Rock, Sea Wolf, and results
  hooks/        shared React hooks
  styles/       application styling
  types/        shared TypeScript types
tests/e2e/      browser-level journeys
docs/           design history, scientific basis, and validation notes
```

The application is built with React, TypeScript, and Vite. Vitest covers the scoring, persistence, access, and fixed-data rules; Playwright covers the main browser journey. GitHub Actions runs validation, tests, the production build, and the browser smoke test on every push and pull request.

## Contributing

You are welcome to play first, break things, and tell me what felt unclear. Contributions can be as small as correcting a sentence or as ambitious as proposing a new case.

A useful contribution usually starts with one of these:

- open an issue describing the behaviour, idea, or learning friction;
- keep scenario facts separate from scoring and interface code;
- add or update tests when changing mechanics or fixed data;
- preserve keyboard access and non-drag alternatives in interactive flows;
- explain significant design or data decisions in `docs/`.

For code changes, fork the repository, create a focused branch, run `npm test`, `npm run build`, and `npm run test:e2e`, then open a pull request with a short explanation of what changed and why.

## Data and independence

The cases use synthetic learner-facing values informed by ecological, geographical, environmental-microbiology, and bioremediation research. Sea Wolf attributes are game indices, not laboratory measurements. See [the scientific basis](docs/SCIENTIFIC_BASIS.md) for the research and modelling boundaries.

DecisionLab is an independent educational practice project. It is not affiliated with or endorsed by McKinsey & Company, and it does not reproduce official scoring, hiring outcomes, protected assessment content, or proprietary artwork. Please read [NOTICE.md](NOTICE.md) before contributing content.

The code is available under the [MIT License](LICENSE).

## Release notes

V2.4.8 improves the clarity of Analysis-derived Research Journal entries and brings the Calculator presentation into parity across Analysis and Visual Report. Earlier design decisions, validation reports, and iteration notes are retained in [`docs/`](docs/) as the project history.
