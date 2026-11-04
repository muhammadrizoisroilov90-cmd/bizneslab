import { ArrowRight, ArrowUpRight, Check, Clock3, Sparkles, TrendingUp, Wallet } from 'lucide-react';
import type { IdeaKey } from '../../types';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

interface RecommendationProps {
  onRequestIdea: (key: IdeaKey) => void;
}

const picks = [
  {
    key: 'qr' as const,
    rank: '01',
    title: 'QR menyu + buyurtma',
    score: 92,
    label: 'Eng tez pul',
    points: ['2–3 haftada MVP', 'Demo 30 soniyada', 'Raqobat hali past'],
    first: '3 ta restoran bilan 14 kunlik pilotdan boshlang.',
  },
  {
    key: 'bron' as const,
    rank: '02',
    title: 'Onlayn bron tizimi',
    score: 84,
    label: 'Barqaror obuna',
    points: ['Har mahallada mijoz bor', "Yo'qotish darhol seziladi", '10 daqiqalik demo'],
    first: "Bitta salonda bir kun kuzatuv o'tkazing.",
  },
];

export function Recommendation({ onRequestIdea }: RecommendationProps) {
  return (
    <section className="section recommendation" id="tavsiya">
      <div className="container">
        <div className="rec-panel">
          <div className="rec-panel__glow" aria-hidden="true" />

          <Reveal className="rec-copy">
            <span className="eyebrow eyebrow--light">
              <span className="eyebrow__line" aria-hidden="true" />
              Operator tavsiyasi
            </span>
            <h2>
              Birinchi bo'lib <em>QR menyudan</em> boshlang
            </h2>
            <p>
              Agar maqsad — eng qisqa vaqtda birinchi to'lovni olish bo'lsa, QR menyu eng past xavfli variant.
              Mahsulotni bir haftada ko'rsatish mumkin, qaror qabul qiluvchi esa restoran egasi.
            </p>

            <div className="rec-points">
              <div>
                <span className="rec-points__icon">
                  <Clock3 size={18} />
                </span>
                <div>
                  <strong>2–3 hafta</strong>
                  <span>MVP tayyor</span>
                </div>
              </div>
              <div>
                <span className="rec-points__icon">
                  <Wallet size={18} />
                </span>
                <div>
                  <strong>100–300 ming</strong>
                  <span>oylik obuna</span>
                </div>
              </div>
              <div>
                <span className="rec-points__icon">
                  <TrendingUp size={18} />
                </span>
                <div>
                  <strong>3 ta pilot</strong>
                  <span>birinchi oy</span>
                </div>
              </div>
            </div>

            <div className="rec-actions">
              <Button onClick={() => onRequestIdea('qr')} icon={<ArrowRight size={17} />}>
                QR rejasini olish
              </Button>
              <Button href="#taqqoslash" variant="ghost-light" icon={<ArrowUpRight size={17} />}>
                Taqqoslash
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="rec-picks">
            <div className="rec-picks__head">
              <span>
                <Sparkles size={14} /> 2026 uchun reyting
              </span>
              <span>MVP → daromad</span>
            </div>

            <div className="rec-list">
              {picks.map((pick) => (
                <button
                  key={pick.key}
                  type="button"
                  className={`rec-card${pick.key === 'qr' ? ' is-top' : ''}`}
                  onClick={() => onRequestIdea(pick.key)}
                  aria-label={`${pick.title} g'oyasi bo'yicha reja olish`}
                >
                  <span className="rec-card__rank">{pick.rank}</span>
                  <div className="rec-card__main">
                    <div className="rec-card__title">
                      <strong>{pick.title}</strong>
                      <span className="rec-card__label">{pick.label}</span>
                    </div>
                    <ul>
                      {pick.points.map((point) => (
                        <li key={point}>
                          <Check size={12} aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <span className="rec-card__first">{pick.first}</span>
                  </div>
                  <div className="rec-card__score">
                    <span>{pick.score}</span>
                    <small>/100</small>
                  </div>
                  <ArrowUpRight className="rec-card__arrow" size={17} aria-hidden="true" />
                </button>
              ))}
            </div>

            <p className="rec-note">
              Uchinchi o'rin — <strong>CRM</strong>: barqaror, lekin sotish uchun ko'proq sabr talab qiladi.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
