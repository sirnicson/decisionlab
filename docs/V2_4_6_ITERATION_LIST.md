# DecisionLab — V2.4.6 Iteration List

## Phase

**Final correction & consolidation.**

## Release focus

**Red Rock Analysis workspace proportion and information-density refinement.**

V2.4.6 refines the V2.4.5 three-column Analysis workspace so the Research Journal has more usable space, the Analysis pane is calmer and denser, and the Calculator remains compact without changing any established mechanics.

---

# 1. Rebalance the three-column Analysis workspace

Keep the desktop structure:

**Analysis | Calculator | Research Journal**

### Direction

- Make the **Research Journal materially wider**.
- Make the **Analysis pane slightly narrower**.
- Keep the **Calculator as the narrowest column**.
- Preserve clear separation between all three work surfaces.

### Directional proportions

Use these only as a visual guide, not a rigid lock:

- Analysis: **~45–46%**
- Calculator: **~18–19%**
- Research Journal: **~35–37%**

The final CSS should be tuned visually so the Journal gains meaningful legibility without making the Analysis pane cramped.

---

# 2. Tighten the Analysis pane

## Intent

Reduce visual noise and vertical sprawl so more of each Analysis question is visible at once.

### Changes

- Slightly reduce Analysis question/body font sizes.
- Reduce vertical gaps between question sections.
- Reduce padding inside question cards.
- Slightly reduce answer-field height where safe.
- Tighten spacing around `Working prompt`.
- Reduce unnecessary whitespace between:
  - section label;
  - prompt;
  - answer card;
  - following question.
- Preserve clear hierarchy and comfortable readability.

### Guardrail

Do not change:

- question wording;
- answer fields or accepted input types;
- answer keys;
- tolerances;
- scoring;
- validation;
- stage behaviour.

Typography and spacing changes must remain **local to the Red Rock Analysis workspace**.

---

# 3. Give the Research Journal more horizontal space

## Intent

Improve evidence-card legibility and reduce awkward wrapping.

### Changes

- Increase the Research Journal rail width.
- Allow evidence descriptions to use more horizontal space.
- Reduce avoidable multi-line wrapping in:
  - source labels;
  - evidence descriptions;
  - values.
- Keep evidence values visually prominent.
- Preserve the source → description → value hierarchy.

The Journal should read as a proper working evidence surface rather than a compressed utility sidebar.

---

# 4. Tighten Research Journal card density

## Intent

Use the wider Journal efficiently rather than simply making the existing cards larger.

### Changes

- Reduce internal evidence-card padding.
- Reduce vertical gaps between cards.
- Slightly reduce source-label size where useful.
- Tighten spacing between:
  - source;
  - description;
  - value.
- Keep Important / Unmark and Return controls compact and clearly usable.
- Use the increased width to keep more evidence information on one or two lines where possible.

### Guardrail

Do not change:

- Research Journal drag/drop;
- ordering;
- Important / Unmark;
- Return to source;
- evidence IDs;
- saved evidence;
- persistence;
- existing answer-field drop behaviour.

---

# 5. Keep the Calculator compact

## Intent

The Calculator should remain the smallest utility rail and should not reclaim the width given to the Journal.

### Preserve

- compact keypad buttons;
- compact button gaps;
- compact expression field;
- compact result display;
- Calculation History at the top;
- existing V2.4.5 history persistence and reuse behaviour.

### Guardrail

Do not change:

- calculator arithmetic;
- parser behaviour;
- supported operations;
- result logic;
- calculation-history persistence scope;
- history-result drag/drop behaviour.

---

# 6. Remove Calculation History empty-state helper copy

Remove the sentence:

**`Completed calculations will appear here.`**

### Empty-state treatment

When no calculations exist:

- show `CALCULATION HISTORY`;
- leave the history space visually clean beneath it;
- do not show instructional filler text.

The first completed calculation should appear naturally as the first history row.

---

# 7. Preserve V2.4.5 Calculation History behaviour

V2.4.6 must retain all previously approved calculator-history behaviour.

### Persistence

History remains available across:

**Analysis → Written Report → Graph Selection → Visual Report**

and continues through:

**Visual Report Case 1 → Case 2 → ... → Case 6**

### Reuse

History results remain reusable in:

- eligible Analysis numeric answer fields;
- eligible Visual Report numeric answer fields;
- Calculator expression/input field.

### Copy semantics

Reusing a history result:

- copies the value;
- does not remove the history entry;
- does not submit an answer;
- does not reveal correctness.

---

# 8. Responsive guardrail

The rebalanced three-column layout is primarily a **desktop / wide-screen treatment**.

### Requirements

- Do not force three compressed columns on narrow screens.
- Preserve the existing responsive fallback or stacked treatment where necessary.
- Ensure Journal legibility remains acceptable at intermediate widths.
- Avoid horizontal overflow caused by the wider Journal rail.

---

# 9. Protected behaviour

V2.4.6 must not alter:

- V2.4.4 Salvanova hare-model values;
- V2.4.4 Salvanova tourism-model values;
- Caldera or Norvale scenario data;
- Red Rock answer keys;
- Red Rock scoring weights;
- Red Rock tolerances;
- Red Rock timers;
- Red Rock stage-lock logic;
- Learning / Simulation feedback rules;
- Graph Selection acceptance rules;
- Visual Report case calculations;
- Research Journal mechanics;
- Calculation History persistence/reuse mechanics introduced in V2.4.5;
- Sea Wolf datasets, routing, scoring, treatment locks or progression;
- Home;
- Results;
- DecisionLab branding;
- unrelated global typography.

---

# 10. Validation requirements

## Workspace proportions

Confirm on desktop that:

- Research Journal is visibly wider than V2.4.5;
- Analysis is slightly narrower but remains comfortable;
- Calculator remains compact and is still the narrowest rail;
- no column overlaps or clips.

## Analysis density

Confirm:

- question typography is calmer;
- question-card padding is reduced;
- answer fields remain readable;
- `Working prompt` remains clear;
- more content fits vertically without reducing usability.

## Research Journal density

Confirm:

- evidence descriptions wrap less aggressively;
- source/description/value hierarchy remains clear;
- cards are vertically tighter;
- Important / Unmark and Return remain fully usable;
- drag/drop and sorting still work.

## Calculator

Confirm:

- no empty-state sentence appears under `CALCULATION HISTORY`;
- first completed calculation appears correctly;
- compact layout remains usable;
- history persistence/reuse from V2.4.5 still passes regression tests.

## Responsive

Confirm:

- desktop uses the rebalanced three-column layout;
- narrower widths fall back cleanly;
- no horizontal overflow or unusably narrow Journal state occurs.

## Regression guardrail

Compare protected source areas against V2.4.5 and confirm that no unrelated model, scoring, Sea Wolf, Home, Results or branding code changed unintentionally.

---

## V2.4.6 release summary

**Rebalance and tighten the Red Rock Analysis workspace so the Research Journal gains meaningful legibility, the Analysis pane becomes calmer and denser, and the Calculator remains a compact persistent working tool.**
