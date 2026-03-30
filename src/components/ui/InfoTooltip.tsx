import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InfoTooltipProps {
    content: string;
    whyItMatters?: string;
    children?: React.ReactNode;
    className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ 
    content, 
    whyItMatters, 
    children, 
    className 
}) => {
    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button className={cn("inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors focus:outline-none", className)}>
                        {children || <Info size={14} />}
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="z-[100] max-w-xs animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 px-4 py-3 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl text-[11px] leading-relaxed select-none"
                        sideOffset={8}
                    >
                        <div className="space-y-2">
                            <p className="text-foreground font-medium">{content}</p>
                            {whyItMatters && (
                                <p className="text-muted-foreground border-t border-white/5 pt-2 italic">
                                    <span className="text-primary font-bold not-italic font-mono uppercase text-[9px] mr-1.5 underline decoration-primary/30">Why it matters:</span> 
                                    {whyItMatters}
                                </p>
                            )}
                        </div>
                        <Tooltip.Arrow className="fill-black/90" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};
