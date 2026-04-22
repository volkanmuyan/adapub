import logo from '../assets/logo.png'
import './Footer.css'

const INSTAGRAM_URL = 'https://www.instagram.com/adapubsign'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const t = {
  fr: {
    tagline: "L'excellence créative au service de votre marque.",
    links: [
      { label: 'Services',      href: '#services' },
      { label: 'IA Créative',   href: '#ai' },
      { label: 'Réservation',   href: '#reservation' },
      { label: 'Contact',       href: '#contact' },
    ],
    ctaLabel: 'Prêt à démarrer ?', cta: 'Réserver une consultation',
    copy: '© 2026 ADA Pub. Tous droits réservés.',
    made: 'Agence créative · Bruxelles',
    legal: ['Mentions légales', 'Confidentialité', 'Cookies'],
  },
  nl: {
    tagline: 'Creatieve excellentie ten dienste van uw merk.',
    links: [
      { label: 'Diensten',      href: '#services' },
      { label: 'Creatieve AI',  href: '#ai' },
      { label: 'Reservering',   href: '#reservation' },
      { label: 'Contact',       href: '#contact' },
    ],
    ctaLabel: 'Klaar om te starten?', cta: 'Reserveer een consultatie',
    copy: '© 2026 ADA Pub. Alle rechten voorbehouden.',
    made: 'Creatief agentschap · Brussel',
    legal: ['Wettelijke vermeldingen', 'Privacy', 'Cookies'],
  },
  en: {
    tagline: 'Creative excellence at the service of your brand.',
    links: [
      { label: 'Services',      href: '#services' },
      { label: 'Creative AI',   href: '#ai' },
      { label: 'Book a Call',   href: '#reservation' },
      { label: 'Contact',       href: '#contact' },
    ],
    ctaLabel: 'Ready to get started?', cta: 'Book a consultation',
    copy: '© 2026 ADA Pub. All rights reserved.',
    made: 'Creative agency · Brussels',
    legal: ['Legal notice', 'Privacy policy', 'Cookies'],
  },
  tr: {
    tagline: 'Markanızın hizmetinde yaratıcı mükemmellik.',
    links: [
      { label: 'Hizmetler',     href: '#services' },
      { label: 'Yapay Zeka',    href: '#ai' },
      { label: 'Randevu Al',    href: '#reservation' },
      { label: 'İletişim',      href: '#contact' },
    ],
    ctaLabel: 'Başlamaya hazır mısınız?', cta: 'Randevu alın',
    copy: '© 2026 ADA Pub. Tüm hakları saklıdır.',
    made: 'Yaratıcı ajans · Brüksel',
    legal: ['Yasal uyarı', 'Gizlilik politikası', 'Çerezler'],
  }
}

export default function Footer({ lang }) {
  const T = t[lang]
  const scrollTo = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src={logo} alt="ADA Pub" className="footer-logo" />
            <p className="footer-tagline">{T.tagline}</p>
            <div className="footer-socials">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <span className="social-icon-btn social-icon-disabled" aria-label="Facebook">
                <FacebookIcon />
              </span>
            </div>
          </div>
          <nav className="footer-nav">
            {T.links.map(link => (
              <a key={link.href} href={link.href} className="footer-link" onClick={e => { e.preventDefault(); scrollTo(link.href) }}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-cta-box">
            <span className="footer-cta-label">{T.ctaLabel}</span>
            <button className="btn-primary" onClick={() => scrollTo('#reservation')}>{T.cta}</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span className="footer-copy">{T.copy}</span>
          <span className="footer-made">{T.made}</span>
          <div className="footer-legal">
            {T.legal.map(l => <a key={l} href="#" onClick={e => e.preventDefault()}>{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
