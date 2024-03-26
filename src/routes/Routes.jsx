import { useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import MainLayout from '~/layouts/MainLayout'
import Category from '~/pages/Category'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Product from '~/pages/Product'
import Register from '~/pages/Register'
import Search from '~/pages/Search'
import Subcategory from '~/pages/Subcategory'

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
      path: path.category,
      element: (
        <MainLayout>
          <Category />
        </MainLayout>
      )
    },
    {
      path: path.subcategory,
      element: (
        <MainLayout>
          <Subcategory />
        </MainLayout>
      )
    },
    {
      path: path.search,
      element: (
        <MainLayout>
          <Search />
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
