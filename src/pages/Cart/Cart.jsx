import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getCart } from '~/apis/carts.api'
import config from '~/constants/config'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { formatCurrency } from '~/utils/format'

function Cart({ setProgress }) {
  const { profile } = useContext(AppContext)
  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(profile?._id)
  })
  const cart = useMemo(() => cartData?.data?.data, [cartData])

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <nav className='flex' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center opacity-60'>
            <Link
              to={path.home}
              className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'
            >
              <svg
                className='w-3 h-3 mr-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
              </svg>
              Trang chủ
            </Link>
          </li>
          <li className='opacity-60'>
            <Link to={path.cart} className='flex items-center'>
              <svg
                className='w-3 h-3 text-gray-400 mx-1'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
              <span className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'>Giỏ hàng</span>
            </Link>
          </li>
        </ol>
      </nav>
      <h2 className='font-bold text-2xl my-5'>Giỏ hàng</h2>
      <div className='grid grid-cols-12 gap-8'>
        <form method='POST' className='col-span-9'>
          <div className='relative shadow-lg sm:rounded-lg'>
            <table className='w-full text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-[#f4f4f4]'>
                <tr>
                  <th scope='col' className='p-4'></th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Sản phẩm
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Đơn giá
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Số lượng
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Tổng
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.cart_items?.map((item) => (
                  <tr key={item._id} className='bg-white border-b hover:bg-gray-50'>
                    <td className='p-4 font-bold cursor-pointer text-center'>
                      <div>
                        <svg
                          className='w-6 h-6 text-gray-600 cursor-pointer hover:text-red-500 transition-colors duration-200'
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
                      </div>
                    </td>
                    <td className='flex items-center px-6 py-4 font-medium text-gray-900'>
                      <img
                        className='w-14 h-14 object-cover border border-gray-300 rounded-lg mr-3'
                        src={`${config.baseURL}/api/upload/${item.version.product.images[0]}`}
                        alt={`${item.version.product.name} ${item.version.name}`}
                      />
                      <div className='font-semibold'>
                        [Mới 100%] {item.version.product.name} {item.version.name}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-center font-bold'>{formatCurrency(item.version.current_price)} đ</td>
                    <td className='px-6 py-4 text-center'>
                      <input
                        type='number'
                        className='w-24 h-8 text-center outline-none border border-gray-300 rounded-lg'
                        defaultValue={item.quantity}
                      />
                    </td>
                    <td className='px-6 py-4 text-center font-bold'>
                      {formatCurrency(item.version.current_price * item.quantity)} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Empty cart */}
            {!cart?.cart_items?.length && (
              <div className='flex justify-center items-center h-80'>
                <div className='text-center'>
                  <h3 className='font-semibold text-xl my-5'>Giỏ hàng trống</h3>
                  <a className='underline text-sm font-semibold'>Tiếp tục mua hàng</a>
                </div>
              </div>
            )}
          </div>
          <div className='mt-5 text-right'>
            <a className='underline text-sm font-semibold mr-4'>Xóa toàn bộ sản phẩm</a>
            <a className='underline text-sm font-semibold'>Tiếp tục mua hàng</a>
          </div>
          <button type='submit' className='bg-yellow-400 px-3 py-2 text-white rounded-lg'>
            Cập nhật giỏ hàng
          </button>
        </form>
        <div className='col-span-3'>
          <div className='bg-[#f4f4f4] rounded-lg p-6'>
            <h3 className='font-semibold text-xl mb-10'>Thông tin đơn hàng</h3>
            <div className='flex justify-between items-center mb-6'>
              <span className='text-sm font-semibold'>Tổng thanh toán:</span>
              <span className='text-xl font-semibold text-[#d62454]'>2.000.000 đ</span>
            </div>
            <div className='grid grid-cols-1 gap-3 mt-5'>
              <button className='bg-[#e00] p-1 rounded-lg'>
                <a>
                  <div className='text-sm font-semibold text-white uppercase'>Mua ngay</div>
                  <span className='text-xs text-white capitalize'>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
                </a>
              </button>
              <button className='bg-[#288ad6] p-1 rounded-lg'>
                <a>
                  <div className='text-sm font-semibold text-white uppercase'>Trả góp qua thẻ</div>
                  <span className='text-xs text-white capitalize'>Visa, Master, JCB</span>
                </a>
              </button>
              <button className='bg-[#f1eb1f] p-1 rounded-lg'>
                <a>
                  <div className='text-sm font-semibold text-[#235d97] uppercase'>mua ngay - trả sau</div>
                  <div className='flex justify-center'>
                    <img className='w-14' src='https://pc.baokim.vn/platform/img/icon-kredivo.svg' alt='' />
                    <img
                      className='w-14'
                      src='https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg'
                      alt=''
                    />
                  </div>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
