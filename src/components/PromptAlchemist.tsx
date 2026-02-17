'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Sparkles, Layers, Terminal, Shield } from 'lucide-react';
import { generateScaffPrompt } from '@/lib/prompt-engine';
import { DesignSystem } from '@/lib/data';

interface PromptAlchemistProps {
    systemName: string;
    level: string;
    data: DesignSystem['eli5'];
}

export default function PromptAlchemist({ systemName, level, data }: PromptAlchemistProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const { fullPrompt, situation, challenge, format } = generateScaffPrompt(systemName, level, data);

    const handleCopy = () => {
        navigator.clipboard.writeText(fullPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative w-full flex items-center justify-between p-[2px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 active:scale-[0.99]"
            >
                <div className="absolute inset-0 bg-white/50 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />

                <div className="relative w-full h-full bg-slate-900/95 backdrop-blur-xl rounded-[22px] p-6 flex items-center justify-between overflow-hidden">
                    {/* Inner sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-5 z-10">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg text-white tracking-tight leading-tight">Vibe-Coding Prompt</h3>
                        </div>
                    </div>

                    <div className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all z-10 flex items-center gap-2 shadow-lg ${isOpen ? 'bg-white text-slate-900 border-white hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-200 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white'}`}>
                        {isOpen ? 'Close' : 'Generate'}
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 p-6 bg-slate-900/50 border border-white/10 rounded-xl space-y-6 relative overflow-hidden backdrop-blur-md">
                            {/* Grid Background */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
                                        <Terminal className="w-4 h-4 text-emerald-500" />
                                        Layer 1: Constraints
                                    </div>
                                    <div className="text-xs bg-slate-950/50 p-3 rounded-lg border border-white/10 text-slate-400 font-mono">
                                        Next.js 14+, Tailwind, Mock Data, Lucide
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
                                        <Layers className="w-4 h-4 text-blue-500" />
                                        Layer 2: Requirements
                                    </div>
                                    <div className="text-xs bg-slate-950/50 p-3 rounded-lg border border-white/10 text-slate-400 font-mono">
                                        {format.split('**Layer 2: Functional Requirements**')[1]?.split('**Layer 3')[0]?.trim().slice(0, 150)}...
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm uppercase tracking-wider">
                                        <Shield className="w-4 h-4 text-purple-500" />
                                        Layer 3: Constraints
                                    </div>
                                    <div className="text-xs bg-slate-950/50 p-3 rounded-lg border border-white/10 text-slate-400 font-mono">
                                        1-2 Users, Mock Data, Happy Path Only
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? 'Copied to Clipboard' : 'Copy Prompt'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
