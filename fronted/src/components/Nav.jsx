import LogoIcon from './LogoIcon'

export default function Nav({ page, onNavigate }) {
  return (
    <nav>
      <a className="logo-wrap" href="#" onClick={(e) => { e.preventDefault(); onNavigate('home') }}>
        <LogoIcon className="logo-svg" />
        <div className="logo-text">Marirrodriga<b>.IA</b></div>
      </a>
      <div className="nl">
        <a className={page === 'home' ? 'on' : ''} onClick={() => onNavigate('home')}>Inicio</a>
        <a className={page === 'svcs' ? 'on' : ''} onClick={() => onNavigate('svcs')}>Servicios</a>
        <a href="#contacto">Blog</a>
        <a className={page === 'contact' ? 'on' : ''} onClick={() => onNavigate('contact')}>Contacto</a>
      </div>
      <button className="nb" onClick={() => onNavigate('svcs')}>Ver servicios →</button>
    </nav>
  )
}
