import http from "./httpService";
import { apiUrl } from "../config.json";

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
  console.log("This service passed user: ", customer);
  const { id, email, pwd: password } = customer;
  const token = Buffer.from(`${email}:${password}`, "utf8").toString("base64");

  return http.get(`${apiEndpoint}s/${id}/tickets`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
