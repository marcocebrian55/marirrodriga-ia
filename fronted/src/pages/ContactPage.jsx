import { useState } from 'react'

const BOT_URL        = 'https://t.me/marirrodrigaIA_bot'
const VOICE_URL      = '#'
const WEBHOOK_URL    = import.meta.env.VITE_N8N_WEBHOOK_URL

export default function ContactPage() {
  const [form,      setForm]      = useState({ nombre: '', email: '', mensaje: '' })
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error,     setError]     = useState('')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.email.trim()) return
    setLoading(true)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: 'marirrodriga-web-contacto',
        }),
      })
      setSubmitted(true)
    } catch {
      setError('Error al enviar. Prueba a contactarnos directamente por chat.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">

      <div className="contact-hero">
        <div className="svc-note"><div className="bdot" />Respuesta inmediata · Agente IA disponible ahora</div>
        <h1>Cuéntanos tu caso.<br />No pierdas <em>tu tiempo.</em></h1>
        <p>No esperas, no formularios largos, no intermediarios. Elige cómo prefieres hablar y el agente te explica, resuelve y agenda si hace falta.</p>
      </div>

      <div className="contact-body">

        {/* OPCIONES DIRECTAS */}
        <div className="contact-options">
          <a className="contact-opt contact-opt--primary" href={BOT_URL} target="_blank" rel="noopener noreferrer">
            <div className="contact-opt__icon">💬</div>
            <div>
              <div className="contact-opt__title">Hablar por chat</div>
              <div className="contact-opt__sub">El agente te responde ahora mismo en Telegram. Explícale lo que necesitas y él te guía.</div>
            </div>
            <span className="contact-opt__arrow">→</span>
          </a>

          <a className="contact-opt contact-opt--secondary" href={VOICE_URL} target="_blank" rel="noopener noreferrer">
            <div className="contact-opt__icon">🎙️</div>
            <div>
              <div className="contact-opt__title">Llamada con el agente</div>
              <div className="contact-opt__sub">Prefires hablar? El agente de voz te atiende, responde tus preguntas y agenda una reunión si lo necesitas.</div>
            </div>
            <span className="contact-opt__arrow">→</span>
          </a>
        </div>

        {/* SEPARADOR */}
        <div className="contact-divider">
          <span>o déjanos tu contacto y te escribimos nosotros</span>
        </div>

        {/* FORMULARIO */}
        {!submitted ? (
          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label className="contact-form__label">Nombre *</label>
                <input
                  className="contact-form__input"
                  placeholder="Tu nombre"
                  value={form.nombre}
                  onChange={(e) => update('nombre', e.target.value)}
                  required
                />
              </div>
              <div className="contact-form__field">
                <label className="contact-form__label">Email *</label>
                <input
                  type="email"
                  className="contact-form__input"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="contact-form__field">
              <label className="contact-form__label">¿Qué quieres automatizar? <span style={{color:'#9ca3af', fontWeight:400}}>(opcional)</span></label>
              <textarea
                className="contact-form__textarea"
                rows={3}
                placeholder="Ej: Quiero automatizar la gestión de citas de mi clínica..."
                value={form.mensaje}
                onChange={(e) => update('mensaje', e.target.value)}
              />
            </div>
            {error && <p className="contact-form__error">{error}</p>}
            <button className="contact-form__submit" type="submit" disabled={loading}>
              {loading ? '✦ Enviando…' : 'Enviar y que me contacten →'}
            </button>
            <p className="contact-form__disclaimer">Sin spam · Te respondemos en menos de 24h</p>
          </form>
        ) : (
          <div className="contact-success">
            <span className="contact-success__icon">✅</span>
            <h3>¡Recibido, {form.nombre}!</h3>
            <p>Te escribimos a <strong>{form.email}</strong> en menos de 24h. Si prefieres respuesta inmediata, el agente está disponible ahora.</p>
            <a className="contact-opt contact-opt--primary" style={{marginTop:'16px'}} href={BOT_URL} target="_blank" rel="noopener noreferrer">
              <div className="contact-opt__icon">💬</div>
              <div><div className="contact-opt__title">Hablar ahora con el agente</div></div>
              <span className="contact-opt__arrow">→</span>
            </a>
          </div>
        )}

      </div>
    </div>
  )
}
