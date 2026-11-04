import { Sparkles } from 'lucide-react';
import { comparisonRows } from '../../data/comparison';
import { ideasByKey } from '../../data/ideas';
import type { Idea } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const difficultyTone: Record<Idea['difficulty'], 'easy' | 'mid' | 'hard'> = {
  Oson: 'easy',
  "Oson-o'rta": 'easy',
  "O'rta": 'mid',
  "O'rta-yuqori": 'hard',
  Yuqori: 'hard',
};

export function Comparison() {
  return (
    <section className="section comparison-section" id="taqqoslash">
      <div className="container">
        <SectionHeading
          eyebrow="Taqqoslash"
          title={
            <>
              Qaysi model <em>sizga</em> mos?
            </>
          }
          lead="Bir xil mezonlar bo'yicha yonma-yon qiyoslash: to'lov modeli, kirish narxi, MVP muddati va murakkablik."
        />

        <Reveal>
          <div className="table-wrap">
            <table className="comparison-table">
              <caption className="sr-only">
                Oltita web mahsulot g'oyasini biznes mezonlari bo'yicha taqqoslash
              </caption>
              <thead>
                <tr>
                  <th scope="col">G'oya</th>
                  <th scope="col">Model</th>
                  <th scope="col">Kim to'laydi</th>
                  <th scope="col">Kirish narxi</th>
                  <th scope="col">MVP</th>
                  <th scope="col">Murakkablik</th>
                  <th scope="col">Salohiyat</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => {
                  const idea = ideasByKey[row.key];
                  const recommended = row.key === 'qr';
                  return (
                    <tr key={row.key} className={recommended ? 'is-recommended' : undefined}>
                      <th scope="row">
                        <span className="table-idea">
                          <span className="table-idea__num">{idea.num}</span>
                          <span>{idea.title}</span>
                          {recommended ? (
                            <span className="table-rec">
                              <Sparkles size={11} /> Tavsiya
                            </span>
                          ) : null}
                        </span>
                      </th>
                      <td data-label="Model">{row.model}</td>
                      <td data-label="Kim to'laydi">{row.payer}</td>
                      <td data-label="Kirish narxi">{row.entry}</td>
                      <td data-label="MVP">{row.mvp}</td>
                      <td data-label="Murakkablik">
                        <span className={`difficulty difficulty--${difficultyTone[row.difficulty]}`}>
                          {row.difficulty}
                        </span>
                      </td>
                      <td data-label="Salohiyat">
                        <span
                          className={`potential potential--${row.potential === 'Yuqori' ? 'high' : 'mid'}`}
                        >
                          {row.potential}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>

        <p className="table-note">
          Kirish narxi — birinchi oyda olinadigan taxminiy to'lov. Murakkablik texnik va operatsion yukni
          bildiradi.
        </p>
      </div>
    </section>
  );
}
