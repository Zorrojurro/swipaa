"use client";

import BottomNav from "@/components/BottomNav";
import { restaurants } from "@/data/restaurants";

export default function SavedPage() {
    const saved = restaurants.slice(0, 5);

    return (
        <div className="flex flex-col bg-[#0d0907]" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <div className="px-5 pt-safe pt-10 pb-3">
                <h1 className="text-white text-xl font-bold">Saved Places</h1>
                <p className="text-white/40 text-sm">{saved.length} restaurants</p>
            </div>

            {/* List */}
            <main className="flex-1 px-5 py-2 overflow-y-auto">
                <div className="space-y-2">
                    {saved.map(r => (
                        <div key={r.id} className="flex items-center gap-3 p-3 bg-[#171211] rounded-2xl border border-white/5">
                            <img src={r.image} alt={r.name} className="h-14 w-14 rounded-xl object-cover" />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium truncate">{r.name}</h3>
                                <p className="text-white/40 text-sm">{r.cuisine} • {r.distance}</p>
                            </div>
                            <button className="h-9 w-9 rounded-full bg-[#f46a25]/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#f46a25] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
