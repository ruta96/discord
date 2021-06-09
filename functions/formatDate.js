const formatDate = (date) => {
  const d = new Date(date)
  let hours = ''
  let minutes = ''
  let seconds = ''
  let month = ''
  let day = ''

  if (d.getHours() < 10) {
    hours = `0${d.getHours()}`
  } else {
    hours = `${d.getHours()}`
  }

  if (d.getMinutes() < 10) {
    minutes = `0${d.getMinutes()}`
  } else {
    minutes = `${d.getMinutes()}`
  }

  if (d.getSeconds() < 10) {
    seconds = `0${d.getSeconds()}`
  } else {
    seconds = `${d.getSeconds()}`
  }

  if (d.getMonth() + 1 < 10) {
    month = `0${d.getMonth() + 1}`
  } else {
    month = `${d.getMonth() + 1}`
  }

  if (d.getDate() < 10) {
    day = `0${d.getDate()}`
  } else {
    day = `${d.getDate()}`
  }
  const dformat = `${day}.${month}.${d.getFullYear()}, ${hours}:${minutes}:${seconds}`

  return dformat
}
module.exports = formatDate
