# DecisionLab V2.4.7 Validation Report

## Scope

V2.4.7 applies the approved compact-sidebar and Red Rock Analysis/Calculator width-redistribution iteration on top of V2.4.6.

The only changed production source file is:

- `src/styles/app.css`

Package metadata, README and V2.4.7 release documentation are also updated.

## Verified shell changes

### Persistent desktop sidebar

- >1180px: **320px → 260px**.
- 921–1180px: **230px → 220px**.
- Existing <=920px full-width/mobile navigation behaviour remains in control.
- No navigation JSX, routing, progressive-disclosure or locking code changed.

### DECISIONLAB lock-up

For >1180px:

- D mark: **55px → 50px**;
- mark/wordmark gap: **10px → 8px**;
- wordmark: **26px → 23px**;
- internal D: **30px → 28px**.

For 921–1180px:

- D mark: **44px**;
- gap: **6px**;
- wordmark: **20px**;
- internal D: **25px**.

Identity properties are preserved: tilted lime mark, upright dark D, white `DECISION`, lighter lime `LAB`, continuous wordmark and no cropping/distortion rules.

A conservative font-width sanity check using Liberation Sans as a fallback approximation produced positive fit margins for both persistent-sidebar sizes:

- 260px sidebar: approximately **23px** remaining inner horizontal margin after mark + gap + wordmark;
- 220px sidebar: approximately **11px** remaining inner horizontal margin.

This is a static fit check, not a browser pixel-comparison test.

## Verified Red Rock Analysis redistribution

### Large desktop (>1450px)

V2.4.6:

`Analysis flexible | 205px Calculator | 370px Journal`

V2.4.7:

`Analysis flexible | 235px Calculator | 370px Journal`

Therefore:

- Calculator gains **30px**;
- Research Journal remains **370px**;
- the remaining shell-width gain flows into the flexible Analysis pane.

### 1261–1450px

- Calculator: **195px → 215px**;
- Research Journal remains **340px**, matching the existing V2.4.6 responsive width.

### <=1260px

Existing V2.4.6 two-column/stacked responsive arrangements remain unchanged.

## Research Journal protection

No V2.4.6 Journal density declarations were edited or removed. Existing Analysis-scoped Journal rules remain present, including:

- three-part card grid;
- compact reorder handle;
- source/label/value typography;
- 34px circular Journal actions.

No Journal JSX or state logic changed.

## Static TypeScript validation

- **36** non-declaration `.ts` / `.tsx` files transpiled with TypeScript **5.8.3**.
- **0 syntax diagnostics**.

## Source-tree integrity

Fresh V2.4.6 → V2.4.7 source comparison confirms that the only changed production source file is:

- `src/styles/app.css`

The following production areas are byte-for-byte unchanged:

- `src/app`
- `src/components`
- `src/data`
- `src/engine`
- `src/features`
- `src/hooks`
- `src/types`

Therefore no Red Rock mechanics, Calculator logic, Calculation History state, Research Journal behaviour, model data, scoring, persistence, Sea Wolf behaviour, Home logic or Results logic changed.

## CSS structural validation

- Opening braces: **884**
- Closing braces: **884**
- V2.4.7 sidebar, brand and Analysis-grid override signatures are present.
- V2.4.6 Journal-density signatures remain present.

## Package validation

- Package version advanced from **2.4.6 → 2.4.7**.
- Release ZIP integrity checked successfully after packaging.

## Build note

A dependency-backed Vite/Playwright browser regression was not run because the packaged project does not contain installed `node_modules`. Static TypeScript transpilation, CSS structure checks, source-tree diff protection and targeted layout-rule assertions were completed instead. The final shell/brand proportions should still receive the normal hands-on browser visual check at the target desktop viewport.
