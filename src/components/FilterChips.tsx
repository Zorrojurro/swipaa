"use client";

interface FilterChipsProps {
    filters: {
        cuisine: string[];
        priceLevel: number[];
        spiceLevel: string | null;
        vegOnly: boolean;
    };
    onFilterChange: (filters: FilterChipsProps["filters"]) => void;
}

const cuisines = ["All", "South Indian", "North Indian", "Chinese", "Continental", "Mexican", "Asian"];
const priceLevels = [1, 2, 3, 4];
const spiceLevels = ["Mild", "Medium", "Spicy"];

export default function FilterChips({ filters, onFilterChange }: FilterChipsProps) {
    const toggleCuisine = (cuisine: string) => {
        if (cuisine === "All") {
            onFilterChange({ ...filters, cuisine: [] });
            return;
        }

        const newCuisines = filters.cuisine.includes(cuisine)
            ? filters.cuisine.filter(c => c !== cuisine)
            : [...filters.cuisine, cuisine];

        onFilterChange({ ...filters, cuisine: newCuisines });
    };

    const togglePrice = (level: number) => {
        const newPrices = filters.priceLevel.includes(level)
            ? filters.priceLevel.filter(p => p !== level)
            : [...filters.priceLevel, level];

        onFilterChange({ ...filters, priceLevel: newPrices });
    };

    const toggleSpice = (level: string) => {
        onFilterChange({
            ...filters,
            spiceLevel: filters.spiceLevel === level ? null : level
        });
    };

    return (
        <div className="flex flex-col gap-3 px-4 overflow-hidden">
            {/* Cuisine filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {cuisines.map((cuisine) => {
                    const isActive = cuisine === "All"
                        ? filters.cuisine.length === 0
                        : filters.cuisine.includes(cuisine);

                    return (
                        <button
                            key={cuisine}
                            onClick={() => toggleCuisine(cuisine)}
                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                                    ? "bg-[#f46a25] text-white"
                                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                                }`}
                        >
                            {cuisine}
                        </button>
                    );
                })}
            </div>

            {/* Price & Spice row */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {/* Price levels */}
                {priceLevels.map((level) => {
                    const isActive = filters.priceLevel.includes(level);
                    return (
                        <button
                            key={`price-${level}`}
                            onClick={() => togglePrice(level)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isActive
                                    ? "bg-[#f46a25] text-white"
                                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                                }`}
                        >
                            {"₹".repeat(level)}
                        </button>
                    );
                })}

                <div className="w-px bg-white/10 mx-1" />

                {/* Spice levels */}
                {spiceLevels.map((level) => {
                    const isActive = filters.spiceLevel === level;
                    const colors = {
                        Mild: "#2a9d8f",
                        Medium: "#f77f00",
                        Spicy: "#e63946",
                    };

                    return (
                        <button
                            key={`spice-${level}`}
                            onClick={() => toggleSpice(level)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${isActive
                                    ? "text-white"
                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                }`}
                            style={isActive ? {
                                backgroundColor: colors[level as keyof typeof colors],
                                borderColor: colors[level as keyof typeof colors]
                            } : {}}
                        >
                            🌶️ {level}
                        </button>
                    );
                })}

                <div className="w-px bg-white/10 mx-1" />

                {/* Veg only */}
                <button
                    onClick={() => onFilterChange({ ...filters, vegOnly: !filters.vegOnly })}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filters.vegOnly
                            ? "bg-green-600 text-white"
                            : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                        }`}
                >
                    🥬 Veg
                </button>
            </div>
        </div>
    );
}
