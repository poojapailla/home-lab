type Props = {
    volume: number;
    endpointVolume: number;
    preEndpointColor: string;
    endpointColor: string;
};

export default function ConicalFlask({
                                         volume,
                                         endpointVolume,
                                         preEndpointColor,
                                         endpointColor,
                                     }: Props) {
    const MAX_LIQUID_HEIGHT = 110;

    const liquidHeight = Math.min(
        MAX_LIQUID_HEIGHT,
        (volume / endpointVolume) * MAX_LIQUID_HEIGHT
    );

    const reachedEndpoint = volume >= endpointVolume;

    // Flask geometry
    const bottomWidth = 100;
    const topWidth = 40;

    const currentWidth =
        bottomWidth -
        ((bottomWidth - topWidth) * liquidHeight) / MAX_LIQUID_HEIGHT;

    const centerX = 80;
    const bottomY = 170;
    const topY = bottomY - liquidHeight;

    return (
        <div
            style={{
                position: "absolute",
                left: "620px",
                bottom: "50px",
                transform: "translateX(-50%)",
                textAlign: "center",
            }}
        >
            <svg width="160" height="200">
                {/* LIQUID */}
                <polygon
                    points={`
            ${centerX - currentWidth / 2},${topY}
            ${centerX + currentWidth / 2},${topY}
            ${centerX + bottomWidth / 2},${bottomY}
            ${centerX - bottomWidth / 2},${bottomY}
          `}
                    fill={reachedEndpoint ? endpointColor : preEndpointColor}
                    opacity={0.9}
                    style={{ transition: "all 0.6s ease-in-out" }}
                />

                {/* NECK */}
                <rect
                    x="70"
                    y="0"
                    width="20"
                    height="30"
                    rx="6"
                    fill="#ffffff"
                    stroke="#1f2937"
                    strokeWidth="3"
                />

                {/* OUTLINE */}
                <polygon
                    points="60,30 100,30 130,170 30,170"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="4"
                />
            </svg>

            <div className="mt-2 text-sm font-semibold text-gray-700">
                Conical Flask
            </div>
        </div>
    );
}
