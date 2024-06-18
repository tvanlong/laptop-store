import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

function SlickSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  }

  return (
    <div className='slider-container mb-20 mt-10 px-4'>
      <h2 className='mb-10 text-center text-lg lg:text-2xl font-bold'>Danh mục sản phẩm</h2>
      <Slider {...settings}>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop Dell</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/thinkpa_638159618614796253-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Lenovo Thinkpad</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop HP</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop Dell</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/asu_638159618788111097-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop Asus</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/samsun_638159618865042754-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop Samsung</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/icon/no_image.gif'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop LG</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/surfac_638159618953001630-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Surface</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/desig_638159619107981928-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop Đồ họa</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/gamin_638159619022147369-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Laptop gaming</div>
          </div>
        </div>
        <div>
          <div className='flex flex-wrap items-center justify-center'>
            <img
              className='w-[100px] h-[100px] md:w-[150px] md:h-[150px]'
              src='https://laptopkhanhtran.vn/pic/product/p_638159619247537734-w.150-q.80.jpg'
              alt=''
            />
            <div className='mt-2 text-xs xl:text-base font-bold uppercase'>Linh kiện máy tính</div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default SlickSlider
