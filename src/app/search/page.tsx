"use client";

import { useState } from "react";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const results = query.length > 1
        ? restaurants.filter(r =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6)
        : [];

    return (
        <div className="fixed inset-0 bg-[#0f0a07] flex flex-col overflow-hidden">
            {/* Header */}
            <header className="relative z-10 px-5 pt-14 pb-4">
                <h1 className="text-white text-2xl font-bold mb-4">Search</h1>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30">search</span>
                    <input
                        type="text"
                        placeholder="Restaurant or cuisine..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-[#1a1210] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-[#f46a25]/50"
                    />
                </div>
            </header>

            {/* Results */}
            <main className="flex-1 px-5 pb-24 overflow-y-auto">
                {query.length < 2 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                        <span className="material-symbols-outlined text-6xl text-white/10 mb-4">search</span>
                        <p className="text-white/30">Search for restaurants</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                        <span className="material-symbols-outlined text-6xl text-white/10 mb-4">search_off</span>
                        <p className="text-white/30">No results found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {results.map((r) => (
                            <div key={r.id} className="flex items-center gap-4 p-3 bg-[#1a1210] rounded-2xl border border-white/5">
                                <img src={r.image} alt={r.name} className="w-16 h-16 rounded-xl object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold truncate">{r.name}</h3>
                                    <p className="text-white/40 text-sm">{r.cuisine} • {r.distance}</p>
                                </div>
                                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f46a25]/20">
                                    <span className="material-symbols-outlined text-[#f46a25] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    <span className="text-[#f46a25] text-sm font-semibold">{r.rating}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="absolute bottom-0 left-0 right-0 bg-[#0f0a07]/95 backdrop-blur-xl border-t border-white/5 px-8 pt-3 pb-8">
                <div className="flex justify-between items-center max-w-[300px] mx-auto">
                    {[
                        { icon: "home", href: "/discover", active: false },
                        { icon: "search", href: "/search", active: true },
                        { icon: "group", href: "/group", active: false },
                        { icon: "person", href: "/profile", active: false },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`p-2 ${item.active ? "text-[#f46a25]" : "text-white/30"}`}
                        >
                            <span
                                className="material-symbols-outlined text-2xl"
                                style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}
                            >
                                {item.icon}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
