import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import cartApi from '~/apis/carts.api'
import Loading from '~/components/Loading'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { useCart } from '~/hooks/useCart'
import InputQuantity from '~/pages/Cart/components/InputQuantity'
import { formatCurrency } from '~/utils/format'
import { generateNameId } from '~/utils/util'

function Cart({ setProgress }) {
  const { profile } = useContext(AppContext)
  const { data: cartData, isLoading, refetch } = useCart()
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

  const { mutateAsync: removeItemAsync } = useMutation({
    mutationFn: (data) => cartApi.removeItem(profile?._id, data)
  })

  const { mutateAsync: removeCartAsync } = useMutation({
    mutationFn: () => cartApi.removeCart(profile?._id)
  })

  const handleRemoveItem = async (id) => {
    toast.promise(removeItemAsync({ versionId: id }), {
      loading: 'Đang xóa sản phẩm khỏi giỏ hàng...',
      success: () => {
        refetch()
        return 'Xóa sản phẩm thành công'
      },
      error: 'Xóa sản phẩm thất bại'
    })
  }

  const refreshCart = () => {
    if (!cart?.cart_items?.length) return toast.error('Giỏ hàng trống')
    refetch()
  }

  const handleRemoveCart = async () => {
    if (!cart?.cart_items?.length) return toast.error('Giỏ hàng trống')
    toast.promise(removeCartAsync(), {
      loading: 'Đang xóa tiến hành xóa giỏ hàng...',
      success: () => {
        window.location.reload()
        return 'Xóa giỏ hàng thành công'
      },
      error: 'Xóa thất bại'
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className='mx-auto mb-20 mt-5 max-w-[1400px] p-6 overflow-hidden'>
      <Helmet>
        <title>Giỏ hàng</title>
        <meta name='description' content='Giỏ hàng' />
      </Helmet>
      <nav className='flex' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center opacity-60'>
            <Link
              to={path.home}
              className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'
            >
              <svg
                className='mr-2.5 h-3 w-3'
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
                className='mx-1 h-3 w-3 text-gray-400'
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
      <h2 className='my-5 text-xl xl:text-2xl font-bold'>Giỏ hàng</h2>
      <div className='xl:grid xl:grid-cols-12 gap-8'>
        <div className='xl:col-span-9'>
          <div className='relative shadow-lg sm:rounded-lg'>
            <table className='hidden md:table w-full text-left text-sm text-gray-500'>
              <thead className='bg-[#f4f4f4] text-xs uppercase text-gray-700'>
                <tr>
                  <th scope='col' className='p-4'></th>
                  <th scope='col' className='px-6 py-3 text-center font-bold'>
                    Sản phẩm
                  </th>
                  <th scope='col' className='px-6 py-3 text-center font-bold hidden xl:table-cell'>
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
                  <tr key={item._id} className='border-b bg-white hover:bg-gray-50'>
                    <td className='cursor-pointer p-4 text-center font-bold'>
                      <button onClick={() => handleRemoveItem(item.version._id)}>
                        <svg
                          className='h-6 w-6 cursor-pointer text-gray-600 transition-colors duration-200 hover:text-red-500'
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
                      </button>
                    </td>
                    <td className='flex items-center px-6 py-4 font-medium text-gray-900'>
                      <img
                        className='mr-3 h-14 w-14 rounded-lg border border-gray-300 object-cover'
                        src={item.version.product.images[0]}
                        alt={`${item.version.product.name} ${item.version.name}`}
                      />
                      <Link
                        to={`/product/${generateNameId({
                          name: `${item.version.product.name} ${item.version.name}`,
                          id: item.version._id
                        })}`}
                        className='font-semibold text-xs xl:text-sm'
                      >
                        [Mới 100%] {item.version.product.name} ({item.version.name})
                      </Link>
                    </td>
                    <td className='px-6 py-4 text-center font-bold hidden xl:table-cell'>
                      ₫{formatCurrency(item.version.current_price)}
                    </td>
                    <td className='px-6 py-4 text-center'>
                      <InputQuantity item={item} />
                    </td>
                    <td className='px-6 py-4 text-center font-bold text-[#d62454]'>
                      ₫{formatCurrency(item.version.current_price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='md:hidden px-3'>
              {cart?.cart_items?.map((item) => (
                <div key={item._id} className='flex items-center border-b py-4 gap-3'>
                  <div className='flex items-center gap-3'>
                    <img
                      className='h-14 w-14 rounded-lg border border-gray-300 object-cover'
                      src={item.version.product.images[0]}
                      alt={`${item.version.product.name} ${item.version.name}`}
                    />
                    <div>
                      <Link
                        to={`/product/${generateNameId({
                          name: `${item.version.product.name} ${item.version.name}`,
                          id: item.version._id
                        })}`}
                        className='font-semibold text-xs xl:text-sm line-clamp-1'
                      >
                        [Mới 100%] {item.version.product.name} ({item.version.name})
                      </Link>
                      <div className='text-xs text-gray-500'>
                        Đơn giá: ₫{formatCurrency(item.version.current_price)}
                      </div>
                      <div className='text-xs text-gray-500'>
                        Tổng: ₫{formatCurrency(item.version.current_price * item.quantity)}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 ml-auto'>
                    <InputQuantity item={item} />
                    <button onClick={() => handleRemoveItem(item.version._id)}>
                      <svg
                        className='h-4 w-4 cursor-pointer text-gray-600 transition-colors duration-200 hover:text-red-500'
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
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Empty cart */}
            {!cart?.cart_items?.length && (
              <div className='flex h-80 items-center justify-center'>
                <div className='text-center'>
                  <h3 className='my-5 text-2xl font-semibold'>Giỏ hàng trống</h3>
                  <Link to={path.home} className='text-sm font-semibold hover:underline'>
                    Tiếp tục mua hàng
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div className='mt-5 flex justify-end gap-5'>
            <div
              className='mr-4 cursor-pointer text-xs md:text-sm font-semibold hover:underline'
              onClick={handleRemoveCart}
            >
              Xóa toàn bộ sản phẩm
            </div>
            <Link to={path.home} className='text-xs md:text-sm font-semibold hover:underline'>
              Tiếp tục mua hàng
            </Link>
          </div>
          <button
            className='hidden xl:block rounded-lg bg-yellow-400 px-3 py-2 text-white hover:bg-yellow-300'
            onClick={refreshCart}
          >
            Cập nhật giỏ hàng
          </button>
        </div>
        <div className='hidden xl:block xl:col-span-3'>
          <div className='rounded-lg bg-[#f4f4f4] p-6'>
            <h3 className='mb-10 text-xl font-semibold'>Thông tin đơn hàng</h3>
            <div className='mb-6 flex items-center justify-between'>
              <span className='text-sm font-semibold'>Tổng thanh toán:</span>
              <span className='text-xl font-semibold text-[#d62454]'>
                ₫{totalAmount ? formatCurrency(totalAmount) : 0}
              </span>
            </div>
            <div className='mt-5 grid grid-cols-1 gap-3'>
              <button className='rounded-lg bg-[#e00] p-1'>
                <Link to={path.checkout}>
                  <div className='text-sm font-semibold uppercase text-white'>Mua ngay</div>
                  <span className='text-xs capitalize text-white'>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
                </Link>
              </button>
              <button className='rounded-lg bg-[#288ad6] p-3'>
                <Link>
                  <div className='text-sm font-semibold uppercase text-white'>Trả góp qua thẻ</div>
                  <span className='text-xs capitalize text-white'>Visa, Master, JCB</span>
                </Link>
              </button>
              <button className='rounded-lg bg-[#f1eb1f] p-1'>
                <Link>
                  <div className='text-sm font-semibold uppercase text-[#235d97]'>mua ngay - trả sau</div>
                  <div className='flex justify-center'>
                    <img className='w-14' src='https://pc.baokim.vn/platform/img/icon-kredivo.svg' alt='' />
                    <img
                      className='w-14'
                      src='https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg'
                      alt=''
                    />
                  </div>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='block xl:hidden fixed bottom-0 right-0 left-0'>
        <div className='rounded-lg bg-white border-t border-gray-200 p-6'>
          <div className='mb-6 flex items-center justify-between'>
            <span className='text-sm font-semibold'>Tổng thanh toán:</span>
            <span className='text-xl font-semibold text-[#d62454]'>
              ₫{totalAmount ? formatCurrency(totalAmount) : 0}
            </span>
          </div>
          <div className='mt-5 text-center'>
            <button className='rounded-lg bg-[#e00] p-1'>
              <Link to={path.checkout}>
                <div className='text-sm font-semibold uppercase text-white'>Mua ngay</div>
                <span className='text-xs capitalize text-white'>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
