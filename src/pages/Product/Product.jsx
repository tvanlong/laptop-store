import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Carousel, Spinner } from 'flowbite-react'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { addToCart } from '~/apis/carts.api'
import { getProductById } from '~/apis/products.api'
import { getVersionById } from '~/apis/versions.api'
import Loading from '~/components/Loading'
import { AppContext } from '~/context/app.context'
import { formatCurrency } from '~/utils/format'

function Product({ setProgress }) {
  const { isAuthenticated, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const { versionId } = useParams()
  const { data: versionData, isLoading } = useQuery({
    queryKey: ['version', versionId],
    queryFn: () => getVersionById(versionId),
    enabled: !!versionId
  })
  const version = useMemo(() => versionData?.data?.data || {}, [versionData])

  const { data: productData } = useQuery({
    queryKey: ['product', version?.product?._id],
    queryFn: () => getProductById(version?.product?._id),
    enabled: !!version?.product?._id
  })
  const product = useMemo(() => productData?.data?.data || {}, [productData])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => addToCart(profile?._id, data)
  })

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }
    toast.promise(mutateAsync({ versionId }), {
      loading: 'Đang thêm sản phẩm vào giỏ hàng...',
      success: () => {
        queryClient.invalidateQueries({ queryKey: ['cart', profile?._id] })
        return 'Thêm sản phẩm vào giỏ hàng thành công'
      },
      error: 'Thêm sản phẩm vào giỏ hàng thất bại'
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className='mx-auto mb-20 mt-5 max-w-[1400px] p-6'>
      <nav className='flex' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center opacity-60'>
            <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'>
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
            <div className='flex items-center'>
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
              <Link
                to={`/product/${versionId}`}
                className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'
              >
                Sản phẩm
              </Link>
            </div>
          </li>
          <li aria-current='page opacity-60'>
            <div className='flex items-center'>
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
              <Link to={`/product/${versionId}`} className='ml-1 text-sm text-gray-500 md:ml-2'>
                [ Mới 100% ] {version?.product?.name} {version?.name}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className='mt-10 grid grid-cols-12 gap-8'>
        <div className='col-span-6'>
          <Carousel className='h-[30rem]' indicators={false}>
            {version?.product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${version.product.name} ${version.name}`}
                className='h-full w-full object-cover'
              />
            ))}
          </Carousel>
          <div className='mt-10 flex justify-center gap-4'>
            <div className='flex flex-col items-center border border-gray-300 px-4 py-2 hover:border-green-600'>
              <img className='h-8 w-8' src='https://laptopkhanhtran.vn/css/icon/images.svg' alt='' />
              <span className='text-xs'>Xem ảnh thực tế</span>
            </div>
            <div className='flex flex-col items-center border border-gray-300 px-4 py-2 hover:border-green-600'>
              <img className='h-8 w-8' src='https://laptopkhanhtran.vn/css/icon/configuration.svg' alt='' />
              <span className='text-xs'>Thông số kỹ thuật</span>
            </div>
            <div className='flex flex-col items-center border border-gray-300 px-4 py-2 hover:border-green-600'>
              <img className='h-8 w-8' src='https://laptopkhanhtran.vn/css/icon/article2.svg' alt='' />
              <span className='text-xs'>Thông tin sản phẩm</span>
            </div>
          </div>
          <div className='mt-10 rounded-lg bg-[#f4f4f4] py-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center px-4'>
                <img className='h-14 w-14' src='https://laptopkhanhtran.vn/images/giaohang.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Giao hàng toàn quốc</div>
                  <div className='text-xs'>Miễn phí giao hàng tại Hà Nội</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='h-14 w-14' src='https://laptopkhanhtran.vn/images/support.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Hỗ trợ trực tuyến</div>
                  <div className='text-xs'>Chúng tôi luôn hỗ trợ 24/7</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='h-14 w-14' src='https://laptopkhanhtran.vn/images/promotion.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Giá cả phải chăng</div>
                  <div className='text-xs'>Chúng tôi luôn có giá tốt nhất cho khách hàng</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='h-14 w-14' src='https://laptopkhanhtran.vn/images/cashback.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-sm font-semibold text-green-900'>Chính sách hoàn tiền</div>
                  <div className='text-xs'>Hoàn tiền 100% nếu sản phẩm không tốt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-6'>
          <h2 className='mb-5 text-2xl font-bold'>
            [ Mới 100% ] {version?.product?.name} {version?.name}
          </h2>
          <div className='my-2 flex items-end gap-3'>
            <div className='text-3xl font-bold text-red-500'>{formatCurrency(version?.current_price)} đ</div>
            <div className='text-lg font-semibold text-gray-500 line-through'>
              {formatCurrency(version?.old_price)} đ
            </div>
          </div>
          <ol className='my-5 list-inside list-none space-y-1 text-gray-500'>
            {version?.description?.map((spec, index) => {
              const [key, value] = spec.split(':')
              return (
                <li key={index} className='text-sm'>
                  <span className='font-semibold text-gray-700'>{key}</span>
                  {value}
                </li>
              )
            })}
          </ol>
          <div className='flex'>
            <div className='text-sm text-green-700 underline'>Xem chi tiết cấu hình</div>
            <div className='mx-3 border-r'></div>
            <div className='text-sm text-green-700 underline'>So sánh</div>
          </div>
          <h3 className='my-5 text-xl font-semibold'>Tùy chọn cấu hình</h3>
          <div className='grid grid-cols-2 gap-3'>
            {product?.versions?.map((version, index) => (
              <div
                key={index}
                className={
                  versionId === version._id
                    ? 'rounded-lg border border-green-600 bg-[#ebfff7] p-3'
                    : 'rounded-lg border border-gray-300 bg-white p-3 hover:border-green-600 hover:bg-[#ebfff7]'
                }
              >
                <Link to={`/product/${version._id}`}>
                  <div className='mb-2 text-sm'>{version?.name}</div>
                  <div className='flex'>
                    <div className='mr-3 text-sm font-semibold'>{formatCurrency(version.current_price)} đ</div>
                    <div className='text-sm font-semibold line-through opacity-60'>
                      {formatCurrency(version.old_price)} đ
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <ul className='mt-5 list-none rounded-lg bg-[#f4f4f4] px-5 py-6 text-sm'>
            <li className='py-2'>🎁Giảm tới 1.000.000VNĐ khi quý khách mua máy lần 2.</li>
            <li className='py-2'>🎁Tặng Windows bản quyền theo máy</li>
            <li className='py-2'>🎁Chế độ bảo hành 12 tháng lỗi 1 đổi 1</li>
            <li className='py-2'>🎁Tặng balo hoặc túi xách thời trang</li>
            <li className='py-2'>🎁Chuột quang không dây + bàn di chuột</li>
            <li className='py-2'>🎁Tặng gói cài đặt + vệ sinh, bảo dưỡng, trọn đời</li>
          </ul>
          <div className='mt-5'>
            <button
              disabled={isPending}
              className={
                isPending
                  ? 'w-full cursor-not-allowed rounded-lg bg-[#d62454] p-3 text-sm uppercase text-white transition duration-300 ease-in-out hover:bg-[#d62454]/90'
                  : 'w-full rounded-lg bg-[#d62454] p-3 text-sm uppercase text-white transition duration-300 ease-in-out hover:bg-[#d62454]/90'
              }
              onClick={handleAddToCart}
            >
              {isPending ? <Spinner size='sm' /> : 'Thêm vào giỏ hàng'}
            </button>
          </div>
          <div className='mt-5 grid grid-cols-3 gap-3'>
            <button className='rounded-lg bg-[#e00] p-1'>
              <a>
                <div className='text-sm font-semibold uppercase text-white'>Mua ngay</div>
                <span className='text-xs capitalize text-white'>Giao hàng tận nơi hoặc nhận tại cửa hàng</span>
              </a>
            </button>
            <button className='rounded-lg bg-[#288ad6] p-1'>
              <a>
                <div className='text-sm font-semibold uppercase text-white'>Trả góp qua thẻ</div>
                <span className='text-xs capitalize text-white'>Visa, Master, JCB</span>
              </a>
            </button>
            <button className='rounded-lg bg-[#f1eb1f] p-1'>
              <a>
                <div className='text-sm font-semibold uppercase text-[#235d97]'>mua ngay - trả sau</div>
                <div className='flex justify-center'>
                  <img className='w-14' src='https://pc.baokim.vn/platform/img/icon-kredivo.svg' alt='' />
                  <img className='w-14' src='https://pc.baokim.vn/platform/img/home-paylater-ngang-small.svg' alt='' />
                </div>
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
