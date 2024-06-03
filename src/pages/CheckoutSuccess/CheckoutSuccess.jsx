import { Link } from 'react-router-dom'

function CheckoutSuccess() {
  return (
    <div className='h-screen bg-gray-100'>
      <div className='bg-white p-6 md:mx-auto'>
        <svg viewBox='0 0 24 24' className='mx-auto my-6 h-16 w-16 text-green-600'>
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='text-center text-base font-semibold text-gray-900 md:text-2xl'>Đặt hàng thành công! 🎉</h3>
          <p className='my-2 text-gray-600'>
            Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và đang được xử lý. Bạn
            sẽ nhận được thông báo qua email trong thời gian sớm nhất. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ
            với chúng tôi. Chúng tôi luôn sẵn lòng hỗ trợ bạn. 🤗
          </p>
          <p>Chúc bạn một ngày tốt lành! 🌞</p>
          <div className='py-10 text-center'>
            <Link to='/' className='bg-indigo-600 px-12 py-3 font-semibold text-white hover:bg-indigo-500'>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccess
