import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllCategories } from '~/apis/categories.api'
import { AppContext } from '~/context/app.context'
import Search from './Search'
import { path } from '~/constants/path'
import { signOut } from '~/apis/auth.api'
import { toast } from 'sonner'
import { getCart } from '~/apis/carts.api'

function Header() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories()
  })
  const categories = categoriesData?.data?.data || []

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(profile?._id),
    enabled: !!isAuthenticated // Only fetch cart when user is authenticated
  })
  const cart = useMemo(() => cartData?.data?.data, [cartData])
  const totalQuantity = useMemo(() => cart?.cart_items?.map((item) => item.quantity).reduce((a, b) => a + b, 0), [cart])

  const navigateToSubcategory = (categoryId, subcategoryId) => {
    navigate(`/subcategory/${subcategoryId}`, {
      state: { categoryId }
    })
  }

  const { mutateAsync } = useMutation({
    mutationFn: () => signOut()
  })

  const handleSignOut = async () => {
    await mutateAsync()
    window.location.reload()
    toast.success('Đăng xuất thành công')
  }

  return (
    <>
      <nav className='sticky z-20 top-0 left-0 right-0 bg-[#242525] border-gray-200'>
        <div className='max-w-[1400px] mx-auto p-6 flex flex-wrap items-center justify-between'>
          <Link to='/' className='basis-1/5 items-center'>
            <img
              src='https://laptopkhanhtran.vn/pic/banner/logo_6368_638173418442942155.png'
              className='h-10 mr-3'
              alt='Flowbite Logo'
            />
          </Link>
          <Search />
          <div className='justify-between hidden w-full md:flex md:w-auto' id='navbar-search'>
            <ul className='flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-6 md:mt-0 md:border-0 bg-[#242525]'>
              <li>
                <Link
                  to={path.home}
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                  aria-current='page'
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                >
                  Tin tức
                </Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link
                    to={path.login}
                    className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                  >
                    Đăng nhập
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link
                    to={path.profile}
                    className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0 cursor-pointer'
                  >
                    Tài khoản
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link
                    to=''
                    className='text-sm block opacity-60 hover:opacity-100 rounded bg-[#242525] text-white font-semibold md:p-0'
                    onClick={handleSignOut}
                  >
                    Đăng xuất
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className='relative text-white ms-12'>
            <Link to={path.cart}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              {isAuthenticated && cart?.cart_items?.length > 0 && (
                <div className='absolute p-1 w-5 h-5 bg-red-500 rounded-full top-[-10px] right-[-10px] text-xs flex items-center justify-center'>
                  {totalQuantity}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>
      <div className='sticky z-20 top-[88px] left-0 right-0 flex bg-[#2e3030] h-14'>
        <ul className='flex w-full items-center justify-between px-32'>
          {categories.map((category) => (
            <li
              key={category._id}
              className='relative flex items-center text-white opacity-60 hover:opacity-100 h-full cursor-pointer group'
            >
              <Link to={`/category/${category._id}`} className='text-xs font-semibold uppercase'>
                {category.name}
              </Link>
              {category.subcategories.length > 0 && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3 ml-1'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
              )}
              <div className='hidden absolute top-[100%] left-0 drop-shadow-xl bg-white w-max rounded-lg group-hover:block'>
                <ul className=''>
                  {category.subcategories.length > 0 &&
                    category.subcategories.map((subcategory) => (
                      <li key={subcategory._id} className='py-3 px-6 text-sm text-gray-900 hover:text-green-700'>
                        <Link
                          className='font-semibold'
                          to={`/subcategory/${subcategory._id}`}
                          onClick={() => navigateToSubcategory(category._id, subcategory._id)}
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Header
