'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, MessageSquare, Clock, Hammer, BookOpen, Rocket, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface VibeGuideProps {
    isOpen: boolean;
    onClose: () => void;
    onStartWizard: () => void;
}

const TIPS = [
    {
        id: 'api-keys',
        title: 'Treat API Keys With Care',
        icon: Key,
        color: 'text-amber-400',
        action: {
            label: 'Get OpenAI Keys',
            url: 'https://platform.openai.com/api-keys',
            icon: ExternalLink
        },
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">
                    An API key is essentially a <span className="text-amber-400 font-bold">digital credit card</span>.
                </p>
                <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-sm text-amber-200/80">
                    <p className="italic">You're paying for the generations that other users will create using your app if your api key is tied to it.</p>
                </div>
                <p className="text-xs text-slate-400">
                    Never commit keys to public repositories. Use environment variables (<code>.env</code>) to keep them safe.
                </p>
            </div>
        )
    },
    {
        id: 'chatbot-plus',
        title: 'The "Chatbot Plus" Test',
        icon: MessageSquare,
        color: 'text-blue-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">
                    Before vibing out a full app, ask yourself:
                </p>
                <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl text-center">
                    <h3 className="text-lg font-bold text-blue-300 mb-2">🤖 + ?</h3>
                    <p className="text-sm text-blue-200/80">
                        What does this do that I couldn’t just do by talking directly to a chatbot?
                    </p>
                </div>
                <p className="text-xs text-slate-400">
                    If the answer is nothing, maybe it doesn't need to be an app yet.
                </p>
            </div>
        )
    },
    {
        id: 'stash',
        title: 'The "Stash and Revisit" Strategy',
        icon: Clock,
        color: 'text-purple-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">
                    In the world of AI, a "no" today is often a "yes" next month.
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Today</div>
                        <div className="text-red-400 font-mono text-sm">Error: Cannot generate...</div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5">
                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Next Month</div>
                        <div className="text-emerald-400 font-mono text-sm">Success! Here is your...</div>
                    </div>
                </div>
                <p className="text-xs text-slate-400">
                    Save your prompts and ideas. Coding tools progress fast.
                </p>
            </div>
        )
    },
    {
        id: 'small-deep',
        title: 'Build "Small & Deep"',
        icon: Hammer,
        color: 'text-emerald-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">
                    Avoid "Wide & Shallow". Don't build a "Social Network for Cats with AI & Payments" all at once.
                </p>
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-center gap-4">
                    <div className="p-2 bg-emerald-500 text-slate-900 rounded-lg font-bold">
                        Do
                    </div>
                    <p className="text-sm text-emerald-200">
                        Build one tiny feature that works perfectly.
                    </p>
                </div>
                <p className="text-xs text-slate-400">
                    Complexity breaks vibes. Keep it simple, then iterate.
                </p>
            </div>
        )
    },
    {
        id: 'learning',
        title: 'Learn How It\'s Made',
        icon: BookOpen,
        color: 'text-pink-400',
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">
                    Don't just generate. Understand.
                </p>
                <div className="bg-slate-950 p-4 rounded-xl border border-white/10 font-mono text-xs text-pink-300">
                    Explain this specific block of code to me like I'm five.
                </div>
                <p className="text-sm text-slate-400">
                    The more you understand the "why", the better your prompts become. Even a summary helps you vibe better next time.
                </p>
            </div>
        )
    },
    {
        id: 'deploy',
        title: 'Deployment',
        icon: Rocket,
        color: 'text-white',
        action: {
            label: 'Deploy on Vercel',
            url: 'https://vercel.com/new',
            icon: Rocket
        },
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">
                    Once you've built the thing, you need to share it with the world.
                </p>
                <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-xl text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Build?</h3>
                    <p className="text-sm text-white/80 mb-0">
                        Let's set up your environment and get this ship moving.
                    </p>
                </div>
            </div>
        )
    }
];

export default function VibeGuide({ isOpen, onClose, onStartWizard }: VibeGuideProps) {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < TIPS.length - 1) {
            setIndex(index + 1);
        } else {
            onClose();
            onStartWizard();
        }
    };

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-[80]"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed inset-0 m-auto z-[90] w-full max-w-lg h-fit"
                    >
                        <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative h-[600px]">
                            {/* Header */}
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    Vibe Tips <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-400 font-normal">{index + 1}/{TIPS.length}</span>
                                </h2>
                                <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={TIPS[index].id}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full flex flex-col items-center"
                                    >
                                        <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-800 flex items-center justify-center ${TIPS[index].color} shadow-lg shadow-black/50 border border-white/5`}>
                                            {(() => {
                                                const Icon = TIPS[index].icon;
                                                return <Icon className="w-8 h-8" />;
                                            })()}
                                        </div>
                                        <h3 className={`text-2xl font-bold mb-6 ${TIPS[index].color}`}>{TIPS[index].title}</h3>
                                        {TIPS[index].content}

                                        {/* Action Link */}
                                        {(TIPS[index] as any).action && (
                                            <motion.a
                                                href={(TIPS[index] as any).action.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className={`mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm bg-slate-800 hover:bg-slate-700 transition-all border border-white/10 group ${TIPS[index].color}`}
                                            >
                                                <span>{(TIPS[index] as any).action.label}</span>
                                                {(() => {
                                                    const Icon = (TIPS[index] as any).action.icon;
                                                    return <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />;
                                                })()}
                                            </motion.a>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 flex items-center justify-between bg-slate-800/30">
                                <button
                                    onClick={handlePrev}
                                    disabled={index === 0}
                                    className={`p-3 rounded-full hover:bg-white/10 transition-colors ${index === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <div className="flex gap-1.5">
                                    {TIPS.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/10'}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    className={`p-3 rounded-full hover:bg-white/10 transition-colors ${index === TIPS.length - 1 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {index === TIPS.length - 1 ? <Rocket className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
