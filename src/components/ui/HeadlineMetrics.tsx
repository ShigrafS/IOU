import React, { useMemo } from 'react';
import { TrendingDown, Clock, Activity, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MetricItemProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string;
    sublabel?: string;
}

const MetricItem = ({ label, value, icon, colorClass, sublabel }: MetricItemProps) => (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/5">
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
            <div className={cn("p-1 rounded-md", colorClass)}>{icon}</div>
        </div>
        <div className="text-xl font-black tracking-tighter">{value}</div>
        {sublabel && <div className="text-[9px] text-muted-foreground italic font-medium">{sublabel}</div>}
    </div>
);

interface HeadlineMetricsProps {
    nodes: any[];
    history: any[];
    totalObligations: number;
    className?: string;
}

export const HeadlineMetrics: React.FC<HeadlineMetricsProps> = ({ nodes, history = [], totalObligations, className }) => {
    const metrics = useMemo(() => {
        const totalCount = nodes.length || 1;
        const failedCount = nodes.filter(n => n.status === 'FAILED').length;
        const stressedCount = nodes.filter(n => n.status === 'STRESSED').length;

        const percentDefaulted = Math.round((failedCount / totalCount) * 100);
        const exhaustionRate = Math.round(((failedCount + stressedCount) / totalCount) * 100);

        const firstDefaultEntry = history.find(h => h.failedNodes > 0);
        const timeToFirstDefault = firstDefaultEntry ? firstDefaultEntry.tick : 'N/A';

        // Collapse threshold: 25%
        const collapseEntry = history.find(h => (h.failedNodes / totalCount) >= 0.25);
        const timeToCollapse = collapseEntry ? collapseEntry.tick : 'STABLE';

        return {
            percentDefaulted,
            exhaustionRate,
            timeToFirstDefault,
            timeToCollapse,
            totalObligations: (totalObligations / 1000).toFixed(1) + 'k'
        };
    }, [nodes, history, totalObligations]);

    return (
        <div className={cn("grid grid-cols-2 gap-3", className)}>
            <MetricItem 
                label="% Defaulted"
                value={`${metrics.percentDefaulted}%`}
                icon={<AlertTriangle size={14} />}
                colorClass="bg-red-500/10 text-red-500"
                sublabel={metrics.percentDefaulted > 0 ? "Cascading failures" : "Safe levels"}
            />
            <MetricItem 
                label="First Default"
                value={metrics.timeToFirstDefault}
                icon={<Clock size={14} />}
                colorClass="bg-amber-500/10 text-amber-500"
                sublabel="Simulation Tick"
            />
            <MetricItem 
                label="System Stability"
                value={metrics.timeToCollapse}
                icon={<Activity size={14} />}
                colorClass={metrics.timeToCollapse === 'STABLE' ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}
                sublabel="Collapse @ 25%"
            />
            <MetricItem 
                label="Buffer Strain"
                value={`${metrics.exhaustionRate}%`}
                icon={<TrendingDown size={14} />}
                colorClass="bg-blue-500/10 text-blue-500"
                sublabel="Liquidity Exhaustion"
            />
        </div>
    );
};
