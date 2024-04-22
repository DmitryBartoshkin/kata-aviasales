import { useSelector, useDispatch } from 'react-redux'

import { toggleItem } from '../store/filter-slice'
import './filter.scss'

const filterState = (state) => state.filters

export default function Filter() {
  const filterList = useSelector(filterState)
  const dispatch = useDispatch()
  const filters = filterList.filterItems.map((el) => (
    <label htmlFor={el.id} key={el.id}>
      <input
        type="checkbox"
        id={el.id}
        checked={el.checked}
        onChange={() => dispatch(toggleItem({ id: el.id, checked: el.checked }))}
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
