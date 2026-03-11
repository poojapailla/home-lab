export default function Thermometer({ heating }: { heating: boolean }) {
    return (
        <div
            style={{
                position: "absolute",
                left: "200px",
                bottom: "240px",
                zIndex: 15,
                pointerEvents: "none",
            }}
        >
            <svg width="40" height="180" viewBox="0 0 40 180">
                {/* DEGREE LABEL */}
                <text
                    x="4"
                    y="14"
                    fontSize="10"
                    fontWeight="bold"
                    fill="#111827"
                >
                    °C
                </text>

                {/* THERMOMETER STEM */}
                <rect
                    x="18"
                    y="0"
                    width="4"
                    height="130"
                    rx="2"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="2"
                />

                {/* MERCURY COLUMN */}
                <rect
                    x="18.5"
                    y={heating ? 25 : 85}
                    width="3"
                    height={heating ? 105 : 45}
                    rx="1.5"
                    fill="url(#mercuryGradient)"
                    style={{ transition: "all 1.8s ease-in-out" }}
                />

                {/* SCALE MARKS */}
                {[...Array(10)].map((_, i) => (
                    <line
                        key={i}
                        x1="25"
                        x2="32"
                        y1={30 + i * 10}
                        y2={30 + i * 10}
                        stroke="#111827"
                        strokeWidth="1"
                    />
                ))}

                {/* RUBBER STOPPER */}
                <rect
                    x="8"
                    y="90"
                    width="24"
                    height="40"
                    rx="10"
                    fill="#1f2937"
                />

                {/* INNER HOLE */}
                <rect
                    x="18"
                    y="90"
                    width="4"
                    height="40"
                    rx="2"
                    fill="#ffffff"
                />

                {/* GRADIENT */}
                <defs>
                    <linearGradient
                        id="mercuryGradient"
                        x1="0"
                        y1="1"
                        x2="0"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="40%" stopColor="#eab308" />
                        <stop offset="70%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
