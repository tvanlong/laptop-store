import { omit } from 'lodash'
import { createSearchParams, useNavigate } from 'react-router-dom'

function SortProductList({ pathname, queryParamsConfig }) {
  const navigate = useNavigate()
  const handleOrderBy = (sort_type, order_by) => {
    navigate({
      pathname: pathname,
      search: createSearchParams({
        ...queryParamsConfig,
        sort: sort_type,
        order: order_by
      }).toString()
    })
  }

  const handleRemoveFilter = () => {
    navigate({
      pathname: pathname,
      search: createSearchParams(omit(queryParamsConfig, ['sort', 'order'])).toString()
    })
  }
  return (
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
  )
}

export default SortProductList
