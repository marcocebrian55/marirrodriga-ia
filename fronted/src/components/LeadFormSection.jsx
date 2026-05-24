import { useState } from 'react'

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL

const DAILY_GIFTS = [
  { icon: '🧠', title: '10 prompts para delegar tareas a la IA sin saber programar',       desc: 'Los prompts exactos que usamos para externalizar tareas repetitivas a la IA. Copia, pega y ahorra horas desde hoy.' },
  { icon: '✅', title: 'Checklist: ¿Está tu negocio listo para automatizar?',              desc: '12 preguntas para saber exactamente qué partes de tu negocio puedes automatizar ahora mismo y por dónde empezar.' },
  { icon: '📧', title: 'Prompt pack: 5 prompts para redactar emails de negocio que funcionan', desc: '5 prompts listos para generar emails de seguimiento, propuestas y captación que convierten. Sin escribir desde cero.' },
  { icon: '🔧', title: 'Checklist: 8 cosas que tu negocio debería tener automatizadas antes de 2027', desc: 'Las 8 automatizaciones mínimas que separan a los negocios que escalan de los que se quedan atrapados operando.' },
  { icon: '⚙️', title: 'Plantilla: cómo escribir el prompt de sistema de tu propio asistente IA', desc: 'La estructura exacta para crear un asistente IA que hable como tu empresa, conozca tus servicios y atienda clientes.' },
  { icon: '📊', title: '6 métricas que todo negocio de servicios debería revisar cada semana', desc: 'El dashboard mínimo para saber si tu negocio va bien. 6 números, 10 minutos a la semana, decisiones más claras.' },
  { icon: '📖', title: 'Glosario: 12 términos de IA que escuchas siempre y nadie te explica bien', desc: 'Agente, LLM, prompt, RAG, token… explicados en lenguaje de negocio, sin tecnicismos. Para hablar de IA sin perderte.' },
  { icon: '🗒️', title: 'Plantilla: el informe semanal de tu negocio generado con IA',     desc: 'Conecta tus datos y genera automáticamente un resumen ejecutivo de tu semana. Sin analistas, sin horas de Excel.' },
  { icon: '🤔', title: 'Checklist: antes de contratar a alguien, comprueba si la IA puede hacerlo', desc: '9 preguntas para evaluar si una tarea la puede hacer la IA antes de pagar un sueldo. Ahorra costes desde la decisión.' },
  { icon: '🚨', title: '7 señales de que tu negocio está perdiendo dinero por no automatizar', desc: '¿Respondes mensajes manualmente? ¿Gestionas citas por teléfono? Si alguna señal te suena, estás dejando dinero sobre la mesa.' },
]

const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const INITIAL_FORM = {
  nombre: '', apellido: '', email: '',
  dedicacion: '', nivel_ia: '', reto: '', como_conocido: '',
}

export default function LeadFormSection() {
  const [form,      setForm]      = useState(INITIAL_FORM)
  const [errors,    setErrors]    = useState({})
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const today    = new Date()
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000)
  const gift     = DAILY_GIFTS[dayOfYear % DAILY_GIFTS.length]
  const dayStr   = DAY_NAMES[today.getDay()]

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate() {
    const e = {}
    if (!form.nombre.trim())    e.nombre    = 'Requerido'
    if (!form.apellido.trim())  e.apellido  = 'Requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (!form.dedicacion)       e.dedicacion = 'Requerido'
    if (!form.nivel_ia)         e.nivel_ia   = 'Requerido'
    return e
  }

  async function submit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          timestamp: new Date().toISOString(),
          source: 'marirrodriga-web-regalo',
        }),
      })
      setSubmitted(true)
    } catch {
      setErrors({ _global: 'Error al enviar. Inténtalo de nuevo.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="gift-section">
      <div className="gift-section__inner">

        <div className="gift-header">
          <div className="gift-badge"><span>🎁</span> Regalo diario de IA</div>
          <h2 className="gift-title">Cada día una herramienta nueva.<br /><em>Gratis. Sin trampa.</em></h2>
          <p className="gift-subtitle">Déjanos tu contacto y te enviamos el recurso de hoy — y uno diferente cada día durante 7 días.</p>
        </div>

        <div className="gift-layout">

          {/* GIFT CARD */}
          <div className={`gift-card${submitted ? ' gift-card--unlocked' : ''}`}>
            <div className="gift-card__day">Hoy, {dayStr}</div>
            <div className="gift-card__icon">{gift.icon}</div>
            <h3 className="gift-card__title">{gift.title}</h3>
            <p className="gift-card__desc">{gift.desc}</p>
            {!submitted && (
              <div className="gift-card__lock">
                <span className="gift-lock-icon">🔒</span>
                <span>Rellena el formulario para desbloquear</span>
              </div>
            )}
            {submitted && (
              <div className="gift-card__unlocked-badge">✓ Enviado a tu email</div>
            )}
          </div>

          {/* FORM */}
          {!submitted ? (
            <form className="gift-form" onSubmit={submit} noValidate>
              <div className="gift-form__row">
                <div className="gift-form__field">
                  <label className="gift-form__label">Nombre *</label>
                  <input
                    className={`gift-form__input${errors.nombre ? ' gift-form__input--error' : ''}`}
                    placeholder="María"
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                  />
                  {errors.nombre && <span className="gift-form__error">{errors.nombre}</span>}
                </div>
                <div className="gift-form__field">
                  <label className="gift-form__label">Apellido *</label>
                  <input
                    className={`gift-form__input${errors.apellido ? ' gift-form__input--error' : ''}`}
                    placeholder="García"
                    value={form.apellido}
                    onChange={(e) => update('apellido', e.target.value)}
                  />
                  {errors.apellido && <span className="gift-form__error">{errors.apellido}</span>}
                </div>
              </div>

              <div className="gift-form__field">
                <label className="gift-form__label">Email *</label>
                <input
                  type="email"
                  className={`gift-form__input${errors.email ? ' gift-form__input--error' : ''}`}
                  placeholder="maria@tuempresa.com"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
                {errors.email && <span className="gift-form__error">{errors.email}</span>}
              </div>

              <div className="gift-form__row">
                <div className="gift-form__field">
                  <label className="gift-form__label">¿A qué te dedicas? *</label>
                  <select
                    className={`gift-form__select${errors.dedicacion ? ' gift-form__input--error' : ''}`}
                    value={form.dedicacion}
                    onChange={(e) => update('dedicacion', e.target.value)}
                  >
                    <option value="">Selecciona…</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="autonomo">Autónomo</option>
                    <option value="empresa">Empresa</option>
                    <option value="trabajador_cuenta_ajena">Trabajador por cuenta ajena</option>
                  </select>
                  {errors.dedicacion && <span className="gift-form__error">{errors.dedicacion}</span>}
                </div>
                <div className="gift-form__field">
                  <label className="gift-form__label">Nivel con la IA *</label>
                  <select
                    className={`gift-form__select${errors.nivel_ia ? ' gift-form__input--error' : ''}`}
                    value={form.nivel_ia}
                    onChange={(e) => update('nivel_ia', e.target.value)}
                  >
                    <option value="">Selecciona…</option>
                    <option value="basico">Básico — apenas la uso</option>
                    <option value="medio">Medio — genero textos, busco con IA</option>
                    <option value="alto">Alto — sé lo que son los agentes</option>
                    <option value="profesional">Profesional — desarrollo con IA</option>
                  </select>
                  {errors.nivel_ia && <span className="gift-form__error">{errors.nivel_ia}</span>}
                </div>
              </div>

              <div className="gift-form__field">
                <label className="gift-form__label">¿Qué quieres automatizar? <span className="gift-form__optional">(opcional)</span></label>
                <textarea
                  className="gift-form__textarea"
                  placeholder="Ej: gestión de citas, emails de seguimiento, facturación…"
                  rows={2}
                  value={form.reto}
                  onChange={(e) => update('reto', e.target.value)}
                />
              </div>

              <div className="gift-form__field">
                <label className="gift-form__label">¿Cómo nos conociste? <span className="gift-form__optional">(opcional)</span></label>
                <select
                  className="gift-form__select"
                  value={form.como_conocido}
                  onChange={(e) => update('como_conocido', e.target.value)}
                >
                  <option value="">Selecciona…</option>
                  <option value="tiktok">TikTok</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="referido">Me lo recomendaron</option>
                  <option value="google">Google</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {errors._global && <p className="gift-form__error gift-form__error--global">{errors._global}</p>}

              <button className="gift-form__submit" type="submit" disabled={loading}>
                {loading ? '✦ Enviando…' : `🎁 Quiero el regalo de hoy →`}
              </button>
              <p className="gift-form__disclaimer">Sin spam · Solo recursos de IA · Cancela cuando quieras</p>
            </form>
          ) : (
            <div className="gift-success">
              <span className="gift-success__icon">🎉</span>
              <h3 className="gift-success__title">¡Perfecto, {form.nombre}!</h3>
              <p className="gift-success__text">Te hemos enviado <strong>{gift.title}</strong> a <strong>{form.email}</strong>. Mañana recibirás el siguiente regalo.</p>
              <p className="gift-success__text">Cada recurso estará adaptado a tu sector y nivel con la IA — nada genérico, solo lo que te es útil de verdad.</p>
              <p className="gift-success__sub">Revisa tu bandeja de entrada (y el spam por si acaso).</p>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
