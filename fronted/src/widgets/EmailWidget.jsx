import { useState } from 'react'
import { callClaude } from '../api'

const SYSTEM = `Eres un experto en email marketing para pymes españolas. Genera un email profesional de captación de leads basado en la descripción de la empresa.
Formato EXACTO:
ASUNTO: [asunto - máx 60 chars]

Hola [Nombre],

[párrafo 1: conecta con el dolor]

[párrafo 2: propuesta de valor]

[CTA directo]

[Firma]

P.D.: [urgencia]

Solo el email. Sin explicaciones.`

export default function EmailWidget({ triggerPopup }) {
  const [desc,    setDesc]    = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState(null)

  async function generate() {
    if (!desc.trim()) return
    setLoading(true)
    try {
      const text  = await callClaude(SYSTEM, [{ role: 'user', content: 'Mi empresa: ' + desc }], 700)
      const lines = text.split('\n')
      const subj  = (lines.find((l) => l.startsWith('ASUNTO:')) || '').replace('ASUNTO:', '').trim()
      const body  = lines.filter((l) => !l.startsWith('ASUNTO:')).join('\n').trim()
      setResult({ subj, body })
      triggerPopup('email')
    } catch {
      // silently fail — user can retry
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="scdemo">
        <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
        <div className="widget-body">
          <div className="result-box">
            <div className="result-hdr">📧 Email generado por IA</div>
            <div className="result-meta">
              <div className="result-meta-row"><span className="result-meta-label">De:</span> tu@empresa.com</div>
              <div className="result-meta-row"><span className="result-meta-label">Para:</span> prospecto@cliente.com</div>
              <div className="result-meta-row"><span className="result-meta-label">Asunto:</span> {result.subj}</div>
            </div>
            <div className="result-body result-body--scroll result-body--pre">{result.body}</div>
          </div>
          <button className="btn-back" onClick={() => setResult(null)}>← Nueva empresa</button>
        </div>
        <div className="widget-cta-bar">
          <span>¿Quieres emails automáticos para tu empresa?</span>
          <button className="widget-cta-btn" onClick={() => triggerPopup('email', true)}>📩 Prueba gratis →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="scdemo">
      <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
      <div className="widget-body">
        <p className="widget-desc">Describe tu empresa y generamos un email de captación de leads profesional.</p>
        <textarea
          className="widget-textarea"
          rows={4}
          placeholder="Ej: Clínica dental en Madrid especializada en ortodoncia invisible para adultos…"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="widget-action-btn" onClick={generate} disabled={loading}>
          {loading ? '✦ Generando email...' : '✨ Generar email'}
        </button>
      </div>
      <div className="widget-cta-bar">
        <span>¿Quieres emails automáticos para tu empresa?</span>
        <button className="widget-cta-btn" onClick={() => triggerPopup('email', true)}>📩 Prueba gratis →</button>
      </div>
    </div>
  )
}
