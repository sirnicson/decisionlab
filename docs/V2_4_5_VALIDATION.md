# DecisionLab V2.4.5 Validation Report

## Scope

V2.4.5 is a local Red Rock workspace and Calculator persistence refinement.

Production-source changes are limited to:

- `src/components/OnscreenCalculator.tsx`
- `src/features/redrock/RedRockPage.tsx`
- `src/styles/app.css`
- `src/types/index.ts`

Package metadata and V2.4.5 documentation are also updated.

## Static TypeScript / TSX validation

- **36** non-declaration `.ts` / `.tsx` files were transpiled using TypeScript 5.8.3.
- **0 syntax diagnostics** were produced.

A full dependency-backed TypeScript/Vite build was not available in the packaging environment because React/Vite project dependencies are not installed. A direct `tsc` invocation therefore reports missing external modules/types rather than project-source syntax failures.

## Calculator-engine integrity

The tokenizer/parser/evaluator block in `OnscreenCalculator.tsx` was compared with V2.4.4 and is **byte-for-byte unchanged**. V2.4.5 changes Calculator state ownership and presentation, not arithmetic behaviour.

## Targeted implementation assertions

Verified in source:

- `RedRockAttempt` contains optional `calculationHistory`.
- New Red Rock attempts initialise calculation history as an empty array.
- New calculation entries append to the existing attempt history without the former eight-entry component cap.
- The same attempt history is passed to the Calculator in Analysis and Visual Report.
- Calculator history results publish `application/x-solve-value` and `text/plain` drag payloads.
- Existing Analysis and Visual Report answer drop handlers consume that payload without submission/validation side effects.
- Calculator input consumes the same payload and inserts the dropped numeric value at the caret.
- History result buttons provide a keyboard-accessible `Use result ... in calculator` action.
- Wide Analysis CSS resolves to three columns: **Analysis | Calculator | Research Journal**.
- Analysis typography changes are scoped to `.utility-analysis`.
- Calculator controls use the compact Red Rock utility styling.
- CSS opening/closing brace counts match.

## Persistence simulation

A representative Red Rock attempt containing calculator history was advanced through object-state transitions:

**Analysis → Written Report → Graph Selection → Visual Report**

then JSON serialised/deserialised using the same structural mechanism as active-session persistence. History remained intact, and a subsequent Visual Report calculation appended successfully.

## Protected-source comparison against V2.4.4

Only four `src` files differ from V2.4.4, all within the approved V2.4.5 scope.

The following source areas are byte-for-byte unchanged:

- `src/data`
- `src/engine`
- `src/features/seawolf`
- `src/features/results`
- `src/app`
- `src/hooks`

This protects:

- V2.4.4 Salvanova model values;
- Caldera / Norvale datasets;
- Red Rock and Sea Wolf scoring engines;
- persistence migration logic;
- Sea Wolf mechanics;
- Result-page logic;
- session-routing logic.

## Validation limitation

No browser-backed visual regression or Playwright run was performed because the packaged source does not include installed runtime/test dependencies. Layout behaviour was validated through source/CSS assertions and responsive-rule inspection rather than a rendered-browser capture.
