import { ArrowUpRight, Mail, Phone, Send } from 'lucide-react';
import { navItems, site } from '../../data/site';
import { ideas } from '../../data/ideas';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="logo-link" aria-label="BiznesLab — bosh sahifa">
              <Logo />
            </a>
            <p>
              Tadbirkorlar uchun raqamli mahsulot g'oyalari va tayyor web modellar. Har bir loyiha real mijoz
              muammosidan boshlanadi.
            </p>
            <div className="footer-status">
              <span className="status-dot" aria-hidden="true" />
              Yangi loyihalar uchun ochiq
            </div>
          </div>

          <div className="footer-col">
            <h3>G'oyalar</h3>
            {ideas.slice(0, 4).map((idea) => (
              <a key={idea.key} href="#goyalar">
                {idea.title}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h3>Bo'limlar</h3>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col footer-contact">
            <h3>Aloqa</h3>
            <a href={site.phoneHref}>
              <Phone size={15} aria-hidden="true" />
              {site.phone}
            </a>
            <a href={site.telegramHref} target="_blank" rel="noreferrer noopener">
              <Send size={15} aria-hidden="true" />
              {site.telegram}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={15} aria-hidden="true" />
              {site.email}
            </a>
            <span className="footer-hours">{site.workHours}</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {site.name}. Namuna loyiha.
          </span>
          <span>Raqamlar taxminiy — bozor va hududga qarab farq qiladi.</span>
          <a href="#top" className="footer-up">
            Yuqoriga
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
