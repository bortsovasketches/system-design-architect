'use client';

import { motion } from 'framer-motion';
import { ToggleLeft, ToggleRight, Layers, Zap, CheckCircle2, AlertTriangle, AlertOctagon, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import VibeTerm from './VibeTerm';

interface VibeCheckProps {
    scopes: string[];
    onScopeChange: (scopes: string[]) => void;
    baseComplexity: 'eli5' | 'intermediate' | 'senior';
}

const AVAILABLE_SCOPES = [
    { id: 'Auth', label: 'Authentication', description: 'User login, signup, and session management.', cost: 0, time: 1 },
    { id: 'Database', label: 'Database', description: 'Persistent storage for data (CRUD).', cost: 5, time: 2 },
    { id: 'Realtime', label: 'Realtime', description: 'Live updates, websockets, and polling.', cost: 50, time: 5 },
    { id: 'AI/ML', label: 'AI Features', description: 'Smart predictions and generated content.', cost: 20, time: 7 },
    { id: 'Analytics', label: 'Analytics', description: 'Tracking user behavior and metrics.', cost: 0, time: 1 },
];

export default function VibeCheck({ scopes, onScopeChange, baseComplexity }: VibeCheckProps) {
    const [score, setScore] = useState(100);
    const [cost, setCost] = useState(0);

    const toggleScope = (id: string) => {
        if (scopes.includes(id)) {
            onScopeChange(scopes.filter(s => s !== id));
        } else {
            onScopeChange([...scopes, id]);
        }
    };

    // Calculate score and cost
    useEffect(() => {
        let s = 100;
        let c = 0; // Monthly cost

        // Base penalty for complexity
        if (baseComplexity === 'intermediate') { s -= 20; }
        if (baseComplexity === 'senior') { s -= 50; }

        // Penalty/Cost per scope
        AVAILABLE_SCOPES.forEach(scope => {
            if (scopes.includes(scope.id)) {
                s -= (scope.id === 'Realtime' ? 25 : scope.id === 'AI/ML' ? 5 : 10);
                c += scope.cost;
            }
        });

        setScore(Math.max(5, s));
        setCost(c);
    }, [baseComplexity, scopes]);

    const getScoreColor = (s: number) => {
        if (s > 75) return 'text-emerald-400';
        if (s > 40) return 'text-amber-400';
        return 'text-red-400';
    };

    const getScoreIcon = (s: number) => {
        if (s > 75) return CheckCircle2;
        if (s > 40) return AlertTriangle;
        return AlertOctagon;
    };

    const Icon = getScoreIcon(score);

    return (
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between relative z-10 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider"><VibeTerm term="System Design" /></h3>
                        <p className="text-xs text-slate-500 font-medium">Scope & Feasibility</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {/* Left Column: Scope Toggles */}
                <div className="space-y-3">
                    <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-tight">Active Scopes</div>
                    {AVAILABLE_SCOPES.map((scope) => {
                        const isActive = scopes.includes(scope.id);
                        return (
                            <button
                                key={scope.id}
                                onClick={() => toggleScope(scope.id)}
                                className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all duration-200 group/item ${isActive
                                    ? 'bg-slate-800/50 border-white/10 hover:bg-slate-800'
                                    : 'bg-slate-950/30 border-transparent opacity-60 hover:opacity-80'
                                    }`}
                            >
                                <div className="text-left">
                                    <span className={`text-xs font-semibold block transition-colors ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                                        <VibeTerm term={scope.id} />
                                    </span>
                                </div>
                                <div className={`transition-colors duration-300 scale-75 origin-right ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                                    {isActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Right Column: Score Dial & Cost */}
                <div className="flex flex-col gap-4">
                    <div className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-tight">Viability Score</div>
                    <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center flex-1 gap-1">
                        <div className={`text-4xl font-black ${getScoreColor(score)} flex items-center gap-2`}>
                            <Icon className="w-6 h-6 opacity-80" />
                            {score}%
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 text-center">Feasibility</span>
                    </div>

                    {/* Cost Estimate */}
                    <div className="bg-slate-950/30 rounded-lg p-3 border border-white/5 flex flex-col items-center justify-center">
                        <DollarSign className="w-4 h-4 text-emerald-400 mb-1" />
                        <span className="text-lg font-bold text-slate-200">${cost}</span>
                        <span className="text-[9px] uppercase text-slate-500">Monthly Cost</span>
                    </div>

                    {cost > 20 && (
                        <div className="text-[10px] items-start flex gap-2 text-amber-300/80 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20 leading-relaxed">
                            <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>Warning: High recurring costs detected (API/Cloud).</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
