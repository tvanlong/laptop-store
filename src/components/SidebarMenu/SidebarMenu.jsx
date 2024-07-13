import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import categoriesApi from '~/apis/categories.api'
import { AppContext } from '~/context/app.context'

function SidebarMenu() {
  const { isOpenSidebarMenu, setIsOpenSidebarMenu } = useContext(AppContext)
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesApi.getAllCategories
  })
  const categories = categoriesData?.data?.data || []

  const [expandedCategories, setExpandedCategories] = useState({})

  const handleCategoryClick = (categoryId) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId]
    }))
  }

  const handleNavigateCategory = (categoryId) => {
    navigate(`/category/${categoryId}`)
  }

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    navigate(`/subcategory/${subcategoryId}`, {
      state: { categoryId }
    })
  }

  return (
    <div className='relative'>
      {isOpenSidebarMenu && (
        <div
          className='fixed inset-0 bg-black opacity-50 z-40 pointer-events-auto'
          onClick={() => setIsOpenSidebarMenu(false)}
        ></div>
      )}
      <div
        className={
          isOpenSidebarMenu
            ? 'fixed top-0 bottom-0 left-0 w-64 text-white bg-[#242525] z-50 shadow-lg transition-transform transform duration-300 ease-in-out overflow-y-auto scrollbar-custom'
            : 'fixed top-0 bottom-0 left-0 w-64 text-white bg-[#242525] z-50 shadow-lg transition-transform transform duration-300 ease-in-out -translate-x-full overflow-y-auto scrollbar-custom'
        }
      >
        <div className='flex items-center justify-between h-16 px-4 bg-gray-700 border-b border-gray-600'>
          <span className='text-white font-bold text-lg'>Danh mục sản phẩm</span>
          <button
            className='text-white border border-white p-1 rounded-full hover:text-gray-300 focus:outline-none'
            onClick={() => setIsOpenSidebarMenu(false)}
          >
            <svg
              className='w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
            </svg>
          </button>
        </div>
        <ul className='mt-6'>
          {categories.map((category) => (
            <li key={category._id}>
              <div
                className={
                  pathname.includes(category._id)
                    ? 'px-4 py-2 flex items-center justify-between text-gray-200 border-l-4 border-transparent bg-gray-700 border-gray-600 cursor-pointer'
                    : 'px-4 py-2 flex items-center justify-between text-gray-200 border-l-4 border-transparent hover:bg-gray-700 hover:border-gray-600 cursor-pointer'
                }
              >
                <span className='block' onClick={() => handleNavigateCategory(category._id)}>
                  {category.name}
                </span>
                {category.subcategories.length > 0 && (
                  <button
                    className='text-gray-400 rounded-full border border-gray-400 h-6 w-6 flex items-center justify-center focus:outline-none'
                    onClick={() => handleCategoryClick(category._id)}
                  >
                    <span className=''>{expandedCategories[category._id] ? '-' : '+'}</span>
                  </button>
                )}
              </div>
              {expandedCategories[category._id] && (
                <ul className='pl-8 mt-2'>
                  {category.subcategories.map((subcategory) => (
                    <li
                      key={subcategory._id}
                      className={`pl-4 py-2 text-gray-200 border-l-4 border-transparent cursor-pointer ${pathname.includes(subcategory._id) ? 'bg-gray-700 border-gray-600' : 'hover:bg-gray-700 hover:border-gray-600'}`}
                      onClick={() => handleSubcategoryClick(category._id, subcategory._id)}
                    >
                      <span className='block'>{subcategory.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SidebarMenu
