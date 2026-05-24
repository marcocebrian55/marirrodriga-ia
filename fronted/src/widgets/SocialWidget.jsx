import { useState } from 'react'
import { callClaude } from '../api'

const SYSTEM = `Eres un experto en contenido para redes sociales para empresas locales españolas. Genera contenido listo para publicar.
Formato EXACTO:
📝 COPY:
[Hook potente. Cuerpo 3-4 líneas. CTA. 5-7 hashtags.]

📸 PROMPT IMAGEN:
[Prompt en inglés para Midjourney/DALL-E. Describe: sujeto, estilo, iluminación, composición. Máx 80 palabras.]

📊 DATOS:
Mejor horario: [día y hora]
Formato: [Reel/Carrusel/Imagen]
Alcance estimado: [rango]

Solo esto.`

const PLATFORMS = [
  { id: 'instagram', label: '📸 Instagram' },
  { id: 'tiktok',   label: '🎵 TikTok' },
  { id: 'linkedin', label: '💼 LinkedIn' },
]

export default function SocialWidget({ triggerPopup }) {
  const [platform, setPlatform] = useState('instagram')
  const [desc,     setDesc]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [result,   setResult]   = useState(null)

  async function generate() {
    if (!desc.trim()) return
    setLoading(true)
    try {
      const text  = await callClaude(SYSTEM, [{ role: 'user', content: `Empresa: ${desc}\nPlataforma: ${platform}` }], 700)
      const copyM = text.match(/📝 COPY:\n([\s\S]*?)(?=📸|$)/)
      const imgM  = text.match(/📸 PROMPT IMAGEN:\n([\s\S]*?)(?=📊|$)/)
      const statM = text.match(/📊 DATOS:\n([\s\S]*?)$/)
      setResult({
        copy: copyM ? copyM[1].trim() : text,
        img:  imgM  ? imgM[1].trim()  : '',
        stat: statM ? statM[1].trim() : '',
      })
      triggerPopup('social')
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="scdemo">
        <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
        <div className="widget-body">
          <div className="result-stack">
            <div className="result-box">
              <div className="result-hdr">📝 Copy del post</div>
              <div className="result-body result-body--scroll result-body--pre">{result.copy}</div>
            </div>
            {result.img && (
              <div className="result-box">
                <div className="result-hdr">📸 Prompt imagen · Midjourney / DALL·E</div>
                <div className="result-body result-body--italic">{result.img}</div>
              </div>
            )}
            {result.stat && (
              <div className="result-stats">
                <b className="result-stats-label">📊 Datos</b>
                {result.stat}
              </div>
            )}
            <button className="btn-back" onClick={() => setResult(null)}>← Nueva empresa</button>
          </div>
        </div>
        <div className="widget-cta-bar">
          <span>¿Quieres 10 posts reales para tu empresa esta semana?</span>
          <button className="widget-cta-btn" onClick={() => triggerPopup('social', true)}>📩 10 posts gratis →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="scdemo">
      <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
      <div className="widget-body">
        <div className="soc-tabs">
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              className={`soc-tab${platform === p.id ? ' on' : ''}`}
              onClick={() => setPlatform(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <textarea
          className="widget-textarea"
          rows={4}
          placeholder="Ej: Restaurante italiano en Valencia, pasta fresca artesanal, ambiente familiar…"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className="widget-action-btn" onClick={generate} disabled={loading}>
          {loading ? '✦ Generando post...' : '✨ Generar post + prompt imagen'}
        </button>
      </div>
      <div className="widget-cta-bar">
        <span>¿Quieres 10 posts reales para tu empresa esta semana?</span>
        <button className="widget-cta-btn" onClick={() => triggerPopup('social', true)}>📩 10 posts gratis →</button>
      </div>
    </div>
  )
}
