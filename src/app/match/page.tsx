"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { restaurants, mockGroupMembers, priceDisplay, spiceDisplay } from "@/data/restaurants";

function MatchRevealContent() {
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get("id") || "1";
    const restaurant = restaurants.find(r => r.id === restaurantId) || restaurants[0];
    const spice = spiceDisplay(restaurant.spiceLevel);

    const [showConfetti, setShowConfetti] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
        setTimeout(() => setShowConfetti(false), 2000);
    }, []);

    const handleShare = async () => {
        const message = `🍽️ We matched on ${restaurant.name}!\n\nJoin us for ${restaurant.cuisine} at ${restaurant.address}.\n\n📍 ${restaurant.distance} away\n⭐ ${restaurant.rating} rating\n\nBooked via Swipaa!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Let's eat at ${restaurant.name}!`,
                    text: message,
                });
            } catch {
                // User cancelled or error
            }
        } else {
            // Fallback to WhatsApp direct link
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        }
    };

    return (
        <div className="relative min-h-dvh flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#2a1810] via-[#221610] to-[#1a0f08]" />

            {/* Confetti */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div
                            key={i}
                            className="confetti absolute w-3 h-3 rounded-sm"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ["#f46a25", "#22c55e", "#3b82f6", "#eab308", "#ec4899"][i % 5],
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${2 + Math.random()}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Content */}
            <div
                className={`relative z-10 w-full max-w-sm flex flex-col items-center transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
            >
                {/* Celebration emoji */}
                <div className="text-5xl mb-4 animate-bounce">🎉</div>

                {/* Title */}
                <h1 className="text-3xl font-extrabold text-white text-center mb-2">
                    It&apos;s a Match!
                </h1>
                <p className="text-white/60 text-center mb-6">
                    Everyone in your group liked this spot.
                </p>

                {/* Restaurant Card */}
                <div className="w-full bg-[#2a221e] rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-6">
                    {/* Image */}
                    <div
                        className="w-full h-48 bg-cover bg-center relative"
                        style={{ backgroundImage: `url('${restaurant.image}')` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2a221e] via-transparent to-transparent" />

                        {/* Rating badge */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#f46a25] px-2.5 py-1 rounded-lg">
                            <span
                                className="material-symbols-outlined text-white text-[16px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                star
                            </span>
                            <span className="text-white text-sm font-bold">{restaurant.rating}</span>
                            <span className="text-white/80 text-xs">({restaurant.reviewCount.toLocaleString()})</span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h2 className="text-xl font-bold text-white">{restaurant.name}</h2>
                                <p className="text-white/60 text-sm">
                                    {restaurant.cuisine} • {priceDisplay(restaurant.priceLevel)} • {restaurant.distance}
                                </p>
                            </div>
                            <span
                                className="material-symbols-outlined text-[#f46a25] text-[28px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                favorite
                            </span>
                        </div>

                        {/* Matched with */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-white/40 text-xs uppercase font-medium">Matched with</span>
                            <Link href="/group" className="text-[#f46a25] text-xs font-medium">View Group</Link>
                        </div>

                        {/* Avatars */}
                        <div className="flex items-center gap-1 mb-4">
                            {mockGroupMembers.map((member, index) => (
                                <div
                                    key={member.id}
                                    className="w-10 h-10 rounded-full bg-[#3a2e28] border-2 border-[#2a221e] flex items-center justify-center text-lg"
                                    style={{ marginLeft: index > 0 ? "-8px" : 0 }}
                                >
                                    {member.avatar}
                                </div>
                            ))}
                            <span className="text-white/60 text-sm ml-2">+ 2 others</span>
                        </div>

                        {/* Quick info */}
                        <div className="flex items-center gap-4 text-white/60 text-sm">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                {restaurant.deliveryTime}
                            </span>
                            <span
                                className="flex items-center gap-1"
                                style={{ color: spice.color }}
                            >
                                🌶️ {spice.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full space-y-3">
                    <button
                        className="w-full bg-[#f46a25] hover:bg-orange-600 text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#f46a25]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            restaurant
                        </span>
                        Book a Table
                    </button>

                    <button
                        onClick={handleShare}
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">share</span>
                        Share with Group
                    </button>

                    <Link
                        href="/split"
                        className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-lg font-medium py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">payments</span>
                        Split the Bill
                    </Link>
                </div>

                {/* Keep swiping link */}
                <Link
                    href="/discover"
                    className="mt-6 text-white/40 text-sm hover:text-white/60 transition-colors"
                >
                    Keep swiping ↻
                </Link>
            </div>
        </div>
    );
}

export default function MatchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-dvh flex items-center justify-center bg-[#221610]">
                <div className="text-white/60">Loading...</div>
            </div>
        }>
            <MatchRevealContent />
        </Suspense>
    );
}
