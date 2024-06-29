import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import authApi from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'

function LoginSuccess() {
  const { userId } = useParams()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: (data) => authApi.signInSuccess(data)
  })

  const handleLoginSuccess = async () => {
    toast.promise(mutateAsync({ userId }), {
      loading: 'Đang tiến hành đăng nhập...',
      success: (data) => {
        if (data.data.data.role === 'member') {
          setIsAuthenticated(true)
          setProfile(data.data.data)
          navigate(path.home)
          return 'Đăng nhập thành công'
        } else {
          return 'Tài khoản của bạn không có quyền truy cập vào hệ thống'
        }
      },
      error: (err) => {
        return err?.response?.data?.message || 'Đăng nhập thất bại'
      }
    })
  }

  return (
    <div className='h-screen bg-white'>
      <Helmet>
        <title>Đăng nhập thành công</title>
        <meta name='description' content='Đăng nhập thành công' />
      </Helmet>
      <div className='p-6 md:mx-auto'>
        <svg viewBox='0 0 24 24' className='mx-auto my-6 h-16 w-16 text-green-600'>
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='text-center text-base font-semibold text-gray-900 md:text-2xl'>Đăng nhập thành công! 🎉</h3>
          <p className='my-2 text-gray-600'>
            Bạn đã đăng nhập thành công vào hệ thống của chúng tôi. Hãy nhấn vào nút bên dưới để quay lại trang chủ.
          </p>
          <p>
            Nếu bạn gặp bất kỳ vấn đề gì, vui lòng liên hệ với chúng tôi qua email:{' '}
            <a href='mailto:[laptopkhanhtran@gmail.com]' className='text-indigo-600'>
              [laptopkhanhtran@gmail.com]
            </a>
          </p>
          <div className='py-10 text-center'>
            <button
              className='bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500'
              onClick={handleLoginSuccess}
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSuccess
