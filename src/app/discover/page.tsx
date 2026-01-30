"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { useRestaurants } from "@/context/RestaurantContext";
import { Restaurant, spiceDisplay, priceDisplay } from "@/data/restaurants";

export default function DiscoverPage() {
    const router = useRouter();
    const { restaurants, location } = useRestaurants();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
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
        setLikedRestaurants(prev => [...prev, currentRestaurant]);

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });

            if (likedRestaurants.length >= 2) {
                router.push(`/match?id=${currentRestaurant.id}`);
            }
        }, 300);
    }, [currentRestaurant, likedRestaurants.length, router]);

    const handlePass = useCallback(() => {
        if (!currentRestaurant) return;
        setSwipeDirection("left");

        setTimeout(() => {
            setCurrentIndex(prev => prev + 1);
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });
        }, 300);
    }, [currentRestaurant]);

    const handleSuperLike = () => handleLike();

    const handleUndo = useCallback(() => {
        if (currentIndex === 0) return;
        if (likedRestaurants.length > 0) {
            setLikedRestaurants(prev => prev.slice(0, -1));
        }
        setCurrentIndex(prev => prev - 1);
    }, [currentIndex, likedRestaurants.length]);

    // Touch handlers
    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const deltaX = e.touches[0].clientX - startPos.x;
        const deltaY = e.touches[0].clientY - startPos.y;
        setDragOffset({ x: deltaX, y: deltaY * 0.2 });
    };

    const onTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (dragOffset.x > 80) handleLike();
        else if (dragOffset.x < -80) handlePass();
        else setDragOffset({ x: 0, y: 0 });
    };

    // Keyboard controls
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleLike();
            if (e.key === "ArrowLeft") handlePass();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleLike, handlePass]);

    // Card transform
    const cardStyle = swipeDirection === "left"
        ? { transform: "translateX(-120%) rotate(-15deg)", opacity: 0, transition: "all 0.3s ease-out" }
        : swipeDirection === "right"
            ? { transform: "translateX(120%) rotate(15deg)", opacity: 0, transition: "all 0.3s ease-out" }
            : {
                transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${dragOffset.x * 0.03}deg)`,
                transition: isDragging ? "none" : "all 0.2s ease-out",
            };

    // Empty state
    if (!currentRestaurant) {
        return (
            <div className="flex flex-col min-h-dvh bg-[#1a120d]">
                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-white/30">restaurant</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">No more restaurants</h2>
                    <p className="text-white/50 mb-6 max-w-[250px]">You&apos;ve seen all the options. Start over?</p>
                    <button
                        onClick={() => setCurrentIndex(0)}
                        className="px-6 py-3 bg-[#f46a25] text-white font-semibold rounded-xl"
                    >
                        Start Over
                    </button>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-dvh bg-[#1a120d]">
            {/* Header */}
            <header className="flex items-center justify-between px-5 pt-12 pb-3 shrink-0">
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/70 text-xl">person</span>
                </button>
                <div className="text-center">
                    <h1 className="text-white font-bold text-lg">Discover</h1>
                    <p className="text-white/40 text-xs">{location.loading ? "Locating..." : location.city}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/70 text-xl">tune</span>
                </button>
            </header>

            {/* Card Stack */}
            <main className="flex-1 relative px-4 pb-4 flex items-center justify-center overflow-hidden">
                {/* Next card (behind) */}
                {nextRestaurant && (
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-[70vh] max-h-[500px] rounded-3xl overflow-hidden scale-95 opacity-50">
                        <img src={nextRestaurant.image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>
                )}

                {/* Current card */}
                <div
                    className="relative w-full max-w-[350px] h-[70vh] max-h-[500px] rounded-3xl overflow-hidden shadow-2xl touch-pan-y select-none"
                    style={cardStyle}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Like/Nope indicators */}
                    <div
                        className="absolute top-6 left-6 z-20 px-4 py-2 border-4 border-green-500 rounded-lg -rotate-12 opacity-0 transition-opacity"
                        style={{ opacity: Math.min(1, Math.max(0, dragOffset.x / 60)) }}
                    >
                        <span className="text-green-500 font-black text-2xl">YUM!</span>
                    </div>
                    <div
                        className="absolute top-6 right-6 z-20 px-4 py-2 border-4 border-red-500 rounded-lg rotate-12 opacity-0 transition-opacity"
                        style={{ opacity: Math.min(1, Math.max(0, -dragOffset.x / 60)) }}
                    >
                        <span className="text-red-500 font-black text-2xl">NOPE</span>
                    </div>

                    {/* Image */}
                    <img
                        src={currentRestaurant.image}
                        alt={currentRestaurant.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[#f46a25] text-sm">near_me</span>
                            <span className="text-white text-xs font-medium">{currentRestaurant.distance}</span>
                        </div>
                        {currentRestaurant.isOpen && (
                            <div className="px-2.5 py-1 rounded-full bg-green-500/20 backdrop-blur-sm">
                                <span className="text-green-400 text-xs font-medium">Open</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                        {/* Rating */}
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#f46a25] mb-3">
                            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-white text-sm font-bold">{currentRestaurant.rating}</span>
                            <span className="text-white/70 text-xs">({currentRestaurant.reviewCount.toLocaleString()})</span>
                        </div>

                        {/* Name & details */}
                        <h2 className="text-white text-2xl font-bold mb-1">{currentRestaurant.name}</h2>
                        <p className="text-white/60 text-sm mb-3">
                            {currentRestaurant.cuisine} • {priceDisplay(currentRestaurant.priceLevel)}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {currentRestaurant.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                            {spice && (
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{ backgroundColor: `${spice.color}20`, color: spice.color }}
                                >
                                    🌶️ {spice.label}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Swipe hint */}
                {currentIndex === 0 && (
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <p className="text-white/30 text-sm animate-pulse">← Swipe to decide →</p>
                    </div>
                )}
            </main>

            {/* Action Buttons */}
            <div className="shrink-0 flex items-center justify-center gap-5 py-5 px-6">
                <button
                    onClick={handleUndo}
                    disabled={currentIndex === 0}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center disabled:opacity-30"
                >
                    <span className="material-symbols-outlined text-yellow-400 text-xl">replay</span>
                </button>
                <button
                    onClick={handlePass}
                    className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-red-400 text-3xl">close</span>
                </button>
                <button
                    onClick={handleLike}
                    className="w-16 h-16 rounded-full bg-[#f46a25] flex items-center justify-center shadow-lg shadow-[#f46a25]/30 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <button
                    onClick={handleSuperLike}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-blue-400 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </button>
            </div>

            {/* Bottom Nav */}
            <BottomNav />
        </div>
    );
}
