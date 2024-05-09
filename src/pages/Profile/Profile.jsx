import { useEffect } from 'react'

function Profile({ setProgress }) {
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
            <span className='text-sm font-semibold ml-5'>Nguyen Van A</span>
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
            <div className='mb-6'>
              <label htmlFor='cus_name' className='block mb-2 text-sm font-medium text-gray-900'>
                Tên khách hàng
              </label>
              <input
                name='cus_name'
                type='text'
                id='cus_name'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Địa chỉ email
              </label>
              <input
                name='email'
                type='email'
                id='email'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='cus_phone' className='block mb-2 text-sm font-medium text-gray-900'>
                Số điện thoại
              </label>
              <input
                name='cus_phone'
                type='text'
                id='cus_phone'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='cus_address' className='block mb-2 text-sm font-medium text-gray-900'>
                Địa chỉ nhận hàng
              </label>
              <input
                name='cus_address'
                type='text'
                id='cus_address'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              />
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

export default Profile
