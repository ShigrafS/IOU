import { useState, useCallback, useEffect } from 'react';
import type { SimulationState } from '../core/types';
import { initializeGraph } from '../core/graph';
import { runSimulationTick } from '../core/simulation';
import { presets } from '../content/presets';
import type { Preset } from '../content/presets';

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
                ...presets.find(p => p.id === 'default')!.params,
                shockActive: false,
            },
            history: [],
        };
    });

    const [isRunning, setIsRunning] = useState(false);
    // const requestRef = useRef<number>();

    const reset = useCallback((paramsOverride?: Partial<SimulationState['params']>) => {
        setIsRunning(false);
        const { nodes, edges } = initializeGraph();
        setState(prev => ({
            nodes,
            edges,
            tick: 0,
            totalObligations: 0,
            unsettledObligations: 0,
            failedNodes: 0,
            params: {
                ...prev.params,
                ...paramsOverride,
                shockActive: false,
            },
            history: [],
        }));
    }, []);

    const setParams = useCallback((partialParams: Partial<SimulationState['params']>) => {
        setState(prev => ({
            ...prev,
            params: {
                ...prev.params,
                ...partialParams
            }
        }));
    }, []);

    const applyPreset = useCallback((preset: Preset) => {
        reset(preset.params);
    }, [reset]);

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
                setState(prev => {
                    const next = runSimulationTick(prev);
                    const newHistory = [
                        ...prev.history,
                        {
                            tick: next.tick,
                            failedNodes: next.failedNodes,
                            totalObligations: next.totalObligations,
                            unsettledObligations: next.unsettledObligations,
                        }
                    ].slice(-300); // Keep last 300 ticks
                    return { ...next, history: newHistory };
                });
            }, 500); // 2 ticks per second (Slower for better legibility)
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    return {
        state,
        isRunning,
        setIsRunning,
        reset,
        setParams,
        applyPreset,
        toggleShock,
    };
};
