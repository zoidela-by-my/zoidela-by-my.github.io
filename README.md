# My H. Nguyen — Portfolio

A responsive, interactive portfolio site for My H. Nguyen, multidisciplinary / Senior Digital Designer based in Seattle. Modeled on the structure of [myhnguyen.com](https://myhnguyen.com/) — personal hero, selected work, about, approach, experience, and contact — rebuilt from scratch in plain HTML, CSS, and JavaScript (no framework, no build step). Design direction: simple, clean, and sleek — white, black, and gray, with the project photography carrying the color.

Project images in `assets/` are My's own work, taken from the project pages of her own site (myhnguyen.com) and optimized to ~1200px wide JPEGs.

**Live:** https://zoidela-by-my.github.io/

## Features
- Fully responsive: 3-column work grid on desktop, 2 on tablet, 1 on phone; hamburger menu on small screens
- Filterable work grid (Branding / Campaigns / Digital-UX / Social / Play)
- Project detail modal (keyboard-friendly: Esc to close, focus returns to the card)
- Rotating hero word, scrolling services marquee, scroll-aware back-to-top
- Contact form that opens a pre-filled email — nothing is sent without the visitor pressing send
- Respects `prefers-reduced-motion`, skip link, visible focus states, semantic landmarks

## Edit it
- Project list, descriptions, roles: `script.js` (`projects` array at the top)
- Words, bio, experience: `index.html`
- Colors, spacing, breakpoints: `styles.css` (`:root` variables at the top)

Pushing to `main` republishes automatically via GitHub Pages.
