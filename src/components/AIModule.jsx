import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import './AIModule.css'

const FEATURE_ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M2 20a10 10 0 0 1 20 0"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
]

const t = {
  fr: {
    tag: 'Intelligence Artificielle',
    title: 'Créativité augmentée', titleAccent: "par l'IA",
    sub: "Notre module IA analyse votre secteur, vos concurrents et votre audience pour générer des concepts créatifs sur mesure — plus vite, plus précis.",
    features: [
      { title: 'Analyse de marque',    desc: 'Audit complet de votre identité visuelle et recommandations personnalisées.' },
      { title: 'Génération instantanée', desc: 'Concepts visuels, slogans et palettes de couleurs générés en secondes.' },
      { title: 'Optimisation data',    desc: "Décisions basées sur les données pour maximiser l'impact de vos campagnes." },
      { title: 'Itération rapide',     desc: "Affinez vos créations avec l'IA jusqu'à obtenir le résultat parfait." },
    ],
    inputPlaceholder: "Décrivez votre projet ou votre marque...",
    inputBtn: 'Générer avec IA',
    demoTag: 'Démonstration interactive', demoLabel: "Essayez notre assistant créatif IA",
    chips: ['Branding', 'Campagne LED', 'Véhicule', 'Print'],
    responses: [
      "Analyse complète de votre identité de marque — Je détecte un secteur B2B premium. Recommandation : palette sobre avec accent doré, typographie sans-serif moderne. Slogan proposé : « L'excellence, votre signature. »",
      "Concept visuel généré — Design minimaliste avec touches de couleur vive. Palette : #F7B500, #1A1A2E, blanc pur. Format : carré pour réseaux sociaux + A4 horizontal pour print.",
      "Stratégie de communication — Cible : 35–55 ans, décideurs B2B. Canal : LinkedIn + impression premium. Message clé : fiabilité, expertise, résultats mesurables.",
    ]
  },
  nl: {
    tag: 'Kunstmatige Intelligentie',
    title: 'Creativiteit versterkt', titleAccent: 'door AI',
    sub: 'Onze AI-module analyseert uw sector, concurrenten en doelgroep om op maat gemaakte creatieve concepten te genereren — sneller en nauwkeuriger.',
    features: [
      { title: 'Merkanalyse',          desc: 'Volledige audit van uw visuele identiteit en gepersonaliseerde aanbevelingen.' },
      { title: 'Directe generatie',    desc: 'Visuele concepten, slogans en kleurpaletten gegenereerd in seconden.' },
      { title: 'Data-optimalisatie',   desc: 'Datagedreven beslissingen om de impact van uw campagnes te maximaliseren.' },
      { title: 'Snelle iteratie',      desc: 'Verfijn uw creaties met AI totdat u het perfecte resultaat bereikt.' },
    ],
    inputPlaceholder: 'Beschrijf uw project of merk...',
    inputBtn: 'Genereer met AI',
    demoTag: 'Interactieve demonstratie', demoLabel: 'Probeer onze creatieve AI-assistent',
    chips: ['Branding', 'LED Campagne', 'Voertuig', 'Print'],
    responses: [
      "Volledige merkidentiteitsanalyse — Premium B2B-sector gedetecteerd. Aanbeveling: sober palet met gouden accent, moderne sans-serif typografie. Slogan: « Excellentie, uw handtekening. »",
      "Visueel concept — Minimalistisch ontwerp met levendige kleuraccenten. Palet: #F7B500, #1A1A2E, puur wit. Formaat: vierkant voor social + A4 liggend voor print.",
      "Communicatiestrategie — Doelgroep: 35–55 jaar, B2B-beslissers. Kanaal: LinkedIn + premium print. Kernboodschap: betrouwbaarheid, expertise, meetbare resultaten.",
    ]
  },
  en: {
    tag: 'Artificial Intelligence',
    title: 'Creativity powered', titleAccent: 'by AI',
    sub: 'Our AI module analyses your sector, competitors and audience to generate bespoke creative concepts — faster, sharper.',
    features: [
      { title: 'Brand analysis',       desc: 'Full audit of your visual identity with personalised recommendations.' },
      { title: 'Instant generation',   desc: 'Visual concepts, slogans and colour palettes generated in seconds.' },
      { title: 'Data optimisation',    desc: 'Data-driven decisions to maximise the impact of your campaigns.' },
      { title: 'Rapid iteration',      desc: 'Refine your creations with AI until you reach the perfect result.' },
    ],
    inputPlaceholder: 'Describe your project or brand...',
    inputBtn: 'Generate with AI',
    demoTag: 'Interactive demo', demoLabel: 'Try our creative AI assistant',
    chips: ['Branding', 'LED Campaign', 'Vehicle', 'Print'],
    responses: [
      "Full brand identity analysis — Premium B2B sector detected. Recommendation: clean palette with golden accent, modern sans-serif typography. Tagline: « Excellence, your signature. »",
      "Visual concept — Minimalist design with vivid colour accents. Palette: #F7B500, #1A1A2E, pure white. Priority format: square for social + A4 landscape for print.",
      "Communication strategy — Target: 35–55, B2B decision-makers. Channel: LinkedIn + premium print. Key message: reliability, expertise, measurable results.",
    ]
  }
}

export default function AIModule({ lang }) {
  const T = t[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const handleGenerate = () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setResponse(null)
    const pick = T.responses[Math.floor(Math.random() * T.responses.length)]
    setTimeout(() => { setLoading(false); setResponse(pick) }, 1800)
  }

  return (
    <section className="ai-section" id="ai">
      <div className="ai-bg-grid" />
      <div className="ai-glow" />
      <div className="ai-inner" ref={ref}>
        <motion.div
          className="ai-left"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">{T.tag}</span>
          <h2 className="ai-title">{T.title} <span className="gradient-text">{T.titleAccent}</span></h2>
          <p className="ai-sub">{T.sub}</p>
          <div className="ai-features">
            {T.features.map((f, i) => (
              <motion.div key={i} className="ai-feature"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              >
                <span className="feature-icon-wrap">{FEATURE_ICONS[i]}</span>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="ai-right"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ai-demo-card">
            <div className="demo-header">
              <div className="demo-dots"><span /><span /><span /></div>
              <span className="demo-title-tag">{T.demoTag}</span>
            </div>
            <div className="demo-body">
              <div className="demo-prompt-label">{T.demoLabel}</div>
              <div className="demo-input-wrap">
                <textarea className="demo-input" placeholder={T.inputPlaceholder} value={input} onChange={e => setInput(e.target.value)} rows={3} />
                <button className="demo-btn btn-primary" onClick={handleGenerate} disabled={loading || !input.trim()}>
                  {loading ? <span className="loading-dots"><span /><span /><span /></span> : T.inputBtn}
                </button>
              </div>
              <div className={`demo-response ${response || loading ? 'visible' : ''}`}>
                {loading && (
                  <div className="response-loading">
                    <div className="ai-thinking"><div className="think-bar" /><div className="think-bar" /><div className="think-bar short" /></div>
                  </div>
                )}
                {response && !loading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="response-text">
                    {response}
                  </motion.div>
                )}
              </div>
              <div className="demo-chips">
                {T.chips.map(chip => (
                  <button key={chip} className="chip" onClick={() => setInput(chip)}>{chip}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="ai-pulse-badge">
            <span className="pulse-dot" />
            <span>AI Active</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
