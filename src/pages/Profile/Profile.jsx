import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import imagesApi from '~/apis/images.api'
import userApi from '~/apis/user.api'
import Navbar from '~/components/Navbar'
import { DEFAULT_AVATAR } from '~/constants/default'
import { AppContext } from '~/context/app.context'
import { useProfile } from '~/hooks/useProfile'
import { profileSchema } from '~/schemas/user.schema'
import { setProfileToLS } from '~/utils/auth'
import { extractPublicIdFromUrl } from '~/utils/util'

function Profile({ setProgress }) {
  const queryClient = useQueryClient()
  const { profile, setProfile } = useContext(AppContext)
  const { data: userData } = useProfile()
  const user = useMemo(() => userData?.data?.data || {}, [userData])
  const [file, setFile] = useState(null)
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  const fileInputRef = useRef(null)

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
      name: '',
      email: '',
      phone: ''
    },
    resolver: yupResolver(profileSchema)
  })

  useEffect(() => {
    if (user) {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [user, setValue])

  const { mutateAsync: updateProfileMutate, isPending: isUpdateProfilePending } = useMutation({
    mutationFn: (data) => userApi.updateProfile(profile?._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profile?._id] })
    }
  })

  const { mutateAsync: uploadAvatarMutate, isPending: isUploadAvatarPending } = useMutation({
    mutationFn: (data) => imagesApi.uploadAvatar(profile?._id, data)
  })

  const { mutateAsync: deleteImageMutate, isPending: isDeleteImagePending } = useMutation({
    mutationFn: (public_id) => imagesApi.deleteImage(public_id)
  })

  const onSubmit = handleSubmit(async (data) => {
    let result
    const toastId = toast.loading('Đang cập nhật thông tin...')
    try {
      if (profile?.avatar !== DEFAULT_AVATAR) {
        await deleteImageMutate(extractPublicIdFromUrl(profile?.avatar))
      }

      if (file) {
        const formData = new FormData()
        formData.append('avatar', file)
        await uploadAvatarMutate(formData)

        const res = await updateProfileMutate(data)
        result = res.data.data
      } else {
        const res = await updateProfileMutate(data)
        result = res.data.data
      }
      setProfile(result)
      setProfileToLS(result)
      toast.success('Cập nhật thông tin thành công', { id: toastId })
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại', { id: toastId })
    }
  })

  const handleChangeInput = (e) => {
    if (errors[e.target.name]) {
      clearErrors(e.target.name)
    }
    setValue(e.target.name, e.target.value)
  }

  const handleChangeFile = (event) => {
    const fileFromLocal = event.target.files?.[0]
    if (fileFromLocal && (fileFromLocal?.size >= 1048576 || !fileFromLocal.type.includes('image'))) {
      toast.error(
        `Dung lượng file tối đa 1 MB
      Định dạng: .JPEG, .PNG`
      )
    } else {
      setFile(fileFromLocal)
    }
  }

  return (
    <div className='mx-auto mb-20 mt-10 max-w-[1400px]'>
      <Helmet>
        <title>Thông tin cá nhân</title>
        <meta name='description' content='Thông tin cá nhân' />
      </Helmet>
      <div className='md:grid md:grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='md:col-span-4'>
          <form className='p-4' onSubmit={onSubmit}>
            <div className='border-b border-gray-300'>
              <h2 className='mb-2 text-2xl font-semibold'>Thông tin cá nhân</h2>
              <p className='mb-4 text-sm text-gray-500'>
                Cập nhật thông tin cá nhân để bảo mật tài khoản và nhận thông báo từ hệ thống
              </p>
            </div>
            <div className='mt-6 sm:grid sm:grid-cols-5 gap-4'>
              <div className='sm:col-span-3 sm:mr-12'>
                <div className='mb-6'>
                  <label htmlFor='cus_name' className='mb-2 block text-sm font-medium text-gray-900'>
                    Tên khách hàng
                  </label>
                  <input
                    type='text'
                    id='cus_name'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    {...register('name')}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='mb-6'>
                  <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900'>
                    Địa chỉ email
                  </label>
                  <input
                    type='text'
                    id='email'
                    disabled
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    {...register('email')}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='mb-6'>
                  <label htmlFor='cus_phone' className='mb-2 block text-sm font-medium text-gray-900'>
                    Số điện thoại
                  </label>
                  <input
                    type='text'
                    id='cus_phone'
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
                    {...register('phone')}
                    onChange={(e) => handleChangeInput(e)}
                  />
                  {errors.phone && <p className='text-sm text-red-500'>{errors.phone.message}</p>}
                </div>
              </div>
              <div className='sm:col-span-2'>
                <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
                  <div className='flex flex-col items-center'>
                    <div className='my-5 h-24 w-24'>
                      <img
                        src={previewImage || user?.avatar}
                        alt=''
                        className='h-full w-full rounded-full object-cover border border-gray-300'
                      />
                    </div>
                    <input
                      className='hidden'
                      type='file'
                      accept='.jpg,.jpeg,.png'
                      ref={fileInputRef}
                      onChange={(event) => handleChangeFile(event)}
                    />
                    <button
                      type='button'
                      onClick={() => fileInputRef.current.click()}
                      className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
                    >
                      Chọn ảnh
                    </button>
                    <div className='mt-3 text-sm text-gray-400'>
                      <div>Dung lượng file tối đa 1 MB</div>
                      <div>Định dạng: .JPEG, .PNG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-8 sm:mt-0 text-center sm:text-left'>
              <button
                type='submit'
                disabled={isUpdateProfilePending || isUploadAvatarPending || isDeleteImagePending}
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800'
              >
                Cập nhật lại thông tin
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
