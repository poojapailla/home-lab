import { useMemo, useState } from "react";

/** =========================
 *  THEME (same as Physics)
 *  ========================= */
const THEME = {
  ORANGE: "#E2A16F",
  CREAM: "#FFF0DD",
  GRAY: "#D1D3D4",
  BLUE: "#86B0BD",
};

/** =========================
 *  SMALL UI COMPONENTS
 *  ========================= */

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border rounded-lg p-4 mb-6"
      style={{ backgroundColor: "white", borderColor: "#555" }}
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: THEME.ORANGE }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border rounded-lg p-4"
      style={{ backgroundColor: THEME.GRAY, borderColor: "#555" }}
    >
      <h2 className="text-xl font-bold mb-3 text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

function ValueBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-lg p-3 text-center bg-white/40">
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="text-lg font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

/** =========================
 *  MAIN COMPONENT
 *  ========================= */

type PatternType = "Arithmetic" | "Geometric" | "Fibonacci" | "Square" | "Triangle";

export default function NumberPatterns() {
  const [pattern, setPattern] = useState<PatternType>("Arithmetic");

  const [first, setFirst] = useState<number>(2);
  const [second, setSecond] = useState<number>(4); // for Fibonacci
  const [diff, setDiff] = useState<number>(3); // AP
  const [ratio, setRatio] = useState<number>(2); // GP

  const [terms, setTerms] = useState<number>(10);

  const sequence = useMemo(() => {
    const n = Math.max(1, Math.min(terms, 20)); // limit 20
    const arr: number[] = [];

    if (pattern === "Arithmetic") {
      for (let i = 0; i < n; i++) arr.push(first + i * diff);
    }

    if (pattern === "Geometric") {
      for (let i = 0; i < n; i++) arr.push(Number((first * ratio ** i).toFixed(2)));
    }

    if (pattern === "Fibonacci") {
      let a = first;
      let b = second;
      arr.push(a);
      if (n > 1) arr.push(b);
      for (let i = 2; i < n; i++) {
        const c = a + b;
        arr.push(c);
        a = b;
        b = c;
      }
    }

    if (pattern === "Square") {
      for (let i = 1; i <= n; i++) arr.push(i * i);
    }

    if (pattern === "Triangle") {
      for (let i = 1; i <= n; i++) arr.push((i * (i + 1)) / 2);
    }

    return arr;
  }, [pattern, first, second, diff, ratio, terms]);

  const formula = useMemo(() => {
    if (pattern === "Arithmetic") return "aₙ = a + (n − 1)d";
    if (pattern === "Geometric") return "aₙ = a × rⁿ⁻¹";
    if (pattern === "Fibonacci") return "aₙ = aₙ₋₁ + aₙ₋₂";
    if (pattern === "Square") return "aₙ = n²";
    return "aₙ = n(n + 1)/2";
  }, [pattern]);

  const nextTerm = useMemo(() => {
    if (sequence.length === 0) return 0;
    const last = sequence[sequence.length - 1];
    if (pattern === "Arithmetic") return last + diff;
    if (pattern === "Geometric") return Number((last * ratio).toFixed(2));
    if (pattern === "Fibonacci") {
      const len = sequence.length;
      if (len === 1) return sequence[0];
      return sequence[len - 1] + sequence[len - 2];
    }
    if (pattern === "Square") {
      const n = sequence.length + 1;
      return n * n;
    }
    const n = sequence.length + 1;
    return (n * (n + 1)) / 2;
  }, [sequence, pattern, diff, ratio]);

  const reset = () => {
    setPattern("Arithmetic");
    setFirst(2);
    setSecond(4);
    setDiff(3);
    setRatio(2);
    setTerms(10);
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: THEME.CREAM }}>
      <div className="max-w-6xl mx-auto">
        {/* TITLE */}
        <h1 className="text-3xl font-extrabold mb-5 text-gray-900">
          Math Lab: Number Patterns
        </h1>

        {/* AIM */}
        <SectionCard title="Aim">
          <p className="text-gray-800">
            To understand different number patterns and generate sequences using
            their rules and formulas.
          </p>
        </SectionCard>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: SEQUENCE DISPLAY */}
          <Panel title="Generated Pattern Output">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-900 mb-2">
                Sequence ({sequence.length} terms)
              </p>

              <div className="flex flex-wrap gap-2">
                {sequence.map((num, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 rounded-lg font-semibold"
                    style={{
                      backgroundColor: "white",
                      border: `1px solid ${THEME.BLUE}`,
                      color: "#111",
                    }}
                  >
                    {num}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <ValueBox label="Formula" value={formula} color={THEME.ORANGE} />
                <ValueBox
                  label="Next Term"
                  value={String(nextTerm)}
                  color={THEME.BLUE}
                />
              </div>
            </div>
          </Panel>

          {/* RIGHT: CONTROLS */}
          <Panel title="Controls">
            <div
              className="rounded-lg p-4"
              style={{
                backgroundColor: THEME.CREAM,
                border: `2px solid ${THEME.BLUE}`,
              }}
            >
              <p className="font-bold text-gray-800 mb-2">Select Pattern</p>

              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value as PatternType)}
                className="p-2 border rounded-lg w-full font-semibold"
                style={{ borderColor: "#555" }}
              >
                <option value="Arithmetic">Arithmetic Progression (AP)</option>
                <option value="Geometric">Geometric Progression (GP)</option>
                <option value="Fibonacci">Fibonacci Series</option>
                <option value="Square">Square Numbers</option>
                <option value="Triangle">Triangular Numbers</option>
              </select>

              {/* Controls based on pattern */}
              <div className="mt-5 space-y-4">
                {/* First term */}
                <div>
                  <p className="font-bold text-gray-800 mb-1">First Term (a)</p>
                  <input
                    type="number"
                    value={first}
                    onChange={(e) => setFirst(Number(e.target.value))}
                    className="p-2 border rounded-lg w-full font-semibold"
                    style={{ borderColor: "#555" }}
                  />
                </div>

                {pattern === "Fibonacci" && (
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Second Term</p>
                    <input
                      type="number"
                      value={second}
                      onChange={(e) => setSecond(Number(e.target.value))}
                      className="p-2 border rounded-lg w-full font-semibold"
                      style={{ borderColor: "#555" }}
                    />
                  </div>
                )}

                {pattern === "Arithmetic" && (
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Common Difference (d)</p>
                    <input
                      type="number"
                      value={diff}
                      onChange={(e) => setDiff(Number(e.target.value))}
                      className="p-2 border rounded-lg w-full font-semibold"
                      style={{ borderColor: "#555" }}
                    />
                  </div>
                )}

                {pattern === "Geometric" && (
                  <div>
                    <p className="font-bold text-gray-800 mb-1">Common Ratio (r)</p>
                    <input
                      type="number"
                      value={ratio}
                      onChange={(e) => setRatio(Number(e.target.value))}
                      className="p-2 border rounded-lg w-full font-semibold"
                      style={{ borderColor: "#555" }}
                    />
                  </div>
                )}

                <div>
                  <p className="font-bold text-gray-800 mb-1">
                    Number of Terms (max 20)
                  </p>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={terms}
                    onChange={(e) => setTerms(Number(e.target.value))}
                    className="p-2 border rounded-lg w-full font-semibold"
                    style={{ borderColor: "#555" }}
                  />
                </div>

                <button
                  onClick={reset}
                  className="px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition w-full"
                  style={{ backgroundColor: THEME.ORANGE, color: "white" }}
                >
                  Reset
                </button>
              </div>
            </div>
          </Panel>
        </div>

        {/* RESULT */}
        <SectionCard title="Result">
          <p className="text-gray-800">
            Number patterns were generated successfully. The sequence rule and
            next term prediction helps students understand how patterns work.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
