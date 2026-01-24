import React, { useRef, useState, useEffect } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { LayeredGraph } from '../components/viz/LayeredGraph';
import { SimulationControls } from '../components/ui/SimulationControls';
import { MetricsDisplay } from '../components/ui/MetricsDisplay';

export const SimulationPage: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const { state, isRunning, setIsRunning, reset, toggleShock } = useSimulation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (width > 0 && height > 0) {
                    setDimensions({ width, height });
                }
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">

            {/* Background Decor (Global) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

            {/* Sidebar (Left) */}
            <aside className="w-96 flex flex-col gap-6 p-6 border-r border-white/10 bg-background/80 backdrop-blur-xl z-20 shadow-2xl overflow-y-auto">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Operations</h2>
                    <SimulationControls
                        isRunning={isRunning}
                        onTogglePlay={() => setIsRunning(!isRunning)}
                        onReset={reset}
                        onToggleShock={toggleShock}
                        shockActive={state.params.shockActive}
                        onExit={onExit}
                        className="w-full shadow-none border-0 bg-transparent p-0"
                    />
                </div>

                <div className="flex-1">
                    <MetricsDisplay
                        totalObligations={state.totalObligations}
                        unsettledObligations={state.unsettledObligations}
                        failedNodes={state.failedNodes}
                        tick={state.tick}
                        className="w-full shadow-none border-0 bg-transparent p-0"
                    />
                </div>

                <div className="text-[10px] text-muted-foreground text-center border-t border-white/5 pt-4">
                    System v3.0 // Ready
                </div>
            </aside>

            {/* Main Graph Area (Right) */}
            <main className="flex-1 relative bg-black/20" ref={containerRef}>
                {/* Graph Visual */}
                <div className="absolute inset-0 z-10">
                    {dimensions.width > 0 && (
                        <LayeredGraph
                            nodes={state.nodes}
                            edges={state.edges}
                            width={dimensions.width}
                            height={dimensions.height}
                            className="w-full h-full"
                        />
                    )}
                </div>

                {/* Legend (Bottom Right) */}
                <div className="absolute bottom-6 right-6 z-20 bg-background/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex flex-col gap-2 shadow-lg">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" /> Failed
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]" /> Stressed
                    </div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground">
                        <span className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" /> Healthy
                    </div>
                </div>
            </main>

        </div>
    );
};
