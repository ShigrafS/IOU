import React from 'react';
import { ArrowRight, Clock, Layers, TrendingDown, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
    onStart: () => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-20%" }}
        className={`min-h-screen flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
        {children}
    </motion.div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="bg-background text-foreground overflow-x-hidden">

            {/* 1. Hero */}
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
                {/* Abstract Background Gradient */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.03]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="z-10 flex flex-col items-center gap-6 max-w-4xl"
                >
                    <span className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wider uppercase animate-pulse">
                        Hackonomics 2026
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-balance">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Borrowed</span> Economy
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl text-balance leading-relaxed">
                        Every transaction is a promise. Every promise is a risk.<br />
                        See what happens when the promises stop being kept.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-10 animate-bounce text-muted-foreground"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll to breakdown</span>
                        <TrendingDown className="mx-auto mt-2 w-5 h-5 opacity-50" />
                    </motion.div>
                </motion.div>
            </div>

            {/* 2. Theory: The Layers */}
            <Section className="bg-slate-950/50">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/20">
                    <Layers className="text-white w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Chain of Promises</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    In a modern economy, payments are rarely immediate.
                    <span className="block mt-4 text-foreground font-semibold">
                        Consumers pay with Credit Cards.<br />
                        Retailers pay with Net-30 Invoices.<br />
                        Wholesalers pay with Commercial Paper.
                    </span>
                </p>
                <div className="mt-12 flex flex-col md:flex-row gap-4 opacity-75">
                    {['Consumer', 'Retailer', 'Wholesaler', 'Manufacturer'].map((item, i) => (
                        <div key={item} className="flex items-center gap-2">
                            <div className="px-6 py-3 rounded-lg border bg-slate-900 border-slate-800 text-slate-300 font-mono text-sm">
                                {item}
                            </div>
                            {i < 3 && <ArrowRight className="text-slate-600 w-4 h-4" />}
                        </div>
                    ))}
                </div>
            </Section>

            {/* 3. Theory: The Delay */}
            <Section>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-8 shadow-2xl shadow-amber-500/20">
                    <Clock className="text-white w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Time is Risk</h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    Every layer operates on the <em>assumption</em> that future money is as good as present money.
                    But when a payment is delayed at the bottom, the liquidity void travels up... fast.
                </p>
                <div className="mt-8 p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-400 max-w-lg text-left">
                    <h4 className="font-bold flex items-center gap-2 mb-2"><Info size={16} /> The Insight</h4>
                    <p className="text-sm opacity-90">
                        Economic collapse doesn't always come from a loss of value.
                        Often, it comes from a **loss of synchronization**. If everyone delays by 1 day, the system halts.
                    </p>
                </div>
            </Section>

            {/* 4. CTA */}
            <Section className="bg-gradient-to-b from-transparent to-blue-950/20 min-h-[70vh]">
                <h2 className="text-5xl md:text-7xl font-bold mb-8">Do Not Trust. Verify.</h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
                    Run the simulation. Trigger a payment shock. Watch the economy freeze.
                </p>

                <button
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)] hover:scale-105"
                >
                    Launch Simulator
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </Section>

            <footer className="py-8 text-center text-xs text-muted-foreground border-t border-white/5">
                <p>Built for Hackonomics 2026. A study in systemic fragility.</p>
            </footer>
        </div>
    );
};
