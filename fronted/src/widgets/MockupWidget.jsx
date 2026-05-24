import { useState } from 'react'
import { callClaude } from '../api'

const SYSTEM = `Eres un experto en diseño web moderno. El usuario describirá su empresa o web actual. Genera el HTML completo de una landing page moderna para esa empresa. Requisitos: HTML con CSS en <style>, diseño moderno (hero + 3 servicios en cards + CTA), paleta coherente con el sector, emojis como iconos, en español, sin JavaScript. DEVUELVE SOLO EL HTML empezando por <!DOCTYPE html>. Sin markdown ni explicaciones.`

export default function MockupWidget({ triggerPopup }) {
  const [desc,     setDesc]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [blobUrl,  setBlobUrl]  = useState(null)

  async function generate() {
    if (!desc.trim()) return
    setLoading(true)
    try {
      const raw   = await callClaude(SYSTEM, [{ role: 'user', content: 'Empresa/web: ' + desc }], 1000)
      const clean = raw.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim()
      const url   = URL.createObjectURL(new Blob([clean], { type: 'text/html; charset=utf-8' }))
      setBlobUrl(url)
      triggerPopup('mockup')
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (blobUrl) {
    return (
      <div className="scdemo">
        <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
        <div className="widget-body">
          <div className="result-box">
            <div className="browser-bar">
              <div className="browser-dots">
                <div className="browser-dot browser-dot--r" />
                <div className="browser-dot browser-dot--y" />
                <div className="browser-dot browser-dot--g" />
              </div>
              <div className="browser-address">🔒 tu-empresa.es · Mockup generado por IA</div>
            </div>
            <iframe className="mockup-frame" src={blobUrl} title="Mockup generado" />
          </div>
          <button className="btn-back" onClick={() => setBlobUrl(null)}>← Generar otro</button>
        </div>
        <div className="widget-cta-bar">
          <span>¿Quieres un análisis gratuito de tu web actual?</span>
          <button className="widget-cta-btn" onClick={() => triggerPopup('mockup', true)}>📩 Análisis gratis →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="scdemo">
      <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
      <div className="widget-body">
        <p className="widget-desc">Describe tu empresa o tu web actual. La IA genera un diseño web moderno personalizado.</p>
        <textarea
          className="widget-textarea"
          rows={4}
          placeholder="Ej: Tengo una academia de inglés en Sevilla para adultos profesionales. Mi web es muy anticuada, fondo gris, letra pequeña. Quiero algo moderno y que convierta..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="widget-action-btn" onClick={generate} disabled={loading}>
          {loading ? '✦ Generando mockup...' : '🌐 Generar mockup web al instante'}
        </button>
      </div>
      <div className="widget-cta-bar">
        <span>¿Quieres un análisis gratuito de tu web actual?</span>
        <button className="widget-cta-btn" onClick={() => triggerPopup('mockup', true)}>📩 Análisis gratis →</button>
      </div>
    </div>
  )
}
