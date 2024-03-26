/* eslint-disable react/no-unescaped-entities */
function ProductItem({ isHover = false }) {
  return (
    <div className={'bg-white rounded-lg p-4' + (isHover ? ' hover:border hover:border-[#007745]' : '')}>
      <a className=''>
        <img
          src='https://laptopkhanhtran.vn/pic/product/dell-7780_638417823695647983-w.250-q.80.png'
          alt=''
          className='rounded-lg'
        />
        <div className='font-bold text-sm line-clamp-2 my-2'>
          Laptop Dell Precision 7780 Core i9-13950HX - RAM 64GB - SSD 1TB - NVIDIA RTX 3500 Ada - Màn 17.3 FHD+
        </div>
        <div className='flex my-2'>
          <div className='text-center text-xs py-1 bg-[#f4f4f4] rounded-lg w-20 border--[#dcdcdc] border mr-3'>
            16GB
          </div>
          <div className='text-center text-xs py-1 bg-[#f4f4f4] rounded-lg w-20 border--[#dcdcdc] border'>1TB SSD</div>
        </div>
        <ol className='my-2 list-none max-w-md space-y-1 text-gray-500 list-inside'>
          <li className='text-xs truncate'>
            <span className='font-semibold text-gray-900'>Màn hình </span>
            17.3" FHD 1920x1080 WVA, 60Hz, anti-glare, non-touch, 99% DCI-P3, 500 nits, RGB Camera, with Mic
          </li>
          <li className='text-xs truncate'>
            <span className='font-semibold text-gray-900'>CPU </span>
            17.3" FHD 1920x1080 WVA, 60Hz, anti-glare, non-touch, 99% DCI-P3, 500 nits, RGB Camera, with Mic
          </li>
          <li className='text-xs truncate'>
            <span className='font-semibold text-gray-900'>Card </span>
            17.3" FHD 1920x1080 WVA, 60Hz, anti-glare, non-touch, 99% DCI-P3, 500 nits, RGB Camera, with Mic
          </li>
          <li className='text-xs truncate'>
            <span className='font-semibold text-gray-900'>Pin </span>
            17.3" FHD 1920x1080 WVA, 60Hz, anti-glare, non-touch, 99% DCI-P3, 500 nits, RGB Camera, with Mic
          </li>
          <li className='text-xs truncate'>
            <span className='font-semibold text-gray-900'>Tình trạng </span>
            17.3" FHD 1920x1080 WVA, 60Hz, anti-glare, non-touch, 99% DCI-P3, 500 nits, RGB Camera, with Mic
          </li>
        </ol>
        <div className='flex justify-between my-2 text-sm'>
          <div className='text-red-700 font-bold'>63.900.000 đ</div>
          <div className='font-bold text-gray-500 line-through'>88.900.000 đ</div>
          <div className='text-red-700 font-bold'>-28%</div>
        </div>
        <div className='flex'>
          <img src='https://laptopkhanhtran.vn/css/icon/arrange-square.svg' alt='' className='mr-2' />
          <span className='text-sm'>So sánh</span>
        </div>
      </a>
    </div>
  )
}

export default ProductItem
