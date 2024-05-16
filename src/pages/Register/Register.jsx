import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { signUp } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { signUpSchema } from '~/schemas/auth.schema'

function Register({ setProgress }) {
  const navigate = useNavigate()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(signUpSchema)
  })

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: (data) => signUp(data)
  })

  const onSubmit = handleSubmit(async (data) => {
    toast.promise(mutateAsync({ ...data, role: 'member' }), {
      loading: 'Đang tiến hành đăng ký...',
      success: () => {
        navigate(path.login)
        return 'Đăng ký thành công'
      },
      error: (err) => {
        return err?.response?.data?.message || 'Đăng nhập thất bại'
      }
    })
  })

  return (
    <div className='bg-white py-16'>
      <div className='max-w-[600px] form-shadow px-12 py-8 m-auto'>
        <h2 className='uppercase text-lg font-normal text-center mb-7 cursor-pointer'>
          <span className='text-[#ed3324] border-b-2 py-2 px-4 border-b-[#ed3324]'>Đăng nhập</span>
        </h2>
        <form method='POST' onSubmit={onSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              placeholder='Họ tên'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('name', e.target.value)}
              {...register('name')}
            />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name.message}</span>}
            <input
              placeholder='Số điện thoại'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('phone', e.target.value)}
              {...register('phone')}
            />
            {errors.phone && <span className='text-red-500 text-sm'>{errors.phone.message}</span>}
            <input
              placeholder='Email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('email', e.target.value)}
              {...register('email')}
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}
            <input
              placeholder='Mật khẩu'
              type='password'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('password', e.target.value)}
              {...register('password')}
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}
            <input
              placeholder='Nhập lại mật khẩu'
              type='password'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
              onChange={(e) => setValue('confirm_password', e.target.value)}
              {...register('confirm_password')}
            />
            {errors.confirm_password && <span className='text-red-500 text-sm'>{errors.confirm_password.message}</span>}
          </div>
          <button className='bg-[#ec2127] flex items-center justify-center w-full p-4 rounded-md hover:opacity-80 mt-8'>
            <span className='text-white font-medium text-xl uppercase'>Đăng ký</span>
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
                d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
