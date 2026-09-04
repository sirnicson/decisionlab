# Solve It Readiness Lab — UI/UX DATA SHEET V2.2.8
Version: 2.2.8 — Consolidated Navigation, Client Situation Briefs, Binary Graph Output, Four-Dimension Red Rock / Sea Wolf Scoring, Client-Led Results
Status: CONSOLIDATED SOURCE OF TRUTH — CONSULTING NARRATIVE, LOCKED TASK 1/TASK 2 MECHANICS, OPERATIONAL SEA WOLF DECKS, RESEARCH-INFORMED DATA GOVERNANCE, VISUAL SYSTEM, NAVIGATION, UTILITY-PANEL, RESULTS-REVIEW, GLOBAL CHART-INTERACTION AND RED ROCK WRITTEN-REPORT ARCHITECTURE LOCKED
Purpose: Master implementation specification for an independent Solve-style readiness application. It combines the sealed Red Rock workflow, the validated Sea Wolf workflow, a single consulting-engagement narrative, and a research-informed environmental data deck.

> Important: This is an independent educational practice specification based on the supplied reference materials. It should not present itself as an official McKinsey product, reproduce proprietary assets, or claim official scoring/percentile equivalence.

> **V1 implementation rule:** Task 1 contains three fixed Red Rock studies. Task 2 contains three fixed Sea Wolf studies, each with three fixed sites. Sea Wolf randomisation is deferred until after the fixed V1 decks have passed validation. Learning Mode uses concise client-framed feedback after submitted routing decisions and post-stage review; prospect choices remain editable until confirmed and are assessed later. Simulation Mode provides no live answer or allocation feedback.

## V2.2.8 CONSOLIDATED UX/UI ARCHITECTURE LOCK

This V2.2.8 document is the authoritative implementation source. Where any earlier amendment, appendix, screenshot-era note or legacy prototype conflicts with the rules below, **V2.2.8 wins**. In particular, V2.2 removes the separate Red Rock white stage rail, removes the global `Practice clean` card, removes the legacy `Decision Review` feature as a standalone navigation destination, moves Red Rock subnavigation into the dark application sidebar, relocates Red Rock utilities to the right-side utility area, and integrates detailed decision explanation into Result pages.

The locked Red Rock and Sea Wolf game mechanics, datasets, scoring formulas, scientific-plausibility rules, client narrative and visual identity remain unchanged unless this document explicitly says otherwise.


### Contextual Graph Selection
Graph Selection is no longer allowed to present the same three chart choices in every Red Rock study. Each study must use a context-specific option set derived from the question being asked and the structure of the data.

Each Red Rock Graph Selection presents exactly **three** chart choices:
- **two defensible/accepted choices** that communicate the requested comparison well;
- **one deliberately less-suitable choice** that is still technically drawable but does not fit the analytical communication task as well.

The locked V2.2.3 option sets are:

| Red Rock study | Graph Selection decision | Accepted / defensible charts | Less-suitable chart |
|---|---|---|---|
| **Salvanova Forest** | Compare Year 0 and Year 5 vegetation cover across with-wolves and no-wolves scenarios | **Clustered bar chart**, **Slope chart** | Scatter plot |
| **Caldera Marsh** | Compare Year 0 and Year 5 values across nitrogen, phosphorus and dissolved oxygen | **Dumbbell chart**, **Clustered bar chart** | Line chart |
| **Norvale Highlands** | Communicate the direction and size of forest-cover change from Year 0 to Year 5 under natural and integrated recovery | **Line chart**, **Slope chart** | Pie chart |

The scoring engine therefore treats either of the two accepted chart types as a correct chart-choice decision. The entered data values remain scored exactly as before. The generated preview must render the **selected chart type itself** rather than falling back to a generic bar visual. Contextual previews must preserve the global data-point visibility rule, including hover, keyboard focus and tap/click access to exact values.

For Caldera specifically, graph preview data must be grouped by indicator — Nitrogen, Phosphorus and Dissolved Oxygen — with Year 0 and Year 5 treated as the paired comparison states. No preview may silently omit the Dissolved Oxygen pair.

### Global chart data-point visibility
All quantitative charts in the application use one global interaction standard. A learner must never have to estimate an exact value from visual position alone when that value exists in the underlying chart data.

- Every **line-chart point** must expose its exact source value on hover, keyboard focus or tap.
- Every **bar-chart mark** must expose its exact source value on hover, keyboard focus or tap.
- Every **scatter-plot point, dumbbell endpoint, pie slice or equivalent quantitative mark** must follow the same rule.
- The displayed value must retain the relevant **series name, period/category and unit** where those exist. Multi-series charts must identify which series the selected point belongs to.
- Numeric formatting must remain decision-readable: thousands separators for large counts, decimals where present in source data, and appropriate `%`, currency, `mg/L`, population, area, emissions or other units.
- Mouse hover shows the value temporarily. Keyboard focus shows the same value and provides an accessible label. Tap/click may pin the value so the interaction also works on touch devices; selecting another mark updates the displayed value.
- Interactive chart marks use a visibly larger focus/hover state without permanently printing every number over the chart. This preserves chart readability while making every exact value inspectable.
- Shared chart components/utilities implement this rule **globally**. Individual pages must not create non-interactive quantitative charts outside the shared behaviour.
- Red Rock Investigation mini-trend charts follow the same interaction rule as the standard chart renderer.
- Graph Selection generated previews, Visual Report charts and chart visualisations embedded in Result reviews inherit the same behaviour automatically through the shared chart renderer.
- Analytical visuals whose exact quantitative values are already persistently printed beside their marks may keep those persistent labels; they must not hide a value that can only be inferred from bar length, position or colour.
- Decorative chart-choice icons are not data visualisations and are excluded from this rule.
- Investigation tables remain the authoritative source for exact draggable/click-addable Research Journal evidence; chart inspection does **not** itself add evidence to the Journal.

## V1.2 CONSISTENCY & GAMEABILITY LOCK

This revision is authoritative for implementation. It:
- leaves the sealed Task 1 Red Rock mechanics unchanged;
- keeps the validated Sea Wolf two-stream model: **Routing** and **Treatment Building**;
- makes Characteristics selection materially determine the six-card Initial Prospect Pool from a fixed 12-card treatment-profiling universe;
- removes obsolete learner-facing `Reasoning Flow` framework references and embeds decision support in the Fairhaven client narrative;
- resolves the Calculator / Research Journal placement conflict;
- standardises native **Solve It / READINESS LAB** branding and product-name casing;
- standardises **Visual Report Case** terminology;
- locks one global four-trait vocabulary for Sea Wolf V1;
- replaces incomplete Sea Wolf pool summaries with operational data for all **9 sites**: routing deck 10 + profiling universe 12 → characteristic-derived initial pool 6 + four 1-of-3 prospect rounds + treatment validation;
- adds concise sponsor/client language at case openings and major transitions;
- preserves the approved colours, fonts, spacing, shell and assessment behaviour.

---


## V1.2.2 CLIENT-NARRATIVE & UI REVIEW LOCK

This amendment supersedes earlier learner-facing Sea Wolf copy/layout where it conflicts.

### Client voice
- Dr. Paula Reyes speaks in the **first person** throughout Sea Wolf briefs, requests, contextual prompts and Learning Mode response notes.
- Dr. Elena Cross and Dr. Paula Reyes provide **client debriefs after their workstreams**, supplementing — not replacing — the analytical result panes.
- Client debriefs interpret strengths, weaknesses and decision consequences against the consultancy brief so the experience remains consulting-adjacent while the detailed score remains assessment-relevant.
- Use one compact, consistent client-response component with a small person/avatar icon, sponsor name, role and 12–13px body copy.
- Avoid large standalone strategy labels such as `Route It`, `Pool Question`, `Final Recommendation`, or visible `Strong/Weak` flags when the same idea can be expressed naturally in the sponsor's first-person request or debrief.

### Sea Wolf introductory brief
- Do not show difficulty-tier labels anywhere in the learner-facing Sea Wolf experience.
- The opening brief is a natural first-person client message covering: context, problem, scope, constraints, expected decision, information/resources available, lock points and the 30-minute simulation expectation.
- The four-part operating sequence is explained inside that client narrative; it is not presented as a separate framework strip.
- Remove the standalone `Two connected decisions` notice. The distinction between routing and treatment-building is explained within the brief.

### Site and routing UI
- Remove the stray `1 2 3` site-number row. `Site X of 3` is sufficient.
- Site-level requests from Dr. Reyes are first-person client requests.
- Routing counters sit inside a compact bordered container.
- Do not repeat the microbe name as a large `Categorise [name]` heading when the active card already displays the name.
- Current / Next / Return counts sit in their own compact container beside the active microbe.
- Learning feedback after a submitted routing decision is delivered as a short first-person Dr. Reyes response, not a large generic judgement banner.

### Prospect Selection
- The page title hierarchy must not allow the round label to crowd the main title.
- The current pool is shown as compact rounded cards in a multi-column grid rather than full-width horizontal rows.
- Candidate selection is **not committed on click**. Clicking only marks a candidate; the learner may change the choice until `Confirm selection`.
- No Strong / Defensible / Weak response appears when a prospect card is merely selected. Prospect decision quality is recorded on confirmation and surfaced in the client/result review.
- Dr. Reyes asks the pool-balance question in first person.

### Treatment
- Use a dark-accent treatment bench containing **three horizontal treatment slots**.
- Selected treatment microbes move from the available final-pool grid into those slots; do not display the same microbe twice on the page.
- Dr. Reyes states the treatment request in first person.
- Keep stage metadata smaller than the treatment page title.

### Treatment Result
- Page title: `Treatment Result`.
- The primary result sits in a **lime/accent result card**.
- Remove the learner-facing five-line 20% rubric from the result page.
- Dr. Reyes explains the score in first person by naming the conditions the selected trio met or missed. For example, a trio that meets four of five conditions scores 80%; the explanation must identify the missed condition.
- `Reference maximum feasible effectiveness` remains visible only as a small secondary note.
- Simulation Mode continues to hide site-effectiveness detail until the relevant Result page.

### Client close-out
- Task 1 result: add a Dr. Elena Cross client debrief that identifies the strongest contribution, the main weakness and what she would challenge before programme sign-off.
- Task 2 / final result: add a Dr. Paula Reyes client debrief that assesses treatment construction, routing, prospect selection and cross-site option preservation.
- In a full simulation, the final Results screen presents these sponsor views as a short **client close-out meeting** before the scorecards, reasoning profile and integrated detailed decision explanation.
- These narrative debriefs do not change scoring formulas.

## V1.2.4 SPONSOR HANDOVER & RED ROCK EVIDENCE-QUALITY LOCK

This amendment is authoritative wherever earlier copy conflicts.

### Shared workstream entry
Both tasks begin with the same consulting-adjacent narrative rhythm:

`Senior client welcome → decision at stake → consultant mandate → resources / constraints → Review the Brief → gameplay`

- The sponsor speaks in the **first person**.
- The welcome should sound like a senior client handing over an important decision, not an instructional framework.
- Do not expose a named reasoning framework.
- Use the existing compact client/avatar treatment and current typography.

### Red Rock — Dr. Elena Cross
- Every Red Rock study opens with **“Welcome, and thanks for joining this workstream.”**
- The case-specific message naturally covers context, problem, decision at stake, what Dr. Cross needs, evidence/tools available and the 35-minute full-simulation allowance.
- The opening CTA is **`Review the Brief →`** and leads to Study Information.
- Salvanova, Caldera and Norvale use case-specific client wording rather than duplicated body copy.

### Sea Wolf — Dr. Paula Reyes
- Every Sea Wolf study opens with the same senior-client welcome pattern before Site 1.
- The message naturally covers contaminated-site context, programme problem, connected three-site scope, cross-site constraints, information/resources available, the decision expected and the 30-minute full-simulation allowance.
- The opening CTA is **`Review the Brief →`** and leads to the Site 1 brief.

### Red Rock distractor rule
Across Salvanova, Caldera and Norvale:
- remove prose that explicitly says a fact is irrelevant, contextual, non-decision-critical or not a driver;
- Research Journal source cards contain **actual evidence/data points only**;
- a valid distractor is a plausible **numeric or measurable fact**;
- relevant and irrelevant facts use the same neutral presentation;
- distractors must not contradict the case, change any answer, create a second valid interpretation, or become necessary for a required calculation;
- the learner must infer relevance from the question and evidence rather than from author commentary.

Locked neutral distractors in V1.2.4:
- **Salvanova:** 14 marked hiking trails; 5 ranger stations.
- **Caldera:** 18 km marsh boundary; 4 ranger stations; 27°C average summer air temperature; 11-year observation-tower age; 16% of visitors arriving by bicycle.
- **Norvale:** visitor centre rebuilt in 2019; 3 marked hiking routes.

### Preservation rule
This amendment changes narrative and evidence presentation only. It does **not** change Red Rock calculations, answer keys, workflow, journal mechanics, Sea Wolf mechanics/data logic, fonts, colours, core layout, or the Home Learning/Simulation mode cards.

## 1. SOURCE HIERARCHY

## 1.1 Mechanics and interaction sources
1. **Latest validated screenshot/video workflow notes — 16 August 2026**
   - Highest-priority source for the exact Sea Wolf sequence and cross-site behaviour.
   - Supersedes earlier interpretations that incorrectly treated categorisation as the source of the six-microbe Prospect Pool.
2. **McKinsey Solve It explanation.docx**
   - Primary supplied source for overall 2025/2026 game structure, timing, Red Rock walkthrough behaviour and Sea Wolf task concepts.
3. **McKinsey own style.docx**
   - Primary supplied visual reference for the restrained analytical workspace, navigation character, journal/calculator behaviour, site workflow and modal patterns.
4. **McKinsey Solve It ScreenShots.docx**
   - Visual reference archive for manual comparison during implementation.
5. **mckinsey_solve_it_practice_game.html**
   - Legacy prototype only. Reuse components or ideas where helpful; it is not a mechanics source of truth.

## 1.2 Scientific-plausibility sources
The environmental cases use **primary peer-reviewed geographical, ecological, environmental microbiology and bioremediation research** as a plausibility layer. Research informs:
- direction of ecological relationships;
- plausible environmental constraints;
- microbial functions and environmental sensitivities;
- trade-offs, complementarity and context dependence;
- orders of magnitude and realistic units where useful.

Research **does not supply the deterministic answer values** used by the game. Those values are synthetic training data engineered for exact reasoning and scoring.

## 1.3 Priority rule
When sources disagree:
1. validated game-mechanics observations from the supplied walkthrough/screenshots;
2. supplied explanation document;
3. supplied visual references;
4. this V1.1 source-of-truth specification;
5. legacy prototype behaviour.

Scientific literature governs **plausibility**, not the proprietary game logic. No scientific paper is treated as evidence that the simulated game attributes or scores are real laboratory measurements.

# 2. PRODUCT DEFINITION

## 2.1 Product goal
Create an interactive readiness environment that develops decision quality under time pressure through two different environmental problem types:
- evidence selection and quantitative analysis;
- allocation under constraints;
- prioritisation and opportunity cost;
- portfolio/combinatorial reasoning;
- clear synthesis and recommendation.

The environmental setting should feel **scientifically plausible and coherent**, while the challenge itself is deliberately engineered around judgement, constraints, trade-offs and decision quality rather than scientific recall.

## 2.2 Engagement narrative — learner-facing source of truth
The entire experience is one fictional consulting engagement.

**Client:** Fairhaven Environmental Trust  
**Mandate:** Environmental Recovery Programme  
**Learner role:** member of the advisory team supporting two connected workstreams.

### Engagement opening copy
> **The Fairhaven Environmental Trust has asked your team to support an environmental recovery programme across two workstreams.**
>
> The problems are different, but the expectation is the same: work with the evidence available, make sound decisions under constraints, and give the client a clear basis for action.

### Workstream 01 — Red Rock Studies
**Sponsor:** Dr. Elena Cross  
**Title:** Director of Land & Ecosystem Recovery

Learner-facing brief is delivered as a first-person message from Dr. Elena Cross with the person/avatar treatment used for client representatives:
> I need you to understand what is changing across Fairhaven's terrestrial and wetland systems, what the evidence implies, and what I should recommend. Investigate the situation, analyse the evidence and give me a concise decision-ready report. Use the Research Journal and available analytical tools to keep the evidence traceable; in a full simulation, complete the workstream within 35 minutes.

Operational task structure remains:
**Investigation → Analysis → Report**

### Workstream 02 — Sea Wolf Studies
**Sponsor:** Dr. Paula Reyes  
**Title:** Lead Marine Biologist

Learner-facing brief:
> I am coordinating treatment across three connected contaminated marine sites. I need you to make a recommendation for each site without losing sight of what the programme may need next. Work site by site: choose two characteristics to shape the six-microbe treatment pool; separately route ten microbes to the current site, the next site where available, or return; then add one candidate from each of four prospect sets before recommending a final three-microbe treatment. I will keep the complete current-site requirements and limited next-site insight visible as your working reference. Once a treatment is confirmed, that site is closed. In a full simulation, I expect the three-site workstream to be completed within 30 minutes.

The operating sequence is therefore explained **inside the client brief**, not shown as a separate learner-facing framework strip.

## 2.3 Embedded reasoning — no visible framework
The previous learner-facing **Reasoning Flow** framework is retired.

Reasoning support is now embedded naturally in:
- the sponsor brief;
- task instructions;
- short contextual prompts at the point of decision;
- Learning Mode feedback;
- post-task review.

Do not show a persistent card, stepper or labelled framework called `Reasoning Flow`, `Strategy Lab`, `Problem-Solving Framework` or similar.

Examples of natural prompts:
- Red Rock: `What does Dr. Cross need to know?`, `Which evidence changes the answer?`, `What calculation closes the gap?`, `Does the recommendation still hold against the constraint?`
- Sea Wolf: `What does this site need?`, `What should be routed forward?`, `What is missing from the current pool?`, `Which trio works best together?`

The underlying reasoning logic may remain in authoring metadata and tests, but should not feel like a course framework in the learner UI.

## 2.4 Product modes

### Learning Mode
Purpose: build transferable judgement before speed is introduced.

The user can:
- choose an individual Red Rock or Sea Wolf study;
- use an optional timer;
- receive concise contextual prompts in the sponsor/client voice;
- receive short first-person client responses after submitted routing decisions;
- keep Prospect Selection editable until confirmation, with decision quality assessed later in the relevant Result page rather than revealed on card selection;
- retry and review decisions.

### Simulation Mode
Purpose: reproduce the pressure, information-management and navigation discipline of a Solve-style assessment.

The user must:
- select one Red Rock study and one Sea Wolf study;
- complete the 65-minute combined simulation (35 + 30 minutes; tutorials excluded);
- receive no live hints, correctness reveal or allocation feedback;
- respect stage locks;
- receive feedback only after completion.

### Post-session Review
Review may include response replay, calculations, decision path, time use, error classification and the most useful next-practice recommendation.

# 3. HIGH-LEVEL ASSESSMENT ARCHITECTURE

## 3.1 Home / engagement selector
The Home screen introduces the **Fairhaven Environmental Trust — Environmental Recovery Programme** and then presents the two workstreams.

Recommended hierarchy:
- engagement title and two-sentence mandate;
- **Workstream 01 — Red Rock Studies** / Task 1;
- **Workstream 02 — Sea Wolf Studies** / Task 2;
- Learning Mode / Simulation Mode;
- case selectors;
- Begin.

The tone is inviting, concise and consulting-adjacent. Avoid dense consulting jargon, corporate role-play language or unnecessary framework terminology.

### Narrative originality rule
The Fairhaven world is fictional and should remain light-touch:
- use original place names, sponsors, site contexts and environmental decisions;
- never reproduce proprietary McKinsey story text, artwork, logos or exact screen copy;
- preserve the **decision grammar** while expressing it through original client situations and synthetic research-informed data;
- every case opening should answer three things in under roughly 120 words: **what changed, what the client needs, what the learner must decide**.

## 3.2 Task 1 — Red Rock Studies — sealed mechanics
V1 contains:
1. Salvanova Forest;
2. Caldera Marsh;
3. Norvale Highlands.

Every study uses the sealed interaction grammar:
1. **Investigation** — Objective → Study Information → Exhibit 1 → Exhibit 2
2. **Analysis** — one long page containing Question 1–4; main canvas expanded; Research Journal + Calculator grouped in the right-side utility area
3. **Report** — Written Report → Graph Selection → Visual Report
4. **Visual Report** — Case 1 → Case 2 → Case 3 → Case 4 → Case 5 → Case 6; Calculator alone in the right utility panel
5. **Task 1 Result** — client debrief + benchmark/scoring breakdown + integrated detailed answer/decision explanation

Task 1 is not structurally changed by the consulting narrative or the Sea Wolf redesign.

## 3.3 Task 2 — Sea Wolf Studies — locked mechanics
V1 contains:
1. **Cinder Bay**;
2. **Tidal Reach**;
3. **Azure Shelf**.

Each study contains three connected sites.

### Study flow
**Introduction → Site 1 → Site 2 → Site 3 → Task 2 Results**

### Site 1 flow
**Select site → confirmation → Select 2 Characteristics → Categorise 10 microbes → Initial Prospect Pool 6 → four sequential 1-of-3 additions → Final Prospect Pool 10 → choose final 3 → Confirm Choice → site complete**

### Sites 2 and 3 flow
**Transferred-pile reassessment → enter Current Site → Select 2 Characteristics → Categorise the site's separate 10-microbe routing deck → Initial Prospect Pool 6 → four sequential 1-of-3 additions → Final Prospect Pool 10 → choose final 3 → Confirm Choice**

Site 3 has no further Next Site route. After its treatment is confirmed, Sea Wolf ends and Task 2 Results opens.

### Critical two-stream rule
Sea Wolf contains two distinct functional streams:

**Routing stream**  
Categorise a separate 10-microbe set → Current Site / Next Site / Return → transferred microbes are reassessed when the next site's full requirements become available.

**Treatment-building stream**  
Select 2 characteristics → separate Initial Prospect Pool 6 → four 1-of-3 additions → Final Pool 10 → choose treatment trio → effectiveness score.

**Categorisation does not create the Initial Prospect Pool.**

## 3.4 Timed full simulation
- Red Rock: **35 minutes**
- Sea Wolf: **30 minutes**
- Combined: **65 minutes**, excluding tutorials
- Timer/session state persists across permitted navigation.

# 4. GLOBAL INFORMATION ARCHITECTURE

## 4.0 Home screen

The Home screen should be **sparse, direct and assessment-oriented**, not a dashboard.

### Left side
- heading: `Assessment`
- short explanatory copy;
- simulation timing note;
- full-screen recommendation;
- independent educational-practice disclaimer.

### Right side
Two task selectors:
- `Task 1: Red Rock Study`
- `Task 2: Sea Wolf Study`

Above or immediately beside the selectors:
- `Learning Mode`
- `Simulation Mode`

Below:
- `Begin`

The visual language should closely resemble the supplied Solve reference in:
- concise instructional wording;
- dark assessment panel;
- simple native-looking selectors;
- minimal ornament;
- clear task labels;
- single obvious primary action.

Do **not** reproduce McKinsey logos, protected artwork, exact typography or proprietary visual assets.


## 4.1 App-level navigation
The persistent dark sidebar is the single authoritative navigation surface. Its top-level structure is:
- **Command Centre**
- **Red Rock Study**
- **Sea Wolf Study**
- **Results**

`Decision Review`, `Session Review`, `Progress`, and the former `Practice clean` card are **not separate sidebar destinations** in V2.2.

When a task is active, its permitted detailed subnavigation expands directly beneath that task label in the dark sidebar. For Red Rock this includes Investigation, Study Information, Exhibits, Analysis questions, Written Report, Graph Selection, Visual Report and Cases 1–6. This nested navigation obeys all existing lock points.

### Simulation constraint
In Simulation Mode, users should not freely jump between stages once a lock point has been passed. Locked or future subpages may remain visible but inactive where useful for orientation.

## 4.2 Persistent global controls
- session timer;
- pause state where permitted;
- help/instructions;
- accessibility/settings;
- current game / stage / question indicator;
- save-status indicator.

## 4.3 Practice-only controls
- coach mode toggle;
- reveal hint;
- explain reasoning;
- retry;
- reset scenario.

---

# 5. VISUAL DESIGN SYSTEM

## 5.1 Design character
Use:
- professional;
- immersive;
- calm;
- analytical;
- low-distraction;
- high information clarity.

Avoid:
- arcade-game styling;
- excessive glow;
- gamified confetti;
- overly decorative cards;
- imitation of protected McKinsey brand assets.

### Solve-style language rule
Interface copy should closely resemble the supplied reference in **brevity, instruction style and task naming**.

Preferred patterns:
- `Assessment`
- `Task 1: Red Rock Study`
- `Task 2: Sea Wolf`
- `Select one option`
- `Before you begin`
- `This assessment will be timed`
- `Begin`
- `Continue`
- `Complete`
- `Review the information below`
- `Select...`
- `Your objective is...`

Avoid:
- marketing language;
- motivational slogans;
- “coach engine” language inside Simulation Mode;
- long explanatory cards on assessment screens.

## 5.2 Colour strategy
Use an original palette inspired by analytical software rather than copying a corporate identity.

Recommended semantic tokens:
- `surface.base`
- `surface.panel`
- `surface.elevated`
- `text.primary`
- `text.secondary`
- `accent.primary`
- `accent.secondary`
- `state.success`
- `state.warning`
- `state.error`
- `state.info`
- `focus.ring`

## 5.3 Typography
- highly legible sans-serif;
- minimum 16 px body text on desktop where possible;
- tabular/monospace numerals for calculator and timer;
- clear hierarchy for Scenario / Objective / Exhibit / Question / Journal.

## 5.4 Layout
Desktop-first simulation workspace:
- top status bar;
- persistent dark application sidebar containing global navigation and active-task subnavigation;
- expanded central task workspace;
- right utility area for Research Journal / Calculator / Site Information as stage-appropriate.

Red Rock must not introduce a second white stage-navigation rail beside the dark sidebar.

Tablet/mobile:
- convert side panels to drawers;
- retain task state and timer;
- no horizontal clipping of exhibits.

---

# 6. CORE UI COMPONENT INVENTORY

## 6.1 Global
- AppShell
- TopStatusBar
- Timer
- StageProgress
- HelpDrawer
- ModeSwitcher
- SaveIndicator
- ConfirmationDialog
- Toast/InlineFeedback

## 6.2 Data interaction
- ExhibitCard
- DataTable
- ChartViewer
- DraggableDataToken
- DropTarget
- NumericInput
- SingleSelect
- MultiSelect
- RankOrder
- Calculator
- ResearchJournal
- Notepad

## 6.3 Learning layer
- ContextPrompt
- ThinkingPrompt
- HintPanel
- WorkedExample
- ReflectionPrompt
- ErrorDiagnosisCard
- DecisionReview

## 6.4 Sea Wolf
- SiteMap
- SiteInfoPanel
- CharacteristicSelector
- MicrobeCard
- CategorisationTray
- ProspectPool
- TreatmentBuilder
- AverageAttributeMeter
- TraitSummary
- EffectivenessResult

---

# 7. RED ROCK — UX SPECIFICATION

> **Authoritative V2.2 workflow and layout.** Red Rock retains the sealed gameplay sequence, but the workspace/navigation architecture is consolidated. Any earlier instruction that places Red Rock stage navigation or the Calculator in a separate white left rail is retired.

## 7.0 Command Centre activation
- Red Rock and Sea Wolf task navigation is inactive/locked until the user selects the relevant study and presses `Begin`.
- Selecting a case in a dropdown does not activate the task by itself.
- In Simulation Mode, `Begin` remains disabled until one Red Rock study and one Sea Wolf study are selected.
- Clearing/resetting the active session returns task navigation to the inactive state.
- In a full Simulation, Sea Wolf remains locked until Task 1 Red Rock is completed and the learner chooses to proceed from the Task 1 Result.
- The former `Practice clean` card is removed globally and must not appear in the sidebar or task pages.

## 7.1 Dark-sidebar Red Rock navigation
Red Rock contains only three primary stages:

`INVESTIGATION → ANALYSIS → REPORT`

There is **no separate white Task 1/stage-navigation panel**. All Red Rock navigation is nested directly beneath **Red Rock Study** in the persistent dark sidebar.

### INVESTIGATION
Expanded items:
- Objective
- Study Information
- Exhibit 1
- Exhibit 2

### ANALYSIS
Expanded items:
- Questions
- Question 1
- Question 2
- Question 3
- Question 4

All four question sections appear on one vertically scrollable Analysis page. Selecting a question label scrolls to its section.

### REPORT
Expanded items:
- Written Report
- Graph Selection
- Visual Report

When Visual Report is active, expand:
- Case 1
- Case 2
- Case 3
- Case 4
- Case 5
- Case 6

The dark-sidebar subnavigation reflects existing completion locks and never changes the underlying Red Rock stage mechanics.

## 7.2 Red Rock workspace composition
Removing the former white stage rail releases horizontal space to the actual work.

Desktop Red Rock layout:

`dark application sidebar | expanded main working canvas | right utility area`

Rules:
- the main working canvas receives the majority of the available width;
- the dark application sidebar carries both global and Red Rock subnavigation;
- the right utility area is stage-dependent and sticky where practical;
- there is no second navigation column between the dark sidebar and the main work;
- apply this composition consistently to **Salvanova Forest, Caldera Marsh and Norvale Highlands**.

## 7.3 Investigation — evidence environment
Investigation is a complete evidence workspace rather than a set of disconnected numeric cards.

### Objective
- clear task objective and senior-client handover;
- concise case context;
- no answer feedback.

### Study Information
- several paragraphs of realistic background;
- relevant quantitative evidence embedded in context;
- plausible non-essential numeric/measurable observations;
- enough information to require evidence selection;
- no duplicate evidence-card grid beneath the prose;
- meaningful evidence phrases remain in sentence position and are directly draggable or click-addable to the Research Journal;
- relevant and distractor evidence use the same neutral visual treatment so relevance is never revealed by the interface.

### Exhibit 1 and Exhibit 2
Every Investigation exhibit presents exactly **one context-appropriate analytical visual plus one structured draggable table**. The visual helps the learner see the pattern; the table remains the exact-value source for Research Journal collection.

Each numeric or numeric-bearing table cell is individually draggable or click-addable while remaining in its row/column location.

### Investigation utility layout
- **Main canvas:** Objective / Study Information / exhibit visual + table.
- **Right utility panel:** Research Journal only.
- **Calculator:** hidden.

### Research Journal interaction
Primary interaction:
`source evidence in context → drag/click → Research Journal`

Rules:
- do not use a large `Add to Journal` button as the main interaction;
- Study Information evidence remains readable prose rather than input boxes;
- exhibit values remain in structured rows/columns rather than standalone cards;
- Journal entries retain concise label, value/unit and source (`Study Information`, `Exhibit 1`, `Exhibit 2`, or `Analysis`);
- collected Investigation evidence may be returned before the Analysis lock;
- keyboard-accessible move/return equivalents remain available.

## 7.4 Analysis — one page, four question sections
The Analysis stage uses one scrollable main canvas containing Question 1–4. Each question may contain one or more answer fields.

### Analysis utility placement
Analysis displays both utilities in the **right-side utility area**:
- **Research Journal** — persistent evidence/derived-output reference;
- **Onscreen Calculator** — positioned in the same right utility area, not beneath navigation and not in a separate left rail.

Recommended desktop treatment is a vertical utility stack with Research Journal first and Calculator beneath it, or an equivalent contained arrangement that keeps both continuously accessible without reducing the main question canvas to a narrow column.

### Calculator interaction
Supported workflow:
`Research Journal value → Calculator → result → answer field`

- Journal numerical values may be dragged into Calculator input;
- Calculator supports basic arithmetic and short calculation history;
- Calculator result is draggable into numeric answer fields;
- users may also type values manually;
- **do not display the helper sentence** `Drag Research Journal values into the expression. Drag the result into an answer field.` beneath the Calculator.

### Analysis answers become Journal evidence
When an Analysis answer is populated, create/update a derived Journal item, for example:

`Analysis output — Hares consumed per year: 75,000`

These derived values remain available for later Analysis questions and Report stages.

### Learning vs Simulation
Learning Mode may show concise Dr. Cross working prompts. Simulation Mode does not show correctness, expected answers or hints before submission.

## 7.5 Analysis completion and lock
At the bottom of Analysis, display `Complete Analysis`.

Confirmation copy:

**Review Analysis?**

> Once you submit your Analysis answers, you will not be able to revisit Investigation or the Analysis questions. Your Research Journal will remain available in the Report stage.

Actions:
- `← I need to review`
- `Complete Analysis →`

Only after confirmation:
- Investigation locks;
- Analysis locks;
- source exhibits are no longer directly accessible;
- Research Journal persists;
- Report → Written Report opens.

## 7.6 Report — Written Report
Written Report is a decision-ready consultancy-style narrative with embedded scored input fields. It must feel like a short client-facing assessment rather than a worksheet with sentences wrapped around calculations.

Across all three Red Rock studies, the locked narrative grammar is:

**Situation / decision context → evidence or baseline outlook → programme/intervention implication → recommendation and management implication**

The wording must remain scenario-specific:
- **Salvanova Forest:** ecosystem imbalance → no-intervention outlook → wolf-reintroduction impact → recommendation and monitoring implication.
- **Caldera Marsh:** water-quality problem → five-year indicator movement → threshold/ecological/visitor implications → whether the programme should be backed.
- **Norvale Highlands:** restoration challenge → scale/cost/capacity feasibility → forest-cover/carbon outcomes → whether to proceed and what delivery constraint must be managed.

Each report uses **at least four coherent paragraphs** and retains the existing embedded scored fields. No new numerical answer fields are introduced by the fuller narrative, and no existing field may be removed, relabelled into a different analytical concept, or rescored. The additional prose provides context, synthesis and recommendation around the same evidence.

The learner can:
- drag values from the Research Journal into report fields;
- type values directly.

Report-field presentation rule:
- fields remain inline with natural prose;
- report inputs are compact inline controls rather than full form-width boxes: approximately 110–120 px wide on desktop, about 30–32 px high, with tight horizontal margins and baseline alignment;
- the input placeholder is neutral (`—`) and must not repeat the answer unit inside the box;
- units are supplied once by the field component immediately after the input and should not be redundantly repeated in adjacent prose;
- the field + unit pair stays together where possible so it does not visually collide with surrounding words or create oversized line boxes;
- the completed report must read naturally when every field is filled;
- paragraph breaks must remain visible and should make the decision logic easy to scan.

Answer-integrity rule:
- non-field prose may establish context, explain why a measure matters and interpret the completed evidence, but it must not state a numeric answer that belongs in an embedded field;
- prose must not provide a verbal equivalent that uniquely reveals a still-empty derived answer (for example, saying that a threshold is reached only at the end of a five-year programme when the field asks for the first target year);
- prose must not pre-resolve a delivery calculation (for example, declaring the programme technically deliverable within the five-year horizon before the learner supplies the capacity-required field);
- use neutral connectors around fields such as `changes from`, `is projected at`, `requires`, `is estimated at` and `difference of`;
- recommendations may synthesize the completed evidence, but the surrounding text cannot substitute for the quantitative entries the learner is required to supply.

Utility layout:
- **Main canvas:** Written Report.
- **Right utility panel:** Research Journal.
- **Calculator:** hidden.

At the bottom, `Complete Written Report` opens a confirmation warning. After confirmation the Written Report locks and Graph Selection opens.

## 7.7 Report — Graph Selection
Graph Selection contains:
1. the scenario-specific chart communication question;
2. exactly three context-appropriate chart-style options;
3. chart-data input fields after a chart is selected;
4. a generated preview that renders the selected chart type.

The three options **must vary by Red Rock study**. Two options are defensible/accepted for the specific data structure and communication question; one option is intentionally less suitable. Do not reuse one generic `Clustered bar / Line / Scatter` trio across all three studies.

Locked option sets:
- **Salvanova Forest:** Clustered bar chart / Slope chart / Scatter plot. Accepted: Clustered bar chart or Slope chart.
- **Caldera Marsh:** Dumbbell chart / Clustered bar chart / Line chart. Accepted: Dumbbell chart or Clustered bar chart.
- **Norvale Highlands:** Line chart / Slope chart / Pie chart. Accepted: Line chart or Slope chart.

Inputs may be populated by Research Journal drag/drop or keyboard entry. Multi-digit and decimal input must remain stable. The preview must organise the entered values according to the study context rather than treating every field as an unrelated bar. In Caldera, all six entered values must be represented as three Year-0/Year-5 indicator pairs.

All preview marks inherit the global exact-value interaction standard: hover, keyboard focus and tap/click expose the relevant category/series and exact value.

Utility layout:
- **Main canvas:** graph choice, data entry and preview.
- **Right utility panel:** Research Journal.
- **Calculator:** hidden.

At the bottom, `Complete Graph Selection` opens a confirmation warning. Confirmation locks the graph task and opens Visual Report.

## 7.8 Report — Visual Report Cases 1–6
Visual Report contains six independent case pages. Every case contains:
- concise background/context;
- a substantive chart or table;
- a scenario-specific first-person Dr. Elena Cross request in Learning Mode;
- the technical question/response mechanism;
- answer fields.

Utility layout:
- **Main canvas:** active Visual Report case.
- **Right utility panel:** Calculator only.
- **Research Journal:** unavailable.

Case navigation is nested under `Visual Report` in the dark application sidebar.

At Case 6, `Complete Visual Report` opens the final Task 1 confirmation modal. Confirmation completes Red Rock and opens the Task 1 Result.

## 7.9 Tool-availability and placement matrix

| Red Rock substage | Main canvas | Right utility area |
|---|---|---|
| Investigation | Evidence / exhibit work | Research Journal |
| Analysis | Questions 1–4 | Research Journal + Calculator |
| Written Report | Report narrative | Research Journal |
| Graph Selection | Chart selection/data/preview | Research Journal |
| Visual Report Cases 1–6 | Active case | Calculator |

There is no Red Rock white stage rail in V2.2.

## 7.10 Task 1 Result
After Task 1 completion, show a **Task 1 Result for the selected Red Rock study only**.

Hero support copy is exactly:

**`Red Rock workstream complete. Review feedback below.`**

The Result page is the single Task 1 review destination and follows this order:
1. Dr. Elena Cross client debrief;
2. **Primary Concern** — a client-facing synthesis that internally evaluates all four weighted Red Rock dimensions together rather than displaying a separate Assessment Benchmark scorecard;
3. integrated detailed answer/decision explanation showing submitted answer, expected answer/benchmark, relevant evidence and concise learner-facing coaching as appropriate.

The four weighted component scores remain part of the scoring engine and are interpreted inside Dr. Cross's Primary Concern. The learner does **not** see a detached Assessment Benchmark panel. A compact four-row performance snapshot may sit inside the same Primary Concern card to show the component scores without separating them from the client narrative.

Item-level status language is locked to:
- **Correct** — green — for a valid answer or decision;
- **Needs review** — red — for an invalid, incomplete or missing answer or decision.

Raw internal reasoning tags such as `FORMULA_SETUP`, `WRONG_DENOMINATOR` and `READ_OBJECTIVE` remain available to the scoring/diagnostic engine but are **never shown to the learner**. Any diagnostic insight must be translated into normal coaching language.

The Graph Selection detailed review must **not reproduce the submitted chart**. It reviews chart-choice suitability and entered-data accuracy in text/status form only.

Do not show the explanatory sentence beginning `This debrief interprets your practice performance...` beneath Dr. Cross's debrief.

There is no separate `Decision Review` page or action.

In Simulation Mode, the continuation action after the integrated Task 1 review is:

`Proceed to Task 2 — Sea Wolf →`

Only after Task 2 completes is the combined simulation result calculated.

# 8. RED ROCK — REFERENCE CASE DATA: SALVANOVA

## 8.1 Scenario
**Client brief — Dr. Elena Cross**

**Welcome, and thanks for joining this workstream.**

Fairhaven Environmental Trust is considering whether to support a wolf-reintroduction programme in Salvanova Forest. It is an important decision, and not a straightforward one. The loss of the forest's apex predator appears to have changed the ecosystem, but I need to understand both the ecological and economic implications before deciding how to proceed.

I'd like you to help us work through the evidence and determine what course of action is most defensible. At the end of your review, I need a concise, decision-ready recommendation that I can take forward to the Trust.

As you investigate, use the Research Journal to retain the evidence that materially supports your thinking. You will also have the study exhibits and, where available, the calculator. Focus on what you would want in front of you if I asked you to defend your recommendation.

In a full simulation, you will have **35 minutes** to complete the workstream.

**CTA:** `Review the Brief →`

A wolf reintroduction programme is evaluated for ecological and economic effects.

## 8.2 Core input facts
- wolves released: 150;
- consumption per wolf per year: 500 hares;
- initial hare population: 500,000;
- hare growth: 10% per year;
- vegetation baseline: 80%;
- vegetation declines 3 percentage points per year while hare population remains above 500,000;
- initial deer population: 50,000;
- +10 percentage points vegetation cover → +3,000 deer;
- every 5 percentage-point vegetation change corresponds to $25,000 tourism revenue change.

## 8.3 Key derived values used in supplied walkthrough
- annual hare predation: 75,000;
- Year 5 hare population with wolves: 386,890;
- Year 6: 350,579;
- Year 7: ~310,637;
- Year 8: ~266,700;
- relocation needed from Year 5 to target 300,000: 22.46%;
- vegetation with wolves: 80% → 100%;
- deer with wolves at Year 5: 56,000;
- vegetation without wolves at Year 5: 65%;
- tourism loss without wolves: $75,000;
- additional tourism revenue with full recovery at Year 5: $100,000.

## 8.4 Visual Report case families from supplied walkthrough

### Case 1 — 300 wolves / carrying capacity
Hare population:
- Y1: 400,000
- Y2: 290,000
- Y3: 169,000
- Y4: 35,900
- Y5: 0

Supportable wolves = hare population / 500.
Starvation begins when supportable wolves < 300 → Year 4.

### Case 2 — Verdant fox ratio
Threshold: at least 350 hares per fox.
- Y1: 500,000 / 600 ≈ 833
- Y2: 450,000 / 800 = 562.5
- Y3: 410,000 / 1,000 = 410
- Y4: 375,000 / 1,200 = 312.5
- Y5: 350,000 / 1,400 = 250
Threshold met in 3 years.

Follow-up:
- wolves decline 20% from 180 → 36 fewer wolves;
- 45 deer consumed per wolf/year;
- 36 × 45 = 1,620 fewer deer eaten.

### Case 3 — tree investment decision
At minimum include:
- Oak: cost 15; sequestration 7.5
- Pine: cost 10; sequestration 6; survival 85%
- Mahogany: cost 25; sequestration 8.2
- Eucalyptus: cost 8; sequestration 5.8; survival 75%

Unconstrained carbon/dollar winner: Eucalyptus.
With survival ≥80% constraint: Pine.

### Case 4 — forest coverage
- Highlands: 45 → 60 = +15 percentage points
- Lowlands: 50 → 35 = -15 percentage points
- Coastal: 40 → 15 = -25 percentage points

Use the source chart/data as final authority when recreating exact wording.

### Case 5 — water stability
Range = max - min.
- Highlands: 1,210 - 1,180 = 30 mm
- Lowlands: 950 - 870 = 80 mm
- Coastal: 790 - 700 = 90 mm
Most stable: Highlands.
Least stable: Coastal.

### Case 6 — $12m allocation
- Project A: $6,000/ha, 24 species/ha → 2,000 ha → 48,000 species
- Project B: $7,500/ha, 19 species/ha → 1,600 ha → 30,400 species
- Project C: $6,500/ha, 21 species/ha → ~1,846 ha → ~38,766–38,769 species depending on rounding convention
Best total species with equal budget: Project A.

---

# 8A. RED ROCK — ORIGINAL TRANSFER STUDIES

The additional studies must test **transfer**, not recall. They therefore reuse underlying analytical structures while changing the context, exhibits, variables, constraints and decision logic.

## 8A.1 Study 2 — Caldera Marsh

### Scenario
Caldera Marsh is a protected wetland receiving agricultural runoff from three upstream districts. The regional authority is considering a restoration programme combining buffer planting, aeration and controlled water releases.

### Objective
Determine which intervention package most effectively improves water quality while protecting biodiversity and remaining within the programme budget.

### Investigation data
Include:
- nitrogen concentration;
- phosphorus concentration;
- water-flow volume;
- dissolved oxygen;
- fish population;
- bird nesting success;
- intervention cost;
- expected pollutant reduction;
- annual maintenance cost;
- rainfall sensitivity.

Include several plausible but non-essential observations so the user must decide what belongs in the Research Journal.

### Analysis skills
- pollutant load = concentration × volume;
- annual decline/growth;
- threshold timing;
- percentage vs percentage-point change;
- cost-effectiveness;
- budget constraint;
- ecological trade-off.

### Report
Summarise:
- baseline problem;
- preferred intervention;
- expected water-quality improvement;
- ecological consequence;
- financial implication.

### Visual task
Choose the best chart for comparing baseline and intervention outcomes across several water-quality indicators.

### Six Visual Report case families
1. Nutrient-load calculation
2. Threshold-compliance timing
3. Cost-effectiveness ratio
4. Habitat-restoration prioritisation
5. Rainfall stability/range
6. Fixed-budget allocation

### Transfer lesson
The user should recognise familiar reasoning structures without familiar story cues.

---

## 8A.2 Study 3 — Norvale Highlands

### Scenario
Norvale Highlands experienced a severe wildfire that reduced forest cover, damaged wildlife habitat and increased watershed erosion. Authorities are considering three restoration strategies with different costs, recovery rates and climate-resilience profiles.

### Objective
Recommend the restoration strategy that produces the strongest long-term recovery without exceeding land, workforce and funding constraints.

### Investigation data
Include:
- hectares burned;
- current forest cover;
- natural regeneration rate;
- planting survival rate;
- carbon sequestration per hectare;
- restoration cost per hectare;
- available workforce;
- annual planting capacity;
- erosion risk;
- watershed-recovery indicator.

### Analysis skills
- compound recovery;
- scenario comparison;
- carbon per dollar;
- minimum survival constraint;
- labour-capacity constraint;
- risk-adjusted prioritisation.

### Report
Explain:
- expected outcome without intervention;
- preferred strategy;
- expected recovery;
- principal operational constraint;
- trade-off accepted.

### Visual task
Choose the best visual for comparing baseline and end-state performance across restoration strategies.

### Six Visual Report case families
1. Compound recovery
2. Planting-capacity constraint
3. Carbon-per-dollar optimisation
4. Survival-rate filter
5. Watershed stability
6. Portfolio allocation under simultaneous labour and budget limits

### Transfer lesson
The learner must distinguish:
- highest raw output from highest efficiency;
- theoretical optimum from feasible optimum;
- percentage from percentage points;
- attractive individual metric from best overall decision.

---

## 8A.3 Red Rock transfer matrix

| Study | Context | Dominant reasoning |
|---|---|---|
| Salvanova Forest | Predator/ecosystem recovery | Growth, thresholds, ratios, ecological-economic linkage |
| Caldera Marsh | Wetland/water quality | Loads, thresholds, cost-effectiveness, resource allocation |
| Norvale Highlands | Wildfire/restoration | Scenario modelling, constraints, risk-adjusted optimisation |

Rules:
- do not repeat answer positions;
- do not use identical number patterns;
- vary exhibit types;
- vary which facts are relevant;
- vary the order of analytical operations;
- preserve comparable difficulty across studies.

---

# 9. SEA WOLF — UX & MECHANICS SOURCE OF TRUTH

## 9.1 Introduction
Before Site 1, Dr. Paula Reyes gives a concise first-person client brief covering the environmental context, problem, scope, constraints, expected decisions, working information/resources, site lock points and the 30-minute Simulation Mode expectation.

The Characteristics → Categorisation → Selection → Treatment sequence is explained naturally inside that brief rather than displayed as a standalone framework strip. The learner should understand that there are three sites, that microbes may be routed forward, and that the final treatment at each site consists of exactly three microbes.

## 9.2 Site Information reference
The current site's complete requirements remain visible during relevant stages:
- Permeability range;
- Mobility range;
- Energy range;
- Desired trait;
- Undesired trait.

During routing, a smaller **Next Site Insight** may expose only the specific information needed to make forward-allocation decisions. Do not reveal the full next-site profile unless the reference scenario requires it.

## 9.3 Transfer reassessment — Sites 2 and 3
Before normal categorisation begins, microbes previously assigned to **Next Site** are reassessed using the now-complete Current Site information.

For each transferred microbe:
- add to Current Site if it now qualifies;
- otherwise use the available next-site insight to move it forward again where possible;
- otherwise Return it.

After the transferred pile is resolved, the user enters the Current Site and proceeds to Characteristics selection.

Site 3 has only **Current Site / Return** because there is no Site 4.

## 9.4 Characteristics selection — prospect-pool profiling
The interface permits selection of two characteristics from the three attributes and four traits.

The demonstrated Learning Mode strategy across the reference sites is:

**1 strategically discriminating Attribute + the Desired Trait (A + T)**

Examples from the source walkthrough:
- Site 1: Mobility 7–9 + Heat Resistant;
- Site 2: Permeability 2–4 + Aerobic;
- Site 3: Mobility 8–10 + Phosphorus Removal.

The attribute is chosen because its required range is particularly informative relative to the neutral midpoint of 5.

This selection **does not modify the microbes in the categorisation deck**. It directly determines the separate Initial Prospect Pool used later for treatment building.

### V1.2 characteristic-to-pool implementation — locked
Each site contains a fixed **12-microbe profiling candidate universe** that is completely separate from the 10-card routing deck and the four later prospect-round trios.

When the learner selects any two of the seven available characteristics (3 attributes + 4 traits), the engine deterministically ranks the 12 profiling candidates against those two selections and returns exactly **6 microbes** as the Initial Prospect Pool.

Rules:
- there are **21 possible two-characteristic combinations** per site (`7 choose 2`);
- the selected characteristics are the dominant ranking criteria;
- the pool is deterministic, not random;
- different characteristic combinations must produce materially different six-card pools;
- the demonstrated **A + Desired Trait** choice reproduces the validated reference six already shown in the operational data tables;
- an alternative characteristic pair may still be defensible, but it changes the option set carried into Prospect Selection;
- Prospect Selection feedback must be evaluated against the learner's **actual derived pool**, not against a static six-card assumption.

This makes Characteristics selection a real gameplay decision rather than a recorded-but-non-consequential input.

### V1 trait vocabulary — locked
All three Sea Wolf studies use the same four learner-facing trait labels:
1. **Heat Resistant**
2. **Aerobic**
3. **Phosphorus Removal**
4. **Light Sensitive**

Every microbe has exactly **one** of these four traits. There is no `Neutral` trait in V1. A trait can be desired, undesired or simply non-binding depending on the current site.

Keeping one controlled vocabulary preserves the interaction grammar across studies while originality comes from site context, target ranges, card values, routing consequences, prospect-round composition and feasible treatment combinations.

## 9.5 Categorisation / routing
Present a separate deck of **10 microbes**, one card at a time.

Each microbe contains:
- Permeability;
- Mobility;
- Energy;
- one Trait.

User actions:
- Current Site;
- Next Site (Sites 1–2);
- Return.

### Current Site decision rule
A microbe qualifies for Current Site when:
- **at least 2 of the 4 positive criteria match** — Permeability, Mobility, Energy, Desired Trait;
- **and the Undesired Trait is absent**.

If it does not qualify for Current Site:
- check the partial Next Site Insight;
- route forward if the insight supports that allocation;
- otherwise Return.

The undesired trait is an exclusion from Current Site even if the card looks attractive on other dimensions.

Categorisation is a **routing exercise**, not treatment-pool construction.

## 9.6 Initial Prospect Pool
After routing, the treatment-building stream derives a **separate Initial Prospect Pool of exactly 6 microbes** from the site's fixed 12-card profiling candidate universe using the learner's earlier two-characteristic choice.

These six are not the routing microbes. They are also not a single static pool: changing the characteristic pair changes which six treatment candidates are available.

The four later 1-of-3 Prospect Selection rounds remain fixed and separate. Therefore the treatment-building sequence is:

**12 profiling candidates → choose 2 characteristics → derive 6 → four 1-of-3 additions → final 10 → choose treatment 3.**

## 9.7 Prospect Selection — four sequential rounds
Starting pool: **6**.

Each round:
1. show exactly **3 new candidate cards** above the visible existing pool;
2. require the user to choose **exactly 1**;
3. add that microbe to the pool;
4. refresh the trio.

Progression:
**6 → 7 → 8 → 9 → 10**

### Selection judgement
Use this decision priority in Learning Mode:
1. avoid the undesired trait where possible;
2. compare attribute fit;
3. consider the desired trait;
4. when candidates are tied or weak, inspect the existing pool and choose the candidate that improves portfolio balance or optionality;
5. if every option is poor, choose the least-worst option.

A selected prospect does not have to appear in the final treatment.

If the desired trait is already well represented in the pool, do not overvalue another copy; use the choice to improve attribute balance.

### Interaction pacing — gameability lock
Sea Wolf must feel like a timed decision game rather than a sequence of forms:
- Categorisation is rapid: `read card → route → next card`; no confirmation modal between individual cards.
- Prospect Selection is slower and comparative: the existing pool remains visible while each new trio is assessed.
- Treatment is deliberate: the learner may revise the trio freely until `Confirm Choice`.
- Card transitions should be immediate or very short; avoid decorative animation that consumes assessment time.
- Learning Mode may pause for rationale only at selected high-value decisions, not after every card.
- Simulation Mode never inserts coaching interruptions.

## 9.8 Treatment — choose final 3 from 10
The treatment screen shows three empty treatment slots above the complete 10-microbe pool and the Current Site requirements.

Recommended Learning Mode decision hierarchy:
1. eliminate microbes carrying the undesired trait;
2. ensure at least one selected microbe carries the desired trait;
3. among desired-trait candidates, prefer the one with the strongest useful attribute contribution;
4. prioritise attribute balance for the remaining slots;
5. use residual-range calculation only when the final slot needs mathematical balancing.

Multiple different trios may legitimately achieve the same optimum.

### Residual-range method
For a site target average `[L,U]` and three selected microbes:
- allowable trio total = `[3L,3U]`;
- after two microbes have total `S`, acceptable third-microbe range = `[3L-S, 3U-S]`.

Apply separately to Permeability, Mobility and Energy.

This is a decision aid, not a mandatory step when the final choices are already obvious.

## 9.9 Treatment Effectiveness
Evaluate the submitted trio on five criteria worth **20% each**:
1. average Permeability in range;
2. average Mobility in range;
3. average Energy in range;
4. no Undesired Trait in the trio;
5. at least one Desired Trait in the trio.

Each failed criterion reduces Treatment Effectiveness by **20 percentage points**.

Where a fixed constrained deck is deliberately designed, the maximum feasible score may be below 100%; Results must distinguish raw effectiveness from best-feasible decision quality.

## 9.10 Confirmation and site progression
Once three microbes are selected, `Confirm Choice` opens a modal:
- Confirm — lock treatment and continue;
- Cancel — return to the treatment builder.

After Site 3 confirmation:
**Sea Wolf complete → Task 2 Result.**

## 9.11 Scenario variation policy
- **Cinder Bay:** clear mechanics, mostly one strong prospect choice, 100% often feasible.
- **Tidal Reach:** narrower ranges, more partial fits and trade-offs.
- **Azure Shelf:** stronger ambiguity, opportunity cost, tied choices, portfolio balancing and potential imperfect optimum.

## 9.12 Learning vs Simulation
Learning Mode may provide concise client-framed feedback after submitted routing decisions. Prospect selections remain editable until confirmation and are assessed in the later client/result review rather than revealing Strong/Weak feedback on card selection.

Simulation Mode shows no live correctness, rationale classification, hint or treatment-quality reveal before submission.

## 9.13 Fixed-deck policy
V1 uses fixed, validated decks. Randomised variants are deferred until deterministic decks pass automated combination, routing and maximum-score tests.

# 10. CONSULTING NARRATIVE & EMBEDDED DECISION SUPPORT

The learner should feel that they are working through a client assignment, not stepping through a generic problem-solving framework.

## 10.1 Learner-facing rule
Do not display a component labelled **Reasoning Flow**.

Instead, embed short prompts inside the sponsor/client narrative and the active task screen.

### Narrative cadence
Use the sponsor voice lightly at moments where the nature of the work changes:
- Red Rock opening: Dr. Cross frames the decision the client needs.
- Investigation → Analysis: `You have the evidence. Now turn it into an answer Dr. Cross can use.`
- Analysis → Report: `The analysis is complete. Prepare the client view.`
- Sea Wolf site opening: Dr. Reyes states what the current site needs and what is known about the next site.
- Routing → Prospect Pool: `Routing is complete. Now build the treatment options for this site.`
- Site treatment confirmation: `Treatment locked. Review any microbes carried forward before opening the next site.`

Do not repeat the sponsor's name on every card or turn the experience into dialogue-heavy role-play.

### Red Rock examples
- Objective page: Dr. Cross speaks in first person, e.g. `I need a clear view of what is changing and why.`
- Investigation: `Which evidence would you want available when the client asks why?`
- Analysis: `What calculation turns the evidence into a decision?`
- Report: `What should Dr. Cross take away from the analysis?`

### Sea Wolf examples
- Site brief: `What does this site need from the treatment?`
- Routing: `Is this microbe useful here, more useful later, or not useful enough to keep?`
- Prospect Selection: `What is missing from the pool you already have?`
- Treatment: `Which three work best together, not just individually?`

## 10.2 Learning Mode
Contextual coaching may be visible, concise and optional. It should never occupy a permanent large rail or read like a methodology lesson.

Sea Wolf allocation quality still uses the internal judgement classes `strong`, `defensible` and `weak` for scoring, but the learner-facing response is written as a short first-person Dr. Reyes client comment rather than displaying those class labels as flags.

## 10.3 Simulation Mode
No live coaching, prompts that reveal strategy, answer feedback or allocation classification. The consulting narrative remains, but it functions only as context and instruction.

## 10.4 Authoring-only reasoning metadata
Internally, cases may still tag decisions with concepts such as evidence selection, constraints, opportunity cost, portfolio balance, residual requirements and sense-checking. These tags support feedback and analytics but are not exposed as a learner-facing framework.

# 11. RESULTS & SCORING SYSTEM

## 11.1 Core scoring principle

The V1 full-simulation result is based on exactly **two selected studies**:

- **Task 1 — one Red Rock Study**
  - Salvanova Forest **or**
  - Caldera Marsh **or**
  - Norvale Highlands

- **Task 2 — one Sea Wolf Study**
  - Cinder Bay **or**
  - Tidal Reach **or**
  - Azure Shelf

A single simulation must **never aggregate performance across all six studies**.

The result must reflect only the Red Rock study and Sea Wolf study selected for that attempt.

Do **not** claim to reproduce McKinsey's proprietary scoring, pass threshold, percentile methodology, or hiring decision.

---

## 11.2 Overall Practice Readiness Score

Each completed full simulation produces an internal **Overall Practice Readiness Score out of 100**.

### V1 weighting

`Overall Practice Readiness = 50% Task 1 Score + 50% Task 2 Score`

Reason for equal weighting:
- Task 1 and Task 2 are distinct problem-solving environments;
- both are mandatory in a full simulation;
- equal weighting avoids one task masking a major weakness in the other;
- timing differences are handled inside the task-specific time metrics rather than by giving one task more score weight.

The result screen must always display:
- Overall Practice Readiness Score;
- selected Task 1 case and score;
- selected Task 2 case and score;
- reasoning profile;
- time performance;
- strongest capability;
- principal performance concern;
- recommended next practice.

---

## 11.3 Task 1 — Red Rock score

The selected Red Rock study produces a score out of 100.

### Weighting

| Component | Weight |
|---|---:|
| Analysis accuracy | 50% |
| Written report | 20% |
| Graph Selection | 10% |
| Six Visual Report cases | 20% |
| **Total** | **100%** |

**Time does not contribute to the Task 1 score and is not displayed in the Task 1 Result assessment surface.**

### Analysis accuracy
Score:
- correct quantitative answer;
- correct units;
- correct percentage vs percentage-point interpretation;
- correct constraint/threshold application.

Where numeric tolerances are appropriate, the case JSON must define the accepted tolerance.

### Written report
Score:
- correct values;
- correct interpretation;
- correct synthesis of the decision;
- no contradiction with analysis results.

### Graph Selection
Graph Selection is the only **all-or-nothing** Task 1 component.

The learner earns the full **10 percentage points** only when **both** conditions are true:
1. an accepted/context-appropriate chart type is selected; and
2. **every required chart-data value is correct**.

If either the chart type or any required data value is incorrect or incomplete, Graph Selection contributes **0/10** to Task 1. The detailed review may still show which individual chart/data elements were Correct or Need review, but there is no partial component credit.

### Visual Report cases
Each of the six independent Visual Report cases contributes equally to the Visual Report case component unless a case explicitly defines otherwise.

### Time and pacing
Use the 35-minute Task 1 allowance during the workstream.

Timing remains part of the practice/simulation experience but is **not a scored component and is not shown in the Task 1 Result assessment area**. Finishing early provides no score bonus, and exceeding the allowance does not overwrite the accuracy-based assessment.

---

## 11.4 Task 2 — Sea Wolf score

The selected Sea Wolf study contains exactly **three sites** and is scored on **four dimensions only**.

### Weighting

| Component | Weight |
|---|---:|
| Site Profiling | **10%** |
| Microbe Categorisation & Transfer | **30%** |
| Prospect Selection | **25%** |
| Treatment Construction | **35%** |
| **Total** | **100%** |

### Site Profiling — 10%
The three site-profiling decisions share the component equally. A site earns its share when the selected two-characteristic lens is the authored reference pair or an alternative lens that preserves the site's maximum feasible treatment outcome in the generated six-card pool.

### Microbe Categorisation & Transfer — 30%
Every confirmed Current Site / Next Site / Return decision shares the component equally, including reassessment of microbes transferred from a previous site. Each routing decision is independently assessed against the fixed current-site rule and available next-site insight. Correct decisions earn their share; decisions that do not match the strongest route do not.

### Prospect Selection — 25%
Every confirmed 1-of-3 prospect round shares the component equally across all three sites. A confirmed choice earns its share when it preserves a strong or defensible treatment path; weak choices do not earn that round's share.

### Treatment Construction — 35%
The three sites share this component equally. Each site's treatment score is proportional to the strongest outcome that is actually feasible for that site:

`Normalised Site Performance = Submitted Effectiveness / Maximum Feasible Effectiveness × 100`

Cap the result at 100.

The underlying five treatment conditions remain unchanged:
1. average Permeability in range;
2. average Mobility in range;
3. average Energy in range;
4. desired trait present;
5. undesired trait absent.

Each failed condition reduces raw site effectiveness by 20 percentage points.

For **Azure Shelf Site 3**, the designed maximum feasible effectiveness is 80%. Therefore **80 achieved / 80 feasible = 100% normalised site performance and full site credit**.

### Task 2 scoring principle
No Task 2 dimension is all-or-nothing. Good individual decisions retain their earned credit. Graph Selection in Task 1 is the only deliberately all-or-nothing component in the application.

---

## 11.5 Learning Mode scoring behaviour

Learning Mode is designed to develop reasoning rather than reward unassisted performance.

After a submitted categorisation/routing decision:

1. do not display `Correct` or `Incorrect`;
2. return a short first-person Dr. Reyes response explaining the decision consequence using the actual attributes, traits, constraints and next-site information;
3. keep the internal `strong` / `defensible` / `weak` classification in session data for scoring and later review.

For Prospect Selection:
1. clicking a candidate only marks it provisionally;
2. the learner may switch candidates before confirmation;
3. `Confirm selection` commits the decision and advances the round;
4. no live Strong/Weak judgement appears on selection or confirmation;
5. the recorded prospect judgement is surfaced in the final client/result review.

### Hints and retries

Hints, retries and reasoning scaffolds must be recorded, but should **not be hidden inside the main accuracy score**.

Instead show a separate:

**Independence / Assistance Profile**

Example:
- Hints used: 3
- Retries: 2
- Reasoning scaffolds opened: 4
- First-attempt accuracy: 76%

This allows the learner to distinguish:
- **Can I solve it?**
from
- **Can I solve it independently under pressure?**

---

## 11.6 Simulation Mode scoring behaviour

Simulation Mode:
- provides no live correctness feedback;
- provides no allocation classification;
- provides no treatment-quality reveal before submission;
- provides no hints;
- records all decision paths silently;
- calculates results only after both selected studies are completed.

The final result therefore evaluates the entire **one Red Rock + one Sea Wolf** simulation.

---

# 11.7 Final Results Pane — Integrated Feedback & Explanation

## Primary purpose

The first result view must answer:

**How strong was this attempt, and what most affected the result?**

The results pane should be analytical and restrained rather than celebratory or game-like.

### Header

**Practice Result**

Display:

`Overall Practice Readiness`
`84 / 100`

Then:

`Selected Simulation`
`Caldera Marsh + Tidal Reach`

Below the score:
- completion status;
- total time used;
- Task 1 score;
- Task 2 score.

Do not display:
- `McKinsey Pass`;
- `McKinsey Fail`;
- `McKinsey percentile`;
- `Interview guaranteed`;
- any other claim that the simulator can predict an official hiring decision.

---

## 11.8 Readiness language

V1 may use internal performance bands.

Recommended labels:

| Overall Practice Score | Internal result language |
|---|---|
| 85–100 | **Strong Practice Readiness** |
| 75–84 | **Competitive Practice Range** |
| 60–74 | **Developing Readiness** |
| Below 60 | **Further Practice Recommended** |

These are **internal simulator bands**, not McKinsey thresholds.

### Top-quartile target

The interface may show:

`Target: Top-Quartile Practice Performance`

However, it must not translate a raw V1 score directly into a percentile unless a real comparison distribution exists.

---

## 11.9 Practice percentile — only when empirically supported

A percentile should be displayed only after the product has a sufficiently large set of comparable completed simulations.

Until then show:

`Practice percentile: Benchmark not yet available`

When cohort benchmarking is enabled:

`Percentile Rank = percentage of comparable completed attempts scoring below the current attempt`

The benchmark cohort should be comparable by:
- full Simulation Mode only;
- completed attempts only;
- equivalent scoring version;
- selected case pair or validated validated comparison pool.

### Recommended minimum benchmark requirement

Do not surface a percentile until at least:
- **100 valid comparable full-simulation attempts**

exist in the benchmark pool.

Once available, the result pane may display:

`Practice percentile: 81st`
`Top-Quartile Practice Range`

and a target marker:

`Target benchmark: ≥75th percentile`

Mandatory disclaimer:

> Practice percentile is an internal simulator benchmark. It is not a McKinsey score, percentile, pass threshold, or hiring prediction.

---

# 11.10 Task 1 Result — client feedback, assessment and integrated explanation

Example:

**Task 1 — Caldera Marsh**  
`86 / 100 — Strong`

The Red Rock scoring engine retains exactly four weighted dimensions:
- Analysis accuracy — **50% of Task 1**
- Written Report — **20% of Task 1**
- Graph Selection — **10% of Task 1**
- Visual Report Cases — **20% of Task 1**

These weights total **100%**. The Task 1 Result page does **not** show a detached Assessment Benchmark panel. Instead, the four component outcomes are synthesised into **Primary Concern**, written as Dr. Cross's client assessment of what would or would not prevent the recommendation from being taken forward. A compact performance snapshot may appear within the same Primary Concern card.

Each component still uses a predefined client-readable threshold response internally:

| Performance | Interpretation |
|---|---|
| 85–100% | Client-ready / strong enough to support sign-off |
| 70–84% | Directionally sound, but needs tightening before sign-off |
| 51–69% | Material gap that weakens confidence in the recommendation |
| 0–50% | Significant concern; not reliable enough for the client decision |

The threshold wording is component-specific for Analysis, Written Report, Graph Selection and Visual Report Cases. The Primary Concern must consider **the pattern across all four dimensions**, including how analysis carries into the written report and whether the graph and case judgments are consistent with the technical work. It must not simply name the lowest raw score or the largest weighted gap.

Examples of client-pattern logic:
- weak Analysis + weak Written Report → the analysis is not yet translating into a defensible client report;
- weak Analysis + stronger Written Report → the report is running ahead of the analytical evidence supporting it;
- stronger Analysis + weak Written Report → the analysis is stronger than the report currently communicates;
- sound technical work + weak Graph Selection / Visual Report Cases → the technical case is stronger than the way it is being communicated;
- all four components at client-ready level → no material concern prevents sign-off.

Then show the integrated detailed review immediately on the same Result page:
- Dr. Cross client debrief;
- **Primary Concern** with the four-dimension benchmark interpretation embedded in the narrative and an optional compact four-row performance snapshot within the same card;
- question/case submitted response;
- expected answer or benchmark;
- supporting evidence/calculation where relevant;
- concise learner-facing explanation;

Item statuses are exactly:
- **Correct** (green);
- **Needs review** (red).

Do not show raw diagnostic taxonomy labels. Do not show `Aligned` or the standalone label `Review`.

For Graph Selection, do not reproduce the learner's submitted chart on the Result page. Review only:
- whether the chart choice was suitable;
- which chart types are accepted for the context;
- whether the entered values match the benchmark;
- the concise explanation of why the visual form fits the question.

Hero support copy: **`Red Rock workstream complete. Review feedback below.`**

Do not show the small explanatory note beginning `This debrief interprets your practice performance...`.

Raw error taxonomy may still be stored internally for analytics, but it is not learner-facing.

---

# 11.11 Task 2 Result — client feedback, primary concern and integrated explanation

The Task 2 Result is a client-led workstream close-out rather than a detached scorecard.

Locked sequence:

**Sea Wolf workstream complete. Review feedback below. → Dr. Reyes Client Debrief → Primary Concern + four-dimension Performance Snapshot → Detailed review · Site Profiling → Detailed review · Categorisation & Transfer → Detailed review · Prospect Selection → Detailed review · Treatment Construction → continuation/results action.**

### Dr. Reyes Client Debrief
The client debrief appears first and uses a predefined **strong / mid-range / weak** response based on overall Task 2 performance. It should be 2–3 short paragraphs and must not read component percentages aloud.

It answers:
- what the consultant achieved across the three-site programme;
- what the decision path means for treatment confidence and programme flexibility;
- whether Dr. Reyes would take the work forward.

### Primary Concern + Performance Snapshot
Primary Concern follows the debrief. It interprets the interaction between:
- Site Profiling — 10%;
- Categorisation & Transfer — 30%;
- Prospect Selection — 25%;
- Treatment Construction — 35%.

It must identify the most material client-facing decision issue and link earlier decisions to later treatment consequences instead of mechanically naming the lowest percentage. A compact four-row Performance Snapshot sits inside the same Primary Concern card; there is no separate Assessment Benchmark panel.

### Detailed review
Use only **Correct** (green) and **Needs review** (red) as learner-facing statuses.

The detailed review is ordered as:
1. Site Profiling — each site's selected characteristic lens and whether it is accepted/context-appropriate;
2. Categorisation & Transfer — each Current / Next / Return decision, including transfer reassessments;
3. Prospect Selection — every confirmed 1-of-3 prospect round;
4. Treatment Construction — submitted trio, raw effectiveness, maximum feasible effectiveness and normalised site performance.

For an intentionally constrained site, show the feasible maximum explicitly. Example:

`Azure Shelf Site 3: 80% submitted / 80% maximum feasible = 100% of feasible optimum — Correct.`

There is no separate Decision Review destination and no separate Task 2 Assessment Benchmark card.

---

# 11.12 Reasoning Profile

The overall result must include a cross-task reasoning profile.

Recommended dimensions:
- Problem Structuring
- Quantitative Setup
- Calculation Accuracy
- Constraint Recognition
- Comparative Judgement
- Portfolio Thinking
- Sense-checking
- Information Management
- Time Discipline

Each dimension should be derived from observable actions and case outcomes rather than a personality inference.

Recommended display:
- **Strong**
- **Competitive**
- **Developing**
- **At Risk**

Example:

| Reasoning dimension | Result |
|---|---|
| Quantitative Setup | Strong |
| Constraint Recognition | Developing |
| Portfolio Thinking | Competitive |
| Time Discipline | Strong |

---

# 11.13 Primary Performance Concern

The system should identify the **single most consequential recurring weakness** in the completed simulation.

Examples:
- missed binding constraints;
- percentage vs percentage-point confusion;
- unnecessary evidence collection;
- weak chart selection;
- local optimisation;
- poor downstream allocation;
- arithmetic accuracy;
- rushed late-stage decisions.

Example result:

**Primary performance constraint**

`Cross-site portfolio thinking`

`Two locally reasonable Sea Wolf selections reduced the quality of later options.`

This diagnostic is more valuable than simply displaying the final score.

---

# 11.14 Recommended Next Practice

Finish the result pane with one clear recommendation.

Example:

**Recommended next practice**

`Azure Shelf`

`Focus: evaluate downstream opportunity cost before committing scarce high-fit microbes.`

Recommendation logic should use:
- weakest reasoning dimension;
- error frequency;
- error severity;
- selected case design;
- previous attempt history where available.

---

# 11.15 Attempt history and readiness confidence

A single strong attempt should not be treated as proof of stable readiness.

When multiple full simulations exist, show:
- latest score;
- three-attempt average;
- score trend;
- number of attempts in the target range;
- consistency by Task 1 and Task 2.

Example:

**Readiness confidence: Moderate**

`2 of your last 3 full simulations were in the Competitive Practice Range or above.`

Do not compute this from Learning Mode attempts.

---

# 11.16 Result-screen hierarchy

The final Results experience should appear in this order:

1. **Overall Practice Readiness**
2. **Selected simulation pair**
3. **Internal readiness band / empirical percentile if available**
4. **Client close-out meeting** — Dr. Cross and/or Dr. Reyes as applicable
5. **Task 1 Result** — scoring + integrated detailed answer/decision explanation
6. **Task 2 Result** — scoring + integrated routing/prospect/treatment explanation
7. **Reasoning Profile**
8. **Primary Performance Concern**
9. **Recommended Next Practice**
10. **Attempt history / readiness confidence**
11. **Return Home / Try Another Simulation**

Primary action:
- `Try Another Simulation`

Secondary action:
- `Return Home`

No separate review button, `Decision Review` sidebar item, or review route is exposed.

---

# 11.17 Integrated result review rules

Detailed review is embedded inside the relevant Result page rather than opened as a separate screen.

### Task 1
Show, where relevant:
- question/case;
- submitted answer;
- expected answer/benchmark;
- calculation pathway;
- relevant evidence;
- error classification;
- concise reasoning lesson.

### Task 2
Show, where relevant:
- site targets;
- categorisation path;
- prospect choices;
- final treatment;
- treatment averages;
- desired/undesired traits;
- submitted effectiveness;
- maximum feasible effectiveness;
- alternative maximum-scoring treatments where applicable;
- downstream consequence of important allocations.

This content is available only after the relevant task is complete and must not leak answers during Simulation Mode.

---

# 11.18 Practice metrics retained for analytics

Persist the following independent metrics:
- Task 1 score;
- Task 2 score;
- Overall Practice Readiness Score;
- answer accuracy;
- first-attempt accuracy;
- time per item;
- time remaining;
- journal efficiency;
- unnecessary data collected;
- number of hints;
- number of retries;
- calculation setup accuracy;
- decision-quality score;
- Sea Wolf treatment effectiveness;
- maximum feasible Sea Wolf effectiveness;
- normalised Sea Wolf performance;
- categorisation judgement;
- prospect-selection judgement;
- cross-site portfolio preservation;
- error taxonomy;
- consistency across repeated simulations.

The **Overall Practice Readiness Score** is an internal training metric only. It must never be presented as a predicted McKinsey percentile or official assessment score.

---

# 12. PERSISTENCE AND SESSION DATA

## 12.1 Minimum persistence
Use local persistence initially:
- localStorage or IndexedDB;
- restore unfinished session;
- save after every meaningful action.

Persist:
- mode;
- current route/stage;
- timer state;
- journal;
- answers;
- hint use;
- retries;
- selected microbes;
- site allocations;
- treatment;
- score;
- completion state.

## 12.2 Future account model
Optional later:
- user profiles;
- cloud sync;
- reviewer/teacher dashboard;
- multiple attempts;
- analytics export.

---

# 13. ACCESSIBILITY

Target WCAG 2.2 AA where practical.

Requirements:
- complete keyboard navigation;
- visible focus state;
- no drag-only interaction;
- click/select alternative to drag;
- screen-reader labels;
- sufficient contrast;
- non-colour status cues;
- timer warning not colour-only;
- reduced-motion preference;
- scalable text;
- chart values also represented in accessible table form where a source table exists;
- interactive quantitative chart marks are keyboard-focusable and expose the same exact contextual value available by pointer/touch interaction.

---

# 14. RESPONSIVE BEHAVIOUR

## Desktop
Preferred full simulation.

## Tablet
- utility sidebars become collapsible;
- exhibits remain readable;
- drag targets remain large enough.

## Mobile
Practice and integrated result review supported.
Full simulation may display a recommendation to use a larger screen, but must remain functionally accessible.

---

# 15. TECHNICAL ARCHITECTURE — RECOMMENDED FOR PROJECT PHASE

## 15.1 Stack
Recommended:
- React;
- Vite;
- TypeScript;
- Tailwind CSS;
- Zustand or Redux Toolkit for session state;
- React Router;
- Recharts or Chart.js;
- Vitest + React Testing Library;
- Playwright.

## 15.2 Source/data separation
Do not hardcode scenario values inside UI components.

Recommended structure:
```text
src/
  app/
  components/
  features/
    redrock/
    seawolf/
    review/
  data/
    research/
      researchDeck.ts
    redrock/
    seawolf/
  engine/
    scoring/
    scenario/
    persistence/
    validation/
  hooks/
  types/
  utils/
  styles/
```

Every scenario file references `researchBasisIds` from the Research-Informed Data Deck. Scientific sources inform plausibility only; scoring reads only the synthetic scenario data.

## 15.3 Research-informed data-deck schema
```ts
type ResearchBasis = {
  id: string;
  domain: 'geography' | 'ecology' | 'wetland' | 'environmental-microbiology' | 'bioremediation';
  relationship: string;
  designUse: string[];
  citationKey: string;
  numericValuesCopiedIntoGame: false;
};
```

## 15.4 Case-data rule
Every case object must explicitly distinguish:
- synthetic game values;
- units shown to the learner;
- relationship being modelled;
- research-basis IDs;
- accepted answers/tolerances;
- scoring and transition rules.

# 16. DATA MODEL — RED ROCK

```ts
type RedRockScenario = {
  id: string;
  title: string;
  sponsor: 'Dr. Elena Cross';
  context: string;
  objective: string;
  researchBasisIds: string[];
  facts: Fact[];
  exhibits: Exhibit[];
  analysisQuestions: Question[];
  report: ReportTask;
  visualCases: VisualCase[];
};
```

All Red Rock numeric case values are synthetic training data unless explicitly labelled otherwise.

# 17. DATA MODEL — SEA WOLF

```ts
type SeaWolfScenario = {
  id: string;
  sponsor: 'Dr. Paula Reyes';
  researchBasisIds: string[];
  sites: SeaWolfSite[];
};

type SeaWolfSite = {
  id: string;
  title: string;
  ranges: {
    permeability: [number, number];
    mobility: [number, number];
    energy: [number, number];
  };
  desiredTrait: string;
  undesiredTrait: string;
  nextSiteInsight?: SiteInsight;
  preferredFilterStrategy: {
    attribute: 'permeability' | 'mobility' | 'energy';
    range: [number, number];
    trait: string;
  };
  routingDeck: Microbe[];              // 10 site-routing microbes
  initialPoolCandidateUniverse: Microbe[]; // fixed 12-card profiling universe
  referenceInitialProspectPoolIds: string[]; // 6 IDs returned by preferred A + Desired Trait profile
  prospectRounds: [Microbe[], Microbe[], Microbe[], Microbe[]]; // each exactly 3
  maxFeasibleEffectiveness: number;
};

type SeaWolfTrait =
  | 'Heat Resistant'
  | 'Aerobic'
  | 'Phosphorus Removal'
  | 'Light Sensitive';

type Microbe = {
  id: string;
  name: string;
  permeability: number; // integer 1–10 game index
  mobility: number;     // integer 1–10 game index
  energy: number;       // integer 1–10 game index
  trait: SeaWolfTrait;  // exactly one controlled V1 trait
};
```

`Permeability`, `Mobility` and `Energy` are **1–10 game indices**, not laboratory measurements or standard microbiological variables.

# 18. STATE MACHINE REQUIREMENT

Use explicit guarded transitions.

## Red Rock
`intro → investigation.objective → investigation.info → exhibit1 → exhibit2 → analysis → confirmAnalysis → reportWritten → confirmWritten → reportGraph → visualCase1 → visualCase2 → visualCase3 → visualCase4 → visualCase5 → visualCase6 → confirmTask1 → task1Result`

## Sea Wolf — Site 1
`studyIntro → selectSite → confirmSite → characteristics → categorisation(10) → initialPool(6) → prospect1 → prospect2 → prospect3 → prospect4 → treatment(3-of-10) → confirmTreatment → nextSite`

## Sea Wolf — Sites 2–3
`siteIntro → transferReassessment(if any) → enterCurrentSite → characteristics → categorisation(10) → initialPool(6) → prospect1 → prospect2 → prospect3 → prospect4 → treatment → confirmTreatment → nextSiteOrResults`

Never treat `Current Site` categorisation cards as the six-microbe Initial Prospect Pool.

# 18A. TEST-DATA VALIDATION REQUIREMENTS

## Red Rock
- recompute every answer from source fields;
- assert units/tolerances;
- verify Written Report fields trace to Investigation/Analysis;
- verify Graph Selection answers;
- verify six Visual Report cases remain independent and deterministic.

## Sea Wolf
For every fixed site:
- routing deck contains exactly 10 microbes before transferred-pile reassessment is applied;
- each microbe has 3 integer indices in the range 1–10 + exactly 1 trait from the locked four-trait vocabulary;
- Current Site logic can be evaluated as `>=2 of 4 positive criteria + no undesired trait`;
- transfer state is preserved correctly between sites;
- profiling candidate universe contains exactly 12 separate treatment candidates;
- all 21 possible two-characteristic pairs deterministically derive exactly 6 unique Initial Prospect Pool microbes;
- at least two characteristic pairs produce different six-card pools;
- preferred A + Desired Trait pair reproduces the validated reference six;
- four prospect rounds contain exactly 3 candidates each and require exactly one choice;
- final pool reaches exactly 10;
- enumerate every 3-of-10 treatment combination;
- verify all maximum-scoring trios;
- verify desired/undesired-trait scoring;
- verify residual-range examples;
- flag multiple optimal trios as valid rather than errors;
- assert any designed imperfect optimum.

# 19. ACCEPTANCE CRITERIA — V1

A V1 is acceptable only if:

- [ ] Red Rock and Sea Wolf are separate functional simulations.
- [ ] Learning Mode and Simulation Mode behave differently.
- [ ] Red Rock has working dark-sidebar nested navigation, Investigation (Objective / Study Information / Exhibit 1 / Exhibit 2), Analysis (4 scrollable question sections + right-side Journal + Calculator), Report (Written / Graph / Visual), and 6 Visual Report case pages.
- [ ] Sea Wolf implements Characteristics, routing Categorisation, separate Prospect Selection, Treatment and cross-site transfer reassessment.
- [ ] Sea Wolf Characteristics selection materially changes the six-card Initial Prospect Pool through a deterministic fixed-deck profiling rule.
- [ ] Each of the 3 Sea Wolf studies supports 3 sites (9 fixed sites total).
- [ ] Treatment score follows the 5 × 20-point criterion model.
- [ ] Journal can reorder, rename and mark items.
- [ ] Stage lock is enforced.
- [ ] Timer is stage-aware.
- [ ] Transition pause works.
- [ ] User work auto-saves.
- [ ] Resume session works.
- [ ] Keyboard alternative exists for every drag action.
- [ ] Hints are hidden in Simulation Mode.
- [ ] Final review separates accuracy from reasoning/process metrics.
- [ ] No unsupported claim about official McKinsey scoring or percentile equivalence.
- [ ] Case data is stored separately from UI components.
- [ ] All 3 Red Rock studies and all 9 Sea Wolf sites are covered by deterministic validation tests.

---

# 20. ISSUES IN THE CURRENT HTML PROTOTYPE TO CORRECT

1. **Single-file architecture**
   - Useful as a prototype; unsuitable for maintainable expansion.

2. **No persistent session state**
   - refresh loses progress.

3. **Red Rock investigation is too explicit**
   - collectible facts are effectively pre-labelled as important, reducing information-selection challenge.

4. **Journal is incomplete**
   - no reorder, rename, highlight/important, removal or richer state.

5. **Immediate correctness feedback**
   - inappropriate for Simulation Mode.

6. **Sea Wolf is incomplete**
   - current prototype jumps from sorting to final treatment and omits full characteristic selection, initial prospect-pool mechanics, four 1-of-3 additions, and full 3-site progression.

7. **Sea Wolf sorting does not fully model allocations**
   - current/next/return choices are not preserved as complete site-to-site state.

8. **Timer is visually present but not implemented as a real countdown.**

9. **Scorecard contains unsupported benchmark claims**
   - remove “98th percentile” and any assertion that a particular percentile guarantees an interview outcome.

10. **Hardcoded values**
    - case/scenario data should be externalised.

11. **Use of `eval()` in calculator**
    - replace with a safe parser.

12. **No accessibility model for drag/drop.**

13. **No explicit stage transition guards.**

---

# 21. RECOMMENDED FIRST RELEASE CASE SET

## Task 1 — Red Rock Study
1. Salvanova Forest
2. Caldera Marsh
3. Norvale Highlands

## Task 2 — Sea Wolf Study
1. Cinder Bay
2. Tidal Reach
3. Azure Shelf

The six studies should be available from the Home page.

**Learning Mode**
- any one study can be launched independently;
- strategy and coaching features are available.

**Simulation Mode**
- exactly one Task 1 study + one Task 2 study are selected;
- the pair forms a full timed simulation.


---

# 22. DECISIONS REQUIRED BEFORE PROJECT BUILD

Please confirm or revise:

1. App name.
2. Whether visual styling should be:
   - A. close to the supplied Solve visual language;
   - B. inspired by it but clearly original;
   - C. entirely custom.
3. Confirm the two-mode Home structure: Learning Mode + Simulation Mode.
4. Whether Salvanova should be the first Red Rock case.
5. Domain for the second Red Rock case.
6. Whether Sea Wolf should use:
   - fixed first scenario;
   - randomised scenario;
   - both.
7. Whether reviewer/teacher dashboard is V1 or later.
8. Whether progress should persist only locally or use a backend.
9. Preferred deployment:
   - GitHub Pages only;
   - Vercel/Netlify;
   - both.
10. Whether the project should be TypeScript React/Vite as recommended.

---

# 23. BUILD GATE

Do not generate the final project until:
- this Data Sheet is approved;
- case data is confirmed;
- visual direction is confirmed;
- simulation-vs-learning behaviour is confirmed.

After approval, build the project as a GitHub-ready repository with:
- README;
- package.json;
- source tree;
- reusable components;
- scenario data;
- tests;
- deployment config;
- `.gitignore`;
- licence/disclaimer;
- run instructions for Visual Studio Code.

---

# PART II — RESEARCH-INFORMED DATA DECK

## Test-data governance

This section is the **research-informed data deck** used to operationalise Task 1 and Task 2.

Mandatory distinction:
- **Scientific basis:** primary research informs the direction of relationships, environmental sensitivities, plausible traits, constraints and trade-offs.
- **Game data:** every deterministic learner-facing number is synthetic unless explicitly labelled otherwise.
- Synthetic values may use realistic units and plausible orders of magnitude, but they must never be described as measurements copied from a cited paper.
- Sea Wolf `Permeability`, `Mobility` and `Energy` are abstract 1–10 game indices. They are not scientific measurements.
- Sea Wolf traits are simplified functional/environmental labels inspired by real microbial phenomena; a trait being desired or undesired is site-specific, not a universal scientific judgement.
- The goal is scientific coherence, not scientific simulation fidelity. The game is engineered around **decision quality, constraints, opportunity cost and portfolio reasoning**.

### Locked V1 case set

**Task 1 — Red Rock**
1. Salvanova Forest — reference case from supplied walkthrough
2. Caldera Marsh — original transfer case
3. Norvale Highlands — original transfer case

**Task 2 — Sea Wolf**
1. Cinder Bay
2. Tidal Reach
3. Azure Shelf

### Locked Sea Wolf V1 policy
- fixed validated decks only;
- fictional scientific-sounding microbe names;
- deliberate distractors;
- outcome-based treatment scoring;
- multiple valid trios allowed;
- judgement-oriented Learning Mode feedback;
- no live Simulation Mode feedback;
- randomised variants deferred until after V1 validation.


## 0. Important design rule

This pack separates **real-world evidence** from **game data**.

- **Evidence anchors** come primarily from peer-reviewed geographical, ecological, environmental-microbiology and bioremediation research.
- **Game data** are synthetic, internally consistent values designed for a Solve-style practice environment. They use scientifically plausible relationships, units and relative patterns where useful, but they are **not presented as measurements from a real Caldera Marsh, Norvale Highlands, Cinder Bay, Tidal Reach, or Azure Shelf**.
- This prevents fabricated case facts from being mistaken for published evidence while still creating deterministic questions with exact answers.

The V1 case set contains six studies:

**Task 1 — Red Rock Study**
1. Salvanova Forest — reference study based on the supplied walkthrough
2. Caldera Marsh — original transfer study
3. Norvale Highlands — original transfer study

**Task 2 — Sea Wolf**
4. Cinder Bay
5. Tidal Reach
6. Azure Shelf

---

# 1. RESEARCH BASIS — RELATIONSHIPS, NOT COPIED CASE VALUES

## 1.1 Salvanova Forest — trophic relationships and spatial behaviour
Research supports the general idea that predator presence can alter prey movement/habitat use and thereby affect browsing pressure and vegetation patterns. The game uses this relationship direction only. Wolf numbers, hare growth, vegetation percentages, deer response and tourism values remain synthetic case data.

Research basis IDs: `SCI-GEO-01`.

## 1.2 Caldera Marsh — nutrient loading and wetland treatment
Floating/constructed wetland studies support these design relationships:
- nitrogen and phosphorus removal can occur through plant/biofilm processes;
- performance changes with loading and species/system design;
- treatment can also alter dissolved oxygen and other water-quality conditions;
- therefore a restoration option can improve one metric while creating another constraint.

The Caldera concentrations, flows, fish responses and visitor-revenue relationships are synthetic.

Research basis IDs: `SCI-WET-01`, `SCI-WET-02`.

## 1.3 Norvale Highlands — wildfire recovery and carbon
Post-fire regeneration is spatially variable and can be constrained by climate/moisture conditions. Carbon accumulation during forest regrowth also varies strongly across place and environmental context.

The game mirrors those relationships through limited restoration capacity, alternative recovery trajectories, carbon trade-offs and budget constraints. All hectare, cost and carbon values are synthetic.

Research basis IDs: `SCI-FIRE-01`, `SCI-FIRE-02`.

## 1.4 Sea Wolf — environmental microbiology and bioremediation
Primary research supports the following qualitative design relationships:
- hydrocarbon contamination can rapidly restructure marine microbial communities and enrich hydrocarbon-degrading groups;
- motility/chemotaxis and substrate-access functions can matter to microbial response;
- temperature can change which microbial groups perform well;
- hydrocarbon degradation can be nutrient-limited;
- microbial communities can perform enhanced biological phosphorus removal;
- natural sunlight/UV can affect bacterial activity differently across groups;
- thermophilic hydrocarbon degraders demonstrate that heat tolerance can be relevant to biodegradation contexts.

The game translates these relationships into simplified fictional traits and portfolio trade-offs. The microbe names are fictional. `Permeability`, `Mobility` and `Energy` are synthetic indices with no direct one-to-one scientific equivalent.

Research basis IDs: `SCI-MIC-01`–`SCI-MIC-07`.

## 1.5 Data-generation rule
When creating or revising a deck:
1. start from a documented environmental relationship;
2. build a fictional scenario around it;
3. choose synthetic values that make the arithmetic exact and the constraints meaningful;
4. validate all outcomes computationally;
5. cite the relationship source in the appendix;
6. never imply the synthetic value itself came from that source.

# 2. INTERNAL DECISION-QUALITY MODEL — NOT LEARNER-FACING

For authoring, feedback and validation, cases should still exercise:
- defining the decision;
- selecting relevant evidence;
- translating narrative into variables;
- calculating or comparing;
- applying thresholds/constraints;
- considering opportunity cost;
- testing portfolio effects;
- sense-checking;
- making and explaining the final decision.

These ideas are delivered through the Fairhaven client narrative and contextual prompts. They are not shown as a named framework or mandatory sequence in the learner interface.

# 3. TASK 1 — RED ROCK STUDY: CALDERA MARSH

## 3.1 Case purpose

**Domain:** wetland restoration / nutrient pollution  
**Primary reasoning:** load calculation, thresholds, percentage change, trade-offs, cost effectiveness, budget allocation.

### Screen language

**Client brief — Dr. Elena Cross**

**Welcome, and thanks for joining this workstream.**

Fairhaven Environmental Trust is considering whether to support a five-year restoration programme for Caldera Marsh after several years of elevated agricultural runoff. Water quality has deteriorated, but the proposed intervention carries ecological, delivery and financial implications that I need to understand before we commit.

I'd like you to test whether the programme can achieve the water-quality outcomes we need, identify the constraint that matters most, and assess the ecological and visitor-value consequences. At the end of your review, I need a concise recommendation I can take into the Trust's programme decision.

As you investigate, use the Research Journal to retain the evidence that materially supports your thinking. You will also have the study exhibits and, where available, the calculator. Focus on what you would want in front of you if I asked you to defend your recommendation.

In a full simulation, you will have **35 minutes** to complete the workstream.

**CTA:** `Review the Brief →`

---

## 3.2 Investigation — Case facts

### Core facts

| Variable | Value |
|---|---:|
| Average daily inflow | 42 million L/day |
| Baseline nitrogen concentration | 7.5 mg/L |
| Baseline phosphorus concentration | 0.80 mg/L |
| Baseline dissolved oxygen | 4.2 mg/L |
| Fish population | 24,000 |
| Annual visitors | 180,000 |
| Aquatic-life DO reference | 5.0 mg/L |
| Restoration programme duration | 5 years |
| Programme budget | $12 million |

### Response relationship

For the case, the Trust's planning model assumes:
- every **0.5 mg/L** increase in dissolved oxygen could support approximately **1,200 additional fish**;
- every **0.5 mg/L** increase in dissolved oxygen is associated with approximately **$30,000** additional annual visitor revenue.

These are **case assumptions**, not universal ecological constants.

### Distractor / secondary facts

Present these as neutral, draggable numeric/measurable facts with no hint about relevance:
- marsh boundary length: 18 km;
- ranger stations: 4;
- average summer air temperature: 27°C;
- observation tower age: 11 years;
- visitors arriving by bicycle: 16%.

Do not tell the learner that these facts are irrelevant or secondary. Their purpose is to test evidence selection without changing any required calculation or correct answer.

---

## 3.3 Exhibit 1 — Five-year water-quality projection

| Year | Nitrogen mg/L | Phosphorus mg/L | Dissolved Oxygen mg/L |
|---:|---:|---:|---:|
| 0 | 7.5 | 0.80 | 4.2 |
| 1 | 6.8 | 0.72 | 4.5 |
| 2 | 6.1 | 0.65 | 4.8 |
| 3 | 5.5 | 0.58 | 5.1 |
| 4 | 5.0 | 0.52 | 5.4 |
| 5 | 4.5 | 0.47 | 5.7 |

### Case thresholds

The programme is considered to have reached the full water-quality target once:
- nitrogen ≤ 5.0 mg/L;
- phosphorus ≤ 0.50 mg/L;
- dissolved oxygen ≥ 5.0 mg/L.

---

## 3.4 Analysis questions

### Question 1A — Nitrogen load

**Question**

At baseline conditions, approximately how many kilograms of nitrogen enter the marsh each day?

**Calculation**

7.5 mg/L × 42,000,000 L/day  
= 315,000,000 mg/day  
= **315 kg/day**

**Answer:** 315 kg/day

**Reasoning lesson:** Convert narrative units before calculating.

**Likely errors**
- forgetting mg → kg conversion;
- multiplying by 42 rather than 42 million;
- treating concentration as total load.

---

### Question 1B — Full target year

**Question**

What is the earliest year in which all three water-quality targets are met?

Check:
- N reaches target in Year 4;
- DO reaches target in Year 3;
- P reaches target in Year 5.

**Answer:** Year 5

**Reasoning lesson:** A system-level target is constrained by the last condition to become compliant.

---

### Question 1C — Nitrogen reduction

**Question**

By what percentage does nitrogen concentration fall between Year 0 and Year 5?

(7.5 − 4.5) / 7.5 × 100  
= 3.0 / 7.5 × 100  
= **40%**

**Answer:** 40%

**Reasoning lesson:** Percentage change uses the baseline as denominator.

---

### Question 2A — Dissolved oxygen improvement

5.7 − 4.2 = **1.5 mg/L**

**Answer:** 1.5 mg/L

---

### Question 2B — Fish population

1.5 / 0.5 = 3 increments  
3 × 1,200 = 3,600 additional fish  
24,000 + 3,600 = **27,600**

**Answer:** 27,600 fish

**Reasoning lesson:** Translate an effect relationship into discrete increments.

---

### Question 3 — Visitor revenue

1.5 / 0.5 = 3 increments  
3 × $30,000 = **$90,000**

**Answer:** $90,000 additional annual visitor revenue

---

## 3.5 Written report answer set

Correct values:
- baseline N: 7.5 mg/L
- Year-5 N: 4.5 mg/L
- nitrogen reduction: 40%
- target fully achieved: Year 5
- DO: 4.2 → 5.7 mg/L
- fish population: 27,600
- additional annual visitor revenue: $90,000

---

## 3.6 Visual report

### Task
Compare Year 0 and Year 5 values for:
- nitrogen;
- phosphorus;
- dissolved oxygen.

### Best chart
**Clustered bar chart**, preferably with clearly separated units or normalised index if all three are plotted together.

### Higher-level reasoning lesson
A chart can be mathematically correct but visually misleading if variables with different units/scales share one axis.

---

## 3.7 Six Visual Report cases

### Visual Report Case 1 — Storm runoff load
Storm inflow = 60 million L/day  
Nitrogen = 6.0 mg/L

60,000,000 × 6 = 360,000,000 mg  
= **360 kg/day**

---

### Visual Report Case 2 — Treatment efficiency
Three pilot wetlands:

| Pilot | N removal | P removal | Annual cost |
|---|---:|---:|---:|
| A | 42% | 24% | $1.8m |
| B | 35% | 36% | $1.6m |
| C | 48% | 18% | $2.0m |

Requirement:
- N ≥ 40%
- P ≥ 20%
- choose lowest cost.

Only A satisfies both.

**Answer:** Pilot A

**Lesson:** Filter by constraints before optimising cost.

---

### Visual Report Case 3 — Cost per kg removed

| Project | Annual N removed | Annual cost |
|---|---:|---:|
| Buffer planting | 62,000 kg | $1.24m |
| Floating wetland | 48,000 kg | $0.84m |
| Aeration + wetland | 74,000 kg | $1.63m |

Cost/kg:
- Buffer = $20.00
- Floating = $17.50
- Combined ≈ $22.03

**Answer:** Floating wetland

---

### Visual Report Case 4 — Regional improvement

DO:
- North Basin: 4.0 → 5.4 = +1.4
- Central Basin: 4.6 → 5.6 = +1.0
- South Basin: 3.8 → 5.5 = +1.7

**Answer:** South Basin

---

### Visual Report Case 5 — Stability

Monthly phosphorus ranges:
- North: 0.44–0.51 = 0.07
- Central: 0.38–0.49 = 0.11
- South: 0.41–0.60 = 0.19

**Answer:** North is most stable.

---

### Visual Report Case 6 — Budget allocation

Budget: $6m

| Option | Cost per hectare | N removed per hectare/year |
|---|---:|---:|
| A | $3,000 | 24 kg |
| B | $4,000 | 30 kg |
| C | $5,000 | 34 kg |

If entire budget is spent:
- A: 2,000 ha × 24 = 48,000 kg
- B: 1,500 ha × 30 = 45,000 kg
- C: 1,200 ha × 34 = 40,800 kg

**Answer:** A

**Lesson:** Highest unit performance is not necessarily highest total outcome under a fixed budget.

---

# 4. TASK 1 — RED ROCK STUDY: NORVALE HIGHLANDS

## 4.1 Case purpose

**Domain:** wildfire recovery / forest restoration  
**Primary reasoning:** capacity, scenario comparison, carbon efficiency, constraints, feasible vs theoretical optimum.

### Screen language

**Client brief — Dr. Elena Cross**

**Welcome, and thanks for joining this workstream.**

Fairhaven Environmental Trust is considering whether to support an integrated five-year recovery programme for Norvale Highlands after a major wildfire damaged forest cover, habitat and watershed resilience. The environmental case may be compelling, but I need to know whether the proposed programme is genuinely deliverable before we commit funding and capacity.

I'd like you to test the recovery case against the available budget, planting capacity and expected carbon and forest-cover outcomes. At the end of your review, I need a concise recommendation that distinguishes what is environmentally attractive from what is operationally feasible.

As you investigate, use the Research Journal to retain the evidence that materially supports your thinking. You will also have the study exhibits and, where available, the calculator. Focus on what you would want in front of you if I asked you to defend your recommendation.

In a full simulation, you will have **35 minutes** to complete the workstream.

**CTA:** `Review the Brief →`

---

## 4.2 Investigation facts

| Variable | Value |
|---|---:|
| Area affected by wildfire | 24,000 ha |
| Forest cover immediately after fire | 38% |
| Natural recovery | +1.5 percentage points/year |
| Integrated restoration recovery | +5.0 percentage points/year |
| Planned active restoration | 16,000 ha |
| Planting capacity | 3,200 ha/year |
| Restoration cost | $4,500/ha |
| Mature annual carbon benefit | 4.8 tCO2e/ha/year |
| Programme period | 5 years |
| Budget | $75m |

Distractors — present neutrally as draggable facts:
- visitor centre rebuilt: 2019;
- marked hiking routes: 3.

Do not add commentary that identifies either fact as irrelevant. Distractors must be plausible numeric/measurable facts that are unnecessary for the required calculations and do not alter the answer key.

---

## 4.3 Exhibit 1 — Forest-cover scenarios

| Year | Natural recovery | Integrated restoration |
|---:|---:|---:|
| 0 | 38.0% | 38.0% |
| 1 | 39.5% | 43.0% |
| 2 | 41.0% | 48.0% |
| 3 | 42.5% | 53.0% |
| 4 | 44.0% | 58.0% |
| 5 | 45.5% | 63.0% |

---

## 4.4 Analysis questions

### Q1A — Programme cost

16,000 ha × $4,500  
= **$72m**

**Answer:** $72 million

Budget headroom = $75m − $72m = **$3m**

---

### Q1B — Capacity

16,000 / 3,200 = **5 years**

**Answer:** exactly five years.

**Lesson:** Feasibility can be constrained by implementation capacity even when finance is sufficient.

---

### Q2A — Mature annual carbon benefit

16,000 × 4.8  
= **76,800 tCO2e/year**

---

### Q2B — Forest-cover effect

63.0 − 45.5  
= **17.5 percentage points**

**Answer:** integrated restoration produces 17.5 percentage points more cover than natural recovery at Year 5.

---

### Q3 — Relative increase vs natural recovery

17.5 / 45.5 × 100  
≈ **38.46%**

This is different from a 17.5 percentage-point difference.

---

## 4.5 Written report answer set

- planned restoration: 16,000 ha
- programme cost: $72m
- budget headroom: $3m
- capacity required: 5 years
- mature annual carbon benefit: 76,800 tCO2e
- natural Year-5 cover: 45.5%
- integrated Year-5 cover: 63.0%
- improvement: 17.5 percentage points

---

## 4.6 Visual report

Best chart:
**line chart** for the five-year trajectory.

Reason:
unlike the Salvanova end-state comparison, Norvale explicitly asks the user to show how two scenarios evolve over time.

Transfer lesson:
**chart choice depends on the analytical question, not habit.**

---

## 4.7 Six Visual Report cases

### Case 1 — Seedling survival
100,000 seedlings planted.

| Species | Survival |
|---|---:|
| Pine | 84% |
| Cedar | 78% |
| Oak | 91% |

Surviving oak seedlings = **91,000**.

---

### Case 2 — Workforce capacity
A crew restores 40 ha/week.
18 crews work 30 weeks.

40 × 18 × 30 = **21,600 ha**

---

### Case 3 — Carbon per dollar

| Species | Cost/tree | Carbon index | Survival |
|---|---:|---:|---:|
| Pine | $10 | 6.0 | 85% |
| Cedar | $14 | 7.7 | 88% |
| Eucalyptus | $8 | 5.8 | 74% |
| Oak | $18 | 8.4 | 92% |

Raw carbon/$:
- Pine = .60
- Cedar = .55
- Eucalyptus = .725
- Oak ≈ .467

Unconstrained winner: **Eucalyptus**  
With survival ≥80%: **Pine**

---

### Case 4 — Watershed recovery
Erosion index:
- North: 72 → 48 = -24
- East: 65 → 46 = -19
- South: 80 → 50 = -30

**Answer:** South improves most.

---

### Case 5 — Stability
Annual fire-risk index:
- Zone A: 41–47 range 6
- Zone B: 32–45 range 13
- Zone C: 29–51 range 22

**Answer:** Zone A most stable.

---

### Case 6 — Fixed budget portfolio

Budget: $18m

| Strategy | Cost/ha | Carbon index/ha |
|---|---:|---:|
| A | $3,000 | 3.8 |
| B | $4,500 | 5.4 |
| C | $6,000 | 6.5 |

Total carbon index if whole budget allocated:
- A: 6,000 ha × 3.8 = 22,800
- B: 4,000 × 5.4 = 21,600
- C: 3,000 × 6.5 = 19,500

**Answer:** A

Lesson:
the most carbon-dense treatment is not necessarily the best portfolio under fixed capital.

---

# 5. SEA WOLF — SHARED SCIENTIFIC FRAME

## 5.1 Plausibility layer
The Sea Wolf story mirrors real environmental-microbiology findings about:
- hydrocarbon-degrading microbial communities;
- oxygen/redox context;
- nutrient limitation;
- temperature sensitivity/tolerance;
- motility/chemotaxis and contaminant access;
- phosphorus-removal functions;
- light/UV sensitivity differences;
- community complementarity.

It does **not** claim that a real laboratory would score microbes using `Permeability`, `Mobility` and `Energy` on a 1–10 scale.

### Trait interpretation — controlled V1 vocabulary
Sea Wolf V1 uses exactly four simplified trait labels across every study:
- `Aerobic` mirrors oxygen-dependent metabolic context.
- `Phosphorus Removal` mirrors documented polyphosphate-accumulating microbial functions.
- `Heat Resistant` is a simplified scenario trait inspired by temperature-tolerant/thermophilic degraders.
- `Light Sensitive` is a simplified scenario trait inspired by differential sunlight/UV inhibition among marine bacterial groups.

Every microbe has exactly one of these four labels. There is no `Neutral` trait in V1. Whether a trait is desired, undesired or non-binding is determined by the fictional site's conditions.

## 5.2 Game scoring
For the final three-microbe treatment, start at 100% and deduct 20 percentage points for each failed criterion:
1. average Permeability outside range;
2. average Mobility outside range;
3. average Energy outside range;
4. any undesired trait present;
5. desired trait absent.

The score is a game-performance measure, not a scientific bioremediation-efficiency estimate.

# TASK 2 — SEA WOLF: CINDER BAY



**Client brief — Dr. Paula Reyes**

**Welcome, and thanks for joining this workstream.**

I am coordinating a treatment programme across three contaminated coastal zones in Cinder Bay. I need a recommendation for each site, but the sites are connected: a microbe that looks useful now may be more valuable later, so I want you to protect the programme as a whole rather than optimise one site in isolation.

I want you to work site by site. Choose two characteristics to shape the six-microbe treatment pool; separately route ten microbes between the current site, the next site where available, or return; then add one candidate from each of four prospect sets and recommend a final three-microbe treatment. Once you confirm a treatment, that site is closed, so I need you to use the information and options available before you commit.

You will have the current site requirements, individual microbe profiles and limited next-site information where it is available. I will keep the Site Information panel visible as your working reference, and your treatment pool will remain visible while you build the final combination.

In a full simulation, you will have **30 minutes** to complete all three sites.

**CTA:** `Review the Brief →`

### Site 1 — Refinery Shore

**Site Information**
- Permeability: **6–8**
- Mobility: **7–9**
- Energy: **3–5**
- Desired trait: **Heat Resistant**
- Undesired trait: **Aerobic**
- Next Site Insight: **Energy 2–4**

**Reference Learning filter strategy:** Mobility 7–9 + Heat Resistant

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Theloria | 6 | 7 | 3 | Heat Resistant | 4/4 | Current |
| Marivex | 8 | 9 | 5 | Phosphorus Removal | 3/4 | Current |
| Cindera | 6 | 6 | 3 | Light Sensitive | 2/4 | Current |
| Thermessa | 5 | 7 | 2 | Heat Resistant | 2/4 | Current |
| Pelagor | 8 | 7 | 2 | Phosphorus Removal | 2/4 | Current |
| Aervallis | 5 | 6 | 2 | Aerobic | 0/4 | Next |
| Phosyne | 5 | 6 | 2 | Phosphorus Removal | 0/4 | Next |
| Lucentia | 5 | 7 | 1 | Phosphorus Removal | 1/4 | Return |
| Nerova | 5 | 6 | 1 | Light Sensitive | 0/4 | Return |
| Aerocline | 8 | 9 | 1 | Aerobic | 2/4 | Return |

**Transfer validation for the next site**
- Aervallis → Current Site (2/4) when the next site's full information becomes available.
- Phosyne → Next Site when the next site's full information becomes available.

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Abyssia | 6 | 7 | 2 | Heat Resistant |
| Thermora | 8 | 9 | 4 | Heat Resistant |
| Nerella | 4 | 8 | 4 | Phosphorus Removal |
| Pelagia | 9 | 4 | 6 | Light Sensitive |
| Luminex | 7 | 6 | 5 | Light Sensitive |
| Vectria | 8 | 7 | 6 | Phosphorus Removal |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Acinera — 5/7/1 — Aerobic | Bacoryx — 2/2/8 — Aerobic | Celeris — 10/3/9 — Aerobic | **Acinera** |
| 2 | Parolia — 4/8/1 — Phosphorus Removal | Sedara — 1/10/4 — Heat Resistant | Noceria — 10/10/6 — Heat Resistant | **Sedara** |
| 3 | Aconia — 5/7/1 — Phosphorus Removal | Shigora — 6/9/5 — Phosphorus Removal | Synera — 3/10/10 — Heat Resistant | **Shigora** |
| 4 | Alteria — 6/10/2 — Light Sensitive | Marinox — 10/7/6 — Light Sensitive | Ioneta — 9/3/3 — Light Sensitive | **Alteria** |

- **Round 1 authoring rationale:** All three carry the undesired trait; choose **Acinera** as the least-worst option because Mobility is the only useful in-range contribution.
- **Round 2 authoring rationale:** Choose **Sedara**: it avoids the undesired trait, carries the desired trait and contributes a usable Energy value.
- **Round 3 authoring rationale:** Choose **Shigora**: all three attributes fit the site even though its trait is non-binding.
- **Round 4 authoring rationale:** All three are individually weak/tied; choose **Alteria** because high Mobility improves the existing pool's ability to hit the final average.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Abyssia | 6 | 7 | 2 | Heat Resistant |
| Thermora | 8 | 9 | 4 | Heat Resistant |
| Nerella | 4 | 8 | 4 | Phosphorus Removal |
| Pelagia | 9 | 4 | 6 | Light Sensitive |
| Luminex | 7 | 6 | 5 | Light Sensitive |
| Vectria | 8 | 7 | 6 | Phosphorus Removal |
| Acinera | 5 | 7 | 1 | Aerobic |
| Sedara | 1 | 10 | 4 | Heat Resistant |
| Shigora | 6 | 9 | 5 | Phosphorus Removal |
| Alteria | 6 | 10 | 2 | Light Sensitive |

#### Treatment validation
- Reference trio: **Abyssia + Shigora + Alteria**
- Average Permeability: **6.00**
- Average Mobility: **8.67**
- Average Energy: **3.00**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **24**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
### Site 2 — Inner Harbour

**Site Information**
- Permeability: **2–4**
- Mobility: **3–5**
- Energy: **2–4**
- Desired trait: **Aerobic**
- Undesired trait: **Heat Resistant**
- Next Site Insight: **Desired trait: Phosphorus Removal**

**Reference Learning filter strategy:** Permeability 2–4 + Aerobic

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Brinella | 2 | 3 | 2 | Aerobic | 4/4 | Current |
| Aqualon | 4 | 5 | 4 | Phosphorus Removal | 3/4 | Current |
| Oxymara | 2 | 2 | 2 | Light Sensitive | 2/4 | Current |
| Aeriella | 1 | 3 | 1 | Aerobic | 2/4 | Current |
| Coralia | 4 | 3 | 1 | Phosphorus Removal | 2/4 | Current |
| Phosena | 3 | 8 | 5 | Phosphorus Removal | 1/4 | Next |
| Phosrix | 1 | 2 | 1 | Phosphorus Removal | 0/4 | Next |
| Luminor | 1 | 3 | 1 | Light Sensitive | 1/4 | Return |
| Neraxis | 1 | 2 | 1 | Light Sensitive | 0/4 | Return |
| Thermex | 4 | 5 | 4 | Heat Resistant | 3/4 | Return |

**Transfer validation for the next site**
- Phosena → Current Site (4/4) when the next site's full information becomes available.
- Phosrix → Return when the next site's full information becomes available.

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Aerona | 3 | 4 | 4 | Aerobic |
| Esturia | 4 | 5 | 3 | Phosphorus Removal |
| Spurana | 2 | 5 | 3 | Light Sensitive |
| Thermara | 3 | 4 | 3 | Heat Resistant |
| Luminia | 5 | 3 | 2 | Light Sensitive |
| Phorena | 2 | 6 | 4 | Phosphorus Removal |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Brinia — 4/4/2 — Aerobic | Corvex — 5/6/5 — Light Sensitive | Therion — 2/3/4 — Heat Resistant | **Brinia** |
| 2 | Coralia — 2/3/5 — Phosphorus Removal | Aervia — 5/4/3 — Aerobic | Luminor — 3/6/5 — Light Sensitive | **Coralia** |
| 3 | Peloria — 5/4/3 — Light Sensitive | Therella — 4/5/4 — Heat Resistant | Phosia — 1/3/2 — Phosphorus Removal | **Peloria** |
| 4 | Ventara — 3/6/2 — Aerobic | Marevia — 4/2/4 — Light Sensitive | Neraxis — 6/5/5 — Phosphorus Removal | **Ventara** |

- **Round 1 authoring rationale:** Choose **Brinia** for strong low-range fit plus the desired Aerobic trait.
- **Round 2 authoring rationale:** Choose **Coralia** to add low Permeability/Mobility coverage without the undesired trait.
- **Round 3 authoring rationale:** Choose **Peloria** as the best attribute-balancing option among the three.
- **Round 4 authoring rationale:** Choose **Ventara** to add Aerobic coverage and low Permeability/Energy optionality.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Aerona | 3 | 4 | 4 | Aerobic |
| Esturia | 4 | 5 | 3 | Phosphorus Removal |
| Spurana | 2 | 5 | 3 | Light Sensitive |
| Thermara | 3 | 4 | 3 | Heat Resistant |
| Luminia | 5 | 3 | 2 | Light Sensitive |
| Phorena | 2 | 6 | 4 | Phosphorus Removal |
| Brinia | 4 | 4 | 2 | Aerobic |
| Coralia | 2 | 3 | 5 | Phosphorus Removal |
| Peloria | 5 | 4 | 3 | Light Sensitive |
| Ventara | 3 | 6 | 2 | Aerobic |

#### Treatment validation
- Reference trio: **Aerona + Esturia + Spurana**
- Average Permeability: **3.00**
- Average Mobility: **4.67**
- Average Energy: **3.33**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **52**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
### Site 3 — Outer Breakwater

**Site Information**
- Permeability: **3–5**
- Mobility: **8–10**
- Energy: **5–7**
- Desired trait: **Phosphorus Removal**
- Undesired trait: **Heat Resistant**
- Next Site Insight: **None — final site**

**Reference Learning filter strategy:** Mobility 8–10 + Phosphorus Removal

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Phosara | 3 | 8 | 5 | Phosphorus Removal | 4/4 | Current |
| Bathyra | 5 | 10 | 7 | Aerobic | 3/4 | Current |
| Mobilium | 3 | 7 | 5 | Light Sensitive | 2/4 | Current |
| Nerevia | 2 | 8 | 4 | Phosphorus Removal | 2/4 | Current |
| Peliona | 5 | 8 | 4 | Aerobic | 2/4 | Current |
| Thermella | 2 | 7 | 4 | Heat Resistant | 0/4 | Return |
| Aerolin | 2 | 7 | 4 | Aerobic | 0/4 | Return |
| Lucora | 2 | 8 | 4 | Aerobic | 1/4 | Return |
| Talassa | 2 | 7 | 4 | Light Sensitive | 0/4 | Return |
| Thermora | 5 | 10 | 7 | Heat Resistant | 3/4 | Return |

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Phosera | 4 | 9 | 6 | Phosphorus Removal |
| Iasona | 2 | 8 | 6 | Phosphorus Removal |
| Plotara | 5 | 8 | 5 | Light Sensitive |
| Crovena | 3 | 10 | 7 | Aerobic |
| Thermia | 4 | 9 | 6 | Heat Resistant |
| Luminara | 6 | 7 | 5 | Light Sensitive |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Yajorix — 9/7/5 — Phosphorus Removal | Iaesora — 2/9/5 — Phosphorus Removal | Portella — 4/6/8 — Phosphorus Removal | **Iaesora** |
| 2 | Plotogen — 7/8/5 — Light Sensitive | Phosmera — 6/7/5 — Phosphorus Removal | Aerovia — 4/7/8 — Aerobic | **Plotogen** |
| 3 | Panora — 6/8/5 — Phosphorus Removal | Conflora — 2/8/10 — Light Sensitive | Kolsona — 2/10/5 — Heat Resistant | **Panora** |
| 4 | Mesopaea — 7/10/7 — Phosphorus Removal | Shewanix — 6/7/1 — Phosphorus Removal | Aegiria — 4/5/8 — Aerobic | **Mesopaea** |

- **Round 1 authoring rationale:** Choose **Iaesora** because it contributes two matching attributes plus the desired trait.
- **Round 2 authoring rationale:** The desired trait is already well represented; choose **Plotogen** for the stronger Mobility/Energy contribution.
- **Round 3 authoring rationale:** Choose **Panora** for two matching attributes plus desired-trait redundancy without the undesired trait.
- **Round 4 authoring rationale:** Choose **Mesopaea** because Mobility and Energy fit and it preserves several 100% trio options.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Phosera | 4 | 9 | 6 | Phosphorus Removal |
| Iasona | 2 | 8 | 6 | Phosphorus Removal |
| Plotara | 5 | 8 | 5 | Light Sensitive |
| Crovena | 3 | 10 | 7 | Aerobic |
| Thermia | 4 | 9 | 6 | Heat Resistant |
| Luminara | 6 | 7 | 5 | Light Sensitive |
| Iaesora | 2 | 9 | 5 | Phosphorus Removal |
| Plotogen | 7 | 8 | 5 | Light Sensitive |
| Panora | 6 | 8 | 5 | Phosphorus Removal |
| Mesopaea | 7 | 10 | 7 | Phosphorus Removal |

#### Treatment validation
- Reference trio: **Phosera + Iasona + Plotogen**
- Average Permeability: **4.33**
- Average Mobility: **8.33**
- Average Energy: **5.67**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **52**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
**Cinder Bay design emphasis:** understand the difference between routing and treatment building; learn that individual fit and trio fit are not the same.

# TASK 2 — SEA WOLF: TIDAL REACH



**Client brief — Dr. Paula Reyes**

**Welcome, and thanks for joining this workstream.**

I am coordinating treatment across three connected environments in Tidal Reach, where stormwater, agricultural runoff and fuel contamination create overlapping needs. Several microbes will look useful in more than one place, so I need you to distinguish a strong individual card from a strong programme decision.

I want you to work site by site. Choose two characteristics to shape the six-microbe treatment pool; separately route ten microbes between the current site, the next site where available, or return; then add one candidate from each of four prospect sets and recommend a final three-microbe treatment. Once you confirm a treatment, that site is closed, so I need you to protect the quality of the wider programme as you commit each site.

You will have the current site requirements, individual microbe profiles and limited next-site information where it is available. I will keep the Site Information panel visible as your working reference, and your treatment pool will remain visible while you build the final combination.

In a full simulation, you will have **30 minutes** to complete all three sites.

**CTA:** `Review the Brief →`

### Site 1 — Storm Estuary

**Site Information**
- Permeability: **4–5**
- Mobility: **7–8**
- Energy: **4–5**
- Desired trait: **Light Sensitive**
- Undesired trait: **Aerobic**
- Next Site Insight: **Permeability 7–8**

**Reference Learning filter strategy:** Mobility 7–8 + Light Sensitive

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Estuvara | 4 | 7 | 4 | Light Sensitive | 4/4 | Current |
| Brackia | 5 | 8 | 5 | Heat Resistant | 3/4 | Current |
| Rillora | 4 | 6 | 4 | Phosphorus Removal | 2/4 | Current |
| Luxella | 3 | 7 | 3 | Light Sensitive | 2/4 | Current |
| Deltae | 5 | 7 | 3 | Heat Resistant | 2/4 | Current |
| Aerosa | 7 | 6 | 3 | Aerobic | 0/4 | Next |
| Halovex | 7 | 6 | 3 | Heat Resistant | 0/4 | Next |
| Phoralis | 6 | 7 | 3 | Heat Resistant | 1/4 | Return |
| Motella | 6 | 6 | 3 | Phosphorus Removal | 0/4 | Return |
| Aerina | 6 | 8 | 5 | Aerobic | 2/4 | Return |

**Transfer validation for the next site**
- Aerosa → Current Site (2/4) when the next site's full information becomes available.
- Halovex → Next Site when the next site's full information becomes available.

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Luxara | 4 | 8 | 4 | Light Sensitive |
| Merona | 5 | 7 | 5 | Phosphorus Removal |
| Deltia | 4 | 7 | 5 | Heat Resistant |
| Aerixa | 5 | 8 | 4 | Aerobic |
| Rillia | 3 | 8 | 5 | Light Sensitive |
| Brixor | 6 | 7 | 4 | Heat Resistant |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Solenia — 4/8/5 — Light Sensitive | Varoxa — 5/9/4 — Phosphorus Removal | Cresta — 3/7/6 — Heat Resistant | **Solenia** |
| 2 | Aervex — 5/7/4 — Aerobic | Lumera — 4/6/5 — Light Sensitive | Phorix — 6/8/4 — Phosphorus Removal | **Lumera** |
| 3 | Darsia — 4/7/6 — Phosphorus Removal | Therava — 5/8/4 — Heat Resistant | Lucora — 3/9/5 — Light Sensitive | **Therava** |
| 4 | Vellia — 4/9/4 — Light Sensitive | Nerion — 5/7/6 — Heat Resistant | Corvella — 6/8/5 — Phosphorus Removal | **Corvella** |

- **Round 1 authoring rationale:** Choose **Solenia**: strongest direct fit and desired trait.
- **Round 2 authoring rationale:** Avoid Aervex's undesired trait; **Lumera** preserves two useful attributes plus desired-trait coverage.
- **Round 3 authoring rationale:** Choose **Therava** for three matching attributes.
- **Round 4 authoring rationale:** The options are close; choose **Corvella** to strengthen Mobility/Energy while the desired trait is already available.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Luxara | 4 | 8 | 4 | Light Sensitive |
| Merona | 5 | 7 | 5 | Phosphorus Removal |
| Deltia | 4 | 7 | 5 | Heat Resistant |
| Aerixa | 5 | 8 | 4 | Aerobic |
| Rillia | 3 | 8 | 5 | Light Sensitive |
| Brixor | 6 | 7 | 4 | Heat Resistant |
| Solenia | 4 | 8 | 5 | Light Sensitive |
| Lumera | 4 | 6 | 5 | Light Sensitive |
| Therava | 5 | 8 | 4 | Heat Resistant |
| Corvella | 6 | 8 | 5 | Phosphorus Removal |

#### Treatment validation
- Reference trio: **Luxara + Merona + Deltia**
- Average Permeability: **4.33**
- Average Mobility: **7.33**
- Average Energy: **4.67**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **62**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
### Site 2 — Agricultural Channel

**Site Information**
- Permeability: **7–8**
- Mobility: **3–4**
- Energy: **5–6**
- Desired trait: **Aerobic**
- Undesired trait: **Heat Resistant**
- Next Site Insight: **Energy 2–3**

**Reference Learning filter strategy:** Permeability 7–8 + Aerobic

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Channelis | 7 | 3 | 5 | Aerobic | 4/4 | Current |
| Nitara | 8 | 4 | 6 | Phosphorus Removal | 3/4 | Current |
| Pellon | 7 | 2 | 5 | Light Sensitive | 2/4 | Current |
| Aerovia | 6 | 3 | 4 | Aerobic | 2/4 | Current |
| Maraxis | 8 | 3 | 4 | Phosphorus Removal | 2/4 | Current |
| Thermoril | 5 | 8 | 2 | Heat Resistant | 0/4 | Next |
| Phosel | 4 | 7 | 4 | Phosphorus Removal | 0/4 | Return |
| Lumessa | 6 | 3 | 1 | Phosphorus Removal | 1/4 | Return |
| Corvella | 6 | 2 | 1 | Light Sensitive | 0/4 | Return |
| Thermaris | 8 | 4 | 1 | Heat Resistant | 2/4 | Return |

**Transfer validation for the next site**
- Thermoril → Current Site (4/4) when the next site's full information becomes available.

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Aerixa | 7 | 4 | 5 | Aerobic |
| Oxera | 8 | 3 | 6 | Phosphorus Removal |
| Pellara | 7 | 3 | 5 | Light Sensitive |
| Thermex | 8 | 4 | 6 | Heat Resistant |
| Grena | 6 | 4 | 5 | Aerobic |
| Marnor | 9 | 3 | 6 | Phosphorus Removal |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Aeronis — 7/4/6 — Aerobic | Lumaris — 8/5/5 — Light Sensitive | Phorena — 6/3/6 — Phosphorus Removal | **Aeronis** |
| 2 | Aerivor — 8/3/4 — Aerobic | Theralia — 7/4/5 — Heat Resistant | Lutex — 9/4/5 — Light Sensitive | **Aerivor** |
| 3 | Pelona — 7/5/6 — Phosphorus Removal | Lumeris — 8/3/7 — Light Sensitive | Aeriom — 6/4/5 — Aerobic | **Aeriom** |
| 4 | Corvia — 8/4/5 — Phosphorus Removal | Theraxis — 6/3/6 — Heat Resistant | Aqualis — 7/5/4 — Aerobic | **Corvia** |

- **Round 1 authoring rationale:** Choose **Aeronis**: three matching attributes plus desired trait.
- **Round 2 authoring rationale:** Choose **Aerivor**: two attributes plus desired trait; avoid the Heat Resistant option.
- **Round 3 authoring rationale:** Choose **Aeriom** because desired-trait coverage plus two useful attributes offsets its Permeability miss.
- **Round 4 authoring rationale:** Choose **Corvia** for full attribute fit once Aerobic is already well represented.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Aerixa | 7 | 4 | 5 | Aerobic |
| Oxera | 8 | 3 | 6 | Phosphorus Removal |
| Pellara | 7 | 3 | 5 | Light Sensitive |
| Thermex | 8 | 4 | 6 | Heat Resistant |
| Grena | 6 | 4 | 5 | Aerobic |
| Marnor | 9 | 3 | 6 | Phosphorus Removal |
| Aeronis | 7 | 4 | 6 | Aerobic |
| Aerivor | 8 | 3 | 4 | Aerobic |
| Aeriom | 6 | 4 | 5 | Aerobic |
| Corvia | 8 | 4 | 5 | Phosphorus Removal |

#### Treatment validation
- Reference trio: **Aerixa + Oxera + Pellara**
- Average Permeability: **7.33**
- Average Mobility: **3.33**
- Average Energy: **5.33**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **57**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
### Site 3 — Fuel Runoff Basin

**Site Information**
- Permeability: **5–6**
- Mobility: **8–9**
- Energy: **2–3**
- Desired trait: **Heat Resistant**
- Undesired trait: **Light Sensitive**
- Next Site Insight: **None — final site**

**Reference Learning filter strategy:** Mobility 8–9 + Heat Resistant

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Hydrion | 5 | 8 | 2 | Heat Resistant | 4/4 | Current |
| Motrava | 6 | 9 | 3 | Aerobic | 3/4 | Current |
| Celiax | 5 | 7 | 2 | Phosphorus Removal | 2/4 | Current |
| Thermion | 4 | 8 | 1 | Heat Resistant | 2/4 | Current |
| Pelagis | 6 | 8 | 1 | Aerobic | 2/4 | Current |
| Luxevia | 4 | 7 | 1 | Light Sensitive | 0/4 | Return |
| Aerion | 4 | 7 | 1 | Aerobic | 0/4 | Return |
| Phoralis | 4 | 8 | 1 | Aerobic | 1/4 | Return |
| Sternia | 4 | 7 | 1 | Phosphorus Removal | 0/4 | Return |
| Lumorae | 6 | 9 | 3 | Light Sensitive | 3/4 | Return |

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Therion | 5 | 9 | 3 | Heat Resistant |
| Celara | 6 | 8 | 2 | Phosphorus Removal |
| Motria | 5 | 8 | 3 | Aerobic |
| Luxara | 6 | 9 | 2 | Light Sensitive |
| Pelagos | 4 | 9 | 3 | Heat Resistant |
| Sterna | 7 | 8 | 2 | Phosphorus Removal |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Theressa — 6/8/3 — Heat Resistant | Aervon — 5/10/2 — Aerobic | Lumora — 4/8/4 — Light Sensitive | **Theressa** |
| 2 | Coraxis — 5/9/4 — Phosphorus Removal | Therella — 7/8/2 — Heat Resistant | Aeriax — 6/7/3 — Aerobic | **Therella** |
| 3 | Mareon — 5/8/2 — Aerobic | Luxeris — 6/9/3 — Light Sensitive | Therava — 4/9/2 — Heat Resistant | **Mareon** |
| 4 | Peloria — 6/8/3 — Phosphorus Removal | Aerion — 5/9/4 — Aerobic | Theruna — 7/7/2 — Heat Resistant | **Peloria** |

- **Round 1 authoring rationale:** Choose **Theressa**: three matching attributes plus desired trait.
- **Round 2 authoring rationale:** Choose **Therella**: desired trait and two useful dimensions, with no Light Sensitive penalty.
- **Round 3 authoring rationale:** Choose **Mareon** for full attribute fit once Heat Resistant is already secured.
- **Round 4 authoring rationale:** Choose **Peloria** to strengthen the numerical pool without introducing the undesired trait.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Therion | 5 | 9 | 3 | Heat Resistant |
| Celara | 6 | 8 | 2 | Phosphorus Removal |
| Motria | 5 | 8 | 3 | Aerobic |
| Luxara | 6 | 9 | 2 | Light Sensitive |
| Pelagos | 4 | 9 | 3 | Heat Resistant |
| Sterna | 7 | 8 | 2 | Phosphorus Removal |
| Theressa | 6 | 8 | 3 | Heat Resistant |
| Therella | 7 | 8 | 2 | Heat Resistant |
| Mareon | 5 | 8 | 2 | Aerobic |
| Peloria | 6 | 8 | 3 | Phosphorus Removal |

#### Treatment validation
- Reference trio: **Therion + Celara + Motria**
- Average Permeability: **5.33**
- Average Mobility: **8.33**
- Average Energy: **2.67**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **60**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
**Tidal Reach design emphasis:** compare close alternatives, avoid overvaluing a desired trait that is already abundant, and use pool balance as a tie-breaker.

# TASK 2 — SEA WOLF: AZURE SHELF



**Client brief — Dr. Paula Reyes**

**Welcome, and thanks for joining this workstream.**

I am coordinating treatment from the nearshore zone through to the deeper Azure Shelf. The options are tighter here and the trade-offs are less forgiving, so I need you to preserve scarce capabilities, accept constraints when they are real, and recommend the strongest feasible treatment rather than chase a perfect-looking answer.

I want you to work site by site. Choose two characteristics to shape the six-microbe treatment pool; separately route ten microbes between the current site, the next site where available, or return; then add one candidate from each of four prospect sets and recommend a final three-microbe treatment. Once you confirm a treatment, that site is closed, so I need you to recognise when the best feasible answer is constrained rather than perfect.

You will have the current site requirements, individual microbe profiles and limited next-site information where it is available. I will keep the Site Information panel visible as your working reference, and your treatment pool will remain visible while you build the final combination.

In a full simulation, you will have **30 minutes** to complete all three sites.

**CTA:** `Review the Brief →`

### Site 1 — Nearshore Film

**Site Information**
- Permeability: **5–7**
- Mobility: **5–7**
- Energy: **4–6**
- Desired trait: **Phosphorus Removal**
- Undesired trait: **Aerobic**
- Next Site Insight: **Mobility 6–8**

**Reference Learning filter strategy:** Permeability 5–7 + Phosphorus Removal

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Surfara | 5 | 5 | 4 | Phosphorus Removal | 4/4 | Current |
| Pelinia | 7 | 7 | 6 | Heat Resistant | 3/4 | Current |
| Marivara | 5 | 4 | 4 | Light Sensitive | 2/4 | Current |
| Phoselle | 4 | 5 | 3 | Phosphorus Removal | 2/4 | Current |
| Coralune | 7 | 5 | 3 | Heat Resistant | 2/4 | Current |
| Aervalis | 4 | 8 | 3 | Aerobic | 0/4 | Next |
| Thermaris | 4 | 8 | 2 | Aerobic | 0/4 | Next |
| Luceria | 4 | 5 | 3 | Heat Resistant | 1/4 | Return |
| Nerella | 4 | 5 | 3 | Light Sensitive | 1/4 | Return |
| Aerivon | 7 | 5 | 6 | Aerobic | 3/4 | Return |

**Transfer validation for the next site**
- Aervalis → Current Site (2/4) when the next site's full information becomes available.
- Thermaris → Next Site when the next site's full information becomes available.

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Phosia | 6 | 6 | 5 | Phosphorus Removal |
| Azuron | 7 | 5 | 6 | Light Sensitive |
| Pelina | 5 | 7 | 4 | Heat Resistant |
| Aerina | 6 | 6 | 5 | Aerobic |
| Maris | 4 | 7 | 5 | Phosphorus Removal |
| Thessa | 8 | 5 | 4 | Light Sensitive |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Coralia — 5/6/6 — Phosphorus Removal | Aervex — 7/7/5 — Aerobic | Therona — 8/4/5 — Heat Resistant | **Coralia** |
| 2 | Lumera — 6/8/4 — Light Sensitive | Phorix — 4/6/5 — Phosphorus Removal | Aerolis — 5/5/7 — Aerobic | **Phorix** |
| 3 | Marex — 7/6/3 — Heat Resistant | Phosara — 5/8/5 — Phosphorus Removal | Lucentia — 6/5/6 — Light Sensitive | **Lucentia** |
| 4 | Nerava — 5/7/6 — Heat Resistant | Aerinae — 6/4/5 — Aerobic | Phosel — 8/6/4 — Phosphorus Removal | **Nerava** |

- **Round 1 authoring rationale:** Choose **Coralia** for full attribute fit plus desired trait; the Aerobic candidate is excluded.
- **Round 2 authoring rationale:** Choose **Phorix** for desired-trait coverage and two useful attributes.
- **Round 3 authoring rationale:** Choose **Lucentia**: clean three-attribute fit without the undesired trait.
- **Round 4 authoring rationale:** Choose **Nerava** to preserve balanced Permeability/Mobility/Energy options rather than chasing another desired-trait copy.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Phosia | 6 | 6 | 5 | Phosphorus Removal |
| Azuron | 7 | 5 | 6 | Light Sensitive |
| Pelina | 5 | 7 | 4 | Heat Resistant |
| Aerina | 6 | 6 | 5 | Aerobic |
| Maris | 4 | 7 | 5 | Phosphorus Removal |
| Thessa | 8 | 5 | 4 | Light Sensitive |
| Coralia | 5 | 6 | 6 | Phosphorus Removal |
| Phorix | 4 | 6 | 5 | Phosphorus Removal |
| Lucentia | 6 | 5 | 6 | Light Sensitive |
| Nerava | 5 | 7 | 6 | Heat Resistant |

#### Treatment validation
- Reference trio: **Phosia + Azuron + Pelina**
- Average Permeability: **6.00**
- Average Mobility: **6.00**
- Average Energy: **5.00**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **63**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
### Site 2 — Mid-Shelf Plume

**Site Information**
- Permeability: **6–8**
- Mobility: **6–8**
- Energy: **3–5**
- Desired trait: **Light Sensitive**
- Undesired trait: **Phosphorus Removal**
- Next Site Insight: **Desired trait: Aerobic**

**Reference Learning filter strategy:** Permeability 6–8 + Light Sensitive

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Plumeris | 6 | 6 | 3 | Light Sensitive | 4/4 | Current |
| Bluevia | 8 | 8 | 5 | Heat Resistant | 3/4 | Current |
| Calyra | 6 | 5 | 3 | Aerobic | 2/4 | Current |
| Lumina-A | 5 | 6 | 2 | Light Sensitive | 2/4 | Current |
| Dexia-A | 8 | 6 | 2 | Heat Resistant | 2/4 | Current |
| Aeridia | 4 | 9 | 5 | Aerobic | 1/4 | Next |
| Aeriom | 2 | 5 | 2 | Aerobic | 0/4 | Next |
| Thermava | 5 | 6 | 2 | Heat Resistant | 1/4 | Return |
| Corinox | 5 | 5 | 2 | Heat Resistant | 0/4 | Return |
| Phosarae | 8 | 8 | 5 | Phosphorus Removal | 3/4 | Return |

**Transfer validation for the next site**
- Aeridia → Current Site (4/4) when the next site's full information becomes available.
- Aeriom → Return when the next site's full information becomes available.

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Lumaria | 7 | 7 | 4 | Light Sensitive |
| Bluex | 8 | 6 | 5 | Aerobic |
| Calyx | 6 | 8 | 3 | Heat Resistant |
| Phosia | 7 | 7 | 4 | Phosphorus Removal |
| Nerina | 5 | 8 | 4 | Light Sensitive |
| Dexia | 9 | 6 | 5 | Aerobic |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Lunara — 6/7/5 — Light Sensitive | Phorena — 8/8/4 — Phosphorus Removal | Theris — 9/5/3 — Heat Resistant | **Lunara** |
| 2 | Aeria — 7/6/5 — Aerobic | Lumae — 5/8/3 — Light Sensitive | Phosel — 6/6/4 — Phosphorus Removal | **Aeria** |
| 3 | Therava — 8/7/6 — Heat Resistant | Lucora — 7/5/4 — Light Sensitive | Aerion — 6/8/5 — Aerobic | **Aerion** |
| 4 | Marevia — 6/7/3 — Aerobic | Phosara — 7/8/5 — Phosphorus Removal | Luminex — 8/6/4 — Light Sensitive | **Luminex** |

- **Round 1 authoring rationale:** Choose **Lunara**: full attribute fit plus desired trait; reject Phosphorus Removal.
- **Round 2 authoring rationale:** Choose **Aeria** for clean attribute fit after Light Sensitive is already represented.
- **Round 3 authoring rationale:** Choose **Aerion**: three useful attributes and no undesired trait.
- **Round 4 authoring rationale:** Choose **Luminex** to add another fully compatible Light Sensitive option.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Lumaria | 7 | 7 | 4 | Light Sensitive |
| Bluex | 8 | 6 | 5 | Aerobic |
| Calyx | 6 | 8 | 3 | Heat Resistant |
| Phosia | 7 | 7 | 4 | Phosphorus Removal |
| Nerina | 5 | 8 | 4 | Light Sensitive |
| Dexia | 9 | 6 | 5 | Aerobic |
| Lunara | 6 | 7 | 5 | Light Sensitive |
| Aeria | 7 | 6 | 5 | Aerobic |
| Aerion | 6 | 8 | 5 | Aerobic |
| Luminex | 8 | 6 | 4 | Light Sensitive |

#### Treatment validation
- Reference trio: **Lumaria + Bluex + Calyx**
- Average Permeability: **7.00**
- Average Mobility: **7.00**
- Average Energy: **4.00**
- Reference trio effectiveness: **100%**
- Maximum feasible effectiveness in this reference final pool: **100%**
- Number of maximum-scoring trios in the reference final pool: **70**
- Multiple maximum-scoring trios are valid; the reference trio is not the only accepted answer.

---
### Site 3 — Deep Shelf

**Site Information**
- Permeability: **4–6**
- Mobility: **7–9**
- Energy: **5–7**
- Desired trait: **Aerobic**
- Undesired trait: **Heat Resistant**
- Next Site Insight: **None — final site**

**Reference Learning filter strategy:** Mobility 7–9 + Aerobic

#### Routing deck — 10 separate microbes
This deck is used only for `Current Site / Next Site / Return` routing. It does **not** become the treatment Prospect Pool.

| Microbe | P | M | E | Trait | Positive matches | Reference route |
|---|---:|---:|---:|---|---:|---|
| Bathyrene | 4 | 7 | 5 | Aerobic | 4/4 | Current |
| Phorixa | 6 | 9 | 7 | Phosphorus Removal | 3/4 | Current |
| Tressara | 4 | 6 | 5 | Light Sensitive | 2/4 | Current |
| Aeriaxa | 3 | 7 | 4 | Aerobic | 2/4 | Current |
| Mavira | 6 | 7 | 4 | Phosphorus Removal | 2/4 | Current |
| Thermissa | 3 | 6 | 4 | Heat Resistant | 0/4 | Return |
| Corivex | 3 | 6 | 4 | Phosphorus Removal | 0/4 | Return |
| Lumara | 3 | 7 | 4 | Phosphorus Removal | 1/4 | Return |
| Nerissa | 3 | 6 | 4 | Light Sensitive | 0/4 | Return |
| Thermorae | 6 | 9 | 7 | Heat Resistant | 3/4 | Return |

#### Treatment-building stream — Reference Initial Prospect Pool 6 (preferred A + Desired Trait profile)
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Aeriax | 2 | 10 | 10 | Aerobic |
| Luma | 4 | 5 | 3 | Light Sensitive |
| Tressa | 5 | 10 | 6 | Phosphorus Removal |
| Mavix | 3 | 10 | 5 | Light Sensitive |
| Corin | 3 | 10 | 5 | Phosphorus Removal |
| Sela | 6 | 8 | 6 | Heat Resistant |

#### Prospect Selection — four sequential 1-of-3 rounds
| Round | Candidate 1 | Candidate 2 | Candidate 3 | Reference choice |
|---:|---|---|---|---|
| 1 | Phera — 3/6/4 — Heat Resistant | Zorin — 3/10/4 — Light Sensitive | Vela — 2/7/8 — Phosphorus Removal | **Zorin** |
| 2 | Neris — 3/9/4 — Light Sensitive | Theron — 5/7/5 — Heat Resistant | Phorin — 3/10/8 — Phosphorus Removal | **Neris** |
| 3 | Marea — 2/8/4 — Phosphorus Removal | Aervia — 1/9/9 — Aerobic | Lunex — 3/10/3 — Light Sensitive | **Marea** |
| 4 | Cressa — 3/8/4 — Phosphorus Removal | Thera — 6/9/7 — Heat Resistant | Lumora — 2/10/5 — Light Sensitive | **Cressa** |

- **Round 1 authoring rationale:** Choose **Zorin** as the least-damaging non-Heat-Resistant option for the constrained pool.
- **Round 2 authoring rationale:** Choose **Neris** to protect Mobility while keeping the pool free of the undesired trait.
- **Round 3 authoring rationale:** Choose **Marea** over the extreme Aerobic card; the required Aerobic trait is already present in the initial pool.
- **Round 4 authoring rationale:** Choose **Cressa** for the best remaining balance; no 100% treatment exists in this fixed deck.

#### Reference final Prospect Pool — 10
| Microbe | P | M | E | Trait |
|---|---:|---:|---:|---|
| Aeriax | 2 | 10 | 10 | Aerobic |
| Luma | 4 | 5 | 3 | Light Sensitive |
| Tressa | 5 | 10 | 6 | Phosphorus Removal |
| Mavix | 3 | 10 | 5 | Light Sensitive |
| Corin | 3 | 10 | 5 | Phosphorus Removal |
| Sela | 6 | 8 | 6 | Heat Resistant |
| Zorin | 3 | 10 | 4 | Light Sensitive |
| Neris | 3 | 9 | 4 | Light Sensitive |
| Marea | 2 | 8 | 4 | Phosphorus Removal |
| Cressa | 3 | 8 | 4 | Phosphorus Removal |

#### Treatment validation
- Reference trio: **Aeriax + Luma + Tressa**
- Average Permeability: **3.67**
- Average Mobility: **8.33**
- Average Energy: **6.33**
- Reference trio effectiveness: **80%**
- Maximum feasible effectiveness in this reference final pool: **80%**
- Number of maximum-scoring trios in the reference final pool: **11**
- This is an intentionally imperfect optimum. Results must normalise decision quality against the **80% maximum feasible effectiveness**.

---
**Azure Shelf design emphasis:** opportunity cost, constrained choice, multiple defensible paths and recognition of an imperfect optimum.

## Operational deck validation snapshot

The V1.2 authoring deck was recomputed after generation. This snapshot is part of the implementation contract; automated tests must reproduce it from scenario data rather than trusting the table.

| Site | Routing deck | Current / Next / Return reference split | Initial pool | Prospect rounds | Reference final pool | Reference trio | Max feasible |
|---|---:|---|---:|---:|---:|---:|---:|
| Cinder Bay — Site 1 | 10 | 5 / 2 / 3 | 6 | 4 × 3 | 10 | 100% | 100% |
| Cinder Bay — Site 2 | 10 | 5 / 2 / 3 | 6 | 4 × 3 | 10 | 100% | 100% |
| Cinder Bay — Site 3 | 10 | 5 / 0 / 5 | 6 | 4 × 3 | 10 | 100% | 100% |
| Tidal Reach — Site 1 | 10 | 5 / 2 / 3 | 6 | 4 × 3 | 10 | 100% | 100% |
| Tidal Reach — Site 2 | 10 | 5 / 1 / 4 | 6 | 4 × 3 | 10 | 100% | 100% |
| Tidal Reach — Site 3 | 10 | 5 / 0 / 5 | 6 | 4 × 3 | 10 | 100% | 100% |
| Azure Shelf — Site 1 | 10 | 5 / 2 / 3 | 6 | 4 × 3 | 10 | 100% | 100% |
| Azure Shelf — Site 2 | 10 | 5 / 2 / 3 | 6 | 4 × 3 | 10 | 100% | 100% |
| Azure Shelf — Site 3 | 10 | 5 / 0 / 5 | 6 | 4 × 3 | 10 | 80% | 80% |

Validation assertions:
- all routing and treatment cards use integer Permeability / Mobility / Energy values from **1–10**;
- all cards use exactly one of the four locked V1 traits;
- every site has a separate 10-card routing deck and 6-card initial treatment pool;
- every site has four prospect rounds of exactly three cards;
- the reference selection path produces a 10-card final pool;
- Cinder Bay and Tidal Reach reference paths have a feasible 100% treatment at all three sites;
- Azure Shelf Sites 1–2 have a feasible 100% treatment;
- Azure Shelf Site 3 has a validated maximum feasible effectiveness of **80%**.

# 9. SEA WOLF PROSPECT-POOL MECHANIC

Each site contains:

1. **10 separate categorisation/routing microbes**
2. **fixed profiling universe of 12 treatment candidates → characteristic-derived Initial Prospect Pool of 6**
3. **4 prospect rounds**
4. each round presents **3 new candidate microbes**
5. exactly **1 of 3** must be selected
6. the selected card is added to the visible pool and the trio refreshes
7. final pool therefore contains **10** candidates
8. user selects final **3**
9. all routing and treatment cards use the locked four-trait vocabulary and 1–10 attribute indices

The routing deck and treatment-building deck are separate data objects even when they appear within the same site narrative.

## Prospect-round design rules

Each 3-card set should contain:
- one obvious weak candidate;
- one superficially strong candidate;
- one candidate whose value becomes clear only when considering the current pool.

At least one round in the later scenarios should require **residual-range reasoning**:

If the first two chosen microbes have total attribute values:

`P = 12, M = 16, E = 7`

and the target average ranges are:

`P 6–8, M 7–9, E 3–5`

then the final three-microbe totals must lie within:

- P: 18–24
- M: 21–27
- E: 9–15

So the third microbe needs:

- P: 6–12
- M: 5–11
- E: 2–8

This is one of the strongest transferable quantitative-thinking exercises in Sea Wolf.

---

# 10. REASONING LESSON LIBRARY

## 10.1 Data selection
Prompt:
**What information is necessary to answer the question?**

Teach:
- objective first;
- variables second;
- facts third.

Do not teach:
“collect every number.”

---

## 10.2 Threshold thinking
Pattern:
several criteria must be satisfied simultaneously.

Lesson:
the overall outcome is controlled by the **binding constraint**.

---

## 10.3 Percentage vs percentage points
Always include examples where:
- 40% → 55% = +15 percentage points
- relative increase = 15/40 = 37.5%

---

## 10.4 Ratio optimisation
Teach:
- compare common denominators before calculating everything;
- if denominators are equal, compare numerators directly.

---

## 10.5 Constraint-first optimisation
Sequence:

`Filter infeasible options → compare feasible options → optimise`

not:

`Choose highest raw metric → discover later that it violates a constraint`

---

## 10.6 Portfolio thinking
Sea Wolf:

An individually strong microbe can make a final treatment worse.

Teach:
- complementarity;
- averages;
- scarce traits;
- opportunity cost.

---

## 10.7 Residual requirement
Given two selected items:
- calculate what the third item must contribute.

This trains algebraic reasoning without requiring formal algebra notation.

---

## 10.8 Imperfect optimum
Constrained scenario:
best attainable outcome may be 80%.

Teach:
- maximise feasible value;
- do not waste time searching for a non-existent perfect solution.

---

# 11. ERROR TAXONOMY

Tag each mistake:

- `READ_OBJECTIVE`
- `WRONG_VARIABLE`
- `IRRELEVANT_DATA`
- `UNIT_CONVERSION`
- `FORMULA_SETUP`
- `ARITHMETIC`
- `PERCENT_VS_PP`
- `MISSED_THRESHOLD`
- `IGNORED_CONSTRAINT`
- `WRONG_DENOMINATOR`
- `LOCAL_OPTIMUM`
- `PORTFOLIO_AVERAGE`
- `UNDESIRED_TRAIT`
- `NO_DESIRED_TRAIT`
- `TIME_MANAGEMENT`
- `JOURNAL_MANAGEMENT`
- `CHART_SELECTION`
- `NO_SENSE_CHECK`

---

# 12. SOURCE-TO-CASE TRACEABILITY

| Case family | Research-informed relationship | Source IDs | What remains synthetic |
|---|---|---|---|
| Salvanova Forest | predator presence can alter prey spatial behaviour and browsing pressure | SCI-GEO-01 | all populations, growth rates, vegetation and tourism numbers |
| Caldera Marsh | wetland nutrient removal depends on loading/system design and can interact with dissolved oxygen | SCI-WET-01, SCI-WET-02 | all flows, concentrations, fish and revenue response values |
| Norvale Highlands | post-fire regeneration and regrowth carbon vary across climate/place | SCI-FIRE-01, SCI-FIRE-02 | all hectare, cost, cover and carbon values |
| Sea Wolf — all studies | microbial hydrocarbon response depends on community function and environmental conditions; phosphorus-removal and light/temperature sensitivities are biologically plausible phenomena | SCI-MIC-01–SCI-MIC-07 | all microbe names, 1–10 indices, site ranges, desired/undesired labels and treatment scores |

The scientific source validates the **relationship being mirrored**, not the exact game number.

# 13. VALIDATION REQUIREMENTS BEFORE CODING

Every case-data JSON must pass automated validation.

## Red Rock
- all displayed answers recompute exactly;
- no conflicting data;
- units explicit;
- distractors do not accidentally become necessary;
- chart answer matches the stated analytical purpose;
- Visual Report cases are independent.

## Sea Wolf
For every site:
- validate the 10-card routing deck and its Current / Next / Return reference outcomes;
- validate transferred-card reassessment against the next site's full requirements;
- assert the profiling universe contains exactly 12 treatment candidates;
- enumerate all **21** two-characteristic combinations and assert each derives exactly 6 unique Initial Prospect Pool microbes;
- assert the preferred A + Desired Trait profile reproduces the six-card reference pool;
- assert characteristic selection produces more than one distinct pool;
- assert four prospect rounds contain exactly 3 candidates each;
- for **each characteristic-derived pool**, enumerate all **3^4 = 81** possible prospect-selection paths;
- for every reachable final 10-card pool, enumerate all 3-microbe treatment combinations;
- calculate average attributes and trait penalties;
- confirm intended maximum score range and reference-path maximum;
- confirm canonical/reference solution score;
- detect unintended perfect solutions where a constrained site is meant to top out below 100%;
- allow multiple optimal trios where the outcome is equivalent.

For Azure Shelf Site 3:
- assert maximum score = 80%.

---

# 14. RESEARCH PRINCIPLE FOR FUTURE CASES

For every new case:
1. identify a real geographical/ecological/microbial relationship;
2. cite primary research supporting that relationship;
3. create a fictional client problem;
4. engineer synthetic values around a clear decision;
5. build meaningful constraints, trade-offs and distractors;
6. validate calculations and feasible optima;
7. label the data internally as synthetic;
8. preserve the Fairhaven engagement narrative without turning the game into a science quiz.

The design target is **scientifically plausible enough to make the environmental scenario coherent, while deliberately engineered around decision quality, constraints, opportunity cost and portfolio reasoning.**

# 22. V1 VISUAL STYLE SYSTEM — IMPLEMENTATION LOCK

## 22.1 Visual reference

The approved visual direction is a desktop-first analytical learning workspace with:

`dark institutional shell + off-white workspace + darker lime accent + large editorial typography + flat white cards + restrained borders + generous spacing`

The visual reference supplied on 15 August 2026 is the master style reference for hierarchy, density, spacing and composition. It is a styling reference only; existing case logic, scoring, state management and assessment behaviour remain authoritative.

## 22.2 Primary accent — darker lime

The earlier bright lime `#C9F45B` is replaced for V1 styling by the darker, more grounded lime:

**Primary accent: `#8FC21F`**

This colour should feel energetic without becoming fluorescent. It is used for major featured panels, selected states, progress, active analytical states and important calls to action.

Supporting lime states:

| Token | Value | Use |
|---|---|---|
| `accent.primary` | `#8FC21F` | main lime / hero / selected state |
| `accent.hover` | `#7EAB1B` | hover / stronger active state |
| `accent.deep` | `#7FA916` | high-contrast small accents where required |
| `accent.soft` | `#E6F1C8` | pale lime background / learning feedback / selected data |

Do not use lime on every component. Most analytical surfaces remain white or off-white.

## 22.3 Base colour system

| Semantic role | Value |
|---|---|
| Application background | `#F3F5EF` |
| Sidebar / deepest green | `#132019` |
| Sidebar active | `#1B2B22` |
| Card / surface | `#FFFFFF` |
| Primary text | `#101713` |
| Secondary text | `#68746C` |
| Muted text | `#8A9390` |
| Sidebar text | `#F4F7F2` |
| Sidebar muted | `#789087` |
| Subtle border | `#DDE2DA` |
| Soft blue | `#E8EFFD` |
| Soft orange | `#FFF0DF` |
| Soft lavender | `#EEE8FF` |
| Success | `#2D7A52` |
| Warning | `#B36A24` |
| Error | `#B94C47` |

## 22.4 Application shell dimensions

Desktop target reference: approximately 1440–1920 px viewport width.

### Sidebar
- width: `288px`
- minimum width: `288px`
- full viewport height
- dark green background `#132019`
- internal horizontal padding: `16–24px`
- logo top offset: approximately `32px`

### Topbar
- height: approximately `92px`
- same off-white background as workspace
- `1px` bottom border
- desktop horizontal padding: approximately `48px`

### Main workspace
- background: `#F3F5EF`
- maximum inner content width: `1440px`
- centred within the available workspace
- desktop horizontal outer gutter: approximately `40–64px`
- top content spacing: `40px`
- bottom content spacing: `64px`

The product should read as a wide application workspace, not a narrow centred website form.

## 22.4A Learning guidance navigation rule

The visual redesign must not add a standalone Strategy/Learning framework page. The former Strategy Lab is removed from the sidebar and Home actions. Learning support is delivered through concise **client/context prompts** embedded in case openings, task directions and feedback.

## 22.5 Sidebar design

### App logo — styled UI component, not image placeholder
The application logo must be implemented as a native UI/branding component using HTML/CSS (or an equivalent vector/component implementation), **not** by placing the attached reference screenshot/image into the interface.

The attached Solve It / READINESS LAB image is a **visual reference only** for proportion, hierarchy and styling.

Required construction:
- logo mark: `48 × 48px`;
- radius: `12px`;
- background: primary lime `#8FC21F`;
- dark `S` centred in the mark;
- title: `Solve It`, white, bold modern sans-serif;
- subtitle: `READINESS LAB`, uppercase, small tracked lettering in `#8FC21F`;
- mark and wording aligned horizontally;
- approximately `14px` gap between mark and wording;
- component must remain crisp at all supported display densities and sizes.

Do not use the screenshot/reference image itself as the rendered logo. Do not reproduce proprietary McKinsey logos or wordmarks.

### Navigation
Main navigation labels:
- `14–15px`
- weight `600–700`

Section labels:
- `10px`
- uppercase
- weight `700–800`
- letter spacing approximately `.18em–.20em`

Active navigation item:
- min-height: `44px`
- background: `#1B2B22`
- radius: `10px`
- horizontal padding: `14px`

Navigation numbers / metadata can use a monospaced font at approximately `10–11px`.

## 22.6 Typography

### Primary UI font
`Inter`, with system sans-serif fallback.

### Editorial contrast
Use `Georgia Italic` or equivalent serif italic selectively for hero emphasis only.

### Monospace
Use `IBM Plex Mono`, `Consolas`, or system monospace for:
- timers;
- case/site IDs;
- compact metadata;
- numbered navigation labels;
- technical labels.

### Type scale

| Role | Size | Weight / treatment |
|---|---:|---|
| Eyebrow / metadata | 10px | 700–800, uppercase, .18em tracking |
| Small text | 12px | regular / medium |
| Supporting text | 14px | regular |
| Body | 16px | regular, 1.5–1.6 line height |
| Large body / lead | 18px max | regular |
| Heading 2 | 18–24px | 600 |
| Section title | 30–32px | 500 |
| Hero / display | 52–66px | 400, -0.03em to -0.045em tracking |

Hero typography should feel editorial and confident rather than heavy or corporate.

## 22.7 Spacing system

Use an 8px-based spacing system.

Approved spacing values:
`4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64px`

Typical usage:
- card-to-card gap: `16px`
- hero-to-following section: `20–24px`
- form field gap: `16–20px`
- major section separation: `40–64px`
- hero internal padding: approximately `56–64px`
- sidebar group separation: `24–32px`

## 22.8 Radius system

| Token | Value | Use |
|---|---:|---|
| Small | 8px | compact controls |
| Medium | 10px | buttons / inputs / active nav |
| Card | 14px | normal cards / panels |
| Major panel | 24px | hero / results feature panel |
| Round | 999px | avatar / score ring / chips |

Avoid excessive pill-shaped components.

## 22.9 Shadows and borders

The design is predominantly flat.

Default card:
- white background;
- `1px solid #DDE2DA`;
- no shadow or maximum `0 1px 2px rgba(15,25,18,.03)`.

Do not use large SaaS-style floating shadows.

## 22.10 Major hero panel

Use on:
- Home / Command Centre;
- major learning overview;
- Results.

Recommended:
- background: `#8FC21F`
- radius: `24px`
- minimum height: approximately `420px` on large desktop screens
- internal padding: approximately `58px 64px`
- layout: wide text column + compact status/score column where appropriate

Hero display heading:
- `52–66px`
- weight `400`
- tight line-height (`.98–1.02`)

Use serif italic only for the secondary editorial phrase.

## 22.11 Buttons

### Primary dark CTA
- height: `48–56px`
- dark green `#132019`
- white text
- radius: `10px`
- `14–15px`, weight `700`

### Lime secondary CTA
- darker lime `#8FC21F`
- dark text
- same height and radius

### Neutral / ghost
- white surface
- subtle border
- dark text

Disabled state must remain legible and keyboard-focusable where appropriate.

## 22.12 Cards and metrics

Normal card:
- `#FFFFFF`
- subtle `#DDE2DA` border
- radius `14px`
- padding `20–24px`

Metric row on desktop:
- three equal columns where appropriate
- `16px` gap
- minimum card height around `92px`

Icon tiles may use soft blue, orange or lavender backgrounds, but whole cards should usually remain white.

## 22.13 Results score ring

Recommended desktop size:
- approximately `210 × 210px`
- `13px` dark green border
- transparent or lime interior according to parent surface
- round

Main score:
- approximately `52–58px`
- weight `700`

Use the ring prominently on the final Results view.

## 22.14 Home / Assessment styling

The existing Home logic is preserved.

Visual restructuring:
- persistent dark sidebar;
- off-white application canvas;
- large darker-lime assessment hero;
- assessment setup in a white secondary panel;
- wide desktop composition;
- concise copy and one dominant action.

Do not use a single narrow centred white card as the full application.

## 22.15 Red Rock workspace styling

Use:
`dark application sidebar | expanded analytical workspace | right utility area`

- remove the separate white Red Rock stage/navigation rail;
- nest Red Rock stage/subpage navigation beneath `Red Rock Study` in the dark sidebar;
- give the central analytical workspace the horizontal space recovered from the removed rail;
- Investigation / Written Report / Graph Selection: Research Journal in the right utility panel;
- Analysis: Research Journal + Calculator together in the right utility area;
- Visual Report: Calculator alone in the right utility panel;
- tables and charts remain white/flat with restrained borders and highly legible numerals;
- apply identically across Salvanova, Caldera and Norvale.

The former `Practice clean` sidebar card is removed globally.

## 22.16 Sea Wolf workspace styling

Use:
`dark application sidebar | microbe interaction workspace | Site Information / Notes`

- microbe cards: white, subtle border, `12–14px` radius;
- selected microbe: darker-lime outline and/or pale-lime surface;
- undesired traits: restrained error treatment;
- desired traits: restrained success treatment;
- drag/drop and button alternatives must show accessible focus states;
- Learning Mode judgement feedback remains restrained and analytical.

## 22.17 Results screen styling

Top:
- large darker-lime feature panel;
- readiness/result information and score ring;
- Task 1 hero support copy: `Red Rock workstream complete. Review feedback below.`

Below:
- client debrief;
- task assessment/benchmark breakdown;
- integrated detailed decision/answer explanation;
- Reasoning Profile;
- Primary Performance Concern;
- Recommended Next Practice.

Do not include a separate `Decision Review` action or explanatory meta-copy beneath the client debrief.

## 22.18 Responsive design

### >=1200px
- persistent dark sidebar;
- Red Rock two-zone work area after the sidebar: expanded main canvas + right utility area;
- wide hero composition.

### 768–1199px
- collapsible dark navigation;
- smaller page gutters;
- right utilities may stack or convert to drawers.

### <768px
- navigation becomes compact drawer/header pattern;
- hero becomes one column;
- metric grids become one column;
- right-side utilities become drawers / stacked sections;
- do not simply scale the desktop layout down.

## 22.19 Accessibility

Maintain:
- visible keyboard focus;
- WCAG-conscious contrast;
- minimum practical target size around `44px`;
- state communication not dependent on colour alone;
- keyboard alternatives for drag/drop;
- readable muted text;
- responsive data tables;
- reduced-motion support.

## 22.20 Implementation constraint

This visual-style update must **not change**:
- Red Rock data or calculation logic;
- Sea Wolf case data or microbe scoring;
- fixed-deck validation;
- persistence;
- timers;
- case selection rules;
- Learning/Simulation behavioural separation;
- Results & Scoring formulas;
- routing or session completion rules.

Visual restructuring is permitted only where necessary to establish the approved AppShell, Sidebar, Topbar and page composition.

## 22.21 Visual acceptance criteria

V1 passes visual review when:
- all main routes feel like one coherent product;
- dark sidebar is persistent on desktop;
- main application surface is off-white;
- primary lime is the darker `#8FC21F` rather than the earlier fluorescent lime;
- typography has a strong editorial hierarchy;
- cards are flat, white and lightly bordered;
- whitespace is generous and systematic;
- Home and Results use large featured lime surfaces;
- Red Rock and Sea Wolf remain distinct tasks inside the same design system;
- no existing assessment functionality is lost.


---

## Visual Identity Amendment — Logo & Accent Update

The following clarification consolidates the already approved lime accent and native branding implementation.

### Primary accent update
- primary lime: `#8FC21F`
- hover / darker accent state: `#7EAB1B`
- soft accent background: `#E6F1C8`
- focus ring family: use the `#8FC21F` accent family while maintaining accessible contrast.

### App logo update
Use the attached **Solve It / READINESS LAB** image only as a visual styling reference. The application logo must be implemented natively in HTML/CSS (or React/CSS), not rendered from the screenshot/image.

Implementation rules:
- implement the **Solve It / READINESS LAB** mark as a native React/HTML/CSS component in the sidebar/app shell;
- do **not** use the supplied screenshot/raster reference as the application logo;
- preserve the approved visual proportions and spacing rather than tracing the reference image literally;
- preferred display width: approximately `165px` on desktop;
- compact/mobile display width: approximately `148px`;
- place the logo at the top of the sidebar with approximately `32px` top offset and `30px` spacing below;
- the logo should sit naturally on the dark sidebar background `#132019`.

### Project visual direction
All other previously approved layout, spacing, type, shell, card, result-screen, and workspace specifications remain unchanged.



## Embedded consulting guidance amendment

The previous persistent `Reasoning Flow` component is retired.

In Learning Mode, reasoning prompts are embedded in the Fairhaven sponsor brief, local task directions and decision feedback. They must not occupy the left task rail or appear as a permanent framework card.

Simulation Mode retains the client/sponsor narrative but removes strategy-revealing prompts.

### Percentage terminology
Do not abbreviate **percentage points** as `pp` in learner-facing copy. `Percentage points` and `%` are not interchangeable.

## Red Rock panel arrangement refinement — V2.2 authoritative

### Embedded guidance placement
- Do not place a Reasoning Flow component in any navigation area.
- Short Dr. Cross/client prompts may appear naturally in the main task canvas in Learning Mode.
- Red Rock stage/subpage navigation belongs beneath `Red Rock Study` in the dark application sidebar.

### Utility placement
- Investigation: Research Journal on the right; Calculator hidden.
- Analysis: Research Journal and Calculator together in the right utility area.
- Written Report: Research Journal on the right; Calculator hidden.
- Graph Selection: Research Journal on the right; Calculator hidden.
- Visual Report: Calculator on the right; Research Journal unavailable.
- No separate white Red Rock stage rail is permitted.
- Remove the calculator helper sentence `Drag Research Journal values into the expression. Drag the result into an answer field.`

### Sidebar simplification
- Remove `Practice clean` globally.
- Remove `Decision Review` from the sidebar.
- Sidebar top-level structure: `Command Centre → Red Rock Study → Sea Wolf Study → Results`.
- Detailed active-task navigation expands beneath the relevant task item while respecting lock points.

### App name casing
- The product name is styled as **Solve It**.
- Do not capitalise **It** as an acronym or render the product name in all caps.
- The secondary label remains `READINESS LAB`.



### Written Report decision-narrative — V2.2.3 locked requirement

The Red Rock Written Report must function as a short decision-ready client report rather than a summary sentence or sequence of disguised questions.

For every Red Rock study:
- use **at least four coherent paragraphs**;
- include **at least eight embedded answer fields**;
- preserve the existing scenario-specific field IDs, benchmark values, tolerances and scoring;
- distribute fields naturally through report prose rather than presenting them as a list;
- combine raw study values, exhibit values and derived Analysis outputs;
- use additional prose to add context, synthesis and recommendation, not additional hidden calculations;
- non-field prose must not contain numeric answers or wording that uniquely gives away the value of an embedded field before the learner supplies it;
- derived timing/capacity outcomes must remain unresolved in prose until represented by their field;
- allow each field to accept either direct keyboard entry or drag/drop from the Research Journal;
- keep the Research Journal visible during Written Report;
- do **not** display the onscreen Calculator during Written Report;
- use compact baseline-aligned inline fields; do not allow field height/width to dominate the paragraph line box;
- use a neutral placeholder rather than repeating the unit inside the input;
- avoid duplicating a unit in surrounding prose when the inline field already renders that unit;
- when completed, the report must read coherently as if it were being handed to Dr. Elena Cross.

Locked structure:
1. **Situation / decision context** — establish why Fairhaven has a decision to make.
2. **Evidence / baseline or feasibility assessment** — use the quantitative fields to explain the core trajectory or constraint.
3. **Programme / intervention implication** — translate the evidence into ecological, operational or economic outcomes.
4. **Recommendation / management implication** — answer Dr. Cross’s question directly and identify the principal condition to monitor or manage.

The structure is common, but the content must remain scenario-specific; do not copy wolf, marsh or wildfire language across studies.

---


# APPENDIX 0 — V2.2 CONSOLIDATED CONSISTENCY RESOLUTIONS

This table is authoritative wherever older amendments or implementation notes conflict.

| Topic | V2.2 authoritative rule |
|---|---|
| Learner-facing reasoning | No `Reasoning Flow` component; use client/context prompts and integrated result explanation. |
| Global sidebar | `Command Centre → Red Rock Study → Sea Wolf Study → Results`; no `Practice clean`; no `Decision Review`. |
| Red Rock navigation | All stage/subpage navigation is nested beneath `Red Rock Study` in the dark sidebar; no separate white stage rail. |
| Red Rock main canvas | Expand into space released by removing the white stage rail. |
| Red Rock Investigation | Main canvas + Research Journal on right; Calculator hidden. |
| Red Rock Analysis | Main canvas + right utility area containing Research Journal and Calculator. |
| Red Rock Written Report | Main canvas + Research Journal on right; Calculator hidden. |
| Red Rock Graph Selection | Main canvas + Research Journal on right; Calculator hidden. |
| Red Rock Visual Report | Main canvas + Calculator on right; Research Journal unavailable. |
| Calculator microcopy | Do not show `Drag Research Journal values into the expression. Drag the result into an answer field.` |
| Results review | Client debrief → assessment/benchmark breakdown → integrated detailed decision/answer explanation on the same Result page. |
| Task 1 result hero copy | `Red Rock workstream complete. Review feedback below.` |
| Task 1 debrief meta-copy | Remove the sentence beginning `This debrief interprets your practice performance...`. |
| Separate review route | None; detailed review is integrated into Task 1/Task 2/final Results. |
| Branding | Native React/HTML/CSS **Solve It / READINESS LAB** component; reference raster is styling reference only. |
| Product naming | Always **Solve It**; do not capitalise `It` as an acronym. |
| Red Rock six-case terminology | **Visual Report Cases 1–6**. |
| Sea Wolf trait vocabulary | Exactly four traits: Heat Resistant, Aerobic, Phosphorus Removal, Light Sensitive. |
| Sea Wolf routing vs treatment | Separate decks and functions; routing never creates the Initial Prospect Pool. |
| Scientific data boundary | Numeric game values are synthetic; research supports relationships, traits, sensitivities and trade-offs. |

---


---

# V1.2 CHARACTERISTIC-PROFILED INITIAL POOL — OPERATIONAL ADDENDUM

This addendum is part of the V1.2 source of truth and supersedes any earlier interpretation that each site owns only one static six-microbe Initial Prospect Pool.

For every site:
- the six cards already listed in the site section are the **reference six** returned by the preferred `A + Desired Trait` profile;
- the six cards below are additional fixed profiling candidates;
- together they create a **12-card profiling candidate universe**;
- the learner’s selected two characteristics deterministically choose 6 from those 12;
- these 12 cards remain completely separate from the 10-card routing deck and the four prospect-round candidate trios.

## Cinder Bay

### Refinery Shore — cinder-1
Preferred reference profile: **Mobility 7–9 + Heat Resistant**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Novarella | 7 | 6 | 4 | Aerobic |
| Pelonix | 5 | 5 | 4 | Aerobic |
| Ceryphora | 7 | 6 | 4 | Phosphorus Removal |
| Valoris | 5 | 5 | 4 | Phosphorus Removal |
| Oceanella | 7 | 6 | 4 | Light Sensitive |
| Rivexis | 5 | 5 | 4 | Light Sensitive |


### Inner Harbour — cinder-2
Preferred reference profile: **Permeability 2–4 + Aerobic**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Morvella | 5 | 4 | 3 | Heat Resistant |
| Deltaris | 6 | 2 | 3 | Heat Resistant |
| Ceronia | 5 | 4 | 3 | Phosphorus Removal |
| Valluma | 6 | 2 | 3 | Phosphorus Removal |
| Ocenrix | 5 | 4 | 3 | Light Sensitive |
| Rivena | 6 | 2 | 3 | Light Sensitive |


### Outer Breakwater — cinder-3
Preferred reference profile: **Mobility 8–10 + Phosphorus Removal**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Norelia | 4 | 7 | 6 | Heat Resistant |
| Peladix | 2 | 6 | 6 | Heat Resistant |
| Cerynia | 4 | 7 | 6 | Aerobic |
| Valeron | 2 | 6 | 6 | Aerobic |
| Oceris | 4 | 7 | 6 | Light Sensitive |
| Rivella | 2 | 6 | 6 | Light Sensitive |

## Tidal Reach

### Storm Estuary — tidal-1
Preferred reference profile: **Mobility 7–8 + Light Sensitive**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Tidera | 4 | 6 | 4 | Heat Resistant |
| Brinova | 3 | 5 | 4 | Heat Resistant |
| Cerylis | 4 | 6 | 4 | Aerobic |
| Valmera | 3 | 5 | 4 | Aerobic |
| Oselia | 4 | 6 | 4 | Phosphorus Removal |
| Rivoria | 3 | 5 | 4 | Phosphorus Removal |


### Agricultural Channel — tidal-2
Preferred reference profile: **Permeability 7–8 + Aerobic**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Maronix | 6 | 4 | 6 | Heat Resistant |
| Pelarix | 5 | 2 | 6 | Heat Resistant |
| Ceryon | 6 | 4 | 6 | Phosphorus Removal |
| Valtessa | 5 | 2 | 6 | Phosphorus Removal |
| Ocevia | 6 | 4 | 6 | Light Sensitive |
| Rivenor | 5 | 2 | 6 | Light Sensitive |


### Fuel Runoff Basin — tidal-3
Preferred reference profile: **Mobility 8–9 + Heat Resistant**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Nerisca | 6 | 7 | 2 | Aerobic |
| Pelatrix | 4 | 6 | 2 | Aerobic |
| Ceryvia | 6 | 7 | 2 | Phosphorus Removal |
| Valphora | 4 | 6 | 2 | Phosphorus Removal |
| Oceanis | 6 | 7 | 2 | Light Sensitive |
| Rivessa | 4 | 6 | 2 | Light Sensitive |

## Azure Shelf

### Nearshore Film — azure-1
Preferred reference profile: **Permeability 5–7 + Phosphorus Removal**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Azellia | 4 | 6 | 5 | Heat Resistant |
| Pelorix | 3 | 4 | 5 | Heat Resistant |
| Cerynex | 4 | 6 | 5 | Aerobic |
| Valuna | 3 | 4 | 5 | Aerobic |
| Ocerella | 4 | 6 | 5 | Light Sensitive |
| Rivona | 3 | 4 | 5 | Light Sensitive |


### Mid-Shelf Plume — azure-2
Preferred reference profile: **Permeability 6–8 + Light Sensitive**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Bluevia | 5 | 7 | 4 | Heat Resistant |
| Pelaris | 4 | 5 | 4 | Heat Resistant |
| Ceryssa | 5 | 7 | 4 | Aerobic |
| Valexia | 4 | 5 | 4 | Aerobic |
| Oceanor | 5 | 7 | 4 | Phosphorus Removal |
| Rivaxa | 4 | 5 | 4 | Phosphorus Removal |


### Deep Shelf — azure-3
Preferred reference profile: **Mobility 7–9 + Aerobic**

| Additional profiling candidate | P | M | E | Trait |
|---|---:|---:|---:|---|
| Neralis | 5 | 6 | 6 | Heat Resistant |
| Pelanox | 3 | 5 | 6 | Heat Resistant |
| Ceryra | 5 | 6 | 6 | Phosphorus Removal |
| Valtis | 3 | 5 | 6 | Phosphorus Removal |
| Ocephora | 5 | 6 | 6 | Light Sensitive |
| Rivaryn | 3 | 5 | 6 | Light Sensitive |


# APPENDIX A — PRIMARY SCIENTIFIC SOURCES USED FOR THE RESEARCH-INFORMED DATA DECK

These sources inform **relationships, traits and trade-offs only**. No game value should be described as a measurement copied from these papers.

## Geography / terrestrial ecology

**SCI-GEO-01 — Fortin et al. (2005).**  
Fortin, D., Beyer, H.L., Boyce, M.S., Smith, D.W., Duchesne, T. & Mao, J.S. *Wolves influence elk movements: behavior shapes a trophic cascade in Yellowstone National Park.* Ecology, 86, 1320–1330. DOI: https://doi.org/10.1890/04-0953  
**Design use:** predator presence → prey movement/habitat selection → potential change in browsing pressure. Used only as a relationship anchor for Salvanova.

## Wetland / water-quality ecology

**SCI-WET-01 — White & Cousins (2013).**  
White, S.A. & Cousins, M.M. *Floating treatment wetland aided remediation of nitrogen and phosphorus from simulated stormwater runoff.* Ecological Engineering, 61, 207–215. DOI: https://doi.org/10.1016/j.ecoleng.2013.09.020  
**Design use:** nutrient removal, loading dependence, species/system effects and dissolved-oxygen trade-offs.

**SCI-WET-02 — Spangler et al. (2019).**  
Spangler, J.T., Sample, D.J., Fox, L.J., Owen, J.S. Jr. & White, S.A. *Floating treatment wetland aided nutrient removal from agricultural runoff using two wetland species.* Ecological Engineering, 127, 468–479. DOI: https://doi.org/10.1016/j.ecoleng.2018.12.017  
**Design use:** nutrient-removal performance varies by plant/system configuration and loading context.

## Wildfire / forest-regrowth geography

**SCI-FIRE-01 — Stevens-Rumann et al. (2018).**  
Stevens-Rumann, C.S., Kemp, K.B., Higuera, P.E., Harvey, B.J., Rother, M.T., Donato, D.C., Morgan, P. & Veblen, T.T. *Evidence for declining forest resilience to wildfires under climate change.* Ecology Letters, 21, 243–252. DOI: https://doi.org/10.1111/ele.12889  
**Design use:** post-fire regeneration can fail or vary strongly with climate/moisture context.

**SCI-FIRE-02 — Cook-Patton et al. (2020).**  
Cook-Patton, S.C., Leavitt, S.M., Gibbs, D. et al. *Mapping carbon accumulation potential from global natural forest regrowth.* Nature, 585, 545–550. DOI: https://doi.org/10.1038/s41586-020-2686-x  
**Design use:** regrowth carbon accumulation is spatially heterogeneous; supports location-sensitive trade-offs rather than a universal carbon rate.

## Environmental microbiology / marine bioremediation

**SCI-MIC-01 — Hazen et al. (2010).**  
Hazen, T.C., Dubinsky, E.A., DeSantis, T.Z. et al. *Deep-sea oil plume enriches indigenous oil-degrading bacteria.* Science, 330, 204–208. DOI: https://doi.org/10.1126/science.1195979  
**Design use:** contaminated marine environments can rapidly enrich indigenous hydrocarbon-degrading microbial populations.

**SCI-MIC-02 — Mason et al. (2012).**  
Mason, O.U., Hazen, T.C., Borglin, S. et al. *Metagenome, metatranscriptome and single-cell sequencing reveal microbial response to Deepwater Horizon oil spill.* The ISME Journal, 6, 1715–1727. DOI: https://doi.org/10.1038/ismej.2012.59  
**Design use:** motility, chemotaxis, nutrient acquisition and hydrocarbon-degradation functions can be enriched together; supports the idea of complementary microbial characteristics.

**SCI-MIC-03 — Redmond & Valentine (2012).**  
Redmond, M.C. & Valentine, D.L. *Natural gas and temperature structured a microbial community response to the Deepwater Horizon oil spill.* Proceedings of the National Academy of Sciences, 109, 20292–20297. DOI: https://doi.org/10.1073/pnas.1108756108  
**Design use:** microbial response is context-dependent and temperature can shift community performance.

**SCI-MIC-04 — Atlas & Bartha (1972).**  
Atlas, R.M. & Bartha, R. *Degradation and mineralization of petroleum in sea water: limitation by nitrogen and phosphorous.* Biotechnology and Bioengineering, 14, 309–318. DOI: https://doi.org/10.1002/bit.260140304  
**Design use:** marine hydrocarbon biodegradation can be constrained by nutrient availability; supports binding-constraint logic.

**SCI-MIC-05 — Albertsen et al. (2012).**  
Albertsen, M., Hansen, L.B.S., Saunders, A.M., Nielsen, P.H. & Nielsen, K.L. *A metagenome of a full-scale microbial community carrying out enhanced biological phosphorus removal.* The ISME Journal, 6, 1094–1106. DOI: https://doi.org/10.1038/ismej.2011.176  
**Design use:** phosphorus-removal functions and community-level complementarity are biologically plausible.

**SCI-MIC-06 — Alonso-Sáez et al. (2006).**  
Alonso-Sáez, L., Gasol, J.M., Lefort, T., Hofer, J. & Sommaruga, R. *Effect of natural sunlight on bacterial activity and differential sensitivity of natural bacterioplankton groups in northwestern Mediterranean coastal waters.* Applied and Environmental Microbiology, 72, 5806–5813. DOI: https://doi.org/10.1128/AEM.00597-06  
**Design use:** different marine bacterial groups can respond differently to natural sunlight/UV; basis for the simplified `Light Sensitive` trait.

**SCI-MIC-07 — Meintanis et al. (2006).**  
Meintanis, C., Chalkou, K.I., Kormas, K.A. & Karagouni, A.D. *Biodegradation of crude oil by thermophilic bacteria isolated from a volcano island.* Biodegradation, 17(2), 105–111. DOI: https://doi.org/10.1007/s10532-005-6495-6  
**Design use:** heat-tolerant/thermophilic microorganisms can degrade hydrocarbons; basis for the simplified `Heat Resistant` trait.

---

# APPENDIX B — VISUAL / PRODUCT LOCK

This V1.2 update changes **narrative, mechanics authority and research-data governance only**.

The previously approved visual system remains unchanged:
- primary UI font: **Inter** with system sans-serif fallback;
- selective hero emphasis: **Georgia Italic** or equivalent serif italic;
- dark institutional sidebar;
- off-white workspace;
- primary lime **#8FC21F**;
- flat white cards with restrained borders;
- generous spacing and editorial hierarchy;
- Calculator/Research Journal placement already locked for Red Rock;
- native **Solve It / READINESS LAB** branding treatment.

Do not introduce a new visual framework, new font family or new styling system as part of this narrative/data update.

---

## V1.2.3 Home mode-card update

Home-page setup panel refinements:

1. Remove the small `ASSESSMENT SETUP` eyebrow.
2. Keep the primary setup heading as `Choose how you work`.
3. Replace the old horizontal text-button mode selector with two consultant-style cards:
   - **Learning Mode** — *Work with client guidance and decision feedback.*
   - **Simulation Mode** — *Work independently under test conditions.*
4. Visual treatment should use simple professional icons consistent with the existing design system.
5. Reuse an existing icon library only if it is already present; otherwise avoid adding a new dependency. V1.2.3 therefore uses lightweight inline SVG icons.
6. Remove the home-page disclaimer block beneath the setup panel.


---

## V1.2.5 RED ROCK CONTEXTUAL EVIDENCE INTERACTION LOCK

This amendment supersedes the earlier stacked evidence-card treatment on Red Rock Investigation pages while preserving the sealed Red Rock mechanics.

### Study Information
- Keep Study Information as readable narrative prose rather than converting it to a form or card grid.
- Remove the duplicate evidence-card grid beneath the prose.
- Make meaningful numeric/measurable evidence phrases directly draggable and click-addable from their sentence position.
- Relevant and distractor evidence use the same neutral interaction treatment; the interface must not reveal relevance.
- Each collected item must retain a concise evidence label, value/unit and source context in the Research Journal.
- Clicking an already collected inline phrase keeps/upserts the same Journal item rather than creating duplicates.
- Dragging a Journal item back to its Investigation source remains supported; the Return control remains an accessible alternative.

### Exhibits 1 and 2
- On Investigation pages, render exhibit source data as compact analytical tables whenever the exhibit has rows/columns or labels/series.
- For labels/series exhibits, use the label/period as the first column and each series as a subsequent column.
- Each numeric or numeric-bearing data cell is individually draggable and click-addable to the Research Journal.
- The Journal entry must preserve row/column meaning (for example `Exhibit 1: With Wolves — Year 4`) rather than storing a naked number.
- Known high-value evidence cells remain bound to their authored Fact IDs so evidence-selection scoring continues to recognise them; other cells are neutral medium-relevance evidence.
- Chart rendering remains available elsewhere in the product (Graph Selection and Visual Report) and is not removed from those stages.

### Cross-case application
Apply this evidence-reading model consistently to Salvanova Forest, Caldera Marsh and Norvale Highlands without changing their calculations, answer keys, stage locks, timer behaviour, report structure or visual design system.

---

# V2.1 INTEGRATED ENGAGEMENT HOME LOCK

This amendment supersedes earlier Home / Command Centre composition instructions while preserving the V1.2.5 Red Rock contextual-evidence interaction and all locked Task 1 / Task 2 mechanics.

## Home composition
- Keep the persistent dark institutional sidebar unchanged.
- The application area to its right uses one continuous primary lime engagement container.
- `Your Engagement` and the short Fairhaven Environmental Trust introduction appear once at the top and span the full width of the lime container.
- Beneath that shared heading area, place two equal rectangular panels side by side on desktop.
- Left panel: Workstream 01 and Workstream 02 are stacked vertically in one shared rectangle with a thin divider between them.
- Right panel: Learning Mode / Simulation Mode cards, Red Rock / Sea Wolf study selectors, Learning timer where applicable, and Begin engagement controls.
- Do not repeat the engagement heading or Fairhaven introduction inside either lower panel.

## Mode icons
- Learning Mode uses the supplied multiple-person/team icon to signal guided work with client input.
- Simulation Mode uses the supplied single-person icon to signal independent work under assessment conditions.
- Recolour/normalise the supplied icon assets to the existing application palette: primary lime `#8FC21F` and dark institutional green `#132019`; preserve simple professional geometry and transparent surroundings.
- Do not introduce a new icon dependency for these two mode cards.

## Mode copy
- **Learning Mode:** `Work with client guidance and decision feedback.`
- **Simulation Mode:** `Work independently under test conditions.`

## Red Rock Analysis client prompt
- In Learning Mode, Dr. Elena Cross's Analysis-page prompt reads: **`These are some important questions I need you to answer.`**
- Keep the prompt inside the existing compact first-person client-voice component; do not add a separate reasoning-framework panel.

## Preservation rule
V2.1 changes Home composition, mode-card icon assets, and the Analysis client sentence only. It does not change Red Rock or Sea Wolf mechanics, scoring, research data, timers, persistence, contextual evidence dragging, table exhibits, fonts, colours, or the established Fairhaven sponsor narrative.


---

# V2.1.4 — Red Rock Client Prompt, Report & Review Refinement

This section supersedes earlier wording where it conflicts.

## Written Report client prompt
In Learning Mode, Dr. Elena Cross frames the Written Report as:

> Walk me through the likely outlook without intervention, how wolf reintroduction changes that outlook, and what the evidence suggests we should do.

## Written Report typography
- Reduce the main written-report narrative by roughly 1–2 visual points for better density and readability.
- Keep embedded answer fields proportionate to the reduced body text.

## Graph Selection numeric entry
- Graph data fields must accept normal multi-digit and decimal values; percentage fields are not single-digit inputs.
- Values such as `80`, `100`, `65`, `22.5`, and longer numeric entries must remain fully editable and visible.
- Chart type selection must not change numeric-entry capacity.

## Salvanova Visual Report — Dr. Elena Cross prompts
1. **Carrying capacity:** “I’m concerned the current wolf population may not be sustainable as hare numbers decline. Based on the Year 4 outlook, tell me how many wolves the available hare population could realistically support.”
2. **Fox sustainability:** “As fox numbers increase, I want to make sure the hare population can continue to support them without putting the ecosystem under pressure. Based on these projections, for how much of the five-year period is there enough prey to sustainably support the fox population?”
3. **Tree investment:** “We cannot compromise on the 80% survival threshold, but I also want the investment to work as hard as possible. Which species gives us the best carbon value for the money while still meeting that requirement?”
4. **Forest coverage:** “The government wants to understand where its forest-cover outcomes are moving in the right direction. Looking across the three regions, which one shows the strongest improvement over the five-year period?”
5. **Water stability:** “I’m less concerned with the highest water availability than with how dependable it is from year to year. Based on the range shown here, which region gives us the most stable water supply?”
6. **Fixed-budget allocation:** “We have a fixed $12 million budget, so the question is where that funding will create the greatest biodiversity impact. Which project gives us the highest total number of new plant species within that budget?”

These sponsor prompts supplement the concise response field/question beneath the exhibit; they do not change the answer key or case mechanics.

## Task 1 client debrief bands
Dr. Cross’s spoken debrief must remain qualitative and must not quote component percentages. Numerical scoring remains in the assessment breakdown below.

- **0–50:** recommendation is not ready to move forward; revisit assumptions, strengthen the comparison, and restate the recommendation clearly.
- **51–84:** core case is directionally sound but corrections are required before the decision meeting; tighten weaker analysis and align written/visual evidence.
- **85–100:** recommendation is ready for the decision meeting; evidence and outputs provide a defensible basis for action, subject to explaining assumptions and trade-offs.

## V2.1.3 home-state carry-forward
- Learning Mode uses the multiple-person/team icon.
- Simulation Mode uses the single-person icon.
- Workstream cards identify Dr. Elena Cross and Dr. Paula Reyes as contact persons.
- The supporting paragraph beneath “Choose how you work” remains removed.

## V2.1.2 Research Journal carry-forward
- Research Journal evidence labels remain compact and non-repetitive.
- Exhibit prefixes are not repeated inside an exhibit-sourced journal card.


---

# V2.1.5 — Red Rock Sponsor-Voice Consistency Lock

This amendment extends the V2.1.4 Salvanova client-language treatment consistently to Caldera Marsh and Norvale Highlands without changing any Red Rock mechanics, calculations, answer keys, scoring, report-field density or visual design.

## Written Report — case-specific Dr. Elena Cross requests
- **Salvanova Forest:** “Walk me through the likely outlook without intervention, how wolf reintroduction changes that outlook, and what the evidence suggests we should do.”
- **Caldera Marsh:** “Walk me through the water-quality outlook, whether the restoration programme changes it enough to meet the thresholds, and what the ecological and visitor implications mean for the decision we should take.”
- **Norvale Highlands:** “Walk me through the recovery outlook without the programme, what integrated restoration changes, whether we can deliver it within budget and planting capacity, and what you recommend we take forward.”

The Written Report client prompt is therefore scenario data, not a Salvanova-specific hard-coded sentence.

## Caldera Marsh Visual Report — Dr. Elena Cross prompts
1. **Storm runoff load:** “A major storm can change the loading picture quickly. Using the storm-day conditions, tell me the nitrogen load the marsh would have to absorb.”
2. **Treatment filter:** “I need an option that clears both nutrient-removal thresholds without paying more than necessary. Which pilot gives us the lowest-cost feasible choice?”
3. **Cost effectiveness:** “I want the intervention budget to work as hard as possible. Looking at annual nitrogen removal against cost, which option gives us the best value for each kilogram removed?”
4. **Regional improvement:** “The programme is improving dissolved oxygen unevenly across the marsh. Looking across the three basins, where are we seeing the strongest improvement?”
5. **Phosphorus stability:** “I’m less interested in the single best phosphorus reading than in how dependable the performance is month to month. Which basin gives us the most stable phosphorus level?”
6. **Budget allocation:** “We have a fixed $6 million budget, so I want to know which treatment approach lets that funding remove the greatest total amount of nitrogen. Which option should we back?”

## Norvale Highlands Visual Report — Dr. Elena Cross prompts
1. **Seedling survival:** “Planting only creates recovery if enough seedlings establish successfully. If we put 100,000 oak seedlings into the programme, how many should we realistically expect to survive?”
2. **Workforce capacity:** “Before I support the delivery plan, I need to know what the workforce can actually deliver. Given the crews, their weekly capacity and the working period, how many hectares can they restore?”
3. **Carbon per dollar:** “We cannot compromise on the 80% survival threshold, but I also want the planting investment to deliver the strongest carbon value for the money. Which species is the best feasible option?”
4. **Watershed recovery:** “The watershed response is not the same everywhere. Looking across the three zones, where does restoration produce the strongest improvement in erosion risk?”
5. **Fire-risk stability:** “For long-term recovery, I’m more interested in dependable conditions than an occasional low-risk year. Based on the range shown, which zone has the most stable fire-risk profile?”
6. **Fixed-budget portfolio:** “We have a fixed $18 million budget, so I want the strategy that creates the greatest total carbon outcome with the money available. Which option should we back?”

## Consistency rules
- Dr. Cross speaks as a senior client sponsor: first person, concise, decision-oriented and non-technical where possible.
- The sponsor prompt frames why the answer matters; the concise technical question beneath it remains the response mechanism.
- Do not copy Salvanova ecology wording into Caldera or Norvale; preserve the same tone while adapting the request to each environmental decision.
- The V2.1.4 qualitative debrief bands remain common across all three Red Rock studies: 0–50 not ready, 51–84 corrections needed, 85–100 ready for the decision meeting.


---

# V2.1.6 — Red Rock Graph Input & Norvale Alignment Lock

## Graph Selection UI
- The Graph Selection card layout is globally compacted for all three Red Rock studies.
- Chart-choice cards use smaller, contained icons and tighter spacing.
- Chart-data fields use a responsive auto-fit grid so four-field and six-field studies use the centre panel efficiently.
- Chart previews are height-limited to avoid unnecessary vertical expansion.

## Numeric input behaviour
- Red Rock analysis, written-report, graph-data and visual-case numeric fields must accept multi-digit and decimal values without losing keyboard focus after the first character.
- The previous nested React input-component pattern is retired because re-creation on each parent render could remount the field after each keystroke.
- Input elements are rendered through stable render helpers and support up to 24 characters, drag/drop values and direct entry.

## Norvale Highlands — Dr. Cross Written Report request
> Walk me through the scale and cost of the proposed restoration programme, whether our planting capacity can deliver it, and what the Year 5 forest-cover and carbon outcomes tell us about whether we should proceed.

This request must mirror the written-report evidence: affected/restored area, programme cost and headroom, delivery capacity, mature carbon benefit, and Year-5 natural vs integrated forest cover.

## Graph units
- Salvanova graph fields: %.
- Caldera graph fields: mg/L.
- Norvale graph fields: %.

No Red Rock scoring, answer keys, task order or research-journal mechanics are changed by this update.


# V2.1.7 — Red Rock Sponsor Voice & Visual Calculator Alignment

- Caldera and Norvale Visual Report cases must each display a scenario-specific first-person Dr. Elena Cross request; no generic fallback sponsor wording is permitted.
- Caldera Written Report request: “Walk me through how water quality changes over the five-year programme, when we first meet the full set of thresholds, and what that means for fish recovery and visitor value so I can decide whether the programme is worth backing.”
- Visual Report utility layout for all Red Rock studies: **dark sidebar = stage/case navigation, centre = active case, right = Calculator**. The Research Journal is not shown in Visual Report.
- Analysis utility layout remains **Research Journal + Calculator together in the right utility area**.
- No changes to underlying Red Rock calculations, answer keys, scoring or datasets.

---

# V2.1.8 — Red Rock Investigation Exhibit Visual Restoration

## Locked update
Every Red Rock Investigation exhibit now presents **both a structured table and a visual companion** while preserving the existing draggable/click-add evidence interaction.

### Coverage
- **Salvanova Exhibit 1:** draggable table + mountain-hare line chart.
- **Salvanova Exhibit 2:** one integrated draggable scenario table + a vegetation comparison visual and separate tourism trend; the no-wolf Year-5 vegetation outcome is part of the main exhibit rather than a supplemental reference table.
- **Caldera Exhibit 1:** draggable table + five-year water-quality line chart.
- **Caldera Exhibit 2:** draggable threshold table + compact threshold-timing chart showing the first year each indicator is met.
- **Norvale Exhibit 1:** draggable table + forest-cover recovery line chart.
- **Norvale Exhibit 2:** draggable programme-constraints table + compact visual constraint profile that retains each source unit rather than comparing unlike units on one numerical axis.

### Interaction rule
- The table remains the source for exact values and Research Journal drag/click interactions.
- The chart is a visual interpretation aid and does not replace the table.
- Collected-state styling continues to appear on the source table cell.
- No Red Rock data, answers, scoring, or stage mechanics are changed.

---

# V2.1.9 — Red Rock Investigation Exhibit Visual Audit

## Source-of-truth correction
Each Red Rock Investigation exhibit must render **exactly one visual chart/analytical visual plus one draggable evidence table**. Duplicate visual render paths are prohibited.

### Visual mapping
| Study | Exhibit | Visual treatment | Reason |
|---|---|---|---|
| Salvanova Forest | Exhibit 1 — Projected mountain hare population | Two-series line chart | Both wolf/no-wolf population trajectories share the same unit and ordered Year 0–5 axis. |
| Salvanova Forest | Exhibit 2 — Vegetation recovery and tourism | Vegetation comparison visual + separate tourism trend | The vegetation visual shows the full with-wolf trajectory and the supplied no-wolf Year-5 outcome together without inventing intermediate no-wolf values; tourism remains on its own $000 scale. |
| Caldera Marsh | Exhibit 1 — Five-year water-quality projection | Three mini trend charts in one visual panel | Nitrogen, phosphorus and dissolved oxygen share mg/L but differ enough in magnitude that separate readable trend views are preferable. |
| Caldera Marsh | Exhibit 2 — Programme thresholds | Horizontal threshold-timing bars | The table's decision variable is the first year each threshold is met (Years 3–5). |
| Norvale Highlands | Exhibit 1 — Forest-cover scenarios | Two-series line chart | Natural and integrated forest-cover trajectories share percentage units over Year 0–5. |
| Norvale Highlands | Exhibit 2 — Programme delivery constraints | Delivery-profile visual with separate planting, budget and carbon views | The table mixes hectares, ha/year, $/ha, $m and tCO2e/ha/year; unlike units must not be forced onto a common axis. |

## Duplication fix
The V2.1.8 implementation accidentally rendered both a generic `investigationChartFor(...)` panel and a second `InvestigationChartCompanion`, producing two visuals on the same exhibit page. V2.1.9 removes both legacy render paths and replaces them with a single `InvestigationVisual` render per exhibit.

## Evidence behaviour
The draggable/click-addable table remains the exact-value source for the Research Journal. Charts are visual aids only and do not alter any Red Rock data, calculations, answers or scoring.

---

# V2.2.1 — Global Chart Data-Point Visibility Implementation Lock

This lock makes exact chart values inspectable across the application without changing the underlying datasets or scoring.

- Shared line-chart points and bar-chart marks expose exact contextual values on hover, keyboard focus and tap/click.
- Red Rock Investigation mini-trend charts use the same interaction pattern.
- Graph Selection generated previews, Visual Report charts and Results review charts inherit the shared behaviour.
- Tooltips retain series/category context and units where available; large counts use thousands separators.
- Touch selection may pin a tooltip; keyboard-focused marks expose equivalent accessible labels.
- Caldera threshold timing and Norvale delivery-profile visuals retain persistently printed exact values and add focusable quantitative mark labels where useful.
- Decorative chart-type choice icons are excluded because they do not encode learner data.
- Research Journal evidence collection continues to occur from Study Information/table evidence surfaces, not from chart tooltip interaction.

# V2.2.3 — Red Rock Decision-Ready Written Report Consolidation

This section supersedes any earlier Red Rock Written Report rule that describes a two-paragraph report as the target state. It does **not** supersede the existing Dr. Cross prompts, report fields, answer keys, Research Journal mechanics, lock points or scoring.

## Global report logic
All three Red Rock Written Reports follow the same consulting-adjacent decision grammar without becoming templated copies:

**Situation → Evidence / baseline or feasibility → Programme implication → Recommendation**

The narrative should answer the sponsor’s decision question, not merely repeat the calculations. The existing numeric fields remain the only scored data-entry areas.

## Salvanova Forest
The report establishes the ecosystem imbalance, quantifies the no-intervention trajectory using the existing nine fields, compares the wolf-reintroduction trajectory, and concludes with a recommendation to support reintroduction subject to monitoring of the ecological and visitor-value trajectory.

## Caldera Marsh
The report frames the water-quality decision, uses the existing ten fields to explain nitrogen, phosphorus and dissolved-oxygen movement, identifies when the full threshold set is first achieved, translates the outcome into fish recovery and visitor value, and concludes on whether Fairhaven should back the programme.

## Norvale Highlands
The report frames the restoration programme as both an environmental and delivery decision, uses the existing nine fields to test scale, cost, budget headroom and planting capacity, explains the Year-5 forest-cover and carbon outcomes, and concludes with a proceed recommendation that explicitly treats delivery capacity as a constraint to manage.

## Non-change guardrail
V2.2.3 changes surrounding report prose only. It does not change:
- Red Rock Investigation data;
- Analysis questions or benchmarks;
- Written Report field IDs, answers, tolerances or units;
- Graph Selection logic;
- Visual Report cases;
- Research Journal behaviour;
- Red Rock scoring weights.

# V2.2.5 — Red Rock Written Report Legibility and Answer-Integrity Lock

This section supersedes any earlier Written Report styling or narrative rule that permits oversized inline inputs, duplicate unit placeholders, or surrounding prose that reveals a value the learner is expected to enter. It does not change any Red Rock field IDs, benchmark values, tolerances, units or scoring.

## Compact inline data-entry controls
- Written Report inputs use a compact desktop width of roughly **110–120 px** and a height of roughly **30–32 px**.
- Inputs align to the text baseline with minimal horizontal margin so sentences retain a report-like rhythm.
- The field placeholder is **`—`**, not the unit. The unit appears once beside the field.
- Field/unit pairs should remain visually grouped and must not create the oversized gaps or line-height collisions shown in earlier builds.
- Graph Selection may continue to expand the same input component to the width of its grid cell; the compact rule is specifically for narrative Written Report placement.

## Narrative answer integrity
Across Salvanova, Caldera and Norvale, non-field report prose must frame the decision and interpret the completed evidence without giving away the embedded answers. In particular:
- do not print any report-field benchmark value elsewhere in the Written Report prose;
- do not translate an empty numeric field into a verbal answer elsewhere in the prose;
- Caldera prose must not reveal that the full threshold set is reached only at the end of the programme before the target-year field is completed;
- Norvale prose must not declare the programme technically deliverable within the five-year horizon before the capacity-required field is completed;
- surrounding language should remain analytically neutral (`changes from`, `requires`, `is projected at`) until the user-supplied values make the direction and magnitude explicit.

The locked four-part decision grammar remains:

**Situation / decision context → Evidence / feasibility → Programme implication → Recommendation / management implication**

This change refines presentation and answer integrity only. Research Journal drag/drop, all Red Rock data, Analysis, Graph Selection, Visual Report and scoring remain unchanged.



# V2.2.5 — RESULT FEEDBACK, CLIENT CONCERN AND TASK 1 WEIGHTING

This release supersedes earlier Task 1 result-feedback rules wherever they conflict.

Locked changes:
- learner status = **Correct** (green) or **Needs review** (red);
- raw reasoning tags are hidden;
- no submitted-chart reproduction on the Result page;
- `Primary Constraint` becomes **Primary Concern** with client-facing synthesis;
- Red Rock weighting is superseded by V2.2.7: Analysis 50 + Written Report 20 + Graph Selection 10 + Visual Report Cases 20 = **100%**;
- time remains part of workstream pacing but is **not shown in the Task 1 Result assessment area** and contributes **0%** to Task 1 scoring;
- every weighted component uses predefined threshold feedback at 85–100, 70–84, 51–69 and 0–50;
- the Primary Concern is based on weighted performance impact and explicitly checks the relationship between analysis and reporting.


# V2.2.7 — RESULT REVIEW SIMPLIFICATION AND INTEGRATED CLIENT BENCHMARK

This release supersedes any earlier Task 1 Result rule that displays a separate Assessment Benchmark panel, a Time Used row in the Task 1 Result assessment area, or redundant secondary headings inside the detailed-review panels.

Locked Task 1 Result changes:
- remove the standalone **Assessment Benchmark** panel;
- integrate the four weighted Red Rock component outcomes into the **Primary Concern** client narrative;
- Primary Concern evaluates the performance pattern across Analysis, Written Report, Graph Selection and Visual Report Cases rather than simply selecting the lowest score;
- remove Time Used from the Task 1 Result assessment surface;
- retain timing only as a workstream pacing mechanic, with 0% scoring weight;
- detailed-review panel headers are only **Detailed review · Analysis**, **Detailed review · Written Report**, **Detailed review · Graph Selection**, and **Detailed review · Visual Report**;
- remove the redundant secondary headings `Questions and reasoning`, `Evidence-to-report accuracy`, `Chart choice and entered data`, and `Cases 1–6` from the Result review UI;
- continue to use only **Correct** (green) and **Needs review** (red) as learner-facing item statuses;
- raw diagnostic tags remain hidden;
- Graph Selection remains textual in Results and does not reproduce the learner's selected/generated chart;


# V2.2.7 — FOUR-DIMENSION RED ROCK SCORING

This section is authoritative wherever an earlier section conflicts.

Task 1 Red Rock is scored on **exactly four dimensions**:

| Dimension | Weight |
|---|---:|
| Analysis | **50%** |
| Written Report | **20%** |
| Graph Selection | **10%** |
| Visual Report Cases | **20%** |
| **Total** | **100%** |

**Evidence Selection is not a scored dimension.** Research Journal collection remains an Investigation/working-memory mechanic, but retaining or omitting evidence does not independently add to or deduct from the Task 1 score and there is no `Detailed review · Evidence Selection` block on the Result page.

The Task 1 Result flow is:

**Client Debrief → Primary Concern + integrated four-dimension performance snapshot → Detailed review · Analysis → Detailed review · Written Report → Detailed review · Graph Selection → Detailed review · Visual Report → continuation action.**

The **Primary Concern** is Dr. Cross's client-facing synthesis of the four scored dimensions. It must evaluate the interaction between analytical accuracy, written synthesis, graph communication and case-by-case judgement rather than mechanically naming the lowest percentage. The compact performance snapshot, when shown, sits inside the same Primary Concern card and is not a separate Assessment Benchmark panel.

`Time Used` and `Evidence Selection` both carry **0% scoring weight** and are not shown as Task 1 assessment dimensions.

# V2.2.8 — CLIENT BRIEFS, BINARY GRAPH OUTPUT AND SEA WOLF CLIENT REVIEW

This section is authoritative wherever an earlier section conflicts.

## Red Rock scoring lock
Task 1 remains exactly four dimensions:
- Analysis — **50%**, additive across all scored Analysis answers;
- Written Report — **20%**, additive across all scored fillable report fields;
- Graph Selection — **10%**, **all-or-nothing**: accepted chart type **and every required chart-data value must both be correct** for the full 10%; otherwise the component contributes 0%;
- Visual Report Cases — **20%**, additive across the six cases.

Evidence Selection is not scored. Research Journal use remains a working-memory/evidence-management mechanic only.

## Red Rock Study Information — client situation brief rule
Across Salvanova Forest, Caldera Marsh and Norvale Highlands, **Study Information is a client situation brief, not an assessment data sheet**.

Use the common narrative sequence:
1. current situation/problem;
2. what Fairhaven is considering or proposing;
3. information, baselines and resources currently available;
4. relevant wider site/operational context.

All existing quantitative values, units, answer keys and downstream calculations remain unchanged. Relevant and contextual/distractor figures remain equally interactive where presented. Wider-context values must read like legitimate client-file information rather than planted traps. The prose must not tell the learner which evidence will be needed later and must not disclose derived outcomes, threshold answers, feasibility conclusions or recommendations that the learner is expected to produce in Analysis or Report.

Study-specific framing:
- **Salvanova Forest:** ecosystem intervention / apex-predator restoration. Year-5 vegetation outcomes needed later are kept in the exhibit evidence rather than disclosed in Study Information.
- **Caldera Marsh:** water-quality recovery programme with ecological, visitor and programme context.
- **Norvale Highlands:** restoration feasibility and delivery programme with capacity, cost, budget and carbon assumptions.

The cognitive flow is: **understand the situation → distinguish relevant evidence from context → analyse → advise the client**.

## Task 2 — four-dimension scoring lock
Sea Wolf is scored on exactly:
- Site Profiling — **10%**;
- Microbe Categorisation & Transfer — **30%**;
- Prospect Selection — **25%**;
- Treatment Construction — **35%**;
- **Total — 100%**.

Site Profiling is additive by site. Categorisation & Transfer is additive by individual routing decision. Prospect Selection is additive by confirmed prospect round. Treatment Construction is proportional by site against that site's maximum feasible effectiveness. Azure Shelf Site 3 treats 80/80 as full site credit.

Learner-facing Task 2 review statuses are only **Correct** (green) and **Needs review** (red). Raw internal judgement/scoring labels are not shown as learner-facing result tags.

## Task 2 Result / Dr. Reyes close-out
The Task 2 result sequence is:

**Sea Wolf workstream complete. Review feedback below. → Dr. Reyes Client Debrief → Primary Concern + Performance Snapshot → Detailed review · Site Profiling → Detailed review · Categorisation & Transfer → Detailed review · Prospect Selection → Detailed review · Treatment Construction → continuation/results action.**

The Client Debrief is a predefined 2–3 paragraph client response selected from strong / mid-range / weak overall performance bands. It does not read percentages aloud. It answers what the consultant achieved, what that means for the three-site programme, and whether Dr. Reyes would take the work forward.

Primary Concern comes after the debrief and synthesises the pattern across all four Task 2 dimensions. It must identify the most material client-facing decision issue and connect earlier choices to later treatment consequences rather than simply naming the lowest score. A compact four-dimension Performance Snapshot sits inside the same Primary Concern card; there is no separate Assessment Benchmark card.

Treatment detailed review shows submitted trio, achieved effectiveness, maximum feasible effectiveness and normalised performance. On deliberately constrained sites, achieving the site maximum is explicitly recognised as **Correct** and full credit.



# V2.2.9 — Salvanova Exhibit 2 Scenario Integration

## Locked correction
Salvanova Exhibit 2 must present the wolf and no-wolf vegetation evidence as one coherent exhibit rather than isolating the **65% Year-5 no-wolf outcome** in a separate "Scenario Reference" mini-table.

- Remove the standalone Scenario Reference table completely.
- Keep the existing with-wolf annual vegetation trajectory **80, 85, 89, 94, 98, 100%** unchanged.
- Keep the supplied no-wolf outcome **Year 5 = 65%** unchanged.
- Do **not** invent Year 1–4 no-wolf vegetation values.
- In the vegetation visual, show the full with-wolf trajectory together with a clearly identified **Without wolves · Year 5** reference mark.
- Keep tourism on a separate visual scale because it is expressed in **$000**, not percent.
- Replace the generic Exhibit 2 evidence table with one integrated table containing **Period, Scenario, Vegetation cover, Tourism revenue index ($000)**.
- The annual rows represent the shared baseline / wolf-reintroduction projection; add the supplied **Year 5 · Without wolf reintroduction · 65%** as a row in the same table.
- The no-wolf tourism outcome is **not supplied in the exhibit** and must not be pre-calculated or displayed, preserving the learner's later analysis/report task.
- The 65% cell remains draggable/click-addable to the Research Journal like other exact exhibit evidence.
- Charts remain visual interpretation aids; the table remains the exact-value evidence source.
- No Salvanova calculations, answer keys, scoring, report fields or downstream mechanics change.
