'use client';

import { motion } from 'framer-motion';
import { ToggleLeft, ToggleRight, Info, Layers } from 'lucide-react';

interface ScopeSlicerProps {
    scopes: string[];
    onChange: (scopes: string[]) => void;
}

const AVAILABLE_SCOPES = [
    { id: 'Auth', label: 'Authentication', description: 'User login, signup, and session management.' },
    { id: 'Database', label: 'Database', description: 'Persistent storage for data (CRUD).' },
    { id: 'Realtime', label: 'Realtime', description: 'Live updates, websockets, and polling.' },
    { id: 'AI/ML', label: 'AI Features', description: 'Smart predictions and generated content.' },
    { id: 'Analytics', label: 'Analytics', description: 'Tracking user behavior and metrics.' },
];

export default function ScopeSlicer({ scopes, onChange }: ScopeSlicerProps) {

    const toggleScope = (id: string) => {
        if (scopes.includes(id)) {
            onChange(scopes.filter(s => s !== id));
        } else {
            onChange([...scopes, id]);
        }
    };

    return (
        <div className="bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-6 w-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">MVP Chopper</h3>
                        <p className="text-xs text-slate-500 font-medium">Slice out complex features</p>
                    </div>
                </div>
                <div className="text-xs font-mono text-slate-500 bg-slate-950/50 px-2 py-1 rounded border border-white/5">
                    {scopes.length} / {AVAILABLE_SCOPES.length} Active
                </div>
            </div>

            <div className="space-y-3 relative z-10">
                {AVAILABLE_SCOPES.map((scope) => {
                    const isActive = scopes.includes(scope.id);
                    return (
                        <button
                            key={scope.id}
                            onClick={() => toggleScope(scope.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 group/item ${isActive
                                    ? 'bg-slate-800/50 border-white/10 hover:bg-slate-800'
                                    : 'bg-slate-950/30 border-transparent opacity-60 hover:opacity-80'
                                }`}
                        >
                            <div className="flex flex-col items-start gap-0.5 text-left">
                                <span className={`text-sm font-semibold transition-colors ${isActive ? 'text-slate-200' : 'text-slate-500'}`}>
                                    {scope.label}
                                </span>
                                <span className="text-[10px] text-slate-500 leading-tight max-w-[180px]">
                                    {scope.description}
                                </span>
                            </div>

                            <div className={`transition-colors duration-300 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`}>
                                {isActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
