import * as yup from 'yup'

export const checkoutSchema = yup.object({
  shipping_address: yup.string().required('Địa chỉ không được để trống'),
  payment_method: yup.string().required('Phương thức thanh toán không được để trống'),
  province: yup.string().required('Tỉnh/Thành phố không được để trống'),
  district: yup.string().required('Quận/Huyện không được để trống'),
  ward: yup.string().required('Phường/Xã không được để trống')
})
