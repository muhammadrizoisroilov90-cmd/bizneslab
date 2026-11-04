import { useCallback, useState } from 'react';
import type { IdeaKey } from './types';
import { useTheme } from './hooks/useTheme';
import { useScrollSpy } from './hooks/useScrollSpy';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ProgressBar } from './components/layout/ProgressBar';
import { BackToTop } from './components/layout/BackToTop';
import { Hero } from './components/sections/Hero';
import { Ticker } from './components/sections/Ticker';
import { Ideas } from './components/sections/Ideas';
import { Recommendation } from './components/sections/Recommendation';
import { Calculator } from './components/sections/Calculator';
import { Comparison } from './components/sections/Comparison';
import { Roadmap } from './components/sections/Roadmap';
import { FirstClient } from './components/sections/FirstClient';
import { Faq } from './components/sections/Faq';
import { Contact } from './components/sections/Contact';

const sectionIds = ['goyalar', 'tavsiya', 'kalkulyator', 'yol-xaritasi', 'faq'] as const;

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(sectionIds);
  const [preset, setPreset] = useState<{ idea: IdeaKey | ''; token: number }>({ idea: '', token: 0 });

  const requestIdea = useCallback((key: IdeaKey) => {
    setPreset((current) => ({ idea: key, token: current.token + 1 }));
    window.setTimeout(() => {
      document.getElementById('aloqa')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => document.getElementById('name')?.focus({ preventScroll: true }), 550);
    }, 60);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Asosiy kontentga o'tish
      </a>
      <ProgressBar />
      <Header theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

      <main id="main">
        <Hero />
        <Ticker />
        <Ideas onRequestIdea={requestIdea} />
        <Recommendation onRequestIdea={requestIdea} />
        <Calculator />
        <Comparison />
        <Roadmap />
        <FirstClient />
        <Faq />
        <Contact key={`${preset.idea}-${preset.token}`} presetIdea={preset.idea} />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
