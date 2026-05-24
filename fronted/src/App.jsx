import { useState, useRef } from 'react'
import CursorEffect from './components/CursorEffect'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Popup from './components/Popup'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'

const POPUP_CONFIG = {
  chatbot: { icon: '🤖', gift: '🎁 Demo configurada gratis',   title: '¿Quieres este chatbot para tu empresa?', desc: 'Lo configuramos con tu información real. Listo en 48h.',                             cta: 'Quiero el chatbot →' },
  email:   { icon: '📧', gift: '🎁 Email personalizado gratis', title: '¿Emails automáticos para tu negocio?',   desc: 'Te generamos una secuencia adaptada a tu empresa.',                                    cta: 'Quiero mis emails →' },
  invoice: { icon: '🧾', gift: '🎁 Sistema configurado gratis', title: '¿Quieres facturación automática?',       desc: 'Lo montamos con tus datos reales en menos de 24h.',                                    cta: 'Quiero el sistema →' },
  social:  { icon: '📱', gift: '🎁 10 posts gratis',            title: '¿10 posts reales para tu empresa?',      desc: 'Listos para publicar en Instagram, TikTok o LinkedIn esta semana.',                     cta: 'Quiero mis 10 posts →' },
  mockup:  { icon: '🌐', gift: '🎁 Análisis web gratuito',      title: '¿Análisis completo de tu web?',          desc: 'Te decimos las 3 mejoras que más conversión generarían ahora mismo.',                   cta: 'Quiero el análisis →' },
}

export default function App() {
  const [page, setPage]   = useState('home')
  const [popup, setPopup] = useState(null)
  const interacted        = useRef({})

  function navigate(p) {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function triggerPopup(service, force = false) {
    if (interacted.current[service] && !force) return
    interacted.current[service] = true
    setTimeout(() => setPopup(service), 700)
  }

  return (
    <>
      <CursorEffect />
      <Nav page={page} onNavigate={navigate} />
      {page === 'home'    && <HomePage onNavigate={navigate} />}
      {page === 'svcs'    && <ServicesPage triggerPopup={triggerPopup} onNavigate={navigate} />}
      {page === 'contact' && <ContactPage />}
      <Footer onNavigate={navigate} />
      {popup && (
        <Popup
          config={POPUP_CONFIG[popup]}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  )
}
