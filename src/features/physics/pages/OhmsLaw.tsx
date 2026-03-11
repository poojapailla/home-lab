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
        Selected: {value.toFixed(step < 1 ? 1 : 0)} {unit}
      </p>
    </div>
  );
}

function WireButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg font-semibold"
      style={{
        backgroundColor: THEME.BLUE,
        color: "white",
        opacity: active ? 1 : 0.5,
      }}
    >
      {label}
    </button>
  );
}

/** =========================
 *  SIMPLE SVG GRAPH (NO LIBS)
 *  ========================= */

function VvsIGraph({ resistance }: { resistance: number }) {
  // Graph size
  const W = 360;
  const H = 260;
  const PAD_L = 45;
  const PAD_B = 30;
  const PAD_T = 15;
  const PAD_R = 15;

  const points = useMemo(() => {
    const arr: { v: number; i: number }[] = [];
    for (let v = 0; v <= 10; v += 1) {
      arr.push({ v, i: v / resistance });
    }
    return arr;
  }, [resistance]);

  const maxI = useMemo(() => {
    const last = points[points.length - 1]?.i ?? 1;
    return Math.max(0.2, last);
  }, [points]);

  const xScale = (v: number) => PAD_L + (v / 10) * (W - PAD_L - PAD_R);

  const yScale = (i: number) => H - PAD_B - (i / maxI) * (H - PAD_T - PAD_B);

  const polyline = points.map((p) => `${xScale(p.v)},${yScale(p.i)}`).join(" ");

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <h3 className="text-lg font-bold mb-3 text-gray-800">Graph: V vs I</h3>

      <div className="w-full overflow-hidden">
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="rounded-md">
          {/* background */}
          <rect x="0" y="0" width={W} height={H} fill={THEME.CREAM} />

          {/* axes */}
          <line
            x1={PAD_L}
            y1={PAD_T}
            x2={PAD_L}
            y2={H - PAD_B}
            stroke="#333"
            strokeWidth="2"
          />
          <line
            x1={PAD_L}
            y1={H - PAD_B}
            x2={W - PAD_R}
            y2={H - PAD_B}
            stroke="#333"
            strokeWidth="2"
          />

          {/* grid light */}
          {[...Array(5)].map((_, idx) => {
            const y = PAD_T + (idx * (H - PAD_T - PAD_B)) / 4;
            return (
              <line
                key={idx}
                x1={PAD_L}
                y1={y}
                x2={W - PAD_R}
                y2={y}
                stroke="#999"
                strokeOpacity="0.25"
              />
            );
          })}

          {/* polyline */}
          <polyline
            fill="none"
            stroke={THEME.BLUE}
            strokeWidth="3"
            points={polyline}
          />

          {/* labels */}
          <text x={W / 2 - 30} y={H - 8} fill="#333" fontSize="12">
            Voltage (V)
          </text>

          <text
            x="12"
            y={H / 2 + 20}
            fill="#333"
            fontSize="12"
            transform={`rotate(-90 12 ${H / 2 + 20})`}
          >
            Current (A)
          </text>
        </svg>
      </div>

      <p className="text-sm mt-2 font-semibold text-gray-700">
        Straight line indicates Ohm&apos;s Law is verified.
      </p>
    </div>
  );
}

/** =========================
 *  CIRCUIT DIAGRAM
 *  ========================= */

function CircuitDiagram({
  voltage,
  resistance,
  current,
  wire1,
  wire2,
  wire3,
  setWire1,
  setWire2,
  setWire3,
  circuitClosed,
}: {
  voltage: number;
  resistance: number;
  current: number;
  wire1: boolean;
  wire2: boolean;
  wire3: boolean;
  setWire1: (v: boolean) => void;
  setWire2: (v: boolean) => void;
  setWire3: (v: boolean) => void;
  circuitClosed: boolean;
}) {
  return (
    <Panel title="Circuit Diagram (Virtual)">
      {/* Wire Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        <WireButton
          label="Wire 1"
          active={wire1}
          onClick={() => setWire1(!wire1)}
        />
        <WireButton
          label="Wire 2"
          active={wire2}
          onClick={() => setWire2(!wire2)}
        />
        <WireButton
          label="Wire 3"
          active={wire3}
          onClick={() => setWire3(!wire3)}
        />
      </div>

      {/* Circuit Box */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: THEME.CREAM,
          border: `2px solid ${THEME.BLUE}`,
        }}
      >
        <div className="relative w-full h-[260px]">
          {/* Wires (single color) */}
          <div
            className="absolute top-[60px] left-[90px] h-[6px] w-[150px] rounded-full"
            style={{ backgroundColor: THEME.BLUE, opacity: wire1 ? 1 : 0.2 }}
          />
          <div
            className="absolute top-[60px] left-[250px] h-[6px] w-[210px] rounded-full"
            style={{ backgroundColor: THEME.BLUE, opacity: wire2 ? 1 : 0.2 }}
          />
          <div
            className="absolute bottom-[45px] left-[90px] h-[6px] w-[370px] rounded-full"
            style={{ backgroundColor: THEME.BLUE, opacity: wire3 ? 1 : 0.2 }}
          />

          <div
            className="absolute top-[60px] left-[90px] w-[6px] h-[150px] rounded-full"
            style={{ backgroundColor: THEME.BLUE }}
          />
          <div
            className="absolute top-[60px] left-[460px] w-[6px] h-[150px] rounded-full"
            style={{ backgroundColor: THEME.BLUE }}
          />

          {/* Battery */}
          <div
            className="absolute left-[10px] top-[110px] w-[90px] h-[60px] rounded-lg flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: THEME.ORANGE }}
          >
            Battery
          </div>

          {/* Ammeter */}
          <div
            className="absolute left-[220px] top-[25px] w-[70px] h-[70px] rounded-full flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: THEME.BLUE }}
          >
            A
          </div>

          {/* Resistor */}
          <div
            className="absolute left-[430px] top-[25px] w-[70px] h-[70px] rounded-lg flex items-center justify-center font-bold text-white"
            style={{ backgroundColor: THEME.ORANGE }}
          >
            R
          </div>

          {/* Status */}
          <div className="absolute left-[150px] right-[150px] top-[135px]">
            <div className="h-3 rounded-full overflow-hidden bg-gray-400/40">
              <div
                className="h-3 transition-all duration-300 rounded-full"
                style={{
                  width: circuitClosed
                    ? `${Math.min(100, current * 10)}%`
                    : "0%",
                  backgroundColor: THEME.BLUE,
                }}
              />
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-900">
              Circuit Status: {circuitClosed ? "Closed" : "Open"}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <ValueBox
            label="Voltage"
            value={`${voltage.toFixed(2)} V`}
            color={THEME.ORANGE}
          />
          <ValueBox
            label="Resistance"
            value={`${resistance.toFixed(0)} Ω`}
            color={THEME.ORANGE}
          />
          <ValueBox
            label="Current"
            value={`${current.toFixed(3)} A`}
            color={THEME.BLUE}
          />
        </div>
      </div>
    </Panel>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function OhmsLaw() {
  const [voltage, setVoltage] = useState<number>(5);
  const [resistance, setResistance] = useState<number>(10);

  const [wire1, setWire1] = useState(true);
  const [wire2, setWire2] = useState(true);
  const [wire3, setWire3] = useState(true);

  const circuitClosed = wire1 && wire2 && wire3;

  const current = useMemo(() => {
    if (!circuitClosed) return 0;
    return voltage / resistance;
  }, [voltage, resistance, circuitClosed]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5" style={{ color: "#111" }}>
          Experiment: Verification of Ohm&apos;s Law
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To verify Ohm&apos;s law by observing the relation between voltage
            (V), current (I) and resistance (R) in an electrical circuit.
          </p>
        </SectionCard>

        {/* APPARATUS */}
        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800">
            <li>Battery (DC Source)</li>
            <li>Resistor (R)</li>
            <li>Ammeter (A)</li>
            <li>Voltmeter (optional)</li>
            <li>Connecting wires</li>
            <li>Switch</li>
          </ul>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Circuit */}
          <CircuitDiagram
            voltage={voltage}
            resistance={resistance}
            current={current}
            wire1={wire1}
            wire2={wire2}
            wire3={wire3}
            setWire1={setWire1}
            setWire2={setWire2}
            setWire3={setWire3}
            circuitClosed={circuitClosed}
          />

          {/* Right Side */}
          <Panel title="Experimental Setup">
            <div
              className="rounded-lg p-4 mb-5"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <SliderControl
                label="Voltage"
                min={0}
                max={10}
                step={0.1}
                value={voltage}
                onChange={setVoltage}
                unit="V"
              />
              <SliderControl
                label="Resistance"
                min={1}
                max={100}
                step={1}
                value={resistance}
                onChange={setResistance}
                unit="Ω"
              />
            </div>

            {/* ✅ Graph without recharts */}
            <VvsIGraph resistance={resistance} />

            {/* Notes */}
            <div className="mt-4 text-sm font-semibold text-gray-700">
              <p>Increase Voltage → Current increases</p>
              <p>Increase Resistance → Current decreases</p>
              <p>Remove any wire → Current becomes 0</p>
            </div>
          </Panel>
        </div>

        {/* PROCEDURE */}
        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800">
            <li>
              Connect the battery, ammeter and resistor in series using wires.
            </li>
            <li>Set a voltage value using the slider.</li>
            <li>Note the current value shown in the ammeter reading.</li>
            <li>
              Change voltage or resistance and observe the change in current.
            </li>
            <li>Plot the graph of V vs I to verify Ohm&apos;s Law.</li>
          </ol>
        </SectionCard>

        {/* FORMULA */}
        <SectionCard title="Formula">
          <div className="bg-gray-100 p-3 rounded-md font-mono text-sm">
            V = I × R <br />
            I = V / R <br />R = V / I
          </div>
        </SectionCard>

        {/* OBSERVATION & RESULT */}
        <div
          className="border rounded-lg p-4"
          style={{ borderColor: "#555", backgroundColor: "#E9F7EE" }}
        >
          <h2 className="text-xl font-bold mb-2" style={{ color: "#111" }}>
            Observation & Result
          </h2>

          <p className="text-gray-800">
            Voltage (V): <b>{voltage.toFixed(2)} V</b>
          </p>
          <p className="text-gray-800">
            Resistance (R): <b>{resistance.toFixed(0)} Ω</b>
          </p>
          <p className="text-gray-800">
            Current (I): <b>{current.toFixed(3)} A</b>
          </p>

          <p className="mt-3 font-bold text-gray-900">
            Result: Ohm&apos;s Law is verified as V/I remains constant for a
            fixed resistance.
          </p>
        </div>
      </div>
    </div>
  );
}
