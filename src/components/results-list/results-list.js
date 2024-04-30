import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'

import { getTicketsListApi, sortTicketsListCheapest } from '../store/tickets-slice'
import Result from '../result'
import './results-list.scss'

export default function ResultsList() {
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
      <ul className="result-list">
        <Result countTicketsShowned={countTicketsShowned} />
        {loader ? <Spin /> : null}
      </ul>
      <button
        className="btn-more-results"
        type="button"
        onClick={() => setCountTicketsShowned(countTicketsShowned + 5)}
      >
        Показать ещё 5 билетов!
      </button>
    </>
  )
}
