# Red Rock V1.2 — Implementation Notes

This project implements the authoritative Task 1 workflow sealed for V1.2. The consulting narrative is layered around the workflow without changing its mechanics.

## Workflow

**Investigation → Analysis → Report**

Investigation expands to Objective, Study Information, Exhibit 1 and Exhibit 2. Analysis is one scrollable page with four question sections, a Research Journal and an onscreen Calculator. Report expands to Written Report, Graph Selection and Visual Report. Visual Report contains six individual cases.

## Interaction matrix

| Stage | Journal | Calculator |
|---|---:|---:|
| Investigation | Yes | No |
| Analysis | Yes | Yes |
| Written Report | Yes | No |
| Graph Selection | Yes | No |
| Visual Report Cases 1–6 | No | Yes |

## Implemented controls

- Task routes remain locked until the relevant study selection is valid and the learner chooses `Begin engagement`.
- Reset returns to Command Centre and clears activation.
- Investigation data points are draggable to Research Journal.
- Exhibit chart/table data points are exposed as movable evidence values.
- Analysis outputs are automatically added to Research Journal.
- Journal values can be dragged into the Calculator.
- Calculator results can be dragged into answer fields.
- Analysis has four scrollable question sections and left-rail anchors.
- Analysis completion opens an irreversible review warning.
- Written Report supports Journal drag/drop and direct typing, without Calculator.
- Graph Selection offers three chart choices, Journal-driven/manual data entry and generated preview.
- Visual Report contains Case 1–6 with exhibits, questions and Calculator, but no Journal.
- Case 6 completion produces a final Task 1 review warning.
- A Task 1-only result/review page appears before Task 2.

## Validation performed in build environment

- TypeScript syntax transpilation across the source tree: passed.
- Type-level check using local ambient React/router stubs: passed.
- Red Rock structural data check: 3 studies, 2 Investigation exhibits each, 4 Analysis sections each, 6 Visual Report cases each, and every Visual Report case has an exhibit.

A full npm/Vite browser build was not executed in the artifact environment because package installation could not complete against the npm registry. Run `npm install` followed by `npm run check` locally.
