import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

const INFO_ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
]

const SUCCESS_ICON = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const t = {
  fr: {
    tag: 'Nous Contacter',
    title: 'Parlons de votre', titleAccent: 'projet',
    sub: "Une question, un devis, une idée ? Notre équipe est disponible pour vous accompagner dans tous vos projets créatifs et publicitaires.",
    info: [
      { label: 'Adresse',   value: 'Rue des Créateurs 42\n1000 Bruxelles, Belgique' },
      { label: 'Téléphone', value: '0470 98 78 12' },
      { label: 'Email',     value: 'contact@adapublicite.be\nadapubsign@gmail.com' },
      { label: 'Horaires',  value: 'Lun–Ven : 9h00–18h00\nSam : 10h00–14h00' },
    ],
    formTitle: 'Envoyez-nous un message',
    name: 'Votre nom', email: 'Votre email', subject: 'Sujet', message: 'Votre message',
    submit: 'Envoyer le message', success: 'Message envoyé ! Nous vous répondrons sous 24h.',
  },
  nl: {
    tag: 'Contacteer Ons',
    title: 'Laten we praten over', titleAccent: 'uw project',
    sub: 'Een vraag, een offerte, een idee? Ons team staat klaar om u te begeleiden in al uw creatieve en reclameprojecten.',
    info: [
      { label: 'Adres',        value: 'Rue des Créateurs 42\n1000 Brussel, België' },
      { label: 'Telefoon',     value: '0470 98 78 12' },
      { label: 'E-mail',       value: 'contact@adapublicite.be\nadapubsign@gmail.com' },
      { label: 'Openingsuren', value: 'Ma–Vr: 9u00–18u00\nZa: 10u00–14u00' },
    ],
    formTitle: 'Stuur ons een bericht',
    name: 'Uw naam', email: 'Uw e-mailadres', subject: 'Onderwerp', message: 'Uw bericht',
    submit: 'Bericht verzenden', success: 'Bericht verzonden! Wij antwoorden binnen 24 uur.',
  },
  en: {
    tag: 'Get in Touch',
    title: "Let's talk about", titleAccent: 'your project',
    sub: 'A question, a quote, an idea? Our team is ready to guide you through all your creative and advertising projects.',
    info: [
      { label: 'Address', value: 'Rue des Créateurs 42\n1000 Brussels, Belgium' },
      { label: 'Phone',   value: '0470 98 78 12' },
      { label: 'Email',   value: 'contact@adapublicite.be\nadapubsign@gmail.com' },
      { label: 'Hours',   value: 'Mon–Fri: 9:00–18:00\nSat: 10:00–14:00' },
    ],
    formTitle: 'Send us a message',
    name: 'Your name', email: 'Your email', subject: 'Subject', message: 'Your message',
    submit: 'Send message', success: 'Message sent! We will reply within 24 hours.',
  }
}

export default function Contact({ lang }) {
  const T = t[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSuccess(true) }, 1800)
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-glow" />
      <div className="contact-inner" ref={ref}>
        <motion.div
          className="contact-left"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">{T.tag}</span>
          <h2 className="contact-title">{T.title} <span className="gradient-text">{T.titleAccent}</span></h2>
          <p className="contact-sub">{T.sub}</p>
          <div className="contact-info">
            {T.info.map((item, i) => (
              <motion.div key={i} className="info-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1 }}
              >
                <span className="info-icon">{INFO_ICONS[i]}</span>
                <div>
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="social-links">
            {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
              <a key={s} href="#" className="social-link" onClick={e => e.preventDefault()}>{s}</a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="form-title">{T.formTitle}</h3>
          {success ? (
            <motion.div className="contact-success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <span>{SUCCESS_ICON}</span>
              <p>{T.success}</p>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row-2">
                <div className="form-group"><label>{T.name}</label><input name="name" type="text" required value={form.name} onChange={handleChange} /></div>
                <div className="form-group"><label>{T.email}</label><input name="email" type="email" required value={form.email} onChange={handleChange} /></div>
              </div>
              <div className="form-group"><label>{T.subject}</label><input name="subject" type="text" value={form.subject} onChange={handleChange} /></div>
              <div className="form-group"><label>{T.message}</label><textarea name="message" rows={5} required value={form.message} onChange={handleChange} /></div>
              <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
                {submitting ? '...' : T.submit}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
