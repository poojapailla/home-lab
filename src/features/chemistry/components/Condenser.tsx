export default function Condenser({ heating }: { heating: boolean }) {
    return (
        <div
                style={{
                position: "absolute",
                left: "40%",
                bottom: "240px",
                transform: "translateX(-50%) translateX(75px)",
                textAlign: "center",
            }}
                >
            <svg width="450" height="60">
                {/* OUTER GLASS JACKET */}
                <rect
                    x="0"
                    y="15"
                    width="450"     // extended length
                    height="20"
                    rx="10"
                    fill="#e0f2fe"
                    stroke="#1f2937"
                    strokeWidth="4"
                />

                {/* INNER CONDENSING TUBE */}
                <rect
                    x="20"
                    y="21"
                    width="450"
                    height="8"
                    rx="4"
                    fill="#ffffff"
                />

                {/* VAPOR ANIMATION */}
                {heating && (
                    <circle cx="30" cy="25" r="5" fill="#94a3b8">
                        <animate
                            attributeName="cx"
                            from="30"
                            to="390"
                            dur="1.6s"
                            repeatCount="indefinite"
                        />
                    </circle>
                )}
            </svg>

            <div className="mt-1 font-semibold text-gray-700">
                Liebig Condenser
            </div>
        </div>
    );
}
