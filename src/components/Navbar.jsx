import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const t = {
  fr: { services: 'Services', ai: 'IA Créative', reservation: 'Réservation', contact: 'Contact', cta: 'Demander un devis' },
  nl: { services: 'Diensten',  ai: 'Creatieve AI', reservation: 'Reservering',  contact: 'Contact', cta: 'Offerte aanvragen' },
  en: { services: 'Services', ai: 'Creative AI',  reservation: 'Book a Call',  contact: 'Contact', cta: 'Get a Quote' },
}

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

export default function Navbar({ lang, setLang, theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#services',    label: t[lang].services },
    { href: '#ai',          label: t[lang].ai },
    { href: '#reservation', label: t[lang].reservation },
    { href: '#contact',     label: t[lang].contact },
  ]

  const scrollTo = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''} theme-${theme}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ADA Pub" className="logo-img" />
        </a>

        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href) }} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="lang-switch">
            {['fr','nl','en'].map((l, i) => (
              <span key={l} className="lang-item">
                {i > 0 && <span className="lang-divider">|</span>}
                <button className={`lang-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className="btn-primary nav-cta" onClick={() => scrollTo('#reservation')}>
            {t[lang].cta}
          </button>
        </div>

        <button className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {links.map((link, i) => (
                <motion.li key={link.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.07 }}>
                  <a onClick={(e) => { e.preventDefault(); scrollTo(link.href) }} href={link.href}>{link.label}</a>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-bottom">
              <div className="mobile-lang">
                {['fr','nl','en'].map(l => (
                  <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
                ))}
              </div>
              <button className="theme-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
            <button className="btn-primary mobile-cta" onClick={() => scrollTo('#reservation')}>{t[lang].cta}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
