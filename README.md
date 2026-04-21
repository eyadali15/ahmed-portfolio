# Ahmed Abuzenada — Cinematic Portfolio

A premium, immersive 3D portfolio website for Ahmed Hany Abuzenada, award-winning Saudi filmmaker and assistant director.

Built with React, TypeScript, Three.js (React Three Fiber), GSAP, Framer Motion, and Tailwind CSS.

---

## ✨ Features

- **Real WebGL 3D** — Floating geometric shapes, film frame planes, particle systems via React Three Fiber
- **Cinematic Animations** — GSAP ScrollTrigger timelines, Framer Motion page transitions, character-by-character text reveals
- **Smooth Scrolling** — Lenis smooth scroll with scroll progress tracking
- **Film Grain Overlay** — CSS-based film grain animation for cinematic atmosphere
- **Custom Cursor** — Spring-physics cursor with blend-mode effect
- **Dark Cinema Aesthetic** — Premium dark theme with warm gold accents
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile
- **Category Filters** — Filter portfolio by Commercials, Films, Documentaries
- **Dynamic Project Pages** — Individual project detail pages with credits and related work
- **SEO Optimized** — Meta tags, semantic HTML, clean routing
- **Loading Screen** — Cinematic progress bar loading experience

## 🗂️ Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Fullscreen 3D hero, featured work, director's reel, CTA |
| Work | `/work` | Portfolio grid with category filters |
| Project Detail | `/work/:slug` | Fullscreen video, credits, related projects |
| About | `/about` | Bio, philosophy, career timeline |
| Contact | `/contact` | Contact form, social links, WhatsApp CTA |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Install & Run

```bash
# Clone the repository
cd ahmed-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🌍 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com) and import the repository
3. Vercel will auto-detect the Vite configuration
4. Click **Deploy**

Or via CLI:
```bash
npx -y vercel --prod
```

### Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com) and import the repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Click **Deploy**

Or via CLI:
```bash
npm run build
npx -y netlify-cli deploy --prod --dir=dist
```

### Custom Domain

After deploying to Vercel or Netlify:
1. Go to your project's **Settings** → **Domains**
2. Add your custom domain (e.g., `ahmedabuzenada.com`)
3. Update your domain's DNS:
   - For Vercel: Add a CNAME record pointing to `cname.vercel-dns.com`
   - For Netlify: Add a CNAME record pointing to your Netlify subdomain
4. SSL certificates are automatically provisioned

---

## 🔧 Customization

### Updating Projects

Edit `src/data/projects.ts` to add/modify projects:
- Update `vimeoId` with real Vimeo video IDs
- Update thumbnails, descriptions, and credits
- Set `featured: true` for projects to appear on the homepage

### Updating Content

- **About page**: Edit `src/pages/About.tsx` for bio, philosophy, and timeline
- **Contact info**: Edit `src/pages/Contact.tsx` for email, social links
- **Colors**: Edit CSS custom properties in `src/index.css` under `@theme`

### Adding a Contact Form Backend

Replace the `console.log` in `src/components/ui/ContactForm.tsx` with:
- [Formspree](https://formspree.io) — add `action` URL to form
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — add `netlify` attribute
- Custom API endpoint

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 8 | Build tool |
| Three.js / R3F | WebGL 3D graphics |
| @react-three/drei | R3F helpers |
| GSAP | Scroll & timeline animations |
| Framer Motion | Page transitions & UI animations |
| Lenis | Smooth scrolling |
| Zustand | State management |
| Tailwind CSS v4 | Styling |
| React Router v6 | Client-side routing |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Cursor, SmoothScroll, PageTransition
│   ├── three/           # Scene, HeroScene, Particles (WebGL)
│   └── ui/              # Button, ProjectCard, VideoPlayer, FilterBar, ContactForm
├── data/
│   └── projects.ts      # Project metadata & utilities
├── pages/               # Home, Work, ProjectDetail, About, Contact
├── store/
│   └── useStore.ts      # Zustand global state
├── shaders/
│   └── glsl.d.ts        # GLSL type declarations
├── index.css            # Global styles & design system
├── App.tsx              # App shell with loading screen
├── router.tsx           # React Router configuration
└── main.tsx             # Entry point
```

---

## 📄 License

All rights reserved. © Ahmed Hany Abuzenada.
