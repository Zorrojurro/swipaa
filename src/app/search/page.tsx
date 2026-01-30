"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { restaurants } from "@/data/restaurants";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const filteredRestaurants = query
        ? restaurants.filter(r =>
            r.name.toLowerCase().includes(query.toLowerCase()) ||
            r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
            r.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
        )
        : [];

    return (
        <div className="flex flex-col min-h-dvh">
            {/* Header */}
            <div className="pt-12 px-6 pb-4">
                <h1 className="text-white text-2xl font-bold mb-4">Search</h1>

                {/* Search Input */}
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/40 text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search restaurants, cuisines..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-[#2a221e] border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f46a25]/50"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="flex-1 px-6 pb-24 overflow-y-auto">
                {query ? (
                    filteredRestaurants.length > 0 ? (
                        <div className="space-y-3">
                            {filteredRestaurants.map((restaurant) => (
                                <div
                                    key={restaurant.id}
                                    className="flex items-center gap-3 p-3 bg-[#2a221e] rounded-xl"
                                >
                                    <div
                                        className="w-16 h-16 rounded-xl bg-cover bg-center"
                                        style={{ backgroundImage: `url('${restaurant.image}')` }}
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium">{restaurant.name}</h3>
                                        <p className="text-white/40 text-sm">{restaurant.cuisine} • {restaurant.distance}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#f46a25]">
                                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        <span className="text-sm font-medium">{restaurant.rating}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="material-symbols-outlined text-[60px] text-white/20 mb-4">search_off</span>
                            <p className="text-white/40">No restaurants found</p>
                        </div>
                    )
                ) : (
                    <div className="text-center py-12">
                        <span className="material-symbols-outlined text-[60px] text-white/20 mb-4">restaurant_menu</span>
                        <p className="text-white/40">Start typing to search</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
}
