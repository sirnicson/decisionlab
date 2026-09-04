# DecisionLab V2.4.5 — Red Rock Analysis workspace and persistent calculator

## Phase

**Final correction & consolidation.**

## Problem addressed

During Red Rock Analysis, the Calculator was stacked beneath the Research Journal. This compressed the Journal vertically and made the Calculator feel oversized for a utility role. The Calculator also maintained history only in local component state, so completed calculations were not durable when the component disappeared and later returned in Visual Report.

## Changes implemented

### Analysis workspace

- Wide desktop Analysis uses three columns: **Analysis | Calculator | Research Journal**.
- Calculator is a dedicated middle rail.
- Research Journal receives a full-height right rail.
- Narrower viewports fall back to a reduced/stacked responsive arrangement.

### Analysis density

- Analysis-only headings/supporting text/field labels and spacing are tightened.
- Answer controls remain readable and usable.
- No global typography rule is changed.

### Calculator presentation

- Keypad controls, gaps, input, result display and helper text are reduced for the narrow rail.
- The arithmetic parser/evaluator is byte-for-byte unchanged from V2.4.4.

### Functional history

- Completed calculations now append to a visible, independently scrollable Calculation History.
- History no longer lives inside the mounted Calculator component.
- It is stored on the active `RedRockAttempt` and automatically participates in the existing session persistence flow.

### Cross-stage persistence

History survives Calculator disappearance and remount across:

**Analysis → Written Report → Graph Selection → Visual Report**

and continues accumulating through **Visual Report Cases 1–6**.

### Result reuse

- History results are draggable using the existing numeric drag payload.
- They can populate eligible Analysis or Visual Report numeric answer fields.
- They can be dropped back into the Calculator input for continued working.
- Reuse is copy-only; the history entry remains.
- Dropping into an answer field does not submit or validate the answer.
- Each history result is also keyboard-activatable to reuse it in the Calculator.

## Deliberately unchanged

- Red Rock scenario data and answer keys
- V2.4.4 Salvanova modelling corrections
- Caldera / Norvale data
- Research Journal mechanics
- Red Rock scoring, tolerances, timers and stage locks
- Visual Report case calculations
- Graph Selection mechanics
- Learning / Simulation rules
- Sea Wolf data, routing, scoring and treatment mechanics
- Home / Results behaviour
- DecisionLab branding
