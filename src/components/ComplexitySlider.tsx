'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';


const LEVELS = [
    { id: 'eli5', label: 'Tech Beginner', color: 'bg-green-500', desc: 'Concept' },
    { id: 'intermediate', label: 'Maker', color: 'bg-yellow-500', desc: 'Feature' },
    { id: 'senior', label: 'Pro Engineer', color: 'bg-red-500', desc: 'System' },
];


interface ComplexitySliderProps {
    value: string;
    onChange: (value: string) => void;
}

export default function ComplexitySlider({ value, onChange }: ComplexitySliderProps) {
    return (
        <div className="relative bg-slate-900/50 p-1 rounded-xl border border-white/5 flex items-center">
            {/* Background Pill */}
            <motion.div
                layout
                layoutId="active-pill"
                className={`absolute top-1 bottom-1 rounded-lg ${LEVELS.find(l => l.id === value)?.color} opacity-20`}
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                    left: 4,
                    right: 4,
                }}
            />

            {LEVELS.map((level) => {
                const isActive = value === level.id;
                return (
                    <button
                        key={level.id}
                        onClick={() => onChange(level.id)}
                        className={`relative z-10 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex flex-col items-center gap-0.5 min-w-[100px] ${isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <span>{level.label}</span>
                        <span className="text-[9px] opacity-60 font-medium tracking-normal normal-case">{level.desc}</span>
                        {isActive && (
                            <motion.div
                                layoutId="active-indicator"
                                className={`absolute inset-0 rounded-lg border border-white/10 ${level.color.replace('bg-', 'shadow-[0_0_15px_rgba(0,0,0,0.3)] shadow-')}`}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
