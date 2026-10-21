// My H. Nguyen — portfolio interactions (vanilla JS, no build step)
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

// Work grid — square image, display title, underlined category line
const grid = document.getElementById("projectGrid");
projects.forEach((p, i) => {
  const b = document.createElement("button");
  b.className = "card"; b.type = "button";
  b.setAttribute("aria-label", `Open ${p.title} project details`);
  b.innerHTML = `<div class="card-art"><img src="${p.img}" alt="${p.title} project image" loading="lazy"></div>
    <div class="card-body"><h3>${p.title}</h3><p class="card-tags">${p.tags}</p><p class="short">${p.short}</p></div>`;
  b.addEventListener("click", () => openModal(p));
  grid.appendChild(b);
  requestAnimationFrame(() => setTimeout(() => b.classList.add("in"), 40 * i));
});

// Case studies — pinned sequence: one text block and one image per case,
// crossfaded / diagonal-wiped by scroll in updateCases()
const featured = [
  { id: "tmobile", pill: "2021 — Present" },
  { id: "jobfest", pill: "Event · Print" },
  { id: "jamcity", pill: "Social · Advertising" },
  { id: "seastreetcar", pill: "UX / UI · Seattle" },
];
const caseTexts = document.getElementById("caseTexts");
const caseImgs = document.getElementById("caseImgs");
const caseBlocks = [], caseImgEls = [];
featured.forEach(f => {
  const p = projects.find(x => x.id === f.id);
  const block = document.createElement("div");
  block.className = "case-block";
  block.innerHTML = `<span class="case-year">${f.pill}</span>
    <h3>${p.title}</h3>
    <p class="case-client">${p.tags}</p>
    <p class="case-desc">${p.desc}</p>
    <button class="pill pill-outline" type="button">View case</button>`;
  block.querySelector("button").addEventListener("click", () => openModal(p));
  caseTexts.appendChild(block); caseBlocks.push(block);
  const img = document.createElement("img");
  img.src = p.img; img.alt = `${p.title} project image`; img.loading = "lazy";
  caseImgs.appendChild(img); caseImgEls.push(img);
});
caseImgEls.forEach((img, i) => { img.style.zIndex = i; });

function updateCases(){
  const pin = document.getElementById("casesPin");
  if (!pin || reduceMotion) return;
  const vh = innerHeight;
  const total = pin.offsetHeight - vh;
  if (total <= 0) return;
  const rect = pin.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / total));
  const pos = progress * (caseBlocks.length - 1);
  const i = Math.min(caseBlocks.length - 2, Math.floor(pos));
  const frac = pos - Math.floor(pos);
  caseBlocks.forEach((b, k) => {
    let o = 0, y = 0;
    if (k === i) { o = 1 - frac; y = -frac * 24; }
    else if (k === i + 1) { o = frac; y = (1 - frac) * 24; }
    else if (pos >= caseBlocks.length - 1 && k === caseBlocks.length - 1) { o = 1; y = 0; }
    b.style.opacity = o;
    b.style.transform = `translateY(calc(-50% + ${y}px))`;
    b.style.pointerEvents = o > 0.5 ? "auto" : "none";
  });
  caseImgEls.forEach((img, k) => {
    if (k <= i) img.style.clipPath = "none";
    else if (k === i + 1) img.style.clipPath = `polygon(${100 - 140 * frac}% 0, 100% 0, 100% 100%, ${100 - 110 * frac}% 100%)`;
    else img.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
  });
}

// Modal
const backdrop = document.getElementById("modalBackdrop");
let lastFocus = null;
function openModal(p){
  lastFocus = document.activeElement;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalTags").textContent = p.tags;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalRole").textContent = p.role;
  document.getElementById("modalFocus").textContent = p.focus;
  document.getElementById("modalArt").innerHTML = `<img src="${p.img}" alt="${p.title} project image">`;
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
document.getElementById("modalCta").addEventListener("click", closeModal);
backdrop.addEventListener("click", e => { if (e.target === backdrop) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !backdrop.hidden) closeModal(); });

// Full-screen menu overlay
const menuBtn = document.getElementById("menuBtn");
const overlay = document.getElementById("menuOverlay");
let lenis = null;
function setMenu(open){
  if (open) {
    overlay.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => overlay.classList.add("open")));
    if (lenis) lenis.stop();
  } else {
    overlay.classList.remove("open");
    setTimeout(() => { overlay.hidden = true; }, 560);
    if (lenis) lenis.start();
  }
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.innerHTML = open ? '<span style="font-size:1.5rem;line-height:1">×</span>' : '<span class="burger"><i></i><i></i><i></i></span>';
  document.body.style.overflow = open ? "hidden" : "";
}
menuBtn.addEventListener("click", () => setMenu(overlay.hidden));
overlay.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) setMenu(false); });

// Header + hero scroll animation — scrubbed by scroll position, fully reversible,
// matching the reference site's behavior:
//  - the two circular buttons hide after ~425px of downward scroll
//  - the wordmark hides later, after ~980px of downward scroll
//  - scrolling back up ~30px brings everything back
//  - the hero headline stays pinned for ~1.15 viewport heights (the sticky stage
//    plus the hero's extra height), then releases and scrolls away at 1:1
//  - the single media frame rises 1:1 at first, then scales up, centered,
//    to near full-bleed by ~820px of scroll, always behind the headline
const header = document.getElementById("siteHeader");
const reel = document.getElementById("heroReel");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let lastY = scrollY, upAccum = 0;

function onScrollFrame(){
  const y = scrollY, vh = innerHeight;
  // header show/hide
  if (overlay.hidden) {
    const dy = y - lastY;
    if (dy < 0) {
      upAccum += -dy;
      if (upAccum >= 30) header.classList.remove("hide-buttons", "hide-logo");
    } else if (dy > 0) {
      upAccum = 0;
      if (y > 425) header.classList.add("hide-buttons");
      if (y > 980) header.classList.add("hide-logo");
    }
    if (y < 10) header.classList.remove("hide-buttons", "hide-logo");
  }
  lastY = y;
  // hero reel rise + scale (scrubbed)
  if (reel && !reduceMotion) {
    const startOffset = vh * 0.40;
    const offsetY = startOffset - Math.min(y, startOffset);
    const sp = Math.max(0, Math.min(1, (y - 200) / 620));
    const base = reel.offsetWidth || 420;
    const target = innerWidth * 0.98 / base;
    const scale = 1 + sp * (target - 1);
    reel.style.transform = `translate(-50%, -50%) translateY(${offsetY}px) scale(${scale})`;
  }
  if (typeof updateCases === "function") updateCases();
  requestAnimationFrame(onScrollFrame);
}
requestAnimationFrame(onScrollFrame);

// Reel stills crossfade on their own timeline, like a playing showreel
const reelImgs = reel ? reel.querySelectorAll(".reel-img") : [];
if (reelImgs.length > 1 && !reduceMotion) {
  let ri = 0;
  setInterval(() => {
    reelImgs[ri].classList.remove("active");
    ri = (ri + 1) % reelImgs.length;
    reelImgs[ri].classList.add("active");
  }, 4000);
}

// Marquee band — services capsules, duplicated for a seamless loop
const services = ["Brand Identity","Digital Design","Art Direction","Motion","Packaging","Illustration","Design Systems","Campaigns"];
const track = document.getElementById("marqueeTrack");
track.innerHTML = [...services, ...services].map(t => `<span>${t}</span>`).join("");

document.getElementById("year").textContent = new Date().getFullYear();

// ===== Smooth scrolling (Lenis), guarded: native scroll remains the fallback =====
if (window.Lenis && !reduceMotion) {
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  const lenisRaf = t => { lenis.raf(t); requestAnimationFrame(lenisRaf); };
  requestAnimationFrame(lenisRaf);
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        if (!overlay.hidden) { setMenu(false); setTimeout(() => lenis.scrollTo(target), 80); }
        else lenis.scrollTo(target);
      }
    });
  });
}

// ===== Custom cursor — tanvi.network style: a single small coral dot that
// replaces the native pointer, plus a short comet trail: a chain of smaller,
// fainter dots that follow the pointer's recent path and fade out behind it.
// Pointer-fine devices only; touch keeps its native behavior. =====
if (matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("has-cursor");
  const cursor = document.getElementById("cursor");
  const TRAIL = 14;
  const ghosts = [];
  for (let i = 0; i < TRAIL; i++) {
    const g = document.createElement("span");
    g.className = "trail-dot";
    document.body.appendChild(g);
    ghosts.push(g);
  }
  let mx = -100, my = -100, seen = false;
  const history = [];
  addEventListener("pointermove", e => {
    mx = e.clientX; my = e.clientY; seen = true;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
    cursor.classList.add("on");
  }, { passive: true });
  document.addEventListener("pointerleave", () => {
    cursor.classList.remove("on");
    ghosts.forEach(g => g.style.opacity = 0);
    history.length = 0; seen = false;
  });
  (function trailLoop(){
    if (seen) {
      history.unshift({ x: mx, y: my });
      if (history.length > TRAIL * 2 + 2) history.pop();
      ghosts.forEach((g, i) => {
        const p = history[Math.min(history.length - 1, (i + 1) * 2)];
        if (!p) { g.style.opacity = 0; return; }
        const dist = Math.hypot(p.x - mx, p.y - my);
        const size = Math.max(2, 9 - i * 0.55);
        g.style.width = size + "px";
        g.style.height = size + "px";
        g.style.left = p.x + "px";
        g.style.top = p.y + "px";
        g.style.opacity = dist < 2 ? 0 : Math.max(0, 0.32 - i * 0.024);
      });
    }
    requestAnimationFrame(trailLoop);
  })();
}

// ===== Load intro: black screen with wordmark, then reveal =====
const loader = document.getElementById("loader");
function dismissLoader(){ if (loader) loader.classList.add("done"); }
addEventListener("load", () => setTimeout(dismissLoader, 450));
setTimeout(dismissLoader, 3200); // fallback

// ===== Marquee band: click expands the contact panel (stays open) =====
const band = document.getElementById("marqueeBand");
const bandPanel = document.getElementById("bandPanel");
function openBand(){
  if (!bandPanel.hidden) return;
  bandPanel.hidden = false;
  bandPanel.style.maxHeight = "0px";
  requestAnimationFrame(() => requestAnimationFrame(() => {
    bandPanel.style.transition = "max-height .6s cubic-bezier(.22,1,.36,1)";
    bandPanel.style.maxHeight = bandPanel.scrollHeight + "px";
  }));
  band.setAttribute("aria-expanded", "true");
}
band.addEventListener("click", openBand);
band.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openBand(); } });
document.getElementById("bandForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const subject = encodeURIComponent("Project inquiry — from " + d.get("name"));
  const body = encodeURIComponent("Hi My,\n\n" + d.get("message") + "\n\n— " + d.get("name"));
  location.href = `mailto:nguyenmyh99@gmail.com?subject=${subject}&body=${body}`;
});
