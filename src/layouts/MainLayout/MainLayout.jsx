import Footer from '~/components/Footer'
import Header from '~/components/Header'

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
