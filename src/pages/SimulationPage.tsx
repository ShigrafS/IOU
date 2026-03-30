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
        <div className="flex h-screen bg-background overflow-hidden">

            {/* Sidebar — macOS-style: solid elevated surface, clean borders */}
            <aside className="w-96 flex flex-col gap-5 p-5 border-r border-border bg-card z-20 overflow-y-auto">
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
                        <h2 className="text-[13px] font-semibold text-muted-foreground mb-4">Operations</h2>
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
                            className="mt-5 pt-5 border-t border-border"
                        />

                        <ParameterSliders
                            params={state.params}
                            onChange={setParams}
                            className="mt-5 pt-5 border-t border-border"
                        />
                    </div>
                )}

                <div className="flex-1 space-y-5">
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
                        className="w-full shadow-none border-0 bg-transparent p-0 opacity-60"
                    />
                </div>

                <div className="text-[11px] text-muted-foreground text-center border-t border-border pt-4">
                    IOU v3.0
                </div>
            </aside>

            {/* Main Graph Area */}
            <main className="flex-1 relative bg-background" ref={containerRef}>
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

                {/* Legend — clean Apple-style floating card */}
                <div className="absolute bottom-6 right-6 z-20 bg-card px-5 py-4 rounded-2xl border border-border flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 text-[11px] font-medium text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF453A]" /> Failed
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] font-medium text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFD60A]" /> Stressed
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px] font-medium text-muted-foreground">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Healthy
                    </div>
                </div>

                {/* Timeline Chart Overlay */}
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
