import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import AIModule from './components/AIModule'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import './App.css'

function HomePage({ lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Services lang={lang} />
      <AIModule lang={lang} />
      <Reservation lang={lang} />
      <Contact lang={lang} />
    </>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [lang, setLang] = useState('fr')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} />} />
        <Route path="/blog" element={<Blog lang={lang} />} />
        <Route path="/blog/:slug" element={<BlogPost lang={lang} />} />
      </Routes>
      <Footer lang={lang} />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
