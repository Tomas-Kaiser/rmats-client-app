import http from "./httpService";
import { getToken } from "./authService";

const apiEndpoint = "/customer";

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

export function getAllCustomers(admin) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.get(`/admin/customers`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function getCustomerById(admin, customerId) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.get(`/customer/${customerId}`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
