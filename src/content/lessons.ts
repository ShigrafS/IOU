import { Preset, presets } from './presets';

export interface Lesson {
  id: string;
  title: string;
  presetId: string;
  context: string;
  questions: string[];
  takeawayTemplateId: string;
}

export const lessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "1. The Illusion of Solvency",
    presetId: "default",
    context: "Even in a healthy network, a seemingly small delay propagates upstream. Watch what happens when you introduce a liquidity shock.",
    questions: [
      "How quickly does a single missed payment spread?",
      "Which tier of the supply chain exhausts its buffers first?"
    ],
    takeawayTemplateId: "collapse-speed"
  },
  {
    id: "lesson-2",
    title: "2. The Cost of Late Protocols",
    presetId: "late-pay",
    context: "In an environment where everyone pays 30 days late, systemic resilience drops significantly. The buffer is already stretched.",
    questions: [
      "Does a standard delay eventually equalize, or compound?",
      "Can the system survive without an external injection?"
    ],
    takeawayTemplateId: "delay-compounding"
  },
  {
    id: "lesson-3",
    title: "3. Fragile Optimization",
    presetId: "fragile",
    context: "Highly 'efficient' networks with tight buffers maximize throughput but minimize safety. An optimized system is a fragile one.",
    questions: [
      "What is the breaking point of the network?",
      "How does network density affect the spread of insolvency?"
    ],
    takeawayTemplateId: "efficiency-fragility"
  }
];
