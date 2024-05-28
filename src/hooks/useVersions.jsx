import { useQuery } from '@tanstack/react-query'
import { getAllVersions } from '~/apis/versions.api'

export const useVersions = (queryParamsConfig, options = {}) => {
  return useQuery({
    ...options,
    queryKey: queryParamsConfig ? ['versions', queryParamsConfig] : ['versions'],
    queryFn: queryParamsConfig ? () => getAllVersions(queryParamsConfig) : getAllVersions
  })
}
