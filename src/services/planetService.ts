import { ApiResponse } from "../types/api";
import { PlanetInfo, PlanetInfoRaw } from "../types/planetInfo";
import { delay } from "../utils/delay";

const BASE_URL = "https://api.le-systeme-solaire.net/rest/bodies";

// Masukkan API key BARU yang kamu dapatkan.
const API_KEY = "60744b88-e210-4262-8395-5a2df6ca155c";

// Membuat header untuk mengirim API key ke server.
const buildHeaders = (): Record<string, string> => {
  return {
    Authorization: `Bearer ${API_KEY.trim()}`,
    Accept: "application/json",
  };
};

// Mengubah data mentah API menjadi object PlanetInfo.
const mapToPlanetInfo = (raw: PlanetInfoRaw): PlanetInfo => ({
  id: raw.id,
  englishName: raw.englishName,
  gravity: raw.gravity,
  meanRadius: raw.meanRadius,
  orbitDays: raw.sideralOrbit,
  avgTempKelvin: raw.avgTemp,
  moonCount: raw.moons ? raw.moons.length : 0,
});

// Mengambil informasi planet menggunakan Promise.
export function fetchPlanetInfo(
  apiId: string,
): Promise<ApiResponse<PlanetInfo>> {
  return new Promise((resolve, reject) => {
    if (!API_KEY || API_KEY === "0d88813c-8b27-4853-92a5-67782b72358f") {
      reject(new Error("API key belum diisi."));
      return;
    }

    fetch(`${BASE_URL}/${apiId}`, {
      method: "GET",
      headers: buildHeaders(),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorDetail = await response.text();

          throw new Error(`Server error (${response.status}): ${errorDetail}`);
        }

        return response.json();
      })
      .then((raw: PlanetInfoRaw) => {
        const planetInfo = mapToPlanetInfo(raw);

        resolve({
          success: true,
          message: "Planet data loaded successfully",
          data: planetInfo,
        });
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          reject(error);
        } else {
          reject(new Error("Terjadi kesalahan saat mengambil data planet."));
        }
      });
  });
}

// Mengambil informasi planet dengan async/await dan delay.
export async function getPlanetInfo(
  apiId: string,
): Promise<ApiResponse<PlanetInfo>> {
  await delay(500);

  const result = await fetchPlanetInfo(apiId);

  return result;
}
