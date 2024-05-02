import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import { getTicketsListApi, sortTicketsListCheapest } from '../../stores/tickets-slice'
import Ticket from '../ticket'
import './tickets-list.scss'

export default function TicketsList() {
  const [countTicketsShowned, setCountTicketsShowned] = useState(5)
  const ticketsListStore = (state) => state.ticketsList
  const ticketsListData = useSelector(ticketsListStore)
  const { searchId } = ticketsListData.requestData
  const { isStop, loader } = ticketsListData
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchId) {
      dispatch(getTicketsListApi(searchId))
      dispatch(sortTicketsListCheapest())
    }
  }, [dispatch, searchId, isStop])

  return (
    <>
      <ul className="tickets-list">
        <Ticket countTicketsShowned={countTicketsShowned} />
        {loader ? <Spin /> : null}
      </ul>
      <button
        className="btn-more-tickets"
        type="button"
        onClick={() => setCountTicketsShowned(countTicketsShowned + 5)}
      >
        Показать ещё 5 билетов!
      </button>
    </>
  )
}
