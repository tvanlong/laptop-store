import http from '~/utils/http'

export const getProductById = (id) => http.get(`/api/products/${id}`)
