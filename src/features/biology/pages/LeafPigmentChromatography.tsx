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
 *  CHROMATOGRAPHY SIM
 *  ========================= */

function ChromatographyPaper({
  progress,
}: {
  progress: number; // 0 to 100
}) {
  // band positions are based on typical pigment movement
  const bands = useMemo(() => {
    // progress controls how far bands appear
    const p = progress / 100;

    return [
      {
        name: "Carotene",
        color: "#fbbf24",
        y: 20 + (1 - p) * 50,
        visible: progress > 30,
      },
      {
        name: "Xanthophyll",
        color: "#fde047",
        y: 70 + (1 - p) * 40,
        visible: progress > 35,
      },
      {
        name: "Chlorophyll a",
        color: "#22c55e",
        y: 140 + (1 - p) * 30,
        visible: progress > 45,
      },
      {
        name: "Chlorophyll b",
        color: "#16a34a",
        y: 180 + (1 - p) * 20,
        visible: progress > 55,
      },
    ];
  }, [progress]);

  return (
    <div
      className="rounded-lg p-4 flex justify-center"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      <div className="relative w-[220px] h-[420px] rounded-md overflow-hidden">
        {/* Tank / background */}
        <div
          className="absolute inset-0"
          style={{
            background: "white",
            border: "3px solid #444",
            borderRadius: "10px",
          }}
        />

        {/* Paper strip */}
        <div
          className="absolute left-1/2 top-6 -translate-x-1/2 w-[90px] h-[360px] rounded-sm"
          style={{
            backgroundColor: "#f9fafb",
            border: "2px solid #999",
          }}
        >
          {/* baseline */}
          <div
            className="absolute bottom-[40px] left-0 right-0 h-[2px]"
            style={{ backgroundColor: "#111" }}
          />

          {/* sample spot */}
          <div
            className="absolute bottom-[32px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
            style={{
              backgroundColor: "#14532d",
              opacity: progress > 10 ? 0.6 : 1,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* solvent front */}
          <div
            className="absolute left-0 right-0 border-t-2 border-dashed"
            style={{
              borderColor: THEME.BLUE,
              bottom: `${40 + (progress / 100) * 280}px`,
              transition: "bottom 0.4s ease",
            }}
          />

          {/* pigment bands */}
          {bands.map((b) => (
            <div
              key={b.name}
              className="absolute left-2 right-2 rounded-md"
              style={{
                height: "14px",
                bottom: `${40 + (b.y / 220) * 280}px`,
                backgroundColor: b.color,
                opacity: b.visible ? 0.9 : 0,
                transition: "opacity 0.6s ease",
              }}
            />
          ))}
        </div>

        {/* solvent in beaker */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[80px]"
          style={{
            backgroundColor: "#bfdbfe",
            opacity: 0.8,
            borderTop: `3px solid ${THEME.BLUE}`,
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        />

        {/* Labels */}
        <p className="absolute top-2 left-2 text-xs font-bold text-gray-800">
          Chromatography Tank
        </p>
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function LeafPigmentChromatography() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  const start = () => {
    setRunning(true);
    setProgress(0);

    let p = 0;
    const timer = setInterval(() => {
      p += 5;
      setProgress(p);

      if (p >= 100) {
        clearInterval(timer);
        setRunning(false);
      }
    }, 250);
  };

  const reset = () => {
    setRunning(false);
    setProgress(0);
  };

  const solventFront = useMemo(() => `${progress}%`, [progress]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Experiment: Leaf Pigment Chromatography
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To separate the pigments present in green leaves using paper
            chromatography and identify the pigment bands formed.
          </p>
        </SectionCard>

        {/* APPARATUS */}
        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            <li>Fresh green leaves (spinach / grass)</li>
            <li>Chromatography paper strip</li>
            <li>Solvent (acetone / petroleum ether mixture)</li>
            <li>Beaker / chromatography jar</li>
            <li>Pencil and capillary tube</li>
          </ul>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: SIMULATION */}
          <Panel title="Virtual Chromatography Setup">
            <ChromatographyPaper progress={progress} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <ValueBox
                label="Solvent Front"
                value={solventFront}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Status"
                value={running ? "Running" : progress === 100 ? "Completed" : "Idle"}
                color={THEME.ORANGE}
              />
            </div>
          </Panel>

          {/* RIGHT: CONTROLS + OBS */}
          <Panel title="Controls & Observation">
            <div
              className="rounded-lg p-4 mb-5"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">
                Run Chromatography
              </p>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={start}
                  disabled={running}
                  className="px-6 py-2 rounded-lg font-bold shadow transition"
                  style={{
                    backgroundColor: running ? "#9ca3af" : THEME.BLUE,
                    color: "white",
                    cursor: running ? "not-allowed" : "pointer",
                  }}
                >
                  Start
                </button>

                <button
                  onClick={reset}
                  className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
                  style={{ backgroundColor: THEME.ORANGE, color: "white" }}
                >
                  Reset
                </button>
              </div>

              <p className="mt-4 text-gray-800 font-semibold">
                As solvent moves up, pigments separate into colored bands.
              </p>
            </div>

            {/* Observation Table */}
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Pigments Observed
              </h3>

              <ul className="space-y-2 text-gray-800 font-semibold">
                <li>
                  🟡 Carotene (Top band) → Yellow/Orange
                </li>
                <li>
                  🟨 Xanthophyll → Yellow
                </li>
                <li>
                  🟢 Chlorophyll a → Blue-green
                </li>
                <li>
                  🟩 Chlorophyll b → Yellow-green
                </li>
              </ul>
            </div>
          </Panel>
        </div>

        {/* PROCEDURE */}
        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800 space-y-1">
            <li>Crush green leaves with solvent to extract pigments.</li>
            <li>Draw a baseline on chromatography paper with pencil.</li>
            <li>Place pigment spot on baseline using capillary tube.</li>
            <li>Dip paper in solvent without immersing spot.</li>
            <li>Allow solvent to rise and separate pigments.</li>
          </ol>
        </SectionCard>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            Leaf pigments were separated into distinct bands on the paper strip.
            This confirms the presence of multiple pigments in leaves like
            chlorophyll and carotenoids.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
