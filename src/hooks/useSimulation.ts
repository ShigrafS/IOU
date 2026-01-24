import { useState, useCallback, useEffect } from 'react';
import type { SimulationState } from '../core/types';
import { initializeGraph } from '../core/graph';
import { runSimulationTick } from '../core/simulation';

export const useSimulation = () => {
    const [state, setState] = useState<SimulationState>(() => {
        const { nodes, edges } = initializeGraph();
        return {
            nodes,
            edges,
            tick: 0,
            totalObligations: 0,
            unsettledObligations: 0,
            failedNodes: 0,
            params: {
                baseDelayProbability: 0.05, // Low default
                shockActive: false,
            },
        };
    });

    const [isRunning, setIsRunning] = useState(false);
    // const requestRef = useRef<number>();

    const reset = useCallback(() => {
        setIsRunning(false);
        const { nodes, edges } = initializeGraph();
        setState({
            nodes,
            edges,
            tick: 0,
            totalObligations: 0,
            unsettledObligations: 0,
            failedNodes: 0,
            params: {
                baseDelayProbability: 0.05,
                shockActive: false,
            },
        });
    }, []);

    const toggleShock = useCallback(() => {
        setState(prev => ({
            ...prev,
            params: {
                ...prev.params,
                shockActive: !prev.params.shockActive
            }
        }));
    }, []);

    //         // running at 60fps might be too fast for the simulation logic per tick?
    //         // Let's slow it down or use setInterval.
    //         // requestAnimationFrame is fine if we want smooth viz updates, but logical ticks might need throttling.
    //         // Let's try every 100ms.
    //     }
    // }, [isRunning]);

    useEffect(() => {
        let intervalId: any;
        if (isRunning) {
            intervalId = setInterval(() => {
                setState(prev => runSimulationTick(prev));
            }, 200); // 5 ticks per second
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    return {
        state,
        isRunning,
        setIsRunning,
        reset,
        toggleShock,
    };
};
