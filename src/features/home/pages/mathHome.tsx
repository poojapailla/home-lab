import DefaultExperimentButton from "../components/DefaultExpeimentButton";
import NavBar from "../components/NavBar";

function MathHome() {
  return (
    <>
      <NavBar currentPage="MathHome" />

      <div className="flex flex-col items-center">
        <DefaultExperimentButton
          text="Coordinate Geometry"
          b_type="rectangle"
          to="/mathHome/coordinate-geometry"
        />
        <DefaultExperimentButton
        text="Number Patterns"
        b_type="rectangle"
        to="/mathHome/number-patterns"
        />

        <DefaultExperimentButton
        text="Limits and Derivatives"
        b_type="rectangle"
        to="/mathHome/limits-derivatives"
        />

        <DefaultExperimentButton
        text="Probability Simulations"
        b_type="rectangle"
        to="/mathHome/probability-simulations"
        />

      </div>
    </>
  );
}

export default MathHome;
