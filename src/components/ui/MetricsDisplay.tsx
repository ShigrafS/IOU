import React from 'react';
import { cn } from '../../lib/utils';

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
        <div className={cn("grid grid-cols-2 gap-4 p-4 bg-card rounded-lg border shadow-sm", className)}>
            <div className="col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Unsettled Payment Ratio</h3>
                <div className="flex items-end gap-2 mt-1">
                    <span className={cn(
                        "text-3xl font-bold font-mono transition-colors",
                        upr > 0.6 ? "text-destructive" : upr > 0.3 ? "text-yellow-500" : "text-green-500"
                    )}>
                        {(upr * 100).toFixed(1)}%
                    </span>
                    <span className="text-sm text-muted-foreground mb-1">of debt is overdue</span>
                </div>

                {/* Simple visual bar */}
                <div className="w-full h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-300", upr > 0.6 ? "bg-destructive" : upr > 0.3 ? "bg-yellow-500" : "bg-green-500")}
                        style={{ width: `${Math.min(upr * 100, 100)}%` }}
                    />
                </div>
            </div>

            <div className="col-span-1">
                <h3 className="text-xs font-medium text-muted-foreground">Failed Nodes</h3>
                <span className={cn("text-xl font-bold", failedNodes > 0 ? "text-destructive" : "text-foreground")}>
                    {failedNodes}
                </span>
            </div>

            <div className="col-span-1">
                <h3 className="text-xs font-medium text-muted-foreground">Time Step</h3>
                <span className="text-xl font-bold font-mono text-foreground">
                    {tick}
                </span>
            </div>

            <div className="col-span-2 text-xs text-muted-foreground mt-2 border-t pt-2">
                Total Obligations: ${totalObligations.toLocaleString()}
            </div>
        </div>
    );
};
