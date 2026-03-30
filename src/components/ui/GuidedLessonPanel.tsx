import { Play, Pause, RotateCcw, ArrowRight, LogOut, CheckCircle2 } from 'lucide-react';
import type { Lesson } from '../../content/lessons';
import { presets } from '../../content/presets';
import { cn } from '../../lib/utils';

interface GuidedLessonPanelProps {
    lesson: Lesson;
    isRunning: boolean;
    onTogglePlay: () => void;
    onReset: (paramsOverride?: any) => void;
    onNext: () => void;
    onExit: () => void;
    canNext: boolean;
    className?: string;
}

export const GuidedLessonPanel: React.FC<GuidedLessonPanelProps> = ({
    lesson,
    isRunning,
    onTogglePlay,
    onReset,
    onNext,
    onExit,
    canNext,
    className
}) => {
    const preset = presets.find(p => p.id === lesson.presetId) || presets[0];

    const handleStartLesson = () => {
        onReset(preset.params);
        onTogglePlay();
    };

    return (
        <div className={cn("flex flex-col gap-5", className)}>
            <div className="flex items-center justify-between">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-full border border-border"
                >
                    <LogOut size={12} /> Exit Guided
                </button>
                <div className="text-[11px] font-semibold text-primary px-3 py-1 bg-primary/10 rounded-full">
                    Step {lesson.id.split('-')[1]}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight leading-tight">{lesson.title}</h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {lesson.context}
                </p>
                
                <div className="rounded-2xl bg-[#2c2c2e] p-4 space-y-3">
                    <h4 className="text-[11px] font-semibold text-muted-foreground">Key Questions</h4>
                    <ul className="space-y-2.5">
                        {lesson.questions.map((q, i) => (
                            <li key={i} className="text-[13px] flex gap-3 text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border mt-auto">
                {!isRunning && (
                    <button
                        onClick={handleStartLesson}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-semibold text-[15px] bg-primary text-white transition-all active:scale-[0.97]"
                    >
                        <Play size={18} fill="currentColor" /> Run Lesson
                    </button>
                )}

                {isRunning && (
                    <button
                        onClick={onTogglePlay}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-semibold text-[15px] bg-[#FF9F0A]/15 text-[#FF9F0A] border border-[#FF9F0A]/30 transition-all active:scale-[0.97]"
                    >
                        <Pause size={18} fill="currentColor" /> Pause Lesson
                    </button>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={() => onReset(preset.params)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-[13px] font-semibold text-muted-foreground hover:text-foreground hover:bg-[#2c2c2e] transition-all"
                    >
                        <RotateCcw size={14} /> Restart
                    </button>

                    {canNext && (
                        <button
                            onClick={onNext}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-[13px] font-semibold bg-foreground text-background transition-all"
                        >
                            Next <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Hint */}
            <div className="p-4 rounded-2xl bg-primary/8 border border-primary/15 flex gap-3 items-start">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Watch the Wholesaler layer for the first signs of stress as supply chain lag builds up.
                </p>
            </div>
        </div>
    );
};
