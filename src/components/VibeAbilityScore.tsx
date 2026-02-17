'use client';

import { motion } from 'framer-motion';
import { Cloud, Zap, CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VibeAbilityScoreProps {
    baseComplexity: 'eli5' | 'intermediate' | 'senior';
    activeScopes: string[];
}

export default function VibeAbilityScore({ baseComplexity, activeScopes }: VibeAbilityScoreProps) {
    const [score, setScore] = useState(100);
    const [cost, setCost] = useState(0);

    // Calculate score based on complexity and scopes
    useEffect(() => {
        let s = 100;
        let c = 0;

        // Base penalty for complexity
        if (baseComplexity === 'intermediate') s -= 20;
        if (baseComplexity === 'senior') s -= 50;

        // Penalty/Cost per scope
        if (activeScopes.includes('Auth')) { s -= 10; c += 0; } // Auth usually free
        if (activeScopes.includes('Database')) { s -= 15; c += 5; } // DB adds complexity & cost
        if (activeScopes.includes('Realtime')) { s -= 25; c += 20; } // Realtime is hard & costly
        if (activeScopes.includes('AI/ML')) { s -= 5; c += 50; } // AI is easy to implement (API) but expensive
        if (activeScopes.includes('Analytics')) { s -= 5; c += 10; } // Analytics is easy-ish

        setScore(Math.max(5, s));
        setCost(c);
    }, [baseComplexity, activeScopes]);

    const getScoreColor = (s: number) => {
        if (s > 75) return 'text-emerald-400';
        if (s > 40) return 'text-amber-400';
        return 'text-red-400';
    };

    const getScoreLabel = (s: number) => {
        if (s > 75) return 'Weekend Project';
        if (s > 40) return 'Serious Build';
        return 'Team Required';
    };

    const getScoreIcon = (s: number) => {
        if (s > 75) return CheckCircle2;
        if (s > 40) return AlertTriangle;
        return AlertOctagon;
    };

    const Icon = getScoreIcon(score);

    return (
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-6 w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Vibe-Ability</h3>
                        <p className="text-xs text-slate-500 font-medium">Feasibility Check</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 relative z-10 w-full">
                {/* Score Dial */}
                <div className="bg-slate-950/50 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center gap-2">
                    <div className={`text-4xl font-black ${getScoreColor(score)} flex items-center gap-2`}>
                        <Icon className="w-6 h-6" />
                        {score}%
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold text-slate-500">{getScoreLabel(score)}</span>
                </div>
            </div>

            {score < 50 && (
                <div className="text-xs text-red-300/80 bg-red-950/30 p-3 rounded-lg border border-red-500/20">
                    Warning: Complexity is high. Consider disabling Realtime or Databases for a first version.
                </div>
            )}
        </div>
    );
}
