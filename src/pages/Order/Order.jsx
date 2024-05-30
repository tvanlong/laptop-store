import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { getOrders } from '~/apis/order.api'
import Navbar from '~/components/Navbar'
import { AppContext } from '~/context/app.context'
import { useProfile } from '~/hooks/useProfile'
import { formatCurrency } from '~/utils/format'

function Order({ setProgress }) {
  const { profile } = useContext(AppContext)
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
    queryFn: () => getOrders(profile?._id),
    enabled: !!profile?._id
  })

  const orders = useMemo(() => orderData?.data?.data || [], [orderData])

  return (
    <div className='max-w-[1400px] mx-auto mt-10 mb-20'>
      <div className='grid grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='col-span-4'>
          {orders.map((order) => (
            <div key={order._id} className='p-4 shadow-inner border border-gray-200 mb-10'>
              <div className='flex justify-between p-4 border-b border-gray-200'>
                <div>
                  Mã đơn hàng: <span className=''>#{order?._id.toUpperCase()}</span>
                </div>
                <h4 className='flex items-center gap-3'>
                  {order?.status === 'Chờ xác nhận' && (
                    <svg
                      className='w-4 h-4 '
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
                      className='w-4 h-4'
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
                      className='w-4 h-4'
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
                  {order?.status}
                </h4>
              </div>
              <div className='p-4 border-b border-gray-200'>
                {order?.items?.map((item) => (
                  <div key={item._id} className='flex items-center py-4'>
                    <img
                      className='w-20 h-20 object-cover rounded-lg'
                      src={item.version.product.images[0]}
                      alt={`${item.version.product.name} ${item.version.name}`}
                    />
                    <div className='flex-1 ml-5'>
                      <h4 className='max-w-[600px]'>
                        [Mới 100%] {item.version.product.name} {item.version.name}
                      </h4>
                      <span className='text-gray-700'>x {item.quantity}</span>
                    </div>
                    <div>
                      <span className='text-sm line-through text-gray-400 mr-4'>
                        ₫ {formatCurrency(item.version.old_price)}
                      </span>
                      <span className='text-sm text-gray-400'>₫ {formatCurrency(item.version.current_price)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <h4 className='text-right p-4'>
                <span className='text-lg mr-3'>Thành tiền:</span>
                <span className='text-xl text-red-700'>₫ {formatCurrency(order?.total_price)}</span>
              </h4>
              {order?.status === 'Đang giao hàng' && (
                <div className='text-right'>
                  <button
                    type='submit'
                    className='text-white rounded-lg bg-green-700 hover:bg-green-800 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2'
                  >
                    Đã nhận hàng
                  </button>
                  <div className='text-xs text-red-500'>Chỉ bấm khi đơn hàng đã được giao thành công đến bạn!</div>
                </div>
              )}
              {order?.status === 'Chờ xác nhận' && (
                <div className='text-right'>
                  <button
                    type='submit'
                    className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
                  >
                    Hủy đơn hàng
                  </button>
                  <div className='text-xs text-red-500'>Đơn hàng đang giao sẽ không thể hủy!</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
