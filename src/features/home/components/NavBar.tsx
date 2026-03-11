import type NavBarProps from "../../../types/NavBarProps";
import HamburgerButton from "./HamburgerButton";

export default function NavBar(props: NavBarProps) {
  const currentPage = props.currentPage;

  type PageKey = "Home" | "PhysicsHome" | "ChemistryHome" | "BiologyHome";
  const currentPageTitle: Record<PageKey, string> = {
    Home: "Home Science Lab",
    PhysicsHome: "Physics Lab",
    ChemistryHome: "Chemistry Lab",
    BiologyHome: "Biology Lab"
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <HamburgerButton />
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            {currentPageTitle[currentPage]}
          </h1>
        </div>

        {/* Right */}
        <div className="hidden sm:flex items-center gap-3">
          <input
            type="text"
            placeholder="Search experiments..."
            className="w-[320px] px-4 py-2 rounded-xl border border-gray-200 bg-gray-50
            text-gray-700 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>
      </div>
    </nav>
  );
}
