import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import authApi from '~/apis/auth.api'
import { path } from '~/constants/path'
import { forgotPasswordSchema } from '~/schemas/auth.schema'

function ForgotPassword({ setProgress }) {
  const [isSentEmail, setIsSentEmail] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(forgotPasswordSchema)
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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data) => authApi.forgotPassword(data)
  })

  const onSubmit = handleSubmit(async (data) => {
    toast.promise(mutateAsync(data), {
      loading: 'Đang tiến hành gửi yêu cầu...',
      success: (data) => {
        setIsSentEmail(true)
        return data.message || 'Vui lòng kiểm tra email của bạn để khôi phục mật khẩu!'
      },
      error: (error) => error.response.data.message || 'Có lỗi xảy ra!'
    })
  })

  return (
    <div className='bg-white h-screen py-16'>
      <Helmet>
        <title>Quên mật khẩu</title>
        <meta name='description' content='Quên mật khẩu' />
      </Helmet>
      <div className='form-shadow m-auto max-w-xs md:max-w-[600px] px-12 py-8'>
        <h2 className='mb-7 cursor-pointer text-center text-lg font-normal uppercase'>
          <span className='border-b-2 text-sm md:text-lg border-b-[#ed3324] px-4 py-2 text-[#ed3324]'>
            Quên mật khẩu
          </span>
        </h2>
        <p className='text-center text-xs md:text-sm text-gray-500 mb-8'>
          Vui lòng nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
        </p>
        <form method='POST' onSubmit={onSubmit}>
          <div className='flex flex-col gap-4'>
            <input
              placeholder='Email'
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs md:text-sm text-gray-900 shadow-sm'
              {...register('email')}
              onChange={(e) => {
                if (errors.email) {
                  clearErrors('email')
                }
                setValue('email', e.target.value)
              }}
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
          </div>
          <button
            type='submit'
            disabled={isPending}
            className={`mt-8 w-full bg-[#ed3324] rounded-lg p-3 flex items-center justify-center gap-2 ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className='text-sm md:text-xl font-medium uppercase text-white'>Gửi yêu cầu</span>
            <svg
              className='ml-3 h-4 w-4 md:h-6 md:w-6 text-white'
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
          </button>
          {isSentEmail && (
            <button
              type='submit'
              className='mt-8 flex w-full items-center justify-center rounded-md bg-[#ec2127] p-4 hover:opacity-80'
            >
              <Link className='text-sm md:text-xl font-medium uppercase text-white' to={path.login}>
                Tiến hành đăng nhập
              </Link>
              <svg
                className='ml-3 h-4 w-4 md:h-6 md:w-6 text-white'
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
          )}
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
