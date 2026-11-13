import { useId } from 'react';

// Reference-inspired fox girl with a longer silhouette and independently moving joints.
export default function Explorer() {
  const id = useId();
  const fur = `url(#${id}-fur)`;
  const dress = `url(#${id}-dress)`;
  const eyes = `url(#${id}-eyes)`;
  return (
    <svg className="nova nova-fox" viewBox="0 0 120 210" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fur`} x1="34" y1="22" x2="86" y2="156" gradientUnits="userSpaceOnUse"><stop stopColor="#ffcb94" /><stop offset=".48" stopColor="#f4a775" /><stop offset="1" stopColor="#d97c5c" /></linearGradient>
        <linearGradient id={`${id}-dress`} x1="40" y1="91" x2="83" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#b4c4d4" /><stop offset="1" stopColor="#7e91aa" /></linearGradient>
        <linearGradient id={`${id}-eyes`} x1="0" y1="57" x2="0" y2="74" gradientUnits="userSpaceOnUse"><stop stopColor="#36527d" /><stop offset=".5" stopColor="#5da8d1" /><stop offset="1" stopColor="#a4eee7" /></linearGradient>
      </defs>
      <g className="nova-tail">
        <path d="M78 145C84 161 94 175 109 160Q116 150 115 143C126 164 116 190 99 190C83 191 71 170 70 156Z" fill={fur} stroke="#b7785b" strokeWidth="1.2" />
        <path d="M109 160Q116 150 115 143Q124 159 119 174L113 170L108 177L107 168L101 169Z" fill="#fff3dc" />
      </g>
      <g className="nova-leg nova-leg-left"><path d="M40 146H55L53 192Q48 198 42 192Z" fill="#ffe3d4" stroke="#dcae9a" /><path d="M41 178Q47 181 54 178L53 197H43Z" fill="#fffaf3" stroke="#d9d5d2" /><path d="M43 192Q47 196 53 192L54 199Q53 204 42 203Q38 202 41 197Z" fill="#7a5b57" /><path d="M43 195H51" stroke="#f9e9df" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="nova-leg nova-leg-right"><path d="M65 146H80L78 192Q72 198 67 192Z" fill="#ffe3d4" stroke="#dcae9a" /><path d="M66 178Q73 181 79 178L77 197H67Z" fill="#fffaf3" stroke="#d9d5d2" /><path d="M67 192Q73 196 77 192L80 197Q82 202 78 203H68Q65 203 66 199Z" fill="#7a5b57" /><path d="M69 195H77" stroke="#f9e9df" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="nova-body">
        <g className="nova-long-hair">
          <path d="M30 49Q22 76 22 94Q13 115 20 134L28 129L29 138Q42 137 43 118L45 70H76L79 116Q80 137 94 138L94 129L102 133Q109 116 99 94Q98 63 89 46Z" fill={fur} stroke="#b77b60" strokeWidth="1.2" />
          <path d="M29 74Q26 99 24 116Q22 124 26 129M91 74Q95 102 98 118Q100 125 96 130" stroke="#ffe1ab" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 82Q30 112 34 131M85 82Q92 111 87 132" stroke="#d78c66" strokeWidth="1.2" />
        </g>
        <path d="M45 85Q60 80 75 85L78 112Q86 132 94 153Q61 171 26 153Q35 132 42 112Z" fill={dress} stroke="#758297" strokeWidth="1.2" />
        <path d="M29 150L27 157L33 157L35 162L41 160L45 165L51 162L57 166L63 163L69 166L75 162L81 164L86 159L92 158L92 151Q60 165 29 150Z" fill="#fffaf4" stroke="#c8c3cb" />
        <path d="M41 118L34 151M50 120L47 156M70 120L74 156M80 118L87 150" stroke="#6d839e" strokeWidth="1.2" />
        <path d="M48 85L44 113H77L72 85Z" fill="#fffdf7" stroke="#d8d6dd" />
        <path d="M45 84L42 86L44 90L41 94L43 98L40 103L43 107L41 112L47 113L51 85ZM75 84L78 86L76 90L79 94L77 98L80 103L77 107L79 112L73 113L69 85Z" fill="#fffdf9" stroke="#d6d0d4" strokeWidth=".8" />
        <path d="M55 82V88L60 91L65 88V82" fill="#ffe5d5" />
        <path d="M59 91Q50 85 50 92Q50 98 59 94M61 91Q70 85 70 92Q70 98 61 94" fill="#827f99" stroke="#66667c" /><path d="M58 94L54 105L60 102L65 106L62 94" fill="#a7a1b5" /><circle cx="60" cy="93" r="2.1" fill="#ded9e7" />
        <path d="M60 105V112" stroke="#c2bcc6" /><circle cx="60" cy="107" r="1" fill="#9ba4b3" />
        <path d="M44 111H77L85 148L81 150L78 155L74 153L69 157L64 155L60 158L55 155L50 157L46 154L41 155L38 150L35 148Z" fill="#fffdf8" stroke="#c9c5ce" strokeWidth="1.1" />
        <path d="M46 116Q46 138 41 147M74 116Q75 138 80 147M42 148Q60 156 78 148" stroke="#e2dde1" strokeWidth="1.2" />
        <g className="nova-arm nova-arm-left"><path d="M41 88Q33 86 31 96L30 106Q35 111 42 108L46 95Z" fill={dress} stroke="#8190a3" /><path d="M31 105L29 108L31 111L29 114L40 116L43 108Z" fill="#fffcf7" stroke="#d9d4d8" /><path d="M31 113L39 115L38 127Q34 132 30 127Z" fill="#ffe4d5" stroke="#dba997" /><path d="M33 121V125" stroke="#d9a48e" strokeLinecap="round" /></g>
        <g className="nova-arm nova-arm-right"><path d="M79 88Q87 86 89 96L90 106Q85 111 78 108L74 95Z" fill={dress} stroke="#8190a3" /><path d="M89 105L91 108L89 111L91 114L80 116L77 108Z" fill="#fffcf7" stroke="#d9d4d8" /><path d="M81 115L89 113L90 127Q86 132 82 127Z" fill="#ffe4d5" stroke="#dba997" /><path d="M87 121V125" stroke="#d9a48e" strokeLinecap="round" /></g>
        <g className="nova-head">
          <g className="nova-ear nova-ear-left"><path d="M33 44Q24 31 23 8L49 25Z" fill={fur} stroke="#b47b64" strokeWidth="1.2" /><path d="M33 36L28 16L43 28Z" fill="#efac9b" /><path d="M32 28L35 25L37 29L40 28L39 33L43 34L39 38L35 40L35 35L31 34Z" fill="#fffaf1" stroke="#dfd5cc" strokeWidth=".7" /></g>
          <g className="nova-ear nova-ear-right"><path d="M71 25L98 6Q97 31 87 44Z" fill={fur} stroke="#b47b64" strokeWidth="1.2" /><path d="M78 28L93 15L88 36Z" fill="#efac9b" /><path d="M88 27L85 25L83 29L80 28L81 33L77 34L81 38L85 40L85 35L89 34Z" fill="#fffaf1" stroke="#dfd5cc" strokeWidth=".7" /></g>
          <path d="M29 59Q27 28 51 26Q57 22 63 26Q91 22 92 57L88 79L80 84H40L31 78Z" fill={fur} stroke="#bd8265" strokeWidth="1.1" />
          <path d="M59 29Q55 19 63 17Q59 23 65 28" fill={fur} stroke="#bd8265" strokeWidth="1.1" />
          <ellipse cx="34" cy="65" rx="4" ry="6" fill="#ffdfcf" /><ellipse cx="86" cy="65" rx="4" ry="6" fill="#ffdfcf" />
          <path d="M36 47Q60 34 84 47V65Q84 83 60 86Q36 83 36 65Z" fill="#ffeadb" stroke="#e1baa6" strokeWidth=".7" />
          <path d="M30 54Q30 28 51 29Q77 22 90 45L89 65L83 53L78 59L73 42L70 57L65 56L59 39L59 57L53 56L48 41L45 55L39 60L37 54L32 69Z" fill={fur} stroke="#d1906d" strokeWidth=".8" />
          <path d="M32 57Q28 72 27 89L33 86L34 101Q40 87 40 72L37 54M86 54Q92 74 95 91L89 88L88 103Q81 88 81 73L83 54" fill={fur} stroke="#c68b6a" strokeWidth=".9" />
          <path d="M41 36L39 43M75 34L78 41M52 33L53 36M65 32L66 35" stroke="#ffe2b3" strokeWidth="2" strokeLinecap="round" />
          <g className="nova-eyes">
            <ellipse cx="48" cy="65" rx="6" ry="8" fill="#fffdfa" /><ellipse cx="72" cy="65" rx="6" ry="8" fill="#fffdfa" />
            <ellipse cx="48" cy="65.5" rx="4.8" ry="7" fill={eyes} /><ellipse cx="72" cy="65.5" rx="4.8" ry="7" fill={eyes} />
            <ellipse cx="48" cy="64" rx="2.1" ry="4.4" fill="#344e74" /><ellipse cx="72" cy="64" rx="2.1" ry="4.4" fill="#344e74" />
            <path d="M41 61Q47 55 53 61M67 61Q73 55 79 61" stroke="#725453" strokeWidth="1.8" strokeLinecap="round" /><path d="M42 60L40 58M78 60L80 58" stroke="#725453" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="46.5" cy="62" r="2" fill="white" /><circle cx="70.5" cy="62" r="2" fill="white" /><circle cx="50" cy="68.5" r="1" fill="#e0ffff" /><circle cx="74" cy="68.5" r="1" fill="#e0ffff" />
          </g>
          <ellipse cx="42" cy="74" rx="4.5" ry="2.4" fill="#f5aeab" fillOpacity=".65" /><ellipse cx="78" cy="74" rx="4.5" ry="2.4" fill="#f5aeab" fillOpacity=".65" />
          <path className="nova-mouth" d="M57 78Q60 81 63 78" stroke="#bd7d79" strokeWidth="1.2" strokeLinecap="round" />
          <g className="nova-hurt-face" stroke="#795452" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m44 61 7 4-7 4m32-8-7 4 7 4" /><path d="m56 79 3-2 3 2 3-2" /></g>
        </g>
        <g className="nova-sign"><rect x="39" y="109" width="43" height="27" rx="1" fill="#d7c5a1" stroke="#b59c77" strokeWidth="1.2" /><path d="M41 111H80" stroke="#e9dcbc" /><ellipse cx="39" cy="126" rx="3.6" ry="5.4" fill="#ffe5d5" stroke="#dba997" /><ellipse cx="82" cy="126" rx="3.6" ry="5.4" fill="#ffe5d5" stroke="#dba997" /><path d="M37 124L40 126M37 127L40 129M81 125L84 123M81 128L84 126" stroke="#dcae9b" strokeWidth=".7" strokeLinecap="round" /></g>
      </g>
      <g className="nova-hurt-hands">
        <path d="M38 97Q23 82 33 65M82 97Q97 82 87 65" stroke="#a4b6cb" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="34" cy="60" rx="5.5" ry="8" transform="rotate(15 34 60)" fill="#ffe5d5" stroke="#dba997" /><ellipse cx="86" cy="60" rx="5.5" ry="8" transform="rotate(-15 86 60)" fill="#ffe5d5" stroke="#dba997" />
      </g>
    </svg>
  );
}
