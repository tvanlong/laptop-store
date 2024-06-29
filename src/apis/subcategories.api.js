import http from '~/utils/http'

const subcategoriesApi = {
  getAllSubcategories: () => http.get('/api/subcategories'),
  getSubcategoryById: (id) => http.get(`/api/subcategories/${id}`)
}

export default subcategoriesApi
