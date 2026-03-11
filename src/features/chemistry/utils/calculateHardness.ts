export function calculateHardness(
    volumeEDTA: number,     // mL
    normalityEDTA: number,  // N
    sampleVolume: number    // mL
): number {
    if (volumeEDTA === 0 || sampleVolume === 0) return 0;

    const hardness =
        (volumeEDTA * normalityEDTA * 50000) / sampleVolume;

    return Number(hardness.toFixed(2));
}
