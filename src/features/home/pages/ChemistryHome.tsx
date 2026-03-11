import DefaultExperimentButton from "../components/DefaultExpeimentButton";
import NavBar from "../components/NavBar";

function ChemistryHome() {
  return (
    <>
      <NavBar currentPage="ChemistryHome" />
      <DefaultExperimentButton
        text="Acid Value Caliculation"
        to="/chemistryHome/acid-value"
        b_type="rectangle"
      />
      <DefaultExperimentButton
        text="Hardness of Water"
        to="/chemistryHome/HardnessExperiment"
        b_type="rectangle"
      />
      <DefaultExperimentButton
        text="Simple Distillation"
        to="/chemistryHome/distillation"
        b_type="rectangle"
      />
      <DefaultExperimentButton
        text="Electrolysis caliculation of ratio."
        to="/chemistryHome/electrolysis"
        b_type="rectangle"
      /> 
    </>
  );
}

export default ChemistryHome;
