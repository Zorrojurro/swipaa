"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import RestaurantCard from "@/components/RestaurantCard";
import ActionButtons from "@/components/ActionButtons";
import BottomNav from "@/components/BottomNav";
import FilterChips from "@/components/FilterChips";
import { restaurants, Restaurant, spiceDisplay } from "@/data/restaurants";

export default function DiscoverPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedRestaurants, setLikedRestaurants] = useState<Restaurant[]>([]);
    const [passedRestaurants, setPassedRestaurants] = useState<Restaurant[]>([]);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        cuisine: [] as string[],
        priceLevel: [] as number[],
        spiceLevel: null as string | null,
        vegOnly: false,
    });

    // Swipe state
    const cardRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    // Filter restaurants
    const filteredRestaurants = restaurants.filter((r) => {
        if (filters.cuisine.length > 0 && !filters.cuisine.some(c => r.cuisine.includes(c))) {
            return false;
        }
        if (filters.priceLevel.length > 0 && !filters.priceLevel.includes(r.priceLevel)) {
            return false;
        }
        if (filters.spiceLevel) {
            const spice = spiceDisplay(r.spiceLevel).label;
            if (spice !== filters.spiceLevel) return false;
        }
        if (filters.vegOnly && !r.isVeg) return false;
        return true;
    });

    const currentRestaurant = filteredRestaurants[currentIndex];
    const nextRestaurant = filteredRestaurants[currentIndex + 1];

    // Handle swipe actions
    const handleLike = useCallback(() => {
        if (!currentRestaurant) return;

        setSwipeDirection("right");
        setLikedRestaurants((prev) => [...prev, currentRestaurant]);

        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });

            // Check for match after 3 likes
            if (likedRestaurants.length >= 2) {
                router.push(`/match?id=${currentRestaurant.id}`);
            }
        }, 300);
    }, [currentRestaurant, likedRestaurants.length, router]);

    const handlePass = useCallback(() => {
        if (!currentRestaurant) return;

        setSwipeDirection("left");
        setPassedRestaurants((prev) => [...prev, currentRestaurant]);

        setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
            setSwipeDirection(null);
            setDragOffset({ x: 0, y: 0 });
        }, 300);
    }, [currentRestaurant]);

    const handleSuperLike = useCallback(() => {
        handleLike();
    }, [handleLike]);

    const handleUndo = useCallback(() => {
        if (currentIndex === 0) return;

        // Remove from appropriate list
        if (likedRestaurants.length > 0 &&
            likedRestaurants[likedRestaurants.length - 1].id === filteredRestaurants[currentIndex - 1]?.id) {
            setLikedRestaurants((prev) => prev.slice(0, -1));
        } else {
            setPassedRestaurants((prev) => prev.slice(0, -1));
        }

        setCurrentIndex((prev) => prev - 1);
    }, [currentIndex, likedRestaurants, filteredRestaurants]);

    // Touch/Mouse handlers for swipe
    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;

        const deltaX = clientX - startPos.x;
        const deltaY = clientY - startPos.y;
        setDragOffset({ x: deltaX, y: deltaY * 0.3 });
    };

    const handleEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 100;

        if (dragOffset.x > threshold) {
            handleLike();
        } else if (dragOffset.x < -threshold) {
            handlePass();
        } else {
            setDragOffset({ x: 0, y: 0 });
        }
    };

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") handleLike();
            if (e.key === "ArrowLeft") handlePass();
            if (e.key === "ArrowUp") handleSuperLike();
            if (e.key === "z" && (e.ctrlKey || e.metaKey)) handleUndo();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleLike, handlePass, handleSuperLike, handleUndo]);

    // Calculate card transform
    const getCardStyle = () => {
        if (swipeDirection === "left") {
            return { transform: "translateX(-150%) rotate(-20deg)", opacity: 0, transition: "all 0.3s ease-out" };
        }
        if (swipeDirection === "right") {
            return { transform: "translateX(150%) rotate(20deg)", opacity: 0, transition: "all 0.3s ease-out" };
        }

        const rotation = dragOffset.x * 0.05;
        return {
            transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
        };
    };

    // No more restaurants
    if (!currentRestaurant) {
        return (
            <div className="flex flex-col h-dvh">
                <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                    <span className="material-symbols-outlined text-[80px] text-white/20 mb-4">restaurant</span>
                    <h2 className="text-2xl font-bold text-white mb-2">No more restaurants!</h2>
                    <p className="text-white/60 mb-6">Adjust your filters or check back later for more options.</p>
                    <button
                        onClick={() => {
                            setCurrentIndex(0);
                            setFilters({ cuisine: [], priceLevel: [], spiceLevel: null, vegOnly: false });
                        }}
                        className="px-6 py-3 bg-[#f46a25] text-white font-medium rounded-xl"
                    >
                        Reset & Start Over
                    </button>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-dvh overflow-hidden">
            {/* Status bar spacer */}
            <div className="h-12 w-full shrink-0" />

            {/* Header */}
            <header className="flex items-center justify-between px-6 pb-4 shrink-0 z-20">
                <button className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[28px]">account_circle</span>
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-1">
                        Discover
                        <span
                            className="material-symbols-outlined text-[#f46a25] text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            expand_more
                        </span>
                    </h1>
                    <p className="text-xs text-white/50 font-medium tracking-wide uppercase">Bengaluru</p>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center justify-center h-10 w-10 rounded-full transition-colors ${showFilters ? "bg-[#f46a25] text-white" : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                >
                    <span className="material-symbols-outlined text-[24px]">tune</span>
                </button>
            </header>

            {/* Filters */}
            {showFilters && (
                <div className="shrink-0 pb-4">
                    <FilterChips filters={filters} onFilterChange={setFilters} />
                </div>
            )}

            {/* Card Stack */}
            <main className="flex-1 relative w-full max-w-md mx-auto px-4 flex flex-col justify-center items-center z-10">
                {/* Background Card (Next in stack) */}
                {nextRestaurant && (
                    <div className="absolute w-[92%] h-[68vh] bg-[#3a2e28] rounded-3xl opacity-60 scale-95 origin-bottom shadow-lg transform translate-y-4 -z-10">
                        <div
                            className="w-full h-full rounded-3xl overflow-hidden bg-cover bg-center opacity-40"
                            style={{ backgroundImage: `url('${nextRestaurant.image}')` }}
                        />
                    </div>
                )}

                {/* Active Card */}
                <div
                    ref={cardRef}
                    className="relative w-full h-[68vh] cursor-grab active:cursor-grabbing"
                    style={getCardStyle()}
                    onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                    onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                    onTouchEnd={handleEnd}
                >
                    {/* Like/Pass indicators */}
                    <div
                        className="absolute top-8 left-8 -rotate-12 border-4 border-green-500 rounded-lg px-4 py-1 z-20 transition-opacity pointer-events-none"
                        style={{ opacity: Math.max(0, dragOffset.x / 100) }}
                    >
                        <span className="text-green-500 font-extrabold text-3xl tracking-widest uppercase">YUM</span>
                    </div>
                    <div
                        className="absolute top-8 right-8 rotate-12 border-4 border-red-500 rounded-lg px-4 py-1 z-20 transition-opacity pointer-events-none"
                        style={{ opacity: Math.max(0, -dragOffset.x / 100) }}
                    >
                        <span className="text-red-500 font-extrabold text-3xl tracking-widest uppercase">PASS</span>
                    </div>

                    <RestaurantCard restaurant={currentRestaurant} />
                </div>

                {/* Swipe hint */}
                {currentIndex < 2 && (
                    <p className="absolute bottom-4 text-white/30 text-sm animate-pulse">
                        ← SWIPE LEFT or RIGHT →
                    </p>
                )}
            </main>

            {/* Action Buttons */}
            <div className="py-6 shrink-0">
                <ActionButtons
                    onPass={handlePass}
                    onLike={handleLike}
                    onSuperLike={handleSuperLike}
                    onUndo={handleUndo}
                    canUndo={currentIndex > 0}
                />
            </div>

            {/* Bottom Navigation */}
            <BottomNav />

            {/* iOS Home Indicator Safe Area */}
            <div className="h-2 w-full bg-[#1c1410] shrink-0" />
        </div>
    );
}
