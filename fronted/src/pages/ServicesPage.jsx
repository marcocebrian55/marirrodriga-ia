import { useState, useRef, useEffect } from 'react'

function ServiceCard({ s }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="sc sc--catalog">
      <div className="sc-cat__icon">{s.icon}</div>
      <h3 className="sc-cat__title">{s.title}</h3>
      <p className="sc-cat__desc">{s.desc}</p>
      <ul className="sc-cat__benefits">
        {s.benefits.map((b) => (
          <li key={b}><span className="sc-cat__check">✓</span>{b}</li>
        ))}
      </ul>
      <div className="sc-cat__cta-wrap" ref={ref}>
        <button className="sc-cat__btn sc-cat__btn--primary" onClick={() => setOpen((v) => !v)}>
          Quiero saber más {open ? '▲' : '▼'}
        </button>
        {open && (
          <div className="sc-cat__dropdown">
            <a className="sc-cat__drop-item" href={BOT_URL} target="_blank" rel="noopener noreferrer">
              💬 Hablar con el agente por chat
            </a>
            <a className="sc-cat__drop-item" href={VOICE_URL} target="_blank" rel="noopener noreferrer">
              🎙️ Llamar al agente de voz
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

const BOT_URL   = 'https://t.me/marirrodrigaIA_bot'  // placeholder hasta que Ismael comparta el link
const VOICE_URL = '#'                                  // placeholder agente de voz

const SERVICES = [
  {
    id: 'chatbot-citas',
    icon: '🗓️',
    title: 'Chatbot de citas',
    desc: 'Reserva, modifica y cancela citas automáticamente por chat o web. Manda confirmaciones por email, consulta el calendario en tiempo real y actualiza tus hojas de cálculo sin que intervengas.',
    benefits: ['Cero llamadas perdidas', 'Confirmaciones automáticas por email', 'Integración con Calendar, Sheets, Gmail y bases de datos'],
    cats: ['negocio', 'agentes'],
  },
  {
    id: 'agente-voz',
    icon: '🎙️',
    title: 'Agente de voz para citas',
    desc: 'Tu asistente que coge el teléfono por ti. Atiende llamadas, gestiona citas y actualiza tu agenda hablando de forma natural con tus clientes. Disponible 24/7.',
    benefits: ['Atiende en segundos sin esperas', 'Voz natural en español', 'Sincronización automática con tu calendario'],
    cats: ['negocio', 'agentes'],
  },
  {
    id: 'facturas',
    icon: '🧾',
    title: 'Automatización de facturas',
    desc: 'Envías un mensaje a un bot de Telegram con los datos del cliente y el importe. Tu factura está generada, enviada y registrada. Compatible con Verifactu y la normativa española.',
    benefits: ['Factura lista en segundos', 'Compatible con Verifactu', 'Sin abrir ningún programa de gestión'],
    cats: ['negocio', 'dia'],
  },
  {
    id: 'leads-rrss',
    icon: '📣',
    title: 'Gestión de leads y redes sociales',
    desc: 'Gestionamos tu presencia en redes para captar clientes potenciales. Cada lead entra en un CRM conectado donde recibe seguimiento personalizado y automatizado hasta que convierte.',
    benefits: ['Pipeline de ventas siempre activo', 'Seguimiento automático y personalizado', 'Más conversiones con menos esfuerzo manual'],
    cats: ['negocio'],
  },
  {
    id: 'web',
    icon: '🌐',
    title: 'Diseño de páginas web',
    desc: 'Creamos tu web moderna, rápida y orientada a convertir visitas en clientes. Con automatizaciones e inteligencia artificial integradas desde el primer día.',
    benefits: ['Diseñada para vender, no solo para lucir', 'Integrada con tus sistemas y herramientas', 'Entregada en tiempo récord'],
    cats: ['negocio'],
  },
  {
    id: 'correo',
    icon: '📧',
    title: 'Agente de gestión de correo',
    desc: 'Resúmenes diarios de lo que importa, respuestas automáticas generadas por IA y supervisión humana sencilla antes de enviar. Tu bandeja de entrada, siempre bajo control.',
    benefits: ['Nunca pierdas un email importante', 'Respuestas redactadas automáticamente', 'Tú decides qué se envía y qué no'],
    cats: ['negocio', 'dia', 'estudiantes', 'agentes'],
  },
  {
    id: 'transcriptor',
    icon: '🎤',
    title: 'Transcriptor de audio a apuntes',
    desc: 'Graba cualquier clase, reunión o charla y obtén apuntes estructurados automáticamente. Información organizada, buscable y lista para usarla en tus decisiones.',
    benefits: ['Nunca pierdas una idea o dato clave', 'Apuntes limpios en segundos', 'Ideal para reuniones, clases y brainstormings'],
    cats: ['estudiantes', 'dia'],
  },
]

const FILTERS = [
  { id: 'all',         label: 'Todos' },
  { id: 'negocio',     label: 'Para tu negocio' },
  { id: 'estudiantes', label: 'Para estudiantes' },
  { id: 'dia',         label: 'Para tu día a día' },
  { id: 'agentes',     label: 'Agentes de IA' },
]

export default function ServicesPage({ onNavigate }) {
  const [active, setActive] = useState('all')

  const visible = active === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.cats.includes(active))

  return (
    <>
      <div className="svcs-hero">
        <div className="svc-note"><div className="bdot" />Catálogo completo · Cada solución a medida</div>
        <h1>Lo que hacemos.<br /><em>Y cómo te ayuda.</em></h1>
        <p>Sin demos genéricas. Aquí está cada servicio explicado tal como lo implementamos: qué hace, cómo encaja en tu vida o negocio y qué resuelve. Si algo te interesa, habla directamente con nuestro agente.</p>
      </div>

      <section className="section--services">

        <div className="svc-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`svc-filter${active === f.id ? ' svc-filter--on' : ''}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="sgrid">
          {visible.map((s) => <ServiceCard key={s.id} s={s} />)}
        </div>

      </section>

      <div className="ctasec" id="contacto">
        <h2>¿No encuentras lo que<br /><em>necesitas?</em></h2>
        <p>Cuéntanoslo. Si existe una forma de automatizarlo, lo construimos. Propuesta en menos de 24h.</p>
        <button className="ctabig" onClick={() => onNavigate('home')}>Volver al inicio →</button>
        <div className="ctasub">Sin compromiso · Sin intermediarios · Respuesta garantizada en menos de 24h</div>
      </div>
    </>
  )
}
