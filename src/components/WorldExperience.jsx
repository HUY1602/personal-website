import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Brain, Clock3, Compass, Eye, Globe2, Lightbulb, MoveRight, Pause, Play, Flower2 } from 'lucide-react';
import NovaCompanion from './NovaCompanion';
import MeadowAtmosphere from './MeadowAtmosphere';
import { profileData } from '../data/profileData';
import '../world.css';

const worlds = [
  { id: 'about', label: 'Giới thiệu', name: 'Đài quan sát', note: 'Một chút về mình, giữa miền hoa xanh.', color: '#65bde9', ink: '#256383', icon: Eye },
  { id: 'projects', label: 'Dự án', name: 'Xưởng ý tưởng', note: 'Nơi những ý tưởng đâm chồi và nở hoa.', color: '#8ed7b1', ink: '#286b4b', icon: Lightbulb },
  { id: 'skills', label: 'Kỹ năng', name: 'Lõi tri thức', note: 'Gom nhặt tri thức, qua những mùa hoa tím.', color: '#bba0e8', ink: '#6b4a95', icon: Brain },
  { id: 'experience', label: 'Kinh nghiệm', name: 'Dòng thời gian', note: 'Những chặng đường, những mùa nắng vàng.', color: '#f0c76a', ink: '#8b631c', icon: Clock3 },
  { id: 'contact', label: 'Liên hệ', name: 'Trạm kết nối', note: 'Một lời chào, một câu chuyện mới giữa vườn hoa hồng.', color: '#eda4c2', ink: '#964769', icon: Globe2 },
];
const readRoute = () => worlds.find(world => `#${world.id}` === window.location.hash)?.id || '';
const readMotion = () => { try { return localStorage.getItem('portfolio-reduced-motion') === 'true'; } catch { return false; } };

export default function WorldExperience({ sections }) {
  const [page, setPage] = useState(readRoute);
  const [journey, setJourney] = useState(null);
  const [lightOrigin, setLightOrigin] = useState(null);
  const [position, setPosition] = useState(null);
  const [roomPosition, setRoomPosition] = useState(null);
  const [visited, setVisited] = useState(() => readRoute() ? [readRoute()] : []);
  const [reduced, setReduced] = useState(readMotion);
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const sceneRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const timers = useRef([]);
  const busy = useRef(false);
  const returnFocus = useRef('');
  const shouldFocus = useRef(false);
  const reduceMotion = reduced || systemReduced;
  const activeWorld = worlds.find(world => world.id === page);
  const destination = worlds.find(world => world.id === journey?.id);
  const theme = activeWorld || destination || worlds[0];
  const Content = sections[page];
  const ActiveIcon = activeWorld?.icon;

  const clearJourney = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    busy.current = false;
    setJourney(null);
    setLightOrigin(null);
  }, []);

  const showPage = useCallback((id, push = true) => {
    clearJourney();
    shouldFocus.current = true;
    setPage(id);
    setRoomPosition(null);
    if (id) setVisited(previous => previous.includes(id) ? previous : [...previous, id]);
    if (push && readRoute() !== id) window.history.pushState(null, '', id ? `#${id}` : window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [clearJourney]);

  const navigate = useCallback(id => {
    if (busy.current || id === page) return;
    if (reduceMotion) { showPage(id); return; }
    busy.current = true;
    setPage('');
    if (page) setPosition(null);
    setJourney({ id, phase: 'preparing' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page, reduceMotion, showPage]);

  const goHome = useCallback(() => {
    returnFocus.current = page || journey?.id || '';
    showPage('');
    setPosition(null);
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
    if (journey?.phase !== 'preparing') return;
    const timer = setTimeout(() => {
      const scene = sceneRef.current;
      const door = scene?.querySelector('.portal-frame');
      const girl = scene?.querySelector('.nova-companion');
      if (!scene || !door || !girl) { showPage(journey.id); return; }
      const bounds = scene.getBoundingClientRect();
      const target = door.getBoundingClientRect();
      const girlBounds = girl.getBoundingClientRect();
      // Her extended hand meets the latch while her feet stay on the path.
      setPosition({
        x: (target.left - girlBounds.width * .26 - bounds.left) / bounds.width * 100,
        y: (target.bottom + 18 - bounds.top) / bounds.height * 100,
      });
      setJourney({ id: journey.id, phase: 'walking' });
      timers.current.push(setTimeout(() => setJourney({ id: journey.id, phase: 'opening' }), 1600));
      timers.current.push(setTimeout(() => setJourney({ id: journey.id, phase: 'entering' }), 2700));
      timers.current.push(setTimeout(() => showPage(journey.id), 4500));
    }, 80);
    return () => clearTimeout(timer);
  }, [journey?.id, journey?.phase, showPage]);

  useEffect(() => {
    if (journey?.phase !== 'opening' && journey?.phase !== 'entering') return;
    const trackDoor = () => {
      const rect = sceneRef.current?.querySelector('.portal-frame')?.getBoundingClientRect();
      if (!rect) return;
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setLightOrigin({ x, y, scale: Math.max(10, Math.hypot(window.innerWidth, window.innerHeight) / 65) });
    };
    trackDoor();
    window.addEventListener('resize', trackDoor);
    window.addEventListener('scroll', trackDoor, { passive: true });
    return () => { window.removeEventListener('resize', trackDoor); window.removeEventListener('scroll', trackDoor); };
  }, [journey?.id, journey?.phase]);

  useEffect(() => { if (reduceMotion && journey) showPage(journey.id); }, [reduceMotion, journey, showPage]);

  useEffect(() => {
    document.title = activeWorld ? `${activeWorld.label} — ${profileData.personal.fullName}` : `${profileData.personal.fullName} — Qua miền nắng gió`;
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    const portal = !page && returnFocus.current && sceneRef.current?.querySelector(`[data-portal="${returnFocus.current}"]`);
    (portal || headingRef.current)?.focus({ preventScroll: true });
    returnFocus.current = '';
  }, [page, activeWorld]);

  useEffect(() => {
    const handleEscape = event => { if (event.key === 'Escape' && (page || journey)) goHome(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [page, journey, goHome]);

  const toggleMotion = () => {
    setReduced(!reduced);
    try { localStorage.setItem('portfolio-reduced-motion', String(!reduced)); } catch { /* Optional preference. */ }
  };
  const interceptSectionLink = event => {
    const anchor = event.target.closest('a[href^="#"]');
    const id = anchor?.getAttribute('href').slice(1);
    if (worlds.some(world => world.id === id) && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault(); navigate(id);
    }
  };

  return (
    <div className={`universe ${reduceMotion ? 'motion-reduced' : ''} ${page ? `world-view world-${page}` : 'map-view'}`}
      style={{ '--world-color': theme.color, '--world-ink': theme.ink, '--flower-color': activeWorld?.color || '#fff9df', '--world-scene': `url('/images/meadow/field-${theme.id}.jpg')` }}>
      <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus(); }}>Đến nội dung chính</a>
      <div className={`landscape-backdrop ${page ? 'landscape-flowers' : ''}`} aria-hidden="true" />
      <MeadowAtmosphere flowers={!!page} />
      <header className="world-header">
        <button className="world-brand" onClick={goHome} aria-label="Huy Quang — về bản đồ">
          <span className="brand-orbit">hq<span>✳</span></span>
          <span>{profileData.personal.fullName}<small>AI & Machine Learning Engineer</small></span>
        </button>
        {page && <nav className="world-navigation" aria-label="Các thế giới">
          {worlds.map(world => <button key={world.id} onClick={() => navigate(world.id)} disabled={!!journey} aria-current={page === world.id ? 'page' : undefined}>{world.label}</button>)}
        </nav>}
        <button className="motion-toggle" onClick={toggleMotion} aria-pressed={reduceMotion} disabled={systemReduced} title={systemReduced ? 'Đang giảm chuyển động theo thiết bị' : 'Bật / tắt chuyển động'}>
          {reduceMotion ? <Play size={14} /> : <Pause size={14} />}<span>{reduceMotion ? 'Ít chuyển động' : 'Gió đang thổi'}</span>
        </button>
      </header>
      <main id="main-content" tabIndex={-1} onClick={interceptSectionLink}>
        {!page ? <div className={`world-hub phase-${journey?.phase || 'idle'}`}>
          <div className="hub-intro">
            <p className="eyebrow"><span /> MỘT CHUYẾN ĐI NHO NHỎ</p>
            <h1 ref={headingRef} tabIndex={-1}>Qua miền nắng gió,<br /><em>gặp những câu chuyện.</em></h1>
            <p>Mình là Huy. Cùng Nova khám phá thế giới của mình nhé.</p>
          </div>
          <div className="universe-map" ref={sceneRef} aria-label="Cánh đồng khám phá portfolio" aria-busy={!!journey}>
            <div className={`meadow-door is-${journey?.phase || 'idle'}`}>
              <div className="door-crown" aria-hidden="true"><Flower2 size={23} /><span>MỘT CÁNH CỬA · NĂM THẾ GIỚI</span></div>
              <div className="door-ground" aria-hidden="true" />
              <div className="portal-frame">
                <div className="portal-interior" aria-hidden="true"><span /></div>
                <div className="portal-door">
                  <span className="door-ornament" aria-hidden="true">✧</span>
                  <div className="door-destinations" role="group" aria-label="Chọn thế giới trên cánh cửa">
                    {worlds.map(world => <button key={world.id} data-portal={world.id}
                      className={`portal portal-${world.id} ${destination?.id === world.id ? `is-${journey.phase}` : ''}`}
                      style={{ '--portal-color': world.color, '--portal-ink': world.ink }} disabled={!!journey}
                      onClick={() => navigate(world.id)} aria-label={`Khám phá ${world.label}: ${world.name}`}>
                      <span className="door-symbol"><world.icon size={24} strokeWidth={1.6} /></span>
                      <span className="portal-label">{world.label}</span>
                      {visited.includes(world.id) && <i className="portal-visited" aria-label="Đã khám phá" />}
                    </button>)}
                  </div>
                  <span className="door-handle" aria-hidden="true" />
                  <span className="door-bottom-ornament" aria-hidden="true">❧</span>
                </div>
              </div>
              <div className="portal-front-light" aria-hidden="true" />
              <div className="door-step" aria-hidden="true" />
            </div>
            <NovaCompanion boundsRef={sceneRef} position={position} onPositionChange={setPosition} phase={journey?.phase || 'idle'} />
          </div>
          <div className="map-caption">
            <span><span className="status-light" />{journey ? `${journey.phase === 'walking' ? 'Nova đang bước đến cửa' : journey.phase === 'opening' ? 'Nova đang mở cửa' : journey.phase === 'entering' ? 'Theo ánh sáng đến' : 'Chuẩn bị khám phá'} · ${destination?.label}` : 'Chạm một biểu tượng trên cửa, một thế giới mở ra.'}</span>
            {journey ? <button onClick={() => showPage(journey.id)}>Vào ngay <MoveRight size={14} /></button> : <span className="visited-count">{String(visited.length).padStart(2, '0')} / 05 thế giới đã khám phá</span>}
          </div>
        </div> : <div className="world-content" key={page}>
          <div className="world-toolbar"><button onClick={goHome}><ArrowLeft size={16} /> Trở về bản đồ</button><span>QUA MIỀN NẮNG GIÓ <span>/</span> {activeWorld.label}</span><span className="world-ordinal">0{worlds.indexOf(activeWorld) + 1} / 05</span></div>
          <div className="world-arrival" ref={contentRef}>
            <div className="arrival-emblem" aria-hidden="true"><ActiveIcon size={30} strokeWidth={1.4} /></div>
            <p className="eyebrow">MIỀN HOA · {activeWorld.label.toLocaleUpperCase('vi')}</p>
            <h1 ref={headingRef} tabIndex={-1}>{activeWorld.name}</h1><p>{activeWorld.note}</p>
            <a className="read-story" href={`#story-${page}`} onClick={event => {
              event.preventDefault();
              document.getElementById(`story-${page}`)?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
            }}>Đọc câu chuyện <span>↓</span></a>
            <NovaCompanion boundsRef={contentRef} position={roomPosition} onPositionChange={setRoomPosition} inWorld />
          </div>
          <div className="story-paper" id={`story-${page}`}><Content />
            <div className="world-exit"><span>Còn những miền hoa đang chờ bạn.</span><button onClick={goHome}><Compass size={17} /> Khám phá thế giới khác <MoveRight size={17} /></button></div>
          </div>
        </div>}
      </main>
      <footer className="universe-footer"><span>© {new Date().getFullYear()} {profileData.personal.fullName}</span><span>Một chút tò mò. Một chuyến phiêu lưu.</span><a href={profileData.personal.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a></footer>
      <div className="sr-only" role="status" aria-live="polite">{journey ? `Nova đang ${journey.phase === 'opening' ? 'mở cửa đến' : 'khám phá'} ${destination?.label}` : activeWorld ? `Đã đến ${activeWorld.label}` : 'Chọn biểu tượng trên cánh cửa để khám phá.'}</div>
      {lightOrigin && (journey?.phase === 'opening' || journey?.phase === 'entering') && <div className={`portal-transition light-${journey.phase}`} aria-hidden="true" style={{ '--light-x': `${lightOrigin.x}px`, '--light-y': `${lightOrigin.y}px`, '--light-reach': lightOrigin.scale }}><div className="forward-light" /><div className="portal-light-veil" /></div>}
    </div>
  );
}
