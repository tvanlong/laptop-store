import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function SlickSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }

  return (
    <div className='slider-container mb-20 mt-10 px-4'>
      <h2 className='mb-10 text-center text-2xl font-bold'>Danh mục sản phẩm</h2>
      <Slider {...settings}>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop Dell</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/thinkpa_638159618614796253-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Lenovo Thinkpad</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop HP</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop Dell</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/asu_638159618788111097-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop Asus</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/samsun_638159618865042754-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop Samsung</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img
              className='h-[150px] w-[150px] rounded-lg'
              src='https://laptopkhanhtran.vn/pic/icon/no_image.gif'
              alt=''
            />
            <div className='mt-2 font-bold uppercase'>Laptop LG</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/surfac_638159618953001630-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Surface</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/desig_638159619107981928-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop Đồ họa</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/gamin_638159619022147369-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Laptop gaming</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap items-center justify-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/p_638159619247537734-w.150-q.80.jpg' alt='' />
            <div className='mt-2 font-bold uppercase'>Linh kiện máy tính</div>
          </a>
        </div>
      </Slider>
    </div>
  )
}

export default SlickSlider
