import { useMutation, useQuery } from '@tanstack/react-query'
import { Carousel } from 'flowbite-react'
import { useContext, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { addToCart } from '~/apis/carts.api'
import { getProductById } from '~/apis/products.api'
import { getVersionById } from '~/apis/versions.api'
import Loading from '~/components/Loading'
import config from '~/constants/config'
import { AppContext } from '~/context/app.context'
import { formatCurrency } from '~/utils/format'

function Product({ setProgress }) {
  const { isAuthenticated, profile } = useContext(AppContext)
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
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: (data) => addToCart(profile?._id, data)
  })

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
      return
    }
    toast.promise(mutateAsync({ versionId }), {
      loading: 'Đang thêm sản phẩm vào giỏ hàng...',
      success: 'Thêm sản phẩm vào giỏ hàng thành công',
      error: 'Thêm sản phẩm vào giỏ hàng thất bại'
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <nav className='flex' aria-label='Breadcrumb'>
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center opacity-60'>
            <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'>
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
            <div className='flex items-center'>
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
              <Link to={`/product/${versionId}`} className='ml-1 text-sm text-gray-500 md:ml-2'>
                [ Mới 100% ] {version?.product?.name} {version?.name}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      <div className='grid grid-cols-12 gap-8 mt-10'>
        <div className='col-span-6'>
          <Carousel className='h-[30rem]' indicators={false}>
            {version?.product?.images?.map((image, index) => (
              <img
                key={index}
                src={`${config.baseURL}/api/upload/${image}`}
                alt={`${version.product.name} ${version.name}`}
                className='w-full h-full object-cover'
              />
            ))}
          </Carousel>
          <div className='flex justify-center gap-4 mt-10'>
            <div className='border border-gray-300 py-2 px-4 flex flex-col items-center hover:border-green-600'>
              <img className='w-8 h-8' src='https://laptopkhanhtran.vn/css/icon/images.svg' alt='' />
              <span className='text-xs'>Xem ảnh thực tế</span>
            </div>
            <div className='border border-gray-300 py-2 px-4 flex flex-col items-center hover:border-green-600'>
              <img className='w-8 h-8' src='https://laptopkhanhtran.vn/css/icon/configuration.svg' alt='' />
              <span className='text-xs'>Thông số kỹ thuật</span>
            </div>
            <div className='border border-gray-300 py-2 px-4 flex flex-col items-center hover:border-green-600'>
              <img className='w-8 h-8' src='https://laptopkhanhtran.vn/css/icon/article2.svg' alt='' />
              <span className='text-xs'>Thông tin sản phẩm</span>
            </div>
          </div>
          <div className='bg-[#f4f4f4] rounded-lg mt-10 py-6'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='flex items-center px-4'>
                <img className='w-14 h-14' src='https://laptopkhanhtran.vn/images/giaohang.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-green-900 font-semibold text-sm'>Giao hàng toàn quốc</div>
                  <div className='text-xs'>Miễn phí giao hàng tại Hà Nội</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='w-14 h-14' src='https://laptopkhanhtran.vn/images/support.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-green-900 font-semibold text-sm'>Hỗ trợ trực tuyến</div>
                  <div className='text-xs'>Chúng tôi luôn hỗ trợ 24/7</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='w-14 h-14' src='https://laptopkhanhtran.vn/images/promotion.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-green-900 font-semibold text-sm'>Giá cả phải chăng</div>
                  <div className='text-xs'>Chúng tôi luôn có giá tốt nhất cho khách hàng</div>
                </div>
              </div>
              <div className='flex items-center px-4'>
                <img className='w-14 h-14' src='https://laptopkhanhtran.vn/images/cashback.svg' alt='' />
                <div className='ml-5'>
                  <div className='text-green-900 font-semibold text-sm'>Chính sách hoàn tiền</div>
                  <div className='text-xs'>Hoàn tiền 100% nếu sản phẩm không tốt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-span-6'>
          <h2 className='font-bold text-2xl mb-5'>
            [ Mới 100% ] {version?.product?.name} {version?.name}
          </h2>
          <div className='flex items-end my-2 gap-3'>
            <div className='text-red-500 font-bold text-3xl'>{formatCurrency(version?.current_price)} đ</div>
            <div className='font-semibold text-gray-500 line-through text-lg'>
              {formatCurrency(version?.old_price)} đ
            </div>
          </div>
          <ol className='my-5 list-none space-y-1 text-gray-500 list-inside'>
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
            <div className='border-r mx-3'></div>
            <div className='text-sm text-green-700 underline'>So sánh</div>
          </div>
          <h3 className='my-5 font-semibold text-xl'>Tùy chọn cấu hình</h3>
          <div className='grid grid-cols-2 gap-3'>
            {product?.versions?.map((version, index) => (
              <div
                key={index}
                className={
                  versionId === version._id
                    ? 'border border-green-600 p-3 bg-[#ebfff7] rounded-lg'
                    : 'border border-gray-300 hover:border-green-600 hover:bg-[#ebfff7] p-3 bg-white rounded-lg'
                }
              >
                <Link to={`/product/${version._id}`}>
                  <div className='text-sm mb-2'>{version?.name}</div>
                  <div className='flex'>
                    <div className='text-sm font-semibold mr-3'>{formatCurrency(version.current_price)} đ</div>
                    <div className='text-sm font-semibold opacity-60 line-through'>
                      {formatCurrency(version.old_price)} đ
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <ul className='list-none mt-5 px-5 py-6 bg-[#f4f4f4] text-sm rounded-lg'>
            <li className='py-2'>🎁Giảm tới 1.000.000VNĐ khi quý khách mua máy lần 2.</li>
            <li className='py-2'>🎁Tặng Windows bản quyền theo máy</li>
            <li className='py-2'>🎁Chế độ bảo hành 12 tháng lỗi 1 đổi 1</li>
            <li className='py-2'>🎁Tặng balo hoặc túi xách thời trang</li>
            <li className='py-2'>🎁Chuột quang không dây + bàn di chuột</li>
            <li className='py-2'>🎁Tặng gói cài đặt + vệ sinh, bảo dưỡng, trọn đời</li>
          </ul>
          <div className='mt-5'>
            <button
              className='text-sm p-3 text-white bg-[#d62454] uppercase w-full rounded-lg hover:bg-[#d62454]/90 transition duration-300 ease-in-out'
              onClick={handleAddToCart}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
          <div className='grid grid-cols-3 gap-3 mt-5'>
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
