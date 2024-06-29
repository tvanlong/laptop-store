import http from '~/utils/http'

const productsApi = {
  getProductById: (id) => http.get(`/api/products/${id}`)
}

export default productsApi
