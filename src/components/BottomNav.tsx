"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    { icon: "home", href: "/discover" },
    { icon: "search", href: "/search" },
    { icon: "group", href: "/group" },
    { icon: "person", href: "/profile" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="bg-black/80 backdrop-blur-2xl border-t border-white/[0.08]">
            <div className="flex justify-around items-center px-2 pt-2 pb-safe pb-6">
                {items.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href === "/discover" && pathname === "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex items-center justify-center w-14 h-10"
                        >
                            <span
                                className={`material-symbols-outlined text-[28px] transition-all duration-200 ${isActive
                                        ? "text-white"
                                        : "text-white/35"
                                    }`}
                                style={{
                                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400"
                                }}
                            >
                                {item.icon}
                            </span>

                            {/* Active dot */}
                            {isActive && (
                                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
