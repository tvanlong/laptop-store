import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { getCart } from '~/apis/carts.api'
import { createOrderCheckout } from '~/apis/order.api'
import { getProfile } from '~/apis/user.api'
import config from '~/constants/config'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { checkoutSchema } from '~/schemas/checkout.schema'
import { formatCurrency } from '~/utils/format'

function Checkout({ setProgress }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: userData } = useQuery({
    queryKey: ['profile', profile?._id],
    queryFn: () => getProfile(profile?._id),
    enabled: !!profile?._id
  })

  const user = useMemo(() => userData?.data?.data || {}, [userData])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      shipping_address: ''
    },
    resolver: yupResolver(checkoutSchema)
  })

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(profile?._id),
    enabled: !!profile?._id
  })
  const cart = useMemo(() => cartData?.data?.data, [cartData])
  const totalAmount = useMemo(
    () => cart?.cart_items?.map((item) => item.version.current_price * item.quantity).reduce((a, b) => a + b, 0),
    [cart]
  )

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [user, setValue])

  const handleChange = (e) => {
    if (errors[e.target.name]) {
      clearErrors(e.target.name)
    }

    setValue(e.target.name, e.target.value)
  }

  const { mutateAsync: createOrderCheckoutMutate } = useMutation({
    mutationFn: ({ id, data }) => createOrderCheckout(id, data)
  })

  const onSubmit = handleSubmit((data) => {
    const { shipping_address } = data
    toast.promise(createOrderCheckoutMutate({ id: profile._id, data: { shipping_address } }), {
      loading: 'Đang đặt hàng..',
      success: (res) => {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        navigate(path.checkoutSuccess)
        return res.data.message || 'Đặt hàng thành công!'
      },
      error: (err) => {
        return err.response.data.message || 'Đặt hàng thất bại!'
      }
    })
  })

  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <h2 className='font-bold text-3xl text-center'>Thanh Toán</h2>
      <p className='text-lg text-center'>
        Vui lòng kiểm tra thông tin khách hàng, thông tin giỏ hàng trước khi đặt hàng
      </p>
      <div className='grid grid-cols-7 gap-8 mt-20'>
        <div className='col-span-4'>
          <h3 className='text-xl font-bold'>Thông tin khách hàng</h3>
          <form method='POST' onSubmit={onSubmit}>
            <div className='my-3'>
              <div className='text-lg mb-2'>Họ tên</div>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                placeholder='Nhập họ tên'
                {...register('name')}
              />
            </div>
            <div className='my-3'>
              <div className='text-lg mb-2'>Email</div>
              <input
                disabled
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                {...register('email')}
              />
            </div>
            <div className='my-3'>
              <div className='text-lg mb-2'>Số điện thoại</div>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                placeholder='Nhập số điện thoại'
                {...register('phone')}
              />
            </div>
            <div className='my-3'>
              <div className='text-lg mb-2'>Địa chỉ</div>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                placeholder='Nhập địa chỉ'
                onChange={(e) => handleChange(e)}
                {...register('shipping_address')}
              />
            </div>
            <div className='my-3 text-sm'>Vui lòng khai đầy đủ thông tin trước khi đặt hàng!</div>
            <div className='my-3 text-sm'>
              Thay đổi thông tin: <strong>Tài khoản</strong> -- <strong>Tài khoản của tôi</strong>
            </div>
            <div className='my-3'>
              <button
                type='submit'
                className='bg-blue-700 hover:bg-blue-600 w-full rounded-lg text-white font-bold text-lg text-center py-3 px-2 mt-8'
              >
                Đặt hàng
              </button>
            </div>
          </form>
        </div>
        <div className='col-span-3'>
          <h3 className='text-xl font-bold'>Giỏ hàng</h3>
          <div className='border-2 border-gray-200 rounded-lg p-4 mt-8'>
            <ul className='list-none'>
              {cart?.cart_items?.map((item) => (
                <li key={item._id} className='text-sm flex items-center justify-between my-3'>
                  <img
                    className='w-16 h-16 mr-4 object-cover'
                    src={`${config.baseURL}/api/upload/${item.version.product.images[0]}`}
                    alt={`${item.version.product.name} ${item.version.name}`}
                  />
                  <div>
                    <p className='font-semibold'>
                      {item.version.product.name} {item.version.name}
                    </p>
                    <p className='font-semibold'>
                      ₫{formatCurrency(item.version.current_price)} x {item.quantity}
                    </p>
                  </div>
                  <div className='font-semibold text-red-700'>
                    ₫{formatCurrency(item.version.current_price * item.quantity)}
                  </div>
                </li>
              ))}
              <li className='text-sm flex items-center justify-between my-5 py-3 border-t-2 border-gray-200'>
                <div>
                  <p className='font-semibold underline text-lg'>Tổng thành tiền</p>
                </div>
                <div className='font-semibold text-lg text-red-700'>₫{formatCurrency(totalAmount)}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
