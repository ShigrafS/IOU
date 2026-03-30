export interface Preset {
  id: string;
  name: string;
  description: string;
  params: {
    baseDelayProbability: number;
    standardDelay: number;
    transactionProbability: number;
    shockDelayIncrease: number;
    shockProbabilityIncrease: number;
  };
}

export const presets: Preset[] = [
  {
    id: "default",
    name: "Healthy Economy",
    description: "Low delays, steady payments.",
    params: {
      baseDelayProbability: 0.05,
      standardDelay: 2,
      transactionProbability: 0.8,
      shockDelayIncrease: 0,
      shockProbabilityIncrease: 0,
    }
  },
  {
    id: "late-pay",
    name: "Late-pay Invoices",
    description: "Suppliers delay payments constantly.",
    params: {
      baseDelayProbability: 0.25,
      standardDelay: 5,
      transactionProbability: 0.8,
      shockDelayIncrease: 0,
      shockProbabilityIncrease: 0,
    }
  },
  {
    id: "high-velocity",
    name: "High Velocity",
    description: "Rapid transactions, tight margins.",
    params: {
      baseDelayProbability: 0.02,
      standardDelay: 1,
      transactionProbability: 0.95,
      shockDelayIncrease: 0,
      shockProbabilityIncrease: 0,
    }
  },
  {
    id: "fragile",
    name: "Fragile System",
    description: "Highly sensitive to minor shocks.",
    params: {
      baseDelayProbability: 0.1,
      standardDelay: 3,
      transactionProbability: 0.8,
      shockDelayIncrease: 10,
      shockProbabilityIncrease: 0.5,
    }
  }
];
