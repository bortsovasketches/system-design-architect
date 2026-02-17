'use client';

import { useVibeLanguage } from '@/hooks/useVibeLanguage';
import { motion, AnimatePresence } from 'framer-motion';

interface VibeTermProps {
    term: string;
    className?: string;
}

export default function VibeTerm({ term, className = '' }: VibeTermProps) {
    const { language, t } = useVibeLanguage();
    const translated = t(term);
    const isTranslated = language === 'vibe' && translated !== term;

    return (
        <span className={`relative inline-block group ${className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={translated}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className={isTranslated ? 'text-pink-400 font-medium decoration-dashed underline underline-offset-4 decoration-pink-400/30' : ''}
                >
                    {translated}
                </motion.span>
            </AnimatePresence>

            {isTranslated && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-slate-800 text-slate-300 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                    Tech: {term}
                </span>
            )}
        </span>
    );
}
