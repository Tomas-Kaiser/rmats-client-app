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
