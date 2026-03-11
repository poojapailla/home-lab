export default function LabTable({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center">
            <div
                className="relative bg-[#f8fafc] border-4 border-gray-300 rounded-2xl shadow-xl"
                style={{ width: "900px", height: "420px" }}
            >
                {children}

                {/* Table */}
                <div
                    className="absolute bottom-0 w-full"
                    style={{
                        height: "45px",
                        background: "linear-gradient(to top, #cbd5e1, transparent)",
                        borderBottomLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                    }}
                />
            </div>
        </div>
    );
}
