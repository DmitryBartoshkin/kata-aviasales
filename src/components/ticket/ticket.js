import { useSelector } from 'react-redux'

import { formatDate, formatDateArrive, formatDuration, transfersCount } from '../../utils'
import './ticket.scss'

export default function Ticket({ countTicketsShowned }) {
  const ticketsListStore = (state) => state.ticketsList
  const ticketsListData = useSelector(ticketsListStore)
  const { ticketsList } = ticketsListData

  if (ticketsList) {
    let message = null
    const ticketsPack = ticketsList.filter((el) => el.extraClass).slice(0, countTicketsShowned)

    if (ticketsPack.length === 0) {
      message = 'Рейсов, подходящих под заданные фильтры, не найдено!'
    }

    const tickets = ticketsPack.map((el) => (
      <li
        className="ticket-wrapper"
        key={`${el.segments[0].date}-${el.segments[0].duration}-${el.segments[1].duration}`}
      >
        <div className="ticket-header">
          <span className="ticket-price">{`${el.price}`.replace(/(?=\d{3}$)/, ' ')} ₽</span>
          <img className="ticket-logo-carrier" src={`//pics.avs.io/99/36/${el.carrier}.png`} alt="Logo air company" />
        </div>
        <div className="ticket-body to">
          <div>
            <span className="ticket-body-title">
              {el.segments[0].origin} - {el.segments[0].destination}
            </span>
            <br />
            {formatDate(`${el.segments[0].date}`)} {' - '}
            {formatDate(formatDateArrive(`${el.segments[0].date}`, `${el.segments[0].duration}`))}
          </div>
          <div>
            <span className="ticket-body-title">В пути</span>
            <br />
            {formatDuration(`${el.segments[0].duration}`)}
          </div>
          <div>
            <span className="ticket-body-title">{transfersCount(`${el.segments[0].stops}`)}</span>
            <br />
            {`${el.segments[0].stops}`.replaceAll(',', ', ')}
          </div>
        </div>
        <div className="ticket-body from">
          <div>
            <span className="ticket-body-title">
              {el.segments[1].origin} - {el.segments[1].destination}
            </span>
            <br />
            {formatDate(`${el.segments[1].date}`)} {' - '}
            {formatDate(formatDateArrive(`${el.segments[1].date}`, `${el.segments[1].duration}`))}
          </div>
          <div>
            <span className="ticket-body-title">В пути</span>
            <br />
            {formatDuration(`${el.segments[1].duration}`)}
          </div>
          <div>
            <span className="ticket-body-title">{transfersCount(`${el.segments[1].stops}`)}</span>
            <br />
            {`${el.segments[1].stops}`.replaceAll(',', ', ')}
          </div>
        </div>
      </li>
    ))

    return message || tickets
  }
}
