# DecisionLab — V2.4.7 Iteration List

## Phase

**Final correction & consolidation.**

## Release focus

**Compact global sidebar and Red Rock Analysis/Calculator width redistribution.**

V2.4.7 should reclaim horizontal space from the global DecisionLab sidebar and use that recovered space specifically to improve the **Red Rock Analysis** and **Calculator** working areas.

The **Research Journal width established in V2.4.6 is already satisfactory and must remain unchanged.**

---

# 1. Global DecisionLab sidebar — reduce width

## Intent

The current dark navigation sidebar remains wider than necessary for the approved navigation structure.

### Change

- Reduce the global sidebar width.
- Keep all top-level navigation and progressive-disclosure behaviour intact.
- Preserve readable navigation labels and stage hierarchy.
- Do not remove or abbreviate navigation labels simply to make the sidebar narrower.

### Important consequence

Because the sidebar is part of the global application shell, this width change must be validated across:

- Home;
- Red Rock Investigation;
- Red Rock Analysis;
- Red Rock Report;
- Red Rock Results;
- Sea Wolf;
- Sea Wolf Results.

This is a **global shell refinement**, even though the recovered width is primarily used to improve the Red Rock Analysis workspace.

---

# 2. DECISIONLAB brand lock-up — fit the narrower sidebar

## Intent

The full DECISIONLAB brand must continue to fit cleanly inside the reduced sidebar without clipping or distortion.

### Preserve the approved identity

The lock-up must retain:

- the tilted lime rounded D block;
- the upright dark `D` inside the block;
- white `DECISION`;
- lighter lime `LAB`;
- no visible gap between `DECISION` and `LAB`;
- the existing premium/friendly relationship between the mark and wordmark.

### Allowed refinements

To fit the narrower sidebar, adjust only the overall footprint as needed:

- slightly reduce the D-mark dimensions;
- slightly reduce wordmark font size;
- tighten the gap between mark and wordmark;
- adjust internal brand padding/alignment.

### Prohibited

Do **not**:

- crop or hide `LAB`;
- truncate `DECISIONLAB`;
- remove the D mark;
- horizontally distort/squash the wordmark;
- change `LAB` to white;
- alter the approved mark orientation;
- redesign the brand.

The entire `D + DECISIONLAB` assembly should scale/tighten as one coherent lock-up.

---

# 3. Width redistribution — sidebar gain goes only to Analysis and Calculator

## Locked decision

The horizontal space recovered from the narrower sidebar should be redistributed to:

1. **Red Rock Analysis**
2. **Calculator**

The Research Journal should **not** receive additional width.

### Target direction

```text
BEFORE

│      SIDEBAR      │       ANALYSIS       │ CALC │    JOURNAL    │


AFTER

│   SB   │          ANALYSIS          │      CALC      │    JOURNAL    │
```

### Interpretation

- Sidebar becomes clearly narrower.
- Analysis gains additional usable width.
- Calculator gains additional usable width.
- Research Journal remains at its current V2.4.6 width.

The exact pixel allocation should be tuned visually rather than locked to rigid percentages.

---

# 4. Red Rock Analysis — use the recovered width

## Intent

The Analysis pane should benefit from the additional horizontal room without undoing the density improvements introduced in V2.4.6.

### Preserve

- tighter Analysis typography;
- reduced card padding;
- reduced vertical whitespace;
- compact answer fields;
- current question hierarchy.

### Expected benefit

The wider Analysis pane should:

- reduce unnecessary text wrapping;
- improve question readability;
- give answer fields more comfortable horizontal room;
- retain the calmer V2.4.6 visual density.

### Guardrail

Do not re-expand typography, card padding, or vertical spacing simply because more width is available.

---

# 5. Calculator — give it a more comfortable working width

## Intent

The Calculator should receive part of the sidebar-recovered width so it reads as a proper working column rather than an overly compressed utility strip.

### Expected benefit

The additional width should improve:

- Calculation History readability;
- expression-field legibility;
- result-display balance;
- keypad spacing;
- reuse/drag affordances.

### Preserve

The Calculator should still retain its compact V2.4.5/V2.4.6 styling philosophy.

Do not return to the oversized pre-V2.4.5 calculator UI.

### Guardrail

Do not change:

- arithmetic/parser logic;
- supported operations;
- Calculation History persistence;
- history-result drag/drop;
- keyboard reuse;
- attempt-scoped history behaviour.

---

# 6. Research Journal — width is locked

## Decision

The V2.4.6 Research Journal width is considered satisfactory.

### Therefore

- Do not widen the Research Journal.
- Do not shrink the Research Journal.
- Preserve the current V2.4.6 evidence-card density and typography.
- Preserve current Journal scrolling and card layout.

### Guardrail

The Journal remains protected from the V2.4.7 width redistribution.

---

# 7. Responsive behaviour

The narrower sidebar and redistributed workspace widths are primarily a desktop/wide-screen refinement.

### Requirements

- Preserve usable responsive behaviour at narrower widths.
- Avoid horizontal overflow.
- Do not force the desktop width distribution onto small screens.
- Ensure the logo still scales/aligns correctly at responsive breakpoints.
- Preserve the existing mobile/tablet navigation treatment unless a specific breakpoint adjustment is required solely to prevent clipping.

---

# 8. Protected behaviour

V2.4.7 must not alter:

- V2.4.4 Salvanova hare-model values;
- V2.4.4 Salvanova tourism-model values;
- Caldera or Norvale data;
- Red Rock answer keys;
- Red Rock scoring;
- Red Rock tolerances;
- Red Rock timers;
- stage locks;
- Learning / Simulation feedback;
- Graph Selection acceptance rules;
- Visual Report calculations;
- Research Journal mechanics;
- Calculation History persistence/reuse mechanics;
- Sea Wolf datasets;
- Sea Wolf scoring;
- Sea Wolf treatment locks;
- Sea Wolf progression;
- Home content;
- Results content;
- global typography outside the required shell/brand adjustments.

---

# 9. Validation requirements

## Sidebar

Confirm:

- global sidebar is visibly narrower;
- navigation labels remain readable;
- Red Rock progressive disclosure still works;
- Sea Wolf site-based progressive disclosure still works;
- no navigation item clips or overflows.

## Brand lock-up

Confirm:

- full `DECISIONLAB` is visible;
- `LAB` is not clipped;
- D mark remains tilted correctly;
- internal D remains upright;
- `DECISION` remains white;
- `LAB` remains lime and lighter;
- no horizontal distortion is introduced;
- mark/wordmark alignment remains premium and balanced.

## Analysis workspace

Confirm:

- Analysis gains visible horizontal width;
- the V2.4.6 tighter typography/density remains intact;
- questions and answer fields wrap less aggressively;
- no Analysis mechanics change.

## Calculator

Confirm:

- Calculator gains visible horizontal width;
- history becomes easier to read;
- keypad remains compact;
- no arithmetic/history/reuse regression occurs.

## Research Journal

Confirm:

- Journal width is unchanged from V2.4.6;
- Journal card density is unchanged;
- drag/drop, sorting, Important / Unmark and Return still work.

## Global regression

Compare protected source areas against V2.4.6 and confirm no unrelated model, scoring, Sea Wolf, Home, Results or session behaviour changes.

---

## V2.4.7 release summary

**Compact the global DecisionLab sidebar and scale the approved brand lock-up to fit, then redistribute the recovered horizontal space only to Red Rock Analysis and the Calculator while leaving the V2.4.6 Research Journal width unchanged.**
