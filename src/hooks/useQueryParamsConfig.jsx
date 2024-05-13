import { isUndefined, omitBy } from 'lodash'
import { useSearchParams } from 'react-router-dom'

function useQueryParamsConfig() {
  const [searchParams] = useSearchParams()
  const queryParams = Object.fromEntries([...searchParams])
  const queryParamsConfig = {
    page: queryParams.page ? Number(queryParams.page) : 1,
    limit: queryParams.limit ? Number(queryParams.limit) : 10,
    sort: queryParams.sort,
    order: queryParams.order,
    search: queryParams.search
  }
  const filteredQueryParamsConfig = omitBy(queryParamsConfig, (value) => isUndefined(value) || value === '')
  return filteredQueryParamsConfig
}

export default useQueryParamsConfig
