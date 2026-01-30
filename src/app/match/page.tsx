"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { restaurants, mockGroupMembers, priceDisplay } from "@/data/restaurants";

function MatchContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "1";
    const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);

    const share = async () => {
        const msg = `🍽️ We matched on ${restaurant.name}! ${restaurant.cuisine} • ${restaurant.address}`;
        if (navigator.share) {
            try { await navigator.share({ text: msg }); } catch { }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
        }
    };

    return (
        <div className="flex flex-col bg-[#0d0907]" style={{ minHeight: "100dvh" }}>
            {/* Confetti */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-2 w-2 rounded-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: ["#f46a25", "#22c55e", "#3b82f6", "#eab308"][i % 4],
                            animation: `confetti-fall 2s ease-out ${Math.random() * 0.3}s forwards`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className={`flex-1 flex flex-col px-5 pt-safe pt-12 pb-safe pb-6 transition-all duration-300 ${visible ? "opacity-100" : "opacity-0 translate-y-4"}`}>
                {/* Header */}
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🎉</div>
                    <h1 className="text-2xl font-extrabold text-white">It&apos;s a Match!</h1>
                    <p className="text-white/40 text-sm">Everyone loves this spot</p>
                </div>

                {/* Card */}
                <div className="flex-1 flex items-center justify-center py-2">
                    <div className="w-full max-w-[300px] bg-[#171211] rounded-3xl overflow-hidden border border-white/10">
                        <div className="relative h-36">
                            <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#171211] to-transparent" />
                            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f46a25]">
                                <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-white text-xs font-bold">{restaurant.rating}</span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-white mb-0.5">{restaurant.name}</h2>
                            <p className="text-white/40 text-sm mb-3">{restaurant.cuisine} • {priceDisplay(restaurant.priceLevel)} • {restaurant.distance}</p>
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {mockGroupMembers.slice(0, 3).map(m => (
                                        <div key={m.id} className="h-8 w-8 rounded-full bg-[#2a201a] border-2 border-[#171211] flex items-center justify-center text-sm">{m.avatar}</div>
                                    ))}
                                </div>
                                <span className="text-white/40 text-sm">{mockGroupMembers.length} matched</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5">
                    <button className="w-full bg-gradient-to-r from-[#f46a25] to-[#d35a15] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#f46a25]/20">
                        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                        Book a Table
                    </button>
                    <div className="flex gap-2.5">
                        <button onClick={share} className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl flex items-center justify-center gap-1.5">
                            <span className="material-symbols-outlined text-lg">share</span>
                            Share
                        </button>
                        <Link href="/split" className="flex-1 bg-white/5 border border-white/10 text-white py-3 rounded-xl flex items-center justify-center gap-1.5">
                            <span className="material-symbols-outlined text-lg">payments</span>
                            Split Bill
                        </Link>
                    </div>
                </div>

                <Link href="/discover" className="text-center text-white/30 text-sm mt-4">Keep swiping →</Link>
            </div>
        </div>
    );
}

export default function MatchPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center bg-[#0d0907]" style={{ minHeight: "100dvh" }}><span className="text-white/30">Loading...</span></div>}>
            <MatchContent />
        </Suspense>
    );
}
