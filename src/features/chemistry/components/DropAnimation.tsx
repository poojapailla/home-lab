export default function DropAnimation({ active }: { active: boolean }) {
    if (!active) return null;

    return (
        <div
            style={{
                position: "absolute",
                left: "620px",     // ⭐ SAME AXIS_X
                top: "120px",
                width: "10px",
                height: "14px",
                backgroundColor: "#38bdf8",
                borderRadius: "50%",
                transform: "translateX(-50%)", // ⭐ CRITICAL
                animation: "dropFall 0.6s linear",
                zIndex: 20,
            }}
        >
            <style>
                {`
          @keyframes dropFall {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, 190px); opacity: 0; }
          }
        `}
            </style>
        </div>
    );
}
