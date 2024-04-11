import './result.scss'
import logoAirCompany from './s7-logo.png'

export default function Result() {
  return (
    <div className="result-wrapper">
      <div className="result-header">
        <span className="result-price">13 400 ₽</span>
        <img className="result-logo" src={logoAirCompany} alt="Logo air company" />
      </div>
      <div className="result-body to">
        <div>
          <span className="result-body-title">Mow - Hkt</span>
          <br />
          10:45 - 08:00
        </div>
        <div>
          <span className="result-body-title">В пути</span>
          <br />
          21ч 15м
        </div>
        <div>
          <span className="result-body-title">2 пересадки</span>
          <br />
          HKG, JNB
        </div>
      </div>
      <div className="result-body from">
        <div>
          <span className="result-body-title">Mow - Hkt</span>
          <br />
          11:20 - 00:50
        </div>
        <div>
          <span className="result-body-title">В пути</span>
          <br />
          13ч 30м
        </div>
        <div>
          <span className="result-body-title">1 пересадка</span>
          <br />
          HKG
        </div>
      </div>
    </div>
  )
}
