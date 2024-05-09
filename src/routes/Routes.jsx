import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import SubLayout from '~/layouts/SubLayout'
import MainLayout from '~/layouts/MainLayout'
import { lazy, useContext, useState, Suspense } from 'react'
import { AppContext } from '~/context/app.context'
import Loading from '~/components/Loading'
import LoadingBar from 'react-top-loading-bar'

const Cart = lazy(() => import('~/pages/Cart'))
const Category = lazy(() => import('~/pages/Category'))
const ChangePassword = lazy(() => import('~/pages/ChangePassword'))
const Checkout = lazy(() => import('~/pages/Checkout'))
const Home = lazy(() => import('~/pages/Home'))
const Login = lazy(() => import('~/pages/Login'))
const Order = lazy(() => import('~/pages/Order'))
const Product = lazy(() => import('~/pages/Product'))
const Profile = lazy(() => import('~/pages/Profile'))
const Register = lazy(() => import('~/pages/Register'))
const Search = lazy(() => import('~/pages/Search'))
const Subcategory = lazy(() => import('~/pages/Subcategory'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Nếu đã đăng nhập thì cho phép truy cập các route con, ngược lại chuyển hướng về trang login
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  // Nếu đã đăng nhập thì chuyển hướng về trang chủ, ngược lại cho phép truy cập các route con
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.dashboard} />
}

function Routes() {
  const [progress, setProgress] = useState(0)
  const element = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Home setProgress={setProgress} />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.product,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Product setProgress={setProgress} />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.category,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Category setProgress={setProgress} />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.subcategory,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Subcategory setProgress={setProgress} />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.search,
      element: (
        <MainLayout>
          <Suspense fallback={<Loading />}>
            <Search setProgress={setProgress} />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Cart setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.checkout,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Checkout setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.order,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Order setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <Profile setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.changePassword,
          element: (
            <MainLayout>
              <Suspense fallback={<Loading />}>
                <ChangePassword setProgress={setProgress} />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <SubLayout>
              <Suspense fallback={<Loading />}>
                <Login setProgress={setProgress} />
              </Suspense>
            </SubLayout>
          )
        },
        {
          path: path.register,
          element: (
            <SubLayout>
              <Suspense fallback={<Loading />}>
                <Register setProgress={setProgress} />
              </Suspense>
            </SubLayout>
          )
        }
      ]
    }
  ])

  return (
    <div>
      <LoadingBar color='#337AB7' progress={progress} onLoaderFinished={() => setProgress(0)} />
      {element}
    </div>
  )
}

export default Routes
