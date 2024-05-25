import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo } from 'react'
import { getProfile } from '~/apis/user.api'
import Navbar from '~/components/Navbar'
import { AppContext } from '~/context/app.context'

function Order({ setProgress }) {
  const { profile } = useContext(AppContext)
  const { data: userData } = useQuery({
    queryKey: ['profile', profile?._id],
    queryFn: () => getProfile(profile?._id),
    enabled: !!profile?._id
  })

  const user = useMemo(() => userData?.data?.data || {}, [userData])

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])
  return (
    <div className='max-w-[1400px] mx-auto mt-10 mb-20'>
      <div className='grid grid-cols-5 gap-8 px-6'>
        <Navbar user={user} />
        <div className='col-span-4'>
          <div className='p-4 shadow-inner border border-gray-200 mb-10'>
            <div className='flex justify-between p-4 border-b border-gray-200'>
              <div className='text-bold'>
                Mã đơn hàng: <span className='font-extrabold'></span>
              </div>
              <h4 className='text-bold'>
                <i className='fa-solid fa-spinner'></i>
                {/* <i className='fa-solid fa-person'></i>
                <i className='fa-solid fa-truck'></i>
                <i className='fa-solid fa-check'></i>
                <i className='fa-solid fa-circle-xmark'></i> */}
              </h4>
            </div>
            <div className='p-4 border-b border-gray-200'>
              <div className='flex items-center py-4'>
                <img className='w-20 h-20 rounded-lg' src='' alt='' />
                <div className='flex-1 ml-5'>
                  <h4 className='text-bold max-w-[600px]'>
                    [Mới 100%] Laptop Dell Inspiron 3501 i3 1005G1/4GB/256GB/15.6" FHD/Win10 (N3501A)
                  </h4>
                  <span className='text-gray-700'>x 2</span>
                </div>
                <div>
                  <span className='text-sm line-through text-gray-400 mr-4'>₫ 2.000.000</span>
                  <span className='text-sm text-gray-400'>₫ 2.000.000</span>
                </div>
              </div>
            </div>
            <h4 className='text-right text-bold p-4'>
              <span className='text-lg mr-3'>Thành tiền:</span>
              <span className="text-xl text-red-700 @if($order -> status == 'Đã hủy') line-through @endif">
                ₫ 2.000.000
              </span>
            </h4>
            <div className='text-right' method='POST'>
              <button
                type='submit'
                className='text-white rounded-lg bg-green-700 hover:bg-green-800 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2'
              >
                Đã nhận hàng
              </button>
              <div className='text-xs text-red-500'>Chỉ bấm khi đơn hàng đã được giao thành công đến bạn!</div>
            </div>
            {/* <div className='text-right' method='POST'>
              <button
                type='submit'
                className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2'
              >
                Hủy đơn hàng
              </button>
              <div className='text-xs text-red-500'>Đơn hàng đang giao sẽ không thể hủy!</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
