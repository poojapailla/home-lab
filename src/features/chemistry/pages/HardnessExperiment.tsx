import { useState } from "react";
import Beaker from "../components/Beaker";
import Pipette from "../components/Pipette";
import DropAnimation from "../components/DropAnimation";
import ConicalFlask from "../components/ConicalFlask";
import LabTable from "../components/LabTable";
import { calculateHardness } from "../utils/calculateHardness";

/** =========================
 *  PHYSICS THEME COLORS
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

export default function HardnessExperiment() {
  // ===== CONSTANTS =====
  const SAMPLE_VOLUME = 50; // mL of water
  const NORMALITY_EDTA = 0.01; // N
  const ENDPOINT_VOLUME = 10; // mL (visual endpoint)

  // ===== STATE =====
  const [volumeEDTA, setVolumeEDTA] = useState(0); // mL
  const [drop, setDrop] = useState(false);

  // ===== CALCULATION =====
  const hardness = calculateHardness(volumeEDTA, NORMALITY_EDTA, SAMPLE_VOLUME);

  // ===== ACTIONS =====
  const addDrop = () => {
    setDrop(true);
    setVolumeEDTA((v) => Number((v + 0.5).toFixed(1))); // ✅ 0.5 mL
    setTimeout(() => setDrop(false), 600);
  };

  const resetExperiment = () => {
    setVolumeEDTA(0);
    setDrop(false);
  };

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ backgroundColor: THEME.CREAM }}
    >
      {/* TITLE */}
      <h1 className="text-3xl font-extrabold text-gray-900">
        Experiment: Estimation of Hardness of Water (EDTA Method)
      </h1>

      {/* AIM */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Aim
        </h2>
        <p className="text-gray-800 mt-1">
          To determine the total hardness of the given water sample by titration
          with standard EDTA solution using Eriochrome Black T (EBT) indicator.
        </p>
      </section>

      {/* THEORY */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Principle
        </h2>
        <p className="text-gray-800 mt-1">
          Hardness of water is caused by the presence of calcium and magnesium
          ions. EDTA forms stable complexes with these ions. Eriochrome Black T
          gives a wine-red color in the presence of Ca²⁺/Mg²⁺ ions, which turns
          blue at the endpoint.
        </p>
      </section>

      {/* EXPERIMENTAL SETUP */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl mb-3" style={{ color: THEME.ORANGE }}>
          Experimental Setup
        </h2>

        <div className="flex flex-wrap gap-6">
          <div>
            <input
              type="text"
              value="Water Sample"
              disabled
              className="p-2 border rounded-lg bg-gray-100 w-40 font-semibold"
              style={{ borderColor: "#555" }}
            />
            <p className="text-sm text-gray-600">Sample (50 mL)</p>
          </div>

          <div>
            <input
              type="text"
              value="0.01 N EDTA"
              disabled
              className="p-2 border rounded-lg bg-gray-100 w-40 font-semibold"
              style={{ borderColor: "#555" }}
            />
            <p className="text-sm text-gray-600">Titrant</p>
          </div>

          <div>
            <input
              type="text"
              value="EBT Indicator"
              disabled
              className="p-2 border rounded-lg bg-gray-100 w-40 font-semibold"
              style={{ borderColor: "#555" }}
            />
            <p className="text-sm text-gray-600">Indicator</p>
          </div>
        </div>
      </section>

      {/* LAB SIMULATION */}
      <div
        className="border rounded-lg p-4"
        style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
      >
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          Lab Simulation (Virtual)
        </h2>

        <div
          className="rounded-lg p-4"
          style={{
            backgroundColor: THEME.CREAM,
            border: `2px solid ${THEME.BLUE}`,
          }}
        >
          <LabTable>
            {/* Beaker with water */}
            <Beaker
              liquidColor="#bfdbfe"
              liquidVolume={SAMPLE_VOLUME}
              label="Beaker (Water Sample)"
            />

            {/* Pipette (EDTA) */}
            <Pipette />

            {/* Drop */}
            <DropAnimation active={drop} />

            {/* Conical Flask */}
            <ConicalFlask
              volume={volumeEDTA}
              endpointVolume={ENDPOINT_VOLUME}
              preEndpointColor="#7f1d1d" // wine red (EBT + Ca/Mg)
              endpointColor="#2563eb" // blue (endpoint)
            />
          </LabTable>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={addDrop}
          className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
          style={{ backgroundColor: THEME.BLUE, color: "white" }}
        >
          Add EDTA Drop (0.5 mL)
        </button>

        <button
          onClick={resetExperiment}
          className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
          style={{ backgroundColor: THEME.ORANGE, color: "white" }}
        >
          Reset Experiment
        </button>
      </div>

      {/* FORMULA */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Formula
        </h2>
        <p className="font-mono bg-gray-100 p-2 rounded mt-2">
          Total Hardness (mg/L as CaCO₃) = (V × N × 50,000) / Sample Volume
        </p>
        <ul className="mt-2 text-sm text-gray-800">
          <li>V = Volume of EDTA used (mL)</li>
          <li>N = Normality of EDTA</li>
        </ul>
      </section>

      {/* OBSERVATION & RESULT */}
      <section
        className="p-4 border rounded-lg max-w-xl"
        style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl text-gray-900">
          Observation & Result
        </h2>

        <div
          className="mt-2 rounded-lg p-4"
          style={{
            backgroundColor: THEME.CREAM,
            border: `2px solid ${THEME.BLUE}`,
          }}
        >
          <p className="text-gray-800">
            Volume of EDTA used (V): <b>{volumeEDTA} mL</b>
          </p>
          <p className="text-gray-800">
            Normality of EDTA (N): <b>{NORMALITY_EDTA}</b>
          </p>
          <p className="text-gray-800">
            Sample volume: <b>{SAMPLE_VOLUME} mL</b>
          </p>

          <p className="mt-3 text-lg font-bold" style={{ color: THEME.ORANGE }}>
            Total Hardness of Water = {hardness} mg/L as CaCO₃
          </p>
        </div>
      </section>
    </div>
  );
}
