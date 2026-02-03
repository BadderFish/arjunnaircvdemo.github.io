# Arjun Nair | Portfolio & CV Website

A clean, modern, and responsive portfolio website showcasing my work as an aeronautical engineering graduate student.

## Project Structure

This repository contains **two versions** of the portfolio:

### Production (Root Files) - **DO NOT MODIFY**
- `index.html`, `styles.css`, `script.js` - Current production site (vanilla HTML/CSS/JS)
- Live at: [https://badderfish.github.io/arjunnair-portfolio/](https://badderfish.github.io/arjunnair-portfolio/)
- **These files are preserved as fallback and should not be modified**

### React Version (v2) - `/app` Folder
- Modern React + TypeScript + Vite application
- Data-driven via `app/src/data/portfolio.json`
- All portfolio content lives in JSON - no code changes needed for updates
- **Local development only until approved for production**

---

## React App (`/app`) - Local Development

### Prerequisites
- Node.js 20+ and npm

### Setup & Run Locally

```bash
# Navigate to the app folder
cd app

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173` (or next available port).

### Build for Production

```bash
cd app
npm run build
```

Build output goes to `app/dist/` and is configured for the `/arjunnair-portfolio/` base path.

### Preview Production Build

```bash
cd app
npm run preview
```

---

## Updating Portfolio Content

**All content is in one place:** `app/src/data/portfolio.json`

To update your portfolio:
1. Open `app/src/data/portfolio.json`
2. Edit the JSON (name, projects, experience, skills, etc.)
3. Save the file
4. Refresh your browser (dev server auto-reloads)

No code changes required!

---

## Deploying to GitHub Pages (Manual Only)

Deployment is **manual-only** via GitHub Actions workflow. **Do not deploy until approved.**

### Steps to Deploy:

1. **Local verification complete** - Ensure the React app works perfectly locally
2. **Commit and push** your changes to the `v2-react-local` branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin v2-react-local
   ```

3. **Trigger deployment manually**:
   - Go to GitHub repo → **Actions** tab
   - Select **"Deploy React App to GitHub Pages"** workflow
   - Click **"Run workflow"** → Select branch `v2-react-local` → **"Run workflow"**

4. **Verify deployment**:
   - Wait for workflow to complete (~2-3 minutes)
   - Visit: `https://badderfish.github.io/arjunnair-portfolio/`
   - Verify everything works as expected

---

## Cutover Plan: Switching from Vanilla to React

**Current state:** Production site uses root `index.html`. React app is in `/app` and builds to `/app/dist`.

**When ready to switch to React (after approval):**

### Option 1: Direct Replacement (Recommended)
1. Build the React app: `cd app && npm run build`
2. Move contents of `app/dist/` to repository root:
   ```bash
   # Backup old files first
   mkdir old-site-backup
   mv index.html styles.css script.js old-site-backup/

   # Copy React build to root
   cp -r app/dist/* .
   ```
3. Commit and push to `main` branch
4. GitHub Pages will automatically serve the new React app

### Option 2: Archive Old Site, Keep Structure
1. Create `old-site/` folder and move current root files there
2. Keep React app in `/app` as development source
3. Update GitHub Pages settings to deploy from `/app/dist` or use GitHub Actions to build on push to `main`

### Verification Checklist (Before Cutover)

Run through this checklist locally before deploying:

- [ ] All sections render correctly (Hero, About, Projects, Experience, Skills, Leadership, Contact)
- [ ] Content matches the original site exactly
- [ ] Navigation links work and scroll smoothly to sections
- [ ] Active navigation highlighting works as you scroll
- [ ] Mobile menu opens/closes correctly
- [ ] Project search filter works
- [ ] All external links open correctly (GitHub, LinkedIn, reports, etc.)
- [ ] Email/phone/WhatsApp links work
- [ ] Typewriter effect plays on hero title (if motion not reduced)
- [ ] Site is responsive on mobile/tablet/desktop
- [ ] Footer year displays current year
- [ ] Build completes without errors: `npm run build`
- [ ] Production preview works: `npm run preview`

---

## Tech Stack

### Production (Root)
- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Inter)

### React Version (`/app`)
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS (ported from original)
- **State:** React hooks (no external state library)
- **Data:** JSON (`portfolio.json`)
- **Deployment:** GitHub Actions + GitHub Pages

---

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Interactive Elements**: Smooth scrolling, active nav highlighting, project search
- **Accessibility**: ARIA labels, skip links, keyboard navigation
- **Data-Driven**: Update content via JSON without touching code
- **Performance**: Lightweight, minimal dependencies
- **UX Features**:
  - Mobile hamburger menu
  - Scroll-based header show/hide
  - Active section highlighting (IntersectionObserver)
  - Typewriter effect (respects prefers-reduced-motion)
  - Project search filter

---

## Questions or Issues?

For any questions about the React app, local development, or deployment process:
- Check the verification checklist above
- Review `app/src/data/portfolio.json` for content updates
- Run `npm run dev` for live development
- Run `npm run build` to test production build

---

© 2026 Arjun Nair
