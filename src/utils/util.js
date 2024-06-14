// Hàm trích xuất public_id từ URL
export const extractPublicIdFromUrl = (url) => {
  const regex = /\/v\d+\/([^/]+)\.\w+$/
  const matches = url.match(regex)
  return matches ? matches[1] : null
}

const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getIdFromNameId = (nameId) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const calculateTimeLeft = () => {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)

  const difference = midnight - now

  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      hours: Math.floor(difference / (1000 * 60 * 60)), // 1 hour = 1000ms * 60s * 60m
      minutes: Math.floor((difference / 1000 / 60) % 60), // 1 minute = 1000ms * 60s
      seconds: Math.floor((difference / 1000) % 60) // 1 second = 1000ms
    }
  }

  return timeLeft
}
