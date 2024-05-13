import { useState } from 'react'

function FilterDropdown({ title, options }) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className='mb-4 cursor-pointer' onClick={toggleVisibility}>
      <div className='flex justify-between items-center mb-4'>
        <div className='font-semibold hover:underline text-sm'>{title}</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='w-4 h-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </div>
      <div className={`filter ${isVisible ? '' : 'hidden'}`}>
        {options.map((option, index) => (
          <form className='flex items-center mb-3' key={index} method='POST'>
            <input
              id={`checkbox-${index}`}
              type='checkbox'
              defaultValue={option.value}
              className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded'
            />
            <label htmlFor={`checkbox-${index}`} className='ml-2 text-sm text-gray-900 hover:underline'>
              {option.label}
            </label>
          </form>
        ))}
      </div>
    </div>
  )
}

export default FilterDropdown
