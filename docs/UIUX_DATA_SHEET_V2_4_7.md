# DecisionLab — UI/UX Data Sheet V2.4.7

## Release

**Version:** 2.4.7  
**Phase:** Final correction & consolidation  
**Release focus:** Compact global sidebar and Red Rock Analysis/Calculator width redistribution

## Product-development intent

V2.4.7 is a controlled shell-and-workspace refinement built on V2.4.6. It reduces the persistent desktop sidebar footprint, scales the approved DECISIONLAB lock-up coherently to fit, and allocates the recovered horizontal space only to the Red Rock Analysis pane and Calculator. The Research Journal width and density treatment established in V2.4.6 remain unchanged.

## Authoritative V2.4.7 layout changes

### Global desktop shell

For desktop widths above 1180px:

- persistent sidebar: **320px → 260px**;
- sidebar horizontal padding: **16px → 12px**;
- application navigation structure and behaviour remain unchanged.

For the compact persistent-shell range 921–1180px:

- sidebar width: **230px → 220px**;
- mobile/drawer behaviour below 921px remains governed by the existing responsive rules.

### DECISIONLAB brand lock-up

The identity remains the same lock-up and is only reduced in footprint.

Desktop >1180px:

- D mark: **55px → 50px**;
- mark/wordmark gap: **10px → 8px**;
- wordmark: **26px → 23px**;
- internal D: **30px → 28px**.

921–1180px:

- D mark: **44px**;
- gap: **6px**;
- wordmark: **20px**;
- internal D: **25px**.

Preserved exactly in identity treatment:

- clockwise-tilted lime rounded mark;
- upright dark D;
- white `DECISION`;
- lighter lime `LAB`;
- continuous `DECISIONLAB` wordmark with no deliberate gap;
- no cropping, truncation or horizontal distortion.

### Red Rock Analysis workspace

At >1450px the three-column Analysis workspace becomes:

`minmax(0,1fr) | 235px Calculator | 370px Research Journal`

V2.4.6 used:

`minmax(0,1fr) | 205px Calculator | 370px Research Journal`

Therefore:

- Calculator gains **30px** of fixed width;
- Research Journal remains **370px**;
- the remaining sidebar-recovered width flows into the flexible Analysis column.

At 1261–1450px:

- Calculator: **195px → 215px**;
- Research Journal remains at the existing V2.4.6 responsive width of **340px**.

### Research Journal width lock

V2.4.7 does not change any V2.4.6 Journal sizing, typography, card density or interaction rules. The Journal remains the protected third column while the shell gain is spent on Analysis and Calculator.

## Preserved V2.4.6 density treatment

The following remain unchanged:

- compact Analysis typography and spacing;
- compact question cards and answer fields;
- Research Journal card padding and action controls;
- Calculation History presentation;
- compact calculator controls.

## Protected mechanics

V2.4.7 does not alter:

- Salvanova hare or tourism models;
- Caldera or Norvale scenario data;
- Red Rock answers, tolerances, scoring or timers;
- Red Rock stage locks;
- Research Journal drag/drop, sorting, Important/Unmark or Return;
- Calculation History persistence/reuse;
- Graph Selection or Visual Report mechanics;
- Sea Wolf data, scoring, treatment or progression;
- Home or Results content.

## Responsive rule

The shell reduction is applied only while the persistent sidebar exists. At mobile widths the established full-width/stacked navigation behaviour remains in control; V2.4.7 does not force desktop proportions onto small screens.
