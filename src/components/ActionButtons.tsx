"use client";

interface ActionButtonsProps {
    onPass: () => void;
    onLike: () => void;
    onSuperLike: () => void;
    onUndo: () => void;
    canUndo: boolean;
}

export default function ActionButtons({
    onPass,
    onLike,
    onSuperLike,
    onUndo,
    canUndo
}: ActionButtonsProps) {
    return (
        <div className="flex items-center justify-center gap-5 w-full max-w-md mx-auto px-6">
            {/* Undo */}
            <button
                onClick={onUndo}
                disabled={!canUndo}
                className={`btn-action flex items-center justify-center w-12 h-12 rounded-full bg-[#2a221e] border border-white/5 shadow-lg transition-all ${canUndo ? "hover:bg-yellow-500/10" : "opacity-30 cursor-not-allowed"
                    }`}
            >
                <span className="material-symbols-outlined text-yellow-500 text-[24px]">replay</span>
            </button>

            {/* Pass */}
            <button
                onClick={onPass}
                className="btn-action flex items-center justify-center w-16 h-16 rounded-full bg-[#2a221e] border border-white/5 shadow-xl hover:bg-red-500/10"
            >
                <span className="material-symbols-outlined text-red-500 text-[32px]">close</span>
            </button>

            {/* Like */}
            <button
                onClick={onLike}
                className="btn-action flex items-center justify-center w-16 h-16 rounded-full bg-[#f46a25] shadow-xl shadow-[#f46a25]/30 hover:brightness-110"
            >
                <span
                    className="material-symbols-outlined text-white text-[32px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    favorite
                </span>
            </button>

            {/* Super Like */}
            <button
                onClick={onSuperLike}
                className="btn-action flex items-center justify-center w-12 h-12 rounded-full bg-[#2a221e] border border-white/5 shadow-lg hover:bg-blue-500/10"
            >
                <span
                    className="material-symbols-outlined text-blue-500 text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                >
                    star
                </span>
            </button>
        </div>
    );
}
