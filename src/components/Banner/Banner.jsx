import { Carousel } from 'flowbite-react'

function Banner() {
  return (
    <div className='mt-10 mb-20'>
      <div className='grid grid-cols-12 px-6'>
        <div className='col-span-8'>
          <div id='indicators-carousel' className='relative z-0 w-full' data-carousel='static'>
            <div className='h-[27.2rem]'>
              <Carousel>
                <img
                  src='https://laptopkhanhtran.vn/pic/banner/Tet_Banne_638406757890754137-w.900-q.100.png'
                  alt='...'
                />
                <img
                  src='https://laptopkhanhtran.vn/pic/banner/tra-gop-l_638265641712946875-w.900-q.100.jpg'
                  alt='...'
                />
                <img
                  src='https://laptopkhanhtran.vn/pic/banner/x1-nano-g_638265642050940512-w.900-q.100.jpg'
                  alt='...'
                />
                <img
                  src='https://laptopkhanhtran.vn/pic/banner/dell-ins-_638265639915152281-w.900-q.100.jpg'
                  alt='...'
                />
                <img
                  src='https://laptopkhanhtran.vn/pic/banner/Free-shi__638265641166041347-w.900-q.100.jpg'
                  alt='...'
                />
              </Carousel>
            </div>
          </div>
        </div>
        <div className='col-span-4 ml-5'>
          <div className='h-96 flex flex-col gap-3.5'>
            <div className=''>
              <img
                className='w-full rounded-lg'
                src='https://laptopkhanhtran.vn/pic/banner/Banne_638_638265643831519781-w.455-q.80.jpg'
                alt=''
              />
            </div>
            <div className=''>
              <img
                className='w-full rounded-lg'
                src='https://laptopkhanhtran.vn/pic/banner/banner_63_638265643449698805-w.455-q.80.jpg'
                alt=''
              />
            </div>
            <div className=''>
              <img
                className='w-full rounded-lg'
                src='https://laptopkhanhtran.vn/pic/banner/banner_63_638265642576398741-w.455-q.80.jpg'
                alt=''
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
