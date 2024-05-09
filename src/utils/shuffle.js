export const shuffle = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) // random index from 0 to i
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]] // swap elements with index i and j in the array
  }
  return newArray
}
