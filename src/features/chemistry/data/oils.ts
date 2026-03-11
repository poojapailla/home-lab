export type OilQuality = "Good" | "Used" | "Bad" | "Rancid";

export type OilType = {
    name: string;
    color: string;
    baseEndpoint: number;
};

export const oils: OilType[] = [
    { name: "Coconut Oil", color: "#fef3c7", baseEndpoint: 2.0 },
    { name: "Groundnut Oil", color: "#fde68a", baseEndpoint: 2.4 },
    { name: "Mustard Oil", color: "#facc15", baseEndpoint: 2.8 },
    { name: "Olive Oil", color: "#bbf7d0", baseEndpoint: 1.8 },
    { name: "Palm Oil", color: "#fdba74", baseEndpoint: 3.2 },
];

// Acid value ranges (scientific approximation)
export const qualityMultiplier: Record<OilQuality, number> = {
    Good: 0.8,
    Used: 1.0,
    Bad: 1.3,
    Rancid: 1.6,
};
