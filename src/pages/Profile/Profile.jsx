import { useContext, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getProfile, updateProfile } from '~/apis/user.api'
import { AppContext } from '~/context/app.context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from '~/schemas/user.schema'
import { toast } from 'sonner'
import { setUserDataIntoLocalStorage } from '~/utils/auth'
import Navbar from '~/components/Navbar'

function Profile({ setProgress }) {
  const { profile, setProfile } = useContext(AppContext)
  const { data: userData } = useQuery({
    queryKey: ['profile', profile?._id],
    queryFn: () => getProfile(profile?._id),
    enabled: !!profile?._id
  })

  const user = useMemo(() => userData?.data?.data || {}, [userData])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
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

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [user, setValue])

  const { mutateAsync: updateProfileMutate, isPending } = useMutation({
    mutationFn: (data) => updateProfile(profile?._id, data)
  })

  const onSubmit = handleSubmit(async (data) => {
    toast.promise(updateProfileMutate(data), {
      loading: 'Đang cập nhật thông tin...',
      success: (data) => {
        setProfile(data.data.data)
        setUserDataIntoLocalStorage(data.data.data)
        return 'Cập nhật thông tin thành công'
      },
      error: (err) => {
        return err?.response?.data?.message || 'Cập nhật thông tin thất bại'
      }
    })
  })

  const handleChangeInput = (e) => {
    if (errors[e.target.name]) {
      clearErrors(e.target.name)
    }
    setValue(e.target.name, e.target.value)
  }

  return (
    <div className='max-w-[1400px] mx-auto mt-10 mb-20'>
      <div className='grid grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='col-span-4'>
          <form className='p-4' onSubmit={onSubmit}>
            <h2 className='text-2xl font-semibold mb-6'>Thông tin cá nhân</h2>
            <p className='text-sm text-gray-500 mb-6'>
              Cập nhật thông tin cá nhân để bảo mật tài khoản (* Địa chỉ email không thể thay đổi sau khi đăng ký)
            </p>
            <div className='mb-6'>
              <label htmlFor='cus_name' className='block mb-2 text-sm font-medium text-gray-900'>
                Tên khách hàng
              </label>
              <input
                type='text'
                id='cus_name'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                onChange={(e) => handleChangeInput(e)}
                {...register('name')}
              />
              {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            </div>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Địa chỉ email
              </label>
              <input
                type='text'
                id='email'
                disabled
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                onChange={(e) => handleChangeInput(e)}
                {...register('email')}
              />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
            </div>
            <div className='mb-6'>
              <label htmlFor='cus_phone' className='block mb-2 text-sm font-medium text-gray-900'>
                Số điện thoại
              </label>
              <input
                type='text'
                id='cus_phone'
                className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                onChange={(e) => handleChangeInput(e)}
                {...register('phone')}
              />
              {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
            </div>
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

export default Profile
