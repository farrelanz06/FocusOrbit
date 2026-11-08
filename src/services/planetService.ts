// MEMBER 2 — Service: fetch endpoint luar -> object ber-interface
import { ApiResponse } from "../types/api";
import { PlanetInfo, PlanetInfoRaw } from "../types/planetInfo";
import { delay } from "../utils/delay";

const BASE_URL = "https://api.le-systeme-solaire.net/rest/bodies";

// Kalau di browser endpoint minta token, isi di sini (gratis, lihat catatan).
// Kosongkan kalau tidak perlu.
const API_KEY = "";

const buildHeaders = (): Record<string, string> =>
  API_KEY === "" ? {} : { Authorization: `Bearer ${API_KEY}` };

// Ubah data mentah API -> object sesuai interface PlanetInfo
const mapToPlanetInfo = (raw: PlanetInfoRaw): PlanetInfo => ({
  id: raw.id,
  englishName: raw.englishName,
  gravity: raw.gravity,
  meanRadius: raw.meanRadius,
  orbitDays: raw.sideralOrbit,
  avgTempKelvin: raw.avgTemp,
  moonCount: raw.moons ? raw.moons.length : 0,
});

// Promise manual: pakai resolve(), reject(), dan .then()
export function fetchPlanetInfo(
  apiId: string,
): Promise<ApiResponse<PlanetInfo>> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/${apiId}`, { headers: buildHeaders() }) // async bawaan
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error (status ${response.status})`);
        }
        return response.json(); // async bawaan
      })
      .then((raw: PlanetInfoRaw) => {
        resolve({
          success: true,
          message: "Planet data loaded",
          data: mapToPlanetInfo(raw),
        });
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}

// Async function buatan sendiri: pakai await + delay() (custom)
export async function getPlanetInfo(
  apiId: string,
): Promise<ApiResponse<PlanetInfo>> {
  await delay(500); // jeda singkat supaya loading terlihat
  const result = await fetchPlanetInfo(apiId);
  return result;
}
