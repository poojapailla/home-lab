type Props = {
    acidValue: number;
    condition: string;
};

export default function ResultCard({ acidValue, condition }: Props) {
    return (
        <div className="mt-4 p-4 border rounded bg-green-50">
            <p className="text-lg font-semibold">
                Acid Value: <span className="text-blue-600">{acidValue}</span>
            </p>
            <p className="mt-2">
                Oil Condition: <strong>{condition}</strong>
            </p>
        </div>
    );
}
