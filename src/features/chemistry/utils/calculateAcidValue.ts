export function calculateAcidValue(
    volume: number,
    normality: number,
    weight: number
): number {
    return Number(((volume * normality * 56.1) / weight).toFixed(2));
}

export function getOilCondition(value: number) {
    if (value < 1) return "Good Quality Oil";
    if (value < 3) return "Moderate Quality Oil";
    return "Rancid Oil";
}
