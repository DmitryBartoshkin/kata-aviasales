import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getTicketsListApi } from '../store/tickets-slice'
import Result from '../result'
import './results-list.scss'

export default function ResultsList() {
  const ticketsListStore = (state) => state.ticketsList
  const ticketsList = useSelector(ticketsListStore)
  const { searchId } = ticketsList.requestData
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchId) {
      dispatch(getTicketsListApi(searchId))
    }
  }, [dispatch, searchId])

  return (
    <>
      <ul className="result-list">
        <li>
          <Result />
        </li>
      </ul>
      <button className="btn-more-results" type="button">
        Показать ещё 5 билетов!
      </button>
    </>
  )
}
