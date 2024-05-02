import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getSearchIdApi } from '../../stores/tickets-slice'
import Filter from '../filter'
import Sort from '../sort'
import TicketsList from '../tickets-list'
import './app.scss'
import appLogo from '../../assets/app-logo.png'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSearchIdApi())
  }, [dispatch])

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <img className="app-header__logo" src={appLogo} alt="Logo App" />
      </header>
      <div className="app-body">
        <aside>
          <Filter />
        </aside>
        <section className="app-main-content">
          <Sort />
          <TicketsList />
        </section>
      </div>
    </div>
  )
}
