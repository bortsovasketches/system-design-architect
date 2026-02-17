'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon } from 'lucide-react';

interface FeedWidgetProps {
    type: 'text' | 'image';
}

export default function FeedWidget({ type }: FeedWidgetProps) {
    return (
        <div className="w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-64 relative">
            {/* Header */}
            <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
                <span className="font-bold text-xs text-slate-300">
                    {type === 'text' ? 'Home' : 'Feed'}
                </span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Scrollable Feed */}
            <div className="flex-1 overflow-y-auto p-0 space-y-0 custom-scrollbar">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sm text-slate-200">User_{i * 42}</span>
                                    <span className="text-xs text-slate-500">@{type === 'text' ? 'dev_vibes' : 'photographer'} · {i}h</span>
                                </div>

                                {type === 'text' ? (
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Just deployed the new {i % 2 === 0 ? 'microservice' : 'layout'}.
                                        {i === 1 && " The scalability is insane! 🚀 #tech"}
                                        {i === 2 && " Anyone else seeing 50ms latency?"}
                                        {i === 3 && " Coffee time ☕️"}
                                    </p>
                                ) : (
                                    <div className="mt-2 rounded-lg bg-slate-800 aspect-video w-full overflow-hidden border border-white/5 relative group">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${i === 1 ? 'from-pink-500/20 to-orange-500/20' :
                                                i === 2 ? 'from-blue-500/20 to-cyan-500/20' :
                                                    'from-emerald-500/20 to-teal-500/20'
                                            }`} />
                                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                            <ImageIcon className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                )}

                                {/* Action Bar */}
                                <div className="flex items-center gap-6 mt-3">
                                    <button className="text-slate-500 hover:text-pink-500 flex items-center gap-1.5 text-xs transition-colors group">
                                        <Heart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                                        <span>{10 * i + 5}</span>
                                    </button>
                                    <button className="text-slate-500 hover:text-blue-400 flex items-center gap-1.5 text-xs transition-colors">
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        <span>{i * 2}</span>
                                    </button>
                                    <button className="text-slate-500 hover:text-green-400 flex items-center gap-1.5 text-xs transition-colors">
                                        <Share2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* New Post FAB */}
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-blue-500 rounded-full shadow-lg shadow-blue-500/20 flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                <span className="text-xl leading-none mb-1">+</span>
            </div>
        </div>
    );
}
