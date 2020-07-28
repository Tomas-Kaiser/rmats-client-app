import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/customer/auth";

export function auth(username, password) {
  const token = getToken(username, password);

  return http.get(apiEndpoint, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function getToken(username, password) {
  return Buffer.from(`${username}:${password}`, "utf8").toString("base64");
}
