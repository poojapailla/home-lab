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
 *  MAIN COMPONENT
 *  ========================= */

export default function DNAExtraction() {
  // ✅ Steps control
  const [crushed, setCrushed] = useState(false);
  const [soapAdded, setSoapAdded] = useState(false);
  const [saltAdded, setSaltAdded] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [alcoholAdded, setAlcoholAdded] = useState(false);

  // ✅ DNA Amount calculation (simple)
  const dnaPercent = useMemo(() => {
    let p = 0;
    if (crushed) p += 20;
    if (soapAdded) p += 20;
    if (saltAdded) p += 20;
    if (filtered) p += 20;
    if (alcoholAdded) p += 20;
    return p;
  }, [crushed, soapAdded, saltAdded, filtered, alcoholAdded]);

  const reset = () => {
    setCrushed(false);
    setSoapAdded(false);
    setSaltAdded(false);
    setFiltered(false);
    setAlcoholAdded(false);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Experiment: DNA Extraction from Strawberries
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To extract DNA from strawberry cells using simple household
            chemicals like soap, salt and cold alcohol.
          </p>
        </SectionCard>

        {/* APPARATUS */}
        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            <li>Strawberries (2-3)</li>
            <li>Zip lock bag / Mortar & Pestle</li>
            <li>Dish soap</li>
            <li>Salt</li>
            <li>Cold Ethyl Alcohol / Isopropyl Alcohol</li>
            <li>Filter paper / Coffee filter</li>
            <li>Beaker / Test tube</li>
          </ul>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: SIMULATION */}
          <Panel title="Virtual Simulation">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              {/* Beaker */}
              <div className="flex justify-center">
                <div
                  className="relative w-[260px] h-[320px] rounded-xl overflow-hidden"
                  style={{
                    border: `3px solid ${THEME.BLUE}`,
                    backgroundColor: "white",
                  }}
                >
                  {/* Liquid */}
                  <div
                    className="absolute bottom-0 w-full transition-all duration-500"
                    style={{
                      height: crushed ? "55%" : "20%",
                      backgroundColor: crushed ? "#f87171" : "#fecaca",
                    }}
                  />

                  {/* Filter Layer */}
                  {filtered && (
                    <div
                      className="absolute bottom-[55%] w-full h-3"
                      style={{ backgroundColor: "#d1d5db" }}
                    />
                  )}

                  {/* DNA Layer */}
                  {alcoholAdded && (
                    <div
                      className="absolute top-0 w-full h-[35%] flex items-center justify-center"
                      style={{ backgroundColor: "#bfdbfe" }}
                    >
                      <div className="text-sm font-bold text-gray-900">
                        DNA strands visible ✅
                      </div>
                    </div>
                  )}

                  {/* Labels */}
                  <div className="absolute bottom-2 left-2 text-xs font-semibold text-gray-700">
                    Strawberry Mixture
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="mt-5 grid grid-cols-3 gap-4">
                <ValueBox
                  label="Crushed"
                  value={crushed ? "Yes" : "No"}
                  color={THEME.ORANGE}
                />
                <ValueBox
                  label="Filtered"
                  value={filtered ? "Yes" : "No"}
                  color={THEME.ORANGE}
                />
                <ValueBox
                  label="DNA Extracted"
                  value={alcoholAdded ? "Yes" : "No"}
                  color={THEME.BLUE}
                />
              </div>
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
              <div className="space-y-3">
                <button
                  onClick={() => setCrushed(true)}
                  disabled={crushed}
                  className="w-full px-4 py-2 rounded-lg font-bold shadow transition"
                  style={{
                    backgroundColor: crushed ? "#9ca3af" : THEME.BLUE,
                    color: "white",
                    cursor: crushed ? "not-allowed" : "pointer",
                  }}
                >
                  Step 1: Crush Strawberries
                </button>

                <button
                  onClick={() => setSoapAdded(true)}
                  disabled={!crushed || soapAdded}
                  className="w-full px-4 py-2 rounded-lg font-bold shadow transition"
                  style={{
                    backgroundColor:
                      !crushed || soapAdded ? "#9ca3af" : THEME.BLUE,
                    color: "white",
                    cursor:
                      !crushed || soapAdded ? "not-allowed" : "pointer",
                  }}
                >
                  Step 2: Add Soap
                </button>

                <button
                  onClick={() => setSaltAdded(true)}
                  disabled={!soapAdded || saltAdded}
                  className="w-full px-4 py-2 rounded-lg font-bold shadow transition"
                  style={{
                    backgroundColor:
                      !soapAdded || saltAdded ? "#9ca3af" : THEME.BLUE,
                    color: "white",
                    cursor:
                      !soapAdded || saltAdded ? "not-allowed" : "pointer",
                  }}
                >
                  Step 3: Add Salt
                </button>

                <button
                  onClick={() => setFiltered(true)}
                  disabled={!saltAdded || filtered}
                  className="w-full px-4 py-2 rounded-lg font-bold shadow transition"
                  style={{
                    backgroundColor:
                      !saltAdded || filtered ? "#9ca3af" : THEME.BLUE,
                    color: "white",
                    cursor:
                      !saltAdded || filtered ? "not-allowed" : "pointer",
                  }}
                >
                  Step 4: Filter Mixture
                </button>

                <button
                  onClick={() => setAlcoholAdded(true)}
                  disabled={!filtered || alcoholAdded}
                  className="w-full px-4 py-2 rounded-lg font-bold shadow transition"
                  style={{
                    backgroundColor:
                      !filtered || alcoholAdded ? "#9ca3af" : THEME.ORANGE,
                    color: "white",
                    cursor:
                      !filtered || alcoholAdded ? "not-allowed" : "pointer",
                  }}
                >
                  Step 5: Add Cold Alcohol
                </button>

                <button
                  onClick={reset}
                  className="w-full px-4 py-2 rounded-lg font-bold shadow hover:scale-[1.02] transition"
                  style={{ backgroundColor: THEME.ORANGE, color: "white" }}
                >
                  Reset Experiment
                </button>
              </div>
            </div>

            {/* DNA Progress */}
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="text-gray-900 font-bold mb-2">
                DNA Extraction Progress
              </p>

              <div className="h-3 rounded-full overflow-hidden bg-gray-300">
                <div
                  className="h-3 transition-all duration-500"
                  style={{
                    width: `${dnaPercent}%`,
                    backgroundColor: THEME.BLUE,
                  }}
                />
              </div>

              <p className="mt-2 font-semibold text-gray-800">
                {dnaPercent}% completed
              </p>
            </div>
          </Panel>
        </div>

        {/* PROCEDURE */}
        <SectionCard title="Procedure">
          <ol className="list-decimal ml-6 text-gray-800 space-y-1">
            <li>Crush strawberries to break the cells.</li>
            <li>Add dish soap to break cell membranes and release DNA.</li>
            <li>Add salt to help DNA clump together.</li>
            <li>Filter the mixture to remove solid particles.</li>
            <li>
              Add cold alcohol carefully; DNA will appear as white strands.
            </li>
          </ol>
        </SectionCard>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            DNA is extracted successfully from strawberries and appears as
            whitish, string-like strands in the alcohol layer.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
