export default function Burner({ heating }: { heating: boolean }) {
    return (
        <div
            style={{
                position: "absolute",
                left: "190px",
                bottom: "60px",
                textAlign: "center",
            }}
        >
            <svg width="60" height="70">
                <rect x="20" y="40" width="20" height="25" fill="#374151" />

                {heating && (
                    <path
                        d="M30 0 Q45 25 30 40 Q15 25 30 0"
                        fill="#f97316"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="scale"
                            from="1"
                            to="1.1"
                            dur="0.4s"
                            repeatCount="indefinite"
                        />
                    </path>
                )}
            </svg>

            <div className="text-xs font-semibold">Burner</div>
        </div>
    );
}
