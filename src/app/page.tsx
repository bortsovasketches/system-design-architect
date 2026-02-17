'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronLeft, ChevronRight, Rocket } from 'lucide-react';
import Image from 'next/image';
import URLInput from '@/components/URLInput';
import ComplexitySlider from '@/components/ComplexitySlider';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import PromptAlchemist from '@/components/PromptAlchemist';
import PromptPlaylist from '@/components/PromptPlaylist';
import VibeCheck from '@/components/VibeCheck';
import CursorRulesGenerator from '@/components/CursorRulesGenerator';
import NarrativeRenderer from '@/components/NarrativeRenderer';
import EffortDashboard from '@/components/EffortDashboard';
import InteractiveWidget from '@/components/InteractiveWidget';
import ProductSideNav from '@/components/ProductSideNav';
import { SYSTEM_DESIGN_DATA, SYSTEM_ICONS, type DesignSystem, type DesignLevel } from '@/lib/data';
import { VibeLanguageProvider, useVibeLanguage } from '@/hooks/useVibeLanguage';
import VibeTerm from '@/components/VibeTerm';
import VibeGuide from '@/components/VibeGuide';
import SetupWizard from '@/components/SetupWizard';

function LanguageToggle() {
    const { language, setLanguage } = useVibeLanguage();

    return (
        <button
            onClick={() => setLanguage(language === 'tech' ? 'vibe' : 'tech')}
            className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-slate-800/80 backdrop-blur-md border border-white/10 p-1.5 rounded-full shadow-xl hover:scale-105 transition-transform"
        >
            <div className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${language === 'tech' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white'}`}>
                Tech
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${language === 'vibe' ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25' : 'text-slate-400 hover:text-white'}`}>
                Vibe
            </div>
        </button>
    );
}

export default function Home() {
    const [complexity, setComplexity] = useState<string>('eli5');
    const [activeData, setActiveData] = useState<DesignSystem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Vibe Coding State
    const [activeScopes, setActiveScopes] = useState<string[]>(['Auth', 'Database', 'Realtime', 'Analytics']);
    const [isWizardOpen, setIsWizardOpen] = useState(false);
    const [isVibeGuideOpen, setIsVibeGuideOpen] = useState(false);

    const handleSearch = async (query: string) => {
        setIsLoading(true);
        setSearchQuery(query);

        // Check if query is in static data first (fast path)
        const staticKey = Object.keys(SYSTEM_DESIGN_DATA).find(k => query.toLowerCase().includes(k));
        if (staticKey) {
            setActiveData(SYSTEM_DESIGN_DATA[staticKey]);
            setIsLoading(false);
            return;
        }

        // Real-time Analysis via API
        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: query })
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("API Error:", errorData);
                // Fallback to x.com if API fails (graceful degradation for demo)
                // In a real app, we'd show a toast notification here
                alert("AI Analysis Failed (Missing API Key?)\nFalling back to Demo Data.");
                setActiveData(SYSTEM_DESIGN_DATA['micro-blogging']);
            } else {
                const data = await res.json();
                setActiveData(data);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("Network Error during Analysis.\nFalling back to Demo Data.");
            setActiveData(SYSTEM_DESIGN_DATA['micro-blogging']);
        } finally {
            setIsLoading(false);
        }
    };

    const currentContent = activeData ? activeData[complexity as DesignLevel] : null;

    return (
        <VibeLanguageProvider>
            <main className="min-h-screen flex flex-col items-center justify-start p-4 md:p-12 relative overflow-hidden bg-slate-900 text-slate-50">
                <LanguageToggle />



                // ...

                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20 z-10 max-w-5xl px-6 relative mt-12"
                >
                    {/* Decorative Images (Floating Mood Board) - Pushed further out */}
                    <div className="absolute inset-0 pointer-events-none select-none overflow-visible -z-10 hidden lg:block">
                        {/* Top Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -100, rotate: -10 }}
                            animate={{ opacity: 0.4, x: 0, rotate: -6 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            className="absolute -top-12 -left-48 w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border border-white/5 opacity-60 mix-blend-screen"
                        >
                            <Image src="/images/vibe-1.png" alt="Vibe 1" fill className="object-cover" />
                        </motion.div>

                        {/* Top Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 100, rotate: 10 }}
                            animate={{ opacity: 0.4, x: 0, rotate: 6 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="absolute -top-4 -right-48 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border border-white/5 opacity-60 mix-blend-screen"
                        >
                            <Image src="/images/vibe-2.png" alt="Vibe 2" fill className="object-cover" />
                        </motion.div>

                        {/* Bottom Left */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: -5 }}
                            animate={{ opacity: 0.3, y: 0, rotate: -3 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute bottom-10 -left-64 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border border-white/5 opacity-40 mix-blend-screen"
                        >
                            <Image src="/images/vibe-3.png" alt="Vibe 3" fill className="object-cover scale-125" />
                        </motion.div>

                        {/* Bottom Right */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: 5 }}
                            animate={{ opacity: 0.3, y: 0, rotate: 3 }}
                            transition={{ delay: 0.7, duration: 1 }}
                            className="absolute -bottom-8 -right-40 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl border border-white/5 opacity-40 mix-blend-screen"
                        >
                            <Image src="/images/vibe-4.png" alt="Vibe 4" fill className="object-cover" />
                        </motion.div>
                    </div>

                    {/* Clean Logotype - Updated Hierarchy */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-[1px] w-12 bg-blue-500/50" />
                            <span className="text-blue-400 font-mono text-xs tracking-[0.2em] uppercase">System Design Architect</span>
                            <div className="h-[1px] w-12 bg-blue-500/50" />
                        </div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent pb-4">
                            VibePath
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed text-balance">
                            Develop your vibe-coder intuition by discovering <span className="text-blue-400 font-medium">architecture features</span>.
                        </p>
                    </div>

                    <div className="mt-12 flex justify-center gap-4">
                        <button
                            onClick={() => setIsVibeGuideOpen(true)}
                            className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-white/10 flex items-center gap-2 group"
                        >
                            <Rocket className="w-5 h-5 text-blue-600 group-hover:-translate-y-1 transition-transform" />
                            Tips to get started
                        </button>
                    </div>
                </motion.div>

                {/* Input Section - REMOVED */}
                {/* <URLInput onSearch={handleSearch} isLoading={isLoading} /> */}

                {/* Library Grid (Quick Picks) */}
                {!activeData && !isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-full max-w-6xl mt-12"
                    >
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-10 text-center">Select an Architecture Blueprint</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {Object.keys(SYSTEM_ICONS)
                                .filter(key => key !== 'default')
                                .map((key, index) => (
                                    <motion.button
                                        key={key}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSearch(key)}
                                        className="glass-panel group relative overflow-hidden p-6 md:p-10 hover:bg-slate-800/50 transition-all duration-500 hover:-translate-y-1 text-left flex flex-col justify-between h-40 md:h-48 border border-white/5 active:scale-95"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 flex items-center justify-center text-slate-400 shadow-lg group-hover:shadow-blue-500/20 border border-white/5">
                                            {(() => {
                                                const Icon = SYSTEM_ICONS[key] || SYSTEM_ICONS['default'];
                                                return <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />;
                                            })()}
                                        </span>
                                        <div>
                                            <span className="font-bold text-xl text-slate-200 capitalize group-hover:text-blue-400 transition-colors z-10 block mb-1">{key}</span>
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-blue-300">View System</span>
                                        </div>
                                    </motion.button>
                                ))}
                        </div>
                    </motion.div>
                )}

                {/* Results View */}
                <AnimatePresence mode="wait">
                    {currentContent && !isLoading && activeData && (
                        <motion.div
                            key={searchQuery}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full max-w-[1600px] mt-4 flex gap-8 pb-20 items-start"
                        >
                            {/* Side Navigation */}
                            <ProductSideNav currentSystem={searchQuery} onSelectSystem={handleSearch} />

                            {/* Main Content Area */}
                            <div className="flex-1 flex flex-col gap-8 min-w-0">
                                {/* Controls - Moved to Blueprint Header */}

                                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                                    {/* Left Column: Vibe Coding Tools (4 cols) */}
                                    <div className="xl:col-span-4 space-y-6">
                                        {/* Prompt Playlist - Replaces Single Prompt */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="space-y-4"
                                        >
                                            <PromptPlaylist
                                                systemName={searchQuery || 'System'}
                                                level={complexity}
                                                data={currentContent}
                                                scopes={activeScopes}
                                            />
                                        </motion.div>

                                        {/* Vibe Check (Combined Scope & Score) */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <VibeCheck
                                                scopes={activeScopes}
                                                onScopeChange={setActiveScopes}
                                                baseComplexity={complexity as any}
                                            />
                                        </motion.div>

                                        {/* Metrics Grid (Keeping for reference, maybe hide for ELI5?) */}
                                        {complexity !== 'eli5' && (
                                            <motion.div
                                                className="grid grid-cols-1 gap-3"
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0 },
                                                    visible: {
                                                        opacity: 1,
                                                        transition: {
                                                            staggerChildren: 0.1
                                                        }
                                                    }
                                                }}
                                            >
                                                {currentContent.metrics && Object.entries(currentContent.metrics).map(([key, val]) => (
                                                    <motion.div
                                                        key={key}
                                                        className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-white/5 flex items-center justify-between hover:bg-slate-800 transition-all group shadow-sm"
                                                        variants={{
                                                            hidden: { opacity: 0, y: 10 },
                                                            visible: { opacity: 1, y: 0 }
                                                        }}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <Activity className="w-4 h-4 text-slate-600 group-hover:text-blue-500 transition-colors" />
                                                            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">{key}</span>
                                                        </div>
                                                        <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">{val}</span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Right Column: Architecture Diagram (8 cols) */}
                                    <div className="xl:col-span-8 flex flex-col gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-slate-900/50 rounded-2xl border border-white/10 shadow-2xl shadow-black/50 min-h-[600px] flex flex-col overflow-hidden backdrop-blur-xl relative group ring-1 ring-white/5"
                                        >
                                            {/* Blueprint Header with Slider */}
                                            <div className="px-6 py-4 border-b border-white/5 bg-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex gap-1.5">
                                                        <div className="w-3 h-3 rounded-full bg-red-500/80 border border-white/5" />
                                                        <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-white/5" />
                                                        <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-white/5" />
                                                    </div>
                                                    <div className="h-4 w-[1px] bg-white/10" />

                                                    {/* Navigation Controls */}
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const systems = Object.keys(SYSTEM_ICONS).filter(k => k !== 'default');
                                                                const idx = systems.indexOf(searchQuery);
                                                                const prev = systems[idx - 1] || systems[systems.length - 1];
                                                                handleSearch(prev);
                                                            }}
                                                            className="p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
                                                        >
                                                            <ChevronLeft className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const systems = Object.keys(SYSTEM_ICONS).filter(k => k !== 'default');
                                                                const idx = systems.indexOf(searchQuery);
                                                                const next = systems[idx + 1] || systems[0];
                                                                handleSearch(next);
                                                            }}
                                                            className="p-1 rounded-md text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
                                                        >
                                                            <ChevronRight className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                                                        <span className="text-blue-400">{searchQuery}</span> Blueprint
                                                    </h3>
                                                </div>

                                                {/* Embedded Complexity Slider */}
                                                <div className="w-full md:w-auto scale-90 origin-right">
                                                    <ComplexitySlider value={complexity} onChange={setComplexity} />
                                                </div>
                                            </div>

                                            {/* Blueprint Background Pattern */}
                                            <div className="absolute inset-0 top-[80px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                                            <div className="flex-grow flex flex-col items-center justify-center p-8 z-10 gap-8">
                                                <ArchitectureDiagram chart={currentContent.diagram} />

                                                {/* Embedded System Narrative */}
                                                <div className="w-full border-t border-white/10 pt-8 mt-4">
                                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                                        <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                                        </div>
                                                        Key Points
                                                    </h3>
                                                    <div className="prose prose-invert prose-sm leading-relaxed text-slate-400 max-w-none">
                                                        <NarrativeRenderer
                                                            overview={currentContent.overview}
                                                            points={currentContent.points}
                                                            overview_tech={currentContent.overview_tech}
                                                            points_tech={currentContent.points_tech}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Interactive MVP Widget */}
                                                <div className="w-full border-t border-white/10 pt-8 mt-4">
                                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                                                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                        </div>
                                                        mini ui demo
                                                    </h3>
                                                    <div className="p-1">
                                                        <InteractiveWidget systemId={searchQuery} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>


                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <SetupWizard isOpen={isWizardOpen} onClose={() => setIsWizardOpen(false)} />
                <VibeGuide
                    isOpen={isVibeGuideOpen}
                    onClose={() => setIsVibeGuideOpen(false)}
                    onStartWizard={() => {
                        setIsVibeGuideOpen(false);
                        setIsWizardOpen(true);
                    }}
                />
            </main>
        </VibeLanguageProvider>
    );
}
