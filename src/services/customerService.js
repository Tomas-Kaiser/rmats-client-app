import http from "./httpService";
import { apiUrl } from "../config.json";
import { getToken } from "./authService";

const apiEndpoint = apiUrl + "/customer";

export function register(customer) {
  return http.post(apiEndpoint, {
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    company: customer.company,
    email: customer.email,
    password: customer.password
  });
}

export function getTickets(customer) {
  const { id, email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`${apiEndpoint}s/${id}/tickets`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
