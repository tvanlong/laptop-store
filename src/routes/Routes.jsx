import { useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import MainLayout from '~/layouts/MainLayout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Product from '~/pages/Product'
import Register from '~/pages/Register'

function Routes() {
  return useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: path.product,
      element: (
        <MainLayout>
          <Product />
        </MainLayout>
      )
    },
    {
      path: path.login,
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      )
    },
    {
      path: path.register,
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      )
    }
  ])
}

export default Routes
