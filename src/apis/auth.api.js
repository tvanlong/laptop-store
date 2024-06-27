import http from '~/utils/http'

export const signIn = (data) => http.post('/api/auth/signin', data)

export const signUp = (data) => http.post('/api/auth/signup', data)

export const signOut = () => http.post('/api/auth/signout')

export const signInSuccess = (data) => http.post('/api/auth/signin-success', data)

export const verifyEmail = (token) => http.post(`/api/auth/verify/${token}`)

export const forgotPassword = (data) => http.patch('/api/auth/forgot-password', data)
