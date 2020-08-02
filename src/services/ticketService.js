import http from "./httpService";
import { getToken } from "./authService";

const apiEndpoint = "/customer";

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

  return http.get(`/${customerId}/tickets`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function getAllTickets(admin) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.get(`/tickets`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
