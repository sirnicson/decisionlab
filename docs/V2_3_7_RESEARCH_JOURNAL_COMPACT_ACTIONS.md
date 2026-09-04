# DecisionLab V2.3.7 — Research Journal Compact Actions

## Scope

This release changes the presentation of Red Rock Research Journal entries only.

### Locked visual behaviour

- Journal cards use a two-column layout.
- Evidence source, label and value remain grouped on the left.
- The right side contains exactly two equal circular controls: Important / Unmark and Return.
- Important uses a check icon; its pressed state is communicated through `aria-pressed` and the existing highlighted card state.
- Return uses a return-arrow icon. For Investigation evidence it removes the item from the journal; analysis-generated evidence keeps the existing non-returnable rule and shows the control disabled for grid consistency.
- Visible rectangular `Important`, `Unmark` and `Return` button rows are removed.
- Both icon buttons expose accessible labels and title tooltips.

## Preservation lock

No scenario data, Red Rock scoring, answers, timers, navigation, drag-and-drop values, Sea Wolf data, Sea Wolf scoring, or Learning/Simulation rules are changed.
