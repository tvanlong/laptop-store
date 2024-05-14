import http from '~/utils/http'

export const getAllVersions = () => http.get('/api/versions')

export const getAllVersionsByCategoryId = (id, params) => http.get(`/api/versions/category/${id}`, { params })

export const getAllVersionsBySubcategoryId = (id, params) => http.get(`/api/versions/subcategory/${id}`, { params })

export const getVersionById = (id) => http.get(`/api/versions/${id}`)
