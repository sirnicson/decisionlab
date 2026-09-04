# DecisionLab V2.4.7 — Compact shell and workspace redistribution

## Phase

**Final correction & consolidation.**

## Problem addressed

The V2.4.6 Research Journal had reached a satisfactory desktop width, but the global 320px sidebar still consumed horizontal space that could be used more productively in the active Red Rock Analysis workspace. The approved DECISIONLAB lock-up also needed to be proportionally tightened if the sidebar became narrower.

## Changes implemented

### Global sidebar

- Desktop persistent sidebar reduced from **320px to 260px**.
- At 921–1180px the persistent sidebar is reduced from **230px to 220px**.
- Navigation labels, progressive disclosure, locks and routing are unchanged.

### DECISIONLAB lock-up

- Mark, wordmark, gap and padding are proportionally reduced.
- Full `DECISIONLAB` remains visible.
- `LAB` is not cropped or hidden.
- The tilted lime mark, upright D, white `DECISION` and lighter lime `LAB` remain intact.

### Red Rock Analysis width redistribution

At large desktop widths:

- Calculator: **205px → 235px**;
- Research Journal: **remains 370px**;
- the remaining recovered shell width is absorbed by the flexible Analysis pane.

At 1261–1450px:

- Calculator: **195px → 215px**;
- Journal: **remains 340px**, matching the V2.4.6 responsive treatment.

## Deliberately unchanged

- V2.4.6 Analysis density rules
- V2.4.6 Research Journal width/density rules
- Calculator arithmetic and history mechanics
- Red Rock data, answers, scoring and timers
- Salvanova V2.4.4 corrections
- Caldera and Norvale
- Sea Wolf
- Home and Results content
