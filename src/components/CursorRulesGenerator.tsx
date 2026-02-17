'use client';

import { useState } from 'react';
import { Download, FileCode, Bot } from 'lucide-react';
import { generateCursorRules } from '@/lib/cursor-rules';

interface CursorRulesGeneratorProps {
    systemName: string;
}

export default function CursorRulesGenerator({ systemName }: CursorRulesGeneratorProps) {
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        const rules = generateCursorRules(systemName);
        const blob = new Blob([rules], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '.cursorrules';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3000);
    };

    return (
        <button
            onClick={handleDownload}
            className="group relative w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-800 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-md"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-900/30 transition-colors border border-white/5">
                    <Bot className="w-5 h-5 text-slate-400 group-hover:text-blue-400" />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                        Get .cursorrules
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded uppercase tracking-wide border border-white/5">Beta</span>
                    </h3>
                    <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Auto-configure your AI Editor</p>
                </div>
            </div>

            <div className={`p-2 rounded-full transition-colors ${downloaded ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-500 group-hover:bg-blue-500/10 group-hover:text-blue-400'}`}>
                {downloaded ? <FileCode className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            </div>
        </button>
    );
}
