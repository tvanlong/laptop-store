import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createOrderCheckout, createOrderCheckoutWithMomo, createOrderCheckoutWithZaloPay } from '~/apis/order.api'
import { getAllPaymentMethods } from '~/apis/payment.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { useCart } from '~/hooks/useCart'
import useFetchData from '~/hooks/useFetchData'
import { useProfile } from '~/hooks/useProfile'
import { checkoutSchema } from '~/schemas/checkout.schema'
import { formatCurrency } from '~/utils/format'

function Checkout({ setProgress }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: userData } = useProfile()
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
      province: '',
      district: '',
      ward: '',
      shipping_address: '',
      payment_method: ''
    },
    resolver: yupResolver(checkoutSchema)
  })

  const { data: cartData } = useCart()
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

  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedWard, setSelectedWard] = useState('')
  const { data: provinces, loading: provincesLoading, error: provincesError } = useFetchData(1, 0)
  const { data: districts, loading: districtsLoading, error: districtsError } = useFetchData(2, selectedProvince)
  const { data: wards, loading: wardsLoading, error: wardsError } = useFetchData(3, selectedDistrict)

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value)
    setSelectedDistrict('')
    setSelectedWard('')
  }

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value)
    setSelectedWard('')
  }

  const { data: paymentMethodsData } = useQuery({
    queryKey: ['payment'],
    queryFn: getAllPaymentMethods
  })

  const paymentMethods = useMemo(() => paymentMethodsData?.data?.data || [], [paymentMethodsData])

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

  const { mutateAsync: createOrderCheckoutWithMomoMutate } = useMutation({
    mutationFn: ({ id, data }) => createOrderCheckoutWithMomo(id, data)
  })

  const { mutateAsync: createOrderCheckoutWithZaloPayMutate } = useMutation({
    mutationFn: ({ id, data }) => createOrderCheckoutWithZaloPay(id, data)
  })

  const onSubmit = handleSubmit(async (data) => {
    const { shipping_address, payment_method } = data
    const provinceName = provinces.data.find((province) => province.id === selectedProvince)?.full_name
    const districtName = districts.data.find((district) => district.id === selectedDistrict)?.full_name
    const wardName = wards.data.find((ward) => ward.id === selectedWard)?.full_name
    const methodName = paymentMethods.find((method) => method._id === payment_method)?.name

    if (methodName === 'Thanh toán khi nhận hàng') {
      toast.promise(
        createOrderCheckoutMutate({
          id: profile._id,
          data: { shipping_address, payment_method, province: provinceName, district: districtName, ward: wardName }
        }),
        {
          loading: 'Đang đặt hàng..',
          success: (res) => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
            navigate(path.checkoutSuccess)
            return res.data.message || 'Đặt hàng thành công!'
          },
          error: (err) => {
            return err.response.data.message || 'Đặt hàng thất bại!'
          }
        }
      )
    } else if (methodName === 'Thanh toán trực tiếp qua Momo') {
      const toastId = toast.loading('Đang chuyển hướng đến cổng thanh toán Momo..')
      const res = await createOrderCheckoutWithMomoMutate({
        id: profile._id,
        data: { shipping_address, payment_method, province: provinceName, district: districtName, ward: wardName }
      })
      toast.dismiss(toastId)
      window.location.href = res.data.shortLink || res.data.payUrl
    } else if (methodName === 'Thanh toán trực tiếp qua ZaloPay') {
      const toastId = toast.loading('Đang chuyển hướng đến cổng thanh toán ZaloPay..')
      const res = await createOrderCheckoutWithZaloPayMutate({
        id: profile._id,
        data: { shipping_address, payment_method, province: provinceName, district: districtName, ward: wardName }
      })
      toast.dismiss(toastId)
      window.location.href = res.data.order_url
    } else {
      toast.error('Phương thức thanh toán không hợp lệ!')
    }
  })

  return (
    <div className='mx-auto mb-20 mt-5 max-w-[1400px] p-6'>
      <Helmet>
        <title>Thanh toán</title>
        <meta name='description' content='Thanh toán' />
      </Helmet>
      <h2 className='text-center text-3xl font-bold'>Thanh Toán</h2>
      <p className='text-center text-lg'>
        Vui lòng kiểm tra thông tin khách hàng, thông tin giỏ hàng trước khi đặt hàng
      </p>
      <div className='mt-20 md:grid md:grid-cols-7 gap-8'>
        <div className='md:col-span-4'>
          <h3 className='text-xl font-bold'>Thông tin khách hàng</h3>
          <form method='POST' onSubmit={onSubmit}>
            <div className='my-3'>
              <div className='mb-2 text-lg'>Họ tên</div>
              <input
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3'
                placeholder='Nhập họ tên'
                {...register('name')}
              />
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>Email</div>
              <input
                disabled
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3'
                {...register('email')}
              />
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>Số điện thoại</div>
              <input
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3'
                placeholder='Nhập số điện thoại'
                {...register('phone')}
              />
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>
                Tỉnh thành <span className='text-red-500'>*</span>
              </div>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3'
                {...register('province')}
                value={selectedProvince}
                onChange={(e) => handleProvinceChange(e)}
              >
                <option value='' disabled>
                  Chọn tỉnh thành
                </option>
                {provincesLoading && <option>Loading provinces...</option>}
                {provincesError && <option>Error loading provinces</option>}
                {provinces &&
                  provinces.data.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.full_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>
                Quận huyện <span className='text-red-500'>*</span>
              </div>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3'
                {...register('district')}
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e)}
                disabled={!selectedProvince}
              >
                <option value='' disabled>
                  Chọn quận huyện
                </option>
                {districtsLoading && <option>Loading districts...</option>}
                {districtsError && <option>Error loading districts</option>}
                {districts &&
                  districts.data.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.full_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>
                Phường xã <span className='text-red-500'>*</span>
              </div>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3'
                {...register('ward')}
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                disabled={!selectedDistrict}
              >
                <option value='' disabled>
                  Chọn phường xã
                </option>
                {wardsLoading && <option>Loading wards...</option>}
                {wardsError && <option>Error loading wards</option>}
                {wards &&
                  wards.data.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.full_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>
                Địa chỉ <span className='text-red-500'>*</span>
              </div>
              <input
                type='text'
                className='w-full rounded-lg border border-gray-300 p-3'
                placeholder='Nhập địa chỉ'
                onChange={(e) => handleChange(e)}
                {...register('shipping_address')}
              />
            </div>
            <div className='my-3'>
              <div className='mb-2 text-lg'>
                Phương thức thanh toán <span className='text-red-500'>*</span>
              </div>
              <select
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3'
                {...register('payment_method')}
              >
                <option value='' disabled>
                  Chọn phương thức thanh toán
                </option>
                {paymentMethods.map((method) => (
                  <option key={method._id} value={method._id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='my-3 text-sm'>Vui lòng khai đầy đủ thông tin trước khi đặt hàng!</div>
            <div className='my-3 text-sm'>
              Thay đổi thông tin: <strong>Tài khoản</strong> -- <strong>Tài khoản của tôi</strong>
            </div>
            <div className='my-3'>
              <button
                type='submit'
                className='mt-8 w-full rounded-lg bg-blue-700 px-2 py-3 text-center text-lg font-bold text-white hover:bg-blue-600'
              >
                Đặt hàng
              </button>
            </div>
          </form>
        </div>
        <div className='md:col-span-3 mt-10 pt-10 md:mt-0 md:pt-0 md:border-none border-t border-gray-200'>
          <h3 className='text-xl font-bold'>Giỏ hàng</h3>
          <div className='mt-8 rounded-lg border-2 border-gray-200 p-4'>
            <ul className='list-none'>
              {cart?.cart_items?.map((item) => (
                <li key={item._id} className='my-3 flex items-center justify-between gap-3 text-sm'>
                  <img
                    className='mr-4 h-12 w-12 xl:h-16 xl:w-16 object-cover'
                    src={item.version.product.images[0]}
                    alt={`${item.version.product.name} ${item.version.name}`}
                  />
                  <div>
                    <p className='font-semibold text-xs xl:text-base line-clamp-2'>
                      {item.version.product.name} ({item.version.name})
                    </p>
                    <p className='font-semibold  text-xs xl:text-base'>
                      ₫{formatCurrency(item.version.current_price)} x {item.quantity}
                    </p>
                  </div>
                  <div className='font-semibold  text-xs xl:text-base text-red-700'>
                    ₫{formatCurrency(item.version.current_price * item.quantity)}
                  </div>
                </li>
              ))}
              <li className='my-5 flex items-center justify-between border-t-2 border-gray-200 py-3 text-sm'>
                <div>
                  <p className='text-sm xl:text-lg font-semibold underline'>Tổng thành tiền</p>
                </div>
                <div className='text-sm xl:text-lg font-semibold text-red-700'>₫{formatCurrency(totalAmount)}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
