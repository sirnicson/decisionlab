# V2.2.11 Validation

Validation performed after the learner-facing scaffolding reduction pass.

- 36 TypeScript/TSX source files parsed with the global TypeScript parser: **0 parse errors**.
- Relative/local import integrity check: **0 missing imports**.
- CSS brace structure: **balanced**.
- Learner-facing Graph Selection `Scoring rule:` banner: **0 remaining occurrences** in Red Rock Results review.
- Duplicated Analysis `<h2>{section.title}</h2>` section headings: **0 remaining occurrences**.
- Standalone `tag` unit pills in Red Rock Investigation/Visual exhibit headers and Graph Selection preview headers: **0 remaining occurrences**.
- Red Rock binary Graph Selection scoring rule verified unchanged: accepted chart type + every required chart-data value must all be correct for 100% of the Graph Selection component; otherwise 0%.
- Red Rock weights verified unchanged: **Analysis 50 / Written Report 20 / Graph Selection 10 / Visual Report Cases 20 = 100**.
- SHA-256 comparison against V2.2.10 confirms these locked files are unchanged:
  - `src/data/redrock/scenarios.ts`
  - `src/engine/scoring/redrock.ts`
  - `src/data/seawolf/scenarios.ts`
  - `src/engine/scoring/seawolf.ts`
- `node_modules` is not present in the working environment, so a dependency-backed `vite build` / Vitest run was not executed.
