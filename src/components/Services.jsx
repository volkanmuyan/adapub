import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Services.css'

const PHOTOS = [
  'https://images.unsplash.com/photo-1562408590-e32931084e23?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80&auto=format&fit=crop',
]

const t = {
  fr: {
    tag: 'Nos Services',
    title: 'Ce que nous', titleAccent: 'créons pour vous',
    sub: "Une gamme complète de solutions publicitaires et créatives, conçues avec précision pour maximiser votre impact visuel.",
    items: [
      { title: 'Impression Digitale',   desc: 'Cartes de visite, dépliants, flyers, affiches — impression haute qualité avec rendu exceptionnel.',                             tags: ['Cartes', 'Flyers', 'Affiches'] },
      { title: 'Lettrage Véhicule',     desc: 'Transformez votre flotte en panneaux publicitaires mobiles avec nos solutions de marquage professionnel.',                       tags: ['Covering', 'Stickers', 'Full wrap'] },
      { title: 'Éclairage Lumineux',    desc: "Enseignes lumineuses, caissons et installations LED qui attirent le regard à toute heure.",                                      tags: ['LED', 'Néon', 'Caisson'] },
      { title: 'Panneaux LED',          desc: 'Écrans et panneaux publicitaires LED haute résolution pour un impact visuel maximal en extérieur.',                              tags: ['Outdoor', 'Indoor', 'Dynamique'] },
      { title: 'Enseignes',             desc: "Création d'enseignes sur mesure pour les commerces, restaurants et entreprises de toutes tailles.",                              tags: ['Aluminium', '3D', 'Rétroéclairé'] },
      { title: 'Design Graphique',      desc: 'Identité visuelle, logo, charte graphique — notre studio crée des designs qui racontent votre histoire.',                        tags: ['Branding', 'Logo', 'Charte'] },
    ]
  },
  nl: {
    tag: 'Onze Diensten',
    title: 'Wat we voor', titleAccent: 'u creëren',
    sub: 'Een volledig gamma van reclame- en creatieve oplossingen, ontworpen met precisie om uw visuele impact te maximaliseren.',
    items: [
      { title: 'Digitaal Drukwerk',     desc: 'Visitekaartjes, folders, flyers, affiches — hoogwaardig drukwerk met uitzonderlijke afwerking.',                                 tags: ['Visitekaartjes', 'Flyers', 'Affiches'] },
      { title: 'Voertuigbelettering',   desc: 'Verander uw vloot in mobiele reclameborden met onze professionele markeringsoplossingen.',                                        tags: ['Covering', 'Stickers', 'Full wrap'] },
      { title: 'Lichtgevende Verlichting', desc: 'Verlichte reclames, lichtbakken en LED-installaties die dag en nacht de aandacht trekken.',                                   tags: ['LED', 'Neon', 'Lichtbak'] },
      { title: 'LED-panelen',           desc: 'Hoge resolutie LED-schermen en reclamepanelen voor maximale visuele impact buitenshuis.',                                         tags: ['Outdoor', 'Indoor', 'Dynamisch'] },
      { title: 'Uithangborden',         desc: 'Maatwerk uithangborden voor winkels, restaurants en bedrijven van elke omvang.',                                                 tags: ['Aluminium', '3D', 'Verlicht'] },
      { title: 'Grafisch Ontwerp',      desc: 'Visuele identiteit, logo, huisstijl — ons studio creëert designs die uw verhaal vertellen.',                                     tags: ['Branding', 'Logo', 'Huisstijl'] },
    ]
  },
  en: {
    tag: 'Our Services',
    title: 'What we', titleAccent: 'create for you',
    sub: 'A complete range of advertising and creative solutions, designed with precision to maximise your visual impact.',
    items: [
      { title: 'Digital Printing',      desc: 'Business cards, brochures, flyers, posters — high-quality printing with exceptional results.',                                    tags: ['Cards', 'Flyers', 'Posters'] },
      { title: 'Vehicle Lettering',     desc: 'Turn your fleet into mobile advertising boards with our professional vehicle marking solutions.',                                  tags: ['Covering', 'Stickers', 'Full wrap'] },
      { title: 'Illuminated Signage',   desc: 'Light boxes, neon and LED installations that capture attention around the clock.',                                                 tags: ['LED', 'Neon', 'Light box'] },
      { title: 'LED Panels',            desc: 'High-resolution LED screens and advertising panels for maximum visual impact outdoors.',                                           tags: ['Outdoor', 'Indoor', 'Dynamic'] },
      { title: 'Signboards',            desc: 'Custom-made signboards for shops, restaurants and businesses of all sizes.',                                                       tags: ['Aluminium', '3D', 'Backlit'] },
      { title: 'Graphic Design',        desc: 'Visual identity, logo, brand guidelines — our studio creates designs that tell your story.',                                       tags: ['Branding', 'Logo', 'Guidelines'] },
    ]
  },
  tr: {
    tag: 'Hizmetlerimiz',
    title: 'Sizin için', titleAccent: 'neler yaratıyoruz',
    sub: 'Görsel etkinizi en üst düzeye çıkarmak için hassasiyetle tasarlanmış eksiksiz reklam ve yaratıcı çözümler.',
    items: [
      { title: 'Dijital Baskı',         desc: 'Kartvizit, broşür, flyer, afiş — istisnai sonuçlarla yüksek kaliteli baskı hizmeti.',                                            tags: ['Kartvizit', 'Flyer', 'Afiş'] },
      { title: 'Araç Giydirme',         desc: 'Filonuzu profesyonel araç giydirme çözümleriyle hareketli reklam panolarına dönüştürün.',                                         tags: ['Kaplama', 'Sticker', 'Tam kaplama'] },
      { title: 'Işıklı Tabela',         desc: 'Her saatte dikkat çeken ışıklı tabelalar, led kasalar ve LED aydınlatma sistemleri.',                                             tags: ['LED', 'Neon', 'Işıklı kutu'] },
      { title: 'LED Paneller',          desc: 'Dış mekânlarda maksimum görsel etki için yüksek çözünürlüklü LED ekranlar ve reklam panelleri.',                                  tags: ['Dış mekan', 'İç mekan', 'Dinamik'] },
      { title: 'Tabelalar',             desc: 'Her büyüklükteki dükkan, restoran ve işletmeler için özel üretim tabelalar.',                                                     tags: ['Alüminyum', '3D', 'Aydınlatmalı'] },
      { title: 'Grafik Tasarım',        desc: 'Kurumsal kimlik, logo, marka rehberi — stüdiomuz hikayenizi anlatan tasarımlar üretir.',                                          tags: ['Marka', 'Logo', 'Kimlik'] },
    ]
  }
}

function ServiceCard({ item, index, photo }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22,1,0.36,1] }}
      whileHover={{ y: -4 }}
    >
      <div className="card-photo-wrap">
        <img src={photo} alt={item.title} className="card-photo" loading="lazy" />
        <div className="card-photo-overlay" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>
        <div className="card-tags">
          {item.tags.map(tag => <span className="card-tag" key={tag}>{tag}</span>)}
        </div>
      </div>
      <div className="card-line" />
    </motion.div>
  )
}

export default function Services({ lang }) {
  const T = t[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <section className="services" id="services">
      <div className="services-inner">
        <motion.div
          ref={ref}
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
        >
          <span className="section-tag">{T.tag}</span>
          <h2 className="services-title">{T.title} <span className="gradient-text">{T.titleAccent}</span></h2>
          <p className="services-sub">{T.sub}</p>
        </motion.div>
        <div className="services-grid">
          {T.items.map((item, i) => <ServiceCard key={i} item={item} index={i} photo={PHOTOS[i]} />)}
        </div>
      </div>
    </section>
  )
}
