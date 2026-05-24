import { useState } from 'react'
import { Smartphone, Phone } from 'lucide-react'

const N8N_LEADS = import.meta.env.VITE_N8N_LEADS || ''

function scoreLead(budget) {
  if (budget === 'alto')  return { score: '9.8/10', vip: true,  badge: '👑 VIP LEAD',       desc: 'Lead altamente rentable. Empresa con intenciones de automatizar flujos clave y presupuesto alto.' }
  if (budget === 'medio') return { score: '7.8/10', vip: false, badge: '🔔 LEAD ESTÁNDAR',   desc: 'Empresa mediana con presupuestos estándar de digitalización.' }
  return                         { score: '4.5/10', vip: false, badge: '⚠️ LEAD BAJO',       desc: 'Presupuesto bajo. Interés exploratorio o de aprendizaje general.' }
}

export default function LeadSimulator() {
  const [name,    setName]    = useState('Andrés Iniesta')
  const [contact, setContact] = useState('@andres8')
  const [budget,  setBudget]  = useState('alto')
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!name.trim() || !contact.trim()) return
    setLoading(true)
    setResult(null)

    if (N8N_LEADS) {
      try {
        const res  = await fetch(N8N_LEADS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, contact, budget }) })
        const data = await res.json()
        setResult({ name, contact, budget, score: data.interestScore || '?/10', vip: data.isVip, badge: data.badgeText || '🔔 LEAD', desc: data.profileDesc || '' })
      } catch {
        setResult({ ...scoreLead(budget), name, contact, budget })
      }
      setLoading(false)
      return
    }

    setTimeout(() => {
      setResult({ ...scoreLead(budget), name, contact, budget })
      setLoading(false)
    }, 1500)
  }

  const budgetLabel = budget === 'alto' ? '> 5.000€' : budget === 'medio' ? '1.000€ – 5.000€' : '< 1.000€'

  return (
    <div className="lead-sim-grid">
      <div className="lead-form-box">
        <span className="box-label">1. Formulario del lead</span>
        <div className="form-group">
          <label>Nombre:</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Andrés Iniesta" />
        </div>
        <div className="form-group">
          <label>Email o Telegram:</label>
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Ej: @usuario" />
        </div>
        <div className="form-group">
          <label>Presupuesto estimado:</label>
          <select value={budget} onChange={e => setBudget(e.target.value)}>
            <option value="bajo">Menos de 1.000€</option>
            <option value="medio">1.000€ – 5.000€</option>
            <option value="alto">Más de 5.000€ (VIP)</option>
          </select>
        </div>
        <button className="btn-block" onClick={submit} disabled={loading}>
          {loading ? 'Cualificando…' : 'Enviar formulario'}
        </button>
      </div>

      <div className="lead-alert-box">
        <span className="box-label">
          <Smartphone size={12} />
          2. Alerta comercial (tu móvil)
        </span>
        <div className="alert-phone-screen">
          <div className="phone-screen-header">Telegram — Canal Comercial</div>
          <div className="phone-screen-content">
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexDirection: 'column' }}>
                <span className="spinner" />
                <span className="phone-placeholder-text">Cualificando lead con IA…</span>
              </div>
            )}
            {!loading && !result && (
              <p className="phone-placeholder-text">Envía el formulario para ver la alerta instantánea aquí…</p>
            )}
            {result && (
              <div className={`phone-lead-bubble${result.vip ? ' vip' : ''}`}>
                <div className={`phone-lead-header${result.vip ? ' vip' : ''}`}>
                  <strong>{result.badge}</strong>
                  <span>Score: {result.score}</span>
                </div>
                <div className="phone-lead-body">
                  <strong>Nombre:</strong> {result.name}<br />
                  <strong>Contacto:</strong> {result.contact}<br />
                  <strong>Presupuesto:</strong> {budgetLabel}
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-5)', fontStyle: 'italic', padding: '0 12px 8px', display: 'block', lineHeight: 1.4 }}>
                  "{result.desc}"
                </span>
                <button className="btn-phone-call">
                  <Phone size={13} /> Llamar de inmediato
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
