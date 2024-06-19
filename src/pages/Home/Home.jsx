import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Keyboard, Mousewheel } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getAllFeaturedVersions } from '~/apis/versions.api'
import Loading from '~/components/Loading'
import ProductItem from '~/components/ProductItem'
import { useVersions } from '~/hooks/useVersions'
import Banner from '~/pages/Home/components/Banner'
import SlickSlider from '~/pages/Home/components/SlickSlider'
import CountdownTimer from './components/CountdownTimer'

function Home({ setProgress }) {
  const { data, isLoading } = useVersions()
  const versions = useMemo(() => data?.data?.data?.docs || [], [data])
  const { data: featuredVersionsData } = useQuery({
    queryKey: ['featured-versions'],
    queryFn: getAllFeaturedVersions
  })
  const featuredVersions = useMemo(() => featuredVersionsData?.data?.data || [], [featuredVersionsData])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  if (isLoading) return <Loading />

  return (
    <>
      <div className='mx-auto xl:max-w-[1400px] lg:max-w-[1100px] w-full overflow-hidden'>
        <Helmet>
          <title>Trang chủ | Laptop KT</title>
          <meta name='description' content='Laptop KT - Chuyên cung cấp laptop chính hãng' />
        </Helmet>
        <Banner />
        <SlickSlider />
        <div className='mb-20 rounded-lg border border-[#dcdcdc] p-6'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-4 md:gap-0'>
            <div className='flex items-center md:border-r border-[#dcdcdc] px-8'>
              <img className='w-8 h-8 lg:w-10 lg:h-10' src='https://laptopkhanhtran.vn/images/giaohang.svg' alt='' />
              <div className='ml-5'>
                <div className='text-xs xl:text-base font-semibold text-green-900'>Giao hàng toàn quốc</div>
                <div className='text-xs lg:text-xs'>Miễn phí giao hàng tại Hà Nội</div>
              </div>
            </div>
            <div className='flex items-center md:border-r border-[#dcdcdc] px-8'>
              <img className='w-8 h-8 lg:w-10 lg:h-10' src='https://laptopkhanhtran.vn/images/support.svg' alt='' />
              <div className='ml-5'>
                <div className='text-xs xl:text-base font-semibold text-green-900'>Hỗ trợ trực tuyến</div>
                <div className='text-xs lg:text-xs'>Chúng tôi luôn hỗ trợ 24/7</div>
              </div>
            </div>
            <div className='flex items-center md:border-r border-[#dcdcdc] px-8'>
              <img className='w-8 h-8 lg:w-10 lg:h-10' src='https://laptopkhanhtran.vn/images/promotion.svg' alt='' />
              <div className='ml-5'>
                <div className='text-xs xl:text-base font-semibold text-green-900'>Giá cả phải chăng</div>
                <div className='text-xs lg:text-xs'>Chúng tôi luôn có giá tốt nhất cho khách hàng</div>
              </div>
            </div>
            <div className='flex items-center md:border-r lg:border-none border-[#dcdcdc] px-8'>
              <img className='w-8 h-8 lg:w-10 lg:h-10' src='https://laptopkhanhtran.vn/images/cashback.svg' alt='' />
              <div className='ml-5'>
                <div className='text-xs xl:text-base font-semibold text-green-900'>Chính sách hoàn tiền</div>
                <div className='text-xs lg:text-xs'>Hoàn tiền 100% nếu sản phẩm không tốt</div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative mb-20 rounded-lg bg-red-500'>
          <div className='flex items-center rounded-t-lg bg-[#dc3545] px-6 py-4'>
            <img src='https://laptopkhanhtran.vn/css/icon/lightning.svg' alt='' />
            <h2 className='ml-3 font-bold text-xs sm:text-base text-white'>GIỜ VÀNG GIÁ SỐC</h2>
            <div className='ml-5 mr-3 sm:text-base text-xs font-semibold text-white'>chỉ còn</div>
            <CountdownTimer />
          </div>
          <Swiper
            breakpoints={{
              1400: {
                slidesPerView: 5,
                spaceBetween: 10
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10
              },

              320: {
                slidesPerView: 1,
                spaceBetween: 10
              }
            }}
            cssMode={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ clickable: true }}
            mousewheel={true}
            keyboard={true}
            modules={[Mousewheel, Keyboard, Autoplay]}
            style={{ padding: '20px' }}
          >
            {featuredVersions.length > 0 &&
              featuredVersions.map((version) => (
                <SwiperSlide key={version._id}>
                  <ProductItem version={version} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className='mb-20'>
          <h2 className='mb-5 text-center text-xl font-extrabold'>LAPTOP DOANH NHÂN CAO CẤP</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-6'>
            {versions.length > 0 &&
              versions.map((version) => <ProductItem key={version._id} version={version} isHover />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
