import { omit } from 'lodash'
import { useState } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'

function FilterOption({ title, options, queryParamsConfig }) {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

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
      if (Array.isArray(optionParam)) {
        navigate({
          search: createSearchParams({
            ...queryParamsConfig,
            [optionParam[0]]: optionValue[0],
            [optionParam[1]]: optionValue[1]
          }).toString()
        })
      } else {
        navigate({
          search: createSearchParams({
            ...queryParamsConfig,
            [optionParam]: optionValue
          }).toString()
        })
      }

      setSelectedOption(selectedOption === optionValue ? null : optionValue)
    }
  }

  return (
    <div className='mb-4 cursor-pointer'>
      <div className='mb-4 flex items-center justify-between' onClick={toggleVisibility}>
        <div className='text-sm font-semibold hover:underline'>{title}</div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
      </div>
      <div className={`filter ${isVisible ? '' : 'hidden'}`}>
        {options.map((option, index) => (
          <div className='mb-3 flex items-center' key={index}>
            <input
              type='checkbox'
              checked={selectedOption === option.value || queryParamsConfig[option.param] === option.value}
              onChange={() => handleCheckboxChange(option.param, option.value)}
              className='h-4 w-4 rounded border-gray-300 bg-white text-blue-600'
            />
            <label className='ml-2 text-sm text-gray-900 hover:underline'>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FilterOption
