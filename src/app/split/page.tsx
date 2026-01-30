"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockGroupMembers, restaurants } from "@/data/restaurants";

type SplitMethod = "equally" | "by-item" | "custom";

interface MemberSplit {
    id: string;
    name: string;
    avatar: string;
    items: string[];
    amount: number;
}

export default function SplitBillPage() {
    const router = useRouter();
    const restaurant = restaurants[0]; // Use first restaurant as example
    const totalBill = 142.50;
    const [tipPercent, setTipPercent] = useState(15);
    const [splitMethod, setSplitMethod] = useState<SplitMethod>("equally");

    const tipAmount = (totalBill * tipPercent) / 100;
    const totalWithTip = totalBill + tipAmount;

    const [memberSplits] = useState<MemberSplit[]>(
        mockGroupMembers.map((member, index) => ({
            ...member,
            items: index === 0
                ? ["Burger, Fries, Coke + Tip"]
                : index === 1
                    ? ["Lobster Roll, Beer + Tip"]
                    : index === 2
                        ? ["Salad, Water + Tip"]
                        : ["Pending..."],
            amount: index === 3 ? 0 : totalWithTip / (mockGroupMembers.length - 1) + (Math.random() * 10 - 5),
        }))
    );

    const yourShare = splitMethod === "equally"
        ? totalWithTip / mockGroupMembers.length
        : memberSplits[0].amount;

    const handleConfirmPay = () => {
        // In real app, this would open UPI payment
        const upiUrl = `upi://pay?pa=swipaa@upi&pn=Swipaa&am=${yourShare.toFixed(2)}&cu=INR&tn=Split%20bill%20for%20${restaurant.name}`;

        // Try to open UPI app
        window.location.href = upiUrl;

        // Fallback after small delay
        setTimeout(() => {
            alert(`Payment of ₹${yourShare.toFixed(2)} initiated!\n\nIn production, this would open your UPI app.`);
        }, 500);
    };

    return (
        <div className="min-h-dvh flex flex-col bg-[#221610]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center"
                >
                    <span className="material-symbols-outlined text-white">close</span>
                </button>
                <h1 className="text-white text-lg font-bold">Split Bill</h1>
                <div className="w-10" />
            </div>

            {/* Total Bill */}
            <div className="px-6 py-8 text-center">
                <p className="text-white/40 text-sm uppercase tracking-wide mb-2">Total Bill</p>
                <h2 className="text-white text-5xl font-extrabold mb-3">
                    ${totalWithTip.toFixed(2)}
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f46a25]/20 text-[#f46a25]">
                    <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        restaurant
                    </span>
                    <span className="text-sm font-medium">{restaurant.name}</span>
                </div>
            </div>

            {/* Split Method Tabs */}
            <div className="px-6 mb-6">
                <div className="flex bg-[#2a221e] rounded-xl p-1">
                    {(["equally", "by-item", "custom"] as SplitMethod[]).map((method) => (
                        <button
                            key={method}
                            onClick={() => setSplitMethod(method)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${splitMethod === method
                                    ? "bg-[#f46a25] text-white"
                                    : "text-white/60 hover:text-white"
                                }`}
                        >
                            {method === "by-item" ? "By Item" : method}
                        </button>
                    ))}
                </div>
            </div>

            {/* Friends List */}
            <div className="px-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs uppercase font-medium tracking-wide">
                        With friends
                    </span>
                    <button className="text-[#f46a25] text-xs font-medium">Edit</button>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {mockGroupMembers.map((member) => (
                        <div
                            key={member.id}
                            className="flex flex-col items-center min-w-[60px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#3a2e28] flex items-center justify-center text-xl mb-1 border-2 border-white/10">
                                {member.avatar}
                            </div>
                            <span className="text-white/60 text-xs">{member.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tip Selection */}
            <div className="px-6 mb-6">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs uppercase font-medium tracking-wide">
                        Add Tip
                    </span>
                    <span className="text-white text-sm font-medium">
                        {tipPercent}% (${tipAmount.toFixed(2)})
                    </span>
                </div>

                <div className="flex gap-2">
                    {[10, 15, 20].map((percent) => (
                        <button
                            key={percent}
                            onClick={() => setTipPercent(percent)}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${tipPercent === percent
                                    ? "bg-[#f46a25] text-white"
                                    : "bg-[#2a221e] border border-white/10 text-white/60 hover:bg-white/5"
                                }`}
                        >
                            {percent}%
                        </button>
                    ))}
                    <button
                        className="py-2.5 px-4 rounded-xl text-sm font-medium bg-[#2a221e] border border-white/10 text-white/60 hover:bg-white/5"
                    >
                        Edit
                    </button>
                </div>
            </div>

            {/* Breakdown */}
            <div className="px-6 flex-1">
                <span className="text-white/40 text-xs uppercase font-medium tracking-wide mb-3 block">
                    Breakdown
                </span>

                <div className="space-y-3">
                    {memberSplits.map((member, index) => (
                        <div
                            key={member.id}
                            className={`flex items-center gap-3 p-3 rounded-xl ${index === 0 ? "bg-[#f46a25]/10 border border-[#f46a25]/30" : "bg-[#2a221e]"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#3a2e28] flex items-center justify-center text-lg">
                                {member.avatar}
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm">{member.name}</p>
                                <p className="text-white/40 text-xs">{member.items[0]}</p>
                            </div>
                            <div className="text-right">
                                {member.amount > 0 ? (
                                    <p className="text-white font-bold">${member.amount.toFixed(2)}</p>
                                ) : (
                                    <p className="text-white/30 text-sm">Pending</p>
                                )}
                                {index === 0 && (
                                    <span className="inline-flex w-5 h-5 rounded-full bg-[#f46a25] items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Your Share + CTA */}
            <div className="px-6 py-6 bg-gradient-to-t from-[#221610] via-[#221610]/95 to-transparent">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-white/60">Your share</span>
                    <span className="text-white text-2xl font-bold">${yourShare.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleConfirmPay}
                    className="w-full bg-[#f46a25] hover:bg-orange-600 text-white text-lg font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#f46a25]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                    Confirm & Pay
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
