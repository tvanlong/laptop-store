import http from '~/utils/http'

export const signIn = (data) => http.post('/api/auth/signin', data)

export const signUp = (data) => http.post('/api/auth/signup', data)

export const signOut = () => http.post('/api/auth/signout')
