function Register() {
  return (
    <div className='bg-white py-16'>
      <div className='max-w-[600px] form-shadow px-12 py-8 m-auto'>
        <h2 className='uppercase text-lg font-normal text-center mb-7 cursor-pointer'>
          <span className='text-[#ed3324] border-b-2 py-2 px-4 border-b-[#ed3324]'>Đăng nhập</span>
        </h2>
        <form action=''>
          <div className='flex flex-col gap-4'>
            <input
              placeholder='Họ tên'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            />
            <input
              placeholder='Số điện thoại'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            />
            <input
              placeholder='Email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            />
            <input
              placeholder='Mật khẩu'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            />
            <input
              placeholder='Nhập lại mật khẩu'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            />
          </div>
          <button className='bg-[#ec2127] flex items-center justify-center w-full p-4 rounded-md hover:opacity-80 mt-8'>
            <span className='text-white font-medium text-xl uppercase'>Đăng ký</span>
            <svg
              className='w-6 h-6 text-white ml-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
