import { useState } from "react";
import Beaker from "../components/Beaker";
import Pipette from "../components/Pipette";
import DropAnimation from "../components/DropAnimation";
import ConicalFlask from "../components/ConicalFlask";
import LabTable from "../components/LabTable";
import { calculateAcidValue } from "../utils/calculateAcidValue";
import { oils } from "../data/oils";

/** =========================
 *  PHYSICS THEME COLORS
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

export default function AcidValueExperiment() {
  // ===== CONSTANTS =====
  const DEFAULT_WEIGHT = 5; // g
  const NORMALITY = 0.1; // N
  const ENDPOINT_VOLUME = 2.5; // mL

  // ===== STATE =====
  const [selectedOil, setSelectedOil] = useState(oils[0]);
  const [oilWeight, setOilWeight] = useState(DEFAULT_WEIGHT);
  const [volume, setVolume] = useState(0); // mL of KOH
  const [drop, setDrop] = useState(false);

  // ===== CALCULATION =====
  const acidValue = calculateAcidValue(volume, NORMALITY, oilWeight);

  // ===== ACTIONS =====
  const addDrop = () => {
    setDrop(true);
    setVolume((v) => Number((v + 0.1).toFixed(1)));
    setTimeout(() => setDrop(false), 600);
  };

  const resetExperiment = () => {
    setSelectedOil(oils[0]);
    setOilWeight(DEFAULT_WEIGHT);
    setVolume(0);
    setDrop(false);
  };

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ backgroundColor: THEME.CREAM }}
    >
      {/* TITLE */}
      <h1 className="text-3xl font-extrabold text-gray-900">
        Experiment: Determination of Acid Value of Oil
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
          To determine the acid value of the given oil sample by titration with
          standard potassium hydroxide (KOH) solution using phenolphthalein as
          indicator.
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
          <select
            className="p-2 border rounded-lg font-semibold"
            style={{ borderColor: "#555" }}
            value={selectedOil.name}
            onChange={(e) =>
              setSelectedOil(oils.find((o) => o.name === e.target.value)!)
            }
          >
            {oils.map((o) => (
              <option key={o.name}>{o.name}</option>
            ))}
          </select>

          <div>
            <input
              type="number"
              min={1}
              max={10}
              value={oilWeight}
              onChange={(e) => setOilWeight(Number(e.target.value))}
              className="p-2 border rounded-lg w-32 font-semibold"
              style={{ borderColor: "#555" }}
            />
            <p className="text-sm text-gray-600">Weight of oil (g)</p>
          </div>

          <div>
            <input
              type="text"
              value="0.1 N KOH"
              disabled
              className="p-2 border rounded-lg bg-gray-100 w-32 font-semibold"
              style={{ borderColor: "#555" }}
            />
            <p className="text-sm text-gray-600">Normality of KOH</p>
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
            <Beaker
              liquidColor={selectedOil.color}
              liquidVolume={oilWeight}
              label="Beaker (Oil Sample)"
            />

            <Pipette />

            <DropAnimation active={drop} />

            {/* 🔴 IMPORTANT FIX IS HERE */}
            <ConicalFlask
              volume={volume}
              endpointVolume={ENDPOINT_VOLUME}
              preEndpointColor="#fde68a" // faint / colorless
              endpointColor="#f9a8d4" // phenolphthalein pink
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
          Add KOH Drop (0.1 mL)
        </button>

        <button
          onClick={resetExperiment}
          className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
          style={{ backgroundColor: THEME.ORANGE, color: "white" }}
        >
          Reset Experiment
        </button>
      </div>

      {/* PROCEDURE */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Procedure
        </h2>
        <ol className="list-decimal ml-6 space-y-1 text-gray-800 mt-2">
          <li>Weigh the oil sample accurately.</li>
          <li>Dissolve it in a suitable solvent.</li>
          <li>Add phenolphthalein indicator.</li>
          <li>
            Titrate with standard KOH until a faint permanent pink colour
            appears.
          </li>
          <li>Note the volume of KOH used.</li>
        </ol>
      </section>

      {/* FORMULA */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Formula
        </h2>
        <p className="font-mono bg-gray-100 p-2 rounded mt-2">
          Acid Value = (V × N × 56.1) / W
        </p>
        <ul className="mt-2 text-sm text-gray-800">
          <li>V = Volume of KOH used (mL)</li>
          <li>N = Normality of KOH</li>
          <li>W = Weight of oil (g)</li>
        </ul>
        <p className="mt-2 text-sm text-gray-800">
          Acid value is expressed as <b>mg KOH / g oil</b>.
        </p>
      </section>

      {/* OBSERVATION & RESULT */}
      <section
        className="p-4 border rounded-lg max-w-xl"
        style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl mb-2 text-gray-900">
          Observation & Result
        </h2>

        <div
          className="rounded-lg p-4"
          style={{
            backgroundColor: THEME.CREAM,
            border: `2px solid ${THEME.BLUE}`,
          }}
        >
          <p className="text-gray-800">
            Volume of KOH used (V): <b>{volume} mL</b>
          </p>
          <p className="text-gray-800">
            Normality of KOH (N): <b>{NORMALITY} N</b>
          </p>
          <p className="text-gray-800">
            Weight of oil (W): <b>{oilWeight} g</b>
          </p>

          <p className="mt-3 text-lg font-bold" style={{ color: THEME.ORANGE }}>
            Acid Value of the given oil = {acidValue} mg KOH / g oil
          </p>
        </div>
      </section>
    </div>
  );
}
