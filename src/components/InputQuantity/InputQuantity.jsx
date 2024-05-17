import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { decreaseQuantity, increaseQuantity } from '~/apis/carts.api'
import { AppContext } from '~/context/app.context'

function InputQuantity({ item }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(item.quantity)
  const { mutateAsync: increaseQuantityAsync } = useMutation({
    mutationFn: (data) => increaseQuantity(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const { mutateAsync: decreaseQuantityAsync } = useMutation({
    mutationFn: (data) => decreaseQuantity(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const handleIncreaseQuantity = async (id) => {
    const data = await increaseQuantityAsync({ versionId: id })
    const cartItem = data.data.data.cart_items.find((item) => item.version === id)
    setBuyCount(cartItem.quantity)
  }

  const handleDecreaseQuantity = async (id) => {
    const data = await decreaseQuantityAsync({ versionId: id })
    const cartItem = data.data.data.cart_items.find((item) => item.version === id)
    if (!cartItem || cartItem.quantity === 0) return
    setBuyCount(cartItem.quantity)
  }

  const handleChangeQuantity = (e) => {
    let quantity = e.target.value
    if (/^\d+$/.test(quantity) || quantity === '') {
      if (quantity < 1) {
        quantity = 1
      }
      if (quantity > 10) {
        quantity = 10
      }
      setBuyCount(quantity)
    }
  }

  return (
    <div className='flex items-centerflex items-center'>
      <button
        className='flex h-6 w-6 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={() => handleDecreaseQuantity(item.version._id)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-3 w-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15'></path>
        </svg>
      </button>
      <div>
        <input
          className='text-xs h-6 w-12 border-t border-b border-gray-300 p-1 text-center outline-none'
          value={buyCount}
          onChange={(e) => handleChangeQuantity(e)}
          onKeyDown={(e) => {
            if (!/[0-9]|Backspace|Enter|Delete|ArrowLeft|ArrowRight/.test(e.key)) {
              e.preventDefault()
            }
          }}
        />
      </div>
      <button
        className='flex h-6 w-6 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={() => handleIncreaseQuantity(item.version._id)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='h-3 w-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15'></path>
        </svg>
      </button>
    </div>
  )
}

export default InputQuantity
