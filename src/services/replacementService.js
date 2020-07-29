import http from "./httpService";
import { apiUrl } from "../config.json";
import { getToken } from "./authService";

export function getReplacementUnit(customer, ticketId) {
  const { email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`${apiUrl}/${ticketId}/replacements`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
