// Case-study pages — light shared script: page fade-in, footer year,
// smooth scrolling, and the coral dot cursor with its one-frame line trail.
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

requestAnimationFrame(() => document.body.classList.add("ready"));
addEventListener("load", () => document.body.classList.add("ready"));
document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

if (window.Lenis && !reduceMotion) {
  const lenis = new Lenis({ duration: 1.0, smoothWheel: true });
  const lenisRaf = t => { lenis.raf(t); requestAnimationFrame(lenisRaf); };
  requestAnimationFrame(lenisRaf);
}

// Gallery images fade in as they enter the viewport
const lazyIO = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("loaded"); lazyIO.unobserve(en.target); } });
}, { rootMargin: "200px" });
document.querySelectorAll(".case-gallery img, .case-hero img").forEach(img => { img.classList.add("lazy"); lazyIO.observe(img); });

// Custom cursor: coral dot + one-frame line segment trail (canvas, cleared
// every frame); suppressed over interactive elements, where native returns.
if (matchMedia("(pointer: fine)").matches) {
  const canvas = document.createElement("canvas");
  canvas.id = "cursorCanvas";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const COLOR = "#ff4344";
  let W = 0, H = 0, mx = -100, my = -100, px = -100, py = -100, seen = false, native = false;
  function sizeCanvas(){
    const dpr = Math.min(2, devicePixelRatio || 1);
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  sizeCanvas();
  addEventListener("resize", sizeCanvas);
  addEventListener("pointermove", e => {
    mx = e.clientX; my = e.clientY; seen = true;
    native = !!e.target.closest("a, button, input, textarea, select, label");
    document.body.classList.toggle("has-cursor", !native);
  }, { passive: true });
  document.addEventListener("pointerleave", () => { seen = false; });
  (function draw(){
    ctx.clearRect(0, 0, W, H);
    if (seen && !native) {
      if (px >= 0 && (px !== mx || py !== my)) {
        ctx.strokeStyle = COLOR; ctx.lineWidth = 2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(mx, my); ctx.stroke();
      }
      ctx.fillStyle = COLOR;
      ctx.beginPath(); ctx.arc(mx, my, 4.5, 0, Math.PI * 2); ctx.fill();
    }
    px = mx; py = my;
    requestAnimationFrame(draw);
  })();
}
