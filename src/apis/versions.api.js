import http from '~/utils/http'

export const getAllVersions = () => http.get('/api/versions')

export const getVersionById = (id) => http.get(`/api/versions/${id}`)
