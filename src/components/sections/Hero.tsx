import { ArrowRight, BarChart3, CalendarCheck2, Check, Sparkles, Zap } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

const qrPattern = [
  1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1,
];

const chartBars = [36, 44, 39, 58, 52, 67, 62, 78, 74, 88, 82, 100];

function HeroStat({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const animated = useCountUp(value, 1200);
  return (
    <div className="hero-stat">
      <dt>
        {Math.round(animated)}
        {suffix ? <small>{suffix}</small> : null}
      </dt>
      <dd>{label}</dd>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__glow hero__glow--1" />
        <span className="hero__glow hero__glow--2" />
        <span className="hero__glow hero__glow--3" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <Reveal>
            <span className="hero-badge">
              <span className="hero-badge__dot" />
              Tadbirkorlik · 2026 · 6 ta tekshirilgan g'oya
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="hero__title">
              Tadbirkorlik uchun
              <br />
              <em>daromadli web</em> mahsulotlar
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="hero__lead">
              Kim to'laydi, qancha to'laydi va qaysi biri eng tez pul keltiradi — hammasi bir joyda. Har bir
              g'oya uchun MVP muddati, daromad hisobi va birinchi mijozni topish yo'li.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="hero__actions">
              <Button href="#goyalar" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                G'oyalarni ko'rish
              </Button>
              <Button href="#kalkulyator" variant="ghost" size="lg" icon={<BarChart3 size={18} />}>
                Daromadni hisoblash
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <dl className="hero__stats">
              <HeroStat value={6} label="tekshirilgan g'oya" />
              <div className="hero-stat hero-stat--text">
                <dt>
                  2–3 <small>hafta</small>
                </dt>
                <dd>eng tez MVP</dd>
              </div>
              <HeroStat value={300} suffix=" ming" label="maks. oylik obuna" />
            </dl>
          </Reveal>
        </div>

        <Reveal delay={160} className="hero__visual-wrap">
          <div className="hero-visual">
            <div className="hero-visual__aura" aria-hidden="true" />

            <div className="console" aria-hidden="true">
              <div className="console__bar">
                <span className="console__dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="console__path">bizneslab / launch</span>
                <span className="console__status">
                  <span /> live
                </span>
              </div>

              <div className="console__body">
                <div className="console__head">
                  <div>
                    <span className="console__kicker">Tanlangan model</span>
                    <strong>QR menyu + buyurtma</strong>
                  </div>
                  <span className="console__badge">
                    <Sparkles size={12} /> Tavsiya
                  </span>
                </div>

                <div className="console__metrics">
                  <div>
                    <span>Oylik daromad</span>
                    <b>
                      4 200 000 <small>so'm</small>
                    </b>
                  </div>
                  <div>
                    <span>MVP</span>
                    <b>
                      2–3 <small>hafta</small>
                    </b>
                  </div>
                  <div className="console__trend">
                    <span>O'sish</span>
                    <b>
                      <Zap size={13} /> +18%
                    </b>
                  </div>
                </div>

                <div className="console__chart">
                  <div className="console__chart-head">
                    <span>12 oylik prognoz</span>
                    <span>obuna modeli</span>
                  </div>
                  <div className="chart">
                    {chartBars.map((height, index) => (
                      <span
                        key={index}
                        className={index === chartBars.length - 1 ? 'chart__bar is-last' : 'chart__bar'}
                        style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="console__bottom">
                  <span className="console__avatars">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>3 ta restoran pilotda</span>
                  <span className="console__check">
                    <Check size={12} /> 14 kun
                  </span>
                </div>
              </div>
            </div>

            <div className="float-card float-card--order">
              <span className="float-card__icon">
                <CalendarCheck2 size={17} />
              </span>
              <div>
                <strong>Yangi buyurtma</strong>
                <span>Stol 04 · 128 000 so'm</span>
              </div>
              <span className="float-card__dot" />
            </div>

            <div className="float-card float-card--qr">
              <div className="mini-qr">
                <div className="mini-qr__grid">
                  {qrPattern.map((cell, index) => (
                    <span key={index} className={cell ? 'is-on' : undefined} />
                  ))}
                </div>
                <span className="mini-qr__line" />
              </div>
              <div>
                <strong>QR menyu</strong>
                <span>30 soniyada tayyor</span>
              </div>
            </div>

            <div className="float-pill">
              <span className="status-dot" />
              Birinchi mijozga tayyor
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container hero__foot">
        <span>Tayyor model:</span>
        <strong>Mahalliy biznes</strong>
        <span className="hero__sep" aria-hidden="true" />
        <strong>Oylik obuna</strong>
        <span className="hero__sep" aria-hidden="true" />
        <strong>Komissiya</strong>
        <span className="hero__sep" aria-hidden="true" />
        <strong>0 dan boshlash</strong>
      </div>
    </section>
  );
}
