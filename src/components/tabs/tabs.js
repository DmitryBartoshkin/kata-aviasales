import { useSelector, useDispatch } from 'react-redux'

import './tabs.scss'
import { activeTab } from '../store/sort-slice'
import { sortTicketsListFastest, sortTicketsListCheapest, sortTicketsListOptimal } from '../store/tickets-slice'

const tabState = (state) => state.sortTab

export default function Tabs() {
  const dispatch = useDispatch()
  const tabList = useSelector(tabState)
  const tabs = tabList.tabs.map((tab) => (
    <li
      className={`tab ${tab.active}`}
      key={tab.id}
      onClick={() => {
        dispatch(activeTab(tab.id))
        if (tab.id === 0) {
          dispatch(sortTicketsListCheapest())
        }
        if (tab.id === 1) {
          dispatch(sortTicketsListFastest())
        }
        if (tab.id === 2) {
          dispatch(sortTicketsListOptimal())
        }
      }}
      role="menuitem"
      aria-hidden="true"
    >
      {tab.title}
    </li>
  ))

  return <ul className="tabs-list">{tabs}</ul>
}
