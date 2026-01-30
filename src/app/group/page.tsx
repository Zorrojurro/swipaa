"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockGroupMembers } from "@/data/restaurants";

const cuisineOptions = [
    { label: "Any Cuisine", emoji: "🍽️", value: "all" },
    { label: "South Indian", emoji: "🥞", value: "south-indian" },
    { label: "North Indian", emoji: "🍛", value: "north-indian" },
    { label: "Chinese", emoji: "🥢", value: "chinese" },
    { label: "Continental", emoji: "🥗", value: "continental" },
    { label: "Mexican", emoji: "🌮", value: "mexican" },
    { label: "Asian", emoji: "🍜", value: "asian" },
];

export default function GroupPage() {
    const router = useRouter();
    const [groupName, setGroupName] = useState("");
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>(["all"]);
    const [members, setMembers] = useState(mockGroupMembers.slice(0, 1));

    const toggleCuisine = (value: string) => {
        if (value === "all") {
            setSelectedCuisines(["all"]);
            return;
        }

        const newCuisines = selectedCuisines.filter(c => c !== "all");
        if (newCuisines.includes(value)) {
            const filtered = newCuisines.filter(c => c !== value);
            setSelectedCuisines(filtered.length ? filtered : ["all"]);
        } else {
            setSelectedCuisines([...newCuisines, value]);
        }
    };

    const handleShare = async () => {
        const groupCode = `SWIPAA${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const message = `🍽️ Join my Swipaa group!\n\n${groupName || "Friday Night Bites"}\n\nSwipe on restaurants together and find the perfect spot.\n\nGroup Code: ${groupCode}\n\nJoin here: swipaa.app/join/${groupCode}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Join my Swipaa group!",
                    text: message,
                });
                // Simulate adding a member
                if (members.length < mockGroupMembers.length) {
                    setMembers([...members, mockGroupMembers[members.length]]);
                }
            } catch {
                // User cancelled
            }
        } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
        }
    };

    const handleStartSwiping = () => {
        router.push("/discover");
    };

    return (
        <div className="min-h-dvh flex flex-col bg-[#221610]">
            {/* Header */}
            <div className="relative pt-4 pb-6 px-6">
                {/* Background gradient */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#f46a25]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative flex items-center justify-between mb-6">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-white">close</span>
                    </button>
                    <h1 className="text-white text-xl font-bold">Start a Craving</h1>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                <p className="text-white/60 text-center">
                    Plan the perfect meal with friends
                </p>
            </div>

            {/* Form */}
            <div className="flex-1 px-6 space-y-6 overflow-y-auto pb-32">
                {/* Group Name */}
                <div>
                    <label className="text-white/40 text-xs uppercase font-medium tracking-wide mb-2 block">
                        Group Name
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. Friday Night Bites 🍕"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            className="w-full bg-[#2a221e] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#f46a25]/50 focus:ring-1 focus:ring-[#f46a25]/50"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                        </span>
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="text-white/40 text-xs uppercase font-medium tracking-wide mb-2 block">
                        Location
                    </label>
                    <button className="w-full bg-[#2a221e] border border-white/10 rounded-xl px-4 py-4 flex items-center gap-3 text-left">
                        <div className="w-10 h-10 rounded-full bg-[#f46a25]/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#f46a25] text-[20px]">location_on</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">Current Location</p>
                            <p className="text-white/40 text-sm">Koramangala, Bengaluru</p>
                        </div>
                        <span className="material-symbols-outlined text-white/30 text-[20px]">chevron_right</span>
                    </button>
                </div>

                {/* Cuisine Preference */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-white/40 text-xs uppercase font-medium tracking-wide">
                            Cuisine Preference
                        </label>
                        <button className="text-[#f46a25] text-xs font-medium">See All</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {cuisineOptions.map((cuisine) => {
                            const isSelected = selectedCuisines.includes(cuisine.value);
                            return (
                                <button
                                    key={cuisine.value}
                                    onClick={() => toggleCuisine(cuisine.value)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${isSelected
                                            ? "bg-[#f46a25] text-white"
                                            : "bg-[#2a221e] border border-white/10 text-white/70 hover:bg-white/5"
                                        }`}
                                >
                                    <span>{cuisine.emoji}</span>
                                    <span>{cuisine.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Who's Coming */}
                <div>
                    <label className="text-white/40 text-xs uppercase font-medium tracking-wide mb-3 block">
                        Who&apos;s Coming?
                    </label>
                    <div className="flex items-center gap-3 mb-4">
                        {/* Add button */}
                        <button
                            onClick={handleShare}
                            className="w-14 h-14 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center hover:border-white/40 transition-colors"
                        >
                            <span className="material-symbols-outlined text-white/40 text-[24px]">add</span>
                        </button>

                        {/* Member avatars */}
                        {members.map((member) => (
                            <div
                                key={member.id}
                                className="relative"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#3a2e28] flex items-center justify-center text-2xl border-2 border-[#f46a25]">
                                    {member.avatar}
                                </div>
                                {member.isHost && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#f46a25] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        YOU
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-white font-medium">{members.length} People</span>
                        <span className="text-white/40">Ready to swipe</span>
                    </div>

                    {/* Share buttons */}
                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={handleShare}
                            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </button>
                        <button
                            onClick={handleShare}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">link</span>
                            Share Link
                        </button>
                    </div>
                </div>
            </div>

            {/* Fixed CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#221610] via-[#221610] to-transparent pt-16">
                <button
                    onClick={handleStartSwiping}
                    disabled={members.length < 1}
                    className="w-full bg-[#f46a25] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#f46a25]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                    Start Swiping
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
