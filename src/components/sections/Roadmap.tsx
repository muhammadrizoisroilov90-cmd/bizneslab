import { ArrowRight, Flag, Target } from 'lucide-react';
import { roadmap } from '../../data/roadmap';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';

export function Roadmap() {
  return (
    <section className="section roadmap-section" id="yol-xaritasi">
      <div className="container">
        <SectionHeading
          eyebrow="Yo'l xaritasi"
          title={
            <>
              4 haftada <em>birinchi to'lovgacha</em>
            </>
          }
          lead="Bu reja QR menyu uchun tuzilgan. Boshqa g'oyalar uchun 2–4 hafta qo'shishingiz mumkin, lekin tartib bir xil: avval mijoz, keyin kod."
          aside={
            <Button href="#aloqa" variant="soft" icon={<ArrowRight size={16} />}>
              Rejani olish
            </Button>
          }
        />

        <div className="roadmap">
          <div className="roadmap__line" aria-hidden="true">
            <span />
          </div>

          {roadmap.map((step, index) => (
            <Reveal key={step.week} delay={index * 90} className="roadmap__item">
              <div className="roadmap__marker">
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="roadmap-card">
                <span className="roadmap-card__week">{step.week}</span>
                <h3>{step.title}</h3>
                <p className="roadmap-card__goal">{step.goal}</p>
                <ul>
                  {step.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <div className="roadmap-card__result">
                  <span>
                    <Target size={14} aria-hidden="true" /> Natija
                  </span>
                  <strong>{step.result}</strong>
                </div>
                <div className="roadmap-card__metric">
                  <Flag size={13} aria-hidden="true" />
                  {step.metric}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
