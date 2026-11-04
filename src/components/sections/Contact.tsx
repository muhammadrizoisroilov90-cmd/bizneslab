import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Clock3, Loader2, Mail, Phone, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { ideas } from '../../data/ideas';
import { site } from '../../data/site';
import type { IdeaKey } from '../../types';
import { submitLead } from '../../lib/api';
import { leadSchema, type LeadFormValues } from '../../lib/validation';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { useToast } from '../ui/toast-context';

interface ContactProps {
  presetIdea: IdeaKey | '';
}

const budgets = [
  "50–100 ming so'm",
  "100–200 ming so'm",
  "200–500 ming so'm",
  "500 ming so'mdan yuqori",
  'Hali aniq emas',
];

export function Contact({ presetIdea }: ContactProps) {
  const { showToast } = useToast();
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', phone: '', idea: presetIdea, budget: '', message: '', company: '' },
  });

  const onSubmit = async (values: LeadFormValues) => {
    setServerError('');
    try {
      await submitLead({
        name: values.name,
        phone: values.phone,
        idea: values.idea || '',
        budget: values.budget,
        message: values.message,
        source: 'landing',
      });
      setSuccess(true);
      reset();
      showToast("So'rovingiz qabul qilindi");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setServerError('');
    reset();
  };

  return (
    <section className="section contact-section" id="aloqa">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-panel__glow" aria-hidden="true" />

          <Reveal className="contact-copy">
            <span className="eyebrow eyebrow--light">
              <span className="eyebrow__line" aria-hidden="true" />
              Bepul reja
            </span>
            <h2>
              G'oyani tanladikmi?
              <br />
              <em>Keyingi qadam</em> — reja.
            </h2>
            <p>
              Qisqa forma to'ldiring — 24 soat ichida Telegram yoki telefon orqali bog'lanib, tanlangan g'oya
              uchun bosqichma-bosqich MVP rejasini yuboraman.
            </p>

            <ul className="contact-guarantees">
              <li>
                <CheckCircle2 size={16} /> 6 ta g'oya bo'yicha aniq tavsiya
              </li>
              <li>
                <CheckCircle2 size={16} /> MVP bosqichlari va texnik stack
              </li>
              <li>
                <CheckCircle2 size={16} /> Birinchi 10 mijoz uchun skript
              </li>
            </ul>

            <div className="contact-links">
              <a href={site.phoneHref}>
                <span>
                  <Phone size={16} />
                </span>
                <div>
                  <small>Telefon</small>
                  <strong>{site.phone}</strong>
                </div>
              </a>
              <a href={site.telegramHref} target="_blank" rel="noreferrer noopener">
                <span>
                  <Send size={16} />
                </span>
                <div>
                  <small>Telegram</small>
                  <strong>{site.telegram}</strong>
                </div>
              </a>
              <a href={`mailto:${site.email}`}>
                <span>
                  <Mail size={16} />
                </span>
                <div>
                  <small>Email</small>
                  <strong>{site.email}</strong>
                </div>
              </a>
            </div>

            <div className="contact-hours">
              <Clock3 size={15} aria-hidden="true" />
              {site.workHours} · odatda 2 soat ichida javob
            </div>
          </Reveal>

          <Reveal delay={100} className="form-card">
            {success ? (
              <div className="form-success" role="status">
                <span className="form-success__icon">
                  <CheckCircle2 size={30} />
                </span>
                <span className="form-success__eyebrow">So'rov qabul qilindi</span>
                <h3>Rahmat! Tez orada bog'lanaman.</h3>
                <p>
                  Reja 24 soat ichida Telegram yoki telefon orqali yuboriladi. Shoshilinch savol bo'lsa,
                  to'g'ridan-to'g'ri Telegramga yozing.
                </p>
                <div className="form-success__actions">
                  <Button
                    href={site.telegramHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    icon={<Send size={16} />}
                  >
                    Telegramda yozish
                  </Button>
                  <Button variant="ghost" onClick={resetForm}>
                    Yana yuborish
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="form-card__head">
                  <span className="form-card__badge">
                    <Sparkles size={13} /> Bepul
                  </span>
                  <h3>MVP rejasini oling</h3>
                  <p>Forma 1 daqiqadan kam vaqt oladi.</p>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Ismingiz</label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Aziz"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name')}
                    />
                    {errors.name ? (
                      <span className="field-error" id="name-error">
                        {errors.name.message}
                      </span>
                    ) : null}
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone">Telefon / Telegram</label>
                    <input
                      id="phone"
                      type="text"
                      autoComplete="tel"
                      placeholder="+998 90 123 45 67"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      {...register('phone')}
                    />
                    {errors.phone ? (
                      <span className="field-error" id="phone-error">
                        {errors.phone.message}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="idea">Qaysi g'oya yoqdi?</label>
                    <select id="idea" {...register('idea')}>
                      <option value="">Hali tanlamadim</option>
                      {ideas.map((idea) => (
                        <option key={idea.key} value={idea.key}>
                          {idea.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="budget">Byudjet</label>
                    <select id="budget" {...register('budget')}>
                      <option value="">Hali aniq emas</option>
                      {budgets.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message">
                    Qo'shimcha izoh <em>(ixtiyoriy)</em>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Masalan: Toshkentda 3 ta kafe bilan gaplashdim..."
                    {...register('message')}
                  />
                  {errors.message ? <span className="field-error">{errors.message.message}</span> : null}
                </div>

                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="company">Kompaniya</label>
                  <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
                </div>

                {serverError ? (
                  <p className="form-error" role="alert">
                    {serverError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="btn--block"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={17} className="spin" /> Yuborilmoqda...
                    </>
                  ) : (
                    'Rejani olish'
                  )}
                </Button>

                <p className="form-note">
                  <ShieldCheck size={14} aria-hidden="true" />
                  Ma'lumotlaringiz faqat javob berish uchun ishlatiladi. Spam yo'q.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
