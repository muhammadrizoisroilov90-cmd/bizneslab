export type IdeaKey = 'qr' | 'bron' | 'shop' | 'ijara' | 'usta' | 'crm';

export type IdeaTag = 'fast' | 'subscription' | 'marketplace' | 'featured';

export type IdeaIcon = 'qr' | 'calendar' | 'store' | 'key' | 'tools' | 'chart';

export type Accent = 'violet' | 'mint' | 'amber' | 'pink' | 'sky';

export interface MoneyRow {
  label: string;
  value: string;
}

export interface Idea {
  key: IdeaKey;
  num: string;
  title: string;
  tagline: string;
  summary: string;
  icon: IdeaIcon;
  accent: Accent;
  featured: boolean;
  tags: IdeaTag[];
  audience: string;
  model: string;
  price: string;
  mvp: string;
  difficulty: 'Oson' | "Oson-o'rta" | "O'rta" | "O'rta-yuqori" | 'Yuqori';
  problem: string;
  solution: string[];
  why: string[];
  money: MoneyRow[];
  steps: string[];
  stack: string[];
  risk: string;
  firstStep: string;
}

export interface ComparisonRow {
  key: IdeaKey;
  model: string;
  payer: string;
  entry: string;
  mvp: string;
  difficulty: Idea['difficulty'];
  potential: string;
}

export interface CalcConfig {
  key: IdeaKey;
  label: string;
  count: number;
  maxCount: number;
  price: number;
  minPrice: number;
  maxPrice: number;
  priceStep: number;
  note: string;
}

export interface RoadmapStep {
  week: string;
  title: string;
  goal: string;
  tasks: string[];
  result: string;
  metric: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LeadPayload {
  name: string;
  phone: string;
  idea?: IdeaKey | '';
  budget?: string;
  message?: string;
  source?: string;
}

export interface LeadResponse {
  ok: true;
  id?: string;
  mode: 'api' | 'demo';
}
