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
                setDimensions({ width, height });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-screen h-screen bg-background overflow-hidden flex flex-col items-center justify-center">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            {/* Main Graph Canvas */}
            <div ref={containerRef} className="absolute inset-0 z-0">
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

            {/* Floating UI: Controls (Top Left) */}
            <div className="absolute top-6 left-6 z-10 w-80">
                <SimulationControls
                    isRunning={isRunning}
                    onTogglePlay={() => setIsRunning(!isRunning)}
                    onReset={reset}
                    onToggleShock={toggleShock}
                    shockActive={state.params.shockActive}
                />
            </div>

            {/* Floating UI: Metrics (Top Right) */}
            <div className="absolute top-6 right-6 z-10 w-80">
                <MetricsDisplay
                    totalObligations={state.totalObligations}
                    unsettledObligations={state.unsettledObligations}
                    failedNodes={state.failedNodes}
                    tick={state.tick}
                />
            </div>

            {/* Legend / Status Bar (Bottom Center) */}
            <div className="absolute bottom-6 z-10 bg-background/50 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex gap-6 text-[10px] uppercase font-bold tracking-widest text-muted-foreground shadow-lg">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Failed</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Stressed</span>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-violet-500" /> Healthy</span>
            </div>

        </div>
    );
};
