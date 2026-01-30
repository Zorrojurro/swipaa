"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRestaurants } from "@/context/RestaurantContext";
import { Restaurant, spiceDisplay, priceDisplay } from "@/data/restaurants";

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

    // Empty state
    if (!current) {
        return (
            <div className="flex flex-col items-center justify-center bg-[#0d0907] px-6 text-center" style={{ minHeight: "100dvh" }}>
                <span className="material-symbols-outlined text-6xl text-white/10 mb-4">restaurant</span>
                <h2 className="text-xl font-bold text-white mb-2">All done!</h2>
                <p className="text-white/40 mb-6">You&apos;ve seen all restaurants</p>
                <button onClick={() => setCurrentIndex(0)} className="px-6 py-3 bg-[#f46a25] text-white font-semibold rounded-xl">
                    Start Over
                </button>
            </div>
        );
    }

    const spice = spiceDisplay(current.spiceLevel);

    return (
        <div className="flex flex-col bg-[#0d0907]" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <header className="flex items-center justify-between px-4 pt-safe pt-10 pb-2">
                <Link href="/profile" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60 text-xl">person</span>
                </Link>
                <div className="text-center">
                    <h1 className="text-white font-bold">Discover</h1>
                    <p className="text-white/40 text-xs">{location.city}</p>
                </div>
                <button className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60 text-xl">tune</span>
                </button>
            </header>

            {/* Card area */}
            <main className="flex-1 flex items-center justify-center px-4 py-2 relative overflow-hidden">
                {/* Next card behind */}
                {next && (
                    <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 aspect-[3/4] max-h-[65vh] rounded-3xl overflow-hidden opacity-30 scale-95">
                        <img src={next.image} alt="" className="h-full w-full object-cover" />
                    </div>
                )}

                {/* Current card */}
                <div
                    className="relative w-full max-w-[320px] aspect-[3/4] max-h-[65vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10 touch-pan-y select-none"
                    style={{
                        transform: cardTransform,
                        opacity: swipeDirection ? 0 : 1,
                        transition: isDragging ? "none" : "all 0.2s ease-out",
                    }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Swipe labels */}
                    <div
                        className="absolute top-5 left-5 z-20 px-3 py-1.5 border-[3px] border-green-400 rounded-lg -rotate-12"
                        style={{ opacity: Math.min(1, dragX / 60) }}
                    >
                        <span className="text-green-400 font-black text-lg">YUM!</span>
                    </div>
                    <div
                        className="absolute top-5 right-5 z-20 px-3 py-1.5 border-[3px] border-red-400 rounded-lg rotate-12"
                        style={{ opacity: Math.min(1, -dragX / 60) }}
                    >
                        <span className="text-red-400 font-black text-lg">NOPE</span>
                    </div>

                    <img src={current.image} alt={current.name} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between z-10">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[#f46a25] text-sm">near_me</span>
                            <span className="text-white text-xs">{current.distance}</span>
                        </div>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f46a25]">
                            <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-white text-xs font-bold">{current.rating}</span>
                        </div>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                        <h2 className="text-white text-xl font-bold mb-0.5">{current.name}</h2>
                        <p className="text-white/60 text-sm mb-2">{current.cuisine} • {priceDisplay(current.priceLevel)}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {current.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs">{tag}</span>
                            ))}
                            <span className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: `${spice.color}25`, color: spice.color }}>
                                🌶️ {spice.label}
                            </span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Actions */}
            <div className="flex items-center justify-center gap-5 py-4">
                <button onClick={handlePass} className="h-14 w-14 rounded-full bg-[#171211] border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-red-400 text-2xl">close</span>
                </button>
                <button onClick={handleLike} className="h-16 w-16 rounded-full bg-gradient-to-br from-[#f46a25] to-[#d35a15] flex items-center justify-center shadow-lg shadow-[#f46a25]/30 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <button className="h-14 w-14 rounded-full bg-[#171211] border border-white/10 flex items-center justify-center active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-blue-400 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </button>
            </div>

            {/* Bottom nav */}
            <nav className="flex justify-around items-center px-6 py-3 pb-safe pb-6 border-t border-white/5">
                {[
                    { icon: "home", href: "/discover", active: true },
                    { icon: "search", href: "/search" },
                    { icon: "group", href: "/group" },
                    { icon: "person", href: "/profile" },
                ].map((item) => (
                    <Link key={item.href} href={item.href} className={item.active ? "text-[#f46a25]" : "text-white/30"}>
                        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: item.active ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
