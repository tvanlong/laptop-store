import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { changeEmail, verifyEmail } from '~/apis/otp.api'
import Navbar from '~/components/Navbar'
import { AppContext } from '~/context/app.context'
import { useProfile } from '~/hooks/useProfile'
import { changeEmailSchema } from '~/schemas/user.schema'
import { setProfileToLS } from '~/utils/auth'

function ChangeEmail({ setProgress }) {
  const queryClient = useQueryClient()
  const { profile, setProfile } = useContext(AppContext)
  const { data: userData } = useProfile()
  const user = useMemo(() => userData?.data?.data || {}, [userData])
  const [otp, setOtp] = useState('')
  const [isVerify, setIsVerify] = useState(false)

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
    clearErrors,
    getValues
  } = useForm({
    defaultValues: {
      email: '',
      new_email: ''
    },
    resolver: yupResolver(changeEmailSchema)
  })

  useEffect(() => {
    setValue('email', user.email)
  }, [user.email, setValue])

  const { mutateAsync: changeEmailMutate } = useMutation({
    mutationFn: (data) => changeEmail(profile?._id, data)
  })

  const { mutateAsync: verifyEmailMutate } = useMutation({
    mutationFn: (data) => verifyEmail(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile?._id] })
    }
  })

  const handleChangeInput = (e) => {
    if (errors[e.target.name]) {
      clearErrors(e.target.name)
    }
    setValue(e.target.name, e.target.value)
  }

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading('Đang cập nhật thông tin...')
    try {
      const response = await changeEmailMutate(data)
      if (response.data) {
        setIsVerify(true)
        toast.success(response.data.message || 'Vui lòng kiểm tra email của bạn để xác nhận thay đổi email!', {
          id: toastId
        })
      }
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại', { id: toastId })
    }
  })

  const handleVerifyEmail = async () => {
    const toastId = toast.loading('Đang xác nhận email...')
    try {
      const email = getValues('new_email')
      const response = await verifyEmailMutate({ email, otp })
      if (response.data) {
        toast.success(response.data.message || 'Xác nhận thay đổi email thành công', { id: toastId })
        setIsVerify(false)
        setProfile(response.data.data)
        setProfileToLS(response.data.data)
      }
    } catch (error) {
      toast.error('Xác nhận email thất bại', { id: toastId })
    }
  }

  return (
    <div className='mx-auto mb-20 mt-10 max-w-[1400px]'>
      <Helmet>
        <title>Thay đổi địa chỉ email</title>
        <meta name='description' content='Thay đổi địa chỉ email' />
      </Helmet>
      <div className='md:grid md:grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='md:col-span-4'>
          <form className='p-4' method='POST' onSubmit={onSubmit}>
            <h2 className='mb-6 text-xl sm:text-2xl font-semibold'>Thay đổi địa chỉ email</h2>
            <div className='mb-6'>
              <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
                Địa chỉ email hiện tại
              </label>
              <input
                id='email'
                disabled
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                {...register('email')}
                onChange={(e) => handleChangeInput(e)}
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='new_email' className='mb-2 block text-sm font-medium text-gray-900'>
                Địa chỉ email mới
              </label>
              <input
                id='new_email'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                onChange={(e) => handleChangeInput(e)}
                {...register('new_email')}
              />
            </div>
            {errors.new_email && <p className='text-red-500 text-sm'>{errors.new_email.message}</p>}
            {isVerify && (
              <div className='mb-6'>
                <label htmlFor='otp' className='mb-2 block text-sm font-medium text-gray-900'>
                  Mã OTP
                </label>
                <input
                  id='otp'
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
            {!isVerify && (
              <button
                type='submit'
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800'
              >
                Thay đổi email
              </button>
            )}
            {isVerify && (
              <button
                type='button'
                onClick={handleVerifyEmail}
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800'
              >
                Xác nhận thay đổi email
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangeEmail
