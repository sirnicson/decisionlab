# V1.2.5 — Contextual Evidence Interaction Update

Implemented without changing Red Rock calculations, scoring weights, stage locks, Sea Wolf mechanics, fonts, colours, or Home mode cards.

- Study Information evidence is now collected directly from inline sentence context; the duplicate evidence-card grid is removed.
- Every draggable Study Information fact in Salvanova, Caldera and Norvale has an explicit inline mapping.
- Research Journal entries retain their source location: Study Information, Exhibit 1, Exhibit 2, or Analysis.
- Investigation Exhibits 1 and 2 are rendered as compact analytical tables from their authored data structures.
- Numeric/numeric-bearing exhibit cells are individually draggable and click-addable, with row/column context retained in the Journal.
- Known authored exhibit evidence is bound back to its existing Fact IDs where applicable so evidence-selection scoring can recognise it.
- Relevant and distractor evidence use the same neutral interaction style.
- Drag-back/Return remains available before the Analysis lock.
