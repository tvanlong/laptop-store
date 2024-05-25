import http from '~/utils/http'

export const getProfile = (id) => http.get(`/api/users/customers/${id}`)

export const updateProfile = (id, data) => http.patch(`/api/users/customers/${id}`, data)

export const changePassword = (id, data) => http.patch(`/api/users/customers/${id}/change-password`, data)
