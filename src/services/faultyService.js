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
