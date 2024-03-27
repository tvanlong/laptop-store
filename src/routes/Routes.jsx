import { useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import SubLayout from '~/layouts/SubLayout'
import MainLayout from '~/layouts/MainLayout'
import Cart from '~/pages/Cart'
import Category from '~/pages/Category'
import ChangePassword from '~/pages/ChangePassword'
import Checkout from '~/pages/Checkout'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import Order from '~/pages/Order'
import Product from '~/pages/Product'
import Profile from '~/pages/Profile'
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
      path: path.cart,
      element: (
        <MainLayout>
          <Cart />
        </MainLayout>
      )
    },
    {
      path: path.checkout,
      element: (
        <MainLayout>
          <Checkout />
        </MainLayout>
      )
    },
    {
      path: path.order,
      element: (
        <MainLayout>
          <Order />
        </MainLayout>
      )
    },
    {
      path: path.profile,
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      )
    },
    {
      path: path.changePassword,
      element: (
        <MainLayout>
          <ChangePassword />
        </MainLayout>
      )
    },
    {
      path: path.login,
      element: (
        <SubLayout>
          <Login />
        </SubLayout>
      )
    },
    {
      path: path.register,
      element: (
        <SubLayout>
          <Register />
        </SubLayout>
      )
    }
  ])
}

export default Routes
