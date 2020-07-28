import http from "./httpService";
import { apiUrl } from "../config.json";
import { getToken } from "./authService";

const apiEndpoint = apiUrl + "/customer";

export function saveFaultyUnit(customer, data, ticket) {
  const { id, email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.post(
    `${apiEndpoint}s/${id}/tickets/${ticket.id}/faulty`,
    {
      model: data.model,
      serialNumber: data.serialNumber,
      ticketId: ticket.id
    },
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  );
}

export function getFaultyUnit(customer, ticketId) {
  const { id, email, pwd: password } = customer;
  console.log("id?", id);
  const token = getToken(email, password);

  return http.get(`${apiEndpoint}s/${id}/tickets/${ticketId}/faulty`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}