import http from '~/utils/http'

export const getAllCategories = () => http.get('/api/categories')

export const getCategoryById = (id) => http.get(`/api/categories/${id}`)
