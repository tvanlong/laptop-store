import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'

function Search() {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)
  const { setValue, handleSubmit } = useForm({
    defaultValues: {
      search: ''
    }
  })

  useEffect(() => {
    if (searchValue !== '') {
      setValue('search', searchValue)
    }
  }, [searchValue, setValue])

  const handleClearSearch = () => {
    setSearchValue('')
    setValue('search', '')
    inputRef.current.focus()
  }

  const onSubmit = handleSubmit((data) => {
    setSearchValue('')
    inputRef.current.blur()
    navigate({
      pathname: path.search,
      search: createSearchParams({ ...data }).toString()
    })
  })

  return (
    <div className='basis-2/5 flex'>
      <form className='w-4/5 relative hidden md:block' method='POST' onSubmit={onSubmit}>
        <button type='submit' className='absolute inset-y-0 left-0 z-10 flex items-center pl-3'>
          <svg
            className='w-4 h-4 text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </button>
        <input
          type='text'
          id='search-navbar'
          className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50'
          placeholder='Bạn muốn tìm sản phẩm gì...'
          ref={inputRef}
          value={searchValue}
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value.trimStart())}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
        {searchValue !== '' && (
          <button className='absolute inset-y-0 right-3 z-10 flex items-center pl-3' onClick={handleClearSearch}>
            <svg
              className='w-4 h-4 text-gray-500'
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
                d='m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  )
}

export default Search
