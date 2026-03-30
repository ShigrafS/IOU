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
            <h3 className="text-[13px] font-semibold text-muted-foreground px-1">Scenario Presets</h3>
            <div className="grid grid-cols-1 gap-2">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => onSelect(preset)}
                        className={cn(
                            "flex flex-col items-start text-left p-3 rounded-2xl border transition-all group",
                            activePresetId === preset.id
                                ? "bg-primary/10 border-primary/30"
                                : "bg-[#2c2c2e] border-transparent hover:bg-[#3a3a3c]"
                        )}
                    >
                        <div className="flex items-center gap-2.5 w-full mb-1">
                            <div className={cn(
                                "p-1.5 rounded-lg transition-colors",
                                activePresetId === preset.id ? "bg-primary text-white" : "bg-[#48484a] text-muted-foreground group-hover:text-foreground"
                            )}>
                                <PresetIcon id={preset.id} />
                            </div>
                            <span className="text-[15px] font-semibold tracking-tight">{preset.name}</span>
                        </div>
                        <p className="text-[13px] text-muted-foreground leading-relaxed pl-1">
                            {preset.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
