import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
    content: string;
    whyItMatters?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, whyItMatters }) => {
    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button className="p-0.5 text-muted-foreground hover:text-foreground transition-colors">
                        <Info size={12} />
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="z-[100] max-w-xs px-4 py-3 bg-[#2c2c2e] border border-border rounded-2xl shadow-2xl text-[13px] leading-relaxed select-none animate-in fade-in zoom-in-95"
                        sideOffset={8}
                    >
                        <div className="space-y-2">
                            <p className="text-foreground">{content}</p>
                            {whyItMatters && (
                                <p className="text-muted-foreground border-t border-border pt-2">
                                    <span className="text-primary font-semibold text-[11px] mr-1">Why it matters:</span> 
                                    {whyItMatters}
                                </p>
                            )}
                        </div>
                        <Tooltip.Arrow className="fill-[#2c2c2e]" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};
