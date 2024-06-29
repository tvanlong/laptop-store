import http from '~/utils/http'

const authApi = {
  signIn: (data) => http.post('/api/auth/signin', data),
  signUp: (data) => http.post('/api/auth/signup', data),
  signOut: () => http.post('/api/auth/signout'),
  signInSuccess: (data) => http.post('/api/auth/signin-success', data),
  verifyEmail: (token) => http.post(`/api/auth/verify/${token}`),
  forgotPassword: (data) => http.patch('/api/auth/forgot-password', data)
}

export default authApi
