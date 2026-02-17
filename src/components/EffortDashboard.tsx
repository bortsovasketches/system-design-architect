'use client';

import { motion } from 'framer-motion';
import { Clock, Hammer, CheckCircle2, AlertCircle } from 'lucide-react';

interface EffortDashboardProps {
    level: string; // 'eli5' | 'intermediate' | 'senior'
}

export default function EffortDashboard({ level }: EffortDashboardProps) {
    // heuristics
    const multiplier = level === 'eli5' ? 1 : level === 'intermediate' ? 3 : 5;
    const baseHours = 4; // basic setup
    const estimatedHours = baseHours * multiplier * 2.5;

    const checklist = [
        { id: 1, label: 'Auth & User Sessions', done: false },
        { id: 2, label: 'Error Boundaries', done: false },
        { id: 3, label: 'Loading Skeletons', done: false },
        { id: 4, label: 'Mobile Responsiveness', done: false },
        { id: 5, label: 'Analytics / Logging', done: false },
    ];

    return (
        <div className="bg-slate-900/50 backdrop-blur-2xl text-slate-200 rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/5 relative overflow-hidden ring-1 ring-white/5">
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 flex items-center gap-2 relative z-10">
                <Hammer className="w-4 h-4 text-blue-500" />
                Effort Multiplier
            </h3>

            <div className="space-y-6 relative z-10">
                {/* Complexity Score */}
                <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-purple-400">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Complexity</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-white">{multiplier}</span>
                            <span className="text-sm text-slate-500 font-bold">/ 5</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden ring-1 ring-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(multiplier / 5) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className={`h-full rounded-full ${multiplier <= 2 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                                multiplier <= 3 ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-red-500 to-red-600'
                                } shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                        />
                    </div>
                </div>

                {/* Production Readiness Note */}
                <div className="pt-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 mb-4 pl-1">
                        Production Readiness
                    </h4>

                    <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 space-y-3">
                        <div className="flex gap-3">
                            <div className="min-w-[4px] w-[4px] rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
                            <div>
                                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                                    <span className="text-white font-bold">Maintenance is harder than creation.</span>
                                    <br />
                                    This blueprint gets you started, but real production systems require observability, rigorous testing, and on-call rotations.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {['Observability', 'CI/CD', 'Security', 'On-Call'].map((tag) => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
