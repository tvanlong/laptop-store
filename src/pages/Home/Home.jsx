import { useEffect, useMemo } from 'react'
import { useVersions } from '~/hooks/useVersions'
import SlickSlider from '~/pages/Home/components/SlickSlider'
import Banner from '~/pages/Home/components/Banner'
import ProductItem from '~/components/ProductItem'
import Loading from '~/components/Loading'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
import { shuffle } from '~/utils/shuffle'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Home({ setProgress }) {
  const { data, isLoading } = useVersions()

  const versions = useMemo(() => data?.data?.data?.docs || [], [data])

  const reorderVersions = useMemo(() => {
    const shuffledVersions = versions.length > 0 ? shuffle(versions) : []
    return shuffledVersions
  }, [versions])

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
      <div className='mx-auto max-w-[1400px]'>
        <Banner />
        <SlickSlider />
        <div className='mb-20 rounded-lg border border-[#dcdcdc] p-6'>
          <div className='grid grid-cols-4'>
            <div className='flex items-center border-r border-[#dcdcdc] px-8'>
              <img src='https://laptopkhanhtran.vn/images/giaohang.svg' alt='' />
              <div className='ml-5'>
                <div className='font-semibold text-green-900'>Giao hàng toàn quốc</div>
                <div className='text-sm'>Miễn phí giao hàng tại Hà Nội</div>
              </div>
            </div>
            <div className='flex items-center border-r border-[#dcdcdc] px-8'>
              <img src='https://laptopkhanhtran.vn/images/support.svg' alt='' />
              <div className='ml-5'>
                <div className='font-semibold text-green-900'>Hỗ trợ trực tuyến</div>
                <div className='text-sm'>Chúng tôi luôn hỗ trợ 24/7</div>
              </div>
            </div>
            <div className='flex items-center border-r border-[#dcdcdc] px-8'>
              <img src='https://laptopkhanhtran.vn/images/promotion.svg' alt='' />
              <div className='ml-5'>
                <div className='font-semibold text-green-900'>Giá cả phải chăng</div>
                <div className='text-sm'>Chúng tôi luôn có giá tốt nhất cho khách hàng</div>
              </div>
            </div>
            <div className='flex items-center px-8'>
              <img src='https://laptopkhanhtran.vn/images/cashback.svg' alt='' />
              <div className='ml-5'>
                <div className='font-semibold text-green-900'>Chính sách hoàn tiền</div>
                <div className='text-sm'>Hoàn tiền 100% nếu sản phẩm không tốt</div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative mb-20 rounded-lg bg-red-500'>
          <div className='flex items-center rounded-t-lg bg-[#dc3545] px-6 py-4'>
            <img src='https://laptopkhanhtran.vn/css/icon/lightning.svg' alt='' />
            <h2 className='ml-3 font-bold text-white'>GIỜ VÀNG GIÁ SỐC</h2>
            <div className='ml-5 mr-3 font-semibold text-white'>chỉ còn</div>
            <div className='mr-3 flex flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
              <span className='font-bold text-amber-400' id='days'>
                11
              </span>
              <span className='text-white'>ngày</span>
            </div>
            <div className='mr-3 flex flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
              <span className='font-bold text-amber-400' id='hours'>
                20
              </span>
              <span className='text-white'>giờ</span>
            </div>
            <div className='mr-3 flex flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
              <span className='font-bold text-amber-400' id='minutes'>
                26
              </span>
              <span className='text-white'>phút</span>
            </div>
            <div className='flex flex-col items-center rounded-lg bg-[#000000b8] px-2 py-1'>
              <span className='font-bold text-amber-400' id='seconds'>
                36
              </span>
              <span className='text-white'>giây</span>
            </div>
          </div>
          <Swiper
            breakpoints={{
              1024: {
                slidesPerView: 5,
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
            {reorderVersions.length > 0 &&
              reorderVersions.map((version) => (
                <SwiperSlide key={version._id}>
                  <ProductItem version={version} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className='mb-20'>
          <h2 className='mb-5 text-center text-xl font-extrabold'>LAPTOP DOANH NHÂN CAO CẤP</h2>
          <div className='grid grid-cols-5 gap-3 p-6'>
            {versions.length > 0 &&
              versions.map((version) => <ProductItem key={version._id} version={version} isHover />)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
