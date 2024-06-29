import http from '~/utils/http'

const categoriesApi = {
  getAllCategories: () => http.get('/api/categories'),
  getCategoryById: (id) => http.get(`/api/categories/${id}`)
}

export default categoriesApi
