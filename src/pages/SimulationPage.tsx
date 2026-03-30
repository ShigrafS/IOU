import React, { useRef, useState, useEffect } from 'react';
import { useSimulation } from '../hooks/useSimulation';
import { LayeredGraph } from '../components/viz/LayeredGraph';
import { SimulationControls } from '../components/ui/SimulationControls';
import { MetricsDisplay } from '../components/ui/MetricsDisplay';
import { GuidedLessonPanel } from '../components/ui/GuidedLessonPanel';
import { PresetPicker } from '../components/ui/PresetPicker';
import { HeadlineMetrics } from '../components/ui/HeadlineMetrics';
import { ParameterSliders } from '../components/ui/ParameterSliders';
import { DefaultsTimeline } from '../components/viz/DefaultsTimeline';
import { lessons } from '../content/lessons';

export const SimulationPage: React.FC<{ 
    mode: 'guided' | 'sandbox', 
    lessonId?: string, 
    onNextLesson: (id: string) => void,
    onExit: () => void 
}> = ({ mode, lessonId, onNextLesson, onExit }) => {
    const { state, isRunning, setIsRunning, reset, applyPreset, setParams, toggleShock } = useSimulation();
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
                {mode === 'guided' && lessonId ? (
                    <GuidedLessonPanel
                        lesson={lessons.find(l => l.id === lessonId) || lessons[0]}
                        isRunning={isRunning}
                        onTogglePlay={() => setIsRunning(!isRunning)}
                        onReset={reset}
                        onNext={() => {
                            const currentIndex = lessons.findIndex(l => l.id === lessonId);
                            if (currentIndex < lessons.length - 1) {
                                onNextLesson(lessons[currentIndex + 1].id);
                            }
                        }}
                        onExit={onExit}
                        canNext={lessons.findIndex(l => l.id === lessonId) < lessons.length - 1}
                    />
                ) : (
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

                        <PresetPicker 
                            onSelect={applyPreset}
                            className="mt-6 pt-6 border-t border-white/10"
                        />

                        <ParameterSliders
                            params={state.params}
                            onChange={setParams}
                            className="mt-6 pt-6 border-t border-white/10"
                        />
                    </div>
                )}

                <div className="flex-1 space-y-6">
                    <HeadlineMetrics 
                        nodes={state.nodes}
                        history={state.history}
                        totalObligations={state.totalObligations}
                    />

                    <MetricsDisplay
                        totalObligations={state.totalObligations}
                        unsettledObligations={state.unsettledObligations}
                        failedNodes={state.failedNodes}
                        tick={state.tick}
                        className="w-full shadow-none border-0 bg-transparent p-0 opacity-50 contrast-50 grayscale scale-95 origin-top"
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
                <div className="absolute bottom-6 right-6 z-20 bg-background/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex flex-col gap-2 shadow-lg">
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

                {/* Timeline Chart Overlay (Bottom Left) */}
                <div className="absolute bottom-6 left-6 right-24 z-20 pointer-events-none">
                    <DefaultsTimeline 
                        data={state.history} 
                        className="pointer-events-auto max-w-xl"
                    />
                </div>
            </main>

        </div>
    );
};
