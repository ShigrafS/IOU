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
        <div className={cn("flex flex-col gap-6 p-6 bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl", className)}>
            <div className="flex items-center justify-between">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border border-white/5 rounded-full"
                >
                    <LogOut size={12} /> Exit Guided
                </button>
                <div className="text-[10px] uppercase font-bold tracking-widest text-primary px-2 py-1 bg-primary/10 rounded border border-primary/20">
                    Step {lesson.id.split('-')[1]}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-black tracking-tight leading-tight">{lesson.title}</h2>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                    {lesson.context}
                </p>
                
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Key Questions</h4>
                    <ul className="space-y-2">
                        {lesson.questions.map((q, i) => (
                            <li key={i} className="text-xs flex gap-3 text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1 shrink-0" />
                                {q}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 mt-auto">
                {!isRunning && (
                    <button
                        onClick={handleStartLesson}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                    >
                        <Play size={18} fill="currentColor" /> RUN LESSON
                    </button>
                )}

                {isRunning && (
                    <button
                        onClick={onTogglePlay}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl font-bold bg-amber-500/10 text-amber-500 border border-amber-500/50 hover:bg-amber-500/20 transition-all active:scale-95"
                    >
                        <Pause size={18} fill="currentColor" /> PAUSE LESSON
                    </button>
                )}

                <div className="flex gap-2">
                    <button
                        onClick={() => onReset(preset.params)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-white/5 border border-white/5 transition-all"
                    >
                        <RotateCcw size={14} /> RESTART
                    </button>

                    {canNext && (
                        <button
                            onClick={onNext}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-foreground text-background hover:bg-foreground/90 transition-all"
                        >
                            NEXT <ArrowRight size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Hint Box */}
            <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-primary/5 flex gap-3 items-start">
                <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-normal italic">
                    Tip: Watch the "Wholesaler" layer for the first signs of stress as supply chain lag builds up.
                </p>
            </div>
        </div>
    );
};
