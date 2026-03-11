import { useNavigate } from "react-router-dom";
import type ButtonProps from "../../../types/ButtonProps";

export default function DefaultExperimentButton(props: ButtonProps) {
  const navigate = useNavigate();

  const sizeClasses: Record<string, string> = {
    rectangle: "w-full min-h-[80px]",
    b_square: "w-full h-[170px]",
  };

  const getTheme = () => {
    if (props.text.toLowerCase().includes("physics")) {
      return {
        bg: "from-blue-50 to-white",
        border: "hover:border-blue-300",
        tag: "bg-blue-100 text-blue-700 border-blue-200",
      };
    }
    if (props.text.toLowerCase().includes("chem")) {
      return {
        bg: "from-purple-50 to-white",
        border: "hover:border-purple-300",
        tag: "bg-purple-100 text-purple-700 border-purple-200",
      };
    }
    return {
      bg: "from-gray-50 to-white",
      border: "hover:border-gray-300",
      tag: "bg-gray-100 text-gray-700 border-gray-200",
    };
  };

  const theme = getTheme();

  return (
    <button
      type="button"
      onClick={() => navigate(props.to)}
      className={`
        ${sizeClasses[props.b_type]}
        rounded-3xl border border-gray-200 ${theme.border}
        bg-gradient-to-br ${theme.bg}
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1 active:scale-[0.98]
        p-6 flex flex-col justify-between text-left
      `}
    >
      <div>
        <h3 className="text-2xl font-extrabold text-gray-900">{props.text}</h3>
        <p className="mt-2 text-gray-600 text-sm">
          Click to explore experiments
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span
          className={`px-4 py-1.5 text-sm font-semibold rounded-full border ${theme.tag}`}
        >
          Start
        </span>
        <span className="text-gray-500 text-xl font-bold">→</span>
      </div>
    </button>
  );
}
