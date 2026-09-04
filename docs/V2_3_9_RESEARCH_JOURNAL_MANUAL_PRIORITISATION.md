# V2.3.9 — Research Journal Manual Prioritisation

## Objective
Allow a learner to manually reorganise collected Research Journal evidence vertically without changing evidence content, scoring or any Red Rock mechanics.

## Interaction
Each journal card now exposes a dedicated six-dot reorder handle on the left. Dragging that handle moves the entire card as one journal item.

- Hovering the upper half of another card targets insertion **before** that card.
- Hovering the lower half targets insertion **after** that card.
- A lime insertion line shows the active destination.
- The card being moved is visually faded.
- Dropping commits the new array order through the existing `updateJournal()` / attempt persistence flow.
- When the pointer approaches the top or bottom of the journal viewport during reordering, the journal auto-scrolls.

## Input separation
The V2.3.9 implementation intentionally separates two drag behaviours:

- **Reorder handle drag:** changes the vertical order of journal cards.
- **Journal card drag:** retains the existing behaviour for dragging a journal value into answer/report fields.

The Important/Unmark and Return icon controls are unchanged.

## Keyboard access
When the reorder handle has focus:

- `ArrowUp` moves the journal item one position upward.
- `ArrowDown` moves the journal item one position downward.

The resulting order is persisted using the same mechanism as pointer-based reordering.

## Preservation lock
V2.3.9 does not intentionally change:

- Red Rock evidence values or study/exhibit data;
- Red Rock analysis/report answers or scoring;
- evidence Important/Unmark state;
- Return behaviour;
- Sea Wolf mechanics/data/scoring;
- timers;
- routing;
- Learning Mode versus Simulation Mode behaviour;
- result logic.
