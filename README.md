# NextGen Digital Hub — v2 (Next.js + MongoDB + Auth + Real-time)

Full-stack version of the marketing site, with admin dashboard, blog CMS, persistent contact submissions, and real-time notifications.

## Stack

- **Next.js 14** (App Router, JavaScript)
- **MongoDB Atlas** + Mongoose (data layer)
- **NextAuth.js** (admin authentication)
- **Pusher** (real-time notifications when contact form is submitted)
- **Anthropic Claude API** (chatbot)

## Project structure

```
service/
├── app/
│   ├── layout.js                 root layout
│   ├── globals.css               all styling (port of v1 CSS)
│   ├── page.js                   homepage
│   ├── services/page.js
│   ├── about/page.js
│   ├── projects/page.js
│   ├── blog/page.js              reads posts from MongoDB
│   ├── contact/
│   │   ├── page.js
│   │   └── ContactForm.js
│   ├── components/               Header, Footer, Chatbot, Reveal, etc.
│   ├── admin/
│   │   ├── layout.js
│   │   ├── AdminShell.js         sidebar + live toast
│   │   ├── SessionProvider.js
│   │   ├── login/page.js
│   │   ├── page.js               dashboard
│   │   ├── messages/page.js      view/manage submissions
│   │   └── posts/
│   │       ├── page.js           list
│   │       └── new/page.js       create
│   └── api/
│       ├── chat/route.js         Claude chatbot
│       ├── contact/route.js      saves to DB + Pusher event
│       ├── messages/...          admin CRUD
│       ├── posts/...             public list + admin CRUD
│       └── auth/[...nextauth]/route.js
├── lib/                          mongodb, pusher, auth helpers
├── models/                       Mongoose schemas
├── middleware.js                 protects /admin/**
├── public/images/                drop ceo.jpg here
├── .env.local.example            copy to .env.local for local dev
├── package.json
└── next.config.js
```

## One-time cleanup (after migrating from v1)

The old static HTML / CSS / JS files from v1 are no longer used. Delete them:

```bash
chmod +x cleanup-old-files.sh
./cleanup-old-files.sh
```

This removes: `index.html`, `services.html`, `about.html`, `projects.html`, `blog.html`, `contact.html`, `css/`, `js/`, `api/chat.js`, `netlify.toml`.

## Local setup

```bash
# Install dependencies
npm install

# Copy env template and fill in values (see "Environment variables" below)
cp .env.local.example .env.local
# ...edit .env.local...

# Run dev server
npm run dev
```

Then visit:
- http://localhost:3000 — public site
- http://localhost:3000/admin — redirects to /admin/login

## Environment variables

| Var | Where to get | Required |
|---|---|---|
| `MONGODB_URI` | https://cloud.mongodb.com → free M0 cluster → Connect | yes |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` | yes |
| `NEXTAUTH_URL` | `http://localhost:3000` (dev) / your Vercel URL (prod) | yes |
| `ADMIN_EMAIL` | Your choice (used to log into /admin) | yes |
| `ADMIN_PASSWORD` | Your choice (strong) | yes |
| `ANTHROPIC_API_KEY` | https://console.anthropic.com → API Keys | optional |
| `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER` | https://dashboard.pusher.com → free Channels app | optional |
| `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER` | Same key + cluster, exposed to browser | optional |

## Deploying / updating on Vercel

You already have the project on GitHub at `Abdul102/nextgen-digital-hub` and connected to Vercel. The deploy flow stays the same:

```bash
git add -A
git commit -m "Migrate to Next.js + MongoDB + admin"
git push
```

Vercel auto-detects Next.js, builds, and deploys (~2 minutes for the first build, ~30s for subsequent updates).

### Add env vars on Vercel

1. https://vercel.com → your project → **Settings → Environment Variables**
2. Add each variable from the table above (use the **production** scope; mark `NEXT_PUBLIC_*` as such — Vercel handles this automatically by name prefix).
3. Click **Save** for each.
4. Trigger a new deploy: **Deployments → … → Redeploy** (or push a tiny commit).

### Custom domain

**Settings → Domains** → add your domain → follow DNS instructions.

## Updating the site (your daily workflow)

**Option 1 — Local edit:**
```bash
cd "/Users/abdulrehman/Documents/Claude/Projects/service"
# edit files
npm run dev   # preview at localhost:3000
git add -A
git commit -m "describe change"
git push      # auto-deploys to Vercel in ~30s
```

**Option 2 — GitHub web editor (no terminal):**
- Go to https://github.com/Abdul102/nextgen-digital-hub
- Click any file, click ✏️, edit, commit
- Vercel auto-deploys

**Option 3 — Admin dashboard (no code):**
- Sign in at `/admin/login`
- Add blog posts via **Blog Posts → New Post**
- Posts appear on `/blog` automatically (cached for 60s)

## Real-time notifications

Once Pusher is configured, the admin dashboard receives a toast popup the instant someone submits the contact form — no refresh needed. The Messages list also updates live.

## Production checklist

- [ ] MongoDB Atlas cluster created, IP allowlist set to "0.0.0.0/0" (Vercel needs it) or to Vercel's IP ranges
- [ ] All env vars added to Vercel
- [ ] `NEXTAUTH_URL` set to actual production URL (NOT localhost)
- [ ] Admin password is strong and stored safely
- [ ] CEO photo uploaded at `public/images/ceo.jpg`
- [ ] First blog post added via admin
- [ ] Tested contact form submission end-to-end (DB save + admin sees it live)

## Notes

- Free MongoDB Atlas M0 cluster: 512 MB, plenty for thousands of submissions and posts.
- Free Pusher Channels: 200k messages/day, 100 concurrent connections — way more than this site needs.
- Free Anthropic credits cover hundreds of chatbot conversations; set spend limits in console for safety.
- Total monthly cost at typical traffic: **$0**.
