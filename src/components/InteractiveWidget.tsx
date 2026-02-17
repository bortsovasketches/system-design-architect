'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeedWidget from './widgets/FeedWidget';
import MarketplaceWidget from './widgets/MarketplaceWidget';
import SearchWidget from './widgets/SearchWidget';
import {
    Play, Pause, SkipForward, Heart, Search, Calendar, MessageSquare, Send, CheckCircle,
    Smartphone, Wifi, MapPin, Navigation, BarChart3, TrendingUp, Users, Video, Mic,
    Monitor, Server, Database, Globe, User, CreditCard
} from 'lucide-react';

interface InteractiveWidgetProps {
    systemId: string;
}

export default function InteractiveWidget({ systemId }: InteractiveWidgetProps) {
    const id = systemId.toLowerCase();

    // --- 0. Specialized Widgets ---
    if (['micro-blogging'].includes(id)) return <FeedWidget type="text" />;
    if (['photo-sharing'].includes(id)) return <FeedWidget type="image" />;
    if (['e-commerce'].includes(id)) return <MarketplaceWidget />;
    if (['search-engine'].includes(id)) return <SearchWidget />;

    // --- 1. Feed / Media Archetype ---
    if (['music-streaming', 'video-streaming', 'short-video', 'video-platform', 'music-generator'].includes(id)) {
        return <MediaPlayerWidget systemId={id} />;
    }

    // --- 2. Chat / Assistant / CLI Archetype ---
    if (['instant-messaging', 'team-chat', 'personal-agent', 'code-assistant', 'multimodal-ai', 'package-manager', 'version-control', 'url-shortener', 'container-orchestrator'].includes(id)) {
        return <ChatWidget systemId={id} />;
    }

    // --- 3. Map / Location Archetype ---
    if (['ride-share', 'vacation-rental'].includes(id)) {
        return <MapWidget systemId={id} />;
    }

    // --- 4. Video Call Archetype ---
    if (['video-conferencing'].includes(id)) {
        return <VideoCallWidget />;
    }

    // --- 5. Transaction / List Archetype (Bank, Payments, Storage) ---
    return <DashboardWidget systemId={id} />;
}

// ----------------------------------------------------------------------
// Archetype 1: Feed / Media Player
// ----------------------------------------------------------------------
function MediaPlayerWidget({ systemId }: { systemId: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const isVideo = ['video-streaming', 'short-video', 'video-platform'].includes(systemId);
    const isAudio = ['music-streaming', 'music-generator'].includes(systemId);

    const getTitle = () => {
        if (systemId === 'music-generator') return 'Generating Melody...';
        if (systemId === 'short-video') return 'For You Feed';
        return 'Now Playing';
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 1.5));
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="w-full bg-slate-950 p-6 rounded-xl border border-white/10 relative overflow-hidden group">
            {/* Background Gradient matching type */}
            <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${isAudio ? 'from-purple-900 to-black' :
                isVideo ? 'from-red-900 to-black' :
                    'from-blue-900 to-black'
                }`} />

            <div className="flex items-center gap-4 relative z-10">
                <div className={`
                    ${(isVideo) ? 'w-32 h-20' : 'w-16 h-16'} 
                    bg-slate-800 rounded-lg shadow-lg flex items-center justify-center border border-white/5 relative overflow-hidden shrink-0
                `}>
                    {isVideo && <Video className="text-slate-500" />}
                    {isAudio && <span className="text-2xl">🎵</span>}

                    {/* Simulated Content Loading Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{ opacity: isPlaying ? [0, 0.2, 0] : 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-lg capitalize truncate">{getTitle()}</h4>
                    <p className="text-slate-400 text-xs uppercase tracking-wider truncate">
                        {isPlaying ? 'Streaming / Active' : 'Paused'}
                    </p>
                </div>

                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-12 h-12 rounded-full text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shrink-0 ${isPlaying ? 'bg-red-500 shadow-red-500/20' : 'bg-blue-500 shadow-blue-500/20'
                        }`}
                >
                    {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
                </button>
            </div>

            <div className="mt-6 space-y-2 relative z-10">
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>{isPlaying ? 'Live' : 'Ready'}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full ${isPlaying ? 'bg-emerald-400' : 'bg-slate-600'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>
                <p className="text-[10px] text-slate-600 font-mono pt-2 truncate">
                    &gt; {`Buffering Segment: /chunk-${Math.floor(progress)}.ts`}
                </p>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Archetype 2: Chat / Assistant / CLI
// ----------------------------------------------------------------------
function ChatWidget({ systemId }: { systemId: string }) {
    const isCLI = ['package-manager', 'version-control', 'container-orchestrator', 'url-shortener'].includes(systemId);

    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
        { role: 'bot', text: isCLI ? `root@${systemId}:~#` : `System '${systemId}' online. Waiting for input.` }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsgs = [...messages, { role: 'user' as const, text: input }];
        setMessages(newMsgs);
        setInput('');

        setTimeout(() => {
            let response = "Done.";
            if (isCLI) {
                if (systemId === 'package-manager') response = "ADDED 42 packages in 0.4s";
                if (systemId === 'version-control') response = "HEAD detached at 5f2a1c";
                if (systemId === 'container-orchestrator') response = "Pod/vibe-app-1 created";
                if (systemId === 'url-shortener') response = "Shortened: http://bit.ly/3x8";
            } else {
                response = "Processing request... Done.";
            }

            setMessages([...newMsgs, { role: 'bot', text: response }]);
        }, 500);
    };

    return (
        <div className="w-full bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden flex flex-col h-64 font-mono">
            <div className="bg-slate-800/50 p-3 border-b border-white/5 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isCLI ? 'bg-amber-500' : 'bg-green-500'}`} />
                <span className="text-xs font-bold text-slate-300 capitalize">
                    {isCLI ? 'Terminal / Console' : `${systemId.replace('-', ' ')} Interface`}
                </span>
            </div>

            <div className="flex-1 p-4 space-y-2 overflow-y-auto text-xs">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'user' ? (
                            <div className="bg-blue-600/20 text-blue-300 p-2 rounded border border-blue-500/20 max-w-[90%] break-all">
                                {isCLI ? `$ ${m.text}` : m.text}
                            </div>
                        ) : (
                            <div className="text-slate-400 w-full break-all">
                                <span className="text-emerald-500 mr-2">{isCLI ? '>' : '#'}</span>
                                {m.text}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-3 bg-black/20 border-t border-white/5 flex gap-2">
                <input
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-slate-600 outline-none font-mono"
                    placeholder={isCLI ? "Enter command..." : "Type query..."}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="text-slate-400 hover:text-white transition-colors">
                    <Send className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Archetype 3: Map / Location
// ----------------------------------------------------------------------
function MapWidget({ systemId }: { systemId: string }) {
    const isRental = systemId === 'vacation-rental';
    const [status, setStatus] = useState<'idle' | 'searching' | 'found'>('idle');

    const handleAction = () => {
        setStatus('searching');
        setTimeout(() => setStatus('found'), 1500);
    };

    return (
        <div className="w-full bg-slate-900 border border-white/10 rounded-xl p-0 overflow-hidden relative h-64 group">
            {/* Fake Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black" />
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-px opacity-10 pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="bg-slate-800" />
                ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
                <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-2xl w-full max-w-xs text-center space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 mx-auto">
                        <MapPin className="w-6 h-6" />
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-1">
                            {isRental ? 'Find a Stay' : 'Request Ride'}
                        </h4>
                        <p className="text-xs text-slate-400">
                            Using QuadTree / S2 Geometry Index
                        </p>
                    </div>

                    <button
                        onClick={handleAction}
                        disabled={status !== 'idle'}
                        className={`w-full py-2 rounded-lg font-bold text-sm transition-all
                            ${status === 'found' ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}
                        `}
                    >
                        {status === 'idle' && (isRental ? 'Check Availability' : 'Confirm Pickup')}
                        {status === 'searching' && (isRental ? 'Checking Locks...' : 'Matching Driver...')}
                        {status === 'found' && (isRental ? 'Reserved!' : 'Driver En Route')}
                    </button>
                </div>
            </div>

            {/* Simulating moving elements */}
            {status === 'searching' && (
                <motion.div
                    className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                    animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ left: '50%', top: '50%' }}
                />
            )}
        </div>
    );
}

// ----------------------------------------------------------------------
// Archetype 4: Video Call
// ----------------------------------------------------------------------
function VideoCallWidget() {
    return (
        <div className="w-full bg-slate-950 border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 gap-1 p-1 h-64 bg-slate-900">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-slate-800 relative rounded-lg flex items-center justify-center overflow-hidden">
                        <User className="text-slate-700 w-12 h-12" />
                        <div className="absolute bottom-2 left-2 flex gap-1">
                            <div className="bg-black/50 p-1 rounded">
                                <Mic className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        {i === 1 && (
                            <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-900/80 px-2 py-0.5 rounded text-[10px] text-green-300 border border-green-500/20">
                                <Wifi className="w-3 h-3" />
                                <span>UDP</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="p-3 flex justify-center gap-4 bg-slate-900 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center"><Mic className="w-4 h-4 text-white" /></div>
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center"><Video className="w-4 h-4 text-white" /></div>
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"><Smartphone className="w-4 h-4 text-white rotate-135" /></div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Archetype 5: Dashboard / Status
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Archetype 5: Transaction / List / Dashboard
// ----------------------------------------------------------------------
function DashboardWidget({ systemId }: { systemId: string }) {
    const isBank = ['digital-bank', 'payment-gateway'].includes(systemId);
    const isStorage = ['cloud-storage'].includes(systemId);

    const [items, setItems] = useState<{ id: string, title: string, status: string, amount?: string }[]>([
        { id: '1', title: isBank ? 'Coffee Shop' : 'Project_Specs.pdf', status: 'Completed', amount: '-$4.50' },
        { id: '2', title: isBank ? 'Salary Deposit' : 'Assets_Backup.zip', status: 'Completed', amount: '+$3,200' },
        { id: '3', title: isBank ? 'Server Costs' : 'main.tsx', status: 'Pending', amount: '-$120.00' },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newId = Math.random().toString(36).substr(2, 9);
            const newItem = isBank
                ? { id: newId, title: 'Unknown Merchant', status: 'Processing', amount: '-$9.99' }
                : { id: newId, title: `image_${Math.floor(Math.random() * 100)}.png`, status: 'Syncing', amount: '2.4MB' };

            setItems(prev => [newItem, ...prev].slice(0, 5));
        }, 3000);
        return () => clearInterval(interval);
    }, [isBank]);

    return (
        <div className="w-full bg-slate-950 border border-white/10 rounded-xl p-0 overflow-hidden h-64 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                        {isBank ? <CreditCard className="w-5 h-5" /> : <Database className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm capitalize">{systemId.replace('-', ' ')}</h4>
                        <p className="text-xs text-slate-500">{isBank ? 'Live Transactions' : 'File Sync Status'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-green-900/40 rounded border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Connected</span>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 p-4 space-y-2">
                    <AnimatePresence initial={false}>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20, height: 0 }}
                                animate={{ opacity: 1, x: 0, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center justify-between p-3 bg-slate-900/80 rounded-lg border border-white/5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                    <span className="text-sm font-medium text-slate-200">{item.title}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-slate-500">{item.status}</span>
                                    <span className={`text-sm font-mono font-bold ${item.amount?.startsWith('+') ? 'text-emerald-400' : 'text-slate-300'
                                        }`}>
                                        {item.amount}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                {/* Fade out bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}


