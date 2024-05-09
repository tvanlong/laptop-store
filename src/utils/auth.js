export const setUserDataIntoLocalStorage = (data) => {
  localStorage.setItem('member', JSON.stringify(data))
}

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('member'))
}

export const removeLocalStorage = () => {
  localStorage.removeItem('isSignedIn')
  localStorage.removeItem('member')
}

export const setIsSignedIn = (value) => {
  localStorage.setItem('isSignedIn', value)
}

export const getIsSignedIn = () => {
  return localStorage.getItem('isSignedIn') || ''
}
