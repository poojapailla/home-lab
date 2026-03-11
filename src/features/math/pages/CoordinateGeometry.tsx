import { useMemo, useState } from "react";

/** =========================
 *  THEME (same as Physics)
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

/** =========================
 *  SMALL UI COMPONENTS
 *  ========================= */

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border rounded-lg p-4 mb-6"
      style={{ backgroundColor: "white", borderColor: "#555" }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: THEME.ORANGE }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border rounded-lg p-4"
      style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
    >
      <h2 className="text-xl font-bold mb-3 text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function ValueBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg p-3 text-center bg-white/40">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-lg font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

/** =========================
 *  GRAPH CANVAS
 *  ========================= */

function GraphCanvas({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const W = 520;
  const H = 520;
  const midX = W / 2;
  const midY = H / 2;

  const scale = 20; // 1 unit = 20px (grid scale)

  // convert coordinate to SVG position
  const toSVG = (x: number, y: number) => ({
    sx: midX + x * scale,
    sy: midY - y * scale,
  });

  const p1 = toSVG(x1, y1);
  const p2 = toSVG(x2, y2);

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg">
        {/* background */}
        <rect width={W} height={H} fill={THEME.CREAM} />

        {/* grid lines */}
        {Array.from({ length: 27 }).map((_, i) => {
          const pos = i * scale;
          return (
            <g key={i}>
              <line
                x1={pos}
                y1={0}
                x2={pos}
                y2={H}
                stroke="#999"
                strokeOpacity="0.25"
              />
              <line
                x1={0}
                y1={pos}
                x2={W}
                y2={pos}
                stroke="#999"
                strokeOpacity="0.25"
              />
            </g>
          );
        })}

        {/* axes */}
        <line x1={midX} y1={0} x2={midX} y2={H} stroke="#111" strokeWidth="2" />
        <line x1={0} y1={midY} x2={W} y2={midY} stroke="#111" strokeWidth="2" />

        {/* axis labels */}
        <text x={W - 18} y={midY - 8} fontSize="14" fontWeight="bold" fill="#111">
          X
        </text>
        <text x={midX + 8} y={18} fontSize="14" fontWeight="bold" fill="#111">
          Y
        </text>

        {/* line between points */}
        <line
          x1={p1.sx}
          y1={p1.sy}
          x2={p2.sx}
          y2={p2.sy}
          stroke={THEME.BLUE}
          strokeWidth="3"
        />

        {/* point 1 */}
        <circle cx={p1.sx} cy={p1.sy} r={6} fill={THEME.ORANGE} />
        <text
          x={p1.sx + 10}
          y={p1.sy - 10}
          fontSize="14"
          fontWeight="bold"
          fill="#111"
        >
          A({x1},{y1})
        </text>

        {/* point 2 */}
        <circle cx={p2.sx} cy={p2.sy} r={6} fill={THEME.ORANGE} />
        <text
          x={p2.sx + 10}
          y={p2.sy - 10}
          fontSize="14"
          fontWeight="bold"
          fill="#111"
        >
          B({x2},{y2})
        </text>
      </svg>

      <p className="mt-2 text-sm font-semibold text-gray-800">
        Drag values using controls to see movement on graph.
      </p>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function CoordinateGeometry() {
  const [x1, setX1] = useState(2);
  const [y1, setY1] = useState(3);
  const [x2, setX2] = useState(7);
  const [y2, setY2] = useState(6);

  const distance = useMemo(() => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }, [x1, y1, x2, y2]);

  const midpoint = useMemo(() => {
    return { mx: (x1 + x2) / 2, my: (y1 + y2) / 2 };
  }, [x1, y1, x2, y2]);

  const slope = useMemo(() => {
    if (x2 - x1 === 0) return "∞ (Vertical line)";
    return ((y2 - y1) / (x2 - x1)).toFixed(2);
  }, [x1, y1, x2, y2]);

  const reset = () => {
    setX1(2);
    setY1(3);
    setX2(7);
    setY2(6);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Math Lab: Coordinate Geometry
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To understand coordinate geometry by plotting points on the XY-plane
            and calculating distance, midpoint and slope between two points.
          </p>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT GRAPH */}
          <Panel title="Graph (XY Plane)">
            <GraphCanvas x1={x1} y1={y1} x2={x2} y2={y2} />
          </Panel>

          {/* RIGHT CONTROLS */}
          <Panel title="Controls & Calculations">
            <div
              className="rounded-lg p-4 mb-5"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">Point A (x₁, y₁)</p>

              <div className="flex gap-4 flex-wrap">
                <input
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(Number(e.target.value))}
                  className="p-2 border rounded-lg w-28 font-semibold"
                  style={{ borderColor: "#555" }}
                />
                <input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(Number(e.target.value))}
                  className="p-2 border rounded-lg w-28 font-semibold"
                  style={{ borderColor: "#555" }}
                />
              </div>

              <p className="font-bold text-gray-800 mt-5 mb-2">
                Point B (x₂, y₂)
              </p>

              <div className="flex gap-4 flex-wrap">
                <input
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(Number(e.target.value))}
                  className="p-2 border rounded-lg w-28 font-semibold"
                  style={{ borderColor: "#555" }}
                />
                <input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(Number(e.target.value))}
                  className="p-2 border rounded-lg w-28 font-semibold"
                  style={{ borderColor: "#555" }}
                />
              </div>

              <button
                onClick={reset}
                className="mt-5 px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
                style={{ backgroundColor: THEME.ORANGE, color: "white" }}
              >
                Reset Points
              </button>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 gap-4">
              <ValueBox
                label="Distance (AB)"
                value={distance.toFixed(2)}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Slope (m)"
                value={String(slope)}
                color={THEME.ORANGE}
              />
              <ValueBox
                label="Midpoint X"
                value={midpoint.mx.toFixed(2)}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Midpoint Y"
                value={midpoint.my.toFixed(2)}
                color={THEME.BLUE}
              />
            </div>
          </Panel>
        </div>

        {/* FORMULAS */}
        <SectionCard title="Formulas Used">
          <p className="font-mono bg-gray-100 p-3 rounded text-gray-900">
            Distance = √[(x₂ − x₁)² + (y₂ − y₁)²]
            <br />
            Midpoint = ((x₁ + x₂)/2 , (y₁ + y₂)/2)
            <br />
            Slope = (y₂ − y₁)/(x₂ − x₁)
          </p>
        </SectionCard>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            Points A and B are plotted successfully on XY-plane and the distance,
            midpoint and slope are calculated using coordinate geometry formulas.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
