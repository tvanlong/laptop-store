import http from '~/utils/http'

export const getAllSubcategories = () => http.get('/api/subcategories')

export const getSubcategoryById = (id) => http.get(`/api/subcategories/${id}`)
