import http from '~/utils/http'

export const getProfile = (id) => http.get(`/api/users/customers/${id}`)

export const updateProfile = (id, data) => http.patch(`/api/users/update-profile/${id}`, data)

export const changePassword = (id, data) => http.patch(`/api/users/change-password/${id}`, data)

export const changeEmail = (id, data) => http.post(`/api/users/change-email/${id}`, data)

export const verifyEmail = (id, data) => http.patch(`/api/users/verify-email/${id}`, data)
