import { useSelector, useDispatch } from 'react-redux'

import { toggleItem } from '../../stores/filter-slice'
import { filterTicketsList } from '../../stores/tickets-slice'
import './filter.scss'

export default function Filter() {
  const filterState = (state) => state.filters
  const filterListData = useSelector(filterState)
  const dispatch = useDispatch()
  const { filterItems } = filterListData
  const filters = filterItems.map((el) => (
    <label htmlFor={el.id} key={el.id}>
      <input
        type="checkbox"
        id={el.id}
        checked={el.checked}
        onChange={() => {
          dispatch(toggleItem({ id: el.id, checked: el.checked }))
          dispatch(filterTicketsList({ id: el.id, checked: el.checked }))
        }}
      />
      <span>{el.title}</span>
    </label>
  ))
  return (
    <div className="filter-wrapper">
      <p className="filter-title">Количество пересадок</p>
      {filters}
    </div>
  )
}
