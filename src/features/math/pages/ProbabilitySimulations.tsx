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

function BarRow({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const percent = total === 0 ? 0 : (count / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="w-16 font-bold text-gray-900">{label}</div>

      <div className="flex-1 h-4 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-4 transition-all duration-300 rounded-full"
          style={{
            width: `${percent}%`,
            backgroundColor: THEME.BLUE,
          }}
        />
      </div>

      <div className="w-20 text-right font-semibold text-gray-800">
        {count} ({percent.toFixed(1)}%)
      </div>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

type Mode = "Coin Toss" | "Dice Roll" | "Spinner";

export default function ProbabilitySimulations() {
  const [mode, setMode] = useState<Mode>("Coin Toss");
  const [totalTrials, setTotalTrials] = useState(0);

  // coin results
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);

  // dice results
  const [diceCounts, setDiceCounts] = useState<number[]>([0, 0, 0, 0, 0, 0]);

  // spinner results (4 sections)
  const [spinnerCounts, setSpinnerCounts] = useState<number[]>([0, 0, 0, 0]);

  const runOnce = () => {
    if (mode === "Coin Toss") {
      const r = Math.random() < 0.5 ? "H" : "T";
      setTotalTrials((t) => t + 1);
      if (r === "H") setHeads((h) => h + 1);
      else setTails((t) => t + 1);
    }

    if (mode === "Dice Roll") {
      const r = Math.floor(Math.random() * 6) + 1;
      setTotalTrials((t) => t + 1);
      setDiceCounts((prev) => {
        const copy = [...prev];
        copy[r - 1]++;
        return copy;
      });
    }

    if (mode === "Spinner") {
      const r = Math.floor(Math.random() * 4); // 0..3
      setTotalTrials((t) => t + 1);
      setSpinnerCounts((prev) => {
        const copy = [...prev];
        copy[r]++;
        return copy;
      });
    }
  };

  const runMany = (n: number) => {
    for (let i = 0; i < n; i++) runOnce();
  };

  const reset = () => {
    setTotalTrials(0);
    setHeads(0);
    setTails(0);
    setDiceCounts([0, 0, 0, 0, 0, 0]);
    setSpinnerCounts([0, 0, 0, 0]);
  };

  const theoretical = useMemo(() => {
    if (mode === "Coin Toss") return "Heads = 0.5 , Tails = 0.5";
    if (mode === "Dice Roll") return "Each number probability = 1/6 ≈ 0.1667";
    return "Each section probability = 1/4 = 0.25";
  }, [mode]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Math Lab: Probability Simulations
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To perform probability simulations using random experiments and
            compare experimental probability with theoretical probability.
          </p>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: OUTPUT */}
          <Panel title="Simulation Output">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <div className="grid grid-cols-2 gap-4 mb-5">
                <ValueBox
                  label="Experiment"
                  value={mode}
                  color={THEME.ORANGE}
                />
                <ValueBox
                  label="Total Trials"
                  value={String(totalTrials)}
                  color={THEME.BLUE}
                />
              </div>

              <div className="space-y-3">
                {mode === "Coin Toss" && (
                  <>
                    <BarRow label="Heads" count={heads} total={totalTrials} />
                    <BarRow label="Tails" count={tails} total={totalTrials} />
                  </>
                )}

                {mode === "Dice Roll" && (
                  <>
                    {diceCounts.map((c, i) => (
                      <BarRow
                        key={i}
                        label={String(i + 1)}
                        count={c}
                        total={totalTrials}
                      />
                    ))}
                  </>
                )}

                {mode === "Spinner" && (
                  <>
                    {spinnerCounts.map((c, i) => (
                      <BarRow
                        key={i}
                        label={`S${i + 1}`}
                        count={c}
                        total={totalTrials}
                      />
                    ))}
                  </>
                )}
              </div>

              <div className="mt-6">
                <p className="font-bold text-gray-900">Theoretical Probability</p>
                <p className="text-gray-800 font-semibold mt-1">{theoretical}</p>
              </div>
            </div>
          </Panel>

          {/* RIGHT: CONTROLS */}
          <Panel title="Controls">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">Select Simulation</p>

              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className="p-2 border rounded-lg w-full font-semibold"
                style={{ borderColor: "#555" }}
              >
                <option value="Coin Toss">Coin Toss</option>
                <option value="Dice Roll">Dice Roll</option>
                <option value="Spinner">Spinner (4 sections)</option>
              </select>

              <div className="flex gap-3 flex-wrap mt-6">
                <button
                  onClick={runOnce}
                  className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
                  style={{ backgroundColor: THEME.BLUE, color: "white" }}
                >
                  Run 1 Trial
                </button>

                <button
                  onClick={() => runMany(10)}
                  className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
                  style={{ backgroundColor: THEME.BLUE, color: "white" }}
                >
                  Run 10 Trials
                </button>

                <button
                  onClick={() => runMany(50)}
                  className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
                  style={{ backgroundColor: THEME.BLUE, color: "white" }}
                >
                  Run 50 Trials
                </button>
              </div>

              <button
                onClick={reset}
                className="mt-6 w-full px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
                style={{ backgroundColor: THEME.ORANGE, color: "white" }}
              >
                Reset Experiment
              </button>

              <p className="mt-4 text-sm font-semibold text-gray-700">
                As trials increase, experimental probability approaches
                theoretical probability.
              </p>
            </div>
          </Panel>
        </div>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            Probability simulation was performed successfully. With more trials,
            the experimental probability gets closer to the theoretical value.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
