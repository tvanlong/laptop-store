import http from '~/utils/http'

export const addToCart = (userId, data) => http.post(`/api/carts/${userId}`, data)

export const getCart = (userId) => http.get(`/api/carts/${userId}`)

export const increaseQuantity = (userId, data) => http.patch(`/api/carts/${userId}/increase`, data)

export const decreaseQuantity = (userId, data) => http.patch(`/api/carts/${userId}/decrease`, data)

export const updateQuantity = (userId, data) => http.patch(`/api/carts/${userId}`, data)

export const removeItem = (userId, data) => http.delete(`/api/carts/${userId}`, { data })

export const removeCart = (userId) => http.delete(`/api/carts/${userId}/all`)
