# NextGen Digital Hub — Website

A modern, fully responsive marketing website for NextGen Digital Hub, a digital services company. Built with **plain HTML, CSS and vanilla JavaScript** so it deploys anywhere with zero build step.

## Pages

- `index.html` — Homepage (hero, services, why-choose-us, testimonials, CTA)
- `services.html` — Full services catalog with delivery process
- `about.html` — Company intro, mission/vision, why we are better, **CEO profile** (Abdul Rehman) with skills, timeline, achievements
- `projects.html` — Portfolio (6 projects: SaaS, AI tools, QA automation, web apps)
- `blog.html` — Blog cards (AI in QA, testing trends, SaaS development, automation)
- `contact.html` — Contact form, email/phone, map placeholder

## Features

- Premium SaaS-grade UI (blue / purple / white theme with gradients)
- Smooth animations via Intersection Observer
- Fully responsive (mobile + tablet + desktop)
- Animated stat counters
- AI chatbot widget (UI only — wire to your backend or Claude API)
- Page loader, fixed header with scroll effect, mobile hamburger menu
- Working contact form (front-end validation + success state)
- SEO-optimized: meta titles/descriptions, semantic HTML, keyword tags
- No build step, no dependencies — just static files

## Local preview

Any static server works:

```bash
# Python 3
python3 -m http.server 8000

# Node
npx serve .
```

Open http://localhost:8000

## Deployment

### Vercel
```bash
npm i -g vercel
vercel
```
Or drag-and-drop the folder at https://vercel.com/new.

### Netlify
Drag-and-drop the folder at https://app.netlify.com/drop, or:
```bash
npm i -g netlify-cli
netlify deploy --prod
```

The included `vercel.json` and `netlify.toml` set sensible defaults.

## File structure

```
service/
├── index.html
├── services.html
├── about.html
├── projects.html
├── blog.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── vercel.json
├── netlify.toml
└── README.md
```

## Wiring up the chatbot

The chatbot UI is in place. To make it intelligent, replace the random-reply block in `js/main.js` (search for `replies = [`) with a `fetch()` call to your backend or to the Anthropic API.

## Wiring up the contact form

The form currently shows a success message client-side. To actually deliver messages, point the form `action` at:
- A serverless function (e.g. Vercel Function, Netlify Function)
- Formspree / Getform / Basin
- Your own API endpoint
