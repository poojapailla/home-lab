export default function DistillationFlask({ heating }: { heating: boolean }) {
    return (
        <div
            style={{
                position: "absolute",
                left: "140px",
                bottom: "140px",
                textAlign: "center",
            }}
        >
            <svg width="160" height="180">
                {/* Flask */}
                <circle
                    cx="80"
                    cy="100"
                    r="55"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="4"
                />

                {/* Liquid */}
                <path
                    d="M25 110 Q80 135 135 110"
                    fill="#93c5fd"
                    opacity={heating ? 0.6 : 1}
                />

                {/* Neck */}
                <rect
                    x="70"
                    y="10"
                    width="20"
                    height="40"
                    rx="6"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="4"
                />
            </svg>

            <div className="mt-2 font-semibold">Distillation Flask</div>
        </div>
    );
}
