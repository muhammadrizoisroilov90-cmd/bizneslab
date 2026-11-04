import { useMemo, useState, type CSSProperties } from 'react';
import { RotateCcw, TrendingUp, Users, Wallet } from 'lucide-react';
import { calcConfigs } from '../../data/calculator';
import { ideasByKey } from '../../data/ideas';
import type { IdeaKey } from '../../types';
import { formatNumber, formatSum, formatCompactSum, percent } from '../../lib/format';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../lib/cn';

function sliderStyle(value: number, min: number, max: number): CSSProperties {
  return { '--range-progress': `${percent(value - min, max - min)}%` } as CSSProperties;
}

export function Calculator() {
  const [activeKey, setActiveKey] = useState<IdeaKey>('qr');
  const config = calcConfigs[activeKey];
  const [count, setCount] = useState(config.count);
  const [price, setPrice] = useState(config.price);

  const monthly = count * price;
  const yearly = monthly * 12;
  const meter = percent(count, config.maxCount);

  const switchIdea = (key: IdeaKey) => {
    const next = calcConfigs[key];
    setActiveKey(key);
    setCount(next.count);
    setPrice(next.price);
  };

  const reset = () => {
    setCount(config.count);
    setPrice(config.price);
  };

  const comparison = useMemo(() => {
    const rows = Object.values(calcConfigs).map((item) => ({
      key: item.key,
      label: item.label,
      value: item.count * item.price,
    }));
    const max = Math.max(...rows.map((row) => row.value));
    return rows
      .sort((a, b) => b.value - a.value)
      .map((row) => ({ ...row, width: Math.max(5, percent(row.value, max)) }));
  }, []);

  return (
    <section className="section calculator-section" id="kalkulyator">
      <div className="container">
        <SectionHeading
          eyebrow="Daromad kalkulyatori"
          title={
            <>
              Modelni tanlang va <em>oylik daromadni</em> ko'ring
            </>
          }
          lead="Mijozlar soni va o'rtacha to'lovni o'zgartiring. Bu taxminiy hisob — real natija sotuv va mahalliy bozorga bog'liq."
          aside={
            <div className="calc-aside">
              <span className="status-dot" />
              <span>Interaktiv hisob</span>
            </div>
          }
        />

        <Reveal>
          <div className="calc">
            <div className="calc__controls">
              <div className="calc__group">
                <span className="field-label">G'oya</span>
                <div className="calc__ideas" role="group" aria-label="G'oya tanlash">
                  {Object.values(calcConfigs).map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={cn('calc-idea', activeKey === item.key && 'is-active')}
                      aria-pressed={activeKey === item.key}
                      onClick={() => switchIdea(item.key)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc__group">
                <div className="calc__label-row">
                  <label htmlFor="calc-count" className="field-label">
                    Mijozlar / oy
                  </label>
                  <output htmlFor="calc-count" className="field-value">
                    {count} ta
                  </output>
                </div>
                <input
                  id="calc-count"
                  type="range"
                  min={5}
                  max={config.maxCount}
                  step={5}
                  value={count}
                  style={sliderStyle(count, 5, config.maxCount)}
                  onChange={(event) => setCount(Number(event.target.value))}
                  aria-valuetext={`${count} ta mijoz`}
                />
                <div className="calc__range-scale">
                  <span>5</span>
                  <span>{config.maxCount}</span>
                </div>
              </div>

              <div className="calc__group">
                <div className="calc__label-row">
                  <label htmlFor="calc-price" className="field-label">
                    O'rtacha to'lov
                  </label>
                  <output htmlFor="calc-price" className="field-value">
                    {formatSum(price)}
                  </output>
                </div>
                <input
                  id="calc-price"
                  type="range"
                  min={config.minPrice}
                  max={config.maxPrice}
                  step={config.priceStep}
                  value={price}
                  style={sliderStyle(price, config.minPrice, config.maxPrice)}
                  onChange={(event) => setPrice(Number(event.target.value))}
                  aria-valuetext={formatSum(price)}
                />
                <div className="calc__range-scale">
                  <span>{formatCompactSum(config.minPrice)}</span>
                  <span>{formatCompactSum(config.maxPrice)}</span>
                </div>
              </div>

              <div className="calc__note-row">
                <p className="calc__note">{config.note}</p>
                <button type="button" className="calc__reset" onClick={reset}>
                  <RotateCcw size={14} aria-hidden="true" />
                  Tiklash
                </button>
              </div>
            </div>

            <div className="calc__result" aria-live="polite">
              <div className="calc__result-glow" aria-hidden="true" />
              <span className="calc__eyebrow">Taxminiy oylik daromad</span>
              <div className="calc__amount">
                {formatNumber(monthly)} <small>so'm</small>
              </div>
              <div className="calc__stats">
                <div>
                  <span>
                    <Wallet size={14} /> Yillik
                  </span>
                  <strong>{formatSum(yearly)}</strong>
                </div>
                <div>
                  <span>
                    <Users size={14} /> 1 mijozdan
                  </span>
                  <strong>{formatSum(price)}</strong>
                </div>
              </div>

              <div className="calc__meter">
                <div className="calc__meter-head">
                  <span>Bandlik prognozi</span>
                  <strong>
                    {count} / {config.maxCount} mijoz
                  </strong>
                </div>
                <div className="meter">
                  <span style={{ width: `${meter}%` }} />
                </div>
              </div>

              <div className="calc__hint">
                <TrendingUp size={16} aria-hidden="true" />
                <p>
                  10 ta mijoz = <strong>{formatSum(price * 10)}</strong> / oy. Birinchi oyda 5–10 mijoz — real
                  maqsad.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="calc-compare">
            <div className="calc-compare__head">
              <h3>Standart hisobda oylik daromad</h3>
              <span>Har bir modelning boshlang'ich parametrlari</span>
            </div>
            <div className="compare-bars">
              {comparison.map((row, index) => (
                <div key={row.key} className={cn('compare-row', row.key === activeKey && 'is-active')}>
                  <span className="compare-row__label">{ideasByKey[row.key].title}</span>
                  <span className="compare-row__track">
                    <span
                      className="compare-row__fill"
                      style={{ width: `${row.width}%`, transitionDelay: `${index * 45}ms` }}
                    />
                  </span>
                  <span className="compare-row__value">{formatCompactSum(row.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
