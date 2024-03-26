import SlickSlider from '~/components/SlickSlider'
import Banner from '~/components/Banner'
import ProductItem from '~/components/ProductItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Mousewheel, Keyboard, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

function Home() {
  return (
    <>
      <div className='max-w-[1400px] mx-auto'>
        <Banner />
        <SlickSlider />
        <div className='p-6 border border-[#dcdcdc] rounded-lg mb-20'>
          <div className='grid grid-cols-4'>
            <div className='border-r border-[#dcdcdc] flex items-center px-8'>
              <img src='https://laptopkhanhtran.vn/images/giaohang.svg' alt='' />
              <div className='ml-5'>
                <div className='text-green-900 font-semibold'>Giao hàng toàn quốc</div>
                <div className='text-sm'>Miễn phí giao hàng tại Hà Nội</div>
              </div>
            </div>
            <div className='border-r border-[#dcdcdc] flex items-center px-8'>
              <img src='https://laptopkhanhtran.vn/images/support.svg' alt='' />
              <div className='ml-5'>
                <div className='text-green-900 font-semibold'>Hỗ trợ trực tuyến</div>
                <div className='text-sm'>Chúng tôi luôn hỗ trợ 24/7</div>
              </div>
            </div>
            <div className='border-r border-[#dcdcdc] flex items-center px-8'>
              <img src='https://laptopkhanhtran.vn/images/promotion.svg' alt='' />
              <div className='ml-5'>
                <div className='text-green-900 font-semibold'>Giá cả phải chăng</div>
                <div className='text-sm'>Chúng tôi luôn có giá tốt nhất cho khách hàng</div>
              </div>
            </div>
            <div className='flex items-center px-8'>
              <img src='https://laptopkhanhtran.vn/images/cashback.svg' alt='' />
              <div className='ml-5'>
                <div className='text-green-900 font-semibold'>Chính sách hoàn tiền</div>
                <div className='text-sm'>Hoàn tiền 100% nếu sản phẩm không tốt</div>
              </div>
            </div>
          </div>
        </div>
        <div className='relative bg-red-500 rounded-lg mb-20'>
          <div className='bg-[#dc3545] rounded-t-lg px-6 py-4 flex items-center'>
            <img src='https://laptopkhanhtran.vn/css/icon/lightning.svg' alt='' />
            <h2 className='text-white font-bold ml-3'>GIỜ VÀNG GIÁ SỐC</h2>
            <div className='font-semibold ml-5 mr-3 text-white'>chỉ còn</div>
            <div className='flex flex-col items-center bg-[#000000b8] py-1 px-2 rounded-lg mr-3'>
              <span className='font-bold text-amber-400' id='days'>
                11
              </span>
              <span className='text-white'>ngày</span>
            </div>
            <div className='flex flex-col items-center bg-[#000000b8] py-1 px-2 rounded-lg mr-3'>
              <span className='font-bold text-amber-400' id='hours'>
                20
              </span>
              <span className='text-white'>giờ</span>
            </div>
            <div className='flex flex-col items-center bg-[#000000b8] py-1 px-2 rounded-lg mr-3'>
              <span className='font-bold text-amber-400' id='minutes'>
                26
              </span>
              <span className='text-white'>phút</span>
            </div>
            <div className='flex flex-col items-center bg-[#000000b8] py-1 px-2 rounded-lg'>
              <span className='font-bold text-amber-400' id='seconds'>
                36
              </span>
              <span className='text-white'>giây</span>
            </div>
          </div>
          <Swiper
            className='p-6'
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
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='mb-20'>
          <h2 className='font-extrabold text-xl text-center mb-5'>LAPTOP DOANH NHÂN CAO CẤP</h2>
          <div className='grid grid-cols-5 gap-3 p-6'>
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductItem key={index} isHover />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
