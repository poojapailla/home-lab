import DefaultExperimentButton from "../components/DefaultExpeimentButton";
import NavBar from "../components/NavBar";

function PhysicsHome() {
  return (
    <>
      <NavBar currentPage="PhysicsHome" />

      <div className="flex flex-col items-center">
        <DefaultExperimentButton
          text="Ohms-law"
          b_type="rectangle"
          to="/physicsHome/ohms-law"
        />

        <DefaultExperimentButton
          text="Projectile Motion"
          b_type="rectangle"
          to="/physicsHome/projectile-motion"
        />

        <DefaultExperimentButton
        text="Mirrors and Lenses"
        b_type="rectangle"
       to="/physicsHome/mirrors-lenses"
      />

        <DefaultExperimentButton
          text="Magnetism around north and south poles"
          b_type="rectangle"
          to="/physicsHome/Magnetism"
        />

     
      </div>
    </>
  );
}

export default PhysicsHome;
