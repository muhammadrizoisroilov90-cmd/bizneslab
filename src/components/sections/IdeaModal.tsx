import { ArrowRight, Check, RefreshCw, Sparkles, TriangleAlert } from 'lucide-react';
import type { Idea, IdeaKey } from '../../types';
import { Modal } from '../ui/Modal';
import { IdeaIcon } from '../ui/IdeaIcon';
import { Button } from '../ui/Button';

interface IdeaModalProps {
  idea: Idea | null;
  open: boolean;
  onClose: () => void;
  onRequest: (key: IdeaKey) => void;
  onNext: () => void;
}

export function IdeaModal({ idea, open, onClose, onRequest, onNext }: IdeaModalProps) {
  if (!idea) return null;

  return (
    <Modal open={open} onClose={onClose} labelledBy="idea-modal-title" className="idea-modal">
      <div className="idea-modal__head">
        <span className={`idea-modal__icon accent-${idea.accent}`}>
          <IdeaIcon name={idea.icon} size={28} />
        </span>
        <div>
          <span className="idea-modal__eyebrow">
            G'oya {idea.num}
            {idea.featured ? (
              <>
                <i aria-hidden="true">·</i>
                <span className="idea-modal__rec">
                  <Sparkles size={12} /> Tavsiya etilgan
                </span>
              </>
            ) : null}
          </span>
          <h2 id="idea-modal-title">{idea.title}</h2>
          <p>{idea.tagline}</p>
        </div>
      </div>

      <div className="idea-modal__body">
        <div className="idea-modal__main">
          <div className="detail-block">
            <h3>Muammo</h3>
            <p>{idea.problem}</p>
          </div>

          <div className="detail-block">
            <h3>Yechim</h3>
            <ul className="check-list">
              {idea.solution.map((item) => (
                <li key={item}>
                  <span className="check-list__icon">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-block">
            <h3>Nega ishlaydi</h3>
            <ul className="check-list check-list--mint">
              {idea.why.map((item) => (
                <li key={item}>
                  <span className="check-list__icon">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-block">
            <h3>MVP bosqichlari</h3>
            <ol className="steps">
              {idea.steps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="idea-modal__aside">
          <div className="detail-card">
            <h3>Kim to'laydi va qancha</h3>
            <dl className="money-list">
              {idea.money.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="detail-card">
            <h3>Asosiy ko'rsatkichlar</h3>
            <dl className="spec-list">
              <div>
                <dt>Auditoriya</dt>
                <dd>{idea.audience}</dd>
              </div>
              <div>
                <dt>Model</dt>
                <dd>{idea.model}</dd>
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
          </div>

          <div className="detail-card">
            <h3>Texnologiyalar</h3>
            <div className="chips">
              {idea.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>

          <div className="risk-card">
            <TriangleAlert size={17} aria-hidden="true" />
            <div>
              <strong>Asosiy xavf</strong>
              <p>{idea.risk}</p>
            </div>
          </div>

          <div className="detail-card detail-card--first">
            <h3>Birinchi qadam</h3>
            <p>{idea.firstStep}</p>
          </div>
        </aside>
      </div>

      <div className="idea-modal__footer">
        <div>
          <strong>Shu g'oyani tanlaysizmi?</strong>
          <span>Bepul MVP rejasini yuboraman.</span>
        </div>
        <div className="idea-modal__actions">
          <Button variant="ghost" onClick={onNext} icon={<RefreshCw size={16} />}>
            Keyingi g'oya
          </Button>
          <Button variant="primary" onClick={() => onRequest(idea.key)} icon={<ArrowRight size={16} />}>
            Rejani olish
          </Button>
        </div>
      </div>
    </Modal>
  );
}
