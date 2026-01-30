"use client";

import { useState } from "react";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const results = query.length > 1 ? restaurants.filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6) : [];

    return (
        <div className="flex flex-col" style={{ minHeight: "100dvh", background: "#1a120d" }}>
            <div className="px-5 pt-12 pb-3">
                <h1 className="text-white text-2xl font-bold mb-4">Search</h1>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/40">search</span>
                    <input
                        type="text"
                        placeholder="Search restaurants..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/15"
                    />
                </div>
            </div>

            <main className="flex-1 px-5 py-2 overflow-y-auto">
                {query.length < 2 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-30 pb-20">
                        <span className="material-symbols-outlined text-5xl mb-2">search</span>
                        <p>Search for restaurants</p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-30 pb-20">
                        <span className="material-symbols-outlined text-5xl mb-2">search_off</span>
                        <p>No results</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {results.map(r => (
                            <div key={r.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                <img src={r.image} alt={r.name} className="h-14 w-14 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-medium truncate">{r.name}</h3>
                                    <p className="text-white/50 text-sm">{r.cuisine} • {r.distance}</p>
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

            <nav className="flex justify-around items-center px-6 py-3 pb-6 border-t border-white/10">
                {[
                    { icon: "home", href: "/discover" },
                    { icon: "search", href: "/search", active: true },
                    { icon: "group", href: "/group" },
                    { icon: "person", href: "/profile" },
                ].map(item => (
                    <Link key={item.href} href={item.href} className={item.active ? "text-[#f46a25]" : "text-white/40"}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
