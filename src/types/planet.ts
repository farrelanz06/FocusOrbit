export type PlanetType = "moon" | "mars" | "jupiter";

export interface Planet {
  id: number;
  name: string;
  icon: string;
  duration: number;
  description: string;
}
