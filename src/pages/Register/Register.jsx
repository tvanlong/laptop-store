import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { signUp } from '~/apis/auth.api'
import { signUpSchema } from '~/schemas/auth.schema'

function Register({ setProgress }) {
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
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const { mutateAsync } = useMutation({
    mutationFn: (data) => signUp(data)
  })

  const onSubmit = handleSubmit(async (data) => {
    toast.promise(mutateAsync({ ...data, role: 'member' }), {
      loading: 'Đang tiến hành đăng ký...',
      success: (res) => res?.data?.message || 'Đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản',
      error: (err) => {
        return err?.response?.data?.message || 'Đăng nhập thất bại'
      }
    })
  })

  return (
    <div className='bg-white py-16'>
      <div className='form-shadow m-auto max-w-[600px] px-12 py-8'>
        <h2 className='mb-7 cursor-pointer text-center text-lg font-normal uppercase'>
          <span className='border-b-2 border-b-[#ed3324] px-4 py-2 text-[#ed3324]'>Đăng ký</span>
        </h2>
        <form method='POST' onSubmit={onSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              placeholder='Họ tên'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('name', e.target.value)}
              {...register('name')}
            />
            {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
            <input
              placeholder='Số điện thoại'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('phone', e.target.value)}
              {...register('phone')}
            />
            {errors.phone && <span className='text-sm text-red-500'>{errors.phone.message}</span>}
            <input
              placeholder='Email'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('email', e.target.value)}
              {...register('email')}
            />
            {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
            <input
              placeholder='Mật khẩu'
              type='password'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('password', e.target.value)}
              {...register('password')}
            />
            {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
            <input
              placeholder='Nhập lại mật khẩu'
              type='password'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              onChange={(e) => setValue('confirm_password', e.target.value)}
              {...register('confirm_password')}
            />
            {errors.confirm_password && <span className='text-sm text-red-500'>{errors.confirm_password.message}</span>}
          </div>
          <button className='mt-8 flex w-full items-center justify-center rounded-md bg-[#ec2127] p-4 hover:opacity-80'>
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
