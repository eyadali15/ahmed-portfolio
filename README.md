# Ahmed Hany Abuzenada — Portfolio

Personal portfolio website for Ahmed Hany Abuzenada, a filmmaker and director based in Saudi Arabia & Egypt.

## Stack

- React + TypeScript + Vite
- Framer Motion for animations
- GSAP + ScrollTrigger for scroll effects
- Tailwind CSS
- Cloudflare Pages (hosting)

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Admin Panel

Visit `/admin.html` to access the CMS dashboard. All content, layout, and design settings are stored in localStorage.

## Project Structure

```
src/
├── components/    # Reusable UI and layout components
├── content/       # Static JSON content (fallbacks)
├── data/          # Project data helpers
├── hooks/         # Custom hooks (config, etc.)
├── pages/         # Route pages
├── store/         # Zustand store
public/
├── admin.html     # Admin panel
├── admin.css      # Admin styles
├── admin.js       # Admin logic
├── config-loader.js  # CMS config defaults + layout editor
├── uploads/       # Media assets
functions/         # Cloudflare Pages functions
```