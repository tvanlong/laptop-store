import { omit } from 'lodash'
import PropTypes from 'prop-types'
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
    <div className='hidden lg:flex items-center rounded-lg border border-gray-300 p-6'>
      <div className='text-sm'>Sắp xếp theo:</div>
      <div className='ml-3 flex'>
        <div
          className={
            queryParamsConfig.sort === 'createdAt' && queryParamsConfig.order === 'old'
              ? 'mr-3 rounded-lg bg-[#007745] p-2 text-sm text-white select-none'
              : 'mr-3 cursor-pointer rounded-lg border border-gray-300 p-2 text-sm hover:border hover:border-[#007745]'
          }
          onClick={() => handleOrderBy('createdAt', 'old')}
        >
          Mặc định
        </div>
        <div
          className={
            queryParamsConfig.sort === 'createdAt' && queryParamsConfig.order === 'new'
              ? 'mr-3 rounded-lg bg-[#007745] p-2 text-sm text-white select-none'
              : 'mr-3 cursor-pointer rounded-lg border border-gray-300 p-2 text-sm hover:border hover:border-[#007745]'
          }
          onClick={() => handleOrderBy('createdAt', 'new')}
        >
          Hàng mới nhất
        </div>
        <div
          className={
            queryParamsConfig.sort === 'price' && queryParamsConfig.order === 'asc'
              ? 'mr-3 rounded-lg bg-[#007745] p-2 text-sm text-white select-none'
              : 'mr-3 cursor-pointer rounded-lg border border-gray-300 p-2 text-sm hover:border hover:border-[#007745]'
          }
          onClick={() => handleOrderBy('price', 'asc')}
        >
          Giá thấp đến cao
        </div>
        <div
          className={
            queryParamsConfig.sort === 'price' && queryParamsConfig.order === 'desc'
              ? 'mr-3 rounded-lg bg-[#007745] p-2 text-sm text-white select-none'
              : 'mr-3 cursor-pointer rounded-lg border border-gray-300 p-2 text-sm hover:border hover:border-[#007745]'
          }
          onClick={() => handleOrderBy('price', 'desc')}
        >
          Giá cao đến thấp
        </div>
        {queryParamsConfig.sort && queryParamsConfig.order && (
          <div
            className='mr-3 flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 p-2 text-sm hover:border hover:border-[#007745]'
            onClick={handleRemoveFilter}
          >
            <svg
              className='h-4 w-4 text-gray-800'
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

SortProductList.propTypes = {
  pathname: PropTypes.string,
  queryParamsConfig: PropTypes.object
}

export default SortProductList
