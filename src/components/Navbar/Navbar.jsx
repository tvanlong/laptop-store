import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { path } from '~/constants/path'

function Navbar({ user }) {
  return (
    <div className='md:col-span-1 hidden lg:block'>
      <div className='flex items-center border-b border-gray-300 pb-6'>
        <img className='h-12 w-12 rounded-full border border-gray-300' src={user?.avatar} alt='avatar' />
        <span className='ml-5 text-sm font-semibold'>{user?.name}</span>
      </div>
      <ul className='mt-5 list-none'>
        <li className='flex items-center gap-3 py-2'>
          <svg
            className='h-6 w-6 text-center text-gray-600'
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
              d='M7 6H5m2 3H5m2 3H5m2 3H5m2 3H5m11-1a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z'
            />
          </svg>
          <NavLink
            to={path.profile}
            className={({ isActive }) =>
              isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
            }
          >
            Tài khoản của tôi
          </NavLink>
        </li>
        <li className='flex items-center gap-3 py-2'>
          <svg
            className='h-6 w-6 text-center text-gray-600'
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
              d='M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4'
            />
          </svg>
          <NavLink
            to={path.order}
            className={({ isActive }) =>
              isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
            }
          >
            Đơn mua
          </NavLink>
        </li>
        <li className='flex items-center gap-3 py-2'>
          <svg
            className='h-6 w-6 text-center text-gray-600'
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
              d='M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z'
            />
          </svg>
          <NavLink
            to={path.changePassword}
            className={({ isActive }) =>
              isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
            }
          >
            Đổi mật khẩu
          </NavLink>
        </li>
        <li className='flex items-center gap-3 py-2'>
          <svg
            className='h-6 w-6 text-center text-gray-600'
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
              d='M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1'
            />
          </svg>

          <NavLink
            to={path.changeEmail}
            className={({ isActive }) =>
              isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900'
            }
          >
            Đổi địa chỉ email
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

Navbar.propTypes = {
  user: PropTypes.object
}

export default Navbar
