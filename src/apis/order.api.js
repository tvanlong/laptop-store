import http from '~/utils/http'

const orderApi = {
  createOrderCheckout: (id, data) => http.post(`/api/orders/${id}`, data),
  getOrders: (id) => http.get(`/api/orders/${id}`),
  updateStatusOrder: (userId, orderId, data) => http.patch(`/api/orders/${userId}/${orderId}`, data),
  createOrderCheckoutWithMomo: (id, data) => http.post(`/api/orders/pay-with-momo/${id}`, data),
  createOrderCheckoutWithZaloPay: (id, data) => http.post(`/api/orders/pay-with-zalopay/${id}`, data)
}

export default orderApi
