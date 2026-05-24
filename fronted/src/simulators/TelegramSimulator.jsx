import { useState, useEffect, useRef } from 'react'

const N8N_TG = import.meta.env.VITE_N8N_TELEGRAM || ''

const QUICK = [
  '¿Qué sabéis hacer?',
  'Cuéntame un chiste de programadores',
  '¿Cuánto cuesta un bot?',
]

const CHISTES = [
  '¿Por qué los programadores prefieren el modo oscuro? Porque la luz atrae a los bugs. 😂',
  'Un programador va al super y su pareja le dice: "Trae una barra de pan, y si hay huevos, una docena". Regresó con 12 barras de pan.',
  'Hay 10 tipos de personas en el mundo: los que entienden binario y los que no.',
]

function localReply(text) {
  const t = text.toLowerCase()
  if (t.includes('hacer') || t.includes('sabéis') || t.includes('servicios'))
    return 'Automatizamos cualquier tarea repetitiva de oficina: mandamos facturas, respondemos llamadas, extraemos resúmenes de correos gigantescos y cualificamos clientes antes de que se enfríen. Básicamente, hacemos que trabajes menos y produzcas más.'
  if (t.includes('chiste') || t.includes('broma'))
    return CHISTES[Math.floor(Math.random() * CHISTES.length)]
  if (t.includes('cuesta') || t.includes('precio') || t.includes('coste'))
    return 'Mucho menos de lo que cuesta perder 2 horas al día con tareas repetitivas. Nos adaptamos a tu flujo exacto, por eso hacemos presupuesto personalizado. ¡Usa el formulario de abajo y te decimos!'
  return 'Interesante. Soy MariRobot — rápida, eficiente y sin rodeos. ¿Vemos cómo automatizar tu operativa?'
}

export default function TelegramSimulator() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! Bienvenido al bot de demo. Soy inteligente, ejecuto herramientas y tengo cero paciencia para el spam. ¿Qué quieres saber?' }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
  }, [messages, typing])

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || typing) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setTyping(true)

    if (N8N_TG) {
      try {
        const res  = await fetch(N8N_TG, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: msg }) })
        const data = await res.json()
        setMessages(prev => [...prev, { role: 'bot', text: data.reply || '…' }])
      } catch {
        setMessages(prev => [...prev, { role: 'bot', text: 'Error de conexión. Prueba de nuevo.' }])
      }
      setTyping(false)
      return
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: localReply(msg) }])
      setTyping(false)
    }, 1100)
  }

  return (
    <div className="telegram-chat-mock">
      <div className="chat-header-tg">
        <div className="chat-avatar-tg">MR</div>
        <div>
          <div className="chat-name-tg">MariRobot_Agencia_Bot</div>
          <div className="chat-status-tg">en línea</div>
        </div>
      </div>
      <div className="chat-messages-tg" ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg-bubble-tg ${m.role}`}>{m.text}</div>
        ))}
        {typing && <div className="msg-typing-tg">Escribiendo…</div>}
      </div>
      <div className="chat-quick-actions-tg">
        {QUICK.map(q => (
          <button key={q} className="quick-btn-tg" onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <div className="cinput" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Escribe tu mensaje…"
        />
        <button onClick={() => send()}>Enviar</button>
      </div>
    </div>
  )
}
