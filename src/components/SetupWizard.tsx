'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Download, Rocket, Copy, Check, Folder } from 'lucide-react';
import { useState } from 'react';
import VibeTerm from './VibeTerm';

interface SetupWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

const STEPS = [
    {
        id: 'basics',
        title: 'The Toolkit',
        icon: Download,
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">To vibe code, you need two things: an engine and an agent.</p>

                <div className="space-y-3">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h4 className="font-bold text-slate-200 flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-green-400" />
                            1. The Command Line (CLI)
                        </h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            Think of the CLI as "texting" your computer. Instead of clicking icons, you type commands.
                            It looks scary, but it's just a conversation.
                        </p>
                    </div>

                    <a href="https://nodejs.org/" target="_blank" className="block bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:border-green-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-1.5 bg-green-500/20 text-green-400 rounded-lg">
                                <Download className="w-4 h-4" />
                            </div>
                            <h4 className="font-bold text-slate-200">2. Install Node.js</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            This is the engine that runs your code. Download the "LTS" (Long Term Support) version from the website and install it like any other app.
                        </p>
                    </a>
                </div>
            </div>
        )
    },
    {
        id: 'folder',
        title: 'The Workbench',
        icon: Folder, // We need to import Folder
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">Your code needs a home.</p>
                <div className="bg-slate-950 rounded-xl p-6 border border-white/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                    <h3 className="text-lg font-bold text-white mb-2">Create a Folder</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Go to your Desktop (or Documents) and create a new empty folder. Name it something cool like:
                    </p>
                    <div className="inline-block bg-slate-800 px-4 py-2 rounded-lg font-mono text-blue-300 border border-blue-500/30">
                        my-dream-app
                    </div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                    Remember where you put this!
                </p>
            </div>
        )
    },
    {
        id: 'agent',
        title: 'The Agent',
        icon: Rocket,
        content: (
            <div className="space-y-4">
                <p className="text-slate-300">Now, let the AI do the heavy lifting.</p>
                <div className="space-y-3">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h4 className="font-bold text-slate-200 mb-1">1. Open your Agentic IDE</h4>
                        <p className="text-xs text-slate-400">
                            Launch <strong>Google Antigravity</strong> (or Cursor).
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h4 className="font-bold text-slate-200 mb-1">2. Open Your Folder</h4>
                        <p className="text-xs text-slate-400">
                            "File" → "Open Folder" → Select <code>my-dream-app</code>.
                        </p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="font-bold text-slate-200 mb-2">3. The Magic Command</h4>
                        <p className="text-xs text-slate-400 mb-2">Open the Chat (Cmd+L) and type this:</p>
                        <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-blue-300 border border-blue-500/30 flex justify-between items-center gap-2">
                            <span className="truncate">"Build a static website with a cool physics engine visualization"</span>
                            <Copy className="w-3 h-3 opacity-50 shrink-0" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

export default function SetupWizard({ isOpen, onClose }: SetupWizardProps) {
    const [step, setStep] = useState(0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-[70] w-full max-w-lg h-fit bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-800/50">
                            <div>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <VibeTerm term="Deployment" /> Guide
                                </h2>
                                <p className="text-sm text-slate-400">First-time Setup</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1 bg-slate-800 w-full flex">
                            {STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-full transition-all duration-300 ${i <= step ? 'bg-blue-500' : 'bg-transparent'}`}
                                    style={{ width: `${100 / STEPS.length}%` }}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="p-8 min-h-[300px] flex flex-col justify-between">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                        {(() => {
                                            const Icon = STEPS[step].icon;
                                            return <Icon className="w-6 h-6" />;
                                        })()}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{STEPS[step].title}</h3>
                                </div>
                                {STEPS[step].content}
                            </motion.div>

                            {/* Footer Buttons */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                                <button
                                    onClick={() => setStep(Math.max(0, step - 1))}
                                    className={`px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    Back
                                </button>

                                {step < STEPS.length - 1 ? (
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="px-6 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-bold shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 flex items-center gap-2"
                                    >
                                        Let's Go! <Rocket className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
