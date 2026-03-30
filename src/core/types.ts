export type EntityType = 'CONSUMER' | 'RETAILER' | 'WHOLESALER' | 'MANUFACTURER';

export type NodeStatus = 'HEALTHY' | 'STRESSED' | 'FAILED';

export interface Node {
    id: string;
    type: EntityType;
    label: string;

    // Economic state
    liquidity: number;       // Current cash available
    liquidityBuffer: number; // Minimum cash needed to stay healthy

    // Visual/State
    status: NodeStatus;
    x?: number; // For visualization
    y?: number;
}

export interface Edge {
    id: string;
    source: string; // Debtor (Owes money)
    target: string; // Creditor (Expects money)

    amount: number;
    remainingAmount: number; // For partial payments if we support them

    createdAt: number; // Tick when obligation was created
    dueAt: number;     // Tick when payment is expected

    // Dynamic properties
    isSettled: boolean;
    isDelayed: boolean; // Has this payment been delayed?
}

export interface SimulationState {
    nodes: Node[];
    edges: Edge[];
    tick: number;

    // Metrics
    totalObligations: number;
    unsettledObligations: number;
    failedNodes: number;

    // Parameters
    params: {
        baseDelayProbability: number;
        shockActive: boolean;
        transactionProbability: number;
        standardDelay: number;
        shockDelayIncrease: number;
        shockProbabilityIncrease: number;
    };

    history: Array<{
        tick: number;
        failedNodes: number;
        totalObligations: number;
        unsettledObligations: number;
    }>;
}
