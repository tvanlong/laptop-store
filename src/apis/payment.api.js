import http from '~/utils/http'

const paymentApi = {
  getAllPaymentMethods: () => http.get('/api/payment')
}

export default paymentApi
