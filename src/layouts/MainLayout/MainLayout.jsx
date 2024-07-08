import Footer from '~/components/Footer'
import Header from '~/components/Header'
import SidebarMenu from '~/components/SidebarMenu'

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <SidebarMenu />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
