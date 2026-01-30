"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { restaurants, mockGroupMembers, priceDisplay } from "@/data/restaurants";

function MatchRevealContent() {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get("id") || "1";
    const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];

    const [showConfetti, setShowConfetti] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
        setTimeout(() => setShowConfetti(false), 3000);
    }, []);

    const handleShare = async () => {
        const message = `🍽️ We matched on ${restaurant.name}!\n\n${restaurant.cuisine} • ${restaurant.address}\n\nJoin us via Swipaa!`;

        if (navigator.share) {
            try {
                await navigator.share({ title: `Let's eat at ${restaurant.name}!`, text: message });
            } catch { }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
        }
    };

    return (
        <div className="min-h-dvh bg-[#1a120d] flex flex-col">
            {/* Confetti */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 rounded-sm animate-[confetti-fall_2.5s_ease-out_forwards]"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ["#f46a25", "#22c55e", "#3b82f6", "#eab308", "#ec4899"][i % 5],
                                animationDelay: `${Math.random() * 0.8}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div className={`flex-1 flex flex-col px-5 pt-16 pb-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🎉</div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">It&apos;s a Match!</h1>
                    <p className="text-white/50">Everyone in your group loved this spot</p>
                </div>

                {/* Restaurant Card */}
                <div className="bg-[#2a1f1a] rounded-3xl overflow-hidden border border-white/10 mb-6">
                    <div className="relative h-48">
                        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f1a] via-transparent to-transparent" />
                        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f46a25]">
                            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-white text-sm font-bold">{restaurant.rating}</span>
                        </div>
                    </div>

                    <div className="p-5">
                        <h2 className="text-xl font-bold text-white mb-1">{restaurant.name}</h2>
                        <p className="text-white/50 text-sm mb-4">
                            {restaurant.cuisine} • {priceDisplay(restaurant.priceLevel)} • {restaurant.distance}
                        </p>

                        {/* Matched members */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex -space-x-2">
                                {mockGroupMembers.slice(0, 4).map((member) => (
                                    <div
                                        key={member.id}
                                        className="w-10 h-10 rounded-full bg-[#3a2e28] border-2 border-[#2a1f1a] flex items-center justify-center text-lg"
                                    >
                                        {member.avatar}
                                    </div>
                                ))}
                            </div>
                            <span className="text-white/50 text-sm">{mockGroupMembers.length} people matched</span>
                        </div>

                        {/* Info row */}
                        <div className="flex items-center gap-4 text-white/50 text-sm">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">schedule</span>
                                {restaurant.deliveryTime}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-base">location_on</span>
                                {restaurant.distance}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 mt-auto">
                    <button className="w-full bg-[#f46a25] text-white text-lg font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                        Book a Table
                    </button>

                    <button
                        onClick={handleShare}
                        className="w-full bg-white/5 border border-white/10 text-white text-lg font-medium py-4 rounded-2xl flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">share</span>
                        Share with Group
                    </button>

                    <Link
                        href="/split"
                        className="w-full bg-white/5 border border-white/10 text-white text-lg font-medium py-4 rounded-2xl flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">payments</span>
                        Split the Bill
                    </Link>
                </div>

                <Link href="/discover" className="text-center text-white/40 text-sm mt-6 hover:text-white/60">
                    Keep swiping →
                </Link>
            </div>
        </div>
    );
}

export default function MatchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-dvh flex items-center justify-center bg-[#1a120d]">
                <div className="text-white/50">Loading...</div>
            </div>
        }>
            <MatchRevealContent />
        </Suspense>
    );
}
