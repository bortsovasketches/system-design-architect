'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROSETTA_STONE, getAnalogy } from '@/lib/rosetta';

interface RosettaTooltipProps {
    term: string;
    children: React.ReactNode;
}

function RosettaTooltip({ term, children }: RosettaTooltipProps) {
    const [isHovered, setIsHovered] = useState(false);
    const data = getAnalogy(term);

    if (!data) return <>{children}</>;

    return (
        <span
            className="relative inline-block cursor-help font-bold text-blue-400 border-b-2 border-blue-500/30 hover:border-blue-400 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-900/95 text-white p-4 rounded-xl shadow-xl backdrop-blur-md border border-slate-700"
                    >
                        <div className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-1">Vibe Translation</div>
                        <div className="font-bold text-lg mb-1">{data.analogy}</div>
                        <div className="text-sm text-slate-300 leading-snug">{data.explanation}</div>

                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-slate-900/95" />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
}

import { useVibeLanguage } from '@/hooks/useVibeLanguage';

interface NarrativeRendererProps {
    overview: string;
    points: string[];
    overview_tech?: string;
    points_tech?: string[];
}

export default function NarrativeRenderer({ overview, points, overview_tech, points_tech }: NarrativeRendererProps) {
    const { language } = useVibeLanguage();

    // Select content based on language mode (fallback to standard if tech is missing)
    const effectiveOverview = (language === 'tech' && overview_tech) ? overview_tech : overview;
    const effectivePoints = (language === 'tech' && points_tech) ? points_tech : points;

    // 1. Prepare Rosetta Regex
    // Helper to check for Rosetta terms in keys (e.g. "Load Balancer")
    const keys = Object.keys(ROSETTA_STONE).sort((a, b) => b.length - a.length).join('|');
    const rosettaRegex = new RegExp(`(${keys})`, 'gi');

    // Helper to process text for Rosetta terms
    const processRosetta = (content: string) => {
        const parts = content.split(rosettaRegex);
        return parts.map((part, i) => {
            const match = getAnalogy(part);
            if (match) {
                return (
                    <RosettaTooltip key={i} term={part}>
                        {part}
                    </RosettaTooltip>
                );
            }
            return part;
        });
    };

    // Helper to render text with bold support
    const renderParsedText = (text: string) => {
        const boldParts = text.split(/(\*\*[\s\S]*?\*\*)/g);
        return boldParts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // It's a bold block
                const content = part.slice(2, -2);
                return (
                    <strong key={i} className="text-slate-200">
                        {processRosetta(content)}
                    </strong>
                );
            }
            // It's plain text
            return <span key={i}>{processRosetta(part)}</span>;
        });
    };

    return (
        <div className="space-y-6">
            {/* Overview Section */}
            <div className="text-lg leading-relaxed text-slate-300 border-l-2 border-indigo-500/30 pl-4 py-1">
                {renderParsedText(effectiveOverview)}
            </div>

            {/* Points Section */}
            <ul className="space-y-3">
                {effectivePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400/50 group-hover:bg-blue-400 transition-colors shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.3)]" />
                        <span className="text-base text-slate-300 leading-snug">
                            {renderParsedText(point)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
