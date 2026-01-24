import React from 'react';
import { ArrowRight, Activity, Layers, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface LandingPageProps {
    onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">

            {/* Background decoration */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05]" />
            </div>

            <div className="z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-8">

                {/* Header */}
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-wider uppercase text-sm">
                        <Activity size={16} /> Hackonomics 2026 Project
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance">
                        We Live in a <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                            Borrowed World
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
                        Modern economies run on deferred payments. See how a single delay can cascade through the system and trigger a collapse.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                    <div className="p-6 bg-card rounded-xl border shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <Layers size={20} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Layered Economy</h3>
                        <p className="text-sm text-muted-foreground">
                            From consumers to manufacturers, everyone buys now and pays later.
                        </p>
                    </div>

                    <div className="p-6 bg-card rounded-xl border shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                            <Activity size={20} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Hidden Fragility</h3>
                        <p className="text-sm text-muted-foreground">
                            Liquidity buffers hide the risk until the moment they are breached.
                        </p>
                    </div>

                    <div className="p-6 bg-card rounded-xl border shadow-sm hover:border-primary/50 transition-colors group">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                            <AlertTriangle size={20} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Systemic Collapse</h3>
                        <p className="text-sm text-muted-foreground">
                            Watch how one delay creates a contagion that freezes the entire network.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <button
                        onClick={onStart}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Start Simulation
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>

            <div className="absolute bottom-4 text-xs text-muted-foreground">
                Built for Hackonomics &bull; Interactive Credit Network Model
            </div>
        </div>
    );
};
