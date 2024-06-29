import http from '~/utils/http'

const userApi = {
  getProfile: (id) => http.get(`/api/users/customers/${id}`),
  updateProfile: (id, data) => http.patch(`/api/users/update-profile/${id}`, data),
  changePassword: (id, data) => http.patch(`/api/users/change-password/${id}`, data)
}

export default userApi
