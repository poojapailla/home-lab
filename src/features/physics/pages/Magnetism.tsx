import { useMemo, useState } from "react";

/** =========================
 *  THEME (same as Ohm's Law)
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

/** =========================
 *  COMMON UI COMPONENTS
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
 *  MAGNET FIELD SVG
 *  ========================= */
function MagnetFieldLines({
  showLines,
  strength,
}: {
  showLines: boolean;
  strength: number;
}) {
  // opacity + thickness
  const opacity = useMemo(() => 0.25 + strength / 160, [strength]);
  const strokeW = useMemo(() => 1.2 + strength / 60, [strength]);

  // number of loops depends on strength
  const lineCount = useMemo(() => {
    if (strength < 25) return 4;
    if (strength < 50) return 6;
    if (strength < 75) return 8;
    return 10;
  }, [strength]);

  // gap between loops (higher strength => smaller gap)
  const gap = useMemo(() => {
    return 18 - strength / 12; // 10% ~17 , 100% ~9
  }, [strength]);

  // generate loop paths around magnet (like real field lines)
  const loops = useMemo(() => {
    const arr: { d: string; arrowX: number; arrowY: number }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const off = i * gap;

      // Outer loop
      // Start near N side -> go above -> reach S side -> return below -> back to N
      const topY = 75 - off;
      const bottomY = 225 + off;

      // limit values so they don't go out of box
      const tY = Math.max(25, topY);
      const bY = Math.min(275, bottomY);

      // Loop curve path
      const d = `
        M 210 150
        C 210 ${tY}, 390 ${tY}, 390 150
        C 390 ${bY}, 210 ${bY}, 210 150
      `;

      // arrow position (put arrows on top curve)
      const arrowX = 300;
      const arrowY = tY + 10;

      arr.push({ d, arrowX, arrowY });
    }

    return arr;
  }, [lineCount, gap]);

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <div className="relative w-full h-[300px]">
        <svg width="100%" height="100%" viewBox="0 0 600 300">
          {/* background */}
          <rect width="600" height="300" fill={THEME.CREAM} />

          {/* Arrow marker */}
          <defs>
            <marker
              id="arrowHead"
              markerWidth="10"
              markerHeight="10"
              refX="6"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L7,3 z" fill={THEME.BLUE} />
            </marker>
          </defs>

          {/* Field lines like your image */}
          {showLines && (
            <>
              {loops.map((loop, i) => (
                <path
                  key={i}
                  d={loop.d}
                  fill="none"
                  stroke={THEME.BLUE}
                  strokeOpacity={opacity}
                  strokeWidth={strokeW}
                  markerMid="url(#arrowHead)"
                />
              ))}

              {/* Inner field (inside magnet direction S → N) */}
              <path
                d="M 390 150 C 350 150, 250 150, 210 150"
                fill="none"
                stroke={THEME.BLUE}
                strokeOpacity={opacity}
                strokeWidth={strokeW + 0.8}
                markerEnd="url(#arrowHead)"
              />
            </>
          )}

          {/* Magnet body */}
          <rect x="210" y="125" width="90" height="50" fill="#C0392B" rx="6" />
          <rect x="300" y="125" width="90" height="50" fill="#2980B9" rx="6" />

          {/* N/S text */}
          <text
            x="255"
            y="158"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="white"
          >
            N
          </text>
          <text
            x="345"
            y="158"
            textAnchor="middle"
            fontSize="20"
            fontWeight="bold"
            fill="white"
          >
            S
          </text>

          {/* Small label */}
          <text x="30" y="30" fontSize="14" fontWeight="bold" fill="#333">
            Magnetic Field Lines (N → S)
          </text>
        </svg>

        <p className="absolute bottom-2 left-3 text-sm font-semibold text-gray-700">
          Field lines are denser near the poles
        </p>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function Magnetism() {
  const [strength, setStrength] = useState(60);
  const [showLines, setShowLines] = useState(true);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Experiment: Magnetic Field Around a Bar Magnet
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To study the pattern of magnetic field lines around a bar magnet
            and understand how iron filings align along these lines.
          </p>
        </SectionCard>

        {/* APPARATUS */}
        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800">
            <li>Bar Magnet</li>
            <li>Iron filings (virtual representation)</li>
            <li>Sheet / surface</li>
          </ul>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Visualization */}
          <Panel title="Magnetic Field Visualization">
            <MagnetFieldLines showLines={showLines} strength={strength} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <ValueBox
                label="Strength"
                value={`${strength}%`}
                color={THEME.ORANGE}
              />
              <ValueBox
                label="Field Lines"
                value={showLines ? "Visible" : "Hidden"}
                color={THEME.BLUE}
              />
            </div>
          </Panel>

          {/* Right: Controls */}
          <Panel title="Controls">
            <div
              className="rounded-lg p-4 mb-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">
                Magnetic Field Strength
              </p>
              <input
                type="range"
                min={10}
                max={100}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-2 font-bold" style={{ color: THEME.ORANGE }}>
                Selected: {strength}%
              </p>
            </div>

            <button
              onClick={() => setShowLines(!showLines)}
              className="px-4 py-2 rounded-lg font-semibold text-white"
              style={{ backgroundColor: THEME.BLUE }}
            >
              {showLines ? "Hide Field Lines" : "Show Field Lines"}
            </button>

            <div className="mt-5 text-sm font-semibold text-gray-700">
              <p>✅ Higher strength → Field lines look darker & thicker</p>
              <p>✅ Field lines are denser near poles</p>
            </div>
          </Panel>
        </div>

        {/* PROCEDURE */}
        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800">
            <li>Place the bar magnet on the surface.</li>
            <li>Observe magnetic field lines around the magnet.</li>
            <li>Increase strength and see how lines appear darker.</li>
            <li>Hide/show lines for better understanding.</li>
          </ol>
        </SectionCard>

        {/* OBSERVATION */}
        <SectionCard title="Observation & Result">
          <p className="text-gray-800">
            Magnetic field lines emerge from the North pole and enter the South
            pole. They form closed loops and are more concentrated near poles.
          </p>

          <p className="mt-3 font-bold text-gray-900">
            Result: Magnetic field is strongest near poles where lines are
            closest together.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
