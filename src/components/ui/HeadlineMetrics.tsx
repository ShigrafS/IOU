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
    <div className="flex flex-col gap-1 p-3 rounded-2xl bg-[#2c2c2e] transition-colors">
        <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground">{label}</span>
            <div className={cn("p-1 rounded-lg", colorClass)}>{icon}</div>
        </div>
        <div className="text-xl font-bold tracking-tight">{value}</div>
        {sublabel && <div className="text-[11px] text-muted-foreground">{sublabel}</div>}
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
        <div className={cn("grid grid-cols-2 gap-2.5", className)}>
            <MetricItem 
                label="% Defaulted"
                value={`${metrics.percentDefaulted}%`}
                icon={<AlertTriangle size={14} />}
                colorClass="bg-[#FF453A]/15 text-[#FF453A]"
                sublabel={metrics.percentDefaulted > 0 ? "Cascading failures" : "Safe levels"}
            />
            <MetricItem 
                label="First Default"
                value={metrics.timeToFirstDefault}
                icon={<Clock size={14} />}
                colorClass="bg-[#FF9F0A]/15 text-[#FF9F0A]"
                sublabel="Simulation Tick"
            />
            <MetricItem 
                label="System Stability"
                value={metrics.timeToCollapse}
                icon={<Activity size={14} />}
                colorClass={metrics.timeToCollapse === 'STABLE' ? "bg-[#30D158]/15 text-[#30D158]" : "bg-[#FF453A]/15 text-[#FF453A]"}
                sublabel="Collapse @ 25%"
            />
            <MetricItem 
                label="Buffer Strain"
                value={`${metrics.exhaustionRate}%`}
                icon={<TrendingDown size={14} />}
                colorClass="bg-primary/15 text-primary"
                sublabel="Liquidity Exhaustion"
            />
        </div>
    );
};
