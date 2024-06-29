import { useQuery } from '@tanstack/react-query'
import versionsApi from '~/apis/versions.api'

export const useVersions = (queryParamsConfig, options = {}) => {
  return useQuery({
    ...options,
    queryKey: queryParamsConfig ? ['versions', queryParamsConfig] : ['versions'],
    queryFn: queryParamsConfig ? () => versionsApi.getAllVersions(queryParamsConfig) : versionsApi.getAllVersions
  })
}
