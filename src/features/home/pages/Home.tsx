import DefaultExperimentButton from "../components/DefaultExpeimentButton";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar currentPage="Home" />

      {/* ✅ Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* ✅ Premium Hero Card */}
        <div className="rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-sm px-8 py-10">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Home Science Lab
            </h2>

            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Explore interactive experiments designed for easy understanding.
              Learn step-by-step with clean visuals and simulations.
            </p>
          </div>

          {/* ✅ Buttons Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <DefaultExperimentButton
              text="Physics"
              to="/physicsHome"
              b_type="b_square"
            />

            <DefaultExperimentButton
              text="Chemistry"
              to="/chemistryHome"
              b_type="b_square"
            />

            <DefaultExperimentButton
              text="Biology"
              to="/BiologyHome"
              b_type="b_square"
            />

            <DefaultExperimentButton
              text="Math"
              to="/MathHome"
              b_type="b_square"
            />

          </div>
        </div>

        {/* ✅ Small Premium Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Select a category to begin
        </div>
      </main>

      {/* ✅ Premium Footer (simple, not odd) */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between text-sm text-gray-500">
          <span className="font-semibold text-gray-700">Virtual Lab</span>
          <span className="text-gray-400">Interactive Learning Platform</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
