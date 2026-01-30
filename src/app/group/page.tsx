"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockGroupMembers } from "@/data/restaurants";

export default function GroupPage() {
    const router = useRouter();
    const [groupName, setGroupName] = useState("");
    const [members, setMembers] = useState(mockGroupMembers.slice(0, 1));

    const handleInvite = async () => {
        const code = `SW${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const msg = `🍽️ Join my Swipaa group!\n\n${groupName || "Dinner Plans"}\nCode: ${code}`;

        if (navigator.share) {
            try {
                await navigator.share({ title: "Join Swipaa", text: msg });
                if (members.length < mockGroupMembers.length) {
                    setMembers([...members, mockGroupMembers[members.length]]);
                }
            } catch { }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0f0a07] flex flex-col overflow-hidden">
            {/* Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[#f46a25]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 flex items-center justify-between px-5 pt-14 pb-4">
                <button onClick={() => router.back()} className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/70">arrow_back</span>
                </button>
                <h1 className="text-white font-bold text-lg">Create Group</h1>
                <div className="w-11" />
            </header>

            {/* Form */}
            <main className="relative z-10 flex-1 flex flex-col px-6 pb-6 overflow-hidden">
                {/* Group name */}
                <div className="mb-6">
                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Group Name</label>
                    <input
                        type="text"
                        placeholder="Friday Night Eats 🍕"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full bg-[#1a1210] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/25 focus:outline-none focus:border-[#f46a25]/50 text-lg"
                    />
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-[#1a1210] border border-white/10 rounded-2xl mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#f46a25]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#f46a25]">location_on</span>
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-medium">Koramangala</p>
                        <p className="text-white/40 text-sm">Bengaluru</p>
                    </div>
                    <span className="material-symbols-outlined text-white/20">chevron_right</span>
                </div>

                {/* Members */}
                <div className="flex-1">
                    <label className="text-white/40 text-xs uppercase tracking-wider mb-3 block">Who&apos;s Coming?</label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleInvite}
                            className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center hover:border-[#f46a25]/50 transition-colors"
                        >
                            <span className="material-symbols-outlined text-white/40 text-2xl">add</span>
                        </button>
                        {members.map((m) => (
                            <div key={m.id} className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-[#1a1210] border border-white/10 flex items-center justify-center text-3xl">
                                    {m.avatar}
                                </div>
                                {m.isHost && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#f46a25] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        YOU
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-white/30 text-sm mt-4">{members.length} {members.length === 1 ? "person" : "people"} ready to swipe</p>
                </div>

                {/* Invite buttons */}
                <div className="flex gap-3 mb-4">
                    <button
                        onClick={handleInvite}
                        className="flex-1 bg-[#25D366] text-white py-4 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </button>
                    <button
                        onClick={handleInvite}
                        className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                        <span className="material-symbols-outlined text-lg">link</span>
                        Copy Link
                    </button>
                </div>

                {/* CTA */}
                <button
                    onClick={() => router.push("/discover")}
                    className="w-full bg-gradient-to-r from-[#f46a25] to-[#e55815] text-white text-lg font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-[#f46a25]/30 active:scale-[0.98] transition-transform"
                >
                    Start Swiping
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </main>
        </div>
    );
}
