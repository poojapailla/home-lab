type Props = {
    oil: string;
    setOil: (oil: string) => void;
};

const oils = ["Coconut Oil", "Groundnut Oil", "Mustard Oil"];

export default function OilSelector({ oil, setOil }: Props) {
    return (
        <div>
            <label className="block mb-2 font-semibold">Select Oil Sample</label>
            <select
                value={oil}
                onChange={(e) => setOil(e.target.value)}
                className="w-full p-2 border rounded"
            >
                {oils.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </div>
    );
}
