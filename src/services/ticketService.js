import http from "./httpService";
import { apiUrl } from "../config.json";
import { getToken } from "./authService";

const apiEndpoint = apiUrl + "/customer";

export function saveTicket(customer, data) {
  const { id, email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.post(
    `${apiEndpoint}s/${id}/ticket`,
    {
      custComment: data.custComment
    },
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  );
}

export function getTicketsByCustomer(customer) {
  const { id: customerId, email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`${apiUrl}/${customerId}/tickets`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function getAllTickets(admin) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.get(`${apiUrl}/tickets`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
