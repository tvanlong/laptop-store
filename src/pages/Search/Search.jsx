import { useEffect } from 'react'
import FilterDropdown from '~/components/FilterDropdown/FilterDropdown'
import ProductItem from '~/components/ProductItem'
import { priceOptions, ramOptions, screenSizeOptions } from '~/constants/options'

function Search({ setProgress }) {
  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-bold uppercase'>Từ khóa tìm kiếm: Laptop Dell</h2>
        <nav className='flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='cursor-pointer inline-flex items-center opacity-60'>
              <a className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'>
                <svg
                  className='w-3 h-3 mr-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                </svg>
                Trang chủ
              </a>
            </li>
            <li className='cursor-pointer opacity-60'>
              <div className='flex items-center'>
                <svg
                  className='w-3 h-3 text-gray-400 mx-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
                <a className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'>Sản phẩm</a>
              </div>
            </li>
            <li className='cursor-pointer' aria-current='page opacity-60'>
              <div className='flex items-center'>
                <svg
                  className='w-3 h-3 text-gray-400 mx-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
                <span className='ml-1 text-sm text-gray-500 md:ml-2'>Laptop Dell</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className='grid grid-cols-12 gap-8 mt-10'>
        <div className='col-span-2'>
          <div className='border border-gray-300 px-3 py-5 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Lọc sản phẩm</h3>
            <FilterDropdown title='Khoảng giá' options={priceOptions} />
            <FilterDropdown title='Kích thước màn hình' options={screenSizeOptions} />
            <FilterDropdown title='RAM' options={ramOptions} />
          </div>
        </div>
        <div className='col-span-10'>
          <div className='flex items-center border border-gray-300 rounded-lg p-6'>
            <div className='text-sm'>Sắp xếp theo:</div>
            <div className='flex ml-3'>
              <a
                className='text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                data-sort=''
              >
                Nổi bật
              </a>
              <a
                className='text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                data-sort='new'
              >
                Hàng mới nhất
              </a>
              <a
                className='text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                data-sort='a'
              >
                Giá thấp đến cao
              </a>
              <a
                className='text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                data-sort='z'
              >
                Giá cao đến thấp
              </a>
            </div>
          </div>
          <div className='grid grid-cols-4 gap-3 p-6 mb-10'>
            <ProductItem isHover />
          </div>
          <nav aria-label='Page navigation example'>
            <ul className='flex items-center justify-center gap-3 -space-x-px h-10 text-base'>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  <span className='sr-only'>Previous</span>
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 1 1 5l4 4'
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href='#'
                  aria-current='page'
                  className='z-20 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                >
                  <span className='sr-only'>Next</span>
                  <svg
                    className='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
          {/* <div className='mt-10 text-lg font-bold text-center'>Không có sản phẩm nào</div> */}
        </div>
      </div>
    </div>
  )
}

export default Search
