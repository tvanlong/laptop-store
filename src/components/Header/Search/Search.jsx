import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'

function Search() {
  const navigate = useNavigate()
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)
  const { setValue, handleSubmit } = useForm({
    defaultValues: {
      keyword: ''
    }
  })

  useEffect(() => {
    if (searchValue !== '') {
      setValue('keyword', searchValue.toLowerCase())
    }
  }, [searchValue, setValue])

  const handleClearSearch = () => {
    setSearchValue('')
    setValue('keyword', '')
    inputRef && inputRef.current.focus()
  }

  const onSubmit = handleSubmit((data) => {
    setSearchValue('')
    inputRef && inputRef.current.blur()
    isOpenSearch && setIsOpenSearch(false)
    navigate({
      pathname: path.search,
      search: createSearchParams({ ...data }).toString()
    })
  })

  return (
    <>
      <div className='hidden md:flex md:basis-3/5 xl:basis-2/5 lg:basis-2/6'>
        <form className='relative w-4/5' method='POST' onSubmit={onSubmit}>
          <button type='submit' className='absolute inset-y-0 left-0 z-10 flex items-center pl-3'>
            <svg
              className='h-4 w-4 text-gray-500'
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
            className='block w-full rounded-full border border-gray-300 bg-gray-50 md:text-xs p-2 pl-10 xl:text-sm text-gray-900'
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
                className='h-4 w-4 text-gray-500'
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
      <div className='md:hidden flex basis-3/5 justify-end w-1/6'>
        <button className='p-1 mr-4 border border-white rounded-full' onClick={() => setIsOpenSearch(true)}>
          <svg
            className='w-4 h-4 text-white'
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
              d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
            />
          </svg>
        </button>
      </div>
      <div
        className={`overflow-y-auto overflow-x-hidden justify-center items-center fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full max-h-full bg-gray-300 bg-opacity-30
          ${isOpenSearch ? 'flex' : 'hidden'}
          `}
      >
        <div className='relative p-4 w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
              <h3 className='text-sm font-semibold text-gray-900'>Tìm kiếm dòng sản phẩm</h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
                onClick={() => setIsOpenSearch(false)}
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
              </button>
            </div>
            <form className='p-4 md:p-5 text-center' onSubmit={onSubmit}>
              <div className='w-full'>
                <input
                  type='text'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-2.5'
                  placeholder='Nhập tên dòng sản phẩm cần tìm...'
                  value={searchValue}
                  spellCheck={false}
                  onChange={(e) => setSearchValue(e.target.value.trimStart())}
                  onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                />
              </div>
              <button
                type='submit'
                className='text-white mt-4 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Tìm kiếm
                <svg
                  className='w-4 h-4 text-white'
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
                    d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Search
