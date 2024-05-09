import { useEffect } from 'react'

function Checkout({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <h2 className='font-bold text-3xl text-center'>Thanh Toán</h2>
      <p className='text-lg opacity-60 text-center'>
        Vui lòng kiểm tra thông tin khách hàng, thông tin giỏ hành trước khi đặt hàng
      </p>
      <div className='grid grid-cols-5 gap-8 mt-20'>
        <div className='col-span-3'>
          <h3 className='text-xl font-bold'>Thông tin khách hàng</h3>
          <form method='POST'>
            <div className='my-3'>
              <div className='text-lg opacity-60 mb-2'>Họ tên</div>
              <input
                name='cus_name'
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                placeholder='Nhập họ tên'
              />
            </div>
            <div className='my-3'>
              <div className='text-lg opacity-60 mb-2'>Email</div>
              <input name='email' disabled type='text' className='w-full border border-gray-300 rounded-lg p-3' />
            </div>
            <div className='my-3'>
              <div className='text-lg opacity-60 mb-2'>Địa chỉ</div>
              <input
                name='cus_address'
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                placeholder='Nhập địa chỉ'
              />
            </div>
            <div className='my-3'>
              <div className='text-lg opacity-60 mb-2'>Số điện thoại</div>
              <input
                name='cus_phone'
                type='text'
                className='w-full border border-gray-300 rounded-lg p-3'
                placeholder='Nhập số điện thoại'
              />
            </div>
            <div className='my-3 text-sm'>Vui lòng khai đầy đủ thông tin trước khi đặt hàng!</div>
            <div className='my-3 text-sm'>
              Thay đổi thông tin: <strong>Tài khoản</strong> -- <strong>Tài khoản của tôi</strong>
            </div>
            <div className='my-3'>
              <button
                type='submit'
                className='bg-blue-500 w-full rounded-lg text-white font-bold text-lg text-center py-3 px-2 mt-8'
              >
                Đặt hàng
              </button>
            </div>
          </form>
        </div>
        <div className='col-span-2'>
          <h3 className='text-xl font-bold'>Giỏ hàng</h3>
          <div className='border-2 border-gray-200 rounded-lg p-4 mt-8'>
            <ul className='list-none'>
              <li className='text-sm flex items-center justify-between my-3'>
                <img className='w-16 h-16 mr-4' src='' alt='' />
                <div className=''>
                  <p className='font-semibold'>
                    Laptop Dell Inspiron 3501 i3 1005G1/4GB/256GB/15.6" FHD/Win10 (N3501A)
                  </p>
                  <p className='font-semibold opacity-60'>2.000.000 VNĐ x 2</p>
                </div>
                <div className='font-semibold opacity-60 ml-4'>2.000.000 VNĐ</div>
              </li>
              <li className='text-sm flex items-center justify-between my-5 py-3 border-t-2 border-gray-200'>
                <div className=''>
                  <p className='font-semibold underline text-lg'>Tổng thành tiền</p>
                </div>
                <div className='font-semibold text-lg text-red-700 opacity-60'>2.000.000 VNĐ</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
