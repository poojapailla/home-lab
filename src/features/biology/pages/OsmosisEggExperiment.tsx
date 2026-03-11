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
 *  EGG SIMULATION
 *  ========================= */

function EggTank({
  solution,
  concentration,
}: {
  solution: "distilled" | "salt" | "sugar";
  concentration: number;
}) {
  // base egg size
  const baseSize = 90;

  const eggScale = useMemo(() => {
    // distilled water => egg swells
    if (solution === "distilled") {
      return 1 + concentration / 200; // max ~1.5
    }

    // salt/sugar => egg shrinks
    return 1 - concentration / 250; // min ~0.6
  }, [solution, concentration]);

  const liquidColor = useMemo(() => {
    if (solution === "distilled") return "#bfdbfe"; // blue water
    if (solution === "salt") return "#e5e7eb"; // grayish
    return "#fde68a"; // sugar yellow
  }, [solution]);

  const solutionText = useMemo(() => {
    if (solution === "distilled") return "Distilled Water (Hypotonic)";
    if (solution === "salt") return "Salt Solution (Hypertonic)";
    return "Sugar Solution (Hypertonic)";
  }, [solution]);

  return (
    <div
      className="relative w-full h-[340px] rounded-lg flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      {/* Tank */}
      <div
        className="relative w-[280px] h-[280px] rounded-xl overflow-hidden"
        style={{
          border: `3px solid ${THEME.BLUE}`,
          backgroundColor: "white",
        }}
      >
        {/* Liquid */}
        <div
          className="absolute bottom-0 w-full transition-all duration-500"
          style={{
            height: "70%",
            backgroundColor: liquidColor,
          }}
        />

        {/* Egg */}
        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2">
          <div
            className="rounded-full transition-all duration-500 shadow-md"
            style={{
              width: `${baseSize * eggScale}px`,
              height: `${baseSize * eggScale}px`,
              backgroundColor: "#fff",
              border: "3px solid #d1d5db",
            }}
          />
        </div>

        {/* Label */}
        <div className="absolute top-2 left-2 text-xs font-semibold text-gray-800">
          {solutionText}
        </div>
      </div>

      {/* Note */}
      <p className="absolute bottom-3 text-sm font-semibold text-gray-800">
        Egg Size changes due to Osmosis
      </p>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function OsmosisEggExperiment() {
  const [solution, setSolution] = useState<"distilled" | "salt" | "sugar">(
    "distilled"
  );
  const [concentration, setConcentration] = useState(20);

  const osmosisType = useMemo(() => {
    if (solution === "distilled") return "Endosmosis (Water enters egg)";
    return "Exosmosis (Water leaves egg)";
  }, [solution]);

  const observation = useMemo(() => {
    if (solution === "distilled")
      return "Egg swells because water enters through the semi-permeable membrane.";
    return "Egg shrinks because water moves out into the concentrated solution.";
  }, [solution]);

  const result = useMemo(() => {
    if (solution === "distilled")
      return "Osmosis causes the egg to gain water and increase in size.";
    return "Osmosis causes the egg to lose water and decrease in size.";
  }, [solution]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Experiment: Osmosis Egg Experiment
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To study osmosis using a de-shelled egg by placing it in different
            solutions and observing changes in its size.
          </p>
        </SectionCard>

        {/* APPARATUS */}
        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            <li>Egg (shell removed using vinegar)</li>
            <li>Distilled water</li>
            <li>Salt solution / Sugar solution</li>
            <li>Glass beaker / container</li>
            <li>Measuring spoon (for concentration)</li>
          </ul>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: SIMULATION */}
          <Panel title="Virtual Simulation">
            <EggTank solution={solution} concentration={concentration} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <ValueBox
                label="Osmosis Type"
                value={osmosisType}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Concentration"
                value={`${concentration}%`}
                color={THEME.ORANGE}
              />
            </div>
          </Panel>

          {/* RIGHT: CONTROLS */}
          <Panel title="Controls & Observations">
            <div
              className="rounded-lg p-4 mb-5"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">
                Select Solution
              </p>

              <select
                value={solution}
                onChange={(e) =>
                  setSolution(e.target.value as "distilled" | "salt" | "sugar")
                }
                className="p-2 border rounded-lg w-full font-semibold"
                style={{ borderColor: "#555" }}
              >
                <option value="distilled">Distilled Water (Hypotonic)</option>
                <option value="salt">Salt Solution (Hypertonic)</option>
                <option value="sugar">Sugar Solution (Hypertonic)</option>
              </select>

              <div className="mt-6">
                <p className="font-bold text-gray-800">
                  Solution Concentration (5% - 50%)
                </p>
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={concentration}
                  onChange={(e) => setConcentration(Number(e.target.value))}
                  className="w-full mt-2"
                />

                <p className="mt-2 font-semibold" style={{ color: THEME.ORANGE }}>
                  Selected: {concentration}%
                </p>
              </div>
            </div>

            {/* Observation */}
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Observation
              </h3>
              <p className="text-gray-800">{observation}</p>
            </div>
          </Panel>
        </div>

        {/* PROCEDURE */}
        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800 space-y-1">
            <li>Soak egg in vinegar overnight to dissolve the shell.</li>
            <li>Rinse the egg carefully (semi-permeable membrane remains).</li>
            <li>Place egg in distilled water and observe swelling.</li>
            <li>Place egg in salt/sugar solution and observe shrinking.</li>
            <li>Compare egg size in different solutions.</li>
          </ol>
        </SectionCard>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">{result}</p>
        </SectionCard>
      </div>
    </div>
  );
}
