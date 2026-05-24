export default function LogoIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" fill="none" stroke="#7c6eec" strokeWidth="1" opacity="0.35"/>
      <circle cx="32" cy="32" r="18" fill="none" stroke="#7c6eec" strokeWidth="1" opacity="0.5"/>
      <circle cx="32" cy="32" r="9"  fill="none" stroke="#7c6eec" strokeWidth="1.5"/>
      <line x1="32" y1="32" x2="32" y2="25" stroke="#7c6eec" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="32" y1="32" x2="37" y2="35" stroke="#7c6eec" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="1.5" fill="#7c6eec"/>
      <line x1="32" y1="4"  x2="32" y2="14" stroke="#7c6eec" strokeWidth="0.8" opacity="0.3"/>
      <line x1="32" y1="50" x2="32" y2="60" stroke="#7c6eec" strokeWidth="0.8" opacity="0.3"/>
      <line x1="4"  y1="32" x2="14" y2="32" stroke="#7c6eec" strokeWidth="0.8" opacity="0.3"/>
      <line x1="50" y1="32" x2="60" y2="32" stroke="#7c6eec" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="32" cy="4"  r="3.5" fill="#7c6eec" opacity="0.8"/>
      <circle cx="56" cy="20" r="2.5" fill="#7c6eec" opacity="0.6"/>
      <circle cx="56" cy="44" r="2"   fill="#7c6eec" opacity="0.5"/>
      <circle cx="8"  cy="44" r="2.5" fill="#7c6eec" opacity="0.6"/>
      <circle cx="14" cy="16" r="2"   fill="#7c6eec" opacity="0.5"/>
      <path d="M4 32 Q10 26 16 32 Q22 38 28 32 Q34 26 40 32 Q46 38 52 32 Q58 26 60 32" fill="none" stroke="#7c6eec" strokeWidth="1" opacity="0.4"/>
    </svg>
  )
}
