import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customer/auth";

export function auth(username, password) {
  const token = Buffer.from(`${username}:${password}`, "utf8").toString(
    "base64"
  );

  return http.get(apiEndpoint, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
