import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { articles } from '../data/articles'
import './Blog.css'

const t = {
  fr: { tag: 'Blog', title: 'Conseils &', titleAccent: 'ressources', sub: 'Conseils pratiques, tendances et insights pour les entreprises bruxelloises. Impression, LED, marquage véhicule et design graphique.', readMore: 'Lire l\'article', min: 'min de lecture' },
  nl: { tag: 'Blog', title: 'Tips &', titleAccent: 'resources', sub: 'Praktische tips, trends en inzichten voor Brusselse bedrijven. Drukwerk, LED, voertuigbelettering en grafisch ontwerp.', readMore: 'Artikel lezen', min: 'min leestijd' },
  en: { tag: 'Blog', title: 'Tips &', titleAccent: 'resources', sub: 'Practical advice, trends and insights for Brussels businesses. Printing, LED, vehicle lettering and graphic design.', readMore: 'Read article', min: 'min read' },
  tr: { tag: 'Blog', title: 'İpuçları &', titleAccent: 'kaynaklar', sub: 'Brüksel işletmeleri için pratik tavsiyeler, trendler ve içgörüler. Baskı, LED, araç giydirme ve grafik tasarım.', readMore: 'Makaleyi oku', min: 'dk okuma' },
}

const formatDate = (iso, lang) => {
  const d = new Date(iso)
  const locales = { fr: 'fr-BE', nl: 'nl-BE', en: 'en-GB', tr: 'tr-TR' }
  return d.toLocaleDateString(locales[lang], { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Blog({ lang }) {
  const T = t[lang]
  return (
    <div className="blog-page">
      <div className="blog-hero">
        <motion.div
          className="blog-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag">{T.tag}</span>
          <h1 className="blog-hero-title">{T.title} <span className="gradient-text">{T.titleAccent}</span></h1>
          <p className="blog-hero-sub">{T.sub}</p>
        </motion.div>
      </div>

      <div className="blog-grid-wrap">
        <div className="blog-grid">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="blog-card-meta">
                <span className="blog-category">{article.category[lang]}</span>
                <span className="blog-date">{formatDate(article.date, lang)}</span>
              </div>
              <h2 className="blog-card-title">{article.title[lang]}</h2>
              <p className="blog-card-intro">{article.intro[lang]}</p>
              <div className="blog-card-footer">
                <span className="blog-read-time">{article.readTime} {T.min}</span>
                <Link to={`/blog/${article.slug}`} className="blog-read-more" state={{ lang }}>
                  {T.readMore}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
