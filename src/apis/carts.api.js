import http from '~/utils/http'

export const addToCart = (userId, data) => http.post(`/api/carts/${userId}`, data)

export const getCart = (userId) => http.get(`/api/carts/${userId}`)
