import React from 'react';
import { ArrowRight, Clock, Layers, TrendingDown, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
    onStartGuided: () => void;
    onStartSandbox: () => void;
}

// Apple-style section with generous padding
const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-15%" }}
        className={`min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center ${className}`}
    >
        {children}
    </motion.div>
);

const DefinitionCard: React.FC<{ term: string; def: string; icon: React.ReactNode }> = ({ term, def, icon }) => (
    <motion.div
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
        className="p-8 rounded-3xl bg-card text-left transition-all duration-300 hover:bg-[#2c2c2e]"
    >
        <div className="mb-5 text-primary">{icon}</div>
        <h3 className="text-lg font-semibold mb-3 tracking-tight">{term}</h3>
        <p className="text-[15px] text-muted-foreground leading-relaxed">{def}</p>
    </motion.div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStartGuided, onStartSandbox }) => {
    return (
        <div className="bg-background text-foreground overflow-x-hidden selection:bg-primary/30">

            {/* 1. Hero — Apple style: massive text on pure black */}
            <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col items-center gap-6 max-w-4xl"
                >
                    {/* tiny pill badge */}
                    <div className="px-4 py-1.5 rounded-full bg-card text-muted-foreground text-[13px] font-medium tracking-wide">
                        IOU Simulation
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tight text-center leading-[0.95]">
                        Credit is<br />
                        <span className="text-primary">latency.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl text-center leading-relaxed font-normal mt-2">
                        We built a global economy on the promise of future money. 
                        It works until the synchronization breaks.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-8 flex flex-col items-center gap-3 text-muted-foreground"
                    >
                        <span className="text-[13px] tracking-wide">Scroll to explore</span>
                        <div className="w-[1px] h-10 bg-gradient-to-b from-muted-foreground to-transparent"></div>
                    </motion.div>
                </motion.div>
            </div>

            {/* 2. Vocabulary — Apple grid cards on black */}
            <Section>
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                        The vocabulary<br />of collapse.
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        Understanding the mechanics of a credit freeze requires new language.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl">
                    <DefinitionCard
                        icon={<Layers size={28} />}
                        term="Deferred Settlement"
                        def="The time gap between buying goods and actually paying for them. In this gap, the economy is borrowed."
                    />
                    <DefinitionCard
                        icon={<Clock size={28} />}
                        term="Temporal Displacement"
                        def="Credit allows us to pull future value into the present. This creates a debt obligation that must be synchronized."
                    />
                    <DefinitionCard
                        icon={<Zap size={28} />}
                        term="Systemic Contagion"
                        def="When one node fails to pay, its creditor becomes insolvent, spreading the failure across the network instantly."
                    />
                </div>
            </Section>

            {/* 3. Domino Effect — split section */}
            <Section>
                <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl w-full">
                    <div className="flex-1 text-left space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary">
                            <TrendingDown size={22} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Domino Effect</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            You are about to enter a simulation of a 4-tier supply chain.
                            <br /><br />
                            From <strong className="text-foreground">Consumers</strong> to <strong className="text-foreground">Manufacturers</strong>, watch how a simple
                            payment delay transforms from a minor inconvenience into a total liquidity freeze.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <div className="px-4 py-2 rounded-full bg-card text-[13px] font-medium text-foreground">Layer 1: Consumer</div>
                            <div className="px-4 py-2 rounded-full bg-card text-[13px] font-medium text-muted-foreground">Layer 4: Manufacturer</div>
                        </div>
                    </div>

                    <div className="flex-1 relative aspect-square max-w-md">
                        {/* Minimal abstract viz preview */}
                        <div className="relative w-full h-full bg-card rounded-3xl p-10 flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-10">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center relative">
                                        <div className={`w-3 h-3 rounded-full ${i === 3 ? 'bg-destructive animate-pulse' : 'bg-primary'}`}></div>
                                        {i < 4 && <div className="absolute w-[200%] h-[1px] bg-border top-1/2 left-1/2 -z-10 rotate-45 origin-left"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* 4. CTA — Apple style massive text + pill buttons */}
            <Section className="min-h-[70vh]">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
                    <span className="text-muted-foreground">Stability is</span><br />
                    an illusion.
                </h2>
                <p className="text-lg text-muted-foreground mb-12 max-w-md">
                    Run the simulation. See the cascade unfold.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={onStartGuided}
                        className="group inline-flex items-center justify-center px-8 py-4 text-[17px] font-semibold text-white bg-primary rounded-full hover:brightness-110 transition-all duration-300"
                    >
                        Guided Simulation
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={onStartSandbox}
                        className="group inline-flex items-center justify-center px-8 py-4 text-[17px] font-semibold text-primary bg-transparent border border-border rounded-full hover:bg-card transition-all duration-300"
                    >
                        Sandbox Mode
                        <Activity className="ml-2 w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </button>
                </div>
            </Section>

            <footer className="py-10 text-center text-[13px] text-muted-foreground border-t border-border">
                <p>IOU — Systemic Risk Division</p>
            </footer>
        </div>
    );
};
