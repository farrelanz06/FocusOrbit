import { ApiResponse } from "../types/api";
import { PlanetInfo, PlanetInfoRaw } from "../types/planetInfo";
import { delay } from "../utils/delay";

const BASE_URL = "https://api.le-systeme-solaire.net/rest/bodies";

const API_KEY = "MASUKKAN_TOKEN_API_ANDA_DI_SINI"; // <-- Ganti dengan token API MASING2

const buildHeaders = (): Record<string, string> => ({
  Authorization: `Bearer ${API_KEY.trim()}`,
  Accept: "application/json",
});

const mapToPlanetInfo = (raw: PlanetInfoRaw): PlanetInfo => ({
  id: raw.id,
  englishName: raw.englishName,
  gravity: raw.gravity,
  meanRadius: raw.meanRadius,
  orbitDays: raw.sideralOrbit,
  avgTempKelvin: raw.avgTemp,
  moonCount: raw.moons ? raw.moons.length : 0,
});

export function fetchPlanetInfo(
  apiId: string,
): Promise<ApiResponse<PlanetInfo>> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/${apiId}`, {
      method: "GET",
      headers: buildHeaders(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error (status ${response.status})`);
        }

        return response.json();
      })
      .then((raw: PlanetInfoRaw) => {
        resolve({
          success: true,
          message: "Planet data loaded successfully",
          data: mapToPlanetInfo(raw),
        });
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

export async function getPlanetInfo(
  apiId: string,
): Promise<ApiResponse<PlanetInfo>> {
  await delay(500);

  const result = await fetchPlanetInfo(apiId);

  return result;
}
