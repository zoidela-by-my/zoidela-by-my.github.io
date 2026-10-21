// My H. Nguyen — portfolio interactions (original code, vanilla JS, no build step)
const projects = [
  { id:"tmobile", img:"assets/tmobile.jpg", title:"T-Mobile", tags:"BRANDING · CAMPAIGNS · OOH", cats:["branding","campaigns"], mark:"T",
    short:"Campaigns, executive storytelling and a design system that scales.",
    desc:"Senior digital design for campaign launches, product marketing, digital advertising, video and executive presentations — including defining the visual identity for the T-Mobile Fiber launch and building modular systems other designers can run with.",
    role:"Senior Digital Designer", focus:"Brand systems, campaigns, presentation design" },
  { id:"frontline", img:"assets/frontline.jpg", title:"Frontline Foods", tags:"BRANDING · SOCIAL", cats:["branding","social"], mark:"F",
    short:"Brand and social for a community food fundraiser.",
    desc:"Branding and social creative — including email, social and thumbnail creative sized per platform for a community table-read fundraiser supporting World Central Kitchen.",
    role:"Designer", focus:"Brand identity, social creative" },
  { id:"natera", img:"assets/natera.jpg", title:"Natera", tags:"BRANDING · PRINT", cats:["branding"], mark:"N",
    short:"Calm, credible brand and print in healthcare.",
    desc:"Visual design for a healthcare brand — print and brand work where clarity and trust carry the message.",
    role:"Visual Designer", focus:"Brand, print, layout" },
  { id:"jamcity", img:"assets/jamcity.jpg", title:"Jam City", tags:"SOCIAL · ADVERTISING", cats:["social","campaigns"], mark:"J",
    short:"Scroll-stopping social and ads for mobile games.",
    desc:"Marketing design for mobile games — social and advertising creative built to perform, and iterated from feedback and discovery rather than guesswork.",
    role:"Marketing Designer", focus:"Social, advertising, gaming" },
  { id:"jobfest", img:"assets/jobfest.jpg", title:"JobFest", tags:"REBRANDING · EVENT · PRINT", cats:["branding"], mark:"JF",
    short:"A full rebrand for a student job fair.",
    desc:"Rebranding, event and print design for JobFest at USF Career Services — a fresh identity carried across signage, print and promotion.",
    role:"Designer", focus:"Rebrand, event branding, print" },
  { id:"findfuture", img:"assets/findfuture.jpg", title:"Find Your Future", tags:"EVENT BRANDING · SOCIAL · PRINT", cats:["branding","social"], mark:"FYF",
    short:"Event branding students actually notice.",
    desc:"Event branding, social and print for Find Your Future — helping students find their next step, with design that meets them where they are.",
    role:"Designer", focus:"Event branding, social, print" },
  { id:"bongos", img:"assets/bongos.jpg", title:"Bongo’s Cafe Concept", tags:"UX / UI DESIGN", cats:["digital"], mark:"B",
    short:"A playful cafe concept, designed end to end.",
    desc:"A UX/UI concept for a cafe — from brand feel to screens, designed to be warm, simple and easy to order from.",
    role:"UX/UI Designer", focus:"UX/UI, concept design" },
  { id:"art", img:"assets/art.jpg", title:"Art / Illustrations", tags:"PLAY", cats:["play"], mark:"✎",
    short:"The playground: illustration and personal work.",
    desc:"Illustrations and personal projects — mosaics, drawings and experiments. This is where new styles start before they show up in client work.",
    role:"Illustrator & maker", focus:"Illustration, Procreate, play" },
  { id:"calmar", img:"assets/calmar.jpg", title:"CALMAR Eatery", tags:"WEBSITE / APP · BRANDING", cats:["digital","branding"], mark:"C",
    short:"Website, mobile app and branding for an eatery.",
    desc:"Website and mobile app design plus branding for CALMAR Eatery — one identity across the menu, the phone and the front door.",
    role:"Designer", focus:"Web, mobile app, branding" },
  { id:"seastreetcar", img:"assets/seastreetcar.jpg", title:"SEAStreetCar", tags:"UX / UI · BRANDING", cats:["digital","branding"], mark:"S",
    short:"UX/UI and branding for getting around Seattle.",
    desc:"UX/UI design and branding for SEAStreetCar — making a Seattle streetcar experience clearer and friendlier to ride.",
    role:"UX/UI Designer", focus:"UX/UI, branding, transit" },
];

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Sidebar featured-project list + the main project feed.
// Years shown only where the owner has stated them; otherwise the block is
// titled by project name alone (no invented dates).
const years = { tmobile: "2021 — Present" };

// Sidebar list (anchors scroll to the project blocks)
const sideProjects = document.getElementById("sideProjects");
projects.forEach(p => {
  const li = document.createElement("li");
  li.innerHTML = `<a href="#project-${p.id}">${p.title}</a>`;
  sideProjects.appendChild(li);
});

// Project feed blocks: title row, image carousel, right text column
const feed = document.getElementById("projectFeed");
projects.forEach(p => {
  const block = document.createElement("article");
  block.className = "project-block";
  block.id = `project-${p.id}`;
  const yr = years[p.id] ? ` <span>(${years[p.id]})</span>` : "";
  block.innerHTML = `
    <a class="block-title" href="#project-${p.id}">${p.title}${yr}</a>
    <div class="block-main">
      <div class="carousel" data-carousel>
        <img class="lazy active" src="${p.img}" alt="${p.title} project image" loading="lazy">
        <button class="car-btn car-prev" type="button" aria-label="Previous image">‹</button>
        <button class="car-btn car-next" type="button" aria-label="Next image">›</button>
        <div class="car-progress"></div>
      </div>
      <div class="block-text">
        <p>${p.short} ${p.desc}</p>
        <a class="case-link" href="#" data-case="${p.id}">↗ Full case study</a>
        <p class="block-tags">ⓘ ${p.tags}</p>
      </div>
    </div>`;
  block.querySelector("[data-case]").addEventListener("click", e => { e.preventDefault(); openModal(p); });
  feed.appendChild(block);
});

// Carousels: crossfade autoplay with arrows and a progress strip. With a single
// slide the controls stay hidden (CSS) and autoplay is a no-op; adding slides
// to a block's .carousel is all it takes to enable the full behavior.
document.querySelectorAll("[data-carousel]").forEach(car => {
  const slides = car.querySelectorAll("img");
  if (slides.length < 2) { car.querySelector(".car-progress").style.display = "none"; return; }
  car.classList.add("multi");
  const bar = car.querySelector(".car-progress");
  let cur = 0, timer = null, started = null;
  const DUR = 4200;
  function show(n){
    slides[cur].classList.remove("active");
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add("active");
    restart();
  }
  function restart(){
    clearInterval(timer); started = Date.now();
    timer = setInterval(() => show(cur + 1), DUR);
  }
  car.querySelector(".car-prev").addEventListener("click", () => show(cur - 1));
  car.querySelector(".car-next").addEventListener("click", () => show(cur + 1));
  if (!reduceMotion) {
    restart();
    (function tick(){
      if (started) bar.style.width = Math.min(100, (Date.now() - started) / DUR * 100) + "%";
      requestAnimationFrame(tick);
    })();
  }
});

// Images fade in as they load / enter the viewport
const lazyIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const img = en.target;
    if (img.complete && img.naturalWidth) img.classList.add("loaded");
    else img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
    lazyIO.unobserve(img);
  });
}, { rootMargin: "200px" });
document.querySelectorAll("img.lazy").forEach(img => lazyIO.observe(img));

// Modal (project details)
const backdrop = document.getElementById("modalBackdrop");
let lastFocus = null;
function openModal(p){
  lastFocus = document.activeElement;
  document.getElementById("modalArt").innerHTML = `<img src="${p.img}" alt="${p.title} project image">`;
  document.getElementById("modalTags").textContent = p.tags;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalRole").textContent = p.role;
  document.getElementById("modalFocus").textContent = p.focus;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}
function closeModal(){
  backdrop.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
document.getElementById("modalClose").addEventListener("click", closeModal);
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !backdrop.hidden) closeModal(); });

// Smooth scrolling (Lenis), guarded: native scroll remains the fallback
let lenis = null;
if (window.Lenis && !reduceMotion) {
  lenis = new Lenis({ duration: 1.0, smoothWheel: true });
  const lenisRaf = t => { lenis.raf(t); requestAnimationFrame(lenisRaf); };
  requestAnimationFrame(lenisRaf);
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const href = a.getAttribute("href");
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -10 }); }
    });
  });
}

// Custom cursor — behavior matched to tanvi.network, original implementation:
// a small coral dot drawn on a full-viewport canvas, plus a thin straight line
// segment connecting the pointer's previous-frame position to its current one.
// The canvas is cleared every frame, so the "trail" exists only while moving
// (its length is just the distance travelled in one frame) and vanishes the
// instant the pointer stops. Over links, buttons and form fields the custom
// cursor is suppressed and the native cursor returns.
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

// Page fade-in + footer year
requestAnimationFrame(() => document.body.classList.add("ready"));
addEventListener("load", () => document.body.classList.add("ready"));
document.getElementById("year").textContent = new Date().getFullYear();
