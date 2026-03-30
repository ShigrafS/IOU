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
    // If no data, show nothing or placeholder
    if (data.length < 2) {
        return (
            <div className={`flex items-center justify-center bg-black/20 border border-white/5 rounded-xl h-32 ${className}`}>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest animate-pulse">Waiting for simulation data...</span>
            </div>
        );
    }

    return (
        <div className={`bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 h-48 shadow-2xl ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Systemic Failure Timeline</h3>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                        <span className="text-[9px] uppercase font-bold text-muted-foreground">Defaults</span>
                    </div>
                </div>
            </div>
            
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis 
                        dataKey="tick" 
                        hide 
                    />
                    <YAxis 
                        hide 
                        domain={[0, 'dataMax + 2']} 
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#000', 
                            border: '1px solid #ffffff20', 
                            borderRadius: '8px',
                            fontSize: '10px',
                            color: '#fff'
                        }}
                        itemStyle={{ color: '#ef4444' }}
                        labelStyle={{ display: 'none' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="failedNodes" 
                        stroke="#ef4444" 
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
