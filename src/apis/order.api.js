import http from '~/utils/http'

export const createOrderCheckout = (id, data) => http.post(`/api/orders/${id}`, data)
