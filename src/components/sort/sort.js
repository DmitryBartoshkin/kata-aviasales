import { useSelector, useDispatch } from 'react-redux'

import './sort.scss'
import { activeTab } from '../../stores/sort-slice'
import { sortTicketsListFastest, sortTicketsListCheapest, sortTicketsListOptimal } from '../../stores/tickets-slice'

const tabState = (state) => state.sortTab

export default function Sort() {
  const dispatch = useDispatch()
  const sortList = useSelector(tabState)
  const sort = sortList.tabs.map((el) => (
    <li
      className={`sort ${el.active}`}
      key={el.id}
      onClick={() => {
        dispatch(activeTab(el.id))
        if (el.id === 0) {
          dispatch(sortTicketsListCheapest())
        }
        if (el.id === 1) {
          dispatch(sortTicketsListFastest())
        }
        if (el.id === 2) {
          dispatch(sortTicketsListOptimal())
        }
      }}
      role="menuitem"
      aria-hidden="true"
    >
      {el.title}
    </li>
  ))

  return <ul className="sort-list">{sort}</ul>
}
