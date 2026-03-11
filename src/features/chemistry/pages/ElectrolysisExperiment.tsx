import { useState } from "react";

/** =========================
 *  PHYSICS THEME COLORS
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

export default function ElectrolysisExperiment() {
  const [started, setStarted] = useState(false);

  return (
    <div
      className="min-h-screen p-6 space-y-6"
      style={{ backgroundColor: THEME.CREAM }}
    >
      <h1 className="text-3xl font-extrabold text-gray-900">
        Experiment: Electrolysis of Water
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
          To study the electrolysis of water and observe the ratio of hydrogen
          and oxygen gases produced.
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
          When electric current is passed through acidulated water, it
          decomposes into hydrogen and oxygen gases. Hydrogen is liberated at
          the cathode and oxygen at the anode in the volume ratio 2:1.
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
          <li>Electrolysis vessel (Hoffmann voltameter)</li>
          <li>DC power supply</li>
          <li>Electrodes</li>
          <li>Acidulated water (electrolyte)</li>
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

        <div className="flex justify-center">
          <div
            style={{
              position: "relative",
              width: "420px",
              height: "480px",
              background: THEME.CREAM,
              borderRadius: "16px",
              border: `2px solid ${THEME.BLUE}`,
            }}
          >
            {/* MAIN VESSEL */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "40px",
                transform: "translateX(-50%)",
                width: "260px",
                height: "340px",
                border: "4px solid #1f2937",
                borderRadius: "16px",
                overflow: "hidden",
                background: "white",
              }}
            >
              {/* ELECTROLYTE */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "180px",
                  background: "#bfdbfe",
                }}
              />

              {/* LEFT GAS TUBE – HYDROGEN */}
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  top: "20px",
                  width: "60px",
                  height: "300px",
                  border: "3px solid #1f2937",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: started ? "200px" : "0px",
                    background: "#fde68a",
                    transition: "height 4s linear",
                  }}
                />
              </div>

              {/* RIGHT GAS TUBE – OXYGEN */}
              <div
                style={{
                  position: "absolute",
                  right: "30px",
                  top: "20px",
                  width: "60px",
                  height: "300px",
                  border: "3px solid #1f2937",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: started ? "100px" : "0px",
                    background: "#a5f3fc",
                    transition: "height 4s linear",
                  }}
                />
              </div>

              {/* ELECTRODES */}
              <div
                style={{
                  position: "absolute",
                  left: "55px",
                  bottom: "160px",
                  width: "10px",
                  height: "30px",
                  background: "#1f2937",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "55px",
                  bottom: "160px",
                  width: "10px",
                  height: "30px",
                  background: "#1f2937",
                }}
              />
            </div>

            {/* LABELS */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                left: "40px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              Hydrogen (H₂)
            </div>

            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "40px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              Oxygen (O₂)
            </div>

            <div
              style={{
                position: "absolute",
                top: "80px",
                left: "30px",
                fontSize: "14px",
                fontWeight: 600,
                color: THEME.ORANGE,
              }}
            >
              Cathode (−)
            </div>

            <div
              style={{
                position: "absolute",
                top: "80px",
                right: "30px",
                fontSize: "14px",
                fontWeight: 600,
                color: THEME.ORANGE,
              }}
            >
              Anode (+)
            </div>

            <div
              style={{
                position: "absolute",
                top: "260px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "14px",
                fontWeight: 700,
                color: "#111",
              }}
            >
              Acidulated Water (Electrolyte)
            </div>

            {/* POWER SUPPLY */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "170px",
                height: "60px",
                background: THEME.BLUE,
                borderRadius: "10px",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              DC Power Supply
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-start gap-4 mt-8 flex-wrap">
          <button
            disabled={started}
            onClick={() => setStarted(true)}
            className="px-6 py-2 rounded-lg shadow font-bold transition"
            style={{
              backgroundColor: started ? "#9ca3af" : THEME.BLUE,
              color: "white",
              cursor: started ? "not-allowed" : "pointer",
            }}
          >
            Start Electrolysis
          </button>

          <button
            onClick={() => setStarted(false)}
            className="px-6 py-2 rounded-lg shadow font-bold hover:scale-105 transition"
            style={{ backgroundColor: THEME.ORANGE, color: "white" }}
          >
            Reset
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
          <li>Fill the electrolysis vessel with acidulated water.</li>
          <li>Insert the electrodes into the water.</li>
          <li>Connect the electrodes to the DC power supply.</li>
          <li>Switch on the power supply to start electrolysis.</li>
          <li>Observe gas bubbles forming at both electrodes.</li>
          <li>Collect hydrogen at the cathode and oxygen at the anode.</li>
          <li>Note that the volume of hydrogen is twice that of oxygen.</li>
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
            Hydrogen gas was collected at the cathode and oxygen gas at the anode
            in the volume ratio 2:1, confirming the chemical composition of
            water.
          </p>
        </div>
      </section>
    </div>
  );
}
