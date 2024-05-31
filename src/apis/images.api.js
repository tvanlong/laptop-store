import http from '~/utils/http'

export const uploadAvatar = (id, data) =>
  http.patch(`/api/upload/avatar/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const deleteImage = (public_id) => http.delete(`/api/upload/${public_id}`)
