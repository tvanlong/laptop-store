import { useEffect } from 'react'

function ChangePassword({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return (
    <div className='max-w-[1400px] mx-auto mt-10 mb-20'>
      <div className='grid grid-cols-5 gap-8 px-6'>
        <div className='col-span-1'>
          <div className='flex items-center pb-6 border-b border-gray-200'>
            <img
              className='w-12 h-12 rounded-full'
              src='https://i.pinimg.com/736x/9a/63/e1/9a63e148aaff53532b045f6d1f09d762.jpg'
              alt='avatar'
            />
            <span className='text-sm font-semibold ml-5'>Nguyễn Văn A</span>
          </div>
          <ul className='list-none mt-5'>
            <li className='py-2'>
              <i className='fa-solid fa-user w-6 h-6 text-center text-gray-600'></i>
              <a className='text-gray-500 hover:text-gray-900'>Tài khoản của tôi</a>
            </li>
            <li className='py-2'>
              <i className='fa-solid fa-receipt w-6 h-6 text-center text-gray-600'></i>
              <a className='text-gray-500 hover:text-gray-900'>Đơn mua</a>
            </li>
            <li className='py-2'>
              <i className='fa-solid fa-key w-6 h-6 text-center text-gray-600'></i>
              <a className='text-gray-500 hover:text-gray-900'>Đổi mật khẩu</a>
            </li>
          </ul>
        </div>
        <div className='col-span-4'>
          <form className='p-4' method='POST'>
            <div className='relative mb-6'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Mật khẩu mới
              </label>
              <input
                name='password'
                type='password'
                id='password'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='show-pass w-6 h-6 absolute right-[10px] top-[36px]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='hide-pass w-6 h-6 absolute right-[10px] top-[36px] hidden'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            </div>
            <div className='relative mb-6'>
              <label htmlFor='password_confirmation' className='block mb-2 text-sm font-medium text-gray-900'>
                Xác nhận mật khẩu
              </label>
              <input
                name='password_confirmation'
                type='password'
                id='password_confirmation'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='show-pass w-6 h-6 absolute right-[10px] top-[36px]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='hide-pass w-6 h-6 absolute right-[10px] top-[36px] hidden'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Cập nhật lại thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
