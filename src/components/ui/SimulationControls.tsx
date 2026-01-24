import React from 'react';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SimulationControlsProps {
    isRunning: boolean;
    onTogglePlay: () => void;
    onReset: () => void;
    onToggleShock: () => void;
    shockActive: boolean;
    className?: string;
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
        <div className={cn("flex flex-col gap-4 p-4 bg-card rounded-lg border shadow-sm", className)}>
            <h3 className="text-lg font-semibold text-foreground">Controls</h3>

            <div className="flex items-center gap-2">
                <button
                    onClick={onTogglePlay}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors",
                        isRunning ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                >
                    {isRunning ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Start</>}
                </button>

                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                    <RotateCcw size={18} /> Reset
                </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t">
                <label className="text-sm font-medium text-muted-foreground">Scenarios</label>
                <button
                    onClick={onToggleShock}
                    className={cn(
                        "flex items-center justify-between px-4 py-2 rounded-md border transition-all",
                        shockActive
                            ? "bg-destructive/10 border-destructive text-destructive"
                            : "bg-background border-input hover:bg-accent hover:text-accent-foreground"
                    )}
                >
                    <span className="flex items-center gap-2">
                        <Zap size={18} className={shockActive ? "fill-destructive" : ""} />
                        Liquidity Shock
                    </span>
                    <span className="text-xs font-mono uppercase">{shockActive ? 'ON' : 'OFF'}</span>
                </button>
                <p className="text-xs text-muted-foreground p-1">
                    {shockActive ? "Failures are cascading due to credit freeze." : "Normal market conditions."}
                </p>
            </div>
        </div>
    );
};
