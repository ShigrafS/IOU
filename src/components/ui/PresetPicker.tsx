import { presets } from '../../content/presets';
import type { Preset } from '../../content/presets';
import { cn } from '../../lib/utils';
import { MousePointer2, Thermometer, ShieldAlert, Zap } from 'lucide-react';

interface PresetPickerProps {
    onSelect: (preset: Preset) => void;
    activePresetId?: string;
    className?: string;
}

const PresetIcon = ({ id }: { id: string }) => {
    switch (id) {
        case 'default': return <ShieldAlert size={16} />;
        case 'late-pay': return <Thermometer size={16} />;
        case 'high-velocity': return <Zap size={16} />;
        case 'fragile': return <ShieldAlert size={16} />;
        default: return <MousePointer2 size={16} />;
    }
};

export const PresetPicker: React.FC<PresetPickerProps> = ({
    onSelect,
    activePresetId,
    className
}) => {
    return (
        <div className={cn("space-y-3", className)}>
            <div className="flex items-center justify-between px-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Scenario Presets</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => onSelect(preset)}
                        className={cn(
                            "flex flex-col items-start text-left p-3 rounded-xl border transition-all group",
                            activePresetId === preset.id
                                ? "bg-primary/10 border-primary shadow-[0_0_15px_-5px_rgba(var(--primary),0.4)]"
                                : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10"
                        )}
                    >
                        <div className="flex items-center gap-2 w-full mb-1">
                            <div className={cn(
                                "p-1.5 rounded-lg transition-colors",
                                activePresetId === preset.id ? "bg-primary text-primary-foreground" : "bg-white/10 text-muted-foreground group-hover:text-foreground"
                            )}>
                                <PresetIcon id={preset.id} />
                            </div>
                            <span className="text-sm font-bold tracking-tight">{preset.name}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-tight px-1">
                            {preset.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
