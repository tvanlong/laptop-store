import { omit } from 'lodash'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

function FilterDropdown({ title, options, queryParamsConfig }) {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleCheckboxChange = (optionParam, optionValue) => {
    if (selectedOption === optionValue) {
      navigate({
        search: createSearchParams(omit(queryParamsConfig, optionParam)).toString()
      })
      setSelectedOption(null)
    } else {
      navigate({
        search: createSearchParams({
          ...queryParamsConfig,
          [optionParam]: optionValue
        }).toString()
      })

      setSelectedOption(selectedOption === optionValue ? null : optionValue)
    }
  }

  return (
    <div className='mb-4 cursor-pointer'>
      <div className='flex justify-between items-center mb-4' onClick={toggleVisibility}>
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
          <div className='flex items-center mb-3' key={index}>
            <input
              id={`checkbox-${index}`}
              type='checkbox'
              checked={selectedOption === option.value || queryParamsConfig[option.param] === option.value}
              onChange={() => handleCheckboxChange(option.param, option.value)}
              className='w-4 h-4 text-blue-600 bg-white border-gray-300 rounded'
            />
            <label htmlFor={`checkbox-${index}`} className='ml-2 text-sm text-gray-900 hover:underline'>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterDropdown
