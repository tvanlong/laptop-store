import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pagination } from 'flowbite-react'
import { useEffect } from 'react'
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { getAllVersionsByCategoryId } from '~/apis/versions.api'
import FilterDropdown from '~/components/FilterDropdown'
import ProductItem from '~/components/ProductItem'
import { priceOptions, ramOptions, screenSizeOptions } from '~/constants/options'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'

function Category({ setProgress }) {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const queryParamsConfig = useQueryParamsConfig()
  const { data } = useQuery({
    queryKey: ['versions', categoryId, queryParamsConfig],
    queryFn: () => getAllVersionsByCategoryId(categoryId, queryParamsConfig),
    placeholderData: keepPreviousData
  })

  const versions = data?.data?.data?.docs || []

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const onPageChange = (page) => {
    navigate({
      pathname: `/category/${categoryId}`,
      search: createSearchParams({
        ...queryParamsConfig,
        page
      }).toString()
    })
  }

  const handleOrderBy = (sort_type, order_by) => {
    navigate({
      pathname: `/category/${categoryId}`,
      search: createSearchParams({
        ...queryParamsConfig,
        sort: sort_type,
        order: order_by
      }).toString()
    })
  }

  const handleRemoveFilter = () => {
    navigate(`/category/${categoryId}`)
  }

  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-bold uppercase'>Laptop Dell</h2>
        <nav className='flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='cursor-pointer inline-flex items-center opacity-60'>
              <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'>
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
              </Link>
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
                <div className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'>Sản phẩm</div>
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
                <Link to={`/category/${categoryId}`} className='ml-1 text-sm text-gray-500 md:ml-2'>
                  Laptop Dell
                </Link>
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
              <div
                className={
                  queryParamsConfig.sort === 'createdAt' && queryParamsConfig.order === 'old'
                    ? 'text-sm p-2 bg-[#007745] text-white rounded-lg mr-3'
                    : 'text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                }
                onClick={() => handleOrderBy('createdAt', 'old')}
              >
                Mặc định
              </div>
              <div
                className={
                  queryParamsConfig.sort === 'createdAt' && queryParamsConfig.order === 'new'
                    ? 'text-sm p-2 bg-[#007745] text-white rounded-lg mr-3'
                    : 'text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                }
                onClick={() => handleOrderBy('createdAt', 'new')}
              >
                Hàng mới nhất
              </div>
              <div
                className={
                  queryParamsConfig.sort === 'price' && queryParamsConfig.order === 'asc'
                    ? 'text-sm p-2 bg-[#007745] text-white rounded-lg mr-3'
                    : 'text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                }
                onClick={() => handleOrderBy('price', 'asc')}
              >
                Giá thấp đến cao
              </div>
              <div
                className={
                  queryParamsConfig.sort === 'price' && queryParamsConfig.order === 'desc'
                    ? 'text-sm p-2 bg-[#007745] text-white rounded-lg mr-3'
                    : 'text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                }
                onClick={() => handleOrderBy('price', 'desc')}
              >
                Giá cao đến thấp
              </div>
              {queryParamsConfig.sort && queryParamsConfig.order && (
                <div
                  className='flex items-center gap-2 text-sm p-2 border border-gray-300 rounded-lg mr-3 cursor-pointer hover:border hover:border-[#007745]'
                  onClick={handleRemoveFilter}
                >
                  <svg
                    className='w-4 h-4 text-gray-800 dark:text-white'
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
                      d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                    />
                  </svg>
                  <span>Xóa bộ lọc</span>
                </div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-4 gap-3 p-6 mb-10'>
            {versions.map((version) => (
              <ProductItem key={version._id} version={version} isHover />
            ))}
          </div>
          {data?.data?.data.totalPages > 1 && (
            <div className='flex overflow-x-auto sm:justify-center mt-10'>
              <Pagination
                className='text-sm'
                currentPage={queryParamsConfig.page}
                totalPages={data?.data?.data.totalPages}
                onPageChange={onPageChange}
                previousLabel='Trang trước'
                nextLabel='Trang sau'
              />
            </div>
          )}
          {versions.length === 0 && <div className='mt-10 text-lg font-bold text-center'>Không có sản phẩm nào</div>}
        </div>
      </div>
    </div>
  )
}

export default Category
