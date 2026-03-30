import React from 'react';
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid 
} from 'recharts';

interface DefaultsTimelineProps {
    data: Array<{
        tick: number;
        failedNodes: number;
        totalObligations: number;
    }>;
    className?: string;
}

export const DefaultsTimeline: React.FC<DefaultsTimelineProps> = ({ data, className }) => {
    if (data.length < 2) {
        return (
            <div className={`flex items-center justify-center bg-card rounded-2xl h-32 border border-border ${className}`}>
                <span className="text-[13px] text-muted-foreground">Waiting for simulation data…</span>
            </div>
        );
    }

    return (
        <div className={`bg-card rounded-2xl p-4 h-48 border border-border ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[13px] font-semibold text-muted-foreground">Failure Timeline</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#FF453A]" />
                        <span className="text-[11px] text-muted-foreground">Defaults</span>
                    </div>
                </div>
            </div>
            
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF453A" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF453A" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#38383a" />
                    <XAxis dataKey="tick" hide />
                    <YAxis hide domain={[0, 'dataMax + 2']} />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1c1c1e', 
                            border: '1px solid #38383a', 
                            borderRadius: '12px',
                            fontSize: '13px',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#FF453A' }}
                        labelStyle={{ display: 'none' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="failedNodes" 
                        stroke="#FF453A" 
                        fillOpacity={1} 
                        fill="url(#colorFailed)" 
                        strokeWidth={2}
                        animationDuration={300}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
