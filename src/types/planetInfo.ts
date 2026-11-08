export interface PlanetInfoRaw {
  id: string;
  englishName: string;
  gravity: number; 
  meanRadius: number; 
  sideralOrbit: number; 
  avgTemp: number; 
  moons: unknown[] | null;
}

export interface PlanetInfo {
  id: string;
  englishName: string;
  gravity: number;
  meanRadius: number;
  orbitDays: number;
  avgTempKelvin: number;
  moonCount: number;
}
