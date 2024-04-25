import { useSelector } from 'react-redux'
import { format, add } from 'date-fns'

import './result.scss'

export default function Result() {
  const ticketsListStore = (state) => state.ticketsList
  const ticketsListData = useSelector(ticketsListStore)
  const { tickets } = ticketsListData.ticketsList

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

  if (tickets) {
    const ticketsPack = tickets.slice(0, 5)
    const ticketsList = ticketsPack.map((el) => (
      <div className="result-wrapper" key={`${el.segments[0].date}-${el.segments[0].duration}`}>
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
      </div>
    ))

    return ticketsList
  }
}
