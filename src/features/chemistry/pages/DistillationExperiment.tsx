import { useState } from "react";
import DistillationFlask from "../components/DistillationFlask";
import Thermometer from "../components/Thermometer";
import Condenser from "../components/Condenser";
import ReceiverFlask from "../components/ReceiverFlask";
import Burner from "../components/Burner";

/** =========================
 *  PHYSICS THEME COLORS
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

export default function DistillationExperiment() {
  const [heating, setHeating] = useState(false);

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ backgroundColor: THEME.CREAM }}
    >
      {/* TITLE */}
      <h1 className="text-3xl font-extrabold text-gray-900">
        Experiment: Simple Distillation
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
          To separate a liquid mixture based on the difference in boiling points
          of its components using simple distillation.
        </p>
      </section>

      {/* PRINCIPLE */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Principle
        </h2>
        <p className="text-gray-800 mt-1">
          When a liquid is heated to its boiling point, it vaporizes. The vapors
          are cooled in a condenser and collected as liquid. This separates
          components based on boiling point differences.
        </p>
      </section>

      {/* APPARATUS */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Apparatus Required
        </h2>
        <ul className="list-disc ml-6 mt-2 space-y-1 text-gray-800">
          <li>Distillation flask</li>
          <li>Thermometer</li>
          <li>Liebig condenser</li>
          <li>Receiver flask</li>
          <li>Burner / heating source</li>
        </ul>
      </section>

      {/* EXPERIMENTAL SETUP */}
      <section
        className="border rounded-lg p-4"
        style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl text-center mb-6 text-gray-900">
          Experimental Setup
        </h2>

        {/* CENTER ONLY SETUP */}
        <div className="flex justify-center mt-4">
          <div
            style={{
              position: "relative",
              height: "420px",
              width: "100%",
              maxWidth: "900px",
              background: THEME.CREAM,
              borderRadius: "12px",
              border: `2px solid ${THEME.BLUE}`,
            }}
          >
            <DistillationFlask heating={heating} />
            <Thermometer heating={heating} />
            <Condenser heating={heating} />
            <ReceiverFlask heating={heating} />
            <Burner heating={heating} />
          </div>
        </div>

        {/* CONTROL BUTTON */}
        <div className="flex justify-start mt-6">
          <button
            onClick={() => setHeating((h) => !h)}
            className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
            style={{
              backgroundColor: heating ? THEME.ORANGE : THEME.BLUE,
              color: "white",
            }}
          >
            {heating ? "Stop Heating" : "Start Heating"}
          </button>
        </div>
      </section>

      {/* PROCEDURE */}
      <section
        className="p-4 border rounded-lg"
        style={{ backgroundColor: "white", borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl" style={{ color: THEME.ORANGE }}>
          Procedure
        </h2>
        <ol className="list-decimal ml-6 mt-2 space-y-1 text-gray-800">
          <li>Take the liquid mixture in the distillation flask.</li>
          <li>Insert the thermometer using a rubber stopper.</li>
          <li>Connect the flask to the Liebig condenser.</li>
          <li>Place the receiver flask at the outlet.</li>
          <li>Heat gently and observe vapor formation.</li>
          <li>Collect the condensed liquid.</li>
        </ol>
      </section>

      {/* RESULT */}
      <section
        className="p-4 border rounded-lg max-w-xl"
        style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
      >
        <h2 className="font-bold text-xl text-gray-900">Result</h2>
        <div
          className="mt-2 rounded-lg p-4"
          style={{
            backgroundColor: THEME.CREAM,
            border: `2px solid ${THEME.BLUE}`,
          }}
        >
          <p className="text-gray-800">
            The liquid mixture was successfully separated using simple
            distillation based on differences in boiling points.
          </p>
        </div>
      </section>
    </div>
  );
}
