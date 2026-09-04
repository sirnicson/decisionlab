# DecisionLab V2.4.1 Validation Report

## Scope

V2.4.1 is the opening release in the final correction and consolidation phase. It applies a targeted correction to the two explicitly bound Exhibit 1 Year 5 evidence labels in `src/data/redrock/scenarios.ts`.

## Expected source change

Only the following scenario fact label strings differ from V2.3.10 inside the application source tree:

- `ex1-y5-wolves`: `Exhibit 1 — With Wolves — Year 5`
- `ex1-y5-nowolves`: `Exhibit 1 — No Wolves — Year 5`

Their IDs, values, relevance, draggable state and `source:'exhibit1'` remain unchanged.

## Checks completed

- **TS/TSX syntax:** TypeScript 5.8 transpile diagnostics passed for all 35 non-declaration TypeScript/TSX source files.
- **Year 5 bindings retained:** `s-ex1 / With Wolves / Year 5 → ex1-y5-wolves` and `s-ex1 / No Wolves / Year 5 → ex1-y5-nowolves` are unchanged.
- **Evidence values retained:** `ex1-y5-wolves = 386890`; `ex1-y5-nowolves = 805255`.
- **Fact metadata retained:** relevance, draggable state and Exhibit 1 source metadata are unchanged.
- **Report definitions retained:** `s-r6` and `s-r2` retain their original report-facing Year-5 wording, values and tolerances.
- **Journal display normalisation verified:** the existing compact formatter resolves the new fact labels to `With wolves · Year 5` and `No wolves · Year 5`.
- **V2.3.10 interaction code protected:** `src/features/redrock/RedRockPage.tsx` is byte-for-byte unchanged.
- **V2.3.10 styling protected:** `src/styles/app.css` is byte-for-byte unchanged.
- **Protected source trees unchanged:** `src/engine`, `src/types`, `src/app`, `src/components` and `src/hooks` are byte-for-byte unchanged from V2.3.10.
- **Package version:** advanced from `2.3.10` to `2.4.1`.

## Build note

A full Vite production build was not required for this two-string scenario-data correction. Static TypeScript/TSX transpile validation and source-tree diff checks were completed instead.

## Release classification

**Final correction & consolidation — data-label consistency correction.** V2.4.1 opens the final phase used to reconcile, validate and finish the substantially complete application.
