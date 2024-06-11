import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { signIn } from '~/apis/auth.api'
import config from '~/constants/config'
import { path } from '~/constants/path'
import { AppContext } from '~/context/app.context'
import { signInSchema } from '~/schemas/auth.schema'

function Login({ setProgress }) {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(signInSchema)
  })

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: (data) => signIn(data)
  })

  const onSubmit = handleSubmit(async (data) => {
    toast.promise(mutateAsync(data), {
      loading: 'Đang tiến hành đăng nhập...',
      success: (data) => {
        if (data.data.data.role === 'member') {
          setIsAuthenticated(true)
          setProfile(data.data.data)
          navigate('/')
          return 'Đăng nhập thành công'
        } else {
          return 'Tài khoản của bạn không có quyền truy cập vào hệ thống'
        }
      },
      error: (err) => {
        return err?.response?.data?.message || 'Đăng nhập thất bại'
      }
    })
  })

  const signInWithGoogle = () => {
    window.open(`${config.baseURL}/api/auth/google`, '_self')
  }

  const signInWithFacebook = () => {
    window.open(`${config.baseURL}/api/auth/facebook`, '_self')
  }

  return (
    <div className='bg-white py-16'>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name='description' content='Đăng nhập' />
      </Helmet>
      <div className='form-shadow m-auto max-w-[600px] px-12 py-8'>
        <h2 className='mb-7 cursor-pointer text-center text-lg font-normal uppercase'>
          <span className='border-b-2 border-b-[#ed3324] px-4 py-2 text-[#ed3324]'>Đăng nhập</span>
        </h2>
        <form method='POST' onSubmit={onSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              placeholder='Email'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('email', e.target.value)}
              {...register('email')}
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
            <input
              type='password'
              placeholder='Mật khẩu'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('password', e.target.value)}
              {...register('password')}
            />
            {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
          </div>
          <div className='mt-3 flex items-center justify-between text-sm'>
            <label className='flex cursor-pointer items-center'>
              <input type='checkbox' className='mr-2' />
              <span className='text-gray-500'>Ghi nhớ tài khoản</span>
            </label>
            <div className='cursor-pointer text-[#ec2127] hover:underline'>Quên mật khẩu?</div>
          </div>
          <button
            type='submit'
            className='mt-8 flex w-full items-center justify-center rounded-md bg-[#ec2127] p-4 hover:opacity-80'
          >
            <span className='text-xl font-medium uppercase text-white'>Đăng nhập</span>
            <svg
              className='ml-3 h-6 w-6 text-white'
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
                d='M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2'
              />
            </svg>
          </button>
          <button
            className='mt-8 flex w-full items-center justify-center rounded-md bg-[#ec2127] p-4 hover:opacity-80'
            onClick={() => navigate(path.register)}
          >
            <span className='text-xl font-medium uppercase text-white'>Đăng ký</span>
            <svg
              className='ml-3 h-6 w-6 text-white'
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
                d='M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
        </form>
        <div className='relative flex justify-center py-6'>
          <div className='relative z-10 flex w-40 justify-center bg-white'>Hoặc</div>
          <div className='absolute left-1/2 top-1/2 h-[4px] w-full -translate-x-1/2 -translate-y-1/2 transform border-y border-y-[#ced4da]'></div>
        </div>
        <button
          className='mb-5 flex w-full items-center justify-start rounded-md bg-[#3b5998] p-4 hover:opacity-80'
          onClick={signInWithFacebook}
        >
          <img
            className='mr-4 h-8 w-8 rounded-lg'
            src='https://www.nguyenkim.com/images/login_form/icon-fb.svg'
            alt=''
          />
          <span className='text-xl font-normal uppercase text-white'>Đăng nhập bằng Facebook</span>
        </button>
        <button
          className='flex w-full items-center justify-start rounded-md bg-[#3f81f9] p-4 hover:opacity-80'
          onClick={signInWithGoogle}
        >
          <img
            className='mr-4 h-8 w-8 rounded-lg'
            src='https://www.nguyenkim.com/images/login_form/icon-gg.png'
            alt=''
          />
          <span className='text-xl font-normal uppercase text-white'>Đăng nhập bằng Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
