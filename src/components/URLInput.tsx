'use client';

import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface URLInputProps {
    onSearch: (url: string) => void;
    isLoading: boolean;
}

export default function URLInput({ onSearch, isLoading }: URLInputProps) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onSearch(url);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl relative z-20 group">
            <div className="relative flex items-center">
                <Search className="absolute left-6 text-slate-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="e.g. x.com, uber, netflix..."
                    className="w-full pl-16 pr-32 py-5 bg-white/70 backdrop-blur-2xl border border-white/50 rounded-2xl text-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300"
                    disabled={isLoading}
                />

                <div className="absolute right-3 flex items-center gap-2">
                    <AnimatePresence>
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="mr-3"
                            >
                                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            </motion.div>
                        ) : (
                            <button
                                type="submit"
                                disabled={!url.trim()}
                                className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-900/20"
                            >
                                Analyze <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Ambient Bloom */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-3xl blur-2xl opacity-0 group-focus-within:opacity-20 transition-opacity duration-500 -z-10" />
        </form>
    );
}
