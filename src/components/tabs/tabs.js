import { useSelector, useDispatch } from 'react-redux'

import './tabs.scss'
import { activeTab } from '../store/sort-slice'

const tabState = (state) => state.sortTab

export default function Tabs() {
  const dispatch = useDispatch()
  const tabList = useSelector(tabState)
  const tabs = tabList.tabs.map((tab) => (
    <li
      className={`tab ${tab.active}`}
      key={tab.id}
      onClick={() => dispatch(activeTab(tab.id))}
      role="menuitem"
      aria-hidden="true"
    >
      {tab.title}
    </li>
  ))

  return <ul className="tabs-list">{tabs}</ul>
}
