import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import cartApi from '~/apis/carts.api'
import { AppContext } from '~/context/app.context'

function InputQuantity({ item }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [buyCount, setBuyCount] = useState(item.quantity)

  const { mutateAsync: increaseQuantityAsync } = useMutation({
    mutationFn: (data) => cartApi.increaseQuantity(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const { mutateAsync: decreaseQuantityAsync } = useMutation({
    mutationFn: (data) => cartApi.decreaseQuantity(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const { mutateAsync: updateQuantityAsync } = useMutation({
    mutationFn: (data) => cartApi.updateQuantity(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })

  const handleIncreaseQuantity = async (id) => {
    toast.promise(increaseQuantityAsync({ versionId: id }), {
      loading: 'Đang tăng số lượng...',
      success: (data) => {
        const cartItem = data.data.data.cart_items.find((item) => item.version === id)
        setBuyCount(cartItem.quantity)
        return 'Tăng số lượng thành công'
      },
      error: (error) => {
        return error.response.data.message || 'Có lỗi xảy ra'
      },
      duration: 2000
    })
  }

  const handleDecreaseQuantity = async (id) => {
    toast.promise(decreaseQuantityAsync({ versionId: id }), {
      loading: 'Đang giảm số lượng...',
      success: (data) => {
        const cartItem = data.data.data.cart_items.find((item) => item.version === id)
        if (!cartItem || cartItem.quantity === 0) {
          return 'Số lượng đã giảm tối thiểu'
        }
        setBuyCount(cartItem.quantity)
        return 'Giảm số lượng thành công'
      },
      error: (error) => {
        return error.response.data.message || 'Có lỗi xảy ra'
      },
      duration: 2000
    })
  }

  const handleUpdateQuantity = async (id) => {
    if (buyCount === item.quantity) return
    const data = await updateQuantityAsync({ versionId: id, quantity: buyCount })
    const cartItem = data.data.data.cart_items.find((item) => item.version === item.version._id)
    setBuyCount(cartItem.quantity)
  }

  const handleChangeQuantity = (e) => {
    let quantity = e.target.value
    if (/^\d+$/.test(quantity) || quantity === '') {
      if (quantity < 1) {
        quantity = 1
      } else if (quantity > 99) {
        quantity = 99
      }
      setBuyCount(quantity)
    }
  }

  return (
    <>
      <div className='hidden md:flex items-center'>
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
            className='h-6 w-12 border-b border-t border-gray-300 p-1 text-center text-xs outline-none'
            value={buyCount}
            onChange={(e) => handleChangeQuantity(e)}
            onBlur={() => handleUpdateQuantity(item.version._id)}
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
      <div className='flex items-center md:hidden'>
        <button
          type='button'
          onClick={() => handleDecreaseQuantity(item.version._id)}
          className='flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none'
        >
          <svg
            className='w-2.5 h-2.5 text-gray-900'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 18 2'
          >
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h16' />
          </svg>
        </button>
        <input
          type='text'
          value={buyCount}
          onChange={(e) => handleChangeQuantity(e)}
          className='flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center'
        />
        <button
          type='button'
          onClick={() => handleIncreaseQuantity(item.version._id)}
          className='flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none'
        >
          <svg
            className='w-2.5 h-2.5 text-gray-900'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 18 18'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 1v16M1 9h16'
            />
          </svg>
        </button>
      </div>
    </>
  )
}

InputQuantity.propTypes = {
  item: PropTypes.object
}

export default InputQuantity
