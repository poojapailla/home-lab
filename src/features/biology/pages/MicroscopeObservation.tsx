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
 *  SIMPLE CELL DRAWING
 *  ========================= */

function CellView({
  type,
  zoom,
  brightness,
}: {
  type: "onion" | "cheek" | "leaf";
  zoom: number;
  brightness: number;
}) {
  // brightness 30 - 100 => convert to opacity
  const overlayOpacity = useMemo(() => {
    const op = (100 - brightness) / 120;
    return Math.min(0.6, Math.max(0, op));
  }, [brightness]);

  const cellColor = useMemo(() => {
    if (type === "onion") return "#fef3c7"; // pale yellow
    if (type === "cheek") return "#fecaca"; // light pink
    return "#bbf7d0"; // light green
  }, [type]);

  const nucleusColor = useMemo(() => {
    if (type === "leaf") return "#166534"; // dark green nucleus
    return "#7c3aed"; // violet nucleus
  }, [type]);

  // Zoom scale (1x - 5x)
  const scale = zoom;

  return (
    <div
      className="relative w-full h-[340px] rounded-lg flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: THEME.CREAM,
        border: `2px solid ${THEME.BLUE}`,
      }}
    >
      {/* Microscope lens circle */}
      <div
        className="relative w-[260px] h-[260px] rounded-full flex items-center justify-center"
        style={{
          border: "10px solid #111",
          backgroundColor: "#fff",
        }}
      >
        {/* Cells container */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.3s ease",
          }}
        >
          {/* Grid cells (like onion cells) */}
          {type === "onion" && (
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="border"
                  style={{
                    borderColor: "#a16207",
                    backgroundColor: cellColor,
                  }}
                >
                  {/* nucleus */}
                  <div
                    className="w-3 h-3 rounded-full m-2"
                    style={{ backgroundColor: nucleusColor }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Cheek cells - random blobs */}
          {type === "cheek" && (
            <div className="absolute inset-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border"
                  style={{
                    width: `${20 + (i % 3) * 10}px`,
                    height: `${18 + (i % 4) * 8}px`,
                    left: `${(i * 23) % 200}px`,
                    top: `${(i * 19) % 200}px`,
                    backgroundColor: cellColor,
                    borderColor: "#991b1b",
                  }}
                >
                  <div
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: nucleusColor,
                      left: "30%",
                      top: "30%",
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Leaf cells - green blocks with chloroplast dots */}
          {type === "leaf" && (
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="relative border rounded-md"
                  style={{
                    backgroundColor: cellColor,
                    borderColor: "#166534",
                  }}
                >
                  {/* chloroplast dots */}
                  {Array.from({ length: 8 }).map((_, j) => (
                    <div
                      key={j}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: "#15803d",
                        left: `${(j * 12) % 60}%`,
                        top: `${(j * 15) % 70}%`,
                      }}
                    />
                  ))}
                  {/* nucleus */}
                  <div
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: nucleusColor,
                      right: "8px",
                      bottom: "8px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* brightness overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "#111",
            opacity: overlayOpacity,
            transition: "opacity 0.25s ease",
          }}
        />
      </div>

      <p className="absolute bottom-3 text-sm font-semibold text-gray-800">
        Microscope View ({type.toUpperCase()} cells)
      </p>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

export default function MicroscopeObservation() {
  const [sample, setSample] = useState<"onion" | "cheek" | "leaf">("onion");
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(80);

  const observation = useMemo(() => {
    if (sample === "onion")
      return "Rectangular cells with clear cell wall and nucleus.";
    if (sample === "cheek")
      return "Irregular animal cells without cell wall, nucleus visible.";
    return "Plant cells with chloroplasts and nucleus.";
  }, [sample]);

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Experiment: Microscope Observation of Cells
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To observe different types of cells (plant and animal cells) under a
            microscope and identify basic cell structures.
          </p>
        </SectionCard>

        {/* APPARATUS */}
        <SectionCard title="Apparatus Required">
          <ul className="list-disc ml-6 text-gray-800 space-y-1">
            <li>Compound Microscope</li>
            <li>Glass slides and cover slips</li>
            <li>Onion peel / Cheek cell smear / Leaf peel</li>
            <li>Staining solution (Safranin / Methylene blue)</li>
            <li>Dropper and water</li>
          </ul>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: MICROSCOPE VIEW */}
          <Panel title="Microscope Visualization">
            <CellView type={sample} zoom={zoom} brightness={brightness} />

            <div className="grid grid-cols-3 gap-4 mt-4">
              <ValueBox
                label="Zoom"
                value={`${zoom.toFixed(1)}x`}
                color={THEME.BLUE}
              />
              <ValueBox
                label="Brightness"
                value={`${brightness}%`}
                color={THEME.ORANGE}
              />
              <ValueBox
                label="Sample"
                value={sample.toUpperCase()}
                color={THEME.BLUE}
              />
            </div>
          </Panel>

          {/* RIGHT: CONTROLS */}
          <Panel title="Controls & Observation">
            <div
              className="rounded-lg p-4 mb-5"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              {/* Sample */}
              <p className="font-bold text-gray-800 mb-2">Select Sample</p>
              <select
                value={sample}
                onChange={(e) =>
                  setSample(e.target.value as "onion" | "cheek" | "leaf")
                }
                className="p-2 border rounded-lg w-full font-semibold"
                style={{ borderColor: "#555" }}
              >
                <option value="onion">Onion Peel (Plant Cell)</option>
                <option value="cheek">Cheek Cell (Animal Cell)</option>
                <option value="leaf">Leaf Peel (Plant Cell)</option>
              </select>

              {/* Zoom */}
              <div className="mt-5">
                <p className="font-bold text-gray-800">
                  Zoom (1x - 5x)
                </p>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <p className="mt-1 font-semibold" style={{ color: THEME.ORANGE }}>
                  Selected: {zoom.toFixed(1)}x
                </p>
              </div>

              {/* Brightness */}
              <div className="mt-5">
                <p className="font-bold text-gray-800">
                  Brightness (30% - 100%)
                </p>
                <input
                  type="range"
                  min={30}
                  max={100}
                  step={1}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full mt-2"
                />
                <p className="mt-1 font-semibold" style={{ color: THEME.ORANGE }}>
                  Selected: {brightness}%
                </p>
              </div>
            </div>

            {/* Observation box */}
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
            <li>Prepare a slide with the sample (onion peel / cheek smear / leaf peel).</li>
            <li>Add a drop of stain and cover with cover slip.</li>
            <li>Place the slide on the microscope stage.</li>
            <li>Adjust focus and brightness to get a clear image.</li>
            <li>Observe and identify nucleus, cell wall, and chloroplasts.</li>
          </ol>
        </SectionCard>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            Cells were observed under a microscope. Plant cells show a cell wall
            and chloroplasts (in leaf cells) while animal cells do not have a
            cell wall.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
