import { useState } from 'react'
import { callClaude } from '../api'

const SYSTEM = `Eres un sistema de generación de facturas profesionales españolas. Genera una factura en HTML con estilos inline basada en los datos. Incluye: número FAC-2026-XXX, fecha, emisor Marirrodriga.IA, datos cliente, tabla servicios, subtotal, IVA 21% y total. Diseño limpio y profesional. DEVUELVE SOLO EL HTML sin explicaciones ni markdown.`

function newLine() {
  return { desc: '', qty: '1', price: '' }
}

export default function InvoiceWidget({ triggerPopup }) {
  const [client,  setClient]  = useState('')
  const [nif,     setNif]     = useState('')
  const [lines,   setLines]   = useState([newLine()])
  const [loading, setLoading] = useState(false)
  const [html,    setHtml]    = useState(null)

  function updateLine(i, field, value) {
    setLines((prev) => prev.map((l, idx) => idx === i ? { ...l, [field]: value } : l))
  }

  async function generate() {
    if (!client.trim()) { alert('Añade el nombre del cliente'); return }
    const services = lines.map((l) => `- ${l.desc || 'Servicio'}: ${l.qty || 1} x ${l.price || 0}€`).join('\n')
    const data     = `Fecha: ${new Date().toLocaleDateString('es-ES')}\nCliente: ${client}${nif ? ' | NIF: ' + nif : ''}\nServicios:\n${services}`
    setLoading(true)
    try {
      const raw   = await callClaude(SYSTEM, [{ role: 'user', content: data }], 1000)
      const clean = raw.replace(/```html\n?/g, '').replace(/```\n?/g, '').trim()
      setHtml(clean)
      triggerPopup('invoice')
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (html) {
    return (
      <div className="scdemo">
        <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
        <div className="widget-body">
          <div className="result-box">
            <div className="result-hdr">🧾 Factura generada por IA</div>
            <iframe
              className="invoice-frame"
              srcDoc={html}
              title="Factura"
            />
          </div>
          <button className="btn-back" onClick={() => setHtml(null)}>← Nueva factura</button>
        </div>
        <div className="widget-cta-bar">
          <span>¿Quieres facturación automática para tu negocio?</span>
          <button className="widget-cta-btn" onClick={() => triggerPopup('invoice', true)}>📩 Prueba gratis →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="scdemo">
      <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
      <div className="widget-body">
        <div className="widget-field-grid">
          <div>
            <label className="widget-label">Cliente *</label>
            <input className="widget-input" placeholder="Nombre del cliente" value={client} onChange={(e) => setClient(e.target.value)} />
          </div>
          <div>
            <label className="widget-label">NIF</label>
            <input className="widget-input" placeholder="12345678A" value={nif} onChange={(e) => setNif(e.target.value)} />
          </div>
        </div>

        <label className="inv-lines-label">Servicios</label>
        {lines.map((l, i) => (
          <div key={i} className="inv-line">
            <input placeholder="Descripción" value={l.desc}  onChange={(e) => updateLine(i, 'desc',  e.target.value)} />
            <input type="number" placeholder="Ud." min="1" value={l.qty}   onChange={(e) => updateLine(i, 'qty',   e.target.value)} />
            <input placeholder="€/ud"        value={l.price} onChange={(e) => updateLine(i, 'price', e.target.value)} />
          </div>
        ))}

        <button className="inv-add-btn" onClick={() => setLines((prev) => [...prev, newLine()])}>+ Añadir línea</button>
        <button className="widget-action-btn" onClick={generate} disabled={loading}>
          {loading ? '✦ Generando factura...' : '🧾 Generar factura'}
        </button>
      </div>
      <div className="widget-cta-bar">
        <span>¿Quieres facturación automática para tu negocio?</span>
        <button className="widget-cta-btn" onClick={() => triggerPopup('invoice', true)}>📩 Prueba gratis →</button>
      </div>
    </div>
  )
}
