import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import userApi from '~/apis/user.api'
import Navbar from '~/components/Navbar'
import { AppContext } from '~/context/app.context'
import { useProfile } from '~/hooks/useProfile'
import { changePasswordSchema } from '~/schemas/user.schema'

function ChangePassword({ setProgress }) {
  const [showPassword, setShowPassword] = useState(false)
  const { profile } = useContext(AppContext)
  const { data: userData } = useProfile()
  const user = useMemo(() => userData?.data?.data || {}, [userData])

  useEffect(() => {
    setProgress(20)
    const timeoutId = setTimeout(() => {
      setProgress(100)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [setProgress])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: ''
    },
    resolver: yupResolver(changePasswordSchema)
  })

  const handleChangeInput = (e) => {
    if (errors[e.target.name]) {
      clearErrors(e.target.name)
    }
    setValue(e.target.name, e.target.value)
  }

  const { mutateAsync: changePasswordMutate, isPending } = useMutation({
    mutationFn: (data) => userApi.changePassword(profile?._id, data)
  })

  const onSubmit = handleSubmit((data) => {
    toast.promise(changePasswordMutate(data), {
      loading: 'Đang cập nhật mật khẩu...',
      success: (response) => {
        return response?.data?.message || 'Cập nhật mật khẩu thành công'
      },
      error: (err) => {
        return err?.response?.data?.message || 'Cập nhật mật khẩu thất bại'
      }
    })
  })

  return (
    <div className='mx-auto mb-20 mt-10 max-w-[1400px]'>
      <Helmet>
        <title>Thay đổi mật khẩu</title>
        <meta name='description' content='Thay đổi mật khẩu' />
      </Helmet>
      <div className='md:grid md:grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='md:col-span-4'>
          <form className='p-4' method='POST' onSubmit={onSubmit}>
            <h2 className='mb-6 text-xl sm:text-2xl font-semibold'>Thay đổi mật khẩu</h2>
            <p className='mb-6 text-sm text-gray-500'>
              Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu với người khác
            </p>
            <div className='mb-6'>
              <label htmlFor='password' className='mb-2 block text-sm font-medium text-gray-900'>
                Mật khẩu mới
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                onChange={(e) => handleChangeInput(e)}
                {...register('password')}
              />
              {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
            </div>
            <div className='mb-6'>
              <label htmlFor='password_confirmation' className='mb-2 block text-sm font-medium text-gray-900'>
                Xác nhận mật khẩu
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password_confirmation'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                onChange={(e) => handleChangeInput(e)}
                {...register('confirm_password')}
              />
              {errors.confirm_password && (
                <p className='text-red-500 text-sm mt-1'>{errors.confirm_password.message}</p>
              )}
            </div>
            <label className='mb-5 flex cursor-pointer items-center'>
              <input
                type='checkbox'
                value=''
                className='peer sr-only'
                onChange={() => setShowPassword(!showPassword)}
              />
              <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
              <span className='ms-3 text-sm font-medium text-gray-900'>Hiển thị mật khẩu</span>
            </label>
            <button
              type='submit'
              disabled={isPending}
              className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800'
            >
              Cập nhật lại thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
