import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { articles } from '../data/articles'
import './BlogPost.css'

const t = {
  fr: { back: 'Retour au blog', min: 'min de lecture', ctaTitle: 'Prêt à passer à l\'action ?', ctaBtn: 'Réserver une consultation gratuite', related: 'Articles similaires', readMore: 'Lire l\'article' },
  nl: { back: 'Terug naar blog', min: 'min leestijd', ctaTitle: 'Klaar om actie te ondernemen?', ctaBtn: 'Gratis consultatie reserveren', related: 'Gerelateerde artikelen', readMore: 'Artikel lezen' },
  en: { back: 'Back to blog', min: 'min read', ctaTitle: 'Ready to take action?', ctaBtn: 'Book a free consultation', related: 'Related articles', readMore: 'Read article' },
  tr: { back: 'Bloga dön', min: 'dk okuma', ctaTitle: 'Harekete geçmeye hazır mısınız?', ctaBtn: 'Ücretsiz danışma alın', related: 'Benzer makaleler', readMore: 'Makaleyi oku' },
}

const formatDate = (iso, lang) => {
  const d = new Date(iso)
  const locales = { fr: 'fr-BE', nl: 'nl-BE', en: 'en-GB', tr: 'tr-TR' }
  return d.toLocaleDateString(locales[lang], { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost({ lang }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const T = t[lang]
  const article = articles.find(a => a.slug === slug)
  const related = articles.filter(a => a.slug !== slug).slice(0, 2)

  useEffect(() => {
    if (!article) { navigate('/blog'); return }
    window.scrollTo(0, 0)
    document.title = `${article.title[lang]} — ADA Pub Bruxelles`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', article.metaDescription[lang])
  }, [slug, lang, article, navigate])

  if (!article) return null

  return (
    <div className="post-page">
      <div className="post-hero">
        <motion.div
          className="post-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/blog" className="post-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            {T.back}
          </Link>
          <div className="post-meta">
            <span className="blog-category">{article.category[lang]}</span>
            <span className="blog-date">{formatDate(article.date, lang)}</span>
            <span className="blog-read-time">{article.readTime} {T.min}</span>
          </div>
          <h1 className="post-title">{article.title[lang]}</h1>
          <p className="post-intro">{article.intro[lang]}</p>
        </motion.div>
      </div>

      <div className="post-body-wrap">
        <motion.article
          className="post-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {article.sections.map((section, i) => (
            <div key={i} className="post-section">
              <h2 className="post-h2">{section.heading[lang]}</h2>
              <p className="post-p">{section.body[lang]}</p>
            </div>
          ))}

          <div className="post-cta-box">
            <h3 className="post-cta-title">{T.ctaTitle}</h3>
            <p className="post-cta-text">{article.cta[lang]}</p>
            <Link to="/#reservation" className="btn-primary post-cta-btn" onClick={() => {
              setTimeout(() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' }), 100)
            }}>
              {T.ctaBtn}
            </Link>
          </div>
        </motion.article>

        {related.length > 0 && (
          <aside className="post-related">
            <h3 className="related-title">{T.related}</h3>
            <div className="related-grid">
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="related-card">
                  <span className="blog-category">{r.category[lang]}</span>
                  <h4>{r.title[lang]}</h4>
                  <span className="related-more">
                    {T.readMore}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
