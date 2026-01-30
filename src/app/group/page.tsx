"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockGroupMembers } from "@/data/restaurants";

export default function GroupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [members, setMembers] = useState(mockGroupMembers.slice(0, 1));

    const invite = async () => {
        const code = `SW${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
        const msg = `🍽️ Join my Swipaa group!\n${name || "Dinner Plans"}\nCode: ${code}`;
        if (navigator.share) {
            try {
                await navigator.share({ text: msg });
                if (members.length < mockGroupMembers.length) setMembers([...members, mockGroupMembers[members.length]]);
            } catch { }
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
        }
    };

    return (
        <div className="flex flex-col bg-[#0d0907]" style={{ minHeight: "100dvh" }}>
            {/* Header */}
            <header className="flex items-center justify-between px-4 pt-safe pt-10 pb-3">
                <button onClick={() => router.back()} className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/60">arrow_back</span>
                </button>
                <h1 className="text-white font-bold text-lg">Create Group</h1>
                <div className="w-10" />
            </header>

            {/* Form */}
            <main className="flex-1 flex flex-col px-5 pb-safe pb-6">
                {/* Name */}
                <div className="mb-4">
                    <label className="text-white/40 text-xs uppercase tracking-wider mb-1.5 block">Group Name</label>
                    <input
                        type="text"
                        placeholder="Friday Night Eats 🍕"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-[#171211] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-[#f46a25]/40"
                    />
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 bg-[#171211] border border-white/10 rounded-2xl mb-4">
                    <div className="h-11 w-11 rounded-xl bg-[#f46a25]/15 flex items-center justify-center">
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
                    <label className="text-white/40 text-xs uppercase tracking-wider mb-2 block">Who&apos;s Coming?</label>
                    <div className="flex items-center gap-3 mb-2">
                        <button onClick={invite} className="h-14 w-14 rounded-2xl border-2 border-dashed border-white/15 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white/30 text-xl">add</span>
                        </button>
                        {members.map(m => (
                            <div key={m.id} className="relative">
                                <div className="h-14 w-14 rounded-2xl bg-[#171211] border border-white/10 flex items-center justify-center text-2xl">{m.avatar}</div>
                                {m.isHost && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#f46a25] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">YOU</span>}
                            </div>
                        ))}
                    </div>
                    <p className="text-white/30 text-sm">{members.length} ready to swipe</p>
                </div>

                {/* Invite */}
                <div className="flex gap-2.5 mb-3">
                    <button onClick={invite} className="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        WhatsApp
                    </button>
                    <button onClick={invite} className="flex-1 bg-white/5 border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">link</span>
                        Copy Link
                    </button>
                </div>

                {/* CTA */}
                <button onClick={() => router.push("/discover")} className="w-full bg-gradient-to-r from-[#f46a25] to-[#d35a15] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#f46a25]/20">
                    Start Swiping
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
            </main>
        </div>
    );
}
