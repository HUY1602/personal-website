import { useEffect, useRef, useState } from 'react';
import Explorer from './Explorer';

const messages = {
  idle: 'Đi cùng mình nhé!',
  greeting: 'Xin chào! Mình là Nova 👋',
  hurt: 'Ái da! Nhẹ tay với mình nhé!',
  dragging: 'Mình đi đâu tiếp đây?',
};

export default function NovaCompanion({ boundsRef, position, onPositionChange, phase = 'idle', inWorld = false }) {
  const [mood, setMood] = useState('idle');
  const buttonRef = useRef(null);
  const gesture = useRef(null);
  const holdTimer = useRef(null);
  const reactionTimer = useRef(null);
  const taps = useRef([]);
  const suppressClick = useRef(false);
  const disabled = phase !== 'idle';

  const releaseGesture = () => {
    clearTimeout(holdTimer.current);
    const pointerId = gesture.current?.pointerId;
    gesture.current = null;
    if (pointerId !== undefined && buttonRef.current?.hasPointerCapture(pointerId)) {
      buttonRef.current.releasePointerCapture(pointerId);
    }
  };

  useEffect(() => {
    if (disabled) {
      clearTimeout(reactionTimer.current);
      releaseGesture();
      setMood('idle');
      taps.current = [];
    }
  }, [disabled]);

  useEffect(() => () => {
    clearTimeout(holdTimer.current);
    clearTimeout(reactionTimer.current);
  }, []);

  const reactToTap = () => {
    if (suppressClick.current) { suppressClick.current = false; return; }
    if (disabled) return;
    const now = Date.now();
    taps.current = [...taps.current.filter(time => now - time < 1200), now];
    const nextMood = taps.current.length >= 3 ? 'hurt' : 'greeting';
    setMood(nextMood);
    clearTimeout(reactionTimer.current);
    reactionTimer.current = setTimeout(() => { setMood('idle'); taps.current = []; }, nextMood === 'hurt' ? 2600 : 2000);
  };

  const beginDrag = () => {
    if (!gesture.current) return;
    gesture.current.dragging = true;
    suppressClick.current = true;
    taps.current = [];
    clearTimeout(reactionTimer.current);
    setMood('dragging');
  };

  const moveTo = (anchorX, anchorY) => {
    const bounds = boundsRef.current?.getBoundingClientRect();
    const bot = buttonRef.current?.getBoundingClientRect();
    if (!bounds || !bot) return;
    // Keep the body and its speech bubble reachable, even at the edges of the scene.
    const x = Math.min(bounds.width - bot.width / 2 - 8, Math.max(bot.width / 2 + 8, anchorX - bounds.left));
    const y = Math.min(bounds.height - 25, Math.max(bot.height + 45, anchorY - bounds.top));
    onPositionChange({ x: x / bounds.width * 100, y: y / bounds.height * 100 });
  };

  const pointerDown = event => {
    if (disabled || !event.isPrimary || event.button !== 0) return;
    releaseGesture();
    suppressClick.current = false;
    const bot = event.currentTarget.getBoundingClientRect();
    gesture.current = {
      pointerId: event.pointerId, x: event.clientX, y: event.clientY,
      offsetX: event.clientX - (bot.left + bot.width / 2), offsetY: event.clientY - bot.bottom,
      dragging: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    holdTimer.current = setTimeout(beginDrag, 240);
  };

  const pointerMove = event => {
    const current = gesture.current;
    if (!current || event.pointerId !== current.pointerId) return;
    if (!current.dragging && Math.hypot(event.clientX - current.x, event.clientY - current.y) > 7) {
      clearTimeout(holdTimer.current);
      beginDrag();
    }
    if (current.dragging) moveTo(event.clientX - current.offsetX, event.clientY - current.offsetY);
  };

  const finishPointer = event => {
    if (!gesture.current || event.pointerId !== gesture.current.pointerId) return;
    const wasDragging = gesture.current.dragging;
    releaseGesture();
    if (wasDragging) setMood('idle');
  };

  const cancelPointer = () => {
    if (!gesture.current) return;
    suppressClick.current = true;
    releaseGesture();
    setMood('idle');
  };

  const keyDown = event => {
    if (disabled) return;
    if (event.key === 'Escape' && gesture.current) {
      event.stopPropagation();
      cancelPointer();
    }
    const delta = { ArrowLeft: [-20, 0], ArrowRight: [20, 0], ArrowUp: [0, -20], ArrowDown: [0, 20] }[event.key];
    if (!delta) return;
    event.preventDefault();
    const bot = event.currentTarget.getBoundingClientRect();
    moveTo(bot.left + bot.width / 2 + delta[0], bot.bottom + delta[1]);
  };

  return (
    <button
      ref={buttonRef} type="button" disabled={disabled}
      className={`explorer-position explorer-${phase} nova-companion mood-${mood} ${inWorld ? 'room-companion' : ''} ${position ? 'has-position' : ''}`}
      style={position ? { left: `${position.x}%`, top: `${position.y}%` } : undefined}
      aria-label="Nova — nhấn để chào, giữ và kéo để di chuyển; dùng phím mũi tên khi có tiêu điểm"
      onClick={reactToTap} onPointerDown={pointerDown} onPointerMove={pointerMove}
      onPointerUp={finishPointer} onPointerCancel={cancelPointer} onLostPointerCapture={cancelPointer}
      onKeyDown={keyDown} onContextMenu={event => event.preventDefault()}
    >
      {!disabled && (!inWorld || mood !== 'idle') && <span className={`explorer-bubble ${position?.x < 20 ? 'bubble-left-edge' : position?.x > 80 ? 'bubble-right-edge' : ''}`} aria-hidden="true">{messages[mood]}</span>}
      <Explorer /><span className="explorer-shadow" aria-hidden="true" /><span className="explorer-name" aria-hidden="true">NOVA</span>
      <span className="sr-only" role="status">{mood !== 'idle' ? messages[mood] : ''}</span>
    </button>
  );
}
