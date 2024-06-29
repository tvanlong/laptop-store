import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import cartApi from '~/apis/carts.api'
import { AppContext } from '~/context/app.context'

export const useCart = (options = {}) => {
  const { isAuthenticated, profile } = useContext(AppContext)
  return useQuery({
    ...options,
    queryKey: ['cart', profile?._id],
    queryFn: () => cartApi.getCart(profile?._id),
    enabled: isAuthenticated && !!profile?._id
  })
}
