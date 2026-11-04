import { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { faqs } from '../../data/faqs';
import { cn } from '../../lib/cn';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <SectionHeading
            eyebrow="Savol-javob"
            title={
              <>
                Ochiq <em>savollar</em>
              </>
            }
            lead="Loyiha, texnologiya va birinchi mijoz haqida eng ko'p so'raladigan savollar."
          />
          <div className="faq-contact">
            <p>Javob topilmadimi?</p>
            <a href="#aloqa">
              Savol yuborish
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <Reveal key={item.question} delay={index * 40} className={cn('faq-item', isOpen && 'is-open')}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? <Minus size={17} /> : <Plus size={17} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-answer"
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
