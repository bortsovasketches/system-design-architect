'use client';

import { motion } from 'framer-motion';
import { Search, Globe, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function SearchWidget() {
    const [query, setQuery] = useState('distributed systems');

    const results = [
        { title: "Distributed Systems - Wikipedia", url: "en.wikipedia.org", desc: "A distributed system is a system whose components are located on different networked computers..." },
        { title: "System Design Primer - GitHub", url: "github.com", desc: "Learn how to design large-scale systems. Preparation for the system design interview..." },
        { title: "CAP Theorem Explained", url: "info.example.com", desc: "Understanding Consistency, Availability, and Partition Tolerance in distributed data stores." },
    ];

    return (
        <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col h-64 relative font-sans text-slate-800">
            {/* Header / Search Bar */}
            <div className="p-3 border-b border-slate-100 flex items-center gap-3 shadow-sm sticky top-0 bg-white z-10">
                <span className="font-bold text-lg text-blue-600 tracking-tighter">VibeSearch</span>
                <div className="flex-1 bg-slate-100 rounded-full px-4 py-1.5 flex items-center gap-2 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
                    <span className="text-slate-400"><Search className="w-3.5 h-3.5" /></span>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-xs w-full text-slate-700 placeholder:text-slate-400"
                    />
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-[10px]">A</div>
            </div>

            {/* Results Grid */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-slate-50/50">
                <div className="text-[10px] text-slate-400">About 1,200,000 results (0.42 seconds)</div>
                {results.map((r, i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="flex items-center gap-2 mb-0.5">
                            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                <Globe className="w-3 h-3 text-slate-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-800 font-medium">{r.title.split(' - ')[1] || 'Web'}</span>
                                <span className="text-[8px] text-slate-400">{r.url}</span>
                            </div>
                            <MoreVertical className="w-3 h-3 text-slate-300 ml-auto opacity-0 group-hover:opacity-100" />
                        </div>
                        <h3 className="text-sm font-semibold text-blue-700 group-hover:underline decoration-blue-700/50">{r.title.split(' - ')[0]}</h3>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">{r.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
