import { useMemo } from 'react'
import LeadFormSection from '../components/LeadFormSection'

export default function HomePage({ onNavigate }) {
  const nodes = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => {
      const s = 2 + Math.random() * 5
      return {
        key: i,
        style: {
          width: `${s}px`, height: `${s}px`,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animationDuration: `${3 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 4}s`,
        },
      }
    }), []
  )

  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hgrid" />
        <div className="hglow" />
        <div className="nodes">
          {nodes.map((n) => <div key={n.key} className="node" style={n.style} />)}
        </div>
        <div className="badge"><div className="bdot" />Desarrollo web · Automatización · Inteligencia Artificial</div>
        <h1>Automatizamos lo que<br />te roba <em>tiempo.</em></h1>
        <p className="sub">Para negocios, estudiantes y personas que quieren hacer más sin trabajar más. Sin intermediarios, sin estructuras infladas y sin los precios de las grandes consultoras.</p>
        <div className="hbtns">
          <button className="hb1" onClick={() => onNavigate('svcs')}>Explorar servicios →</button>
          <button className="hb2" onClick={() => onNavigate('contact')}>Solicitar consulta gratuita</button>
        </div>
        <div className="hstats">
          <div className="hs"><div className="hn"><b>−</b>80<b>%</b></div><div className="hl">Coste vs grandes agencias</div></div>
          <div className="hs"><div className="hn"><b>&lt;</b>72<b>h</b></div><div className="hl">Primera automatización activa</div></div>
          <div className="hs"><div className="hn">24<b>/7</b></div><div className="hl">Sistemas sin intervención humana</div></div>
          <div className="hs"><div className="hn"><b>0</b></div><div className="hl">Intermediarios en el proceso</div></div>
        </div>
      </div>

      {/* CASO REAL */}
      <section>
        <div className="stitle center">
          <div className="slbl">Caso real</div>
          <h2>Un ejemplo vale más que mil promesas</h2>
          <p>Antes de contarte cómo trabajamos, te mostramos qué hemos hecho. Esto no es un caso inventado.</p>
        </div>
        <div className="case">
          <div className="case-top">
            <div className="case-ico">🏃</div>
            <div>
              <h3>Fisioterapia a domicilio · Profesional independiente</h3>
              <p>Negocio unipersonal, sin equipo, sin recepción — toda la gestión recaía sobre una sola persona</p>
            </div>
          </div>
          <div className="case-cols">
            <div className="ccol">
              <h4>El problema</h4>
              <p>Cada llamada mientras atendía a un paciente era un cliente perdido. <em>50€ por sesión</em> que se escapaban, más la posibilidad de fidelizarlo durante meses. Un coste de oportunidad silencioso y constante.</p>
            </div>
            <div className="ccol">
              <h4>La solución</h4>
              <p>Chatbot IA en web y WhatsApp que <em>atiende al instante</em>, hace diagnóstico básico y <em>agenda citas automáticamente</em> sin que él tenga que intervenir.</p>
            </div>
            <div className="ccol">
              <h4>El resultado</h4>
              <div className="rpill">✓ 0 llamadas perdidas</div>
              <p><em>Citas gestionadas 24/7</em>. El sistema atiende, agenda y confirma. Él solo trata pacientes. El coste de oportunidad: eliminado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section>
        <div className="stitle center">
          <div className="slbl">Proceso</div>
          <h2>Sin reuniones infinitas. Sin promesas vacías.</h2>
          <p>Del primer contacto a tu sistema en producción. Directo y sin burocracia.</p>
        </div>
        <div className="steps">
          <div className="step"><div className="stepn">🎯<div className="stepnum">1</div></div><h3>Analizamos</h3><p>Identificamos tus costes de oportunidad y dónde está el mayor impacto posible.</p></div>
          <div className="step"><div className="stepn">🏗️<div className="stepnum">2</div></div><h3>Diseñamos</h3><p>Construimos la solución exacta para ti. Sin plantillas genéricas.</p></div>
          <div className="step"><div className="stepn">⚡<div className="stepnum">3</div></div><h3>Desplegamos</h3><p>Tu sistema activo en tiempo récord, sin interrumpir tu operativa.</p></div>
          <div className="step"><div className="stepn">📈<div className="stepnum">4</div></div><h3>Evolucionamos</h3><p>Monitorizamos y mejoramos con datos reales de forma continua.</p></div>
        </div>
      </section>

      {/* POR QUÉ */}
      <section>
        <div className="stitle center">
          <div className="slbl">Por qué elegirnos</div>
          <h2>Misma tecnología que las grandes.<br />Sin sus precios ni sus tiempos.</h2>
        </div>
        <div className="whygrid">
          <div className="wycard"><div className="wyico">👥</div><h3>Trato directo</h3><p>Hablas con quien construye tu sistema. Sin account managers ni capas innecesarias.</p></div>
          <div className="wycard"><div className="wyico">⚡</div><h3>Velocidad real</h3><p>Lo que una agencia grande tarda en presupuestar, nosotros ya lo tenemos funcionando.</p></div>
          <div className="wycard"><div className="wyico">💶</div><h3>Precio justo</h3><p>Sin estructuras corporativas en tu factura. Pagas el trabajo, no los despachos.</p></div>
          <div className="wycard"><div className="wyico">🧩</div><h3>Todo integrado</h3><p>Web, IA, automatizaciones y publicidad con visión completa de tu negocio.</p></div>
          <div className="wycard"><div className="wyico">📊</div><h3>Resultados medibles</h3><p>No vendemos horas. Vendemos impacto concreto desde el primer día.</p></div>
          <div className="wycard"><div className="wyico">🔄</div><h3>Escala contigo</h3><p>Los sistemas crecen con tu empresa. Sin empezar de cero cada vez.</p></div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section>
        <div className="stitle center">
          <div className="slbl">Lo que dicen nuestros clientes</div>
          <h2>Sin filtros</h2>
        </div>
        <div className="tst">
          <div className="stars">★★★★★</div>
          <blockquote>Estaba perdiendo clientes cada vez que cogía el teléfono en mitad de una sesión. Montaron el chatbot en dos días. Ahora agenda solo, confirma las citas y yo solo aparezco a trabajar. Es como tener un recepcionista que nunca se toma el día libre.</blockquote>
          <div className="tauth">
            <div className="tava">F</div>
            <div>
              <div className="taname">Francisco · Fisioterapeuta a domicilio</div>
              <div className="taco">Cliente real · Islas Canarias</div>
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section>
        <div className="stitle center">
          <div className="slbl">El equipo</div>
          <h2>Las personas detrás del sistema</h2>
          <p>Un equipo técnico especializado. Cuando nos contratas, trabajas con quienes construyen.</p>
        </div>
        <div className="teamgrid">
          <div className="tcard">
            <div className="tav-big">MM</div>
            <div className="tinfo">
              <h3>Marco Marirrodriga</h3>
              <div className="trole">Co-fundador · Full Stack Developer</div>
              <div className="tdesc">Especializado en desarrollo web moderno e integración de sistemas. Construye las interfaces y arquitecturas que hacen posible cada automatización.</div>
              <div className="ttags"><span className="tt">React / Next.js</span><span className="tt">Node.js</span><span className="tt">UI/UX</span><span className="tt">Integraciones API</span></div>
            </div>
          </div>
          <div className="tcard">
            <div className="tav-big">IM</div>
            <div className="tinfo">
              <h3>Ismael Marirrodriga</h3>
              <div className="trole">Co-fundador · IA Engineer</div>
              <div className="tdesc">Especializado en automatización de procesos e integración de IA. Diseña los sistemas que hacen que los negocios funcionen de forma autónoma.</div>
              <div className="ttags"><span className="tt">Agentes IA</span><span className="tt">LLMs</span><span className="tt">Automatización</span><span className="tt">n8n · Make</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* REGALOS DIARIOS */}
      <LeadFormSection />

      {/* CTA */}
      <div className="ctasec" id="contacto">
        <h2>¿Cuánto te está costando<br />no estar <em>automatizado</em>?</h2>
        <p>La consulta es gratuita. El diagnóstico es inmediato. La propuesta llega en menos de 24 horas.</p>
        <button className="ctabig" onClick={() => onNavigate('svcs')}>Ver todos los servicios →</button>
        <div className="ctasub">Sin compromiso · Primera consulta gratuita · Respuesta en menos de 24h</div>
      </div>
    </>
  )
}
