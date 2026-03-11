import { Routes, Route } from "react-router-dom";

import Home from "../src/features/home/pages/Home";

import PhysicsHome from "../src/features/home/pages/PhysicsHome";
import OhmsLaw from "../src/features/physics/pages/OhmsLaw";
import Magnetism from "../src/features/physics/pages/Magnetism.tsx";
import ProjectileMotion from "../src/features/physics/pages/ProjectileMotion";
import MirrorsAndLenses from "../src/features/physics/pages/MirrorsAndLenses";

import ChemistryHome from "../src/features/home/pages/ChemistryHome";
import AcidValueExperiment from "./features/chemistry/pages/AcidValueExperiment.tsx";
import HardnessExperiment from "./features/chemistry/pages/HardnessExperiment";
import DistillationExperiment from "../src/features/chemistry/pages/DistillationExperiment";
import ElectrolysisExperiment from "../src/features/chemistry/pages/ElectrolysisExperiment";

import BiologyHome from "../src/features/home/pages/BiologyHome";
import DNAExtraction from "../src/features/biology/pages/DNAExtraction";
import MicroscopeObservation from "../src/features/biology/pages/MicroscopeObservation";
import OsmosisEggExperiment from "../src/features/biology/pages/OsmosisEggExperiment";
import LeafPigmentChromatography from "../src/features/biology/pages/LeafPigmentChromatography";

import MathHome from "../src/features/home/pages/MathHome";
import CoordinateGeometry from "../src/features/math/pages/CoordinateGeometry";
import NumberPatterns from "../src/features/math/pages/NumberPatterns";
import LimitsAndDerivatives from "../src/features/math/pages/LimitsAndDerivatives";
import ProbabilitySimulations from "../src/features/math/pages/ProbabilitySimulations";


// hello world
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/physicsHome" element={<PhysicsHome />} />
      <Route path="/physicsHome/ohms-law" element={<OhmsLaw />} />
      <Route path="/physicsHome/Magnetism" element={<Magnetism />} />
      <Route
        path="/physicsHome/projectile-motion"
        element={<ProjectileMotion />}
      />
      <Route
        path="/physicsHome/mirrors-lenses"
        element={<MirrorsAndLenses />}
      />

      <Route path="/chemistryHome" element={<ChemistryHome />} />
      <Route
        path="/chemistryHome/acid-value"
        element={<AcidValueExperiment />}
      />
      <Route
        path="/chemistryHome/HardnessExperiment"
        element={<HardnessExperiment />}
      />
      <Route path="/chemistryHome/distillation" element={<DistillationExperiment />} />
      <Route path="/chemistryHome/electrolysis" element={<ElectrolysisExperiment />} />

      <Route path="/biologyHome" element={<BiologyHome />} />
      <Route path="/biologyHome/dna-extraction" element={<DNAExtraction />} />
      <Route path="/biologyHome/microscope-observation" element={<MicroscopeObservation />} />
      <Route path="/biologyHome/osmosis-egg" element={<OsmosisEggExperiment />} />
      <Route path="/biologyHome/leaf-pigment-chromatography" element={<LeafPigmentChromatography />} />

      <Route path="/mathHome" element={<MathHome />} />
      <Route path="/mathHome/coordinate-geometry" element={<CoordinateGeometry />} />
      <Route path="/mathHome/number-patterns" element={<NumberPatterns />} />
      <Route path="/mathHome/limits-derivatives" element={<LimitsAndDerivatives />} />
      <Route path="/mathHome/probability-simulations" element={<ProbabilitySimulations />} />



    </Routes>
  );
}

export default App;
