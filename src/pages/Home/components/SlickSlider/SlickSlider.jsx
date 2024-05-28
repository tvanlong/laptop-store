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
    <div className='px-4 mt-10 mb-20 slider-container'>
      <h2 className='text-center font-bold text-2xl mb-10'>Danh mục sản phẩm</h2>
      <Slider {...settings}>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop Dell</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/thinkpa_638159618614796253-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Lenovo Thinkpad</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop HP</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/h_638159618706283760-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop Dell</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/asu_638159618788111097-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop Asus</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/samsun_638159618865042754-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop Samsung</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img
              className='w-[150px] h-[150px] rounded-lg'
              src='https://laptopkhanhtran.vn/pic/icon/no_image.gif'
              alt=''
            />
            <div className='uppercase font-bold mt-2'>Laptop LG</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/surfac_638159618953001630-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Surface</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/desig_638159619107981928-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop Đồ họa</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/gamin_638159619022147369-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Laptop gaming</div>
          </a>
        </div>
        <div>
          <a className='flex flex-wrap justify-center items-center'>
            <img src='https://laptopkhanhtran.vn/pic/product/p_638159619247537734-w.150-q.80.jpg' alt='' />
            <div className='uppercase font-bold mt-2'>Linh kiện máy tính</div>
          </a>
        </div>
      </Slider>
    </div>
  )
}

export default SlickSlider
