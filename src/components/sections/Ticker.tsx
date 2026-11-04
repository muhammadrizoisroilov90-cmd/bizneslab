import { sectors } from '../../data/site';

export function Ticker() {
  return (
    <div className="ticker" aria-label="Xizmat ko'rsatiladigan sohalar">
      <div className="ticker__fade ticker__fade--left" aria-hidden="true" />
      <div className="ticker__track">
        {[0, 1].map((group) => (
          <div className="ticker__group" key={group} aria-hidden={group === 1}>
            {sectors.map((sector) => (
              <span key={`${group}-${sector}`}>
                <i aria-hidden="true" />
                {sector}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="ticker__fade ticker__fade--right" aria-hidden="true" />
    </div>
  );
}
