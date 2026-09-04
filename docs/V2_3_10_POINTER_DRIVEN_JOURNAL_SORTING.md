# V2.3.10 — Pointer-driven Research Journal sorting

## Objective

Make manual journal prioritisation respond immediately and predictably in the narrow Research Journal rail, without interfering with the existing evidence-value drag/drop interaction.

## Interaction model

- **Left reorder grip:** pointer-driven vertical sorting only.
- **Journal card body/value:** retains the existing native drag payload used by Analysis and Report fields.
- **Important control:** unchanged.
- **Return control:** unchanged.

## V2.3.10 changes

1. Removed nested native HTML5 `draggable` behaviour from the reorder handle.
2. Added pointer-down / pointer-move / pointer-up sorting with window-level pointer tracking.
3. Enlarged the grip to a full-height 30 px desktop target (28 px on narrow screens).
4. Added a fixed lifted preview that follows the pointer vertically.
5. Added a live placeholder so cards open a visible insertion space before release.
6. Added continuous edge auto-scroll using `requestAnimationFrame`, with speed increasing toward the rail edge.
7. Retained keyboard Up/Down movement for accessibility.
8. Reordered journal arrays continue to persist via the existing `updateJournal` → Red Rock attempt persistence path.

## Protected behaviour

No changes were made to scenario data, answer keys, Red Rock scoring, Sea Wolf scoring/data, timers, stage routing, Learning/Simulation behaviour, evidence values, Important state semantics or Return semantics.
