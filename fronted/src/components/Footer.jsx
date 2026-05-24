import LogoIcon from './LogoIcon'

export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="footer-logo">
        <LogoIcon className="logo-svg" />
        <div>
          <div className="footer-logo-text">Marirrodriga<b>.IA</b></div>
          <div className="footer-tagline">Automatizamos lo que te roba tiempo.</div>
        </div>
      </div>
      <div className="footer-links">
        <a onClick={() => onNavigate('home')}>Inicio</a>
        <a onClick={() => onNavigate('svcs')}>Servicios</a>
        <a>Blog</a>
        <a>Contacto</a>
      </div>
      <div className="footer-copy">© 2025 Marirrodriga.IA · Todos los derechos reservados</div>
    </footer>
  )
}
