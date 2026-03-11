import { useMemo, useState } from "react";

/** =========================
 *  THEME
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
      className="border rounded-lg p-4 mb-6"
      style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
    >
      <h2 className="text-xl font-bold mb-3" style={{ color: "#111" }}>
        {title}
      </h2>
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

function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
  unit,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  unit: string;
}) {
  return (
    <div className="mb-6">
      <p className="font-bold text-gray-800">
        {label} ({min}
        {unit} - {max}
        {unit})
      </p>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2"
      />

      <p className="mt-2 font-bold" style={{ color: THEME.ORANGE }}>
        Selected: {value.toFixed(step < 1 ? 1 : 0)} {unit}
      </p>
    </div>
  );
}

function ModeButton({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-semibold"
      style={{
        backgroundColor: active ? THEME.ORANGE : THEME.BLUE,
        color: "white",
      }}
    >
      {text}
    </button>
  );
}

/** =========================
 *  OPTICS CALCULATIONS
 *  Lens/Mirror formula: 1/f = 1/v + 1/u
 *  u is negative (object on left)
 *  ========================= */

function calculateV(u: number, f: number) {
  const invV = 1 / f - 1 / u;
  if (invV === 0) return Infinity;
  return 1 / invV;
}

/** =========================
 *  RAY DIAGRAM SVG (BIG)
 *  ========================= */

type Mode = "concaveMirror" | "convexMirror" | "convexLens" | "concaveLens";

function RayDiagram({
  mode,
  u,
  f,
  v,
}: {
  mode: Mode;
  u: number;
  f: number;
  v: number;
}) {
  const W = 900;
  const H = 340;
  const centerY = H / 2;

  // optical center / pole
  const originX = 420;

  // object position
  const objX = originX + u;
  const objHeight = 90;

  // image position
  const imgX = Number.isFinite(v) ? originX + v : originX + 260;

  const isVirtual = v < 0;
  const isReal = v > 0;

  // f and 2f positions
  const focusX = originX + f;
  const focus2X = originX + 2 * f;

  // drawing element type
  const isMirror = mode.includes("Mirror");

  return (
    <div
      className="rounded-lg p-5"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <h3 className="text-lg font-bold text-gray-800">Ray Diagram (Virtual)</h3>

        <div className="text-sm font-bold text-gray-700">
          {isReal ? "Real Image" : "Virtual Image"}
        </div>
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-md">
        <rect x="0" y="0" width={W} height={H} fill={THEME.CREAM} />

        {/* principal axis */}
        <line
          x1="0"
          y1={centerY}
          x2={W}
          y2={centerY}
          stroke="#333"
          strokeWidth="2"
        />

        {/* optical center */}
        <line
          x1={originX}
          y1="0"
          x2={originX}
          y2={H}
          stroke="#666"
          strokeOpacity="0.35"
        />

        {/* Mirror/Lens body */}
        {mode === "concaveMirror" && (
          <path
            d={`M ${originX} 40 Q ${originX + 60} ${centerY} ${originX} ${
              H - 40
            }`}
            fill="none"
            stroke={THEME.ORANGE}
            strokeWidth="7"
          />
        )}

        {mode === "convexMirror" && (
          <path
            d={`M ${originX} 40 Q ${originX - 60} ${centerY} ${originX} ${
              H - 40
            }`}
            fill="none"
            stroke={THEME.ORANGE}
            strokeWidth="7"
          />
        )}

        {mode === "convexLens" && (
          <ellipse
            cx={originX}
            cy={centerY}
            rx="20"
            ry="120"
            fill="none"
            stroke={THEME.ORANGE}
            strokeWidth="7"
          />
        )}

        {mode === "concaveLens" && (
          <>
            <path
              d={`M ${originX - 8} 60 Q ${originX - 35} ${centerY} ${
                originX - 8
              } ${H - 60}`}
              fill="none"
              stroke={THEME.ORANGE}
              strokeWidth="7"
            />
            <path
              d={`M ${originX + 8} 60 Q ${originX + 35} ${centerY} ${
                originX + 8
              } ${H - 60}`}
              fill="none"
              stroke={THEME.ORANGE}
              strokeWidth="7"
            />
          </>
        )}

        {/* F and 2F markers */}
        <circle cx={focusX} cy={centerY} r="5" fill={THEME.BLUE} />
        <text x={focusX - 10} y={centerY + 25} fill="#333" fontSize="14">
          F
        </text>

        <circle cx={focus2X} cy={centerY} r="5" fill={THEME.BLUE} />
        <text x={focus2X - 14} y={centerY + 25} fill="#333" fontSize="14">
          2F
        </text>

        {/* Object arrow */}
        <line
          x1={objX}
          y1={centerY}
          x2={objX}
          y2={centerY - objHeight}
          stroke={THEME.BLUE}
          strokeWidth="7"
        />
        <polygon
          points={`${objX - 8},${centerY - objHeight + 14} ${objX},${
            centerY - objHeight
          } ${objX + 8},${centerY - objHeight + 14}`}
          fill={THEME.BLUE}
        />
        <text x={objX - 20} y={centerY + 28} fill="#333" fontSize="14">
          Object
        </text>

        {/* Image arrow */}
        {Number.isFinite(v) && (
          <>
            <line
              x1={imgX}
              y1={centerY}
              x2={imgX}
              y2={centerY - (isVirtual ? objHeight * 0.6 : objHeight)}
              stroke={THEME.ORANGE}
              strokeWidth="7"
              strokeOpacity="0.85"
            />
            <polygon
              points={`${imgX - 8},${
                centerY - (isVirtual ? objHeight * 0.6 : objHeight) + 14
              } ${imgX},${
                centerY - (isVirtual ? objHeight * 0.6 : objHeight)
              } ${imgX + 8},${
                centerY - (isVirtual ? objHeight * 0.6 : objHeight) + 14
              }`}
              fill={THEME.ORANGE}
              opacity="0.85"
            />
            <text x={imgX - 20} y={centerY + 28} fill="#333" fontSize="14">
              Image
            </text>
          </>
        )}

        {/* Rays */}
        {/* Ray 1: parallel ray */}
        <line
          x1={objX}
          y1={centerY - objHeight}
          x2={originX}
          y2={centerY - objHeight}
          stroke="#ff0000"
          strokeWidth="3"
        />

        {/* After interaction of ray 1 */}
        {mode === "convexLens" && (
          <line
            x1={originX}
            y1={centerY - objHeight}
            x2={W}
            y2={centerY}
            stroke="#ff0000"
            strokeWidth="3"
          />
        )}

        {mode === "concaveLens" && (
          <line
            x1={originX}
            y1={centerY - objHeight}
            x2={W}
            y2={centerY - objHeight - 80}
            stroke="#ff0000"
            strokeWidth="3"
          />
        )}

        {mode === "concaveMirror" && (
          <line
            x1={originX}
            y1={centerY - objHeight}
            x2={W}
            y2={centerY - objHeight + 140}
            stroke="#ff0000"
            strokeWidth="3"
          />
        )}

        {mode === "convexMirror" && (
          <line
            x1={originX}
            y1={centerY - objHeight}
            x2={W}
            y2={centerY - objHeight - 140}
            stroke="#ff0000"
            strokeWidth="3"
          />
        )}

        {/* Ray 2: through optical center/pole */}
        <line
          x1={objX}
          y1={centerY - objHeight}
          x2={W}
          y2={centerY}
          stroke="#008000"
          strokeWidth="3"
        />

        {/* Virtual extensions */}
        {isVirtual && (
          <>
            <line
              x1={originX}
              y1={centerY - objHeight}
              x2={0}
              y2={centerY - objHeight}
              stroke="#ff0000"
              strokeWidth="3"
              strokeDasharray="8 8"
            />
            <line
              x1={originX}
              y1={centerY - objHeight}
              x2={0}
              y2={centerY}
              stroke="#008000"
              strokeWidth="3"
              strokeDasharray="8 8"
            />
          </>
        )}

        {/* labels */}
        <text x={20} y={25} fill="#333" fontSize="14" fontWeight="bold">
          {isMirror ? "Mirror" : "Lens"} Mode
        </text>
      </svg>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function MirrorsAndLenses() {
  const [mode, setMode] = useState<Mode>("concaveMirror");

  // u magnitude (object distance)
  const [uMag, setUMag] = useState<number>(80);
  const [fMag, setFMag] = useState<number>(40);

  // sign convention:
  // object distance is always negative (left side)
  const u = useMemo(() => -uMag, [uMag]);

  // f signs:
  // concave mirror => negative
  // convex mirror => positive
  // convex lens => positive
  // concave lens => negative
  const f = useMemo(() => {
    if (mode === "concaveMirror") return -fMag;
    if (mode === "convexMirror") return fMag;
    if (mode === "convexLens") return fMag;
    return -fMag; // concaveLens
  }, [mode, fMag]);

  const v = useMemo(() => calculateV(u, f), [u, f]);

  const magnification = useMemo(() => {
    if (!Number.isFinite(v)) return Infinity;
    return v / u;
  }, [v, u]);

  const nature = useMemo(() => {
    if (!Number.isFinite(v)) return "Image at Infinity";
    if (v > 0) return "Real & Inverted";
    return "Virtual & Erect";
  }, [v]);

  const reset = () => {
    setUMag(80);
    setFMag(40);
    setMode("concaveMirror");
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-5" style={{ color: "#111" }}>
          Experiment: Mirrors and Lenses
        </h1>

        <SectionCard title="Aim">
          <p className="text-gray-800">
            To study image formation in mirrors and lenses using the formula and
            observe ray diagrams virtually.
          </p>
        </SectionCard>

        {/* ✅ BIG RAY DIAGRAM ON TOP */}
        <Panel title="Ray Diagram (Big View)">
          <RayDiagram mode={mode} u={u} f={f} v={v} />
        </Panel>

        {/* ✅ CONTROLS BELOW */}
        <Panel title="Controls & Observations">
          <div
            className="rounded-lg p-4 mb-4"
            style={{
              backgroundColor: THEME.CREAM,
              border: `2px solid ${THEME.BLUE}`,
            }}
          >
            <div className="flex flex-wrap gap-3 mb-5">
              <ModeButton
                text="Concave Mirror"
                active={mode === "concaveMirror"}
                onClick={() => setMode("concaveMirror")}
              />
              <ModeButton
                text="Convex Mirror"
                active={mode === "convexMirror"}
                onClick={() => setMode("convexMirror")}
              />
              <ModeButton
                text="Convex Lens"
                active={mode === "convexLens"}
                onClick={() => setMode("convexLens")}
              />
              <ModeButton
                text="Concave Lens"
                active={mode === "concaveLens"}
                onClick={() => setMode("concaveLens")}
              />
              <ModeButton text="Reset" active={false} onClick={reset} />
            </div>

            <SliderControl
              label="Object Distance (u)"
              min={20}
              max={250}
              step={1}
              value={uMag}
              onChange={setUMag}
              unit=" cm"
            />

            <SliderControl
              label="Focal Length (f)"
              min={10}
              max={120}
              step={1}
              value={fMag}
              onChange={setFMag}
              unit=" cm"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ValueBox
              label="u (object distance)"
              value={`${u.toFixed(0)} cm`}
              color={THEME.BLUE}
            />
            <ValueBox
              label="f (focal length)"
              value={`${f.toFixed(0)} cm`}
              color={THEME.ORANGE}
            />
            <ValueBox
              label="v (image distance)"
              value={Number.isFinite(v) ? `${v.toFixed(1)} cm` : "∞"}
              color={THEME.ORANGE}
            />
            <ValueBox
              label="Magnification (m)"
              value={
                Number.isFinite(magnification)
                  ? magnification.toFixed(2)
                  : "∞"
              }
              color={THEME.BLUE}
            />
          </div>

          <div className="mt-4 text-sm font-semibold text-gray-700">
            <p>Nature of Image: {nature}</p>
          </div>
        </Panel>

        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800">
            <li>Select one mode (Mirror or Lens).</li>
            <li>Adjust object distance (u).</li>
            <li>Adjust focal length (f).</li>
            <li>Observe ray diagram and image changes.</li>
            <li>Note magnification and nature of image.</li>
          </ol>
        </SectionCard>

        <SectionCard title="Formula">
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
            Mirror/Lens Formula: 1/f = 1/v + 1/u <br />
            Magnification: m = v / u
          </div>
        </SectionCard>

        <div
          className="border rounded-lg p-4"
          style={{ borderColor: "#555", backgroundColor: "#E9F7EE" }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: "#111" }}>
            Observation & Result
          </h2>

          <p className="text-gray-800">
            Object Distance (u): <b>{u.toFixed(0)} cm</b>
          </p>
          <p className="text-gray-800">
            Focal Length (f): <b>{f.toFixed(0)} cm</b>
          </p>
          <p className="text-gray-800">
            Image Distance (v):{" "}
            <b>{Number.isFinite(v) ? v.toFixed(1) : "∞"} cm</b>
          </p>
          <p className="text-gray-800">
            Magnification (m):{" "}
            <b>
              {Number.isFinite(magnification) ? magnification.toFixed(2) : "∞"}
            </b>
          </p>

          <p className="mt-3 font-bold text-gray-900">
            Result: Image position and nature changes when u and f values change.
          </p>
        </div>
      </div>
    </div>
  );
}
