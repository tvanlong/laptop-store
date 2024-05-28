import { useContext } from 'react'
import { getCart } from '~/apis/carts.api'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from '~/context/app.context'

export const useCart = (options = {}) => {
  const { profile } = useContext(AppContext)
  return useQuery({
    ...options,
    queryKey: ['cart', profile?._id],
    queryFn: () => getCart(profile?._id),
    enabled: !!profile?._id
  })
}
