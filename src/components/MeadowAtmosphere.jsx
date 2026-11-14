import { memo } from 'react';

// Stable placement avoids flickering when navigation or companion state changes.
const noise = (seed) => ((Math.sin(seed * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;

function MeadowAtmosphere({ flowers = false }) {
  return (
    <div className={`meadow-atmosphere ${flowers ? 'flower-meadow' : ''}`} aria-hidden="true">
      <div className="sun-wash" />
      <svg className="wind-grass" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="blade-shade" x1="0" y1="1" x2=".4" y2="0">
            <stop stopColor="#244f36" /><stop offset=".6" stopColor="#669745" /><stop offset="1" stopColor="#d0df73" />
          </linearGradient>
          <g id="grass-tuft">
            <path d="M0 0 Q-27-42-21-96 Q-8-56 0 0M0 0 Q3-66 35-116 Q17-46 0 0M0 0 Q-32-61-57-70 Q-21-24 0 0M0 0 Q21-47 57-58 Q26-28 0 0M0 0 Q-6-45 9-83 Q8-33 0 0" fill="url(#blade-shade)" />
          </g>
          <g id="meadow-bloom">
            <path d="M0 0 Q6-19 0-37M1-11 Q-14-25-14-15Q-8-9 1-11M2-20Q17-32 15-21Q10-16 2-20" fill="#527c43" stroke="#527c43" strokeWidth="1.4" />
            <g transform="translate(0 -38)" fill="var(--flower-color, #fff9d9)">
              {[0, 72, 144, 216, 288].map(angle => <ellipse key={angle} rx="3.8" ry="7" cy="-5" transform={`rotate(${angle})`} />)}
              <circle r="2.8" fill="#e7b94e" />
            </g>
          </g>
        </defs>
        {Array.from({ length: 48 }, (_, i) => {
          const x = i % 2 ? 1150 + noise(i + 1) * 500 : noise(i + 1) * 490 - 40;
          const y = 650 + noise(i + 90) * 310;
          return <g key={`grass-${i}`} transform={`translate(${x} ${y}) scale(${.35 + (y - 650) / 250})`}><use href="#grass-tuft" className="grass-sway" style={{ animationDelay: `${-noise(i + 7) * 8}s`, animationDuration: `${3.8 + noise(i + 4) * 3}s` }} /></g>;
        })}
        {Array.from({ length: flowers ? 150 : 32 }, (_, i) => {
          const y = 490 + noise(i + 400) * 450;
          const x = noise(i + 700) * 1600;
          if (!flowers && x > 480 && x < 1180) return null;
          return <g key={`flower-${i}`} transform={`translate(${x} ${y}) scale(${.13 + (y - 490) / 330})`}><use href="#meadow-bloom" className="flower-sway" style={{ opacity: .65 + noise(i) * .35, animationDelay: `${-noise(i + 80) * 6}s` }} /></g>;
        })}
      </svg>
      <div className="floating-pollen">
        {Array.from({ length: 16 }, (_, i) => <i key={i} style={{ left: `${noise(i + 17) * 100}%`, top: `${25 + noise(i + 6) * 70}%`, animationDelay: `${-i * 1.7}s`, animationDuration: `${12 + noise(i) * 12}s` }} />)}
      </div>
    </div>
  );
}

export default memo(MeadowAtmosphere);
