export interface PillarData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  iconName: 'smartphone' | 'running' | 'food' | 'robot';
  description: string;
  impactText: string;
  actionTips: string[];
  swaps: { from: string; to: string }[];
  colorTheme: 'teal' | 'emerald' | 'amber' | 'indigo';
}

export interface TransformationItem {
  id: string;
  interest: string;
  passiveLabel: string;
  passiveDescription: string;
  productiveLabel: string;
  productiveDescription: string;
  realWorldSkill: string;
  futureOpportunity: string;
  beginnerTool: string;
}

export interface FutureSkillDomain {
  id: string;
  name: string;
  shortDesc: string;
  relevance: string;
  ageRecommendation: string;
  starterProject: string;
  practicalTool: string;
}

export interface ChallengeDay {
  dayNumber: number;
  title: string;
  focus: string;
  mission: string;
  parentTip: string;
  childActivity: string;
}
