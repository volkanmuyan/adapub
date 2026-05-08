import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Showcase.css'

const t = {
  fr: {
    title: 'Nos Réalisations',
    subtitle: 'Un aperçu de nos créations — événements, print, digital et bien plus.',
    all: 'Tout',
    close: 'Fermer',
    empty: 'Les photos arrivent bientôt…',
  },
  nl: {
    title: 'Onze Realisaties',
    subtitle: 'Een blik op onze creaties — evenementen, print, digitaal en meer.',
    all: 'Alles',
    close: 'Sluiten',
    empty: 'Foto\'s komen binnenkort…',
  },
  en: {
    title: 'Our Work',
    subtitle: 'A glimpse of our creations — events, print, digital and more.',
    all: 'All',
    close: 'Close',
    empty: 'Photos coming soon…',
  },
  tr: {
    title: 'Çalışmalarımız',
    subtitle: 'Etkinlik, baskı, dijital ve daha fazlasından örnekler.',
    all: 'Tümü',
    close: 'Kapat',
    empty: 'Fotoğraflar yakında eklenecek…',
  },
}

// Fotoğraf ekleme talimatı:
// 1. Görselleri adapub/public/showcase/ klasörüne koy
// 2. Aşağıdaki photos dizisine ekle:
//    { src: '/showcase/dosyaadi.jpg', category: 'events', title: 'Açıklama' }
// Kategoriler: events | print | digital | branding
const photos = [
  // { src: '/showcase/ornek.jpg', category: 'events', title: 'Exemple' },
]

const categories = {
  fr: ['Tout', 'Événements', 'Print', 'Digital', 'Branding'],
  nl: ['Alles', 'Evenementen', 'Print', 'Digitaal', 'Branding'],
  en: ['All', 'Events', 'Print', 'Digital', 'Branding'],
  tr: ['Tümü', 'Etkinlikler', 'Baskı', 'Dijital', 'Marka'],
}

const categoryKeys = ['all', 'events', 'print', 'digital', 'branding']

export default function Showcase({ lang }) {
  const [activeFilter, setActiveFilter] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 0
    ? photos
    : photos.filter(p => p.category === categoryKeys[activeFilter])

  return (
    <div className="showcase-page">
      <div className="showcase-hero">
        <motion.h1
          className="showcase-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {t[lang].title}
        </motion.h1>
        <motion.p
          className="showcase-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {t[lang].subtitle}
        </motion.p>
      </div>

      <div className="showcase-filters">
        {categories[lang].map((cat, i) => (
          <button
            key={i}
            className={`filter-btn ${activeFilter === i ? 'active' : ''}`}
            onClick={() => setActiveFilter(i)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <motion.div
          className="showcase-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="empty-icon">🖼</span>
          <p>{t[lang].empty}</p>
        </motion.div>
      ) : (
        <motion.div
          className="showcase-grid"
          layout
        >
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="grid-item"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setLightbox(photo)}
            >
              <div className="grid-img-wrap">
                <img src={photo.src} alt={photo.title || ''} loading="lazy" />
                {photo.title && (
                  <div className="grid-overlay">
                    <span>{photo.title}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="lightbox-inner"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title || ''} />
              {lightbox.title && <p className="lightbox-caption">{lightbox.title}</p>}
              <button className="lightbox-close" onClick={() => setLightbox(null)}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
