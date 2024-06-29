import PropTypes from 'prop-types'
import { useState } from 'react'
import { cpuOptions, memoryOptions, priceOptions, ramOptions, screenSizeOptions, vgaOptions } from '~/constants/options'
import FilterOption from './FilterOption'

function FilterProductMobile({ queryParamsConfig }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        className='flex items-center gap-3 w-full text-left py-2 px-4 text-sm font-medium text-gray-700'
        onClick={() => setIsOpen(!isOpen)}
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
            strokeWidth='2'
            d='M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z'
          />
        </svg>
        Lọc sản phẩm
      </button>
      <div
        className={
          'fixed top-[88px] left-0 z-10 w-60 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out overflow-scroll no-scrollbar ' +
          (isOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <h3 className='text-sm font-semibold'>Lọc sản phẩm</h3>
          <button onClick={() => setIsOpen(false)}>
            <svg
              className='w-4 h-4 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path stroke='currentColor' strokeLinecap='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='p-4'>
          <FilterOption title='Khoảng giá' options={priceOptions} queryParamsConfig={queryParamsConfig} />
          <FilterOption title='Kích thước màn hình' options={screenSizeOptions} queryParamsConfig={queryParamsConfig} />
          <FilterOption title='RAM' options={ramOptions} queryParamsConfig={queryParamsConfig} />
          <FilterOption title='Bộ nhớ trong' options={memoryOptions} queryParamsConfig={queryParamsConfig} />
          <FilterOption title='CPU' options={cpuOptions} queryParamsConfig={queryParamsConfig} />
          <FilterOption title='Card màn hình' options={vgaOptions} queryParamsConfig={queryParamsConfig} />
        </div>
      </div>
    </div>
  )
}

FilterProductMobile.propTypes = {
  queryParamsConfig: PropTypes.object
}

export default FilterProductMobile
