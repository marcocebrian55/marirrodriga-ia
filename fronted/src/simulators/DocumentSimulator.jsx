import { useState } from 'react'
import { Eye, AlertTriangle, Copy, Check } from 'lucide-react'

const N8N_DOCS = import.meta.env.VITE_N8N_DOCS || ''

const SAMPLE_EMAIL = `De: Carlos Ruiz (carlos.ruiz@gmail.com)
Asunto: INCIDENCIA CON EL PEDIDO #82914 - RETRASO Y RECLAMACIÓN

Hola, escribo porque estoy sumamente descontento. Hace 5 días que compré la plantilla de automatización de marketing y no me ha llegado el enlace de descarga. He revisado la carpeta de spam y tampoco hay nada. He pagado 149€ y exijo que me den una solución hoy mismo o procederé a abrir una disputa en PayPal y a poner una reseña negativa. Espero vuestra pronta respuesta.`

function analyzeLocal(text) {
  const t = text.toLowerCase()
  if (/reclamac|urgente|descontento|paypal|dinero|no me llega/.test(t)) {
    return {
      priority: 'Reclamación Urgente',
      isUrgent: true,
      category: 'Soporte Técnico / Ventas',
      summary: 'El cliente reclama el envío de un producto por valor de 149€ que no ha recibido en 5 días. Amenaza con disputa de PayPal y reseña negativa.',
      draft: 'Estimado Carlos Ruiz,\n\nLamentamos el retraso y fallo técnico en nuestra pasarela de envío. Hemos validado tu compra e incidencia. Aquí tienes tu enlace de descarga inmediato: https://marirrodriga.ia/dl/plantilla-82914\n\nPara compensar las molestias, hemos activado un descuento del 20% en tu próxima compra.\n\nDisculpa las molestias,\nEquipo MARIRRODRIGA I.A',
    }
  }
  return {
    priority: 'Consulta Normal',
    isUrgent: false,
    category: 'Consulta Comercial',
    summary: 'El cliente realiza una consulta general sobre servicios o presupuesto para automatización.',
    draft: 'Estimado cliente,\n\nGracias por su interés. Nos encantaría agendar una breve llamada de 15 minutos para entender sus procesos y prepararle una propuesta a medida sin compromiso.\n\nPuede reservar aquí: https://calendly.com/marirrodriga-ia\n\nQuedamos a su disposición,\nEquipo MARIRRODRIGA I.A',
  }
}

export default function DocumentSimulator() {
  const [text,     setText]     = useState('')
  const [status,   setStatus]   = useState('idle')
  const [result,   setResult]   = useState(null)
  const [copied,   setCopied]   = useState(false)

  async function analyze() {
    if (!text.trim()) return
    setStatus('loading')
    setResult(null)

    if (N8N_DOCS) {
      try {
        const res  = await fetch(N8N_DOCS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emailContent: text }) })
        const data = await res.json()
        setResult({ priority: data.priority, isUrgent: (data.priority || '').toLowerCase().includes('urgente'), category: data.category, summary: data.summary, draft: data.draft })
        setStatus('done')
      } catch {
        setStatus('idle')
      }
      return
    }

    setTimeout(() => {
      setResult(analyzeLocal(text))
      setStatus('done')
    }, 2000)
  }

  function copyDraft() {
    navigator.clipboard.writeText(result.draft)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="doc-sim">
      <div className="doc-actions-row" style={{ marginBottom: 6 }}>
        <button className="btn-secondary-outline" onClick={() => setText(SAMPLE_EMAIL)}>
          Cargar email de ejemplo
        </button>
      </div>
      <textarea
        className="doc-textarea"
        rows={5}
        placeholder="Pega el correo o PDF aquí…"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div className="doc-actions-row">
        <span />
        <button className="btn-primary-sm" onClick={analyze} disabled={!text.trim() || status === 'loading'}>
          {status === 'loading'
            ? <><span className="spinner" style={{ width: 13, height: 13 }} /> Analizando…</>
            : <><Eye size={13} /> Analizar correo</>
          }
        </button>
      </div>

      {status === 'loading' && (
        <div className="analysis-result">
          <div className="analysis-loading">
            <div className="loading-bar" />
            <span>Leyendo y clasificando el contexto…</span>
          </div>
        </div>
      )}

      {status === 'done' && result && (
        <div className="analysis-result">
          <div className="analysis-content">
            <div className="analysis-badge-row">
              <span className={result.isUrgent ? 'badge-priority' : 'badge-category'}>
                {result.isUrgent && <AlertTriangle size={11} />}
                {result.priority}
              </span>
              <span className="badge-category">{result.category}</span>
            </div>
            <div className="analysis-summary">
              <strong>Resumen ejecutivo:</strong>
              <p>{result.summary}</p>
            </div>
            <div className="analysis-draft">
              <strong>Borrador de respuesta propuesto:</strong>
              <div className="draft-text-box">
                {result.draft}
                <button className="btn-copy" onClick={copyDraft}>
                  {copied ? <><Check size={12} /> ¡Copiado!</> : <><Copy size={12} /> Copiar borrador</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
