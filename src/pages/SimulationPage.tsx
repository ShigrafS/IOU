import React, { useRef, useState, useEffect } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { LayeredGraph } from '../components/viz/LayeredGraph';
import { SimulationControls } from '../components/ui/SimulationControls';
import { MetricsDisplay } from '../components/ui/MetricsDisplay';

export const SimulationPage: React.FC = () => {
    const { state, isRunning, setIsRunning, reset, toggleShock } = useSimulation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width, height: height - 40 }); // Subtract padding
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden relative">
            {/* Header */}
            <div className="flex-none p-4 border-b bg-card z-10">
                <h1 className="text-xl font-bold tracking-tight">Credit Chain Fragility Simulator</h1>
                <p className="text-sm text-muted-foreground">
                    Visualize how deferred payments propagate through a credit-based economy.
                </p>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Controls Sidebar */}
                <aside className="w-80 flex-none p-4 border-r bg-muted/30 overflow-y-auto z-10 flex flex-col gap-6">
                    <SimulationControls
                        isRunning={isRunning}
                        onTogglePlay={() => setIsRunning(!isRunning)}
                        onReset={reset}
                        onToggleShock={toggleShock}
                        shockActive={state.params.shockActive}
                    />

                    <MetricsDisplay
                        totalObligations={state.totalObligations}
                        unsettledObligations={state.unsettledObligations}
                        failedNodes={state.failedNodes}
                        tick={state.tick}
                    />

                    <div className="text-xs text-muted-foreground p-4 bg-card rounded border">
                        <h4 className="font-semibold mb-1">How to use</h4>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Start the simulation to see transactions flow.</li>
                            <li>Green edges are active payments.</li>
                            <li>Red edges are delayed.</li>
                            <li>Toggle "Liquidity Shock" to increase delays.</li>
                            <li>Watch nodes turn red as they run out of cash.</li>
                        </ul>
                    </div>
                </aside>

                {/* Graph Area */}
                <main className="flex-1 relative bg-slate-50 dark:bg-slate-950" ref={containerRef}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {dimensions.width > 0 && (
                            <LayeredGraph
                                nodes={state.nodes}
                                edges={state.edges}
                                width={dimensions.width}
                                height={dimensions.height}
                            />
                        )}
                    </div>

                    {/* Legend/Labels Overlay (Optional) */}
                    <div className="absolute left-4 bottom-4 flex flex-col gap-2 pointer-events-none opacity-50">
                        <div className="text-xs font-bold text-slate-500">MANUFACTURERS (Top)</div>
                        <div className="text-xs font-bold text-slate-500">WHOLESALERS</div>
                        <div className="text-xs font-bold text-slate-500">RETAILERS</div>
                        <div className="text-xs font-bold text-slate-500">CONSUMERS (Bottom)</div>
                    </div>
                </main>
            </div>
        </div>
    );
};
