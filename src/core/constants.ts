export const SIMULATION_PARAMS = {
    // Layer counts
    LAYER_COUNTS: {
        CONSUMER: 40,
        RETAILER: 10,
        WHOLESALER: 5,
        MANUFACTURER: 2,
    },

    // Initial Liquidity
    INITIAL_LIQUIDITY: {
        CONSUMER: 1000,
        RETAILER: 50000,
        WHOLESALER: 200000,
        MANUFACTURER: 1000000,
    },

    // Liquidity Buffer (Threshold for stress)
    BUFFER_THRESHOLD: {
        CONSUMER: 200,
        RETAILER: 10000,
        WHOLESALER: 50000,
        MANUFACTURER: 200000,
    },

    // Simulation Settings
    TRANSACTION_PROBABILITY: 0.1, // Chance a consumer makes a purchase per tick
    TRANSACTION_AMOUNT_RANGE: [50, 200], // Min/Max purchase

    // Payment Terms
    STANDARD_DELAY: 5, // Ticks until payment is due

    // Shock
    SHOCK_DELAY_INCREASE: 10, // Extra ticks added during shock
    SHOCK_PROBABILITY_INCREASE: 0.3, // Probability increase
};
