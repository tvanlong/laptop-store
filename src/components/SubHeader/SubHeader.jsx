import { Link } from 'react-router-dom'

function SubHeader() {
  return (
    <header className='h-[88px]'>
      <div className='fixed left-0 right-0 top-0 z-20 h-[88px] bg-[#242525]'>
        <div className='m-auto flex h-full max-w-[95%] items-center justify-between gap-8'>
          <Link to='/' className='cursor-pointer font-semibold text-white hover:underline'>
            Trở về
          </Link>
          <Link to='/'>
            <img
              className='cursor-pointer'
              src='https://laptopkhanhtran.vn/pic/banner/logo_6368_638173418442942155.png'
              alt='logo'
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SubHeader
