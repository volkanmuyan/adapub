import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './AIModule.css'

const FEATURE_ICONS = [
  <svg key="0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M2 20a10 10 0 0 1 20 0"/></svg>,
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
]

const SEND_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const chatKB = {
  fr: {
    welcome: "Bonjour ! Je suis l'assistant Ada Publicité. Comment puis-je vous aider aujourd'hui ?",
    suggestions: ['Nos services', 'Impression digitale', 'Lettrage véhicule', 'Panneaux LED', 'Contactez-nous'],
    rules: [
      {
        keys: ['service', 'offre', 'proposez', 'faites', 'activité'],
        answer: "Ada Publicité propose 6 services principaux :\n• Impression Digitale – bâches, affiches, stickers\n• Lettrage Véhicule – covering & marquage\n• Éclairage LED – enseignes lumineuses\n• Panneaux LED – affichage dynamique\n• Enseigne – signalétique intérieure & extérieure\n• Design Graphique & IA Créative\n\nQuel service vous intéresse ?"
      },
      {
        keys: ['impression', 'digital', 'print', 'affiche', 'bâche', 'sticker'],
        answer: "Notre service d'impression digitale couvre :\n• Bâches grand format (intérieur / extérieur)\n• Affiches & flyers haute résolution\n• Stickers & vinyles adhésifs\n• Banderoles & roll-ups\n\nNous utilisons des technologies d'impression UV et sublimation pour des rendus impeccables."
      },
      {
        keys: ['véhicule', 'voiture', 'lettrage', 'covering', 'marquage', 'camion'],
        answer: "Le lettrage et covering véhicule, c'est notre expertise !\n• Marquage partiel ou total\n• Covering complet (wrap)\n• Texte & logo d'entreprise\n• Films mats, brillants ou satinés\n\nChaque réalisation est personnalisée selon votre identité visuelle."
      },
      {
        keys: ['led', 'lumineuse', 'enseigne', 'panneau', 'affichage'],
        answer: "Nos solutions LED couvrent deux gammes :\n\n💡 Éclairage LED : enseignes lumineuses, boîtiers rétroéclairés, lettres découpées lumineuses.\n\n📺 Panneaux LED : écrans dynamiques pour vitrines, halls et espaces publics.\n\nIdéal pour capter l'attention 24h/24."
      },
      {
        keys: ['design', 'graphique', 'logo', 'visuel', 'identité', 'charte'],
        answer: "Notre équipe de designers crée :\n• Logos & identités visuelles\n• Chartes graphiques complètes\n• Supports print (cartes, brochures, catalogues)\n• Visuels pour réseaux sociaux & campagnes\n\nL'IA créative accélère l'idéation et les itérations."
      },
      {
        keys: ['prix', 'tarif', 'coût', 'devis', 'combien'],
        answer: "Les tarifs varient selon les dimensions, matériaux et quantités. Pour obtenir un devis personnalisé gratuit, vous pouvez :\n• Réserver une consultation de 30 min (section Réservation)\n• Nous écrire à contact@adapublicite.be\n\nNous répondons sous 24h !"
      },
      {
        keys: ['contact', 'email', 'mail', 'joindre', 'téléphone', 'appeler'],
        answer: "Pour nous contacter :\n📧 contact@adapublicite.be\n📧 adapubsign@gmail.com\n\nOu utilisez la section Réservation pour fixer une consultation gratuite de 30 minutes avec notre équipe."
      },
      {
        keys: ['bruxelles', 'localisation', 'adresse', 'où', 'belgique'],
        answer: "Ada Publicité est basée à Bruxelles, en Belgique. Nous intervenons sur Bruxelles et ses environs, et proposons également des rendez-vous en visioconférence pour les clients plus éloignés."
      },
      {
        keys: ['délai', 'livraison', 'temps', 'quand', 'rapidité'],
        answer: "Nos délais de production varient selon les projets :\n• Impression simple : 24 à 72h\n• Lettrage véhicule : 2 à 5 jours\n• Enseigne LED : 1 à 3 semaines\n\nDes délais express sont possibles sur demande. Contactez-nous pour en savoir plus."
      },
      {
        keys: ['réservation', 'consultation', 'rendez-vous', 'rdv', 'rencontrer'],
        answer: "Vous pouvez réserver une consultation gratuite de 30 minutes directement sur notre site, dans la section Réservation. Remplissez le formulaire et notre équipe vous contactera dans les 24h pour confirmer."
      },
    ],
    fallback: "Je n'ai pas bien compris votre question. Vous pouvez me demander des infos sur nos services, les tarifs, les délais, ou comment nous contacter. Vous pouvez aussi utiliser les suggestions ci-dessous.",
    inputPlaceholder: 'Posez votre question...',
    botLabel: 'Ada AI',
  },
  nl: {
    welcome: 'Goedag! Ik ben de assistent van Ada Publicité. Hoe kan ik u vandaag helpen?',
    suggestions: ['Onze diensten', 'Digitaal drukwerk', 'Voertuigbelettering', 'LED-panelen', 'Contacteer ons'],
    rules: [
      {
        keys: ['dienst', 'aanbod', 'activiteit', 'doen', 'wat'],
        answer: "Ada Publicité biedt 6 hoofddiensten aan:\n• Digitaal Drukwerk – spandoeken, affiches, stickers\n• Voertuigbelettering – covering & markering\n• LED-verlichting – lichtgevende borden\n• LED-panelen – dynamische beeldschermen\n• Uithangborden – binnen- & buitensignalisatie\n• Grafisch Ontwerp & Creatieve AI\n\nWelke dienst interesseert u?"
      },
      {
        keys: ['drukwerk', 'print', 'affiche', 'spandoek', 'sticker'],
        answer: "Ons digitaal drukwerk omvat:\n• Grootformaat spandoeken (binnen/buiten)\n• Hoge resolutie affiches & flyers\n• Stickers & zelfklevende vinylfolie\n• Banieren & roll-ups\n\nWij gebruiken UV- en sublimatieprinttechnologieën voor perfecte resultaten."
      },
      {
        keys: ['voertuig', 'auto', 'belettering', 'covering', 'wagen', 'vrachtwagen'],
        answer: "Voertuigbelettering en -covering is onze specialiteit!\n• Gedeeltelijke of volledige markering\n• Volledig covering (wrap)\n• Bedrijfstekst & logo\n• Mat, glanzende of satijnen folie\n\nElke realisatie is aangepast aan uw visuele identiteit."
      },
      {
        keys: ['led', 'verlicht', 'bord', 'paneel', 'scherm', 'display'],
        answer: "Onze LED-oplossingen bestrijken twee gamma's:\n\n💡 LED-verlichting: lichtgevende borden, verlichte kasten, verlichte uitgesneden letters.\n\n📺 LED-panelen: dynamische schermen voor etalages, hallen en openbare ruimtes.\n\nIdeaal om 24/7 de aandacht te trekken."
      },
      {
        keys: ['ontwerp', 'grafisch', 'logo', 'visueel', 'identiteit', 'huisstijl'],
        answer: "Ons ontwerpteam maakt:\n• Logo's & visuele identiteiten\n• Volledige huisstijlgidsen\n• Printmateriaal (kaarten, brochures, catalogi)\n• Visuals voor social media & campagnes\n\nCreatieve AI versnelt het ideeëngeneratie- en iteratieproces."
      },
      {
        keys: ['prijs', 'tarief', 'kost', 'offerte', 'hoeveel'],
        answer: "De tarieven variëren naargelang afmetingen, materialen en hoeveelheden. Voor een gratis gepersonaliseerde offerte kunt u:\n• Een consultatie van 30 min reserveren (Reservering sectie)\n• Ons schrijven op contact@adapublicite.be\n\nWij antwoorden binnen 24 uur!"
      },
      {
        keys: ['contact', 'email', 'mail', 'bereiken', 'telefoon', 'bellen'],
        answer: "Om ons te contacteren:\n📧 contact@adapublicite.be\n📧 adapubsign@gmail.com\n\nOf gebruik de Reserveringssectie voor een gratis consultatie van 30 minuten met ons team."
      },
      {
        keys: ['brussel', 'locatie', 'adres', 'waar', 'belgië'],
        answer: "Ada Publicité is gevestigd in Brussel, België. Wij werken in Brussel en omgeving en bieden ook videoconferentie-afspraken aan voor klanten van verder weg."
      },
      {
        keys: ['levertijd', 'levering', 'tijd', 'wanneer', 'snel'],
        answer: "Onze productietijden variëren per project:\n• Eenvoudig drukwerk: 24 tot 72u\n• Voertuigbelettering: 2 tot 5 dagen\n• LED-bord: 1 tot 3 weken\n\nExpressprocedures zijn mogelijk op aanvraag. Contacteer ons voor meer info."
      },
      {
        keys: ['reservering', 'consultatie', 'afspraak', 'ontmoeten'],
        answer: "U kunt een gratis consultatie van 30 minuten rechtstreeks op onze site reserveren, in de Reserveringssectie. Vul het formulier in en ons team contacteert u binnen 24 uur ter bevestiging."
      },
    ],
    fallback: 'Ik heb uw vraag niet goed begrepen. U kunt me vragen stellen over onze diensten, tarieven, levertijden of hoe u ons kunt contacteren. Gebruik ook de suggesties hieronder.',
    inputPlaceholder: 'Stel uw vraag...',
    botLabel: 'Ada AI',
  },
  en: {
    welcome: 'Hello! I\'m the Ada Publicité assistant. How can I help you today?',
    suggestions: ['Our services', 'Digital printing', 'Vehicle lettering', 'LED panels', 'Contact us'],
    rules: [
      {
        keys: ['service', 'offer', 'do', 'provide', 'activity'],
        answer: "Ada Publicité offers 6 main services:\n• Digital Printing – banners, posters, stickers\n• Vehicle Lettering – covering & marking\n• LED Lighting – illuminated signs\n• LED Panels – dynamic displays\n• Signboards – indoor & outdoor signage\n• Graphic Design & Creative AI\n\nWhich service interests you?"
      },
      {
        keys: ['print', 'digital', 'poster', 'banner', 'sticker'],
        answer: "Our digital printing service covers:\n• Large-format banners (indoor / outdoor)\n• High-resolution posters & flyers\n• Stickers & adhesive vinyl\n• Banners & roll-ups\n\nWe use UV and sublimation printing technologies for flawless results."
      },
      {
        keys: ['vehicle', 'car', 'lettering', 'covering', 'wrap', 'truck'],
        answer: "Vehicle lettering and wrapping is our expertise!\n• Partial or full marking\n• Full covering (wrap)\n• Company text & logo\n• Matte, gloss or satin films\n\nEvery realisation is customised to match your visual identity."
      },
      {
        keys: ['led', 'light', 'sign', 'panel', 'screen', 'display'],
        answer: "Our LED solutions span two ranges:\n\n💡 LED Lighting: illuminated signs, backlit boxes, cut-out lit letters.\n\n📺 LED Panels: dynamic screens for shop windows, lobbies and public spaces.\n\nPerfect for catching attention 24/7."
      },
      {
        keys: ['design', 'graphic', 'logo', 'visual', 'identity', 'brand'],
        answer: "Our design team creates:\n• Logos & visual identities\n• Full brand guidelines\n• Print materials (cards, brochures, catalogues)\n• Social media & campaign visuals\n\nCreative AI accelerates ideation and iteration cycles."
      },
      {
        keys: ['price', 'cost', 'quote', 'how much', 'rate', 'budget'],
        answer: "Pricing varies based on dimensions, materials and quantities. To get a free personalised quote, you can:\n• Book a free 30-min consultation (Reservation section)\n• Email us at contact@adapublicite.be\n\nWe reply within 24 hours!"
      },
      {
        keys: ['contact', 'email', 'mail', 'reach', 'phone', 'call'],
        answer: "To get in touch:\n📧 contact@adapublicite.be\n📧 adapubsign@gmail.com\n\nOr use the Reservation section to schedule a free 30-minute consultation with our team."
      },
      {
        keys: ['brussels', 'location', 'address', 'where', 'belgium'],
        answer: "Ada Publicité is based in Brussels, Belgium. We serve Brussels and the surrounding area, and also offer video call appointments for clients further afield."
      },
      {
        keys: ['deadline', 'delivery', 'time', 'when', 'fast', 'quick'],
        answer: "Our production timelines vary by project:\n• Simple print: 24 to 72h\n• Vehicle lettering: 2 to 5 days\n• LED sign: 1 to 3 weeks\n\nExpress turnaround is available on request. Contact us for details."
      },
      {
        keys: ['booking', 'reservation', 'appointment', 'meet', 'consultation'],
        answer: "You can book a free 30-minute consultation directly on our site in the Reservation section. Fill in the form and our team will contact you within 24 hours to confirm."
      },
    ],
    fallback: "I didn't quite understand your question. You can ask me about our services, pricing, delivery times, or how to contact us. Feel free to use the suggestions below.",
    inputPlaceholder: 'Ask your question...',
    botLabel: 'Ada AI',
  },
}

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
    chatTitle: 'Assistant Ada',
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
    chatTitle: 'Ada Assistent',
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
    chatTitle: 'Ada Assistant',
  },
}

function getBotAnswer(input, lang) {
  const lower = input.toLowerCase()
  const kb = chatKB[lang]
  for (const rule of kb.rules) {
    if (rule.keys.some(k => lower.includes(k))) return rule.answer
  }
  return kb.fallback
}

function formatAnswer(text) {
  return text.split('\n').map((line, i) => (
    <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
  ))
}

export default function AIModule({ lang }) {
  const T = t[lang]
  const KB = chatKB[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState([{ role: 'bot', text: KB.welcome, id: 0 }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [idCounter, setIdCounter] = useState(1)

  useEffect(() => {
    setMessages([{ role: 'bot', text: chatKB[lang].welcome, id: 0 }])
    setIdCounter(1)
  }, [lang])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    if (!text.trim() || typing) return
    const userMsg = { role: 'user', text: text.trim(), id: idCounter }
    setMessages(prev => [...prev, userMsg])
    setIdCounter(c => c + 1)
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const answer = getBotAnswer(text, lang)
      setMessages(prev => [...prev, { role: 'bot', text: answer, id: idCounter + 1 }])
      setIdCounter(c => c + 2)
      setTyping(false)
    }, 900 + Math.random() * 400)
  }

  const handleKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
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
          <div className="chatbot-card">
            <div className="chatbot-header">
              <div className="demo-dots"><span /><span /><span /></div>
              <div className="chatbot-header-info">
                <span className="chatbot-avatar">A</span>
                <div>
                  <span className="chatbot-name">{T.chatTitle}</span>
                  <span className="chatbot-status">
                    <span className="pulse-dot" /> Online
                  </span>
                </div>
              </div>
            </div>

            <div className="chatbot-messages">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    className={`chat-msg ${msg.role}`}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.role === 'bot' && <span className="msg-avatar">A</span>}
                    <div className="msg-bubble">{formatAnswer(msg.text)}</div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    className="chat-msg bot"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <span className="msg-avatar">A</span>
                    <div className="msg-bubble typing-indicator">
                      <span /><span /><span />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div className="chatbot-suggestions">
              {KB.suggestions.map(s => (
                <button key={s} className="chat-chip" onClick={() => sendMessage(s)} disabled={typing}>{s}</button>
              ))}
            </div>

            <div className="chatbot-input-row">
              <input
                className="chatbot-input"
                placeholder={KB.inputPlaceholder}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={typing}
              />
              <button
                className="chatbot-send"
                onClick={() => sendMessage(input)}
                disabled={typing || !input.trim()}
                aria-label="Send"
              >
                {SEND_ICON}
              </button>
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
