import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import AIModule from './components/AIModule'
import Reservation from './components/Reservation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [lang, setLang] = useState('fr')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="app">
      <Navbar lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <AIModule lang={lang} />
      <Reservation lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </div>
  )
}

export default App
