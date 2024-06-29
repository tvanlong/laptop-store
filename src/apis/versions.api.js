import http from '~/utils/http'

const versionsApi = {
  getAllVersions: (params) => http.get('/api/versions', { params }),
  getAllFeaturedVersions: () => http.get('/api/versions/featured'),
  getAllVersionsByCategoryId: (id, params) => http.get(`/api/versions/category/${id}`, { params }),
  getAllVersionsBySubcategoryId: (id, params) => http.get(`/api/versions/subcategory/${id}`, { params }),
  getVersionById: (id) => http.get(`/api/versions/${id}`)
}

export default versionsApi
