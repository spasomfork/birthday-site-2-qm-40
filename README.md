# QM@40 Ayia Napa Celebration Website

A responsive, high-performance celebration portal for **Molly Ore's 40th Milestone Birthday** in Ayia Napa, Cyprus. Built with React 19, Vite, Tailwind CSS, Lucide Icons, and Canvas Confetti.

---

## 🚀 How to Make this Website Live on GitHub for Free (GitHub Pages)

### Option 1: Automatic Deployment with GitHub Actions (Included!)

This project already comes pre-configured with `.github/workflows/deploy.yml` and relative assets (`base: './'`).

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and click **New Repository**.
   - Name your repository (e.g. `qm40-celebration`).
   - Leave it **Public** (required for free GitHub Pages).
   - Do **NOT** initialize with a README (since this project already includes one).

2. **Upload / Push Your Code**:
   - **Method A (Using Git CLI)**:
     ```bash
     git init
     git add .
     git commit -m "Initial commit for QM@40 website"
     git branch -M main
     git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/qm40-celebration.git
     git push -u origin main
     ```
   - **Method B (Web Upload via GitHub)**:
     - On your newly created GitHub repository page, click **uploading an existing file**.
     - Drag and drop the extracted files from your downloaded `.zip`.
     - Click **Commit changes**.

3. **Enable GitHub Pages**:
   - In your GitHub repository, go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, select:
     - **GitHub Actions**
   - That's it! GitHub Actions will automatically run the deployment workflow, build the site, and publish it.
   - Within 1–2 minutes, your website will be live at:
     ```
     https://<YOUR_GITHUB_USERNAME>.github.io/qm40-celebration/
     ```

---

## ⚡ Alternative Free 1-Click Hosting Options

Because this is a pure modern Vite static frontend, you can also host it 100% free with custom domain support on:

### Vercel (Fastest & Easiest)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New** > **Project** and select your repository.
3. Keep default settings (`Framework: Vite`, `Build: npm run build`, `Output: dist`).
4. Click **Deploy**. Your site is live in 30 seconds with a free `.vercel.app` URL and automatic HTTPS!

### Netlify
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Drag and drop the `dist/` folder directly onto the Netlify dashboard for instant live publishing without even connecting Git!

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
