function SubHeader() {
  return (
    <header className='h-[88px]'>
      <div className='bg-[#242525] h-[88px] fixed top-0 left-0 right-0 z-20'>
        <div className='h-full max-w-[95%] m-auto flex items-center justify-between gap-8'>
          <div className='font-semibold text-white cursor-pointer hover:underline'>Trở về</div>
          <img
            className='cursor-pointer'
            src='https://laptopkhanhtran.vn/pic/banner/logo_6368_638173418442942155.png'
            alt=''
          />
        </div>
      </div>
    </header>
  )
}

export default SubHeader
