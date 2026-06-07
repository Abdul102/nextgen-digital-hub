'use client';
import { useEffect, useRef, useState } from 'react';

export default function AnimatedHero() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const frameRef  = useRef(0);
  const blinkRef  = useRef(0);
  const blinkOpen = useRef(true);
  const mouthRef  = useRef(0);
  const isSpeakingRef = useRef(false);
  const speechRef = useRef(null);

  const [bubble, setBubble] = useState('');
  const [done,   setDone]   = useState(false);

  const lines = [
    'Assalam o Alaikum! 👋',
    "I'm Abdul Rehman",
    'QA Engineer · AI Testing Specialist',
    'Welcome to my Portfolio! 🚀',
  ];
  const lineIdx = useRef(0);
  const charIdx = useRef(0);
  const timer   = useRef(null);

  /* ═══════════════════════════ CANVAS ══════════════════════════════ */
  useEffect(() => {
    const cv  = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;

    /* ── particles ── */
    const PARTS = Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1 + Math.random() * 2.5,
      vx: (Math.random() - .5) * .4,
      vy: -.3 - Math.random() * .5,
      life: Math.random(),
      col: ['#4f46e5','#06b6d4','#8b5cf6','#22c55e','#f59e0b'][i % 5],
    }));

    /* ── floating code cards ── */
    const CARDS = [
      { label: 'PASS', sub: '142 tests', col: '#22c55e', angle: 0 },
      { label: 'AI ✓', sub: 'Self-healed', col: '#06b6d4', angle: Math.PI * .66 },
      { label: 'QA', sub: '98% coverage', col: '#8b5cf6', angle: Math.PI * 1.33 },
    ];

    /* ── hex grid background ── */
    function drawHexGrid() {
      ctx.save();
      ctx.strokeStyle = 'rgba(79,70,229,0.07)';
      ctx.lineWidth = .8;
      const s = 28;
      for (let row = 0; row < H / s + 2; row++) {
        for (let col = 0; col < W / s + 2; col++) {
          const ox = col * s * 1.5 - 10;
          const oy = row * s * 1.732 + (col % 2 ? s * .866 : 0) - 10;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            i === 0 ? ctx.moveTo(ox + s * Math.cos(a), oy + s * Math.sin(a))
                    : ctx.lineTo(ox + s * Math.cos(a), oy + s * Math.sin(a));
          }
          ctx.closePath(); ctx.stroke();
        }
      }
      ctx.restore();
    }

    /* ── particles update + draw ── */
    function drawParticles() {
      PARTS.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life += .005;
        if (p.y < -10) { p.y = H + 5; p.x = Math.random() * W; p.life = 0; }
        const alpha = Math.sin(p.life * Math.PI) * .7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    /* ── orbit cards ── */
    function drawOrbitCards(frame) {
      const cx = W / 2, cy = H / 2 - 10;
      CARDS.forEach((c, i) => {
        const ang  = c.angle + frame * .018;
        const orX  = 112, orY = 46;
        const x = cx + Math.cos(ang) * orX;
        const y = cy + Math.sin(ang) * orY - 10;
        const pulse = .82 + Math.sin(frame * .05 + i * 1.2) * .18;
        ctx.save();
        ctx.translate(x, y);
        ctx.globalAlpha = pulse;
        // card shadow glow
        ctx.shadowColor = c.col; ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.roundRect(-32, -18, 64, 36, 9);
        ctx.fillStyle = 'rgba(15,23,42,0.88)';
        ctx.fill();
        ctx.strokeStyle = c.col; ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.shadowBlur = 0;
        // text
        ctx.font = 'bold 11px "Space Grotesk",sans-serif';
        ctx.fillStyle = c.col; ctx.textAlign = 'center';
        ctx.fillText(c.label, 0, -4);
        ctx.font = '8px Inter,sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.fillText(c.sub, 0, 8);
        ctx.restore();
      });
    }

    /* ── neon ring ── */
    function drawRing(frame) {
      const cx = W/2, cy = H/2 - 10;
      ctx.save();
      // outer dashed ring
      ctx.setLineDash([6, 10]);
      ctx.lineDashOffset = -frame * .8;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 96, 38, 0, 0, Math.PI * 2);
      const rg = ctx.createLinearGradient(cx-96, cy, cx+96, cy);
      rg.addColorStop(0, 'rgba(79,70,229,.5)');
      rg.addColorStop(.5,'rgba(6,182,212,.8)');
      rg.addColorStop(1, 'rgba(139,92,246,.5)');
      ctx.strokeStyle = rg; ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    /* ══════════════ CHARACTER ══════════════ */
    function drawCharacter(frame, blink, mouthOpen) {
      const cx = W / 2;
      const cy = H / 2 + 50;
      const floatY = Math.sin(frame * .035) * 6;

      ctx.save();
      ctx.translate(0, floatY);

      /* ground glow */
      const sg = ctx.createRadialGradient(cx, cy+115, 4, cx, cy+115, 60);
      sg.addColorStop(0,'rgba(79,70,229,.25)'); sg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.ellipse(cx, cy+115, 60, 14, 0, 0, Math.PI*2); ctx.fill();

      /* ── LEGS ── */
      const legG = ctx.createLinearGradient(cx-28, cy+72, cx+28, cy+72);
      legG.addColorStop(0,'#0d1b2a'); legG.addColorStop(.5,'#1a2e45'); legG.addColorStop(1,'#0d1b2a');
      ctx.fillStyle = legG;
      ctx.beginPath(); ctx.roundRect(cx-28, cy+70, 22, 52, [0,0,8,8]); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx+6,  cy+70, 22, 52, [0,0,8,8]); ctx.fill();

      /* leg crease */
      ctx.strokeStyle='rgba(6,182,212,.18)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(cx-17,cy+72); ctx.lineTo(cx-17,cy+118); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx+17,cy+72); ctx.lineTo(cx+17,cy+118); ctx.stroke();

      /* shoes */
      function shoe(sx,sy) {
        const sh = ctx.createLinearGradient(sx-22,sy,sx+22,sy+14);
        sh.addColorStop(0,'#1e3a5f'); sh.addColorStop(1,'#0d1b2a');
        ctx.beginPath(); ctx.ellipse(sx+5, sy+12, 24, 11, -.08, 0, Math.PI*2);
        ctx.fillStyle=sh; ctx.fill();
        ctx.beginPath(); ctx.ellipse(sx, sy+8, 14, 5, -.08, 0, Math.PI*2);
        ctx.fillStyle='rgba(6,182,212,.15)'; ctx.fill();
      }
      shoe(cx-17, cy+114); shoe(cx+17, cy+114);

      /* ── TORSO — techy jacket ── */
      const tg = ctx.createLinearGradient(cx-40, cy-8, cx+40, cy+72);
      tg.addColorStop(0,'#0d2137'); tg.addColorStop(.5,'#122840'); tg.addColorStop(1,'#0a1a2c');
      ctx.shadowColor='rgba(6,182,212,.2)'; ctx.shadowBlur=18;
      ctx.beginPath(); ctx.roundRect(cx-40, cy-10, 80, 82, [6,6,12,12]);
      ctx.fillStyle=tg; ctx.fill(); ctx.shadowBlur=0;

      /* jacket edge glow */
      ctx.beginPath(); ctx.roundRect(cx-40, cy-10, 80, 82, [6,6,12,12]);
      const jg = ctx.createLinearGradient(cx-40,cy,cx+40,cy);
      jg.addColorStop(0,'rgba(79,70,229,.4)'); jg.addColorStop(1,'rgba(6,182,212,.3)');
      ctx.strokeStyle=jg; ctx.lineWidth=1.2; ctx.stroke();

      /* centre seam */
      ctx.beginPath(); ctx.moveTo(cx, cy-10); ctx.lineTo(cx, cy+72);
      ctx.strokeStyle='rgba(255,255,255,.07)'; ctx.lineWidth=1; ctx.stroke();

      /* lapels */
      ctx.beginPath();
      ctx.moveTo(cx-16,cy-10); ctx.lineTo(cx-6,cy+18); ctx.lineTo(cx,cy+8); ctx.lineTo(cx+6,cy+18); ctx.lineTo(cx+16,cy-10);
      ctx.fillStyle='rgba(6,182,212,.08)'; ctx.fill();

      /* shirt */
      ctx.beginPath(); ctx.moveTo(cx-5,cy-10); ctx.lineTo(cx,cy+6); ctx.lineTo(cx+5,cy-10);
      ctx.fillStyle='#e2e8f0'; ctx.fill();

      /* chest badge */
      ctx.save();
      ctx.shadowColor='#06b6d4'; ctx.shadowBlur=8;
      ctx.beginPath(); ctx.roundRect(cx-34,cy+16,28,18,5);
      ctx.fillStyle='rgba(6,182,212,.15)'; ctx.fill();
      ctx.strokeStyle='rgba(6,182,212,.6)'; ctx.lineWidth=1; ctx.stroke();
      ctx.shadowBlur=0;
      ctx.font='bold 8px monospace'; ctx.fillStyle='#06b6d4'; ctx.textAlign='center';
      ctx.fillText('QA',cx-20,cy+26);
      ctx.font='6px monospace'; ctx.fillStyle='#22c55e';
      ctx.fillText('●LIVE',cx-20,cy+31);
      ctx.restore();

      /* ── ARMS ── */
      function arm(side) {
        const sx = side === -1 ? cx - 40 : cx + 40;
        const sway = side * Math.sin(frame * .04 + (side === 1 ? .8 : 0)) * 3;
        ctx.save();
        ctx.translate(sx, cy + 12 + sway);
        const ag = ctx.createLinearGradient(side*-18, 0, side*4, 0);
        ag.addColorStop(0,'#0a1a2c'); ag.addColorStop(1,'#142030');
        ctx.beginPath();
        if (side === -1) ctx.roundRect(-20, 0, 20, 52, [4,4,8,8]);
        else             ctx.roundRect(0,  0, 20, 52, [4,4,8,8]);
        ctx.fillStyle=ag; ctx.fill();
        // cuff stripe
        ctx.beginPath();
        if (side === -1) ctx.roundRect(-20, 44, 20, 8, [0,0,8,8]);
        else             ctx.roundRect(0,   44, 20, 8, [0,0,8,8]);
        ctx.fillStyle='rgba(6,182,212,.4)'; ctx.fill();
        // hand
        const hg = ctx.createRadialGradient(side*10-side*2, 66, 0, side*10-side*2, 66, 12);
        hg.addColorStop(0,'#c8956c'); hg.addColorStop(.6,'#a87048'); hg.addColorStop(1,'#7a4e2a');
        ctx.beginPath(); ctx.arc(side === -1 ? -10 : 10, 66, 11, 0, Math.PI*2);
        ctx.fillStyle=hg; ctx.fill();
        ctx.restore();
      }
      arm(-1); arm(1);

      /* ── NECK ── */
      const nk = ctx.createLinearGradient(cx-11, cy-26, cx+11, cy-26);
      nk.addColorStop(0,'#9a6a48'); nk.addColorStop(.5,'#c8956c'); nk.addColorStop(1,'#9a6a48');
      ctx.beginPath(); ctx.roundRect(cx-11, cy-28, 22, 20, 4);
      ctx.fillStyle=nk; ctx.fill();

      /* ══════ HEAD ══════ */
      const hcx = cx, hcy = cy - 72;

      /* outer glow halo */
      const halo = ctx.createRadialGradient(hcx, hcy, 44, hcx, hcy, 72);
      halo.addColorStop(0,'rgba(79,70,229,.0)');
      halo.addColorStop(.5,'rgba(6,182,212,.06)');
      halo.addColorStop(1,'rgba(79,70,229,.0)');
      ctx.beginPath(); ctx.arc(hcx, hcy, 72, 0, Math.PI*2);
      ctx.fillStyle=halo; ctx.fill();

      /* head sphere */
      const hg2 = ctx.createRadialGradient(hcx-12, hcy-14, 3, hcx+2, hcy+4, 56);
      hg2.addColorStop(0,'#d9aa7a');
      hg2.addColorStop(.3,'#c8906a');
      hg2.addColorStop(.65,'#a87048');
      hg2.addColorStop(1,'#7a4e2a');
      ctx.shadowColor='rgba(0,0,0,.4)'; ctx.shadowBlur=22; ctx.shadowOffsetX=4; ctx.shadowOffsetY=8;
      ctx.beginPath(); ctx.arc(hcx, hcy, 54, 0, Math.PI*2);
      ctx.fillStyle=hg2; ctx.fill();
      ctx.shadowBlur=0; ctx.shadowOffsetX=0; ctx.shadowOffsetY=0;

      /* rim light — cyan right */
      const rim = ctx.createRadialGradient(hcx+50, hcy, 2, hcx+38, hcy, 24);
      rim.addColorStop(0,'rgba(6,182,212,.35)');
      rim.addColorStop(1,'rgba(6,182,212,0)');
      ctx.beginPath(); ctx.arc(hcx, hcy, 54, 0, Math.PI*2);
      ctx.fillStyle=rim; ctx.fill();

      /* rim light — purple left */
      const rim2 = ctx.createRadialGradient(hcx-50, hcy, 2, hcx-38, hcy, 24);
      rim2.addColorStop(0,'rgba(139,92,246,.25)');
      rim2.addColorStop(1,'rgba(139,92,246,0)');
      ctx.beginPath(); ctx.arc(hcx, hcy, 54, 0, Math.PI*2);
      ctx.fillStyle=rim2; ctx.fill();

      /* ── HAIR ── */
      ctx.beginPath();
      ctx.arc(hcx, hcy - 8, 54, -Math.PI * .98, .06);
      ctx.lineTo(hcx + 54, hcy - 8); ctx.closePath();
      ctx.fillStyle='#131320'; ctx.fill();

      ctx.beginPath();
      ctx.arc(hcx, hcy - 12, 52, -Math.PI * .92, -.1);
      ctx.quadraticCurveTo(hcx+58, hcy-18, hcx+54, hcy+2);
      ctx.quadraticCurveTo(hcx-54, hcy+2, hcx-58, hcy-18);
      ctx.closePath();
      ctx.fillStyle='#1a1a30'; ctx.fill();

      /* hair shimmer */
      ctx.beginPath();
      ctx.moveTo(hcx-14, hcy-62); ctx.quadraticCurveTo(hcx-2, hcy-68, hcx+12, hcy-60);
      ctx.strokeStyle='rgba(139,92,246,.5)'; ctx.lineWidth=2.5; ctx.lineCap='round'; ctx.stroke();

      /* ── EARS ── */
      function ear(ex, ey, flip) {
        const eg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 11);
        eg.addColorStop(0,'#c8906a'); eg.addColorStop(1,'#9a6a48');
        ctx.beginPath(); ctx.ellipse(ex, ey, 9, 13, flip*.18, 0, Math.PI*2);
        ctx.fillStyle=eg; ctx.fill();
        ctx.beginPath(); ctx.ellipse(ex+flip, ey, 5, 8, flip*.18, 0, Math.PI*2);
        ctx.fillStyle='rgba(140,85,50,.5)'; ctx.fill();
      }
      ear(hcx-53, hcy+4, -1); ear(hcx+53, hcy+4, 1);

      /* ── EYEBROWS ── */
      ctx.lineWidth=3.8; ctx.lineCap='round'; ctx.strokeStyle='#1e0e06';
      ctx.beginPath(); ctx.moveTo(hcx-26,hcy-20); ctx.quadraticCurveTo(hcx-15,hcy-26,hcx-5,hcy-20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hcx+5, hcy-20); ctx.quadraticCurveTo(hcx+15, hcy-26,hcx+26,hcy-20); ctx.stroke();

      /* ── EYES ── */
      function eye(ex, ey, closed) {
        if (closed) {
          ctx.beginPath(); ctx.arc(ex, ey, 13, Math.PI+.25, -.25);
          ctx.strokeStyle='#3d1a08'; ctx.lineWidth=2.8; ctx.stroke();
          for (let k=0;k<5;k++) {
            ctx.beginPath(); ctx.moveTo(ex-9+k*4.5, ey-1); ctx.lineTo(ex-10+k*4.5, ey-5);
            ctx.strokeStyle='#120604'; ctx.lineWidth=1.6; ctx.stroke();
          }
        } else {
          /* white */
          ctx.beginPath(); ctx.ellipse(ex, ey, 14, 11, 0, 0, Math.PI*2);
          ctx.fillStyle='#f9f4ef'; ctx.fill();
          ctx.strokeStyle='rgba(200,144,106,.4)'; ctx.lineWidth=.8; ctx.stroke();
          /* iris */
          const ig = ctx.createRadialGradient(ex-.5, ey-.5, 0, ex, ey, 7.5);
          ig.addColorStop(0,'#7a4010'); ig.addColorStop(.5,'#4a2408'); ig.addColorStop(1,'#200e02');
          ctx.beginPath(); ctx.arc(ex, ey, 7.5, 0, Math.PI*2); ctx.fillStyle=ig; ctx.fill();
          /* pupil */
          ctx.beginPath(); ctx.arc(ex, ey, 4, 0, Math.PI*2); ctx.fillStyle='#0a0402'; ctx.fill();
          /* catchlights */
          ctx.beginPath(); ctx.arc(ex+2.5,ey-2.5,2.2,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,.95)'; ctx.fill();
          ctx.beginPath(); ctx.arc(ex-2,ey+1.5,1,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,.5)'; ctx.fill();
          /* lashes */
          for (let k=0;k<6;k++) {
            const a = Math.PI*1.08 + k*(Math.PI*.82/5);
            ctx.beginPath();
            ctx.moveTo(ex+Math.cos(a)*10, ey+Math.sin(a)*8);
            ctx.lineTo(ex+Math.cos(a)*15, ey+Math.sin(a)*12.5);
            ctx.strokeStyle='#0e0604'; ctx.lineWidth=1.8; ctx.stroke();
          }
        }
      }
      eye(hcx-17, hcy-6, blink); eye(hcx+17, hcy-6, blink);

      /* ── NOSE ── */
      ctx.beginPath(); ctx.moveTo(hcx-3,hcy-5); ctx.quadraticCurveTo(hcx-5,hcy+9,hcx-7,hcy+16);
      ctx.strokeStyle='rgba(130,82,42,.5)'; ctx.lineWidth=2; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hcx+3,hcy-5); ctx.quadraticCurveTo(hcx+5,hcy+9,hcx+7,hcy+16);
      ctx.stroke();
      ctx.beginPath(); ctx.ellipse(hcx-8,hcy+17,6,4,-.25,0,Math.PI*2);
      ctx.fillStyle='rgba(100,55,18,.4)'; ctx.fill();
      ctx.beginPath(); ctx.ellipse(hcx+8,hcy+17,6,4,.25,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(hcx,hcy+13,4.5,0,Math.PI*2);
      ctx.fillStyle='rgba(215,160,110,.3)'; ctx.fill();

      /* ── MOUTH ── */
      const mo = mouthOpen * 5.5;
      ctx.beginPath(); ctx.moveTo(hcx-16,hcy+28); ctx.quadraticCurveTo(hcx-7,hcy+23,hcx,hcy+25); ctx.quadraticCurveTo(hcx+7,hcy+23,hcx+16,hcy+28);
      ctx.strokeStyle='#7a3818'; ctx.lineWidth=2.6; ctx.lineCap='round'; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hcx-16,hcy+28); ctx.quadraticCurveTo(hcx,hcy+34+mo,hcx+16,hcy+28);
      ctx.stroke();
      if (mouthOpen > .3) {
        ctx.beginPath();
        ctx.moveTo(hcx-12,hcy+28.5); ctx.quadraticCurveTo(hcx,hcy+31+mo*.4,hcx+12,hcy+28.5);
        ctx.lineTo(hcx+12,hcy+29.5); ctx.quadraticCurveTo(hcx,hcy+32.5+mo*.4,hcx-12,hcy+29.5);
        ctx.fillStyle='#f5ece3'; ctx.fill();
      }
      /* cheeks */
      const ck = ctx.createRadialGradient(hcx-30,hcy+14,0,hcx-30,hcy+14,16);
      ck.addColorStop(0,'rgba(220,90,70,.22)'); ck.addColorStop(1,'rgba(220,90,70,0)');
      ctx.beginPath(); ctx.arc(hcx-30,hcy+14,16,0,Math.PI*2); ctx.fillStyle=ck; ctx.fill();
      const ck2 = ctx.createRadialGradient(hcx+30,hcy+14,0,hcx+30,hcy+14,16);
      ck2.addColorStop(0,'rgba(220,90,70,.22)'); ck2.addColorStop(1,'rgba(220,90,70,0)');
      ctx.beginPath(); ctx.arc(hcx+30,hcy+14,16,0,Math.PI*2); ctx.fillStyle=ck2; ctx.fill();

      /* ── holographic visor accent ── */
      ctx.save();
      ctx.globalAlpha = .18 + Math.sin(frame*.06)*.06;
      const vg = ctx.createLinearGradient(hcx-52, hcy-14, hcx+52, hcy-14);
      vg.addColorStop(0,'rgba(6,182,212,0)');
      vg.addColorStop(.4,'rgba(6,182,212,.7)');
      vg.addColorStop(.6,'rgba(79,70,229,.7)');
      vg.addColorStop(1,'rgba(79,70,229,0)');
      ctx.fillStyle = vg;
      ctx.beginPath(); ctx.roundRect(hcx-50, hcy-22, 100, 18, 4);
      ctx.fill();
      ctx.restore();

      ctx.restore(); // floatY
    }

    /* ── main loop ── */
    function loop() {
      ctx.clearRect(0, 0, W, H);

      /* bg radial glow */
      const bg = ctx.createRadialGradient(W/2, H/2, 10, W/2, H/2, W*.65);
      bg.addColorStop(0,'rgba(79,70,229,.07)');
      bg.addColorStop(.5,'rgba(6,182,212,.04)');
      bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      drawHexGrid();
      drawParticles();
      drawRing(frameRef.current);
      drawOrbitCards(frameRef.current);
      drawCharacter(frameRef.current, !blinkOpen.current, mouthRef.current);

      blinkRef.current++;
      if (blinkRef.current > 190) blinkOpen.current = false;
      if (blinkRef.current > 204) { blinkOpen.current = true; blinkRef.current = 0; }

      frameRef.current++;
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  /* ═══════════════════════ TYPEWRITER ═════════════════════════════ */
  useEffect(() => {
    function type() {
      if (lineIdx.current >= lines.length) { setDone(true); startSpeech(); return; }
      const ln = lines[lineIdx.current];
      if (charIdx.current < ln.length) {
        const built = lines.slice(0, lineIdx.current).join(' ')
          + (lineIdx.current > 0 ? ' ' : '')
          + ln.slice(0, charIdx.current + 1);
        setBubble(built);
        charIdx.current++;
        timer.current = setTimeout(type, 46);
      } else {
        lineIdx.current++; charIdx.current = 0;
        timer.current = setTimeout(type, 520);
      }
    }
    timer.current = setTimeout(type, 900);
    return () => {
      clearTimeout(timer.current);
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
    };
  }, []);

  /* ═══════════════════════ SPEECH ═════════════════════════════════ */
  function getBestVoice(voices) {
    /* Priority: South-Asian / Pakistani-flavoured English voices */
    const order = [
      v => v.lang === 'en-IN',                         // Indian English (closest to Pakistani)
      v => v.lang === 'en-PK',                         // Pakistani English (rare but exists)
      v => v.name.toLowerCase().includes('rishi'),     // Google Rishi (en-IN, very natural)
      v => v.name.toLowerCase().includes('veena'),     // macOS Veena (en-IN)
      v => v.name.toLowerCase().includes('neel'),
      v => v.name.toLowerCase().includes('google') && v.lang.startsWith('en-IN'),
      v => v.name.toLowerCase().includes('google uk english male'),
      v => v.name === 'Daniel',                        // macOS UK Male
      v => v.lang.startsWith('en-GB'),
      v => v.lang.startsWith('en'),
    ];
    for (const fn of order) {
      const found = voices.find(fn);
      if (found) return found;
    }
    return voices[0];
  }

  function startSpeech() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    synth.cancel();

    const text = `Assalam o Alaikum! I am Abdul Rehman — a Software Quality Engineer from Pakistan. I specialise in AI testing, automation frameworks, and CI CD pipelines. Welcome to my portfolio!`;

    function go(voices) {
      const utter = new SpeechSynthesisUtterance(text);
      const v = getBestVoice(voices);
      if (v) utter.voice = v;
      utter.rate   = 0.94;   // natural pace — not too slow
      utter.pitch  = 0.9;    // slightly deeper — warm, natural
      utter.volume = 1;
      utter.onstart = () => { isSpeakingRef.current = true; animMouth(); };
      utter.onend   = () => { isSpeakingRef.current = false; mouthRef.current = 0; };
      speechRef.current = utter;
      synth.speak(utter);
    }

    const voices = synth.getVoices();
    if (voices.length > 0) go(voices);
    else synth.addEventListener('voiceschanged', () => go(synth.getVoices()), { once: true });
  }

  function animMouth() {
    if (!isSpeakingRef.current) { mouthRef.current = 0; return; }
    mouthRef.current = .25 + Math.random() * .75;
    setTimeout(animMouth, 70 + Math.random() * 110);
  }

  /* ═══════════════════════ RENDER ═════════════════════════════════ */
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', position:'relative' }}>
      <canvas
        ref={canvasRef}
        width={320} height={400}
        style={{ filter:'drop-shadow(0 16px 48px rgba(79,70,229,.35)) drop-shadow(0 4px 16px rgba(0,0,0,.3))' }}
      />

      {bubble && (
        <div style={{
          position:'relative', marginTop:4,
          background:'var(--bg-card,white)',
          border:'1.5px solid rgba(79,70,229,.35)',
          borderRadius:18, padding:'11px 20px',
          maxWidth:300, fontSize:'.9rem', fontWeight:500,
          lineHeight:1.55, color:'var(--text-primary,#1e293b)',
          textAlign:'center',
          boxShadow:'0 4px 28px rgba(79,70,229,.14)',
        }}>
          <span style={{
            position:'absolute', top:-13, left:'50%', transform:'translateX(-50%)',
            borderLeft:'7px solid transparent', borderRight:'7px solid transparent',
            borderBottom:'13px solid rgba(79,70,229,.35)', display:'block',
          }}/>
          <span style={{
            position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
            borderLeft:'6px solid transparent', borderRight:'6px solid transparent',
            borderBottom:'12px solid var(--bg-card,white)', display:'block',
          }}/>
          {bubble}
          {!done && <span style={{ display:'inline-block', marginLeft:2, color:'#4f46e5', fontWeight:700, animation:'bcur .65s infinite' }}>|</span>}
        </div>
      )}

      <style>{`
        @keyframes bcur { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
