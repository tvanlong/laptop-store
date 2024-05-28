import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { changePassword } from '~/apis/user.api'
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
    mutationFn: (data) => changePassword(profile?._id, data)
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
    <div className='max-w-[1400px] mx-auto mt-10 mb-20'>
      <div className='grid grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='col-span-4'>
          <form className='p-4' method='POST' onSubmit={onSubmit}>
            <h2 className='text-2xl font-semibold mb-6'>Thay đổi mật khẩu</h2>
            <p className='text-sm text-gray-500 mb-6'>
              Để đảm bảo an toàn, vui lòng không chia sẻ mật khẩu với người khác
            </p>
            <div className='mb-6'>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Mật khẩu mới
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                onChange={(e) => handleChangeInput(e)}
                {...register('password')}
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password_confirmation' className='block mb-2 text-sm font-medium text-gray-900'>
                Xác nhận mật khẩu
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password_confirmation'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                onChange={(e) => handleChangeInput(e)}
                {...register('confirm_password')}
              />
            </div>
            <label className='flex items-center mb-5 cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                onChange={() => setShowPassword(!showPassword)}
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900'>Hiển thị mật khẩu</span>
            </label>
            <button
              type='submit'
              disabled={isPending}
              className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
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
