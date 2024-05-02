import { format, add } from 'date-fns'

export function formatDate(date) {
  const formatedDate = format(new Date(date), 'HH:mm')
  return formatedDate
}

export function formatDateArrive(date, duration) {
  const formatedDate = add(new Date(date), { minutes: duration })
  return formatedDate
}

export function formatDuration(date) {
  const formatedDate = format(new Date(0, 0, 0, 0, date), 'HHч mmм')
  return formatedDate
}

export function transfersCount(str) {
  const arr = str.split(',')
  const count = arr.length
  let text = 'Без пересадок'

  if (count === 1 && arr[0] !== '') {
    text = '1 пересадка'
  } else if (count > 1) {
    text = `${count} пересадки`
  }

  return text
}
