import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { getProfile } from '~/apis/user.api'
import { AppContext } from '~/context/app.context'

export const useProfile = (options = {}) => {
  const { profile } = useContext(AppContext)
  return useQuery({
    ...options,
    queryKey: ['profile', profile?._id],
    queryFn: () => getProfile(profile?._id),
    enabled: !!profile?._id
  })
}
