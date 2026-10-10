import { motion } from 'framer-motion'

export default function PodVisual() {
  return (
    <div className="pod-visual" aria-label="Anadolu Parsı pod teknik görselleştirmesi">
      <div className="pod-grid" />
      <motion.svg viewBox="0 0 760 360" role="img" aria-labelledby="pod-title" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .8 }}>
        <title id="pod-title">Anadolu Parsı hiperloop podu teknik çizimi</title>
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#343945"/><stop offset=".5" stopColor="#15181e"/><stop offset="1" stopColor="#08090b"/></linearGradient>
          <linearGradient id="amber" x1="0" x2="1"><stop stopColor="#e29d2b"/><stop offset="1" stopColor="#ff5500"/></linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M86 214 C126 143 214 114 388 112 C540 110 622 137 684 190 L696 226 L640 243 L140 245 L70 231 Z" fill="url(#metal)" stroke="#626a78" strokeWidth="2"/>
        <path d="M115 203 C176 147 256 132 407 131 C516 130 598 148 658 193" fill="none" stroke="url(#amber)" strokeWidth="3" filter="url(#glow)"/>
        <path d="M90 223 L671 220" stroke="#3c424c" strokeDasharray="8 6"/>
        <path d="M224 137 L210 238 M469 130 L486 240" stroke="#575e69" strokeWidth="2"/>
        <path d="M248 151 L446 151 L466 221 L225 221 Z" fill="#0d0f12" stroke="#e29d2b" strokeWidth="1.5"/>
        {Array.from({length: 8}).map((_, i) => <rect key={i} x={248 + i * 24} y="174" width="16" height="25" rx="2" fill={i < 6 ? '#d28f25' : '#3a3e45'} opacity=".8"/>)}
        <circle cx="165" cy="245" r="22" fill="#08090b" stroke="#868e9b" strokeWidth="4"/>
        <circle cx="602" cy="245" r="22" fill="#08090b" stroke="#868e9b" strokeWidth="4"/>
        <path d="M245 86 L245 126 M470 81 L470 126 M620 101 L620 158" stroke="#e29d2b"/>
        <circle cx="245" cy="82" r="4" fill="#e29d2b"/><circle cx="470" cy="77" r="4" fill="#e29d2b"/><circle cx="620" cy="97" r="4" fill="#e29d2b"/>
        <text x="202" y="70" className="pod-label">POWER CORE</text><text x="430" y="65" className="pod-label">CONTROL</text><text x="590" y="89" className="pod-label">AERO</text>
        <path d="M118 274 H656" stroke="#2d323b"/><path d="M258 270 H480" stroke="#ff5500" strokeWidth="2"/>
      </motion.svg>
      <div className="pod-crosshair pod-crosshair-a"/><div className="pod-crosshair pod-crosshair-b"/>
      <div className="pod-readout"><span>VEHICLE / P-01</span><strong>ANADOLU PARSI</strong><small>DIGITAL SYSTEM MODEL</small></div>
    </div>
  )
}
