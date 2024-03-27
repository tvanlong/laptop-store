function Header() {
  return (
    <>
      <nav className='sticky z-20 top-0 left-0 right-0 bg-[#242525] border-gray-200'>
        <div className='max-w-[1400px] mx-auto p-6 flex flex-wrap items-center justify-between'>
          <a className='basis-1/5 items-center'>
            <img
              src='https://laptopkhanhtran.vn/pic/banner/logo_6368_638173418442942155.png'
              className='h-10 mr-3'
              alt='Flowbite Logo'
            />
          </a>
          <div className='basis-2/5 flex'>
            <form className='w-4/5 relative hidden md:block' method='POST'>
              <button type='submit' className='absolute inset-y-0 left-0 z-10 flex items-center pl-3'>
                <svg
                  className='w-4 h-4 text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </button>
              <input
                type='text'
                name='keyword'
                id='search-navbar'
                className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50'
                placeholder='Bạn muốn tìm sản phẩm gì...'
              />
            </form>
          </div>
          <div className='justify-between hidden w-full md:flex md:w-auto' id='navbar-search'>
            <ul className='flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-6 md:mt-0 md:border-0 bg-[#242525]'>
              <li>
                <a
                  href='#'
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                  aria-current='page'
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                >
                  Sản phẩm
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                >
                  Tin tức
                </a>
              </li>

              <li>
                <a
                  href="{{ route('login1') }}"
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                >
                  Đăng nhập
                </a>
              </li>

              {/* <li>
                            <a href="{{ route('client.profile') }}" class="text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0">
                                Tài khoản
                            </a>
                        </li>
                        <li>
                            <a href="{{ route('logout1') }}" class="text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0">
                                Đăng xuất
                            </a>
                        </li> */}
            </ul>
          </div>
          <div className='relative text-white ms-12'>
            <a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              <div className='absolute p-1 w-5 h-5 bg-red-500 rounded-full top-[-10px] right-[-10px] text-xs flex items-center justify-center'></div>
            </a>
          </div>
        </div>
      </nav>
      <div className='sticky z-20 top-[88px] left-0 right-0 flex bg-[#2e3030] h-14'>
        <ul className='flex w-full items-center justify-between px-32'>
          {Array.from({ length: 10 }).map((_, index) => (
            <li
              key={index}
              className='relative flex items-center text-white opacity-60 hover:opacity-100 h-full cursor-pointer group'
            >
              <a className='text-xs font-semibold uppercase'>Laptop Dell</a>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-3 h-3 ml-1'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
              <div className='hidden absolute top-[100%] left-0 drop-shadow-xl bg-white w-max rounded-lg group-hover:block'>
                <ul className=''>
                  <li className='py-3 px-6 text-sm text-gray-900 hover:text-green-700'>
                    <a className='font-semibold'>Dell Inspiron</a>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Header
