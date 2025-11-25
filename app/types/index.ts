// app/types.ts
export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  demoUrl: string;
}

export interface Service {
  title: string;
  icon: string;
  description: string;
  features: string[];
  gradient: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
  link?: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  gradient: string;
}