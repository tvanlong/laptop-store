import { useContext } from 'react'
import { AppContext } from '~/context/app.context'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '~/apis/user.api'

export const useProfile = () => {
  const { profile } = useContext(AppContext)
  return useQuery({
    queryKey: ['profile', profile?._id],
    queryFn: () => getProfile(profile?._id),
    enabled: !!profile?._id
  })
}
