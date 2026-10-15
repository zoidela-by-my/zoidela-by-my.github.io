# My H. Nguyen — Portfolio

A responsive, interactive portfolio site for My H. Nguyen, multidisciplinary / Senior Digital Designer based in Seattle. Modeled on the structure of [myhnguyen.com](https://myhnguyen.com/) — personal hero, selected work, about, approach, experience, and contact — rebuilt from scratch in plain HTML, CSS, and JavaScript (no framework, no build step). Design direction: simple, clean, and sleek — white, black, and gray, with the project photography carrying the color.

Layout (Oct 15, 2026): rebuilt to match the layout structure of ladespensa.es at My's request — floating overlay header with circular buttons and a full-screen menu, black hero with a pinned giant condensed headline and media frames scrolling beneath it, a heading-less 3-column work grid (square image, display title, underlined category), a light panel with three divider columns, a black capsule marquee band, case-study rows (narrow text column, image bleeding to the right edge), a wide media block in black gutters, and a tall black footer with oversized contact links. Only the layout structure was followed — all text, images, and branding are My's own.

Header scroll animation (Oct 15, 2026): matched to the reference's observed behavior — the circular header buttons hide after ~425px of downward scroll, the wordmark hides after ~980px, and ~30px of upward scroll restores both; the hero headline stays pinned for ~1.15 viewport heights while a single centered media frame rises 1:1, then scales (scroll-scrubbed, fully reversible) to near full-bleed behind the headline before the hero releases. The hero frame currently uses free placeholder images from Lorem Picsum (picsum.photos, seeds nguyen-hero1/3/5) crossfading like a showreel — swap the three `reel-img` URLs in index.html for a real video or images later.

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
