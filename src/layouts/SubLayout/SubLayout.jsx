import Footer from '~/components/Footer'
import SubHeader from '~/components/SubHeader'

function MainLayout({ children }) {
  return (
    <>
      <SubHeader />
      {children}
      <Footer />
    </>
  )
}

export default MainLayout
