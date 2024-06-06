import { Toaster } from 'sonner'
import Routes from '~/routes/Routes'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes />
      <Toaster richColors />
    </>
  )
}

export default App
