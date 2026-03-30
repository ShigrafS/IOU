import React from 'react';
import { ArrowRight, Clock, Layers, TrendingDown, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { ModeToggle } from '../components/ui/ModeToggle';

interface LandingPageProps {
    onStartGuided: () => void;
    onStartSandbox: () => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20%" }}
        className={`min-h-screen flex flex-col items-center justify-center p-8 text-center relative z-10 ${className}`}
    >
        {children}
    </motion.div>
);

const DefinitionCard: React.FC<{ term: string; def: string; icon: React.ReactNode }> = ({ term, def, icon }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl text-left hover:border-primary/50 transition-colors"
    >
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-2 font-mono">{term}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{def}</p>
    </motion.div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGuided, onStartSandbox }) => {
    return (
        <div className="bg-background text-foreground overflow-x-hidden font-sans selection:bg-primary/30">

            {/* Navigation / Toggle */}
            <div className="fixed top-6 right-6 z-50">
                <ModeToggle />
            </div>

            {/* 1. Hero */}
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
                {/* Abstract Background Gradient */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="z-10 flex flex-col items-center gap-8 max-w-5xl"
                >
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium tracking-wider uppercase backdrop-blur-sm">
                        <Activity size={14} /> Hackonomics 2026
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground to-foreground/50 drop-shadow-sm text-center">
                        CREDIT <br /> IS LATENCY.
                    </h1>

                    <p className="text-2xl md:text-3xl text-muted-foreground/90 max-w-3xl text-center leading-relaxed font-light">
                        We built a global economy on the promise of future money.<br />
                        <span className="text-foreground font-medium">It works until the synchronization breaks.</span>
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 flex flex-col items-center gap-2 opacity-50"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em]">Explore the system</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent"></div>
                    </motion.div>
                </motion.div>
            </div>

            {/* 2. The Vocabulary of Collapse */}
            <Section>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">The Vocabulary of Collapse</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Understanding the mechanics of a credit freeze requires new language.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                    <DefinitionCard
                        icon={<Layers size={32} />}
                        term="DEFERRED SETTLEMENT"
                        def="The time gap between buying goods and actually paying for them. In this gap, the economy is 'borrowed'."
                    />
                    <DefinitionCard
                        icon={<Clock size={32} />}
                        term="TEMPORAL DISPLACEMENT"
                        def="Credit allows us to pull future value into the present. This creates a debt obligation that must be synchronized."
                    />
                    <DefinitionCard
                        icon={<Zap size={32} />}
                        term="SYSTEMIC CONTAGION"
                        def="When one node fails to pay, its creditor becomes insolvent, spreading the failure across the network instantly."
                    />
                </div>
            </Section>

            {/* 3. The Visual Insight */}
            <Section className="bg-gradient-to-b from-transparent to-black/40">
                <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
                    <div className="flex-1 text-left space-y-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                            <TrendingDown size={24} />
                        </div>
                        <h2 className="text-5xl font-bold tracking-tight">The Domino Effect</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            You are about to enter a simulation of a 4-tier supply chain.
                            <br /><br />
                            From <strong>Consumers</strong> to <strong>Manufacturers</strong>, watch how a simple
                            payment delay transforms from a minor inconvenience into a total liquidity freeze.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="px-4 py-2 rounded border border-white/10 bg-white/5 text-sm font-mono">Layer 1: Consumer</div>
                            <div className="px-4 py-2 rounded border border-white/10 bg-white/5 text-sm font-mono opacity-60">Layer 4: Access Denied</div>
                        </div>
                    </div>

                    <div className="flex-1 relative aspect-square">
                        {/* CSS Abstract Art representing interconnected nodes */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="relative z-10 w-full h-full border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-8 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-8 active-graph-preview">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-16 h-16 rounded-full border-2 border-primary/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(var(--primary),0.5)]">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                                        {i < 4 && <div className="absolute w-[200%] h-[2px] bg-primary/30 top-1/2 left-1/2 -z-10 rotate-45 origin-left"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 4. CTA */}
            <Section className="min-h-[60vh]">
                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                    <span className="text-muted-foreground opacity-50">STABILITY IS</span><br />
                    AN ILLUSION.
                </h2>

                <div className="flex flex-col md:flex-row gap-6 mt-8">
                    <button
                        onClick={onStartGuided}
                        className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-primary-foreground transition-all duration-300 bg-primary rounded-xl hover:bg-primary/90 shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.7)] hover:-translate-y-1"
                    >
                        Guided Simulation
                        <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button
                        onClick={onStartSandbox}
                        className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-foreground transition-all duration-300 bg-transparent border-2 border-primary/50 rounded-xl hover:bg-primary/10 hover:-translate-y-1"
                    >
                        Sandbox Mode
                        <Activity className="ml-3 w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </Section>

            <footer className="py-12 text-center text-sm text-muted-foreground border-t border-white/5 bg-black/20 backdrop-blur-lg">
                <p className="font-mono">Hackonomics 2026 // Systemic Risk Division</p>
            </footer>
        </div>
    );
};
