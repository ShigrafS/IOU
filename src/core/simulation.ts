import type { Node, Edge, SimulationState } from './types';
import { SIMULATION_PARAMS } from './constants';

let edgeIdCounter = 0;

const createEdge = (source: Node, target: Node, amount: number, tick: number, delay: number): Edge => {
    return {
        id: `edge-${edgeIdCounter++}`,
        source: source.id,
        target: target.id,
        amount,
        remainingAmount: amount,
        createdAt: tick,
        dueAt: tick + delay,
        isSettled: false,
        isDelayed: false,
    };
};

const getRandomNode = (nodes: Node[]) => nodes[Math.floor(Math.random() * nodes.length)];

export const runSimulationTick = (state: SimulationState): SimulationState => {
    const { nodes, edges, tick, params } = state;
    let newEdges = [...edges];
    let newNodes = [...nodes];

    // 1. Transactions (Top-down demand or Bottom-up orders?)
    // Model: Consumer buys -> Retailer owes Wholesaler -> Wholesaler owes Manufacturer
    // Actually, Consumer buys from Retailer (Consumer owes Retailer).
    // Retailer buys from Wholesaler (Retailer owes Wholesaler).
    // Wholesaler buys from Manufacturer (Wholesaler owes Manufacturer).

    // Randomly generate consumer demand
    const consumers = newNodes.filter(n => n.type === 'CONSUMER');
    const retailers = newNodes.filter(n => n.type === 'RETAILER');
    const wholesalers = newNodes.filter(n => n.type === 'WHOLESALER');
    const manufacturers = newNodes.filter(n => n.type === 'MANUFACTURER');

    consumers.forEach(consumer => {
        if (Math.random() < SIMULATION_PARAMS.TRANSACTION_PROBABILITY && consumer.status !== 'FAILED') {
            const retailer = getRandomNode(retailers);
            if (retailer && retailer.status !== 'FAILED') {
                const amount = Math.floor(Math.random() * (SIMULATION_PARAMS.TRANSACTION_AMOUNT_RANGE[1] - SIMULATION_PARAMS.TRANSACTION_AMOUNT_RANGE[0])) + SIMULATION_PARAMS.TRANSACTION_AMOUNT_RANGE[0];

                // 1. Consumer -> Retailer obligation
                newEdges.push(createEdge(consumer, retailer, amount, tick, SIMULATION_PARAMS.STANDARD_DELAY));

                // 2. Retailer -> Wholesaler obligation (Restock)
                // Assuming Margin logic? or 1:1 replacement cost? Let's say 80% cost.
                const wholesaler = getRandomNode(wholesalers);
                if (wholesaler && wholesaler.status !== 'FAILED') {
                    newEdges.push(createEdge(retailer, wholesaler, amount * 0.8, tick, SIMULATION_PARAMS.STANDARD_DELAY));

                    // 3. Wholesaler -> Manufacturer obligation
                    const manufacturer = getRandomNode(manufacturers);
                    if (manufacturer && manufacturer.status !== 'FAILED') {
                        newEdges.push(createEdge(wholesaler, manufacturer, amount * 0.6, tick, SIMULATION_PARAMS.STANDARD_DELAY));
                    }
                }
            }
        }
    });

    // 2. Settlement
    newEdges = newEdges.map(edge => {
        if (edge.isSettled) return edge;

        if (edge.dueAt <= tick) {
            // Attempt to settle
            const sourceNode = newNodes.find(n => n.id === edge.source);
            // const targetNode = newNodes.find(n => n.id === edge.target); // Not needed for check

            if (sourceNode) {
                // Check for delay
                let p = params.baseDelayProbability; // Base probability from state
                if (params.shockActive) {
                    p += SIMULATION_PARAMS.SHOCK_PROBABILITY_INCREASE;
                }

                // Logic: If source is stressed, delay prob increases? 
                // For MVP, just random + stress factor
                if (sourceNode.status === 'STRESSED') p += 0.2;
                if (sourceNode.status === 'FAILED') p = 1.0; // Failed nodes always delay (stop paying)

                if (Math.random() < p) {
                    // DELAY
                    return {
                        ...edge,
                        isDelayed: true,
                        dueAt: tick + (params.shockActive ? SIMULATION_PARAMS.SHOCK_DELAY_INCREASE : SIMULATION_PARAMS.STANDARD_DELAY)
                    };
                } else {
                    // SETTLE
                    // Transfer liquidity
                    const targetNode = newNodes.find(n => n.id === edge.target);

                    // Deduct from source
                    sourceNode.liquidity -= edge.amount;

                    // Add to target
                    if (targetNode) {
                        targetNode.liquidity += edge.amount;
                    }

                    return { ...edge, isSettled: true };
                }
            }
        }
        return edge;
    });

    // Clean up settled edges if we want (or keep for history/viz?)
    // For now keep them but maybe filter out very old ones to save memory if needed.
    // Let's filter settled edges to remove them from active processing, but maybe we need them for viz?
    // Let's keep them but flag them.

    // 3. Stress Check
    newNodes = newNodes.map(node => {
        if (node.liquidity < 0) return { ...node, status: 'FAILED' };
        if (node.liquidity < node.liquidityBuffer) return { ...node, status: 'STRESSED' };
        return { ...node, status: 'HEALTHY' };
    });

    // 4. Metrics
    const activeEdges = newEdges.filter(e => !e.isSettled);
    const totalObligations = activeEdges.reduce((sum, e) => sum + e.amount, 0);
    const failedNodes = newNodes.filter(n => n.status === 'FAILED').length;
    // Unsettled Payment Ratio could be:
    // (Total Delayed Obligations) / (Total Active Obligations)
    const delayedEdges = activeEdges.filter(e => e.isDelayed);
    const totalDelayedAmount = delayedEdges.reduce((sum, e) => sum + e.amount, 0);

    // const unsettledPaymentRatio = totalObligations > 0 ? totalDelayedAmount / totalObligations : 0;

    return {
        nodes: newNodes,
        edges: newEdges.filter(e => !e.isSettled), // Optimization: remove settled edges from state
        tick: tick + 1,
        totalObligations,
        unsettledObligations: totalDelayedAmount, // Using delayed amount as proxy for "bad" unsettling
        failedNodes,
        params,
        // Add raw ratio to state if needed, or derived in UI
    };
};
