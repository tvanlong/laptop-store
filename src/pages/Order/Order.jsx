import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import orderApi from '~/apis/order.api'
import Navbar from '~/components/Navbar'
import { AppContext } from '~/context/app.context'
import { useProfile } from '~/hooks/useProfile'
import { formatCurrency } from '~/utils/format'
import { generateNameId } from '~/utils/util'

function Order({ setProgress }) {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { data: userData } = useProfile()
  const user = useMemo(() => userData?.data?.data || {}, [userData])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { data: orderData } = useQuery({
    queryKey: ['orders', profile?._id],
    queryFn: () => orderApi.getOrders(profile?._id),
    enabled: !!profile?._id
  })

  const orders = useMemo(() => orderData?.data?.data || [], [orderData])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ userId, orderId, data }) => orderApi.updateStatusOrder(userId, orderId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders', profile?._id] })
    }
  })

  const handleConfirmSuccess = (id) => {
    toast.promise(mutateAsync({ userId: profile?._id, orderId: id, data: { status: 'Đã giao hàng' } }), {
      loading: 'Đang xác nhận đơn hàng...',
      success: 'Xác nhận đơn hàng thành công',
      error: 'Xác nhận đơn hàng thất bại'
    })
  }

  const handleCancel = (id) => {
    toast.promise(mutateAsync({ userId: profile?._id, orderId: id, data: { status: 'Đã hủy' } }), {
      loading: 'Đang hủy đơn hàng...',
      success: 'Hủy đơn hàng thành công',
      error: 'Hủy đơn hàng thất bại'
    })
  }

  return (
    <div className='mx-auto mb-20 mt-10 max-w-[1400px]'>
      <Helmet>
        <title>Đơn hàng của bạn</title>
        <meta name='description' content='Đơn hàng của bạn' />
      </Helmet>
      <div className='flex justify-center lg:grid lg:grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='lg:col-span-4'>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className='mb-10 border border-gray-300 p-4 shadow-inner'>
                <div className='sm:flex justify-between border-b border-gray-300 p-4'>
                  <div className='text-sm sm:text-base'>
                    Mã đơn hàng: <span className=''>#{order?._id.toUpperCase()}</span>
                  </div>
                  <div className='flex items-center gap-3 mt-2 sm:mt-0'>
                    {order?.status === 'Chờ xác nhận' && (
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z'
                        />
                      </svg>
                    )}
                    {order?.status === 'Đang giao hàng' && (
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'
                        />
                      </svg>
                    )}
                    {order?.status === 'Đã giao hàng' && (
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z'
                        />
                      </svg>
                    )}
                    {order?.status === 'Đã hủy' && (
                      <svg
                        className='h-4 w-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          fillRule='evenodd'
                          d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z'
                          clipRule='evenodd'
                        />
                      </svg>
                    )}
                    {order?.status}
                  </div>
                </div>
                <div className='border-b border-gray-300 p-4'>
                  {order?.items?.map((item) => (
                    <div key={item._id} className='flex items-center py-4'>
                      <img
                        className='h-12 w-12 sm:h-20 sm:w-20 rounded-lg object-cover'
                        src={item.version.product.images[0]}
                        alt={`${item.version.product.name} ${item.version.name}`}
                      />
                      <div className='ml-5 sm:flex-1'>
                        <Link
                          to={`/product/${generateNameId({
                            name: `${item.version.product.name} ${item.version.name}`,
                            id: item.version._id
                          })}`}
                          className='max-w-[250px] lg:max-w-[600px] line-clamp-2 hover:underline text-gray-900 font-medium'
                        >
                          [Mới 100%] {item.version.product.name} {item.version.name}
                        </Link>

                        <span className='hidden sm:block text-gray-500'> - ( x{item.quantity})</span>
                        <span className='text-gray-500 sm:hidden'>
                          - ( ₫ {formatCurrency(item.version.current_price)} x {item.quantity})
                        </span>
                      </div>
                      <div className='hidden sm:block'>
                        <span className='mr-4 text-sm text-gray-500 line-through'>
                          ₫ {formatCurrency(item.version.old_price)}
                        </span>
                        <span className='text-sm font-semibold text-gray-500'>
                          ₫ {formatCurrency(item.version.current_price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <h4 className='p-4 text-right'>
                  <span className='mr-3 text-lg'>Thành tiền:</span>
                  <span className='text-xl font-extrabold text-red-700'>₫ {formatCurrency(order?.total_price)}</span>
                </h4>
                {order?.status === 'Đang giao hàng' && (
                  <div className='text-right'>
                    <button
                      type='button'
                      onClick={() => handleConfirmSuccess(order._id)}
                      disabled={isPending}
                      className='mb-2 mr-2 rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800'
                    >
                      Đã nhận hàng
                    </button>
                    <div className='text-xs text-red-500'>Chỉ bấm khi đơn hàng đã được giao thành công đến bạn!</div>
                  </div>
                )}
                {order?.status === 'Chờ xác nhận' && (
                  <div className='text-right'>
                    <button
                      type='button'
                      onClick={() => handleCancel(order._id)}
                      disabled={isPending}
                      className='mb-2 mr-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800'
                    >
                      Hủy đơn hàng
                    </button>
                    <div className='text-xs text-red-500'>Đơn hàng đang giao sẽ không thể hủy!</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className='text-center text-2xl font-bold text-gray-400'>Không có đơn hàng nào</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Order
