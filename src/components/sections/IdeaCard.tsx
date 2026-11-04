import { ArrowUpRight, Sparkles } from 'lucide-react';
import type { Idea } from '../../types';
import { cn } from '../../lib/cn';
import { IdeaIcon } from '../ui/IdeaIcon';

interface IdeaCardProps {
  idea: Idea;
  onOpen: (idea: Idea) => void;
  index: number;
}

export function IdeaCard({ idea, onOpen, index }: IdeaCardProps) {
  const titleId = `idea-title-${idea.key}`;

  return (
    <article
      className={cn('idea-card', `accent-${idea.accent}`, idea.featured && 'idea-card--featured')}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <button
        type="button"
        className="idea-card__overlay"
        aria-labelledby={titleId}
        onClick={() => onOpen(idea)}
      />

      <div className="idea-card__top">
        <span className="idea-card__icon">
          <IdeaIcon name={idea.icon} size={22} />
        </span>
        <span className="idea-card__num">{idea.num}</span>
        {idea.featured ? (
          <span className="idea-card__badge">
            <Sparkles size={12} aria-hidden="true" />
            Tavsiya
          </span>
        ) : null}
      </div>

      <div className="idea-card__content">
        <h3 id={titleId}>{idea.title}</h3>
        <p className="idea-card__tagline">{idea.tagline}</p>
        <p className="idea-card__summary">{idea.summary}</p>

        <dl className="idea-card__meta">
          <div>
            <dt>Model</dt>
            <dd>{idea.model}</dd>
          </div>
          <div>
            <dt>Narx</dt>
            <dd>{idea.price}</dd>
          </div>
          <div>
            <dt>MVP</dt>
            <dd>{idea.mvp}</dd>
          </div>
          <div>
            <dt>Murakkablik</dt>
            <dd>{idea.difficulty}</dd>
          </div>
        </dl>

        <div className="idea-card__bottom">
          <div className="tags" aria-label="Teglar">
            {idea.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="tag">
                {tag === 'fast'
                  ? 'Tez pul'
                  : tag === 'subscription'
                    ? 'Abonent'
                    : tag === 'marketplace'
                      ? 'Marketplace'
                      : 'Tavsiya'}
              </span>
            ))}
          </div>
          <span className="idea-card__more">
            Batafsil
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
