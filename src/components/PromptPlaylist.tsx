'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Play, ChevronRight, Disc, Music, Rocket } from 'lucide-react';
import { generatePlaylist, PromptPlaylist as PlaylistType } from '@/lib/prompt-engine';
import { DesignSystem } from '@/lib/data';

interface PromptPlaylistProps {
    systemName: string;
    level: string;
    data: DesignSystem['eli5'];
    scopes: string[];
}

export default function PromptPlaylist({ systemName, level, data, scopes }: PromptPlaylistProps) {
    const [activeTrack, setActiveTrack] = useState<string | null>(null);
    const [copiedTrack, setCopiedTrack] = useState<string | null>(null);

    const playlist = generatePlaylist(systemName, level, data, scopes);

    const tracks = [
        { id: 'skeleton', title: 'Track 1: The Skeleton', desc: 'Setup Next.js & UI Shell', icon: Disc, content: playlist.skeleton },
        { id: 'mockData', title: 'Track 2: The Mock Data', desc: 'Data structures & fake API', icon: Music, content: playlist.mockData },
        { id: 'logic', title: 'Track 3: The Logic', desc: 'State management & interactivity', icon: Play, content: playlist.logic },
        { id: 'polish', title: 'Track 4: The Polish', desc: 'Animations & styling details', icon: Check, content: playlist.polish },
        { id: 'launch', title: 'Track 5: The Launch', desc: 'Deploy to Vercel', icon: Rocket, content: playlist.launch },
    ];

    const handleCopy = (content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopiedTrack(id);
        setTimeout(() => setCopiedTrack(null), 2000);
    };

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                        <Music className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">Prompt Playlist</h3>
                        <p className="text-xs text-slate-500 font-medium">Prompt a mini demo based on this service</p>
                    </div>
                </div>
                <div className="text-xs font-mono text-slate-500">5 Tracks</div>
            </div>

            {/* Tracks List */}
            <div className="space-y-2">
                {tracks.map((track, index) => (
                    <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`rounded-xl border transition-all duration-300 overflow-hidden ${activeTrack === track.id
                            ? 'bg-slate-800/80 border-pink-500/30 shadow-lg shadow-pink-500/10'
                            : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/40'
                            }`}
                    >
                        {/* Track Header (Clickable) */}
                        <button
                            onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
                            className="w-full flex items-center justify-between p-4 text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full transition-colors ${activeTrack === track.id ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-500'
                                    }`}>
                                    <track.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className={`text-sm font-bold ${activeTrack === track.id ? 'text-white' : 'text-slate-300'}`}>
                                        {track.title}
                                    </h4>
                                    <p className="text-xs text-slate-500">{track.desc}</p>
                                </div>
                            </div>
                            <ChevronRight
                                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${activeTrack === track.id ? 'rotate-90 text-pink-400' : ''
                                    }`}
                            />
                        </button>

                        {/* Track Content (Expandable) */}
                        <AnimatePresence>
                            {activeTrack === track.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-4 pt-0 border-t border-white/5 bg-black/20">
                                        <div className="relative">
                                            <pre className="text-[10px] md:text-xs font-mono text-slate-400 bg-slate-950 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap max-h-[200px] border border-white/5">
                                                {track.content}
                                            </pre>

                                            <div className="mt-3 flex justify-end">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(track.content, track.id);
                                                    }}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${copiedTrack === track.id
                                                        ? 'bg-emerald-500 text-white'
                                                        : 'bg-white text-slate-900 hover:bg-slate-200'
                                                        }`}
                                                >
                                                    {copiedTrack === track.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                    {copiedTrack === track.id ? 'Copied' : 'Copy Prompt'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
