import http from "./httpService";
import { getToken } from "./authService";

export function saveReplacementUnit(admin, data, ticketId) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.post(
    `/admin/replacement`,
    {
      ticketId: ticketId,
      carrier: data.carrier,
      trackingNumber: data.trackingNumber,
      model: data.model,
      newSerialNumber: data.newSerialNumber,
      comment: data.comment,
      status: data.status
    },
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  );
}

export function updateReplacementUnit(admin, data, ticketId, replacementId) {
  const { email, pwd: password } = admin;
  const token = getToken(email, password);

  return http.put(
    `/admin/${replacementId}/replacement`,
    {
      ticketId: ticketId,
      carrier: data.carrier,
      trackingNumber: data.trackingNumber,
      model: data.model,
      newSerialNumber: data.newSerialNumber,
      comment: data.comment,
      status: data.status
    },
    {
      headers: {
        Authorization: `Basic ${token}`
      }
    }
  );
}

export function getReplacementUnitByTicketId(customer, ticketId) {
  const { email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`/${ticketId}/replacements`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}

export function getReplacementUnitById(customer, replacementId) {
  const { email, pwd: password } = customer;
  const token = getToken(email, password);

  return http.get(`/replacements/${replacementId}`, {
    headers: {
      Authorization: `Basic ${token}`
    }
  });
}
