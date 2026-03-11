export default function Pipette() {
    return (
        <div
            style={{
                position: "absolute",
                left: "430px",   // 430 + ~190 tip = 620
                top: "55px",
                textAlign: "center",
                zIndex: 10,
            }}
        >
            <div className="mb-2 text-sm font-semibold text-gray-700">
                Pipette (KOH)
            </div>

            <svg width="220" height="60">
                {/* Bulb */}
                <ellipse
                    cx="40"
                    cy="30"
                    rx="28"
                    ry="22"
                    fill="#94a3b8"
                    stroke="#1f2937"
                    strokeWidth="3"
                />

                {/* Tube */}
                <rect
                    x="70"
                    y="26"
                    width="110"
                    height="8"
                    rx="4"
                    fill="#e0f2fe"
                    stroke="#1f2937"
                    strokeWidth="3"
                />

                {/* Tip (ends at ~190px) */}
                <rect
                    x="180"
                    y="28"
                    width="20"
                    height="4"
                    fill="#e0f2fe"
                    stroke="#1f2937"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}
