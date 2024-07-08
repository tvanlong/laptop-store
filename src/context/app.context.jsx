import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'

const initalAppContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  isOpenSidebarMenu: false
}

export const AppContext = createContext(initalAppContext)

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initalAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initalAppContext.profile)
  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState(initalAppContext.isOpenSidebarMenu)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        isOpenSidebarMenu,
        setIsOpenSidebarMenu
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
