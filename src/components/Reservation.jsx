import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './Reservation.css'

const t = {
  fr: {
    tag: 'Réservation',
    title: 'Planifiez votre', titleAccent: 'consultation',
    sub: "Réservez une consultation gratuite de 30 minutes avec notre équipe créative. Nous analyserons votre projet et vous proposerons les meilleures solutions.",
    why: [
      { title: 'Réponse en 24h',      desc: 'Notre équipe vous contacte rapidement.' },
      { title: 'Consultation gratuite', desc: 'Premier entretien 100% offert.' },
      { title: 'À Bruxelles',         desc: 'Ou en visioconférence selon votre préférence.' },
    ],
    form: {
      firstName:'Prénom', lastName:'Nom', email:'Email professionnel', phone:'Téléphone',
      company:'Entreprise', date:'Date souhaitée', service:'Type de service',
      services:['Impression Digitale','Lettrage Véhicule','Éclairage LED','Panneaux LED','Enseigne','Design Graphique','IA Créative','Autre'],
      message:'Décrivez votre projet', submit:'Confirmer la réservation',
      success:'Votre réservation a été envoyée ! Nous vous contacterons dans les 24h.',
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
      firstName:'Voornaam', lastName:'Naam', email:'Professioneel e-mailadres', phone:'Telefoon',
      company:'Bedrijf', date:'Gewenste datum', service:'Type dienst',
      services:['Digitaal Drukwerk','Voertuigbelettering','LED-verlichting','LED-panelen','Uithangbord','Grafisch Ontwerp','Creatieve AI','Andere'],
      message:'Beschrijf uw project', submit:'Reservering bevestigen',
      success:'Uw reservering is verzonden! Wij nemen binnen 24 uur contact met u op.',
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
      firstName:'First name', lastName:'Last name', email:'Professional email', phone:'Phone',
      company:'Company', date:'Preferred date', service:'Service type',
      services:['Digital Printing','Vehicle Lettering','LED Lighting','LED Panels','Signboard','Graphic Design','Creative AI','Other'],
      message:'Describe your project', submit:'Confirm booking',
      success:'Your booking has been sent! We will contact you within 24 hours.',
    }
  }
}

const WhyIcon = ({ index }) => {
  const icons = [
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key="0"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key="1"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  ]
  return icons[index] || icons[0]
}

export default function Reservation({ lang }) {
  const T = t[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ firstName:'',lastName:'',email:'',phone:'',company:'',service:'',date:'',message:'' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault(); setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSuccess(true) }, 2000)
  }

  return (
    <section className="reservation" id="reservation">
      <div className="res-inner" ref={ref}>
        <motion.div
          className="res-left"
          initial={{ opacity:0, x:-40 }}
          animate={inView ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
        >
          <span className="section-tag">{T.tag}</span>
          <h2 className="res-title">{T.title} <span className="gradient-text">{T.titleAccent}</span></h2>
          <p className="res-sub">{T.sub}</p>
          <div className="res-why">
            {T.why.map((w,i) => (
              <motion.div key={i} className="why-item"
                initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:.3+i*.12 }}
              >
                <span className="why-icon"><WhyIcon index={i} /></span>
                <div><strong>{w.title}</strong><p>{w.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="res-right"
          initial={{ opacity:0, x:40 }}
          animate={inView ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.9, delay:.15, ease:[0.22,1,0.36,1] }}
        >
          {success ? (
            <motion.div className="success-box" initial={{ scale:.9, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ type:'spring', stiffness:200 }}>
              <div className="success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
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
              <button type="submit" className="btn-primary submit-btn" disabled={submitting}>
                {submitting ? <span className="loading-dots"><span/><span/><span/></span> : T.form.submit}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
