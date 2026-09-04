export type Mode = 'learning' | 'simulation';
export type TaskKind = 'redrock' | 'seawolf';
export type Judgement = 'strong' | 'defensible' | 'weak';
export type SeaWolfTrait = 'Heat Resistant' | 'Aerobic' | 'Phosphorus Removal' | 'Light Sensitive';
export type SeaWolfStep = 'taskIntro' | 'siteIntro' | 'transferReview' | 'characteristics' | 'categorisation' | 'initialPool' | 'prospectPool' | 'treatment' | 'siteResult';

export type Fact = {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  relevance: 'high' | 'medium' | 'low';
  draggable?: boolean;
  source?: 'study' | 'exhibit1' | 'exhibit2' | 'analysis';
};

export type ExhibitSeries = {
  name: string;
  values: number[];
};

export type Exhibit = {
  id: string;
  title: string;
  type: 'table' | 'text' | 'line-chart' | 'bar-chart';
  columns?: string[];
  rows?: Array<Array<string | number>>;
  text?: string;
  labels?: string[];
  series?: ExhibitSeries[];
  unit?: string;
  note?: string;
};

export type Question = {
  id: string;
  prompt: string;
  journalLabel?: string;
  responseType: 'number' | 'single-select' | 'text';
  answer: number | string;
  unit?: string;
  tolerance?: number;
  options?: string[];
  requiredFactIds?: string[];
  strategyPrompt?: string;
  hints?: string[];
  explanation: string;
  errorTags?: string[];
};

export type AnalysisSection = {
  id: string;
  title: string;
  directions?: string;
  fields: Question[];
};

export type VisualCase = {
  id: string;
  title: string;
  context: string;
  clientPrompt?: string;
  exhibit?: Exhibit;
  question: Question;
};

export type ReportField = {
  id: string;
  label: string;
  answer: string | number;
  tolerance?: number;
  unit?: string;
};

export type ReportTemplateSegment =
  | { type: 'text'; text: string }
  | { type: 'field'; fieldId: string };

export type StudyEvidenceSpan = { paragraphIndex: number; text: string; factId: string; };
export type ExhibitEvidenceBinding = { exhibitId: string; factId: string; seriesName?: string; label?: string; rowLabel?: string; column?: string; };

export type RedRockScenario = {
  id: string;
  title: string;
  context: string;
  clientBrief: string;
  assignment: string;
  writtenReportPrompt: string;
  objective: string;
  studyInformation: string[];
  studyEvidence?: StudyEvidenceSpan[];
  exhibitEvidenceBindings?: ExhibitEvidenceBinding[];
  facts: Fact[];
  exhibits: [Exhibit, Exhibit];
  analysisSections: [AnalysisSection, AnalysisSection, AnalysisSection, AnalysisSection];
  analysisQuestions: Question[];
  report: {
    intro: string;
    fields: ReportField[];
    template: ReportTemplateSegment[];
    visual: {
      prompt: string;
      chartOptions: ['Clustered bar chart','Line chart','Scatter plot'] | string[];
      acceptedChartTypes: string[];
      dataFields: ReportField[];
      explanation: string;
    };
  };
  visualCases: [VisualCase, VisualCase, VisualCase, VisualCase, VisualCase, VisualCase];
};

export type Range = [number, number];

export type Microbe = {
  id: string;
  name: string;
  permeability: number;
  mobility: number;
  energy: number;
  trait: SeaWolfTrait;
  expectedAllocation?: 'current' | 'next' | 'return';
  allocationJudgement?: Judgement;
  allocationReason?: string;
};

export type ProspectCandidate = Microbe & {
  judgement: Judgement;
  reason: string;
};

export type ProspectRound = {
  id: string;
  candidates: [ProspectCandidate, ProspectCandidate, ProspectCandidate];
  referenceChoiceId: string;
};

export type SeaWolfSite = {
  id: string;
  title: string;
  description: string;
  ranges: { permeability: Range; mobility: Range; energy: Range; };
  desiredTrait: SeaWolfTrait;
  undesiredTrait: SeaWolfTrait;
  decisionPrompt: string;
  preferredFilterStrategy: { attribute: 'Permeability' | 'Mobility' | 'Energy'; range: Range; trait: SeaWolfTrait; };
  siteInsights?: string[];
  nextSiteInsight?: { kind: 'attribute' | 'trait'; label: string; range?: Range; };
  categorisationDeck: Microbe[];
  initialPoolCandidateUniverse: Microbe[];
  referenceInitialProspectPoolIds: string[];
  prospectRounds: ProspectRound[];
  maximumFeasibleEffectiveness: number;
  referenceTreatmentIds: string[];
  referenceMaximumCount: number;
  researchBasisIds: string[];
};

export type SeaWolfScenario = {
  id: string;
  title: string;
  theme: string;
  transferFocus: string;
  clientBrief: string;
  assignment: string;
  researchBasisIds: string[];
  sites: [SeaWolfSite, SeaWolfSite, SeaWolfSite];
};

export type JournalItem = {
  id: string;
  factId: string;
  label: string;
  value: string;
  important: boolean;
  source?: 'investigation' | 'analysis';
  origin?: 'Study Information' | 'Exhibit 1' | 'Exhibit 2' | 'Analysis';
};

export type RedRockStage = 'investigation' | 'analysis' | 'written' | 'graph' | 'visual' | 'complete';

export type CalculatorHistoryEntry = {
  id: string;
  expression: string;
  result: string;
  createdAt: number;
};

export type RedRockAttempt = {
  scenarioId: string;
  analysisAnswers: Record<string, string>;
  reportAnswers: Record<string, string>;
  graphAnswers?: Record<string, string>;
  visualChartType?: string;
  visualCaseAnswers: Record<string, string>;
  journal: JournalItem[];
  calculationHistory?: CalculatorHistoryEntry[];
  hintsUsed: number;
  retries: number;
  timeUsedSeconds: number;
  timerStartedAt?: number;
  completed: boolean;
  stage?: RedRockStage;
  analysisLocked?: boolean;
  writtenLocked?: boolean;
  graphLocked?: boolean;
  visualLocked?: boolean;
};

export type AllocationDecision = { microbeId: string; allocation: 'current' | 'next' | 'return'; reasoning?: string; judgement: Judgement; };
export type ProspectDecision = { roundId: string; microbeId: string; reasoning?: string; judgement: Judgement; };
export type SeaWolfSiteAttempt = { siteId: string; selectedCharacteristics: string[]; transferAllocations: AllocationDecision[]; allocations: AllocationDecision[]; prospectDecisions: ProspectDecision[]; treatmentIds: string[]; submittedEffectiveness?: number; completed: boolean; };
export type SeaWolfAttempt = { scenarioId: string; sites: Record<string, SeaWolfSiteAttempt>; hintsUsed: number; retries: number; timeUsedSeconds: number; timerStartedAt?: number; completed: boolean; currentSiteIndex?: number; currentStep?: SeaWolfStep; categorisationIndex?: number; transferIndex?: number; prospectRoundIndex?: number; };

export type SimulationSession = {
  id: string;
  mode: Mode;
  learningTimerEnabled?: boolean;
  selectedRedRockId?: string;
  selectedSeaWolfId?: string;
  startedAt?: number;
  currentTask?: TaskKind;
  redRockAttempt?: RedRockAttempt;
  /** Salvanova model-data revision used for targeted persistence migration. */
  salvanovaModelRevision?: number;
  seaWolfAttempt?: SeaWolfAttempt;
  completedAt?: number;
};

export type Task1Score = { total: number; analysis: number; writtenReport: number; visualReport: number; visualCases: number; timeDiscipline: number; };
export type Task2Score = { total: number; siteProfiling: number; categorisation: number; prospectSelection: number; treatment: number; siteResults: Array<{siteId:string;submitted:number;maximumFeasible:number;normalised:number}>; };
export type OverallResult = { overall: number; band: 'Strong Practice Readiness'|'Competitive Practice Range'|'Developing Readiness'|'Further Practice Recommended'; task1?: Task1Score; task2?: Task2Score; reasoningProfile:Array<{dimension:string;result:'Strong'|'Competitive'|'Developing'|'At Risk'}>; primaryConstraint:string; recommendation:string; };
