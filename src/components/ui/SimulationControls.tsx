import React from 'react';
import { Play, Pause, RotateCcw, Zap, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SimulationControlsProps {
    isRunning: boolean;
    onTogglePlay: () => void;
    onReset: () => void;
    onToggleShock: () => void;
    shockActive: boolean;
    onExit: () => void;
    className?: string;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
    isRunning,
    onTogglePlay,
    onReset,
    onToggleShock,
    shockActive,
    onExit,
    className
}) => {
    return (
        <div className={cn("flex flex-col gap-4 w-full", className)}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onExit}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                        title="Exit Simulation"
                    >
                        <LogOut size={16} />
                    </button>
                    <h3 className="text-[13px] font-semibold text-muted-foreground">Command</h3>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onTogglePlay}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-[15px] transition-all duration-200 active:scale-[0.97]",
                        isRunning
                            ? "bg-[#FF9F0A]/15 text-[#FF9F0A] border border-[#FF9F0A]/30"
                            : "bg-primary text-white"
                    )}
                >
                    {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
                </button>

                <button
                    onClick={onReset}
                    className="p-3 rounded-xl bg-[#2c2c2e] text-foreground hover:bg-[#3a3a3c] transition-colors"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
                <label className="text-[13px] font-semibold text-muted-foreground">Injection</label>
                <button
                    onClick={onToggleShock}
                    className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200",
                        shockActive
                            ? "bg-[#FF453A]/15 border-[#FF453A]/30 text-[#FF453A]"
                            : "bg-[#2c2c2e] border-transparent hover:bg-[#3a3a3c] text-foreground"
                    )}
                >
                    <span className="flex items-center gap-2 font-medium text-[15px]">
                        <Zap size={18} className={shockActive ? "fill-[#FF453A]" : ""} />
                        Liquidity Shock
                    </span>
                    <span className={cn(
                        "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                        shockActive ? "bg-[#FF453A]/20 text-[#FF453A]" : "bg-[#48484a] text-muted-foreground"
                    )}>
                        {shockActive ? 'Active' : 'Ready'}
                    </span>
                </button>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {shockActive ? "Cascading failures detected. Liquidity frozen." : "Normal market conditions. Payment flows nominal."}
                </p>
            </div>
        </div>
    );
};
