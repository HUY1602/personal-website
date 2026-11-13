import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Compass, MoveRight, Pause, Play, Sparkles } from 'lucide-react';
import Explorer from './Explorer';
import { profileData } from '../data/profileData';
import '../world.css';

const worlds = [
  { id: 'about', label: 'Giới thiệu', name: 'Đài quan sát', note: 'Câu chuyện & góc nhìn', color: '#7dd3fc', symbol: '◎' },
  { id: 'skills', label: 'Kỹ năng', name: 'Lõi tri thức', note: 'Công nghệ & khả năng', color: '#c4b5fd', symbol: '⌘' },
  { id: 'projects', label: 'Dự án', name: 'Xưởng ý tưởng', note: 'Từ ý tưởng đến thực tế', color: '#6ee7b7', symbol: '◇' },
  { id: 'experience', label: 'Kinh nghiệm', name: 'Dòng thời gian', note: 'Những chặng đường đã qua', color: '#fcd38d', symbol: '◷' },
  { id: 'contact', label: 'Liên hệ', name: 'Trạm kết nối', note: 'Bắt đầu một điều mới', color: '#f9a8d4', symbol: '✳' },
];
const readRoute = () => worlds.find(world => `#${world.id}` === window.location.hash)?.id || '';
const readMotion = () => {
  try { return localStorage.getItem('portfolio-reduced-motion') === 'true'; } catch { return false; }
};

export default function WorldExperience({ sections }) {
  const [page, setPage] = useState(readRoute);
  const [journey, setJourney] = useState(null);
  const [position, setPosition] = useState({ x: 59, y: 85 });
  const [visited, setVisited] = useState(() => readRoute() ? [readRoute()] : []);
  const [reduced, setReduced] = useState(readMotion);
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const sceneRef = useRef(null);
  const headingRef = useRef(null);
  const timers = useRef([]);
  const busy = useRef(false);
  const returnFocus = useRef('');
  const shouldFocus = useRef(false);
  const reduceMotion = reduced || systemReduced;
  const activeWorld = worlds.find(world => world.id === page);
  const destination = worlds.find(world => world.id === journey?.id);
  const Content = sections[page];

  const clearJourney = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    busy.current = false;
    setJourney(null);
  }, []);

  const showPage = useCallback((id, push = true) => {
    clearJourney();
    shouldFocus.current = true;
    setPage(id);
    if (id) setVisited(previous => previous.includes(id) ? previous : [...previous, id]);
    if (push && readRoute() !== id) window.history.pushState(null, '', id ? `#${id}` : window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [clearJourney]);

  const navigate = useCallback((id) => {
    if (busy.current || id === page) return;
    if (reduceMotion) { showPage(id); return; }
    busy.current = true;
    setPage('');
    setPosition({ x: 59, y: 85 });
    setJourney({ id, phase: 'preparing' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page, reduceMotion, showPage]);

  const goHome = useCallback(() => {
    returnFocus.current = page || journey?.id || '';
    showPage('');
    setPosition({ x: 59, y: 85 });
  }, [page, journey?.id, showPage]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystemReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const restore = () => showPage(readRoute(), false);
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    return () => {
      window.removeEventListener('popstate', restore);
      window.removeEventListener('hashchange', restore);
      timers.current.forEach(clearTimeout);
    };
  }, [showPage]);

  useEffect(() => {
    if (journey?.phase !== 'preparing') return undefined;
    // Measure the mounted map so Nova also reaches the right door on small screens.
    const timer = setTimeout(() => {
      const scene = sceneRef.current;
      const portal = scene?.querySelector(`[data-portal="${journey.id}"] .portal-platform`);
      if (!scene || !portal) { showPage(journey.id); return; }
      const bounds = scene.getBoundingClientRect();
      const target = portal.getBoundingClientRect();
      if (window.innerWidth <= 700) {
        // Keep the map, Nova and the selected door in view during the mobile journey.
        window.scrollTo({ top: Math.max(0, bounds.top + window.scrollY - 20, target.top + window.scrollY - window.innerHeight + 150), behavior: 'instant' });
      }
      setPosition({
        x: ((target.left + target.width / 2 - 35 - bounds.left) / bounds.width) * 100,
        y: ((target.top + target.height / 2 - bounds.top) / bounds.height) * 100,
      });
      setJourney({ id: journey.id, phase: 'walking' });
      timers.current.push(setTimeout(() => setJourney({ id: journey.id, phase: 'opening' }), 1000));
      timers.current.push(setTimeout(() => setJourney({ id: journey.id, phase: 'entering' }), 1800));
      timers.current.push(setTimeout(() => showPage(journey.id), 2700));
    }, 60);
    return () => clearTimeout(timer);
  }, [journey?.id, journey?.phase, showPage]);

  useEffect(() => {
    if (reduceMotion && journey) showPage(journey.id);
  }, [reduceMotion, journey, showPage]);

  useEffect(() => {
    document.title = activeWorld ? `${activeWorld.label} — ${profileData.personal.fullName}` : `${profileData.personal.fullName} — Một vũ trụ nhỏ về AI`;
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const portal = !page && returnFocus.current && sceneRef.current?.querySelector(`[data-portal="${returnFocus.current}"]`);
    (portal || headingRef.current)?.focus({ preventScroll: true });
    returnFocus.current = '';
  }, [page, activeWorld]);

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape' && (page || journey)) goHome();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [page, journey, goHome]);

  const toggleMotion = () => {
    setReduced(!reduced);
    try { localStorage.setItem('portfolio-reduced-motion', String(!reduced)); } catch { /* Storage may be unavailable. */ }
  };

  const interceptSectionLink = event => {
    const anchor = event.target.closest('a[href^="#"]');
    const id = anchor?.getAttribute('href').slice(1);
    if (worlds.some(world => world.id === id) && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      navigate(id);
    }
  };

  return (
    <div className={`universe ${reduceMotion ? 'motion-reduced' : ''} ${page ? `world-view world-${page}` : 'map-view'}`} style={{ '--world-color': activeWorld?.color || destination?.color || '#7dd3fc' }}>
      <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Đến nội dung chính</a>
      <div className="cosmic-dust" aria-hidden="true" />
      <header className="world-header">
        <button className="world-brand" onClick={goHome} aria-label="Huy Quang — về bản đồ">
          <span className="brand-orbit">h<span>q</span><i /></span>
          <span>{profileData.personal.fullName}<small>AI & Machine Learning Engineer</small></span>
        </button>
        <nav className="world-navigation" aria-label="Các thế giới">
          {worlds.map(world => <button key={world.id} onClick={() => navigate(world.id)} disabled={!!journey} aria-current={page === world.id ? 'page' : undefined}>{world.label}</button>)}
        </nav>
        <button className="motion-toggle" onClick={toggleMotion} aria-pressed={reduceMotion} disabled={systemReduced} title={systemReduced ? 'Đang giảm chuyển động theo thiết bị' : 'Bật / tắt chuyển động'}>
          {reduceMotion ? <Play size={14} /> : <Pause size={14} />}<span>{reduceMotion ? 'Ít chuyển động' : 'Chuyển động'}</span>
        </button>
      </header>
      <main id="main-content" tabIndex={-1} onClick={interceptSectionLink}>
        {!page ? (
          <div className={`world-hub phase-${journey?.phase || 'idle'}`}>
            <div className="hub-intro">
              <p className="eyebrow"><span /> CHÀO MỪNG ĐẾN VŨ TRỤ CỦA MÌNH</p>
              <h1 ref={headingRef} tabIndex={-1}>Mỗi cánh cửa,<br /><span>một câu chuyện.</span></h1>
              <p>Mình là Huy Quang. Cùng người bạn nhỏ khám phá<br className="desktop-break" /> thế giới của một kỹ sư AI nhé.</p>
              <div className="explore-hint"><Compass size={15} /><span>Chọn một cánh cổng để bắt đầu</span><MoveRight size={17} /></div>
            </div>
            <div className="universe-map" ref={sceneRef} aria-label="Bản đồ khám phá portfolio" aria-busy={!!journey}>
              <div className="map-orbit orbit-one" aria-hidden="true" /><div className="map-orbit orbit-two" aria-hidden="true" />
              <div className="map-grid" aria-hidden="true" />
              <span className="map-coordinate" aria-hidden="true">HQ / UNIVERSE 01</span>
              <span className="map-coordinate coordinate-right" aria-hidden="true">∞ POSSIBILITIES</span>
              {worlds.map((world, index) => (
                <button key={world.id} data-portal={world.id} className={`portal portal-${world.id} ${destination?.id === world.id ? `is-${journey.phase}` : ''}`} style={{ '--portal-color': world.color, '--float-delay': `${index * -0.7}s` }} disabled={!!journey} onClick={() => navigate(world.id)} aria-label={`Khám phá ${world.label}: ${world.name}`}>
                  <span className="portal-number">0{index + 1} / {visited.includes(world.id) ? 'ĐÃ KHÁM PHÁ' : 'KHÁM PHÁ'}</span>
                  <span className="portal-art" aria-hidden="true">
                    <span className="portal-halo" /><span className="portal-spark spark-one" /><span className="portal-spark spark-two" />
                    <span className="portal-frame"><span className="portal-interior"><i /><i /><i /></span><span className="portal-door"><span className="door-symbol">{world.symbol}</span><span className="door-handle" /></span></span>
                    <span className="portal-platform"><i /></span>
                  </span>
                  <span className="portal-label">{world.label}<ArrowUpRight size={14} /></span>
                  <span className="portal-note">{world.name}</span>
                </button>
              ))}
              <div className={`explorer-position explorer-${journey?.phase || 'idle'}`} style={{ left: `${position.x}%`, top: `${position.y}%` }} aria-hidden="true">
                {!journey && <span className="explorer-bubble">Đi cùng mình nhé! <Sparkles size={11} /></span>}
                <Explorer /><span className="explorer-shadow" /><span className="explorer-name">NOVA</span>
              </div>
            </div>
            <div className="map-caption">
              <span><span className="status-light" /> {journey ? `${journey.phase === 'walking' ? 'Nova đang đến' : journey.phase === 'opening' ? 'Nova đang mở' : journey.phase === 'entering' ? 'Đang bước vào' : 'Chuẩn bị khám phá'} ${destination?.name}…` : 'Một chút tò mò. Một chuyến phiêu lưu.'}</span>
              {journey ? <button onClick={() => showPage(journey.id)}>Vào ngay <MoveRight size={14} /></button> : <span className="visited-count">{String(visited.length).padStart(2, '0')} / 05 thế giới đã khám phá</span>}
            </div>
          </div>
        ) : (
          <div className="world-content" key={page}>
            <div className="world-toolbar"><button onClick={goHome}><ArrowLeft size={16} /> Trở về bản đồ</button><span>VŨ TRỤ HQ <span>/</span> {activeWorld.label}</span><span className="world-ordinal">0{worlds.indexOf(activeWorld) + 1} / 05</span></div>
            <div className="world-arrival">
              <div className="arrival-emblem" aria-hidden="true">{activeWorld.symbol}<i /><i /></div>
              <p className="eyebrow">BẠN ĐÃ ĐẾN {activeWorld.label.toLocaleUpperCase('vi')}</p>
              <h1 ref={headingRef} tabIndex={-1}>{activeWorld.name}</h1>
              <p>{activeWorld.note}</p>
              <div className="arrival-companion" aria-hidden="true"><Explorer /></div>
            </div>
            <Content />
            <div className="world-exit"><span>Còn nhiều câu chuyện đang chờ bạn.</span><button onClick={goHome}><Compass size={17} /> Khám phá thế giới khác <MoveRight size={17} /></button></div>
          </div>
        )}
      </main>
      <footer className="universe-footer"><span>© {new Date().getFullYear()} {profileData.personal.fullName}</span><span>Được tạo nên từ trí tò mò & những dòng code.</span><a href={profileData.personal.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a></footer>
      <div className="sr-only" role="status" aria-live="polite">{journey ? `${journey.phase === 'opening' ? 'Nova đang mở cổng' : 'Đang khám phá'} ${destination?.label}` : activeWorld ? `Đã đến ${activeWorld.label}` : 'Chọn một cánh cổng để khám phá.'}</div>
      {journey?.phase === 'entering' && <div className="portal-transition" aria-hidden="true"><div className="warp-tunnel"><i /><i /><i /><i /><i /></div><span className="warp-symbol">{destination.symbol}</span><p>Đang bước vào<span>{destination.name}</span></p></div>}
    </div>
  );
}
