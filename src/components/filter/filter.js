import './filter.scss'

export default function Filter() {
  return (
    <div className="filter-wrapper">
      <p className="filter-title">Количество пересадок</p>
      <label htmlFor="all">
        <input type="checkbox" />
        <span>Все</span>
      </label>
      <label htmlFor="0">
        <input type="checkbox" />
        <span>Без пересадок</span>
      </label>
      <label htmlFor="1">
        <input type="checkbox" />
        <span>1 пересадка</span>
      </label>
      <label htmlFor="2">
        <input type="checkbox" />
        <span>2 пересадки</span>
      </label>
      <label htmlFor="3">
        <input type="checkbox" />
        <span>3 пересадки</span>
      </label>
    </div>
  )
}
