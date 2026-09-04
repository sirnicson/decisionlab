# DecisionLab — UI/UX Data Sheet V2.4.6

## Release

**Version:** 2.4.6  
**Phase:** Final correction & consolidation  
**Release focus:** Red Rock Analysis workspace proportion and information-density refinement

## Product-development intent

V2.4.6 refines the V2.4.5 Red Rock Analysis workspace without reopening task mechanics. The three-column desktop structure remains **Analysis | Calculator | Research Journal**, but horizontal space and local density are rebalanced so evidence is easier to read and more question content fits on screen.

## Authoritative V2.4.6 changes

### Analysis workspace proportions

- Desktop Analysis keeps three parallel work surfaces.
- Default column sizing changes from `minmax(0,1fr) 230px 300px` to `minmax(0,1fr) 205px 370px`.
- The Calculator remains the smallest rail.
- The Research Journal gains 70px of fixed desktop width relative to V2.4.5.
- Grid gap reduces from 14px to 12px.

### Analysis density

Local Analysis-only styling is tightened:

- page heading reduced from 28px to 26px;
- body/help copy reduced slightly;
- section padding reduced;
- question-card margins and padding reduced;
- answer controls reduced from 38px to 36px minimum height;
- Working Prompt spacing is tightened;
- Client Voice copy inside Analysis is slightly smaller and more compact.

No question wording, field type, answer key, tolerance, score or progression rule changes.

### Research Journal legibility and density

Within the Red Rock Analysis workspace only:

- Journal utility padding reduces to 12px;
- evidence cards reduce to an 82px minimum height;
- card padding and inter-card spacing are tightened;
- the reorder handle reduces to 28px;
- source/description/value spacing is tightened;
- Important/Unmark and Return controls reduce to 34px circles;
- the wider rail reduces avoidable description wrapping while keeping evidence values prominent.

Research Journal behaviour is unchanged.

### Calculator

The V2.4.5 compact Calculator remains intentionally narrow. Analysis-local CSS slightly tightens the panel, expression field, result display and keypad while preserving the parser and arithmetic engine.

### Calculation History empty state

The sentence `Completed calculations will appear here.` is removed.

When history is empty, the interface shows the `CALCULATION HISTORY` heading with clean open space underneath. The first completed calculation appears as the first history row.

### Responsive behaviour

- At widths up to 1450px, the three-column layout uses `minmax(0,1fr) 195px 340px`.
- At widths up to 1260px, the workspace moves to a two-column arrangement with Analysis/Calculator on the left and a 300px Journal on the right.
- At widths up to 960px, the workspace stacks to one column.

This prevents the wider Journal from creating unusably narrow three-column layouts.

## Preserved V2.4.5 behaviour

V2.4.6 preserves:

- Calculation History persistence across Analysis → Written Report → Graph Selection → Visual Report;
- continuous history across Visual Report Cases 1–6;
- drag/copy of history results into eligible Analysis and Visual Report numeric fields;
- reuse of history results in the Calculator input;
- Research Journal drag/drop, pointer sorting, Important/Unmark and Return mechanics;
- attempt/session scope of calculator history.

## Locked baseline

V2.4.6 does not alter:

- Salvanova hare or tourism model values fixed in V2.4.4;
- Caldera or Norvale scenario data;
- Red Rock answer keys, scoring, tolerances, timers or stage locks;
- Graph Selection acceptance rules;
- Visual Report case calculations;
- Sea Wolf datasets or mechanics;
- Home or Results behaviour;
- DecisionLab branding or global typography.
