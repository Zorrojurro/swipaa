"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { restaurants } from "@/data/restaurants";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const results = query.length > 1 ? restaurants.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5) : [];

    return (
        <div className="flex flex-col bg-[#0d0907]" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <div className="px-5 pt-safe pt-10 pb-3">
                <h1 className="text-white text-xl font-bold mb-3">Search</h1>
                <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 text-xl">search</span>
                    <input
                        type="text"
                        placeholder="Restaurant or cuisine..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-[#171211] border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[#f46a25]/40"
                    />
                </div>
            </div>

            {/* Results */}
            <main className="flex-1 px-5 py-2 overflow-y-auto">
                {query.length < 2 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-30">
                        <span className="material-symbols-outlined text-5xl mb-2">search</span>
                        <p className="text-sm">Search for restaurants</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-30">
                        <span className="material-symbols-outlined text-5xl mb-2">search_off</span>
                        <p className="text-sm">No results</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {results.map(r => (
                            <div key={r.id} className="flex items-center gap-3 p-3 bg-[#171211] rounded-2xl border border-white/5">
                                <img src={r.image} alt={r.name} className="h-14 w-14 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium truncate">{r.name}</h3>
                                    <p className="text-white/40 text-sm">{r.cuisine} • {r.distance}</p>
                                </div>
                                <div className="flex items-center gap-0.5 text-[#f46a25]">
                                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="text-sm font-semibold">{r.rating}</span>
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
