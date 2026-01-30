"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { restaurants, mockGroupMembers, priceDisplay } from "@/data/restaurants";

function MatchContent() {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get("id") || "1";
    const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100);
    }, []);

    const handleShare = async () => {
        const msg = `🍽️ We matched on ${restaurant.name}!\n${restaurant.cuisine} • ${restaurant.address}\n\nJoin us on Swipaa!`;
        if (navigator.share) {
            try { await navigator.share({ title: restaurant.name, text: msg }); } catch { }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0f0a07] flex flex-col overflow-hidden">
            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-sm"
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: ["#f46a25", "#22c55e", "#3b82f6", "#eab308"][i % 4],
                            animation: `confetti-fall 2.5s ease-out ${Math.random() * 0.5}s forwards`,
                        }}
                    />
                ))}
            </div>

            {/* Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#f46a25]/20 rounded-full blur-[120px] pointer-events-none" />

            {/* Content */}
            <div className={`relative z-10 flex-1 flex flex-col px-6 pt-16 pb-8 transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="text-5xl mb-3">🎉</div>
                    <h1 className="text-3xl font-extrabold text-white mb-1">It&apos;s a Match!</h1>
                    <p className="text-white/40 text-sm">Everyone loves this spot</p>
                </div>

                {/* Restaurant Card */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-[320px] bg-gradient-to-b from-[#1f1612] to-[#151010] rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
                        <div className="relative h-40">
                            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1612] via-transparent to-transparent" />
                            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f46a25] shadow-lg">
                                <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                <span className="text-white text-sm font-bold">{restaurant.rating}</span>
                            </div>
                        </div>

                        <div className="p-5">
                            <h2 className="text-xl font-bold text-white mb-1">{restaurant.name}</h2>
                            <p className="text-white/40 text-sm mb-4">
                                {restaurant.cuisine} • {priceDisplay(restaurant.priceLevel)} • {restaurant.distance}
                            </p>

                            {/* Members */}
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {mockGroupMembers.slice(0, 4).map((m) => (
                                        <div key={m.id} className="w-9 h-9 rounded-full bg-[#2a1f1a] border-2 border-[#1f1612] flex items-center justify-center text-base">
                                            {m.avatar}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-white/40 text-sm">{mockGroupMembers.length} matched</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 mt-6">
                    <button className="w-full bg-gradient-to-r from-[#f46a25] to-[#e55815] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-[#f46a25]/30 active:scale-[0.98] transition-transform">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                        Book a Table
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="flex-1 bg-white/5 border border-white/10 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">share</span>
                            Share
                        </button>
                        <Link
                            href="/split"
                            className="flex-1 bg-white/5 border border-white/10 text-white font-medium py-3.5 rounded-xl flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-lg">payments</span>
                            Split Bill
                        </Link>
                    </div>
                </div>

                <Link href="/discover" className="text-center text-white/30 text-sm mt-5 block">
                    Keep swiping →
                </Link>
            </div>
        </div>
    );
}

export default function MatchPage() {
    return (
        <Suspense fallback={<div className="fixed inset-0 bg-[#0f0a07] flex items-center justify-center"><span className="text-white/30">Loading...</span></div>}>
            <MatchContent />
        </Suspense>
    );
}
