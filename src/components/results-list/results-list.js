import Result from '../result'
import './results-list.scss'

export default function ResultsList() {
  return (
    <>
      <ul className="result-list">
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
        <li>
          <Result />
        </li>
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
