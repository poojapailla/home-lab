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
 *  FUNCTION SETUP
 *  ========================= */

type FnType = "x^2" | "x^3" | "sin(x)" | "|x|" | "1/x";

function f(x: number, fn: FnType) {
  if (fn === "x^2") return x * x;
  if (fn === "x^3") return x * x * x;
  if (fn === "sin(x)") return Math.sin(x);
  if (fn === "|x|") return Math.abs(x);
  // 1/x
  if (x === 0) return NaN;
  return 1 / x;
}

/** =========================
 *  GRAPH COMPONENT (SVG)
 *  ========================= */

function FunctionGraph({
  fn,
  x0,
  h,
}: {
  fn: FnType;
  x0: number;
  h: number;
}) {
  const W = 520;
  const H = 520;
  const midX = W / 2;
  const midY = H / 2;
  const scale = 40; // units -> pixels

  const toSVG = (x: number, y: number) => ({
    sx: midX + x * scale,
    sy: midY - y * scale,
  });

  const points = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let x = -6; x <= 6; x += 0.05) {
      const y = f(x, fn);
      if (!Number.isFinite(y)) continue;
      arr.push({ x, y });
    }
    return arr;
  }, [fn]);

  const poly = useMemo(() => {
    return points
      .map((p) => {
        const { sx, sy } = toSVG(p.x, p.y);
        return `${sx},${sy}`;
      })
      .join(" ");
  }, [points]);

  const y0 = f(x0, fn);
  const y1 = f(x0 + h, fn);

  const validPoint0 = Number.isFinite(y0);
  const validPoint1 = Number.isFinite(y1);

  const p0 = validPoint0 ? toSVG(x0, y0) : null;
  const p1 = validPoint1 ? toSVG(x0 + h, y1) : null;

  // secant line
  const secantLine = useMemo(() => {
    if (!validPoint0 || !validPoint1) return null;
    return {
      x1: p0!.sx,
      y1: p0!.sy,
      x2: p1!.sx,
      y2: p1!.sy,
    };
  }, [validPoint0, validPoint1, p0, p1]);

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-lg">
        {/* bg */}
        <rect width={W} height={H} fill={THEME.CREAM} />

        {/* grid */}
        {Array.from({ length: 27 }).map((_, i) => {
          const pos = i * 20;
          return (
            <g key={i}>
              <line x1={pos} y1={0} x2={pos} y2={H} stroke="#999" strokeOpacity="0.25" />
              <line x1={0} y1={pos} x2={W} y2={pos} stroke="#999" strokeOpacity="0.25" />
            </g>
          );
        })}

        {/* axes */}
        <line x1={midX} y1={0} x2={midX} y2={H} stroke="#111" strokeWidth="2" />
        <line x1={0} y1={midY} x2={W} y2={midY} stroke="#111" strokeWidth="2" />

        {/* function */}
        <polyline points={poly} fill="none" stroke={THEME.BLUE} strokeWidth="3" />

        {/* secant line */}
        {secantLine && (
          <line
            x1={secantLine.x1}
            y1={secantLine.y1}
            x2={secantLine.x2}
            y2={secantLine.y2}
            stroke={THEME.ORANGE}
            strokeWidth="3"
          />
        )}

        {/* Points */}
        {p0 && <circle cx={p0.sx} cy={p0.sy} r={6} fill={THEME.ORANGE} />}
        {p1 && <circle cx={p1.sx} cy={p1.sy} r={6} fill={THEME.ORANGE} />}

        {/* axis labels */}
        <text x={W - 18} y={midY - 8} fontSize="14" fontWeight="bold" fill="#111">
          X
        </text>
        <text x={midX + 8} y={18} fontSize="14" fontWeight="bold" fill="#111">
          Y
        </text>
      </svg>

      <p className="mt-2 text-sm font-semibold text-gray-800">
        Blue: function graph, Orange: secant line (approaching tangent as h → 0)
      </p>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function LimitsAndDerivatives() {
  const [fn, setFn] = useState<FnType>("x^2");

  const [x0, setX0] = useState(1);
  const [h, setH] = useState(1);

  // left and right limit (approx)
  const leftLimit = useMemo(() => {
    const val = f(x0 - 0.001, fn);
    return Number.isFinite(val) ? val : NaN;
  }, [x0, fn]);

  const rightLimit = useMemo(() => {
    const val = f(x0 + 0.001, fn);
    return Number.isFinite(val) ? val : NaN;
  }, [x0, fn]);

  const limitExists = useMemo(() => {
    if (!Number.isFinite(leftLimit) || !Number.isFinite(rightLimit)) return false;
    return Math.abs(leftLimit - rightLimit) < 0.05;
  }, [leftLimit, rightLimit]);

  // derivative approximation
  const derivative = useMemo(() => {
    const fx0 = f(x0, fn);
    const fxh = f(x0 + h, fn);

    if (!Number.isFinite(fx0) || !Number.isFinite(fxh)) return NaN;
    return (fxh - fx0) / h;
  }, [x0, fn, h]);

  const reset = () => {
    setFn("x^2");
    setX0(1);
    setH(1);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Math Lab: Limits and Derivatives
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To understand the concept of limits and derivatives using interactive
            function graphs and slope of tangent approximation.
          </p>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* GRAPH */}
          <Panel title="Graph Visualization">
            <FunctionGraph fn={fn} x0={x0} h={h} />
          </Panel>

          {/* CONTROLS */}
          <Panel title="Controls & Calculations">
            <div
              className="rounded-lg p-4 mb-5"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">Select Function</p>
              <select
                value={fn}
                onChange={(e) => setFn(e.target.value as FnType)}
                className="p-2 border rounded-lg w-full font-semibold"
                style={{ borderColor: "#555" }}
              >
                <option value="x^2">f(x) = x²</option>
                <option value="x^3">f(x) = x³</option>
                <option value="sin(x)">f(x) = sin(x)</option>
                <option value="|x|">f(x) = |x|</option>
                <option value="1/x">f(x) = 1/x</option>
              </select>

              <div className="mt-6">
                <p className="font-bold text-gray-800">Point (x₀)</p>
                <input
                  type="range"
                  min={-5}
                  max={5}
                  step={0.1}
                  value={x0}
                  onChange={(e) => setX0(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <p className="mt-1 font-semibold" style={{ color: THEME.ORANGE }}>
                  x₀ = {x0.toFixed(1)}
                </p>
              </div>

              <div className="mt-6">
                <p className="font-bold text-gray-800">h value (approach 0)</p>
                <input
                  type="range"
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={h}
                  onChange={(e) => setH(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <p className="mt-1 font-semibold" style={{ color: THEME.ORANGE }}>
                  h = {h.toFixed(1)}
                </p>
              </div>

              <button
                onClick={reset}
                className="mt-6 px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition w-full"
                style={{ backgroundColor: THEME.ORANGE, color: "white" }}
              >
                Reset
              </button>
            </div>

            {/* RESULTS */}
            <div className="grid grid-cols-2 gap-4">
              <ValueBox
                label="Left Limit"
                value={Number.isFinite(leftLimit) ? leftLimit.toFixed(2) : "Undefined"}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Right Limit"
                value={
                  Number.isFinite(rightLimit) ? rightLimit.toFixed(2) : "Undefined"
                }
                color={THEME.BLUE}
              />
              <ValueBox
                label="Limit Exists?"
                value={limitExists ? "Yes" : "No"}
                color={THEME.ORANGE}
              />
              <ValueBox
                label="Derivative f'(x₀)"
                value={
                  Number.isFinite(derivative) ? derivative.toFixed(3) : "Undefined"
                }
                color={THEME.ORANGE}
              />
            </div>
          </Panel>
        </div>

        {/* FORMULAS */}
        <SectionCard title="Formulas Used">
          <p className="font-mono bg-gray-100 p-3 rounded text-gray-900">
            Limit: lim(x→x₀) f(x)
            <br />
            Derivative: f'(x₀) = lim(h→0) [f(x₀ + h) − f(x₀)] / h
          </p>
        </SectionCard>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            Limits and derivatives were calculated using numerical approximation.
            As h approaches 0, the secant line approaches the tangent line.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
