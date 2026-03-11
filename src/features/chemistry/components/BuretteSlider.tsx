type Props = {
    volume: number;
    setVolume: (v: number) => void;
};

export default function BuretteSlider({ volume, setVolume }: Props) {
    return (
        <div>
            <label className="block mb-2 font-semibold">
                Volume of KOH Used (mL): {volume}
            </label>
            <input
                type="range"
                min={0}
                max={10}
                step={0.1}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}
