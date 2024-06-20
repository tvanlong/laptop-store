import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { verifyEmail } from '~/apis/auth.api'
import { path } from '~/constants/path'

function RegisterSuccess() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: ({ token }) => verifyEmail(token)
  })

  const handleRegisterSuccess = async () => {
    toast.promise(mutateAsync({ token }), {
      loading: 'Đang xác thực tài khoản...',
      success: (data) => data?.data?.message || 'Xác thực tài khoản thành công',
      error: (err) => {
        return err?.response?.data?.message || 'Xác thực tài khoản thất bại'
      }
    })

    navigate(path.login)
  }

  return (
    <div className='h-screen bg-white'>
      <Helmet>
        <title>Đăng ký thành công</title>
        <meta name='description' content='Đăng ký thành công' />
      </Helmet>
      <div className='p-6 md:mx-auto'>
        <svg viewBox='0 0 24 24' className='mx-auto my-6 h-16 w-16 text-green-600'>
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='text-center text-base font-semibold text-gray-900 md:text-2xl'>
            Hoàn tất đăng ký bằng cách ấn vào nút bên dưới! 🎉
          </h3>
          <p className='my-2 text-gray-600'>
            Bạn đã đăng ký thành công vào hệ thống của chúng tôi. Hãy nhấn vào nút bên dưới để có thể tiếp tục sử dụng
            dịch vụ của chúng tôi.
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
              onClick={handleRegisterSuccess}
            >
              Hoàn tất đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterSuccess
