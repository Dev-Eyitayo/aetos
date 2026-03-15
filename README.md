# Aetos — Frontend

> Vite + React + TypeScript + Tailwind CSS 4.1

## Stack

| Tool | Version |
|------|---------|
| Vite | 5 |
| React | 18 |
| TypeScript | 5 |
| Tailwind CSS | 4.1 (`@theme`) |
| React Router | 6 |
| Framer Motion | 11 |
| Axios | 1.7 |
| Lucide React | 0.414 |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx       # Sticky nav with dark/light toggle
│   │   ├── Footer.tsx       # Site-wide footer
│   │   └── RootLayout.tsx   # Layout wrapper (Navbar + Outlet + Footer)
│   ├── sections/            # Home page sections
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Works.tsx
│   │   ├── Services.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── Partners.tsx
│   │   └── CTABanner.tsx
│   └── ui/                  # Reusable UI atoms (add as needed)
├── hooks/
│   └── useTheme.tsx         # ThemeProvider + useTheme hook
├── lib/
│   └── axios.ts             # Configured Axios instance
├── pages/
│   ├── HomePage.tsx         # Assembles all Home sections
│   └── PlaceholderPages.tsx # Projects / Contact / Careers / 404
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point
└── index.css                # Tailwind 4.1 @theme + global styles
```

## Theme

Dark mode is the default. Users can toggle light mode via the sun/moon icon in the navbar.
Theme preference is persisted in `localStorage` under the key `aetos-theme`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```
VITE_API_BASE_URL=https://api.yourbackend.com
```
