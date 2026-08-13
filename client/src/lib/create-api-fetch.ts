import { API_URL } from "@/config/api";
import type { ApiFetch } from "@/lib/api-types";

export function createApiFetch(
  getAccessToken: () => Promise<string | null>,
): ApiFetch {
  return async (path: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);

    if (init.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const token = await getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return fetch(`${API_URL}${path}`, {
      ...init,
      headers,
    });
  };
}
