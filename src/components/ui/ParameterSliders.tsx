import React from 'react';
import { InfoTooltip } from './InfoTooltip';
import type { SimulationState } from '../../core/types';
import { cn } from '../../lib/utils';

interface ParameterSlidersProps {
    params: SimulationState['params'];
    onChange: (params: Partial<SimulationState['params']>) => void;
    className?: string;
}

interface SliderRowProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (val: number) => void;
    formatValue: (val: number) => string;
    tooltipContent: string;
    whyItMatters: string;
}

const SliderRow: React.FC<SliderRowProps> = ({
    label, value, min, max, step, onChange, formatValue, tooltipContent, whyItMatters
}) => (
    <div className="space-y-2.5 p-3 rounded-2xl bg-[#2c2c2e] transition-colors">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <label className="text-[13px] font-semibold text-foreground">{label}</label>
                <InfoTooltip content={tooltipContent} whyItMatters={whyItMatters} />
            </div>
            <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {formatValue(value)}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-1 bg-[#48484a] rounded-full appearance-none cursor-pointer outline-none accent-primary"
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
        </div>
    </div>
);

export const ParameterSliders: React.FC<ParameterSlidersProps> = ({ params, onChange, className }) => {
    return (
        <div className={cn("space-y-4", className)}>
            <h3 className="text-[13px] font-semibold text-muted-foreground px-1">Economic Mechanics</h3>
            
            <div className="space-y-2">
                <SliderRow
                    label="Transaction Velocity"
                    value={params.transactionProbability}
                    min={0.1} max={1.0} step={0.05}
                    onChange={(val) => onChange({ transactionProbability: val })}
                    formatValue={(val) => `${Math.round(val * 100)}%`}
                    tooltipContent="The chance a consumer initiates a new purchase every tick."
                    whyItMatters="High velocity creates a booming economy but forces buffers to operate near capacity, reducing safety margins."
                />
                
                <SliderRow
                    label="Base Delay Risk"
                    value={params.baseDelayProbability}
                    min={0} max={0.5} step={0.05}
                    onChange={(val) => onChange({ baseDelayProbability: val })}
                    formatValue={(val) => `${Math.round(val * 100)}%`}
                    tooltipContent="The background probability that any entity will casually delay their payment."
                    whyItMatters="When delays become normal (like 'Net 60' terms universally applied), systemic resilience drops."
                />
                
                <SliderRow
                    label="Standard Payment Term"
                    value={params.standardDelay}
                    min={1} max={10} step={1}
                    onChange={(val) => onChange({ standardDelay: val })}
                    formatValue={(val) => `${val} ticks`}
                    tooltipContent="How many ticks an entity has to clear their invoice before it's considered late."
                    whyItMatters="Longer terms act as a temporary liquidity bridge but hide cascading risks until the due dates arrive."
                />
            </div>
            
            <div className="pt-4 border-t border-border space-y-4">
                <h3 className="text-[13px] font-semibold text-[#FF453A] px-1">Shock Parameters</h3>
                
                <div className="space-y-2">
                    <SliderRow
                        label="Shock Risk Multiplier"
                        value={params.shockProbabilityIncrease}
                        min={0} max={0.8} step={0.1}
                        onChange={(val) => onChange({ shockProbabilityIncrease: val })}
                        formatValue={(val) => `+${Math.round(val * 100)}%`}
                        tooltipContent="How much the delay probability jumps when a liquidity shock is triggered."
                        whyItMatters="Simulates a panic where companies horde cash and stop paying vendors simultaneously."
                    />
                    
                    <SliderRow
                        label="Shock Term Extension"
                        value={params.shockDelayIncrease}
                        min={0} max={20} step={2}
                        onChange={(val) => onChange({ shockDelayIncrease: val })}
                        formatValue={(val) => `+${val} ticks`}
                        tooltipContent="The extra time forcibly added to payment terms during a crisis."
                        whyItMatters="Shows how 'stretching payables' pushes the insolvency risk directly up the supply chain."
                    />
                </div>
            </div>
        </div>
    );
};
