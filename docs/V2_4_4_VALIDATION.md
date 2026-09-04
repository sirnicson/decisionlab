# DecisionLab V2.4.4 Validation Report

## Scope

V2.4.4 is a targeted Salvanova model-consistency correction. Production-source changes are limited to:

- `src/data/redrock/scenarios.ts` — corrected Salvanova model data and direct answer dependencies;
- `src/engine/persistence/storage.ts` — Salvanova-specific saved-state migration;
- `src/app/SessionContext.tsx` — stamps new Salvanova sessions with the current model revision;
- `src/types/index.ts` — optional Salvanova model-revision field.

Validation tests were extended in:

- `src/engine/validation/redrockValidation.test.ts`;
- `src/engine/persistence/storage.test.ts`.

## Hare-model assertions

Verified approved trajectory:

`500,000 → 475,000 → 447,500 → 417,250 → 383,975 → 347,373`

Verified direct dependencies:

- `ex1-y5-wolves = 347373`;
- Analysis `s-a2 = 347373`;
- Analysis `s-a3 = 13.64`;
- Written Report `s-r6 = 347373`;
- No-wolves series remains `500000, 550000, 605000, 665500, 732050, 805255`.

The relocation calculation evaluates to approximately **13.6375%**, matching the approved **13.64%** benchmark.

## Tourism-model assertions

Verified proportional rule from the 80% baseline:

- 80% → $0
- 85% → $25,000
- 89% → $45,000
- 94% → $70,000
- 98% → $90,000
- 100% → $100,000

Verified Exhibit 2 `$000` series:

`0, 25, 45, 70, 90, 100`

Verified protected economic outputs:

- no-intervention Year-5 tourism loss remains **$75,000**;
- full-recovery tourism gain remains **$100,000**.

## Persistence assertions

The migration was executed independently against a representative pre-V2.4.4 Salvanova session.

Verified:

- old exact benchmark `386,890` → `347373` in affected Analysis/Report values;
- old exact `22.46` → `13.64`;
- Year-5 hare Journal evidence → `347,373 hares`;
- Year-2 tourism Journal evidence → `$45,000`;
- Year-3 tourism Journal evidence → `$70,000`;
- unrelated tourism answer `$75,000` and full-recovery `$100,000` remain unchanged;
- journal Important state is preserved;
- non-benchmark learner-entered Salvanova values are preserved;
- non-Salvanova sessions are returned unchanged.

## Static checks

- **TS/TSX transpile:** 36 non-declaration TypeScript/TSX files transpiled with zero syntax diagnostics. The count is one higher than V2.4.3 because V2.4.4 adds a persistence migration test.
- **Targeted arithmetic assertions:** hare recurrence, relocation percentage and tourism proportional model passed.
- **Protected source areas byte-for-byte unchanged from V2.4.3:**
  - `src/features/seawolf`
  - `src/data/seawolf`
  - `src/styles`
  - `src/components`
  - `src/engine/scoring`
  - `src/features/results`
  - `src/hooks`

## Production source files changed from V2.4.3

- `src/app/SessionContext.tsx`
- `src/data/redrock/scenarios.ts`
- `src/engine/persistence/storage.ts`
- `src/types/index.ts`

No Result-page source change was required: Detailed Review reads canonical expected values from the scenario definitions.

## Build note

A dependency-backed Vite production build was not run because project dependencies are not installed in the packaging environment. Validation therefore uses TypeScript syntax transpilation, targeted executable migration/arithmetic assertions and source-tree integrity comparison, consistent with the prior V2.4.x packaging workflow.
