function Footer() {
  return (
    <footer className='bg-[#f5f6f6] py-10'>
      <div className='mx-auto grid max-w-[1400px] grid-cols-4 gap-8 px-6'>
        <div className=''>
          <h3 className='mb-6 text-lg font-bold'>Laptop Khánh Trần</h3>
          <p className='mb-6 text-justify text-sm'>
            Laptop Khánh Trần rất hân hạnh được phục vụ quý khách. Chúng tôi sẽ cố gắng hơn nữa để cảm ơn sự tin tưởng
            quý khách đã dành cho Laptop Khánh Trần.
          </p>
          <img src='https://laptopkhanhtran.vn/images/BCT.jpg' alt='' />
        </div>
        <div className=''>
          <h3 className='mb-6 text-lg font-bold'>Thông tin liên hệ</h3>
          <ol className='my-2 max-w-md list-inside list-none space-y-1 text-gray-500'>
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
          <h3 className='mb-6 text-lg font-bold'>Chính sách và Quy định</h3>
          <div className='mb-2 text-sm text-gray-500'>Chính sách giao hàng và kiểm hàng</div>
          <div className='mb-2 text-sm text-gray-500'>Chính sách đổi trả</div>
          <div className='mb-2 text-sm text-gray-500'>Chính sách thanh toán</div>
          <div className='mb-2 text-sm text-gray-500'>Chính sách bảo hành</div>
          <div className='mb-2 text-sm text-gray-500'>Chính sách bảo mật thông tin</div>
        </div>
        <div className=''>
          <h3 className='mb-6 text-lg font-bold'>Đăng ký nhận thông báo</h3>
          <div className='mb-2 text-sm text-gray-500'>Đăng ký nhận thông báo để không bỏ lỡ bất kỳ khuyến mại nào</div>
          <form>
            <label htmlFor='search' className='sr-only mb-2 text-sm font-medium text-gray-900'>
              Search
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg
                  className='h-4 w-4 text-gray-500'
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
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900'
                placeholder='Search'
                required
              />
              <button
                type='submit'
                className='absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800'
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
