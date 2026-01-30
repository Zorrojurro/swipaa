"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { useRestaurants } from "@/context/RestaurantContext";
import { spiceDisplay, priceDisplay } from "@/data/restaurants";

export default function DiscoverPage() {
    const router = useRouter();
    const { restaurants, location } = useRestaurants();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
    const [dragX, setDragX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const current = restaurants[currentIndex];
    const next = restaurants[currentIndex + 1];

    const handleLike = useCallback(() => {
        if (!current) return;
        setSwipeDirection("right");
        const newCount = likedCount + 1;
        setLikedCount(newCount);

        setTimeout(() => {
            setCurrentIndex(i => i + 1);
            setSwipeDirection(null);
            setDragX(0);
            if (newCount >= 3) router.push(`/match?id=${current.id}`);
        }, 200);
    }, [current, likedCount, router]);

    const handlePass = useCallback(() => {
        if (!current) return;
        setSwipeDirection("left");
        setTimeout(() => {
            setCurrentIndex(i => i + 1);
            setSwipeDirection(null);
            setDragX(0);
        }, 200);
    }, [current]);

    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        setDragX(e.touches[0].clientX - startX);
    };

    const onTouchEnd = () => {
        setIsDragging(false);
        if (dragX > 80) handleLike();
        else if (dragX < -80) handlePass();
        else setDragX(0);
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleLike();
            if (e.key === "ArrowLeft") handlePass();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [handleLike, handlePass]);

    const cardTransform = swipeDirection === "left"
        ? "translateX(-110%) rotate(-12deg)"
        : swipeDirection === "right"
            ? "translateX(110%) rotate(12deg)"
            : `translateX(${dragX}px) rotate(${dragX * 0.03}deg)`;

    if (!current) {
        return (
            <div className="flex flex-col items-center justify-center bg-black px-6 text-center" style={{ minHeight: "100dvh" }}>
                <span className="material-symbols-outlined text-6xl text-white/10 mb-4">restaurant</span>
                <h2 className="text-xl font-bold text-white mb-2">All done!</h2>
                <p className="text-white/40 mb-6">You&apos;ve seen all restaurants</p>
                <button onClick={() => setCurrentIndex(0)} className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white font-semibold rounded-xl">
                    Start Over
                </button>
            </div>
        );
    }

    const spice = spiceDisplay(current.spiceLevel);

    return (
        <div className="flex flex-col bg-black" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <header className="flex items-center justify-between px-5 pt-14 pb-3">
                <Link href="/profile" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white/70 text-xl">person</span>
                </Link>
                <div className="text-center">
                    <h1 className="text-white font-semibold text-[17px]">Discover</h1>
                    <p className="text-white/40 text-xs">{location.city}</p>
                </div>
                <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white/70 text-xl">tune</span>
                </button>
            </header>

            {/* Card area */}
            <main className="flex-1 flex items-center justify-center px-5 py-2 relative overflow-hidden">
                {/* Next card behind */}
                {next && (
                    <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 aspect-[3/4] max-h-[60vh] rounded-3xl overflow-hidden opacity-25 scale-95 blur-[1px]">
                        <img src={next.image} alt="" className="h-full w-full object-cover" />
                    </div>
                )}

                {/* Current card */}
                <div
                    className="relative w-full max-w-[340px] aspect-[3/4] max-h-[60vh] rounded-[28px] overflow-hidden shadow-2xl touch-pan-y select-none"
                    style={{
                        transform: cardTransform,
                        opacity: swipeDirection ? 0 : 1,
                        transition: isDragging ? "none" : "all 0.2s ease-out",
                        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Swipe labels */}
                    <div
                        className="absolute top-6 left-6 z-20 px-5 py-2 border-[3px] border-emerald-400 rounded-xl -rotate-12 bg-emerald-400/10 backdrop-blur-sm"
                        style={{ opacity: Math.max(0, Math.min(1, dragX / 60)) }}
                    >
                        <span className="text-emerald-400 font-black text-xl tracking-wide">LIKE</span>
                    </div>
                    <div
                        className="absolute top-6 right-6 z-20 px-5 py-2 border-[3px] border-rose-400 rounded-xl rotate-12 bg-rose-400/10 backdrop-blur-sm"
                        style={{ opacity: Math.max(0, Math.min(1, -dragX / 60)) }}
                    >
                        <span className="text-rose-400 font-black text-xl tracking-wide">NOPE</span>
                    </div>

                    <img src={current.image} alt={current.name} className="absolute inset-0 h-full w-full object-cover" draggable={false} />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                            <span className="material-symbols-outlined text-white/80 text-sm">near_me</span>
                            <span className="text-white/90 text-xs font-medium">{current.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-white text-xs font-bold">{current.rating}</span>
                        </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                        <h2 className="text-white text-[22px] font-bold mb-1 tracking-tight">{current.name}</h2>
                        <p className="text-white/60 text-sm mb-3">{current.cuisine} • {priceDisplay(current.priceLevel)} • {current.deliveryTime}</p>
                        <div className="flex flex-wrap gap-2">
                            {current.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium">{tag}</span>
                            ))}
                            <span className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm" style={{ backgroundColor: `${spice.color}20`, color: spice.color }}>
                                🌶️ {spice.label}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Actions */}
            <div className="flex items-center justify-center gap-6 py-5">
                <button onClick={handlePass} className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform backdrop-blur-sm">
                    <span className="material-symbols-outlined text-rose-400 text-[26px]">close</span>
                </button>
                <button onClick={handleLike} className="h-[66px] w-[66px] rounded-full bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center shadow-xl shadow-orange-500/30 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <button className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-95 transition-transform backdrop-blur-sm">
                    <span className="material-symbols-outlined text-cyan-400 text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
}
