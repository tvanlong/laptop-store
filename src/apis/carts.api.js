import http from '~/utils/http'

const cartApi = {
  addToCart: (userId, data) => http.post(`/api/carts/${userId}`, data),
  getCart: (userId) => http.get(`/api/carts/${userId}`),
  increaseQuantity: (userId, data) => http.patch(`/api/carts/${userId}/increase`, data),
  decreaseQuantity: (userId, data) => http.patch(`/api/carts/${userId}/decrease`, data),
  updateQuantity: (userId, data) => http.patch(`/api/carts/${userId}`, data),
  removeItem: (userId, data) => http.delete(`/api/carts/${userId}`, { data }),
  removeCart: (userId) => http.delete(`/api/carts/${userId}/all`)
}

export default cartApi
