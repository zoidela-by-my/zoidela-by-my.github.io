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

// Render project cards
const grid = document.getElementById("projectGrid");
const empty = document.getElementById("emptyState");
function render(filter="all"){
  grid.innerHTML = "";
  const list = projects.filter(p => filter==="all" || p.cats.includes(filter));
  empty.hidden = list.length > 0;
  list.forEach((p,i) => {
    const b = document.createElement("button");
    b.className = "card"; b.type = "button";
    b.setAttribute("aria-label", `Open ${p.title} project details`);
    b.innerHTML = `<div class="card-art">${p.img ? `<img src="${p.img}" alt="${p.title} project image" loading="lazy">` : `<span class="mark">${p.mark}</span>`}</div>
      <div class="card-body"><p class="card-tags">${p.tags}</p><h3>${p.title}</h3><p>${p.short}</p></div>`;
    b.addEventListener("click", () => openModal(p));
    grid.appendChild(b);
    requestAnimationFrame(() => setTimeout(() => b.classList.add("in"), 40*i));
  });
}
render();

// Filters
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    render(chip.dataset.filter);
  });
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
  const art = document.getElementById("modalArt");
  art.innerHTML = p.img ? `<img src="${p.img}" alt="${p.title} project image">` : `<span class="mark">${p.mark}</span>`;
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

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open"); menuBtn.setAttribute("aria-expanded","false");
}));

// Contact form -> pre-filled email (nothing sent automatically)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const subject = encodeURIComponent(`${d.get("topic")} — from ${d.get("name")}`);
  const body = encodeURIComponent(`Hi My,\n\n${d.get("message")}\n\n— ${d.get("name")}`);
  location.href = `mailto:nguyenmyh99@gmail.com?subject=${subject}&body=${body}`;
});

// Back to top + year
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 600), {passive:true});
toTop.addEventListener("click", () => scrollTo({top:0, behavior:"smooth"}));
document.getElementById("year").textContent = new Date().getFullYear();
