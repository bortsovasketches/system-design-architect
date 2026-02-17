'use client';

import { motion } from 'framer-motion';
import { SYSTEM_ICONS } from '@/lib/data';

interface ProductSideNavProps {
    currentSystem: string;
    onSelectSystem: (system: string) => void;
}

export default function ProductSideNav({ currentSystem, onSelectSystem }: ProductSideNavProps) {
    const systems = Object.keys(SYSTEM_ICONS).filter(key => key !== 'default');

    return (
        <div className="hidden xl:flex flex-col gap-2 w-64 shrink-0 sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 px-2">Blueprints</h3>

            {systems.map((key) => {
                const Icon = SYSTEM_ICONS[key] || SYSTEM_ICONS['default'];
                const isActive = currentSystem === key;

                return (
                    <button
                        key={key}
                        onClick={() => onSelectSystem(key)}
                        className={`group flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left border ${isActive
                                ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                            }`}
                    >
                        <div className={`p-1.5 rounded-md transition-colors ${isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                            }`}>
                            <Icon className="w-4 h-4" />
                        </div>
                        <span className="capitalize truncate">{key.replace('-', ' ')}</span>
                        {isActive && (
                            <motion.div
                                layoutId="active-nav-indicator"
                                className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
