import { useState } from 'react'
import { PhoneCall, PhoneOff, UserCog } from 'lucide-react'

const N8N_VOZ = import.meta.env.VITE_N8N_VOZ || ''

const OPTIONS = [
  '¿Qué servicios ofrece vuestra agencia?',
  'Quiero contratar el Asistente con un 50% de descuento',
  '¿Tienen integración con mi CRM?',
]

const LOCAL_RESPONSES = [
  '"Ofrecemos automatizaciones a medida: agentes conversacionales por voz o texto, generación automática de facturas, clasificadores de correos y PDFs, y cualificadores de leads. ¿Cuál encaja mejor con tu operativa?"',
  '"¡Buen intento! Como diría nuestra fundadora: la calidad tiene un coste, y las horas que vas a ganar valen el doble. Eso sí, si firmas este mes la integración con tu CRM va de regalo. ¿Trato?"',
  '"¡Sí! Conectamos con Salesforce, HubSpot, Zoho, ActiveCampaign o cualquier sistema propietario mediante APIs y webhooks. Leemos contactos, actualizamos estados y agendamos llamadas de forma autónoma."',
]

export default function VoiceSimulator() {
  const [screen, setScreen]       = useState('idle')
  const [dialogue, setDialogue]   = useState([])
  const [status, setStatus]       = useState('Llamando…')

  function startCall() {
    setScreen('calling')
    setDialogue([])
    setStatus('Estableciendo conexión segura…')
    setTimeout(() => {
      setStatus('Llamada activa (0:01)')
      setDialogue([{ role: 'agent', text: '"Hola, bienvenido al asistente virtual de MARIRRODRIGA I.A. ¿En qué puedo ayudarte hoy?"' }])
    }, 1400)
  }

  async function choose(idx) {
    const userText = OPTIONS[idx]
    setDialogue(prev => [...prev, { role: 'user', text: 'Tú: "' + userText + '"' }])
    setStatus('Escuchando…')

    if (N8N_VOZ) {
      try {
        const res  = await fetch(N8N_VOZ, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userSpeech: userText, optionIndex: idx + 1 }) })
        const data = await res.json()
        setDialogue(prev => [...prev, { role: 'agent', text: data.agentResponse || '' }])
      } catch {
        setDialogue(prev => [...prev, { role: 'agent', text: '"Perdona, tengo una pequeña interferencia. ¿Podrías repetirlo?"' }])
      }
      setStatus('Llamada activa')
      return
    }

    setTimeout(() => {
      setDialogue(prev => [...prev, { role: 'agent', text: LOCAL_RESPONSES[idx] }])
      setStatus('Llamada activa (0:08)')
    }, 1200)
  }

  function endCall() {
    setScreen('idle')
    setDialogue([])
  }

  if (screen === 'idle') {
    return (
      <div className="phone-call-card">
        <div className="phone-number">
          <PhoneCall size={18} />
          +34 900 83 92 11
        </div>
        <p className="phone-challenge">
          <strong>Reto:</strong> Simula una llamada e intenta preguntarle qué servicios ofrecemos o convencerle de que te haga un descuento especial.
        </p>
        <button className="btn-call-simulation" onClick={startCall}>
          Simular llamada en web
        </button>
      </div>
    )
  }

  return (
    <div className="voice-call-screen">
      <div className="caller-avatar">
        <div className="pulse-ring" />
        <UserCog size={32} color="#a78bfa" />
      </div>
      <div className="call-status">{status}</div>
      <div className="call-dialogue-box">
        {dialogue.map((d, i) => (
          <p key={i} className={`call-speech ${d.role === 'agent' ? 'call-agent' : 'call-user-side'}`}>
            {d.text}
          </p>
        ))}
      </div>
      {dialogue.length > 0 && (
        <div className="call-user-options">
          {OPTIONS.map((opt, i) => (
            <button key={i} className="btn-voice-option" onClick={() => choose(i)}>
              {opt}
            </button>
          ))}
        </div>
      )}
      <button className="btn-hangup" onClick={endCall}>
        <PhoneOff size={14} /> Colgar
      </button>
    </div>
  )
}
