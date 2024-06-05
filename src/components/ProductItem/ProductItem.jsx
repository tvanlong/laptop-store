import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getVersionById } from '~/apis/versions.api'
import { formatCurrency } from '~/utils/format'

function ProductItem({ version, isHover = false }) {
  const queryClient = useQueryClient()
  const detailQuery = { queryKey: ['version', version._id], queryFn: () => getVersionById(version._id) }

  const handlePrefetchOnHover = () => {
    queryClient.prefetchQuery(detailQuery)
  }

  return (
    <div
      className={
        'rounded-lg bg-white p-6' +
        ' ' +
        (isHover
          ? 'transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:border hover:border-[#007745]'
          : '')
      }
      onMouseEnter={handlePrefetchOnHover}
    >
      <Link to={`/product/${version._id}`}>
        <img
          src={version.product.images[0]}
          alt={`${version.product.name} ${version.name}`}
          className='rounded-lg h-28 w-52 object-contain'
        />
        <div className='my-2 line-clamp-2 text-sm font-bold'>
          {version?.product.name} ({version?.name})
        </div>
        <div className='my-2 flex'>
          <div className='mr-3 w-20 rounded-lg border border-[#dcdcdc] bg-[#f4f4f4] py-1 text-center text-xs'>DDR4</div>
          <div className='w-20 rounded-lg border border-[#dcdcdc] bg-[#f4f4f4] py-1 text-center text-xs'>SSD</div>
        </div>
        <ol className='my-2 max-w-md list-inside list-none space-y-1 text-gray-500'>
          {version?.description.map((spec) => {
            const [key, value] = spec.split(':')
            return (
              <li key={key} className='truncate text-xs'>
                <span className='font-semibold text-gray-900'>{key} </span>
                {value}
              </li>
            )
          })}
        </ol>
        <div className='my-2 flex justify-between text-sm'>
          <div className='font-bold text-red-700'>{formatCurrency(version.current_price)} đ</div>
          <div className='font-bold text-gray-500 line-through'>{formatCurrency(version.old_price)} đ</div>
          <div className='font-bold text-red-700'>
            -{Math.round(((version.old_price - version.current_price) / version.old_price) * 100)}%
          </div>
        </div>
        <div className='flex'>
          <img src='https://laptopkhanhtran.vn/css/icon/arrange-square.svg' alt='' className='mr-2' />
          <span className='text-sm'>So sánh</span>
        </div>
      </Link>
    </div>
  )
}

export default ProductItem
