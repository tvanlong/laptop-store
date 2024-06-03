import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { signOut } from '~/apis/auth.api'
import { getCart } from '~/apis/carts.api'
import { getAllCategories } from '~/apis/categories.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { useCart } from '~/hooks/useCart'
import Search from './Search'

function Header() {
  const { isAuthenticated, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getAllCategories()
  })
  const categories = categoriesData?.data?.data || []

  const { data: cartData } = useCart()
  const cart = useMemo(() => cartData?.data?.data, [cartData])
  const totalQuantity = useMemo(() => cart?.cart_items?.map((item) => item.quantity).reduce((a, b) => a + b, 0), [cart])

  const cartQuery = { queryKey: ['cart', profile?._id], queryFn: () => getCart(profile?._id) }

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

  const handlePrefetchOnHover = () => {
    if (isAuthenticated && profile?._id) {
      queryClient.prefetchQuery(cartQuery)
    }
  }

  return (
    <>
      <nav className='sticky left-0 right-0 top-0 z-20 border-gray-200 bg-[#242525]'>
        <div className='mx-auto flex max-w-[1400px] flex-wrap items-center justify-between p-6'>
          <Link to='/' className='basis-1/5 items-center'>
            <img
              src='https://laptopkhanhtran.vn/pic/banner/logo_6368_638173418442942155.png'
              className='mr-3 h-10'
              alt='Flowbite Logo'
            />
          </Link>
          <Search />
          <div className='hidden w-full justify-between md:flex md:w-auto' id='navbar-search'>
            <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-[#242525] p-4 md:mt-0 md:flex-row md:space-x-6 md:border-0 md:p-0'>
              <li>
                <Link
                  to={path.home}
                  className='block rounded bg-[#242525] text-sm font-semibold text-white opacity-60 hover:opacity-100 md:p-0'
                  aria-current='page'
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='block rounded bg-[#242525] text-sm font-semibold text-white opacity-60 hover:opacity-100 md:p-0'
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='block rounded bg-[#242525] text-sm font-semibold text-white opacity-60 hover:opacity-100 md:p-0'
                >
                  Tin tức
                </Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link
                    to={path.login}
                    className='block rounded bg-[#242525] text-sm font-semibold text-white opacity-60 hover:opacity-100 md:p-0'
                  >
                    Đăng nhập
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link
                    to={path.profile}
                    className='block cursor-pointer rounded bg-[#242525] text-sm font-semibold text-white opacity-60 hover:opacity-100 md:p-0'
                  >
                    Tài khoản
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link
                    to=''
                    className='block rounded bg-[#242525] text-sm font-semibold text-white opacity-60 hover:opacity-100 md:p-0'
                    onClick={handleSignOut}
                  >
                    Đăng xuất
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className='relative ms-12 text-white' onMouseEnter={handlePrefetchOnHover}>
            <Link to={path.cart}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                />
              </svg>
              {isAuthenticated && cart?.cart_items?.length > 0 && (
                <div className='absolute right-[-10px] top-[-10px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-1 text-xs'>
                  {totalQuantity}
                </div>
              )}
            </Link>
          </div>
        </div>
      </nav>
      <div className='sticky left-0 right-0 top-[88px] z-20 flex h-14 bg-[#2e3030]'>
        <ul className='flex w-full items-center justify-between px-32'>
          {categories.map((category) => (
            <li
              key={category._id}
              className='group relative flex h-full cursor-pointer items-center text-white opacity-60 hover:opacity-100'
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
                  className='ml-1 h-3 w-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
                </svg>
              )}
              <div className='absolute left-0 top-[100%] hidden w-max rounded-lg bg-white drop-shadow-xl group-hover:block'>
                <ul className=''>
                  {category.subcategories.length > 0 &&
                    category.subcategories.map((subcategory) => (
                      <li key={subcategory._id} className='px-6 py-3 text-sm text-gray-900 hover:text-green-700'>
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
