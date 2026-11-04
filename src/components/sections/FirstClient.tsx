import { ArrowRight, Check, Clipboard, MessageCircle, Send } from 'lucide-react';
import { site } from '../../data/site';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { useToast } from '../ui/toast-context';

const pitch = `Assalomu alaykum! Men [ism] — restoranlar uchun QR menyu tizimini qilaman.

Sizning menyuingiz yangilanganda ofitsiantlar har stolga borishi shart emas: mijoz QR kodni skanerlaydi, taomni tanlaydi va buyurtma darhol oshxonaga tushadi.

3 ta restoranda 14 kunlik bepul sinov qilib ko'rsataman. Agar natija bo'lmasa — hech qanday to'lov yo'q.

15 daqiqa vaqt topib, 30 soniyalik demoni ko'rsatsam bo'ladimi?`;

const steps = [
  {
    title: "30 ta restoran ro'yxati",
    text: 'Yaqin atrofdagi restoran, kafe va choyxonalarni yozing. Har biriga egasining ismi va Instagram sahifasi bilan karta oching.',
  },
  {
    title: '10 ta jonli suhbat',
    text: "Telegramda emas, joyida boring. Menyuni qanday yangilashlarini so'rang va jarayonni o'z ko'zingiz bilan ko'ring.",
  },
  {
    title: '2 ta bepul pilot',
    text: '“14 kun bepul, keyin oyiga 200 ming” — bu taklifni aniq ayting. Pilot natijasini raqam bilan yozib oling.',
  },
];

export function FirstClient() {
  const { showToast } = useToast();

  const copyPitch = async () => {
    try {
      await navigator.clipboard.writeText(pitch);
      showToast('Pitch matni nusxalandi');
    } catch {
      showToast("Nusxalab bo'lmadi — matnni qo'lda belgilang", 'info');
    }
  };

  return (
    <section className="section first-client" id="birinchi-mijoz">
      <div className="container">
        <SectionHeading
          eyebrow="Birinchi mijoz"
          title={
            <>
              Kod emas, <em>suhbat</em> — birinchi qadam
            </>
          }
          lead="Eng ko'p loyihalar mahsulot yomonligidan emas, hech kim sotmagani uchun o'ladi. Birinchi haftada 10 ta suhbat — 2 ta pilotdan ko'ra qimmatroq."
        />

        <div className="first-grid">
          <Reveal className="first-steps">
            {steps.map((step, index) => (
              <div className="first-step" key={step.title}>
                <span className="first-step__num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
                <Check className="first-step__check" size={18} aria-hidden="true" />
              </div>
            ))}

            <div className="first-metrics">
              <div>
                <strong>30</strong>
                <span>restoran ro'yxati</span>
              </div>
              <div>
                <strong>10</strong>
                <span>jonli suhbat</span>
              </div>
              <div>
                <strong>3</strong>
                <span>demo</span>
              </div>
              <div>
                <strong>2</strong>
                <span>pilot</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="pitch-card">
            <div className="pitch-card__head">
              <div>
                <span className="pitch-card__eyebrow">
                  <MessageCircle size={14} /> Tayyor pitch
                </span>
                <h3>Telegramdagi birinchi xabar</h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={copyPitch}
                aria-label="Pitch matnini nusxalash"
              >
                <Clipboard size={17} />
              </button>
            </div>

            <pre className="pitch-card__text">{pitch}</pre>

            <div className="pitch-card__footer">
              <span>O'rtacha javob: 10 ta xabardan 2–3 tasi</span>
              <a
                href={site.telegramHref}
                target="_blank"
                rel="noreferrer noopener"
                className="pitch-card__link"
              >
                <Send size={14} />
                Telegramda yozish
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="first-cta">
          <div>
            <span className="first-cta__eyebrow">Keyingi qadam</span>
            <p>Qaysi g'oya sizga yaqin? 15 daqiqalik suhbatda birgalikda tanlaymiz.</p>
          </div>
          <Button href="#aloqa" icon={<ArrowRight size={16} />}>
            Bepul konsultatsiya
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
