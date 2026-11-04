import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, site } from '../../data/site';
import { cn } from '../../lib/cn';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import type { Theme } from '../../hooks/useTheme';
import { Logo } from './Logo';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
}

export function Header({ theme, onToggleTheme, activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={cn('site-header', scrolled && 'is-scrolled', menuOpen && 'menu-open')}>
      <div className="container header-inner">
        <a href="#top" className="logo-link" onClick={closeMenu} aria-label="BiznesLab — bosh sahifa">
          <Logo />
        </a>

        <nav className="nav" aria-label="Asosiy navigatsiya">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const active = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn('nav__link', active && 'is-active')}
                aria-current={active ? 'true' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
            title={theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
          >
            <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
              <Sun size={18} />
            </span>
            <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
              <Moon size={18} />
            </span>
          </button>

          <a className="btn btn--primary btn--sm header-cta" href="#aloqa">
            <span>Loyihani muhokama qilish</span>
            <ArrowRight size={16} className="btn__icon" aria-hidden="true" />
          </a>

          <button
            type="button"
            className="icon-button burger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn('mobile-menu', menuOpen && 'is-open')}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobil navigatsiya">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              style={{ transitionDelay: `${index * 35}ms` }}
            >
              <span className="mobile-menu__index">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <a className="btn btn--primary btn--block" href="#aloqa" onClick={closeMenu}>
            Bepul reja olish
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href={site.telegramHref}
            target="_blank"
            rel="noreferrer noopener"
            className="mobile-menu__telegram"
          >
            {site.telegram}
          </a>
        </div>
      </div>
    </header>
  );
}
