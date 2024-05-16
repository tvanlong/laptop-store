import * as yup from 'yup'

export const signInSchema = yup.object({
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu không được để trống')
})

export const signUpSchema = yup.object({
  name: yup.string().required('Họ tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  email: yup.string().email('Email không hợp lệ').required('Email không được để trống'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu không được để trống'),
  confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
})
