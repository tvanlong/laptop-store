import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema } from '~/schemas/auth.schema'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '~/apis/auth.api'
import { toast } from 'sonner'
import { AppContext } from '~/context/app.context'
import { useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import config from '~/constants/config'

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
    setTimeout(() => {
      setProgress(100)
    }, 200)
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
    window.open(`${config.baseURL}/auth/google`, '_self')
  }

  return (
    <div className='bg-white py-16'>
      <div className='max-w-[600px] form-shadow px-12 py-8 m-auto'>
        <h2 className='uppercase text-lg font-normal text-center mb-7 cursor-pointer'>
          <span className='text-[#ed3324] border-b-2 py-2 px-4 border-b-[#ed3324]'>Đăng nhập</span>
        </h2>
        <form method='POST' onSubmit={onSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              placeholder='Email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('email', e.target.value)}
              {...register('email')}
            />
            {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            <input
              type='password'
              placeholder='Mật khẩu'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('password', e.target.value)}
              {...register('password')}
            />
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
          </div>
          <div className='flex text-sm justify-between items-center mt-3'>
            <label className='flex items-center cursor-pointer'>
              <input type='checkbox' className='mr-2' />
              <span className='text-gray-500'>Ghi nhớ tài khoản</span>
            </label>
            <div className='text-[#ec2127] hover:underline cursor-pointer'>Quên mật khẩu?</div>
          </div>
          <button
            type='submit'
            className='bg-[#ec2127] flex items-center justify-center w-full p-4 rounded-md hover:opacity-80 mt-8'
          >
            <span className='text-white font-medium text-xl uppercase'>Đăng nhập</span>
            <svg
              className='w-6 h-6 text-white ml-3'
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
            className='bg-[#ec2127] w-full p-4 rounded-md hover:opacity-80 mt-8'
            onClick={() => navigate(path.register)}
          >
            <span className='text-white font-medium text-xl uppercase'>Đăng ký</span>
          </button>
        </form>
        <div className='relative py-6 flex justify-center'>
          <div className=' flex justify-center w-40 bg-white relative z-10'>Hoặc</div>
          <div className='absolute w-full h-[4px] border-y border-y-[#ced4da] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
        </div>
        <button className='flex items-center justify-start w-full p-4 rounded-md hover:opacity-80 bg-[#3b5998] mb-5'>
          <img
            className='w-8 h-8 mr-4 rounded-lg'
            src='https://www.nguyenkim.com/images/login_form/icon-fb.svg'
            alt=''
          />
          <span className='text-white font-normal text-xl uppercase'>Đăng nhập bằng Facebook</span>
        </button>
        <button
          className='flex items-center justify-start w-full p-4 rounded-md hover:opacity-80 bg-[#3f81f9]'
          onClick={signInWithGoogle}
        >
          <img
            className='w-8 h-8 mr-4 rounded-lg'
            src='https://www.nguyenkim.com/images/login_form/icon-gg.png'
            alt=''
          />
          <span className='text-white font-normal text-xl uppercase'>Đăng nhập bằng Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login
