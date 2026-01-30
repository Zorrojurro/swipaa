"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { restaurants } from "@/data/restaurants";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const results = query.length > 1 ? restaurants.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6) : [];

    return (
        <div className="flex flex-col bg-black" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <div className="px-5 pt-14 pb-4">
                <h1 className="text-white text-2xl font-bold tracking-tight mb-4">Search</h1>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30">search</span>
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 focus:bg-white/[0.08] transition-colors"
                    />
                </div>
            </div>

            {/* Results */}
            <main className="flex-1 px-5 py-2 overflow-y-auto">
                {query.length < 2 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-20 pb-20">
                        <span className="material-symbols-outlined text-6xl mb-3">search</span>
                        <p className="text-sm">Search for restaurants</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-20 pb-20">
                        <span className="material-symbols-outlined text-6xl mb-3">search_off</span>
                        <p className="text-sm">No results found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {results.map(r => (
                            <div key={r.id} className="flex items-center gap-4 p-3 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition-colors">
                                <img src={r.image} alt={r.name} className="h-16 w-16 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold truncate">{r.name}</h3>
                                    <p className="text-white/40 text-sm">{r.cuisine} • {r.distance}</p>
                                </div>
                                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20">
                                    <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="text-amber-400 text-sm font-semibold">{r.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
}
