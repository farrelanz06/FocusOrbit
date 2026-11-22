import { ApiResponse } from "../types/api";
import { UserInfo } from "../types/userInfo";
import { delay } from "../utils/delay";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

// Membuat header untuk mengirim API key ke server.
const buildHeaders = (): Record<string, string> => {
  return {
    Accept: "application/json",
  };
};

// Mengubah data mentah API menjadi object PlanetInfo.
const mapToUserInfo = (raw: UserInfo): UserInfo => ({
  id: raw.id,
  name: raw.name,
  username: raw.username,
  email: raw.email,
});

// Mengambil informasi planet menggunakan Promise.
export function fetchUserInfo(apiId: string): Promise<ApiResponse<UserInfo>> {
  return new Promise((resolve, reject) => {
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
      .then((raw: UserInfo) => {
        const planetInfo = mapToUserInfo(raw);

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
): Promise<ApiResponse<UserInfo>> {
  await delay(500);

  const result = await fetchUserInfo(apiId);

  return result;
}
