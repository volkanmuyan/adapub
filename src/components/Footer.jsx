import './Footer.css'

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
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ADA Pub" className="footer-logo" />
            <p className="footer-tagline">{T.tagline}</p>
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
