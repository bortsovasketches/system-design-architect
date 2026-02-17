'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Star, Tag, Truck } from 'lucide-react';

export default function MarketplaceWidget() {
    const products = [
        { id: 1, name: "Pro Dev Kit", price: "$499", rating: 4.9, color: "from-blue-500/20 to-purple-500/20" },
        { id: 2, name: "Cloud Credit", price: "$100", rating: 4.7, color: "from-emerald-500/20 to-teal-500/20" },
        { id: 3, name: "Mechanical Keys", price: "$129", rating: 4.8, color: "from-orange-500/20 to-red-500/20" },
    ];

    return (
        <div className="w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-64 relative">
            {/* Header */}
            <div className="p-3 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-300">Marketplace</span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded border border-red-500/20">Sale</span>
                </div>
                <ShoppingCart className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                    {products.map((p) => (
                        <div key={p.id} className="bg-slate-900 rounded-lg p-3 border border-slate-800 hover:border-blue-500/30 transition-all group cursor-pointer">
                            <div className={`aspect-square rounded-md bg-gradient-to-br ${p.color} mb-3 flex items-center justify-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Tag className="w-6 h-6 text-white/50" />
                            </div>

                            <h4 className="text-xs font-bold text-slate-200 truncate">{p.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-xs font-bold text-emerald-400">{p.price}</span>
                                <div className="flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                                    <span className="text-[10px] text-slate-500">{p.rating}</span>
                                </div>
                            </div>

                            <button className="w-full mt-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-1.5 rounded transition-colors flex items-center justify-center gap-1.5">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>

                {/* Banner */}
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 flex items-center gap-3">
                    <div className="p-2 rounded-full bg-indigo-500/20 text-indigo-300">
                        <Truck className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-indigo-200">Free Shipping</div>
                        <div className="text-[10px] text-indigo-300/60">On orders over $50</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
