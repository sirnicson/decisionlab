# DecisionLab — UI/UX Data Sheet V2.4.5

## Release

**Version:** 2.4.5  
**Phase:** Final correction & consolidation  
**Release focus:** Red Rock Analysis workspace optimisation and persistent calculator working memory

## Product-development intent

V2.4.5 refines the Red Rock working environment without reopening scenario logic or assessment mechanics. The release reorganises the Analysis desktop workspace around three parallel work surfaces — **Analysis | Calculator | Research Journal** — and makes calculator history a persistent, reusable part of the active Red Rock attempt.

## 1. Analysis workspace

On wide desktop layouts, Red Rock Analysis now renders as:

**Analysis | Calculator | Research Journal**

- Analysis remains the primary/widest canvas.
- Calculator receives a dedicated compact middle rail.
- Research Journal receives its own full-height right rail.
- The former Journal/Calculator vertical stack is not used during Analysis.
- Narrower layouts progressively collapse rather than forcing three compressed columns.

## 2. Analysis typography

Analysis-only typography is reduced and tightened to lower visual noise:

- smaller page/question supporting text;
- tighter Analysis section spacing;
- smaller question/field labels;
- more compact answer fields and buttons;
- hierarchy remains intact.

The typography changes are scoped to `.redrock-workspace.utility-analysis`; global DecisionLab typography is unchanged.

## 3. Compact calculator UI

The Red Rock Calculator is restyled for a narrow utility rail:

- smaller keypad buttons;
- tighter grid gaps and padding;
- compact expression input;
- compact current-result display;
- smaller help text;
- calculation parser and arithmetic rules unchanged.

The same compact calculator presentation is used when the Calculator reappears in Visual Report.

## 4. Functional Calculation History

Completed calculations now append to a visible Calculation History list. Each entry stores:

- expression;
- result;
- creation timestamp / unique entry ID.

Example:

`500000 * 1.10 = 550000`

History scrolls independently and automatically reveals newly appended calculations.

## 5. Attempt-scoped persistence

`RedRockAttempt` now includes optional `calculationHistory` state. New attempts initialise it as an empty array.

The same history therefore survives:

**Analysis → Written Report → Graph Selection → Visual Report → Visual Report Cases 1–6**

It also survives the existing active-session JSON save/reload flow because it is stored inside the Red Rock attempt object.

History does not become global application state and is not merged with the Research Journal.

## 6. Reusable history results

The numeric result of each history entry is a reusable draggable payload using the existing `application/x-solve-value` convention.

A history result can be dropped into:

- eligible Analysis numeric answer fields;
- eligible Visual Report numeric answer fields;
- the Calculator expression field.

Using a value copies it. The original history entry remains in place.

Dropping a value into an assessment field only populates that field; it does not submit the answer, reveal correctness, or complete the question.

For keyboard access, each history result is also a semantic button. Activating it reuses that result in the Calculator input.

## 7. Research Journal separation

Research Journal behaviour is unchanged:

- evidence collection;
- pointer/keyboard reordering;
- Important / Unmark;
- Return;
- evidence drag/drop;
- persistence and canonical evidence resolution.

Calculation History remains a separate quantitative scratchpad/work-memory system.

## Protected baseline

V2.4.5 does not alter:

- V2.4.4 Salvanova hare or tourism model values;
- Caldera or Norvale data;
- Red Rock answer keys, tolerances or scoring;
- timers or stage locks;
- Graph Selection acceptance rules;
- Visual Report case data/calculations;
- Learning / Simulation feedback rules;
- Sea Wolf datasets, routing, prospect selection, treatment or scoring;
- Home or Results behaviour;
- DecisionLab branding.
