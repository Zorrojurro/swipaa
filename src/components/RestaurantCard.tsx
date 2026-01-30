"use client";

import { Restaurant, priceDisplay, spiceDisplay } from "@/data/restaurants";

interface RestaurantCardProps {
    restaurant: Restaurant;
    style?: React.CSSProperties;
    className?: string;
    isActive?: boolean;
}

export default function RestaurantCard({
    restaurant,
    style,
    className = "",
    isActive = true
}: RestaurantCardProps) {
    const spice = spiceDisplay(restaurant.spiceLevel);

    return (
        <div
            className={`absolute w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-[#2a221e] ${className}`}
            style={style}
        >
            {/* Main Image */}
            <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url('${restaurant.image}')` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70 pointer-events-none" />

            {/* Distance Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[#f46a25] text-[16px]">near_me</span>
                <span className="text-white text-xs font-medium">{restaurant.distance}</span>
            </div>

            {/* Glassmorphic Info Card */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
                {/* Title & Rating Row */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-white leading-tight drop-shadow-md">
                            {restaurant.name}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-white/70 text-sm font-medium">{restaurant.cuisine}</span>
                            <span className="text-white/40 text-[8px]">•</span>
                            <span className="text-white/70 text-sm font-medium">{restaurant.distance}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-[#f46a25] px-2 py-1 rounded-lg">
                            <span className="material-symbols-outlined text-white text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            <span className="text-white text-xs font-bold">{restaurant.rating}</span>
                        </div>
                        <span className="text-white/90 text-sm font-semibold">
                            {priceDisplay(restaurant.priceLevel)}
                        </span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                    {restaurant.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="whitespace-nowrap px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs font-medium text-white/90"
                        >
                            {tag}
                        </span>
                    ))}
                    <span
                        className="whitespace-nowrap px-3 py-1 rounded-full border text-xs font-medium"
                        style={{
                            backgroundColor: `${spice.color}20`,
                            borderColor: `${spice.color}50`,
                            color: spice.color
                        }}
                    >
                        🌶️ {spice.label}
                    </span>
                </div>
            </div>
        </div>
    );
}
