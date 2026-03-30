import React from 'react';
import { cn } from '../../lib/utils';
import { TrendingUp, AlertOctagon } from 'lucide-react';

interface MetricsDisplayProps {
    totalObligations: number;
    unsettledObligations: number;
    failedNodes: number;
    tick: number;
    className?: string;
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
        <div className={cn("flex flex-col gap-4 w-full", className)}>
            <h3 className="text-[13px] font-semibold text-muted-foreground">Telemetry</h3>

            <div className="space-y-4">
                {/* UPR Meter */}
                <div className="p-4 rounded-2xl bg-[#2c2c2e]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] text-muted-foreground font-medium">Delay Ratio</span>
                        <TrendingUp size={14} className={upr > 0.3 ? "text-[#FFD60A]" : "text-[#30D158]"} />
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className={cn(
                            "text-4xl font-bold tracking-tight transition-colors",
                            upr > 0.6 ? "text-[#FF453A]" : upr > 0.3 ? "text-[#FFD60A]" : "text-[#30D158]"
                        )}>
                            {(upr * 100).toFixed(0)}
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">%</span>
                    </div>

                    <div className="w-full h-1 bg-[#48484a] rounded-full mt-3 overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-500 ease-out rounded-full",
                                upr > 0.6 ? "bg-[#FF453A]" : upr > 0.3 ? "bg-[#FFD60A]" : "bg-[#30D158]"
                            )}
                            style={{ width: `${Math.min(upr * 100, 100)}%` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-[#2c2c2e]">
                        <div className="flex items-center gap-1.5 mb-1 text-muted-foreground">
                            <AlertOctagon size={12} />
                            <span className="text-[11px] font-semibold">Insolvent</span>
                        </div>
                        <span className={cn("text-2xl font-bold block", failedNodes > 0 ? "text-[#FF453A]" : "text-foreground")}>
                            {failedNodes}
                        </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#2c2c2e]">
                        <div className="flex items-center gap-1.5 mb-1 text-muted-foreground">
                            <span className="text-[11px] font-semibold">Tick</span>
                        </div>
                        <span className="text-2xl font-bold text-foreground block">
                            {tick}
                        </span>
                    </div>
                </div>

                <div className="text-[11px] text-center text-muted-foreground pt-3 border-t border-border">
                    Total Volume: ${totalObligations.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
