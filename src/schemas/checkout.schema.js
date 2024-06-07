import * as yup from 'yup'

export const checkoutSchema = yup.object({
  shipping_address: yup.string().required('Địa chỉ không được để trống'),
  payment_method: yup.string().required('Phương thức thanh toán không được để trống')
})
