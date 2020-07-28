import http from "./httpService";
import { apiUrl } from "../config.json";
import { getToken } from "./authService";

const apiEndpoint = apiUrl + "/customer";

export function getReplacementUnit(customer, ticketId) {
  const { email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`${apiEndpoint}s/${ticketId}/replacements`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
