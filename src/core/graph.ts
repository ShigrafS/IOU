import type { Node, Edge, EntityType } from './types';
import { SIMULATION_PARAMS } from './constants';

let nodeIdCounter = 0;

const createNode = (type: EntityType, label: string, liquidity: number, buffer: number): Node => {
    return {
        id: `node-${nodeIdCounter++}`,
        type,
        label,
        liquidity,
        liquidityBuffer: buffer,
        status: 'HEALTHY',
    };
};

export const initializeGraph = () => {
    const nodes: Node[] = [];
    nodeIdCounter = 0; // Reset counter

    const { LAYER_COUNTS, INITIAL_LIQUIDITY, BUFFER_THRESHOLD } = SIMULATION_PARAMS;

    // Create Manufacturers (Layer 3 - Top)
    const manufacturers = Array.from({ length: LAYER_COUNTS.MANUFACTURER }).map((_, i) =>
        createNode('MANUFACTURER', `Mfr ${i + 1}`, INITIAL_LIQUIDITY.MANUFACTURER, BUFFER_THRESHOLD.MANUFACTURER)
    );
    nodes.push(...manufacturers);

    // Create Wholesalers (Layer 2)
    const wholesalers = Array.from({ length: LAYER_COUNTS.WHOLESALER }).map((_, i) =>
        createNode('WHOLESALER', `Whole ${i + 1}`, INITIAL_LIQUIDITY.WHOLESALER, BUFFER_THRESHOLD.WHOLESALER)
    );
    nodes.push(...wholesalers);

    // Create Retailers (Layer 1)
    const retailers = Array.from({ length: LAYER_COUNTS.RETAILER }).map((_, i) =>
        createNode('RETAILER', `Retail ${i + 1}`, INITIAL_LIQUIDITY.RETAILER, BUFFER_THRESHOLD.RETAILER)
    );
    nodes.push(...retailers);

    // Create Consumers (Layer 0 - Bottom)
    const consumers = Array.from({ length: LAYER_COUNTS.CONSUMER }).map((_, i) =>
        createNode('CONSUMER', `Cons ${i + 1}`, INITIAL_LIQUIDITY.CONSUMER, BUFFER_THRESHOLD.CONSUMER)
    );
    nodes.push(...consumers);

    // Don't create edges yet. Edges are dynamic "obligations" created during simulation.
    // However, we might want "relationships" (who buys from whom).
    // For simplicity, we can assume fully connected layers or random connections for purchasing.
    // We'll define "Supply Relationships" separately if needed, or just pick random upstream provider.

    return { nodes, edges: [] as Edge[] };
};

export const getUpstreamNodes = (nodes: Node[], type: EntityType): Node[] => {
    return nodes.filter(n => n.type === type);
}
