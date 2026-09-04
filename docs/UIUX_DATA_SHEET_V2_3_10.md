# DecisionLab — UI/UX Data Sheet V2.3.10

## Release

**Version:** 2.3.10  
**Release focus:** Research Journal reorder responsiveness

## Locked product hierarchy

- Product identity: **DECISIONLAB**
- Workspace label: **Client Advisory Workspace**
- Engagement: Fairhaven Environmental Trust / Environmental Recovery Programme
- Navigation and all Red Rock / Sea Wolf study mechanics remain as in V2.3.9.

## Research Journal — V2.3.10 interaction contract

### Reorder

- Reordering is initiated only from the **full-height left grip** on a journal card.
- Desktop grip target: **30 px wide**; narrow-screen target: **28 px wide**.
- Sorting uses **Pointer Events**, not nested HTML5 `draggable` elements.
- On pointer movement, the selected card is rendered as a **lifted fixed preview** following the pointer.
- The original card is removed from the list during the gesture and a **lime dashed placeholder** opens at the current insertion position so adjacent cards make room.
- Drop position is recalculated from the vertical centres of remaining journal cards.
- Near the top/bottom edge of the journal, scrolling is continuous through `requestAnimationFrame`, with speed increasing as the pointer approaches the edge.
- Releasing the pointer commits the journal array order through the existing persistence path.
- Pointer cancellation leaves the saved journal order unchanged.
- The focused grip still supports **Arrow Up / Arrow Down** reordering.

### Existing evidence drag/drop — preserved

- The **journal card body/value remains draggable** into Analysis and Report answer fields.
- The reorder grip is explicitly `draggable={false}` so sorting and value-dragging do not compete.
- Research Journal → active work area behaviour therefore stays separate from vertical prioritisation.

### Journal card actions — preserved

- One circular **Important / Unmark** control.
- One circular **Return** control.
- Important cards retain the lime-highlighted state.
- Analysis-generated journal evidence remains non-returnable.

### Heading — preserved

**RESEARCH JOURNAL · COLLECTED EVIDENCE**

## Styling additions

- `.journal-reorder-handle` — full-height pointer grip.
- `.journal-dropzone.is-sorting` — sorting-state containment.
- `.journal-sort-placeholder` — live insertion space.
- `.journal-sort-preview` — lifted card preview.
- `body.journal-pointer-sorting` — global grabbing cursor during active sort.

## Protected mechanics

V2.3.10 does not alter Red Rock/Sea Wolf data, answer keys, scoring, timers, routing, persistence structure, Learning/Simulation behaviour, journal evidence values, Important semantics or Return semantics.
