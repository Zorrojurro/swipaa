"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRestaurants } from "@/context/RestaurantContext";
import { Restaurant, spiceDisplay, priceDisplay } from "@/data/restaurants";

export default function DiscoverPage() {
    const router = useRouter();
    const { restaurants, location } = useRestaurants();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const currentRestaurant = restaurants[currentIndex];
    const nextRestaurant = restaurants[currentIndex + 1];
    const spice = currentRestaurant ? spiceDisplay(currentRestaurant.spiceLevel) : null;

    const handleLike = useCallback(() => {
        if (!currentRestaurant) return;
        setSwipeDirection("right");
        const newCount = likedCount + 1;
        setLikedCount(newCount);

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });

            if (newCount >= 3) {
                router.push(`/match?id=${currentRestaurant.id}`);
            }
        }, 250);
    }, [currentRestaurant, likedCount, router]);

    const handlePass = useCallback(() => {
        if (!currentRestaurant) return;
        setSwipeDirection("left");

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });
        }, 250);
    }, [currentRestaurant]);

    // Touch handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startPos.x;
        setDragOffset({ x: deltaX, y: 0 });
    };

    const onTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (dragOffset.x > 100) handleLike();
        else if (dragOffset.x < -100) handlePass();
        else setDragOffset({ x: 0, y: 0 });
    };

    // Keyboard
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleLike();
            if (e.key === "ArrowLeft") handlePass();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleLike, handlePass]);

    // Card style
    const cardStyle = swipeDirection === "left"
        ? { transform: "translateX(-120%) rotate(-15deg)", opacity: 0, transition: "all 0.25s ease-out" }
        : swipeDirection === "right"
            ? { transform: "translateX(120%) rotate(15deg)", opacity: 0, transition: "all 0.25s ease-out" }
            : {
                transform: `translateX(${dragOffset.x}px) rotate(${dragOffset.x * 0.04}deg)`,
                transition: isDragging ? "none" : "all 0.15s ease-out",
            };

    // Empty state
    if (!currentRestaurant) {
        return (
            <div className="fixed inset-0 bg-[#0f0a07] flex flex-col items-center justify-center px-8 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-white/20">restaurant</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">All done!</h2>
                <p className="text-white/40 mb-8">You&apos;ve seen all restaurants</p>
                <button onClick={() => setCurrentIndex(0)} className="px-8 py-3 bg-[#f46a25] text-white font-semibold rounded-xl">
                    Start Over
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-[#0f0a07] flex flex-col overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f46a25]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between px-5 pt-14 pb-4">
                <button className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/70 text-xl">person</span>
                </button>
                <div className="text-center">
                    <h1 className="text-white font-bold text-lg">Discover</h1>
                    <p className="text-white/40 text-xs">{location.city}</p>
                </div>
                <button className="w-11 h-11 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/70 text-xl">tune</span>
                </button>
            </header>

            {/* Card Area */}
            <main className="relative z-10 flex-1 flex items-center justify-center px-5 pb-4">
                {/* Background card */}
                {nextRestaurant && (
                    <div className="absolute inset-x-8 h-[60vh] max-h-[450px] rounded-[28px] overflow-hidden scale-[0.92] opacity-40">
                        <img src={nextRestaurant.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                )}

                {/* Current card */}
                <div
                    className="relative w-full max-w-[340px] h-[60vh] max-h-[450px] rounded-[28px] overflow-hidden shadow-2xl touch-pan-y select-none"
                    style={cardStyle}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Swipe indicators */}
                    <div
                        className="absolute top-6 left-6 z-30 px-4 py-2 border-[3px] border-green-400 rounded-xl -rotate-12 transition-opacity"
                        style={{ opacity: Math.min(1, Math.max(0, dragOffset.x / 80)) }}
                    >
                        <span className="text-green-400 font-black text-xl tracking-wide">YUM!</span>
                    </div>
                    <div
                        className="absolute top-6 right-6 z-30 px-4 py-2 border-[3px] border-red-400 rounded-xl rotate-12 transition-opacity"
                        style={{ opacity: Math.min(1, Math.max(0, -dragOffset.x / 80)) }}
                    >
                        <span className="text-red-400 font-black text-xl tracking-wide">NOPE</span>
                    </div>

                    {/* Image */}
                    <img
                        src={currentRestaurant.image}
                        alt={currentRestaurant.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Top info */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                                <span className="material-symbols-outlined text-[#f46a25] text-sm">near_me</span>
                                <span className="text-white text-xs font-medium">{currentRestaurant.distance}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f46a25] shadow-lg">
                            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-white text-sm font-bold">{currentRestaurant.rating}</span>
                        </div>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                        <h2 className="text-white text-2xl font-bold mb-1">{currentRestaurant.name}</h2>
                        <p className="text-white/60 text-sm mb-3">
                            {currentRestaurant.cuisine} • {priceDisplay(currentRestaurant.priceLevel)} • {currentRestaurant.deliveryTime}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {currentRestaurant.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                            {spice && (
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                                    style={{ backgroundColor: `${spice.color}30`, color: spice.color }}
                                >
                                    🌶️ {spice.label}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Action Buttons */}
            <div className="relative z-20 flex items-center justify-center gap-6 py-6 pb-10">
                <button
                    onClick={handlePass}
                    className="w-16 h-16 rounded-full bg-[#1a1210] border border-white/10 flex items-center justify-center shadow-xl active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-red-400 text-3xl">close</span>
                </button>
                <button
                    onClick={handleLike}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f46a25] to-[#d4520f] flex items-center justify-center shadow-xl shadow-[#f46a25]/40 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <button
                    className="w-16 h-16 rounded-full bg-[#1a1210] border border-white/10 flex items-center justify-center shadow-xl active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-blue-400 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </button>
            </div>

            {/* Bottom Nav */}
            <nav className="relative z-20 bg-[#0f0a07]/90 backdrop-blur-xl border-t border-white/5 px-8 pt-3 pb-8">
                <div className="flex justify-between items-center max-w-[300px] mx-auto">
                    {[
                        { icon: "home", href: "/discover", active: true },
                        { icon: "search", href: "/search", active: false },
                        { icon: "group", href: "/group", active: false },
                        { icon: "person", href: "/profile", active: false },
                    ].map((item) => (
                        <a
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
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
}
