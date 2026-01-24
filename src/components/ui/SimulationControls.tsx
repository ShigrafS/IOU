import React from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ModeToggle } from './ModeToggle';

interface SimulationControlsProps {
    isRunning: boolean;
    onTogglePlay: () => void;
    onReset: () => void;
    onToggleShock: () => void;
    shockActive: boolean;
    className?: string; // Allow passing top-level class names
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
    isRunning,
    onTogglePlay,
    onReset,
    onToggleShock,
    shockActive,
    className
}) => {
    return (
        <div className={cn("flex flex-col gap-4 p-5 bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-80", className)}>
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Command</h3>
                <ModeToggle className="w-8 h-8 p-1.5" />
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onTogglePlay}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 shadow-lg",
                        isRunning
                            ? "bg-amber-500/10 text-amber-500 border border-amber-500/50 hover:bg-amber-500/20"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]"
                    )}
                >
                    {isRunning ? <><Pause size={18} /> PAUSE</> : <><Play size={18} /> START</>}
                </button>

                <button
                    onClick={onReset}
                    className="p-3 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5 transition-all"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Injection</label>
                </div>
                <button
                    onClick={onToggleShock}
                    className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 relative overflow-hidden group",
                        shockActive
                            ? "bg-destructive/20 border-destructive text-destructive shadow-[0_0_30px_-10px_rgba(239,68,68,0.4)]"
                            : "bg-secondary/30 border-transparent hover:bg-secondary/50 hover:text-foreground"
                    )}
                >
                    <div className={cn("absolute inset-0 bg-destructive/10 translate-y-full transition-transform duration-300", shockActive ? "translate-y-0" : "group-hover:translate-y-0")} />
                    <span className="flex items-center gap-2 relative z-10 font-medium">
                        <Zap size={18} className={shockActive ? "fill-destructive animate-pulse" : ""} />
                        Liquidity Shock
                    </span>
                    <span className={cn("text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-background/50 relative z-10 tracking-wider", shockActive ? "text-destructive" : "text-muted-foreground")}>
                        {shockActive ? 'ACTIVE' : 'READY'}
                    </span>
                </button>
                <p className="text-xs text-muted-foreground/80 leading-relaxed px-1">
                    {shockActive ? "CRITICAL: Cascading failures detected. Liquidity frozen." : "Normal market conditions. Payment flows nominal."}
                </p>
            </div>
        </div>
    );
};
