import { useMemo, useState } from 'react';
import { ArrowRight, SearchX } from 'lucide-react';
import { ideaFilters, ideas } from '../../data/ideas';
import type { Idea, IdeaKey, IdeaTag } from '../../types';
import { cn } from '../../lib/cn';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';
import { IdeaCard } from './IdeaCard';
import { IdeaModal } from './IdeaModal';

type FilterKey = 'all' | IdeaTag;

interface IdeasProps {
  onRequestIdea: (key: IdeaKey) => void;
}

export function Ideas({ onRequestIdea }: IdeasProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selected, setSelected] = useState<Idea | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return ideas;
    const activeFilter: IdeaTag = filter;
    return ideas.filter((idea) => idea.tags.includes(activeFilter));
  }, [filter]);

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: ideas.length };
    for (const item of ideaFilters) {
      if (item.key === 'all') continue;
      const tag: IdeaTag = item.key;
      result[tag] = ideas.filter((idea) => idea.tags.includes(tag)).length;
    }
    return result;
  }, []);

  const handleRequest = (key: IdeaKey) => {
    setSelected(null);
    onRequestIdea(key);
  };

  const nextIdea = () => {
    if (!selected) return;
    const index = ideas.findIndex((idea) => idea.key === selected.key);
    setSelected(ideas[(index + 1) % ideas.length]);
  };

  return (
    <section className="section ideas" id="goyalar">
      <div className="container">
        <SectionHeading
          eyebrow="G'oyalar katalogi"
          title={
            <>
              6 ta g'oya — har biri <em>aniq daromad</em> modeli bilan
            </>
          }
          lead="Har bir kartochkada: kim to'laydi, qancha to'laydi va MVP qancha vaqtda tayyor bo'ladi. Batafsil tugmasi orqali to'liq rejani ko'ring."
          aside={
            <div className="catalog-note">
              <span className="catalog-note__label">Boshlash uchun</span>
              <strong>QR menyu</strong>
              <span>eng qisqa MVP · 2–3 hafta</span>
              <button type="button" onClick={() => setSelected(ideas[0])} className="catalog-note__link">
                Rejani ko'rish
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          }
        />

        <Reveal>
          <div className="filters" role="group" aria-label="G'oyalarni filtrlash">
            {ideaFilters.map((item) => {
              const active = filter === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  className={cn('filter', active && 'is-active')}
                  aria-pressed={active}
                  onClick={() => setFilter(item.key)}
                >
                  {item.label}
                  <span>{counts[item.key]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <div className="ideas-grid" key={filter}>
            {filtered.map((idea, index) => (
              <IdeaCard key={idea.key} idea={idea} onOpen={setSelected} index={index} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <SearchX size={26} aria-hidden="true" />
            <p>Bu filtr bo'yicha g'oya topilmadi.</p>
            <Button variant="soft" onClick={() => setFilter('all')}>
              Barchasini ko'rish
            </Button>
          </div>
        )}
      </div>

      <IdeaModal
        idea={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onRequest={handleRequest}
        onNext={nextIdea}
      />
    </section>
  );
}
