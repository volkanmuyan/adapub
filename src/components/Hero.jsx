import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const t = {
  fr: {
    tag: 'Agence Créative · Bruxelles',
    h1: 'Votre vision,', h2: 'notre création.',
    sub: "De l'impression digitale à la publicité LED, ADA Pub transforme vos idées en expériences visuelles qui marquent les esprits.",
    cta1: 'Découvrir nos services', cta2: 'Réserver une consultation',
    scroll: 'Défiler pour explorer',
    b1: '+500', b1s: 'Projets réalisés',
    b2: '15+',  b2s: "Ans d'expérience",
    b3: '100%', b3s: 'Satisfaction client',
  },
  nl: {
    tag: 'Creatief Agentschap · Brussel',
    h1: 'Uw visie,', h2: 'onze creatie.',
    sub: 'Van digitaal drukwerk tot LED-reclame, ADA Pub transformeert uw ideeën in visuele ervaringen die indruk maken.',
    cta1: 'Ontdek onze diensten', cta2: 'Reserveer een consultatie',
    scroll: 'Scroll om te verkennen',
    b1: '+500', b1s: 'Projecten gerealiseerd',
    b2: '15+',  b2s: 'Jaar ervaring',
    b3: '100%', b3s: 'Klanttevredenheid',
  },
  en: {
    tag: 'Creative Agency · Brussels',
    h1: 'Your vision,', h2: 'our creation.',
    sub: 'From digital printing to LED advertising, ADA Pub transforms your ideas into visual experiences that leave a lasting impression.',
    cta1: 'Explore our services', cta2: 'Book a consultation',
    scroll: 'Scroll to explore',
    b1: '+500', b1s: 'Projects delivered',
    b2: '15+',  b2s: 'Years of experience',
    b3: '100%', b3s: 'Client satisfaction',
  }
}

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      opacity: Math.random() * 0.45 + 0.1,
      hue: Math.random() > 0.5 ? '#F7B500' : '#8B00D4',
    }))
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', resize)
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.hue; ctx.globalAlpha = p.opacity; ctx.fill()
      })
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="hero-canvas" />
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22,1,0.36,1] } } }

export default function Hero({ lang }) {
  const T = t[lang]
  return (
    <section className="hero" id="hero">
      <ParticleCanvas />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-content">
        <motion.div className="hero-text" variants={stagger} initial="hidden" animate="show">
          <motion.span className="section-tag" variants={fadeUp}>{T.tag}</motion.span>
          <motion.h1 className="hero-headline" variants={fadeUp}>
            <span>{T.h1}</span><br /><span className="gradient-text">{T.h2}</span>
          </motion.h1>
          <motion.p className="hero-sub" variants={fadeUp}>{T.sub}</motion.p>
          <motion.div className="hero-ctas" variants={fadeUp}>
            <button className="btn-primary" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>{T.cta1}</button>
            <button className="btn-outline" onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}>{T.cta2}</button>
          </motion.div>
        </motion.div>
        <motion.div className="hero-badges" initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.8, duration:0.8, ease:[0.22,1,0.36,1] }}>
          {[[T.b1,T.b1s],[T.b2,T.b2s],[T.b3,T.b3s]].map(([num,sub],i) => (
            <div className="hero-badge" key={i}>
              <span className="badge-num gradient-text">{num}</span>
              <span className="badge-sub">{sub}</span>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div className="hero-scroll" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.4, duration:0.8 }}>
        <span>{T.scroll}</span>
        <div className="scroll-line"><div className="scroll-dot" /></div>
      </motion.div>
    </section>
  )
}
