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
        'bg-white rounded-lg p-6' +
        (isHover
          ? ' hover:border hover:border-[#007745] transition ease-in-out delay-150 hover:-translate-y-1 duration-300'
          : '')
      }
      onMouseEnter={handlePrefetchOnHover}
    >
      <Link to={`/product/${version._id}`}>
        <img src={version.product.images[0]} alt={`${version.product.name} ${version.name}`} className='rounded-lg' />
        <div className='font-bold text-sm line-clamp-2 my-2'>
          {version?.product.name} {version?.name}
        </div>
        <div className='flex my-2'>
          <div className='text-center text-xs py-1 bg-[#f4f4f4] rounded-lg w-20 border-[#dcdcdc] border mr-3'>DDR4</div>
          <div className='text-center text-xs py-1 bg-[#f4f4f4] rounded-lg w-20 border-[#dcdcdc] border'>SSD</div>
        </div>
        <ol className='my-2 list-none max-w-md space-y-1 text-gray-500 list-inside'>
          {version?.description.map((spec) => {
            const [key, value] = spec.split(':')
            return (
              <li key={key} className='text-xs truncate'>
                <span className='font-semibold text-gray-900'>{key} </span>
                {value}
              </li>
            )
          })}
        </ol>
        <div className='flex justify-between my-2 text-sm'>
          <div className='text-red-700 font-bold'>{formatCurrency(version.current_price)} đ</div>
          <div className='font-bold text-gray-500 line-through'>{formatCurrency(version.old_price)} đ</div>
          <div className='text-red-700 font-bold'>
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
