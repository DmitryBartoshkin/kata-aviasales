import { useSelector } from 'react-redux'
import { format, add } from 'date-fns'

import './result.scss'

export default function Result({ countTicketsShowned }) {
  const ticketsListStore = (state) => state.ticketsList
  const ticketsListData = useSelector(ticketsListStore)
  const { ticketsList } = ticketsListData

  function formatDate(date) {
    const formatedDate = format(new Date(date), 'HH:mm')
    return formatedDate
  }

  function formatDateArrive(date, duration) {
    const formatedDate = add(new Date(date), { minutes: duration })
    return formatedDate
  }

  function formatDuration(date) {
    const formatedDate = format(new Date(0, 0, 0, 0, date), 'HHч mmм')
    return formatedDate
  }

  function stopsCount(str) {
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

  if (ticketsList) {
    let message = null
    const ticketsPack = ticketsList
      .slice(0, 499)
      .filter((el) => el.extraClass)
      .slice(0, countTicketsShowned)

    if (ticketsPack.length === 0) {
      message = 'Рейсов, подходящих под заданные фильтры, не найдено!'
    }

    const tickets = ticketsPack.map((el) => (
      <li
        className={`result-wrapper${el.extraClass ? ` ${el.extraClass}` : ''}`}
        key={`${el.segments[0].date}-${el.segments[0].duration}-${el.segments[1].duration}`}
      >
        <div className="result-header">
          <span className="result-price">{`${el.price}`.replace(/(?=\d{3}$)/, ' ')} ₽</span>
          <img className="result-logo" src={`//pics.avs.io/99/36/${el.carrier}.png`} alt="Logo air company" />
        </div>
        <div className="result-body to">
          <div>
            <span className="result-body-title">
              {el.segments[0].origin} - {el.segments[0].destination}
            </span>
            <br />
            {formatDate(`${el.segments[0].date}`)} {' - '}
            {formatDate(formatDateArrive(`${el.segments[0].date}`, `${el.segments[0].duration}`))}
          </div>
          <div>
            <span className="result-body-title">В пути</span>
            <br />
            {formatDuration(`${el.segments[0].duration}`)}
          </div>
          <div>
            <span className="result-body-title">{stopsCount(`${el.segments[0].stops}`)}</span>
            <br />
            {`${el.segments[0].stops}`.replaceAll(',', ', ')}
          </div>
        </div>
        <div className="result-body from">
          <div>
            <span className="result-body-title">
              {el.segments[1].origin} - {el.segments[1].destination}
            </span>
            <br />
            {formatDate(`${el.segments[1].date}`)} {' - '}
            {formatDate(formatDateArrive(`${el.segments[1].date}`, `${el.segments[1].duration}`))}
          </div>
          <div>
            <span className="result-body-title">В пути</span>
            <br />
            {formatDuration(`${el.segments[1].duration}`)}
          </div>
          <div>
            <span className="result-body-title">{stopsCount(`${el.segments[1].stops}`)}</span>
            <br />
            {`${el.segments[1].stops}`.replaceAll(',', ', ')}
          </div>
        </div>
      </li>
    ))

    return message || tickets
  }
}
