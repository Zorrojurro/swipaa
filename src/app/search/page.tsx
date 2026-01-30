"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { restaurants } from "@/data/restaurants";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const results = query.length > 0
        ? restaurants.filter(r =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div className="min-h-dvh bg-[#1a120d] flex flex-col">
            {/* Header */}
            <div className="px-5 pt-12 pb-4">
                <h1 className="text-white text-2xl font-bold mb-4">Search</h1>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/40">search</span>
                    <input
                        type="text"
                        placeholder="Restaurant name or cuisine..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-[#2a1f1a] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f46a25]/50"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="flex-1 px-5 pb-4 overflow-y-auto">
                {query.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-white/20 mb-4">search</span>
                        <p className="text-white/40">Search for restaurants</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-white/20 mb-4">search_off</span>
                        <p className="text-white/40">No results found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {results.map((r) => (
                            <div key={r.id} className="flex items-center gap-3 p-3 bg-[#2a1f1a] rounded-xl border border-white/5">
                                <img src={r.image} alt={r.name} className="w-16 h-16 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold truncate">{r.name}</h3>
                                    <p className="text-white/40 text-sm">{r.cuisine} • {r.distance}</p>
                                </div>
                                <div className="flex items-center gap-1 text-[#f46a25]">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="text-sm font-semibold">{r.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
