export const setUserDataIntoLocalStorage = (data) => {
  localStorage.setItem('member', JSON.stringify(data))
}

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('member'))
}

export const removeLocalStorage = () => {
  localStorage.removeItem('isSignedInMember')
  localStorage.removeItem('member')
}

export const setIsSignedIn = (value) => {
  localStorage.setItem('isSignedInMember', value)
}

export const getIsSignedIn = () => {
  return localStorage.getItem('isSignedInMember') || ''
}
