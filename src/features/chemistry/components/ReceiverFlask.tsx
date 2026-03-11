export default function ReceiverFlask({ heating }: { heating: boolean }) {
    return (
        <div
            style={{
                position: "absolute",
                left: "600px",
                bottom: "140px",
                textAlign: "center",
            }}
        >
            <svg width="120" height="160">
                <ellipse
                    cx="60"
                    cy="120"
                    rx="45"
                    ry="25"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="4"
                />

                <rect
                    x="52"
                    y="20"
                    width="16"
                    height="80"
                    rx="6"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="4"
                />

                {/* Collected liquid */}
                <ellipse
                    cx="60"
                    cy="130"
                    rx={heating ? 35 : 20}
                    ry={heating ? 15 : 8}
                    fill="#93c5fd"
                    style={{ transition: "all 1.5s ease" }}
                />
            </svg>

            <div className="mt-2 font-semibold">Receiver Flask</div>
        </div>
    );
}
