# DecisionLab V2.4.2 Validation Report

## Scope

V2.4.2 is a Red Rock consistency sweep within the final correction and consolidation phase. Application-source changes are intentionally limited to:

- `src/data/redrock/scenarios.ts`
- `src/features/redrock/RedRockPage.tsx`

Package metadata and release documentation are also updated to V2.4.2.

## Verified corrections

### Salvanova

- `ex1-y5-wolves = 386890` retains its value and now has `unit:'hares'`.
- `ex1-y5-nowolves = 805255` retains its value and now has `unit:'hares'`.
- Exhibit 2 vegetation evidence resolves to `Vegetation cover · Year N` with `%` units.
- Exhibit 2 tourism evidence resolves to `Tourism revenue · Year N` and converts the exhibit's `$000` values to full-dollar journal values (e.g. `50 → $50,000`).
- Explicit Year-5 Exhibit 2 facts follow the same naming/value conventions.

### Caldera

The three explicitly bound Year-5 facts retain their values and `mg/L` units while normalising labels to the chart-series pattern:

- Nitrogen — Year 5
- Phosphorus — Year 5
- Dissolved oxygen — Year 5

### Norvale

- Bound Exhibit 1 Year-5 labels now align to `Natural recovery — Year 5` and `Integrated restoration — Year 5`.
- Generic Exhibit 2 column text `Value` is suppressed from the journal-facing label.
- Generated Norvale Exhibit 2 fact IDs preserve the prior `...-value` slug so saved journal references remain compatible.

### Analysis → Research Journal

Formatter checks passed for:

- `386890` + `hares` → `386,890 hares`
- `75000` + `$` → `$75,000`
- `72` + `$m` → `$72m`

Previously persisted investigation and analysis journal items are normalised at render/drag time when their canonical fact/question metadata can be resolved.

## Static checks

- **TS/TSX transpile:** 35 non-declaration TypeScript/TSX source files transpiled with TypeScript 5.8.3 with zero syntax diagnostics.
- **Targeted behaviour assertions:** Salvanova Exhibit 2 label/unit/scaling, Norvale `Value` suppression, generated-ID compatibility, and analysis-number formatting all passed.
- **Protected source trees byte-for-byte unchanged from V2.4.1:**
  - `src/engine`
  - `src/types`
  - `src/app`
  - `src/components`
  - `src/hooks`
  - `src/features/seawolf`
  - `src/features/results`
  - `src/styles`
- Within `src/data/redrock`, only `scenarios.ts` changed.
- Within `src/features/redrock`, only `RedRockPage.tsx` changed.
- Package version advanced from `2.4.1` to `2.4.2`.

## Mechanics deliberately protected

No answer key, numeric projection, score, tolerance, timer, route, stage lock, report template, chart-acceptance rule, Sea Wolf dataset or Sea Wolf scoring mechanic was changed.

## Build note

A dependency-backed Vite production build was not run because project dependencies are not installed in the packaging environment. Static TypeScript transpile validation, source-tree integrity checks and targeted behaviour assertions were completed instead.
