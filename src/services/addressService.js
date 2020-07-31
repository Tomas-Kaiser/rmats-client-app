import http from "./httpService";
import { apiUrl } from "../config.json";
import { getToken } from "./authService";

const apiEndpoint = apiUrl + "/customer";

export function saveAddress(customer, data) {
  const { id: customerId, email, pwd: password } = customer;
  const token = getToken(email, password);

  http.post(
    `${apiEndpoint}/${customerId}/address`,
    {
      street: data.street,
      zipCode: data.zipCode,
      city: data.city,
      country: data.country
    },
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  );
}

export function getAllAddresses(customer) {
  const { id: customerId, email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`${apiEndpoint}/${customerId}/address`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function getAllAddressesByCustomerId(admin, customerId) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.get(`${apiEndpoint}/${customerId}/address`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function deleteAddressById(customer, addressId) {
  const { id: customerId, email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.delete(`${apiEndpoint}/${customerId}/address/${addressId}`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
