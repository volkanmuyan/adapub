import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import './Reservation.css'

// EmailJS Setup: https://www.emailjs.com
// 1. Create account → Add Email Service → Create Template
// 2. Template variables: {{from_name}}, {{email}}, {{phone}}, {{company}}, {{date}}, {{service}}, {{message}}
// 3. Set template "To Email" to: info@adapublicite.be
//    Add CC field: adapubsign@gmail.com
// 4. Fill in your credentials below:
const EMAILJS_SERVICE_ID  = 'service_xrfmvqk'
const EMAILJS_TEMPLATE_ID = 'template_0gjyz5s'
const EMAILJS_PUBLIC_KEY  = 'VO_ZHVftrE93taALk'

const WHY_ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
]

const CHECK_ICON = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const t = {
  fr: {
    tag: 'Réservation',
    title: 'Planifiez votre', titleAccent: 'consultation',
    sub: "Réservez une consultation gratuite de 30 minutes avec notre équipe créative. Nous analyserons votre projet et vous proposerons les meilleures solutions.",
    why: [
      { title: 'Réponse en 24h',       desc: 'Notre équipe vous contacte rapidement.' },
      { title: 'Consultation gratuite', desc: 'Premier entretien 100% offert.' },
      { title: 'À Bruxelles',          desc: 'Ou en visioconférence selon votre préférence.' },
    ],
    form: {
      firstName: 'Prénom', lastName: 'Nom', email: 'Email professionnel', phone: 'Téléphone',
      company: 'Entreprise', date: 'Date souhaitée', service: 'Type de service',
      services: ['Impression Digitale', 'Lettrage Véhicule', 'Éclairage LED', 'Panneaux LED', 'Enseigne', 'Design Graphique', 'IA Créative', 'Autre'],
      message: 'Décrivez votre projet', submit: 'Confirmer la réservation',
      success: 'Votre réservation a été envoyée ! Nous vous contacterons dans les 24h.',
      error: "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
    }
  },
  nl: {
    tag: 'Reservering',
    title: 'Plan uw', titleAccent: 'consultatie',
    sub: 'Reserveer een gratis consultatie van 30 minuten met ons creatief team. We analyseren uw project en stellen de beste oplossingen voor.',
    why: [
      { title: 'Antwoord binnen 24u', desc: 'Ons team neemt snel contact op.' },
      { title: 'Gratis consultatie',  desc: 'Eerste gesprek 100% gratis.' },
      { title: 'In Brussel',         desc: 'Of via videoconferentie naar uw voorkeur.' },
    ],
    form: {
      firstName: 'Voornaam', lastName: 'Naam', email: 'Professioneel e-mailadres', phone: 'Telefoon',
      company: 'Bedrijf', date: 'Gewenste datum', service: 'Type dienst',
      services: ['Digitaal Drukwerk', 'Voertuigbelettering', 'LED-verlichting', 'LED-panelen', 'Uithangbord', 'Grafisch Ontwerp', 'Creatieve AI', 'Andere'],
      message: 'Beschrijf uw project', submit: 'Reservering bevestigen',
      success: 'Uw reservering is verzonden! Wij nemen binnen 24 uur contact met u op.',
      error: 'Er is een fout opgetreden. Probeer het opnieuw of contacteer ons rechtstreeks.',
    }
  },
  en: {
    tag: 'Book a Call',
    title: 'Schedule your', titleAccent: 'consultation',
    sub: 'Book a free 30-minute consultation with our creative team. We will analyse your project and propose the best solutions.',
    why: [
      { title: 'Response within 24h', desc: 'Our team gets back to you promptly.' },
      { title: 'Free consultation',   desc: 'First meeting 100% complimentary.' },
      { title: 'In Brussels',         desc: 'Or via video call — your choice.' },
    ],
    form: {
      firstName: 'First name', lastName: 'Last name', email: 'Professional email', phone: 'Phone',
      company: 'Company', date: 'Preferred date', service: 'Service type',
      services: ['Digital Printing', 'Vehicle Lettering', 'LED Lighting', 'LED Panels', 'Signboard', 'Graphic Design', 'Creative AI', 'Other'],
      message: 'Describe your project', submit: 'Confirm booking',
      success: 'Your booking has been sent! We will contact you within 24 hours.',
      error: 'An error occurred. Please try again or contact us directly.',
    }
  },
  tr: {
    tag: 'Randevu Al',
    title: 'Ücretsiz', titleAccent: 'danışmanlık alın',
    sub: 'Yaratıcı ekibimizle 30 dakikalık ücretsiz bir danışma görüşmesi ayarlayın. Projenizi analiz edip en iyi çözümleri sunacağız.',
    why: [
      { title: '24 saat içinde yanıt', desc: 'Ekibimiz en kısa sürede geri dönüş yapar.' },
      { title: 'Ücretsiz danışmanlık', desc: 'İlk görüşme tamamen ücretsizdir.' },
      { title: 'Brüksel\'de',          desc: 'Ya da tercihine göre video görüşmesiyle.' },
    ],
    form: {
      firstName: 'Ad', lastName: 'Soyad', email: 'Kurumsal e-posta', phone: 'Telefon',
      company: 'Şirket', date: 'Tercih edilen tarih', service: 'Hizmet türü',
      services: ['Dijital Baskı', 'Araç Giydirme', 'LED Aydınlatma', 'LED Paneller', 'Tabela', 'Grafik Tasarım', 'Yapay Zeka', 'Diğer'],
      message: 'Projenizi açıklayın', submit: 'Randevuyu onayla',
      success: 'Randevunuz iletildi! 24 saat içinde sizinle iletişime geçeceğiz.',
      error: 'Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan bize ulaşın.',
    }
  }
}

export default function Reservation({ lang }) {
  const T = t[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', service: '', date: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const templateParams = {
      from_name:    `${form.firstName} ${form.lastName}`,
      from_email:   form.email,
      phone:        form.phone || '—',
      company:      form.company || '—',
      date:         form.date || '—',
      service:      form.service || '—',
      message:      form.message || '—',
      // Both recipients receive the notification
      to_email:     'info@adapublicite.be',
      cc_email:     'adapubsign@gmail.com',
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      setSuccess(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="reservation" id="reservation">
      <div className="res-inner" ref={ref}>
        <motion.div
          className="res-left"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">{T.tag}</span>
          <h2 className="res-title">{T.title} <span className="gradient-text">{T.titleAccent}</span></h2>
          <p className="res-sub">{T.sub}</p>
          <div className="res-why">
            {T.why.map((w, i) => (
              <motion.div key={i} className="why-item"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
              >
                <span className="why-icon">{WHY_ICONS[i]}</span>
                <div><strong>{w.title}</strong><p>{w.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="res-right"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {success ? (
            <motion.div className="success-box" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
              <div className="success-icon">{CHECK_ICON}</div>
              <p>{T.form.success}</p>
            </motion.div>
          ) : (
            <form className="res-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>{T.form.firstName}</label><input name="firstName" type="text" required value={form.firstName} onChange={handleChange} /></div>
                <div className="form-group"><label>{T.form.lastName}</label><input name="lastName" type="text" required value={form.lastName} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>{T.form.email}</label><input name="email" type="email" required value={form.email} onChange={handleChange} /></div>
                <div className="form-group"><label>{T.form.phone}</label><input name="phone" type="tel" value={form.phone} onChange={handleChange} /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>{T.form.company}</label><input name="company" type="text" value={form.company} onChange={handleChange} /></div>
                <div className="form-group"><label>{T.form.date}</label><input name="date" type="date" value={form.date} onChange={handleChange} /></div>
              </div>
              <div className="form-group">
                <label>{T.form.service}</label>
                <select name="service" value={form.service} onChange={handleChange}>
                  <option value="">—</option>
                  {T.form.services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group"><label>{T.form.message}</label><textarea name="message" rows={4} value={form.message} onChange={handleChange} /></div>
              {error && <p className="form-error">{T.form.error}</p>}
              <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
                {submitting ? <span className="loading-dots"><span /><span /><span /></span> : T.form.submit}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
