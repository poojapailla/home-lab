import { useEffect, useMemo, useState } from "react";

/** =========================
 *  THEME (same as Ohms)
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
        Selected: {value.toFixed(step < 1 ? 1 : 0)}
        {unit}
      </p>
    </div>
  );
}

function Btn({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-semibold mr-3"
      style={{ backgroundColor: THEME.BLUE, color: "white" }}
    >
      {text}
    </button>
  );
}

/** =========================
 *  PHYSICS HELPERS
 *  ========================= */
function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

/** =========================
 *  PROJECTILE GRAPH (SVG)
 *  ========================= */
function ProjectileGraph({ points }: { points: { x: number; y: number }[] }) {
  const W = 420;
  const H = 260;
  const PAD_L = 50;
  const PAD_B = 35;
  const PAD_T = 15;
  const PAD_R = 15;

  const maxX = useMemo(() => {
    const m = Math.max(...points.map((p) => p.x));
    return Math.max(1, m);
  }, [points]);

  const maxY = useMemo(() => {
    const m = Math.max(...points.map((p) => p.y));
    return Math.max(1, m);
  }, [points]);

  const xScale = (x: number) => PAD_L + (x / maxX) * (W - PAD_L - PAD_R);

  const yScale = (y: number) => H - PAD_B - (y / maxY) * (H - PAD_T - PAD_B);

  const poly = points.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join(" ");

  const start = points[0];
  const end = points[points.length - 1];

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <h3 className="text-lg font-bold mb-3 text-gray-800">
        Trajectory Graph (x vs y)
      </h3>

      <svg width="100%" viewBox={`0 0 420 260`} className="rounded-md">
        <rect x="0" y="0" width="420" height="260" fill={THEME.CREAM} />

        {/* axes */}
        <line x1="50" y1="15" x2="50" y2="225" stroke="#333" strokeWidth="2" />
        <line
          x1="50"
          y1="225"
          x2="405"
          y2="225"
          stroke="#333"
          strokeWidth="2"
        />

        {/* grid */}
        {[...Array(5)].map((_, i) => {
          const yy = 15 + (i * (225 - 15)) / 4;
          return (
            <line
              key={i}
              x1="50"
              y1={yy}
              x2="405"
              y2={yy}
              stroke="#999"
              strokeOpacity="0.25"
            />
          );
        })}

        {/* trajectory */}
        <polyline
          fill="none"
          stroke={THEME.BLUE}
          strokeWidth="3"
          points={poly}
        />

        {/* start/end */}
        <circle
          cx={xScale(start.x)}
          cy={yScale(start.y)}
          r="4"
          fill={THEME.ORANGE}
        />
        <circle
          cx={xScale(end.x)}
          cy={yScale(end.y)}
          r="4"
          fill={THEME.ORANGE}
        />

        {/* labels */}
        <text x="190" y="252" fill="#333" fontSize="12">
          Distance (m)
        </text>

        <text
          x="14"
          y="150"
          fill="#333"
          fontSize="12"
          transform="rotate(-90 14 150)"
        >
          Height (m)
        </text>
      </svg>
    </div>
  );
}

/** =========================
 *  PROJECTILE ANIMATION (BALL)
 *  ========================= */
function ProjectileAnimation({
  u,
  angleDeg,
  g,
  t,
  totalT,
}: {
  u: number;
  angleDeg: number;
  g: number;
  t: number;
  totalT: number;
}) {
  const theta = degToRad(angleDeg);

  const x = u * Math.cos(theta) * t;
  const y = u * Math.sin(theta) * t - 0.5 * g * t * t;

  // Scaling for screen
  const RANGE = (u * u * Math.sin(2 * theta)) / g;
  const HMAX = (u * u * Math.sin(theta) * Math.sin(theta)) / (2 * g);

  const maxX = Math.max(1, RANGE);
  const maxY = Math.max(1, HMAX);

  const boxW = 480;
  const boxH = 260;

  const px = 20 + (x / maxX) * (boxW - 60);
  const py = boxH - 30 - (Math.max(0, y) / maxY) * (boxH - 60);

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <h3 className="text-lg font-bold mb-3 text-gray-800">
        Virtual Throw Simulation
      </h3>

      <div
        className="relative rounded-lg overflow-hidden"
        style={{ width: "100%", height: 260, backgroundColor: "#fff" }}
      >
        {/* ground */}
        <div
          className="absolute left-0 right-0 bottom-4 h-[3px]"
          style={{ backgroundColor: THEME.BLUE, opacity: 0.6 }}
        />

        {/* ball */}
        <div
          className="absolute w-5 h-5 rounded-full"
          style={{
            left: px,
            top: py,
            backgroundColor: THEME.ORANGE,
          }}
        />

        {/* time indicator */}
        <div className="absolute right-3 top-3 text-sm font-bold text-gray-700">
          t = {t.toFixed(2)} s / {totalT.toFixed(2)} s
        </div>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */
export default function ProjectileMotion() {
  const [speed, setSpeed] = useState<number>(20);
  const [angle, setAngle] = useState<number>(45);
  const [gravity, setGravity] = useState<number>(9.8);

  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const theta = useMemo(() => degToRad(angle), [angle]);

  const timeOfFlight = useMemo(() => {
    return (2 * speed * Math.sin(theta)) / gravity;
  }, [speed, theta, gravity]);

  const maxHeight = useMemo(() => {
    return (speed * speed * Math.sin(theta) * Math.sin(theta)) / (2 * gravity);
  }, [speed, theta, gravity]);

  const range = useMemo(() => {
    return (speed * speed * Math.sin(2 * theta)) / gravity;
  }, [speed, theta, gravity]);

  // Trajectory points for graph
  const trajectory = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const steps = 50;

    for (let i = 0; i <= steps; i++) {
      const t = (timeOfFlight * i) / steps;
      const x = speed * Math.cos(theta) * t;
      const y = speed * Math.sin(theta) * t - 0.5 * gravity * t * t;
      pts.push({ x, y: Math.max(0, y) });
    }
    return pts;
  }, [timeOfFlight, speed, theta, gravity]);

  // Animation timer
  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setTime((prev) => {
        const next = prev + 0.03;
        if (next >= timeOfFlight) {
          clearInterval(id);
          setRunning(false);
          return timeOfFlight;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(id);
  }, [running, timeOfFlight]);

  const start = () => {
    setTime(0);
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
  };

  const reset = () => {
    setSpeed(20);
    setAngle(45);
    setGravity(9.8);
    setTime(0);
    setRunning(false);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-5" style={{ color: "#111" }}>
          Experiment: Projectile Motion
        </h1>

        <SectionCard title="Aim">
          <p className="text-gray-800">
            To study the motion of a projectile and calculate its time of
            flight, maximum height and horizontal range.
          </p>
        </SectionCard>

        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800">
            <li>Projectile launcher (virtual)</li>
            <li>Angle adjuster</li>
            <li>Velocity controller</li>
            <li>Graph and measurement system</li>
          </ul>
        </SectionCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Controls + Values */}
          <Panel title="Experimental Setup">
            <div
              className="rounded-lg p-4 mb-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <SliderControl
                label="Initial Velocity"
                min={5}
                max={50}
                step={1}
                value={speed}
                onChange={setSpeed}
                unit=" m/s"
              />
              <SliderControl
                label="Angle"
                min={10}
                max={80}
                step={1}
                value={angle}
                onChange={setAngle}
                unit="°"
              />
              <SliderControl
                label="Gravity"
                min={1}
                max={20}
                step={0.1}
                value={gravity}
                onChange={setGravity}
                unit=" m/s²"
              />

              <div className="mt-2">
                <Btn text="Start Throw" onClick={start} />
                <Btn text="Pause" onClick={pause} />
                <Btn text="Reset" onClick={reset} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <ValueBox
                label="Time of Flight"
                value={`${timeOfFlight.toFixed(2)} s`}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Max Height"
                value={`${maxHeight.toFixed(2)} m`}
                color={THEME.ORANGE}
              />
              <ValueBox
                label="Range"
                value={`${range.toFixed(2)} m`}
                color={THEME.ORANGE}
              />
            </div>
          </Panel>

          {/* RIGHT: Ball animation + graph */}
          <Panel title="Simulation & Graph">
            <ProjectileAnimation
              u={speed}
              angleDeg={angle}
              g={gravity}
              t={time}
              totalT={timeOfFlight}
            />

            <div className="mt-5">
              <ProjectileGraph points={trajectory} />
            </div>
          </Panel>
        </div>

        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800">
            <li>Set the initial velocity using the slider.</li>
            <li>Select the projection angle using the angle slider.</li>
            <li>Click Start Throw and observe the ball motion.</li>
            <li>Observe the trajectory graph and note values.</li>
          </ol>
        </SectionCard>

        <SectionCard title="Formula">
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
            Time of Flight: T = (2u sinθ) / g <br />
            Maximum Height: H = (u² sin²θ) / (2g) <br />
            Range: R = (u² sin2θ) / g
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
            Initial Velocity (u): <b>{speed.toFixed(0)} m/s</b>
          </p>
          <p className="text-gray-800">
            Angle (θ): <b>{angle.toFixed(0)}°</b>
          </p>
          <p className="text-gray-800">
            Time of Flight (T): <b>{timeOfFlight.toFixed(2)} s</b>
          </p>
          <p className="text-gray-800">
            Maximum Height (H): <b>{maxHeight.toFixed(2)} m</b>
          </p>
          <p className="text-gray-800">
            Range (R): <b>{range.toFixed(2)} m</b>
          </p>

          <p className="mt-3 font-bold text-gray-900">
            Result: Projectile follows a parabolic path as shown in the
            simulation and graph.
          </p>
        </div>
      </div>
    </div>
  );
}
