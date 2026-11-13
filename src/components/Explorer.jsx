// SVG puppet: individual limbs respond to the journey state in world.css.
export default function Explorer() {
  return (
    <svg className="nova" viewBox="0 0 100 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="nova-shell" x1="25" y1="20" x2="76" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#f0f9ff" /><stop offset="1" stopColor="#6f92b1" /></linearGradient>
        <linearGradient id="nova-visor" x1="29" y1="32" x2="70" y2="58" gradientUnits="userSpaceOnUse"><stop stopColor="#173a51" /><stop offset="1" stopColor="#06101d" /></linearGradient>
      </defs>
      <g className="nova-leg nova-leg-left"><rect x="31" y="88" width="14" height="23" rx="7" fill="#8faac1" /><rect x="26" y="103" width="21" height="10" rx="5" fill="#e0f2fe" /></g>
      <g className="nova-leg nova-leg-right"><rect x="55" y="88" width="14" height="23" rx="7" fill="#8faac1" /><rect x="54" y="103" width="21" height="10" rx="5" fill="#e0f2fe" /></g>
      <g className="nova-body">
        <rect x="23" y="66" width="54" height="28" rx="10" fill="#35566c" />
        <g className="nova-arm nova-arm-left"><rect x="15" y="64" width="13" height="30" rx="6.5" fill="url(#nova-shell)" /><circle cx="21" cy="91" r="7" fill="#d5ebf5" /></g>
        <rect x="28" y="62" width="44" height="36" rx="14" fill="url(#nova-shell)" />
        <rect x="36" y="72" width="28" height="16" rx="6" fill="#17374c" /><path d="M43 80h4l3-4 3 8 3-4h3" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <g className="nova-arm nova-arm-right"><rect x="72" y="64" width="13" height="30" rx="6.5" fill="url(#nova-shell)" /><circle cx="79" cy="91" r="7" fill="#d5ebf5" /></g>
        <g className="nova-head"><path d="M50 23V13" stroke="#94b6cb" strokeWidth="3" /><circle className="nova-antenna" cx="50" cy="10" r="5" fill="#7dd3fc" /><rect x="15" y="34" width="10" height="20" rx="5" fill="#567b93" /><rect x="75" y="34" width="10" height="20" rx="5" fill="#567b93" /><rect x="20" y="22" width="60" height="45" rx="19" fill="url(#nova-shell)" /><rect x="26" y="29" width="48" height="30" rx="13" fill="url(#nova-visor)" /><g className="nova-eyes"><rect x="36" y="38" width="6" height="10" rx="3" fill="#8ee9ff" /><rect x="58" y="38" width="6" height="10" rx="3" fill="#8ee9ff" /></g><path d="M46 51q4 3 8 0" stroke="#8ee9ff" strokeWidth="1.5" strokeLinecap="round" /><path d="M31 28q18-7 35 0" stroke="white" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" /></g>
      </g>
    </svg>
  );
}
