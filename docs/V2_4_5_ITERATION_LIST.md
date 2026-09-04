# DecisionLab — V2.4.5 Iteration List

## Phase

**Final correction & consolidation.**

## Release focus

**Red Rock Analysis workspace optimisation and persistent calculator working memory.**

V2.4.5 should improve how the learner works across **Analysis → hidden calculator stages → Visual Report** without changing Red Rock scoring, answer logic, scenario data, Research Journal mechanics, or Sea Wolf behaviour.

---

# 1. Red Rock Analysis — three-column desktop workspace

## Intent

Replace the current right-side vertical stacking of **Research Journal + Calculator** with three parallel working areas on desktop:

**Analysis | Calculator | Research Journal**

### Target structure

- **Analysis** remains the primary and widest work canvas.
- **Calculator** becomes a dedicated compact middle utility rail.
- **Research Journal** receives its own full-height right rail.
- The Calculator should no longer consume vertical space underneath the Research Journal.
- The Research Journal should remain independently scrollable and usable while the Calculator is open.

### Responsive guardrail

- The three-column structure is a **desktop/tablet-wide layout**.
- Narrow/mobile layouts should retain an appropriate stacked or responsive treatment rather than forcing three compressed columns.

---

# 2. Analysis pane — quieter, more compact typography

## Intent

Reduce visual noise and allow more of each Analysis question to fit naturally within the primary work canvas.

### Changes

- Slightly reduce the type scale of:
  - Analysis question headings;
  - question directions/body copy;
  - field labels;
  - supporting/helper text.
- Tighten vertical spacing where appropriate.
- Keep answer-entry fields comfortably readable and usable.
- Preserve hierarchy between:
  - page title;
  - question number;
  - question prompt;
  - answer field;
  - supporting text.

### Guardrail

- Typography changes are **local to the Red Rock Analysis working pane**.
- Do not globally reduce DecisionLab typography.
- Do not alter question wording, answer fields, validation, scoring, or stage behaviour.

---

# 3. Calculator — compact rail-specific UI

## Intent

Redesign the Calculator presentation for its narrower dedicated middle column rather than simply squeezing the existing large Calculator into a smaller area.

### Changes

- Reduce overall calculator UI scale.
- Use smaller keypad buttons.
- Reduce button gaps and internal padding.
- Use a more compact expression/input field.
- Use a more compact result display.
- Reduce unnecessary vertical spacing.
- Keep all controls comfortably clickable and legible.
- Preserve the existing calculator arithmetic/parser behaviour.

### Guardrail

This is a **layout and presentation optimisation**, not a calculator-engine rewrite.

Do not change:
- supported arithmetic operations;
- expression parsing;
- result calculation behaviour;
- answer scoring;
- scenario calculations.

---

# 4. Calculation History — make the existing history area functional

## Problem

The current Calculator includes a `Calculation history` area, but completed calculations are not visibly populating that history.

## Required behaviour

Every completed calculation should create a history entry containing:

- the expression used; and
- the resulting value.

Example:

`500000 × 1.10 = 550000`

`550000 − 75000 = 475000`

### Layout

- Calculation History occupies the upper section of the Calculator rail.
- The history area scrolls independently when it becomes long.
- The active calculator input/result/keypad remain available beneath it.
- New calculations append in chronological order.

### Guardrail

Do not treat history as assessment evidence and do not score its contents.

---

# 5. Persistent Red Rock Calculation History

## Decision

Calculation history belongs to the **Red Rock attempt/session**, not to the mounted Calculator component.

The history must therefore survive when the Calculator disappears and later remounts.

## Required persistence flow

**Analysis**
- Calculator visible.
- History accumulates.

**Written Report**
- Calculator hidden.
- History retained.

**Graph Selection**
- Calculator hidden.
- History retained.

**Visual Report**
- Calculator appears again.
- The complete Analysis calculation history is restored.

**Visual Report Cases 1–6**
- New calculations continue appending to the same Red Rock history.
- History must not reset between Visual Report cases.

## Persistence scope

History should:

- persist through ordinary Red Rock stage/page navigation;
- persist through Calculator unmount/remount;
- persist through autosave/reload where the current Red Rock attempt is already persisted;
- remain available throughout the active Red Rock attempt.

History should **not**:

- carry from Salvanova into Caldera;
- carry from Caldera into Norvale;
- carry between separate Red Rock attempts;
- carry into Sea Wolf;
- survive a deliberate Reset of the relevant attempt.

---

# 6. Reusable Calculation History results

## Decision

A history result is reusable working material, not just a passive audit trail.

The **result value** of each history entry should be draggable.

Example:

`550000 − 75000 = [475000]`

Only `[475000]` is the draggable payload.

## 6A. Drag result → Analysis answer field

- A history result can be dragged into an eligible numeric Analysis answer field.
- Dropping inserts the numeric value.
- The drop must **not**:
  - submit the answer;
  - validate correctness automatically;
  - mark the question complete.

The learner retains control of submission.

## 6B. Drag result → Visual Report answer field

- When the Calculator reappears in Visual Report, any retained history result may be dragged into an eligible numeric Visual Report field.
- Results originally created during Analysis remain reusable.
- Visual Report calculations added later are reusable in the same way.

## 6C. Drag result → Calculator input

- A history result can be dragged into the Calculator expression/input field.
- The numeric result becomes reusable as the starting value for a new calculation.

Example:

History:

`522500 − 75000 = [447500]`

Drag `447500` into the Calculator input and continue:

`447500 × 1.10`

## Copy semantics

Using a history result must **copy** the value.

The original history entry remains in place.

History entries are never removed merely because their result has been reused.

---

# 7. Keyboard-accessible reuse

Drag-and-drop must not be the only way to reuse a history result.

Provide an accessible equivalent for keyboard users.

At minimum, a focused history result should support a clear action such as:

- `Use in calculator`; and/or
- inserting into the currently focused eligible numeric answer field.

Implementation should use semantic controls and visible focus states.

---

# 8. Interaction separation from Research Journal

Calculation History and Research Journal are two different working-memory systems.

## Research Journal

Continues to manage:
- collected evidence;
- evidence ordering;
- Important / Unmark;
- Return to source;
- evidence drag/drop into supported fields.

## Calculation History

Manages:
- calculator expressions;
- calculator results;
- reuse of numeric results.

### Guardrail

Do not merge Calculation History entries into the Research Journal automatically.

Do not alter:
- Research Journal sorting;
- evidence persistence;
- Important / Unmark;
- Return mechanics;
- evidence identities;
- existing journal drag/drop behaviour.

---

# 9. Protected behaviour

V2.4.5 must not alter:

- Salvanova model values corrected in V2.4.4;
- Caldera or Norvale scenario data;
- Red Rock answer keys;
- Red Rock scoring weights;
- Red Rock tolerances;
- Red Rock timers;
- stage-lock logic;
- Learning / Simulation feedback rules;
- Graph Selection acceptance rules;
- Visual Report case calculations;
- Research Journal mechanics;
- Sea Wolf datasets, routing, scoring, treatment locks, or progression;
- DecisionLab branding;
- unrelated Home or Results layouts.

---

# 10. Validation requirements

Before V2.4.5 is considered complete, validate the following.

## Layout

- Desktop Analysis renders as:
  **Analysis | Calculator | Research Journal**.
- Research Journal is no longer vertically compressed by the Calculator.
- Calculator fits its dedicated rail without oversized controls.
- Narrow layouts remain usable.

## Analysis typography

- Reduced visual density is limited to the Analysis pane.
- No global typography regression occurs.

## Calculator history

- Completing a calculation adds a visible history row.
- Multiple rows append correctly.
- Long history scrolls independently.
- History is not lost when moving away from Analysis.

## Persistence

Verify:

**Analysis → Written Report → Graph Selection → Visual Report**

and confirm the same history reappears.

Verify:

**Visual Report Case 1 → Case 2 → ... → Case 6**

and confirm history continues accumulating.

Verify reload/autosave restoration where supported.

Verify Reset clears the relevant Red Rock history.

Verify switching to a different Red Rock scenario does not inherit the previous scenario's history.

## Result reuse

Verify history results can populate:

- eligible Analysis numeric fields;
- eligible Visual Report numeric fields;
- the Calculator expression/input field.

Confirm:

- the history row remains after reuse;
- dropping into an answer field does not submit it;
- dropping into an answer field does not reveal correctness;
- Research Journal drag/drop continues to work independently.

## Regression guardrail

Compare protected source areas against V2.4.4 and confirm that unrelated scenario data, scoring logic, Sea Wolf mechanics, and global styling have not changed unintentionally.

---

## V2.4.5 release summary

**Optimise the Red Rock Analysis workspace around three parallel work surfaces — think, calculate, reference evidence — while turning Calculation History into persistent, reusable attempt-scoped working memory.**
