import React from 'react';
import { cn } from '../../lib/utils';
import { TrendingUp, AlertOctagon } from 'lucide-react';

interface MetricsDisplayProps {
    totalObligations: number;
    unsettledObligations: number;
    failedNodes: number;
    tick: number;
    className?: string; // Allow passing top-level class names
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
    totalObligations,
    unsettledObligations,
    failedNodes,
    tick,
    className
}) => {
    const upr = totalObligations > 0 ? unsettledObligations / totalObligations : 0;

    return (
        <div className={cn("flex flex-col gap-4 p-5 bg-background/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl w-80", className)}>
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Telemetry</h3>

            <div className="space-y-4">
                {/* UPR Meter */}
                <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-medium">Delay Ratio</span>
                        <TrendingUp size={14} className={upr > 0.3 ? "text-yellow-500" : "text-green-500"} />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className={cn(
                            "text-4xl font-black font-mono tracking-tighter transition-colors",
                            upr > 0.6 ? "text-destructive" : upr > 0.3 ? "text-yellow-500" : "text-green-500"
                        )}>
                            {(upr * 100).toFixed(0)}
                        </span>
                        <span className="text-sm font-bold text-muted-foreground">%</span>
                    </div>

                    <div className="w-full h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-500 ease-out shadow-[0_0_10px_currentColor]",
                                upr > 0.6 ? "bg-destructive text-destructive" : upr > 0.3 ? "bg-yellow-500 text-yellow-500" : "bg-green-500 text-green-500"
                            )}
                            style={{ width: `${Math.min(upr * 100, 100)}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="flex items-center gap-1.5 mb-1 text-muted-foreground">
                            <AlertOctagon size={12} />
                            <span className="text-[10px] uppercase font-bold">Insolvent</span>
                        </div>
                        <span className={cn("text-2xl font-bold font-mono block", failedNodes > 0 ? "text-destructive animate-pulse" : "text-foreground")}>
                            {failedNodes}
                        </span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                        <div className="flex items-center gap-1.5 mb-1 text-muted-foreground">
                            <span className="text-[10px] uppercase font-bold">Tick</span>
                        </div>
                        <span className="text-2xl font-bold font-mono text-foreground block">
                            {tick}
                        </span>
                    </div>
                </div>

                <div className="text-[10px] font-mono text-center text-muted-foreground/60 pt-2 border-t border-white/5">
                    TOTAL VOLUME: ${totalObligations.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
