import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getAllVersions } from '~/apis/versions.api'

export const useVersions = (queryParamsConfig) => {
  return useQuery({
    queryKey: queryParamsConfig ? ['versions', queryParamsConfig] : ['versions'],
    queryFn: queryParamsConfig ? () => getAllVersions(queryParamsConfig) : getAllVersions,
    ...(queryParamsConfig && { placeholderData: keepPreviousData })
  })
}
