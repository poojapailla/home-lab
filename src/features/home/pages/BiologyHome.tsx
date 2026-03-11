import DefaultExperimentButton from "../components/DefaultExpeimentButton";
import NavBar from "../components/NavBar";

function BiologyHome() {
  return (
    <>
      <NavBar currentPage="BiologyHome" />
    
      <div className="flex-col justify-center ">
        <DefaultExperimentButton
          text="DNA Extraction (Strawberries)"
          b_type="rectangle"
          to="/biologyHome/dna-extraction"
        />

        <DefaultExperimentButton
        text="Microscope Observation of Cells"
        b_type="rectangle"
        to="/biologyHome/microscope-observation"
        />

        <DefaultExperimentButton
        text="Osmosis Egg Experiment"
        b_type="rectangle"
        to="/biologyHome/osmosis-egg"
        />

        <DefaultExperimentButton
        text="Leaf Pigment Chromatography"
        b_type="rectangle"
        to="/biologyHome/leaf-pigment-chromatography"
        />

      </div>
    </>
  );
}

export default BiologyHome;
