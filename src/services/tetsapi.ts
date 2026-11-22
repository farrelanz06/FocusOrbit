//(https://jsonplaceholder.typicode.com/users)

import { ApiResponse } from "../types/api";
import { DataInfo, DataInfoRaw } from "../types/planetInfo";
import { delay } from "../utils/delay";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

const mapToPlanetInfo = (raw: DataInfoRaw): DataInfo => ({
  id: raw.id,
  name: raw.name,
  username: raw.username,
  email: raw.email,
});

export function fetchPlanetInfo(apiId: string): Promise<ApiResponse<DataInfo>> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/${apiId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error (status ${response.status})`);
        }

        return response.json();
      })
      .then((raw: DataInfoRaw) => {
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
): Promise<ApiResponse<DataInfo>> {
  await delay(500);

  const result = await fetchPlanetInfo(apiId);

  return result;
}
