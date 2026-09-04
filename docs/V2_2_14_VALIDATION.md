# V2.2.14 Validation

## Source validation
- 36 TS/TSX source files parsed with the global TypeScript parser: 0 parse errors.
- Modified modules transpiled in isolation with TypeScript `transpileModule`: 0 diagnostics.
- Relative-import integrity check: 0 missing local imports.
- CSS brace balance: 0.

## Result-review regression checks
Confirmed absent from learner-facing source:
- separate `Reference maximum feasible effectiveness for this site` note;
- `Selected attempt:` hero copy;
- simulator disclaimer copy;
- Detailed review · Categorisation & Transfer;
- Detailed review · Prospect Selection;
- repeated Site Profiling acceptance-rule sentence;
- `Performance against feasible maximum`;
- generic Reasoning Profile;
- Primary Performance Concern;
- Recommended Next Practice;
- Try Another Simulation;
- generic `Complete multiple full simulations...` confidence instruction.

## Scoring preservation
Sea Wolf data and scoring files were hash-compared against V2.2.13. No changes were found in the locked data/scoring set, including the 10% / 30% / 25% / 35% Task 2 weights, route keys, treatment logic and feasible maxima.

## Weighted snapshot check
For a sample component profile of 67 / 59 / 67 / 85, the displayed weighted contributions are 6.7/10 + 17.7/30 + 16.8/25 + 29.8/35 = 70.9, which rounds to the displayed overall Task 2 score of 71.

## Dependency-backed build limitation
A full `tsc`/Vite build could not be completed in this environment because the project does not contain local `node_modules`; TypeScript reports missing React/React Router packages and JSX runtime types. This is the same dependency-environment limitation rather than a source parse failure.
