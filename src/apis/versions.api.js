import http from '~/utils/http'

export const getAllVersions = () => http.get('/api/versions')

export const getAllVersionsByCategoryId = (id, params) => http.get(`/api/versions/${id}`, { params })

export const getAllVersionsBySubcategoryId = (categoryId, subcategoryId, params) =>
  http.get(`/api/versions/${categoryId}/${subcategoryId}`, { params })

export const getVersionById = (id) => http.get(`/api/versions/${id}`)
