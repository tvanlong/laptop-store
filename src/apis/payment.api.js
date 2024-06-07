import http from '~/utils/http'

export const getAllPaymentMethods = () => http.get('/api/payment')
