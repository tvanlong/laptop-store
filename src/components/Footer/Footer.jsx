function Footer() {
  return (
    <footer className='bg-[#f5f6f6] py-10'>
      <div className='max-w-[1400px] mx-auto grid grid-cols-4 gap-8 px-6'>
        <div className=''>
          <h3 className='font-bold text-lg mb-6'>Laptop Khánh Trần</h3>
          <p className='text-sm mb-6 text-justify'>
            Laptop Khánh Trần rất hân hạnh được phục vụ quý khách. Chúng tôi sẽ cố gắng hơn nữa để cảm ơn sự tin tưởng
            quý khách đã dành cho Laptop Khánh Trần.
          </p>
          <img src='https://laptopkhanhtran.vn/images/BCT.jpg' alt='' />
        </div>
        <div className=''>
          <h3 className='font-bold text-lg mb-6'>Thông tin liên hệ</h3>
          <ol className='my-2 list-none max-w-md space-y-1 text-gray-500 list-inside'>
            <li className='text-sm'>
              <span className='font-semibold text-gray-900'>Địa chỉ:</span>
              26 Ngõ 165 Thái Hà, Láng Hạ, Đống Đa, Hà Nội
            </li>
            <li className='text-sm'>
              <span className='font-semibold text-gray-900'>Điện thoại:</span>
              0936 23 1234
            </li>
            <li className='text-sm'>
              <span className='font-semibold text-gray-900'>Email:</span>
              khanh.prolap126@gmail.com
            </li>
            <li className='text-sm'>
              <span className='font-semibold text-gray-900'>Website:</span>
              https://laptopkhanhtran.vn/
            </li>
          </ol>
        </div>
        <div className=''>
          <h3 className='font-bold text-lg mb-6'>Chính sách và Quy định</h3>
          <div className='text-sm text-gray-500 mb-2'>Chính sách giao hàng và kiểm hàng</div>
          <div className='text-sm text-gray-500 mb-2'>Chính sách đổi trả</div>
          <div className='text-sm text-gray-500 mb-2'>Chính sách thanh toán</div>
          <div className='text-sm text-gray-500 mb-2'>Chính sách bảo hành</div>
          <div className='text-sm text-gray-500 mb-2'>Chính sách bảo mật thông tin</div>
        </div>
        <div className=''>
          <h3 className='font-bold text-lg mb-6'>Đăng ký nhận thông báo</h3>
          <div className='text-sm text-gray-500 mb-2'>Đăng ký nhận thông báo để không bỏ lỡ bất kỳ khuyến mại nào</div>
          <form>
            <label htmlFor='search' className='mb-2 text-sm font-medium text-gray-900 sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
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
              </div>
              <input
                type='search'
                id='search'
                className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50'
                placeholder='Search'
                required
              />
              <button
                type='submit'
                className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  )
}

export default Footer
