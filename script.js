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

// Case studies — text column left, image right bleeding to the edge
const featured = [
  { id: "tmobile", pill: "2021 — Present" },
  { id: "jobfest", pill: "Event · Print" },
  { id: "jamcity", pill: "Social · Advertising" },
  { id: "seastreetcar", pill: "UX / UI · Seattle" },
];
const caseList = document.getElementById("caseList");
featured.forEach(f => {
  const p = projects.find(x => x.id === f.id);
  const row = document.createElement("article");
  row.className = "case-row";
  row.innerHTML = `<div class="case-text">
      <span class="case-year">${f.pill}</span>
      <h3>${p.title}</h3>
      <p class="case-client">${p.tags}</p>
      <p class="case-desc">${p.desc}</p>
      <button class="pill pill-outline" type="button">View case</button>
    </div>
    <div class="case-img"><img src="${p.img}" alt="${p.title} project image" loading="lazy"></div>`;
  row.querySelector("button").addEventListener("click", () => openModal(p));
  caseList.appendChild(row);
});

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
function setMenu(open){
  overlay.hidden = !open;
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.innerHTML = open ? '<span style="font-size:1.5rem;line-height:1">×</span>' : '<span class="burger"><i></i><i></i><i></i></span>';
  document.body.style.overflow = open ? "hidden" : "";
}
menuBtn.addEventListener("click", () => setMenu(overlay.hidden));
overlay.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) setMenu(false); });

// Header hides on scroll down, returns on scroll up
const header = document.getElementById("siteHeader");
let lastY = 0;
addEventListener("scroll", () => {
  if (!overlay.hidden) return;
  const y = scrollY;
  header.classList.toggle("hidden", y > 220 && y > lastY);
  lastY = y;
}, { passive: true });

// Marquee band — services capsules, duplicated for a seamless loop
const services = ["Brand Identity","Digital Design","Art Direction","Motion","Packaging","Illustration","Design Systems","Campaigns"];
const track = document.getElementById("marqueeTrack");
track.innerHTML = [...services, ...services].map(t => `<span>${t}</span>`).join("");

document.getElementById("year").textContent = new Date().getFullYear();
