import { useState, useEffect, useRef } from 'react'
import { callClaude } from '../api'

const SYSTEM = `Eres el asistente de captación de Marirrodriga.IA, agencia de automatización con IA para pequeñas empresas españolas.
Tu misión: demostrar cómo un chatbot de IA gestiona la captación de clientes de forma profesional.
Flujo: 1) Pide nombre de empresa y sector. 2) Identifica el mayor dolor operativo. 3) Cuantifica el problema. 4) Presenta la solución de Marirrodriga.IA. 5) Propón demo de 20 minutos.
Reglas: máximo 2-3 frases por respuesta. Cercano y profesional. Siempre en español. 1 emoji máximo por respuesta.`

const INITIAL_MSG = '¡Hola! Soy el asistente de captación de Marirrodriga.IA 👋 ¿Cuál es el nombre de tu empresa y a qué os dedicáis?'

export default function ChatWidget({ triggerPopup }) {
  const [messages,  setMessages]  = useState([{ role: 'bot', text: INITIAL_MSG }])
  const [input,     setInput]     = useState('')
  const [typing,    setTyping]    = useState(false)
  const [exchanges, setExchanges] = useState(0)
  const boxRef = useRef(null)

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight
  }, [messages, typing])

  async function send() {
    const text = input.trim()
    if (!text || typing) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', text }])
    setTyping(true)

    try {
      const apiHistory = [
        { role: 'assistant', content: INITIAL_MSG },
        ...messages.slice(1).map((m) => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })),
        { role: 'user', content: text },
      ]
      const reply = await callClaude(SYSTEM, apiHistory, 400)
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
      setExchanges((prev) => {
        const n = prev + 1
        if (n >= 2) triggerPopup('chatbot')
        return n
      })
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Error de conexión. Inténtalo de nuevo.' }])
    } finally {
      setTyping(false)
    }
  }

  return (
    <div className="scdemo">
      <div className="sdtop"><div className="sdlive" /><span>IA en vivo · Claude</span></div>
      <div className="chatbox" ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
        ))}
        {typing && <div className="chat-typing">✦ Escribiendo...</div>}
      </div>
      <div className="cinput">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Escribe tu mensaje..."
        />
        <button onClick={send}>Enviar</button>
      </div>
      <div className="widget-cta-bar">
        <span>¿Quieres este chatbot para tu negocio?</span>
        <button className="widget-cta-btn" onClick={() => triggerPopup('chatbot', true)}>📩 Prueba gratis →</button>
      </div>
    </div>
  )
}
