//home
import { useState, useEffect, useRef } from "react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 2,
  speed: Math.random() * 2 + 0.5,
  color: ["#FF4D6D", "#FFD700", "#00F5FF", "#9B5DE5", "#00FF87"][Math.floor(Math.random() * 5)],
  delay: Math.random() * 4,
}));

const FLOATING_ICONS = ["🎮", "🕹️", "👾", "🏆", "⚡", "🎯", "💥", "🌟", "🎲", "🔥"];

const STATS = [
  { value: "500+", label: "Mini Games" },
  { value: "2M+", label: "Players" },
  { value: "∞", label: "Fun" },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [score, setScore] = useState(0);
  const [scanline, setScanline] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef(
    PARTICLES.map((p) => ({ ...p, currentY: p.y, currentX: p.x }))
  );

  useEffect(() => {
    setMounted(true);
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);

    const scoreInterval = setInterval(() => {
      setScore((s) => (s + Math.floor(Math.random() * 50 + 10)) % 99999);
    }, 800);

    const scanInterval = setInterval(() => {
      setScanline((s) => (s + 1) % 100);
    }, 30);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(scoreInterval);
      clearInterval(scanInterval);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gridSize = 40;
      const vanishX = canvas.width / 2;
      const vanishY = canvas.height * 0.5;
      const horizon = canvas.height * 0.5;
      const now = Date.now() * 0.0004;

      ctx.strokeStyle = "rgba(0,245,255,0.15)";
      ctx.lineWidth = 0.5;

      for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + (now * 20) % gridSize, canvas.height);
        ctx.lineTo(vanishX + (x - vanishX) * 0.02, vanishY);
        ctx.stroke();
      }

      for (let y = horizon; y < canvas.height; y += gridSize * 0.5) {
        const progress = (y - horizon) / (canvas.height - horizon);
        ctx.globalAlpha = progress * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, y + (now * 20) % (gridSize * 0.5));
        ctx.lineTo(canvas.width, y + (now * 20) % (gridSize * 0.5));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(drawGrid);
    };

    drawGrid();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#020010",
        overflow: "hidden",
        fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
        cursor: "crosshair",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@400;700;900&display=swap');

        @keyframes floatY {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes pixelPulse {
          0%, 100% { box-shadow: 0 0 10px #00F5FF, 0 0 20px #00F5FF, 0 0 40px #00F5FF; }
          50% { box-shadow: 0 0 5px #00F5FF, 0 0 10px #00F5FF; }
        }
        @keyframes scanlineMove {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes glitch1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(30% 0 40% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(10% 0 70% 0); transform: translate(-2px, 4px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -4px); }
        }
        @keyframes glitch2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); color: #9B5DE5; }
          20% { clip-path: inset(60% 0 20% 0); transform: translate(4px, -2px); color: #FF4D6D; }
          60% { clip-path: inset(20% 0 50% 0); transform: translate(-4px, 2px); color: #00F5FF; }
        }
        @keyframes borderFlicker {
          0%, 90%, 100% { opacity: 1; }
          92%, 96% { opacity: 0.3; }
          94%, 98% { opacity: 0.8; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); background: rgba(0,245,255,0.1); }
          50% { transform: scale(1.03); background: rgba(0,245,255,0.2); }
        }
        @keyframes btnShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes particleFloat {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) rotate(720deg); opacity: 0; }
        }
        @keyframes rgbShift {
          0%, 100% { text-shadow: -2px 0 #FF4D6D, 2px 0 #00F5FF; }
          33% { text-shadow: 2px 0 #FF4D6D, -2px 0 #00F5FF; }
          66% { text-shadow: 0 2px #FF4D6D, 0 -2px #00F5FF; }
        }
        @keyframes iconDrop {
          0% { transform: translateY(-30px) scale(0); opacity: 0; }
          60% { transform: translateY(5px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes healthPulse {
          0%, 100% { width: 75%; }
          50% { width: 82%; }
        }
        .play-btn {
          position: relative;
          padding: 16px 48px;
          background: linear-gradient(90deg, #FF4D6D, #9B5DE5, #00F5FF, #FF4D6D);
          background-size: 300% auto;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          animation: btnShimmer 3s linear infinite;
          transition: transform 0.1s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .play-btn:hover { transform: scale(1.05) translateY(-2px); }
        .play-btn:active { transform: scale(0.97); }
        .browse-btn {
          padding: 14px 40px;
          background: transparent;
          border: 1px solid rgba(0,245,255,0.5);
          border-radius: 4px;
          color: #00F5FF;
          font-family: 'Orbitron', sans-serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          animation: pixelPulse 2s ease-in-out infinite;
          clip-path: polygon(0% 0%, calc(100% - 8px) 0%, 100% 8px, 100% 100%, 8px 100%, 0% calc(100% - 8px));
        }
        .browse-btn:hover { background: rgba(0,245,255,0.1); transform: translateY(-2px); }
        .stat-card {
          background: rgba(0,245,255,0.03);
          border: 0.5px solid rgba(0,245,255,0.2);
          padding: 16px 24px;
          text-align: center;
          clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
          transition: all 0.2s;
        }
        .stat-card:hover {
          background: rgba(0,245,255,0.08);
          border-color: rgba(0,245,255,0.5);
          transform: translateY(-3px);
        }
      `}</style>

      {/* Retro grid canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      />

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "3px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)",
          top: `${scanline}%`,
          zIndex: 2,
          pointerEvents: "none",
          transition: "top 0.03s linear",
        }}
      />

      {/* Floating game icons */}
      {FLOATING_ICONS.map((icon, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${16 + (i % 3) * 8}px`,
            left: `${(i * 10 + 3) % 95}%`,
            top: `${(i * 13 + 5) % 80}%`,
            animation: `particleFloat ${6 + (i % 4)}s ease-in-out ${i * 0.7}s infinite`,
            opacity: 0.25,
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
      ))}

      {/* Corner decorations */}
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((corner) => (
        <div
          key={corner}
          style={{
            position: "absolute",
            ...(corner.includes("top") ? { top: 20 } : { bottom: 20 }),
            ...(corner.includes("Left") ? { left: 20 } : { right: 20 }),
            width: 40,
            height: 40,
            borderTop: corner.includes("top") ? "2px solid #00F5FF" : "none",
            borderBottom: corner.includes("bottom") ? "2px solid #00F5FF" : "none",
            borderLeft: corner.includes("Left") ? "2px solid #00F5FF" : "none",
            borderRight: corner.includes("Right") ? "2px solid #00F5FF" : "none",
            animation: "borderFlicker 3s ease-in-out infinite",
            zIndex: 5,
          }}
        />
      ))}

      {/* HUD Top Bar */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 32,
          alignItems: "center",
          zIndex: 10,
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 11,
          letterSpacing: 2,
        }}
      >
        <div style={{ color: "#FFD700" }}>
          SCORE:{" "}
          <span style={{ color: "#fff" }}>{String(score).padStart(6, "0")}</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 8 }}>◆ ◆ ◆</div>
        <div style={{ color: "#00FF87" }}>
          LEVEL:{" "}
          <span style={{ color: "#fff" }}>01</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 8 }}>◆ ◆ ◆</div>
        <div style={{ color: "#FF4D6D" }}>
          HP:{" "}
          <span
            style={{
              display: "inline-block",
              width: 60,
              height: 8,
              background: "rgba(255,77,109,0.2)",
              borderRadius: 2,
              verticalAlign: "middle",
              overflow: "hidden",
              marginLeft: 4,
            }}
          >
            <span
              style={{
                display: "block",
                height: "100%",
                background: "#FF4D6D",
                animation: "healthPulse 2s ease-in-out infinite",
              }}
            />
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          margin: "0 auto",
          padding: "120px 24px 80px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 20px",
            border: "0.5px solid rgba(0,245,255,0.4)",
            borderRadius: 2,
            marginBottom: 40,
            animation: "badgePulse 2s ease-in-out infinite",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 11,
            letterSpacing: 2,
            color: "#00F5FF",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00FF87",
              boxShadow: "0 0 8px #00FF87",
              animation: "pixelPulse 1s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          NEW GAMES LIVE — BEAT YOUR HIGH SCORE
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00FF87",
              boxShadow: "0 0 8px #00FF87",
              animation: "pixelPulse 1s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
        </div>

        {/* Main heading */}
        <div style={{ position: "relative", marginBottom: 12 }}>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(36px, 8vw, 80px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: 4,
              textTransform: "uppercase",
              animation: glitchActive ? "glitch1 0.15s steps(2) forwards" : "none",
              position: "relative",
              zIndex: 2,
            }}
          >
            WELCOME TO
          </h1>
          {glitchActive && (
            <>
              <h1
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "clamp(36px, 8vw, 80px)",
                  fontWeight: 900,
                  color: "#FF4D6D",
                  lineHeight: 1.1,
                  margin: 0,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  animation: "glitch2 0.15s steps(2) forwards",
                  zIndex: 1,
                  opacity: 0.7,
                }}
              >
                WELCOME TO
              </h1>
            </>
          )}
        </div>

        <div style={{ position: "relative", marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(52px, 12vw, 110px)",
              fontWeight: 900,
              background: "linear-gradient(90deg, #FF4D6D 0%, #FFD700 30%, #00F5FF 60%, #9B5DE5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              margin: 0,
              letterSpacing: 8,
              textTransform: "uppercase",
              animation: "rgbShift 4s ease-in-out infinite",
            }}
          >
            FUNBYTE
          </h1>
          {/* Glow behind */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(155,93,229,0.2) 0%, transparent 70%)",
              zIndex: -1,
              pointerEvents: "none",
            }}
          />
        </div>

        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: "rgba(200,230,255,0.7)",
            marginBottom: 48,
            maxWidth: 560,
            margin: "0 auto 48px",
            lineHeight: 1.7,
            letterSpacing: 1,
          }}
        >
          INSTANT FUN. NO DOWNLOADS. NO WAITING.
          <br />
          <span style={{ color: "rgba(200,230,255,0.45)", fontSize: "0.9em" }}>
            Jump into a world of exciting mini-games — pure entertainment at your fingertips.
          </span>
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 20,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 64,
          }}
        >
          <button className="play-btn">
            ▶ &nbsp; LET'S PLAY
          </button>
          <button className="browse-btn">
            🕹 &nbsp; BROWSE GAMES
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="stat-card" style={{ animation: `iconDrop 0.6s ease ${0.2 + i * 0.15}s both` }}>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: ["#FFD700", "#00F5FF", "#9B5DE5"][i],
                  textShadow: `0 0 20px ${["#FFD700", "#00F5FF", "#9B5DE5"][i]}`,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: 12,
                  letterSpacing: 3,
                  color: "rgba(200,230,255,0.5)",
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 40,
          }}
        >
          {["LET'S", "PLAY", "LIMITLESS", "GAMES"].map((word, i) => (
            <span
              key={i}
              style={{
                padding: "6px 16px",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 10,
                letterSpacing: 3,
                color: "rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.03)",
                transition: "all 0.2s",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom glow strip */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #FF4D6D, #FFD700, #00F5FF, #9B5DE5, #FF4D6D)",
          backgroundSize: "200% auto",
          animation: "btnShimmer 3s linear infinite",
          zIndex: 10,
        }}
      />
    </div>
  );
}

//navbar
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { name: "Home",         path: "/",           icon: "⌂" },
  { name: "Number Count", path: "/numbercount", icon: "🔢" },
  { name: "Tic Tac",      path: "/tictac",      icon: "✖" },
  { name: "RPS Game",     path: "/rps",          icon: "✊" },
  { name: "Quiz Game",    path: "/quiz",         icon: "❓" },
  { name: "Guess Number", path: "/guessnum",     icon: "🎲" },
  { name: "Snake Game",   path: "/snakegame",    icon: "🐍" },
  { name: "Typing Speed", path: "/typingspeed",  icon: "⌨" },
  { name: "Hangman",      path: "/hangman",      icon: "🪝" },
];

export default function NavHorizontal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [tick, setTick]             = useState(0);
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* blinking clock tick */
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 500);
    return () => clearInterval(id);
  }, []);

  /* canvas scanline + star field */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const stars = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.4 + 0.1,
      color: ["#00ffcc","#ff00ff","#ffff00","#00aaff"][Math.floor(Math.random()*4)],
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // stars
      stars.forEach((s) => {
        s.x -= s.speed;
        if (s.x < 0) { s.x = W; s.y = Math.random() * H; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur  = 6;
        ctx.fill();
      });
      // scanline
      const sy = (frame * 1.2) % H;
      const grad = ctx.createLinearGradient(0, sy, 0, sy + 2);
      grad.addColorStop(0, "rgba(0,255,204,0)");
      grad.addColorStop(0.5, "rgba(0,255,204,0.18)");
      grad.addColorStop(1, "rgba(0,255,204,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, sy, W, 2);
      frame++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animRef.current); ro.disconnect(); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@400;700;900&display=swap');

        /* ── BASE ─────────────────────────────── */
        .gnav-wrap {
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 3px 0;
          font-family: 'Orbitron', monospace;
        }

        .gnav-bar {
          position: relative;
          max-width: 1350px;
          margin: 0 auto 0;
          background: rgba(3,7,18,0.92);
          border: 1px solid #00ffcc33;
          border-radius: 6px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          transition: box-shadow 0.3s;
        }

        .gnav-bar.scrolled {
          box-shadow: 0 4px 40px rgba(0,255,204,0.18), 0 0 0 1px #00ffcc44;
        }

        /* canvas bg */
        .gnav-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        /* grid overlay */
        .gnav-bar::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,204,0.015) 3px, rgba(0,255,204,0.015) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,255,204,0.015) 3px, rgba(0,255,204,0.015) 4px);
          pointer-events: none;
          z-index: 0;
        }

        /* corner brackets */
        .gnav-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          background:
            linear-gradient(#00ffcc, #00ffcc) top left / 10px 2px no-repeat,
            linear-gradient(#00ffcc, #00ffcc) top left / 2px 10px no-repeat,
            linear-gradient(#ff00ff, #ff00ff) top right / 10px 2px no-repeat,
            linear-gradient(#ff00ff, #ff00ff) top right / 2px 10px no-repeat,
            linear-gradient(#ff00ff, #ff00ff) bottom left / 10px 2px no-repeat,
            linear-gradient(#ff00ff, #ff00ff) bottom left / 2px 10px no-repeat,
            linear-gradient(#00ffcc, #00ffcc) bottom right / 10px 2px no-repeat,
            linear-gradient(#00ffcc, #00ffcc) bottom right / 2px 10px no-repeat;
          pointer-events: none;
          z-index: 5;
        }

        /* ── INNER ROW ─────────────────────────── */
        .gnav-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          padding: 0 18px;
        }

        /* ── LOGO ─────────────────────────────── */
        .gnav-logo {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .gnav-logo-name {
          font-family: 'Press Start 2P', monospace;
          font-size: 13px;
          color: #00ffcc;
          text-shadow: 0 0 10px #00ffcc, 0 0 22px #00ffcc66;
          letter-spacing: 1px;
          animation: logoPulse 3s infinite ease-in-out;
          position: relative;
        }

        /* glitch on logo */
        .gnav-logo-name::before {
          content: 'FunByte';
          position: absolute;
          inset: 0;
          color: #f3d6f3;
          clip-path: polygon(0 0,100% 0,100% 40%,0 40%);
          animation: glitchTop 4s infinite;
        }
        .gnav-logo-name::after {
          content: 'FunByte';
          position: absolute;
          inset: 0;
          color: #00ffcc;
          clip-path: polygon(0 60%,100% 60%,100% 100%,0 100%);
          animation: glitchBot 4s infinite;
        }
        @keyframes glitchTop {
          0%,85%,100% { transform:translate(0); opacity:0; }
          87%          { transform:translate(-3px,1px); opacity:.9; }
          89%          { transform:translate(2px,-1px); opacity:.9; }
          91%          { transform:translate(0); opacity:0; }
        }
        @keyframes glitchBot {
          0%,83%,100% { transform:translate(0); opacity:0; }
          85%          { transform:translate(3px,-1px); opacity:.8; }
          87%          { transform:translate(-2px,1px); opacity:.8; }
          89%          { transform:translate(0); opacity:0; }
        }

        @keyframes logoPulse {
          0%,100% { text-shadow:0 0 10px #00ffcc,0 0 22px #00ffcc66; }
          50%      { text-shadow:0 0 18px #00ffcc,0 0 40px #00ffccaa,0 0 60px #00ffcc33; }
        }

        .gnav-logo-tag {
          font-size: 7px;
          color: #f3d6f3;
          letter-spacing: 2px;
          text-shadow: 0 0 6px #ff00ff;
          margin-top: 2px;
        }

        /* ── DESKTOP LINKS ───────────────────── */
        .gnav-links {
          display: none;
          align-items: center;
          gap: 2px;
          margin-left: 20px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .gnav-links::-webkit-scrollbar { display: none; }

        @media (min-width: 900px) {
          .gnav-links { display: flex; }
        }

        .gnav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          font-size: 8px;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #ffffff55;
          text-decoration: none;
          border-radius: 3px;
          border: 1px solid transparent;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.15s;
        }

        .gnav-link::before {
          content: '';
          position: absolute;
          left: -120%; top: 0;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,204,0.15), transparent);
          transition: left 0.3s;
        }

        .gnav-link:hover::before { left: 120%; }

        .gnav-link:hover {
          color: #00ffcc;
          border-color: #00ffcc44;
          background: rgba(0,255,204,0.06);
          transform: translateY(-1px);
          box-shadow: 0 0 10px rgba(0,255,204,0.15);
        }

        .gnav-link.active-link {
          color: #00ffcc;
          border-color: #00ffcc;
          background: rgba(0,255,204,0.08);
          box-shadow: 0 0 14px rgba(0,255,204,0.25), inset 0 0 6px rgba(0,255,204,0.06);
        }

        .gnav-link.active-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 10%; right: 10%;
          height: 2px;
          background: #00ffcc;
          box-shadow: 0 0 6px #00ffcc;
          border-radius: 2px;
        }

        .link-icon { font-size: 11px; line-height: 1; }

        /* ── RIGHT SIDE ──────────────────────── */
        .gnav-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* HUD clock */
        .gnav-hud {
          display: none;
          align-items: center;
          gap: 5px;
          font-size: 7px;
          color: #ffffff33;
          letter-spacing: 1px;
        }
        @media (min-width: 900px) { .gnav-hud { display: flex; } }

        .hud-dot {
          width: 5px; height: 5px;
          border-radius: 1px;
          background: #00ffcc;
          box-shadow: 0 0 5px #00ffcc;
          animation: hudBlink 1s infinite;
        }
        @keyframes hudBlink { 0%,49% { opacity:1; } 50%,100% { opacity:0; } }

        /* explore button */
        .gnav-explore {
          display: none;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: linear-gradient(135deg, #00ffcc, #00aaff);
          color: #030712;
          font-family: 'Orbitron', monospace;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 0 14px rgba(0,255,204,0.4);
          animation: exploreGlow 2.5s infinite ease-in-out;
        }
        @media (min-width: 900px) { .gnav-explore { display: flex; } }

        .gnav-explore::before {
          content: '';
          position: absolute;
          top: -50%; left: -50%;
          width: 200%; height: 200%;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.3) 45deg, transparent 90deg);
          animation: rotateShine 2s linear infinite;
        }

        @keyframes rotateShine {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .gnav-explore:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 0 24px rgba(0,255,204,0.6), 0 4px 20px rgba(0,255,204,0.3);
        }

        .gnav-explore span { position: relative; z-index: 1; }

        @keyframes exploreGlow {
          0%,100% { box-shadow: 0 0 14px rgba(0,255,204,0.4); }
          50%      { box-shadow: 0 0 28px rgba(0,255,204,0.7), 0 0 50px rgba(0,255,204,0.2); }
        }

        /* ── HAMBURGER ────────────────────────── */
        .gnav-burger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px; height: 36px;
          padding: 6px;
          background: rgba(0,255,204,0.05);
          border: 1px solid #00ffcc33;
          border-radius: 3px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .gnav-burger:hover { background: rgba(0,255,204,0.12); border-color: #00ffcc66; }

        @media (min-width: 900px) { .gnav-burger { display: none; } }

        .burger-line {
          width: 100%; height: 2px;
          background: #00ffcc;
          box-shadow: 0 0 4px #00ffcc;
          border-radius: 1px;
          transition: transform 0.3s, opacity 0.3s;
        }
        .gnav-burger.open .burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .gnav-burger.open .burger-line:nth-child(2) { opacity: 0; }
        .gnav-burger.open .burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ── MOBILE MENU ──────────────────────── */
        .gnav-mobile {
          position: relative;
          z-index: 2;
          border-top: 1px solid #00ffcc22;
          padding: 10px 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: slideDown 0.25s ease;
        }

        @keyframes slideDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .gnav-mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 3px;
          border: 1px solid transparent;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #ffffff55;
          text-decoration: none;
          transition: color 0.2s, background 0.2s, border-color 0.2s, transform 0.15s;
        }

        .gnav-mobile-link:hover {
          color: #00ffcc;
          background: rgba(0,255,204,0.06);
          border-color: #00ffcc33;
          transform: translateX(4px);
        }

        .gnav-mobile-link.active-link {
          color: #00ffcc;
          background: rgba(0,255,204,0.08);
          border-color: #00ffcc55;
          box-shadow: inset 0 0 8px rgba(0,255,204,0.05);
        }

        .mobile-divider {
          height: 1px;
          background: repeating-linear-gradient(to right, #00ffcc22 0, #00ffcc22 6px, transparent 6px, transparent 12px);
          margin: 8px 0;
        }

        .gnav-mobile-explore {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: linear-gradient(135deg, #00ffcc, #00aaff);
          color: #030712;
          font-family: 'Orbitron', monospace;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 3px;
          text-decoration: none;
          box-shadow: 0 0 16px rgba(0,255,204,0.35);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .gnav-mobile-explore:hover {
          transform: scale(1.02);
          box-shadow: 0 0 28px rgba(0,255,204,0.55);
        }
      `}</style>

      <div className="gnav-wrap">
        <div className={`gnav-bar${scrolled ? " scrolled" : ""}`}>
          <canvas ref={canvasRef} className="gnav-canvas" />

          {/* ── MAIN ROW ── */}
          <div className="gnav-inner">
            {/* Logo */}
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <div className="gnav-logo">
                <span className="gnav-logo-name">FunByte</span>
                <span className="gnav-logo-tag">▶ FUN STARTS HERE</span>
              </div>
            </NavLink>

            {/* Desktop links */}
            <nav className="gnav-links">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `gnav-link${isActive ? " active-link" : ""}`
                  }
                >
                  <span className="link-icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Right */}
            <div className="gnav-right">
              {/* HUD indicator */}
              <div className="gnav-hud">
                <div className="hud-dot" style={{ animationDelay: tick % 2 === 0 ? "0s" : "0.5s" }} />
                LIVE
              </div>

              <NavLink to="/explore" className="gnav-explore">
                <span>🎯</span><span>Explore</span>
              </NavLink>

              {/* Burger */}
              <button
                className={`gnav-burger${isMenuOpen ? " open" : ""}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="burger-line" />
                <div className="burger-line" />
                <div className="burger-line" />
              </button>
            </div>
          </div>

          {/* ── MOBILE MENU ── */}
          {isMenuOpen && (
            <div className="gnav-mobile">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `gnav-mobile-link${isActive ? " active-link" : ""}`
                  }
                >
                  <span className="link-icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              ))}
              <div className="mobile-divider" />
              <NavLink
                to="/explore"
                className="gnav-mobile-explore"
                onClick={() => setIsMenuOpen(false)}
              >
                🎯 Explore Games
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

//footer
// import { NavLink } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

const GAME_LINKS = [
  { to: "/", label: "Home", icon: "⌂", key: "home" },
  { to: "/quiz", label: "Quiz Game", icon: "❓", key: "quiz" },
  { to: "/rps", label: "RPS Game", icon: "✊", key: "rps" },
  { to: "/tictac", label: "Tic Tac", icon: "✖", key: "tictac" },
  { to: "/snakegame", label: "Snake Game", icon: "🐍", key: "snake" },
  { to: "/typingspeed", label: "Typing Speed", icon: "⌨", key: "typing" },
  { to: "/hangman", label: "Hangman", icon: "🪝", key: "hangman" },
];

function PixelParticle({ style }) {
  return <div className="pixel-particle" style={style} />;
}

function GlitchText({ children }) {
  return (
    <span className="glitch" data-text={children}>
      {children}
    </span>
  );
}

export default function Footer1() {
  const [particles, setParticles] = useState([]);
  const [scanline, setScanline] = useState(0);
  const footerRef = useRef(null);

  useEffect(() => {
    const pts = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 3}s`,
      duration: `${Math.random() * 2 + 2}s`,
      color: ["#00ffcc", "#ff00ff", "#ffff00", "#00aaff"][Math.floor(Math.random() * 4)],
    }));
    setParticles(pts);
  }, []);

  useEffect(() => {
    let frame;
    let y = 0;
    const h = footerRef.current?.offsetHeight || 300;
    const animate = () => {
      y = (y + 0.8) % h;
      setScanline(y);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@400;700;900&display=swap');

        .gaming-footer {
          position: relative;
          background: #030712;
          border-top: 2px solid #00ffcc;
          overflow: hidden;
          font-family: 'Orbitron', monospace;
          box-shadow: 0 -4px 40px rgba(0,255,204,0.15), 0 -1px 0 #00ffcc33;
        }

        .gaming-footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,255,204,0.015) 2px,
              rgba(0,255,204,0.015) 4px
            ),
            radial-gradient(ellipse at 20% 80%, rgba(255,0,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(0,255,204,0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 50%, rgba(0,100,255,0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, rgba(0,255,204,0.25), transparent);
          pointer-events: none;
          z-index: 2;
          transition: top 0ms linear;
        }

        .pixel-particle {
          position: absolute;
          border-radius: 1px;
          pointer-events: none;
          animation: floatParticle var(--dur, 3s) var(--delay, 0s) infinite ease-in-out alternate;
          opacity: 0.6;
        }

        @keyframes floatParticle {
          0%   { transform: translateY(0) scale(1);   opacity: 0.3; }
          50%  { transform: translateY(-12px) scale(1.4); opacity: 0.8; }
          100% { transform: translateY(4px) scale(0.8); opacity: 0.2; }
        }

        .footer-inner {
          position: relative;
          z-index: 3;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 28px;
        }

        /* ── LOGO ─────────────────────────────── */
        .logo-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .logo-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #00ffcc11, #ff00ff11);
          border: 1px solid #00ffcc44;
          border-radius: 4px;
          padding: 6px 14px 6px 10px;
          box-shadow: 0 0 20px rgba(0,255,204,0.15), inset 0 0 10px rgba(0,255,204,0.05);
        }

        .logo-icon {
          font-size: 20px;
          animation: iconPulse 2s infinite ease-in-out;
        }

        @keyframes iconPulse {
          0%, 100% { filter: drop-shadow(0 0 4px #00ffcc); transform: scale(1); }
          50%       { filter: drop-shadow(0 0 12px #00ffcc) drop-shadow(0 0 24px #00ffcc88); transform: scale(1.08); }
        }

        .logo-name {
          font-family: 'Press Start 2P', monospace;
          font-size: 16px;
          color: #00ffcc;
          letter-spacing: 1px;
          text-shadow: 0 0 10px #00ffcc, 0 0 20px #00ffcc66;
        }

        .logo-tagline {
          font-size: 9px;
          color: #ff00ff;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 8px #ff00ff;
          padding-left: 2px;
          animation: taglineBlink 4s infinite;
        }

        @keyframes taglineBlink {
          0%, 90%, 100% { opacity: 1; }
          95%            { opacity: 0.3; }
        }

        .logo-desc {
          font-size: 8px;
          color: #ffffff55;
          letter-spacing: 1px;
          padding-left: 2px;
          font-family: 'Orbitron', monospace;
        }

        /* GLITCH */
        .glitch {
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .glitch::before {
          color: #ff00ff;
          animation: glitch1 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        .glitch::after {
          color: #00ffcc;
          animation: glitch2 3s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }
        @keyframes glitch1 {
          0%,90%,100% { transform: translate(0); opacity: 0; }
          92%          { transform: translate(-2px, 1px); opacity: 0.8; }
          94%          { transform: translate(2px, -1px); opacity: 0.8; }
          96%          { transform: translate(0); opacity: 0; }
        }
        @keyframes glitch2 {
          0%,88%,100% { transform: translate(0); opacity: 0; }
          90%          { transform: translate(2px, -1px); opacity: 0.7; }
          92%          { transform: translate(-2px, 1px); opacity: 0.7; }
          94%          { transform: translate(0); opacity: 0; }
        }

        /* ── NAV GRID ────────────────────────── */
        .nav-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: flex-end;
        }

        .game-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border: 1px solid #ffffff18;
          border-radius: 3px;
          background: rgba(255,255,255,0.02);
          color: #ffffff66;
          font-family: 'Orbitron', monospace;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.15s;
        }

        .game-link::before {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,255,204,0.12), transparent);
          transition: left 0.35s ease;
        }

        .game-link:hover::before {
          left: 100%;
        }

        .game-link:hover {
          color: #00ffcc;
          border-color: #00ffcc66;
          background: rgba(0,255,204,0.06);
          box-shadow: 0 0 12px rgba(0,255,204,0.2), inset 0 0 8px rgba(0,255,204,0.05);
          transform: translateY(-2px);
        }

        .game-link.active {
          color: #00ffcc;
          border-color: #00ffcc;
          background: rgba(0,255,204,0.08);
          box-shadow: 0 0 16px rgba(0,255,204,0.25);
        }

        .link-icon {
          font-size: 12px;
          line-height: 1;
        }

        /* ── DIVIDER ─────────────────────────── */
        .pixel-divider {
          width: 100%;
          height: 2px;
          margin: 28px 0 20px;
          background: repeating-linear-gradient(
            to right,
            #00ffcc33 0px, #00ffcc33 6px,
            transparent 6px, transparent 12px
          );
          position: relative;
        }

        .pixel-divider::before,
        .pixel-divider::after {
          content: '◆';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 10px;
          color: #00ffcc;
          text-shadow: 0 0 8px #00ffcc;
        }
        .pixel-divider::before { left: 0; }
        .pixel-divider::after  { right: 0; }

        /* ── BOTTOM ──────────────────────────── */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }

        .copyright {
          font-family: 'Press Start 2P', monospace;
          font-size: 7px;
          color: #ffffff33;
          letter-spacing: 2px;
        }

        .copyright span {
          color: #00ffcc88;
        }

        .credits {
          font-size: 8px;
          color: #ffffff25;
          letter-spacing: 2px;
          font-family: 'Orbitron', monospace;
        }

        .credits .heart {
          color: #ff3366;
          text-shadow: 0 0 8px #ff3366;
          animation: heartbeat 1.4s infinite ease-in-out;
          display: inline-block;
        }

        @keyframes heartbeat {
          0%,100% { transform: scale(1); }
          14%      { transform: scale(1.3); }
          28%      { transform: scale(1); }
          42%      { transform: scale(1.15); }
        }

        .credits .dev {
          color: #ff00ff88;
          text-shadow: 0 0 6px #ff00ff44;
        }

        /* ── STATUS BAR ─────────────────────── */
        .status-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-bottom: 8px;
        }

        .status-dot {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 7px;
          color: #ffffff33;
          letter-spacing: 1px;
          font-family: 'Orbitron', monospace;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 1px;
          background: #00ffcc;
          box-shadow: 0 0 6px #00ffcc;
          animation: dotPulse 2s infinite;
        }

        .dot.yellow { background: #ffff00; box-shadow: 0 0 6px #ffff00; animation-delay: 0.5s; }
        .dot.pink   { background: #ff00ff; box-shadow: 0 0 6px #ff00ff; animation-delay: 1s; }

        @keyframes dotPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }

        /* ── TOP ROW LAYOUT ─────────────────── */
        .footer-top {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: flex-start;
        }

        @media (min-width: 768px) {
          .footer-top {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }
          .nav-grid {
            justify-content: flex-end;
            max-width: 560px;
          }
        }

        /* corner decorations */
        .corner {
          position: absolute;
          width: 16px;
          height: 16px;
          z-index: 4;
          opacity: 0.6;
        }
        .corner-tl { top: 8px; left: 8px; border-top: 2px solid #00ffcc; border-left: 2px solid #00ffcc; }
        .corner-tr { top: 8px; right: 8px; border-top: 2px solid #ff00ff; border-right: 2px solid #ff00ff; }
        .corner-bl { bottom: 8px; left: 8px; border-bottom: 2px solid #ff00ff; border-left: 2px solid #ff00ff; }
        .corner-br { bottom: 8px; right: 8px; border-bottom: 2px solid #00ffcc; border-right: 2px solid #00ffcc; }
      `}</style>

      <footer className="gaming-footer" ref={footerRef}>
        {/* Corner decorations */}
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {/* Scanline */}
        <div className="scanline" style={{ top: `${scanline}px` }} />

        {/* Floating particles */}
        {particles.map((p) => (
          <PixelParticle
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 6px ${p.color}`,
              "--delay": p.delay,
              "--dur": p.duration,
            }}
          />
        ))}

        <div className="footer-inner">
          <div className="footer-top">
            {/* Logo */}
            <div className="logo-block">
              <div className="logo-badge">
                <span className="logo-icon">🎮</span>
                <span className="logo-name">
                  <GlitchText>FunByte</GlitchText>
                </span>
              </div>
              <div className="logo-tagline">▶ Fun Starts Here</div>
              <div className="logo-desc">Play · Beat · Repeat →</div>
            </div>

            {/* Nav */}
            <nav className="nav-grid">
              {GAME_LINKS.map((link) => (
                <NavLink
                  key={link.key}
                  to={link.to}
                  className={({ isActive }) =>
                    `game-link${isActive ? " active" : ""}`
                  }
                >
                  <span className="link-icon">{link.icon}</span>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="pixel-divider" />

          {/* Bottom */}
          <div className="footer-bottom">
            <div className="status-bar">
              <div className="status-dot">
                <div className="dot" /> ONLINE
              </div>
              <div className="status-dot">
                <div className="dot yellow" /> 7 GAMES
              </div>
              <div className="status-dot">
                <div className="dot pink" /> FREE PLAY
              </div>
            </div>

            <div className="copyright">
              © <span>2026 FUNBYTE</span> — ALL RIGHTS RESERVED
            </div>
            <div className="credits">
              DESIGNED WITH <span className="heart">❤</span> BY{" "}
              <span className="dev">ABHINAV</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

//feature
import { NavLink } from "react-router-dom";

const games = [
  {
    title: "Number Counter",
    desc: "Intelligent suggestions and AI-powered automation for repetitive tasks.",
    image:
      "https://play-lh.googleusercontent.com/k2mR04q4mgZw0vcRlpaXTtP12ifYJFOryzYudLx4i8_sQvoIK_Vw3t9YKbJa0OmiWxwBEdUnZV3YX9tajQd-GFA=w600-h300-pc0xffffff-pd",
    badge: "NEW",
    badgeClass: "badge-new",
    hp: 8,
    id: "numbercount",
  },
  {
    title: "Tic Tac Toe",
    desc: "Challenge your friends and discover who dominates the grid.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNKaKsJoO93z-1rtHLaDh1yxVQsHn5SuKLQ&s",
    badge: "POPULAR",
    badgeClass: "badge-popular",
    hp: 10,
    id: "tictac",
  },
  {
    title: "Rock Paper Scissors",
    desc: "Test your luck and strategy in this timeless classic battle.",
    image:
      "https://static.vecteezy.com/system/resources/previews/010/307/906/non_2x/hands-playing-rock-paper-scissors-game-flat-design-style-illustration-vector.jpg",
    badge: null,
    hp: 7,
    id: "rps",
  },
  {
    title: "Quiz Game",
    desc: "Challenge your knowledge across a wide range of topics and compete!",
    image:
      "https://thumbs.dreamstime.com/b/quiz-logo-icon-vector-symbol-flat-cartoon-bubble-speeches-question-check-mark-signs-as-competition-game-interview-160701701.jpg",
    badge: "BETA",
    badgeClass: "badge-beta",
    hp: 6,
    id: "quiz",
  },
  {
    title: "Guess the Number",
    desc: "Test your psychic guessing skills in this thrilling number hunt.",
    image:
      "https://play-lh.googleusercontent.com/HkBG-8GuBksC4nWLBWIuwqeAuIG-WNnNCOecLWKrm0MyzC9agQtvbMtwF_AEL4chFDQUPxAbdAetyT7S1hEm5Ik",
    badge: null,
    hp: 5,
    id: "guessnum",
  },
  {
    title: "Typing Speed Test",
    desc: "Push your WPM limits and climb the leaderboard of speed typists.",
    image:
      "https://play-lh.googleusercontent.com/hSuOQgMElmnsBMw-F5ZrqWSnpf3nZ2AmZPdNALD7G2CRKSxM8ia07ogmkIrAqHIvzKR5",
    badge: "UPDATED",
    badgeClass: "badge-updated",
    hp: 9,
    id: "typingspeed",
  },
];

function GameCard({ game, index }) {
  return (
    <div
      className="game-card"
      style={{ animationDelay: `${index * 0.07}s` }}
    >
      <div className="corner-deco tl" />
      <div className="corner-deco tr" />
      <div className="corner-deco bl" />
      <div className="corner-deco br" />

      <div className="card-screen">
        <img
          className="card-img"
          src={game.image}
          alt={game.title}
          loading="lazy"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div className="screen-overlay" />
        <div className="screen-lines" />
        {game.badge && (
          <span className={`badge ${game.badgeClass}`}>{game.badge}</span>
        )}
      </div>

      <div className="card-body">
        <div className="card-num">
          GAME_{String(index + 1).padStart(3, "0")}
        </div>
        <div className="card-title">{game.title.toUpperCase()}</div>
        <div className="card-health">
          {Array.from({ length: 10 }, (_, b) => (
            <div
              key={b}
              className={`hp-bar${b >= game.hp ? " empty" : ""}`}
            />
          ))}
        </div>
        <div className="card-desc">{game.desc}</div>
        <NavLink to={`/${game.id}`} className="play-btn">
          PLAY NOW <span className="arrow">▶</span>
        </NavLink>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap');

        .arcade-wrapper {
          background: #050510;
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: 'Exo 2', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .scanline {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,255,255,0.015) 2px,
            rgba(0,255,255,0.015) 4px
          );
          pointer-events: none;
          z-index: 0;
        }

        .grid-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image:
            linear-gradient(rgba(0,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        .arcade-content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
        }

        .arcade-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .logo-text {
          font-family: 'Orbitron', monospace;
          font-size: clamp(2rem, 6vw, 3.5rem);
          font-weight: 900;
          color: #fff;
          letter-spacing: 4px;
          text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff88;
          animation: flicker 4s infinite;
        }

        .logo-text span { color: #00ffff; }

        @keyframes flicker {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.85; }
          97% { opacity: 1; }
          98% { opacity: 0.9; }
        }

        .arcade-subtitle {
          font-size: 0.85rem;
          color: #00ffff88;
          letter-spacing: 6px;
          text-transform: uppercase;
          margin-top: 0.5rem;
          font-family: 'Orbitron', monospace;
        }

        .insert-coin {
          display: inline-block;
          margin-top: 1rem;
          font-size: 0.7rem;
          color: #ffffff55;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-family: 'Orbitron', monospace;
          animation: blink 1.2s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .stats-row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
          font-family: 'Orbitron', monospace;
          font-size: 0.6rem;
          color: #00ffff66;
          letter-spacing: 2px;
        }

        .stat-item span {
          color: #00ffff;
          font-size: 0.85rem;
          display: block;
          text-align: center;
          margin-bottom: 2px;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .game-card {
          position: relative;
          background: #0a0a1a;
          border: 1px solid #00ffff22;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: cardIn 0.5s ease both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .game-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid transparent;
          border-radius: 4px;
          transition: border-color 0.25s ease;
          z-index: 3;
          pointer-events: none;
        }

        .game-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 0 30px #00ffff33, 0 20px 40px #00000088;
        }

        .game-card:hover::before {
          border-color: #00ffff66;
        }

        .card-screen {
          position: relative;
          height: 165px;
          overflow: hidden;
          background: #030308;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.7) brightness(0.6);
          transition: filter 0.3s ease, transform 0.4s ease;
        }

        .game-card:hover .card-img {
          filter: saturate(1.1) brightness(0.85);
          transform: scale(1.08);
        }

        .screen-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, #0a0a1aee 100%);
        }

        .screen-lines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.15) 3px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
        }

        .badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 3px 10px;
          font-size: 0.6rem;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          letter-spacing: 2px;
          border-radius: 2px;
          z-index: 2;
        }

        .badge-new    { background: #00ff88; color: #003322; }
        .badge-popular{ background: #00aaff; color: #001133; }
        .badge-beta   { background: #aa44ff; color: #fff; }
        .badge-updated{ background: #ff8800; color: #220a00; }

        .card-body {
          padding: 1rem 1.1rem 1.2rem;
        }

        .card-num {
          font-family: 'Orbitron', monospace;
          font-size: 0.55rem;
          color: #00ffff44;
          letter-spacing: 2px;
          margin-bottom: 0.3rem;
        }

        .card-title {
          font-family: 'Orbitron', monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .card-health {
          display: flex;
          gap: 3px;
          margin-bottom: 0.8rem;
        }

        .hp-bar {
          height: 3px;
          border-radius: 1px;
          flex: 1;
          background: #00ffff;
          box-shadow: 0 0 4px #00ffff88;
          animation: hpPulse 2s ease-in-out infinite;
        }

        .hp-bar.empty {
          background: #00ffff22;
          box-shadow: none;
          animation: none;
        }

        @keyframes hpPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }

        .card-desc {
          font-size: 0.78rem;
          color: #8888aa;
          line-height: 1.5;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        .play-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: transparent;
          border: 1px solid #00ffff55;
          color: #00ffff;
          font-family: 'Orbitron', monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s ease;
          text-transform: uppercase;
          text-decoration: none;
        }

        .play-btn:hover {
          background: #00ffff15;
          border-color: #00ffff;
          box-shadow: 0 0 12px #00ffff44;
          transform: scale(1.03);
          color: #00ffff;
        }

        .play-btn .arrow {
          transition: transform 0.2s ease;
        }

        .play-btn:hover .arrow {
          transform: translateX(3px);
        }

        .corner-deco {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: #00ffff;
          border-style: solid;
          z-index: 4;
        }

        .corner-deco.tl { top: 6px;    left: 6px;  border-width: 1px 0 0 1px; }
        .corner-deco.tr { top: 6px;    right: 6px; border-width: 1px 1px 0 0; }
        .corner-deco.bl { bottom: 6px; left: 6px;  border-width: 0 0 1px 1px; }
        .corner-deco.br { bottom: 6px; right: 6px; border-width: 0 1px 1px 0; }

        .footer-area {
          text-align: center;
          margin-top: 3rem;
        }

        .explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 40px;
          background: transparent;
          border: 2px solid #00ffff;
          color: #00ffff;
          font-family: 'Orbitron', monospace;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
        }

        .explore-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #00ffff;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .explore-btn:hover::before { transform: scaleX(1); }
        .explore-btn:hover { color: #050510; box-shadow: 0 0 40px #00ffff66; }
        .explore-btn span { position: relative; z-index: 1; }
      `}</style>

      <section className="arcade-wrapper">
        <div className="scanline" />
        <div className="grid-bg" />

        <div className="arcade-content">
          <div className="arcade-header">
            <div className="logo-text">
              FUN<span>BYTE</span>
            </div>
            <div className="arcade-subtitle">Games Collection</div>
            <div className="insert-coin">▶ select your game ▶</div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <span>6</span>GAMES
            </div>
            <div className="stat-item">
              <span>∞</span>PLAYS
            </div>
            <div className="stat-item">
              <span>1P</span>MODE
            </div>
          </div>

          <div className="games-grid">
            {games.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </div>

          <div className="footer-area">
            <NavLink to="/explore" className="explore-btn">
              <span>▶ Explore All Games</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}