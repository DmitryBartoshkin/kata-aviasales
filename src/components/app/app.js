import Filter from '../filter'
import Tabs from '../tabs'
import ResultsList from '../results-list'

import './app.scss'
import appLogo from './app-logo.png'

export default function App() {
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
          <Tabs />
          <ResultsList />
        </section>
      </div>
    </div>
  )
}
