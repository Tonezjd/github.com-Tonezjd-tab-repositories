# Volta Power Electric — Website

Static site (plain HTML/CSS/JS, no build step) — ready to deploy on Netlify.

## Files
```
index.html          Homepage
residential.html     Residential services
commercial.html      Commercial services
about.html            About / founder story
contact.html          Contact form + map + booking
thank-you.html        Form success page
404.html              Custom not-found page
css/style.css         All styling
js/main.js            Nav, sticky header, form helpers
assets/images/        Logo (full + cropped icon + favicons)
netlify.toml           Netlify config
```

## 1. Deploy to Netlify
**Easiest way (no Git required):**
1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**.
2. Drag the whole project folder (this folder) into the upload box.
3. Netlify builds nothing (it's static) — it goes live in seconds at a random `*.netlify.app` URL.

**Recommended way (Git-connected, so future edits redeploy automatically):**
1. Push this folder to a GitHub/GitLab repo.
2. In Netlify: **Add new site → Import an existing project** → connect the repo.
3. Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).

## 2. Connect your domain (VoltaPowerElectric.com)
1. In Netlify: **Site configuration → Domain management → Add a domain** → enter `voltapowerelectric.com`.
2. Netlify will show you DNS records. Either:
   - Point your domain's nameservers to Netlify DNS (simplest), or
   - Add the A/CNAME records Netlify gives you at your current registrar.
3. Netlify auto-provisions a free SSL certificate once DNS resolves (can take up to a few hours).

## 3. Contact form (Netlify Forms)
The form on `contact.html` is already wired for **Netlify Forms** (`data-netlify="true"`) — no backend needed.
- After your first deploy, go to **Site configuration → Forms** in Netlify to see submissions and set up **email notifications** (Site configuration → Forms → Form notifications → Email notification) so you get an email at abel@voltapowerelectric.com every time someone submits.
- A hidden honeypot field is included for spam protection.
- Submissions redirect to `thank-you.html`.

## 4. Housecall Pro booking
The Contact page has a "Book Online via Housecall Pro" button and a placeholder section (`#book-online`) ready for your booking widget. Once you have your Housecall Pro **online booking embed code / link**:
- Simplest: change the button's `href="#book-online"` link in `contact.html` to your Housecall Pro booking page URL, **or**
- For an embedded widget: paste Housecall Pro's embed `<script>`/`<iframe>` snippet into the `#book-online` section in `contact.html` (marked with a comment `BOOK ONLINE`).

## 5. Things to update as you get them (all clearly marked)
- **Photos** — every gray "Photo Placeholder" box (hero, About, Residential, Commercial) is a styled placeholder, not a fake stock photo. Swap in real photos by replacing the `.ph-image` block with an `<img>` tag once you have team/job photos.
- **Reviews/testimonials** — the 3 testimonial cards on the homepage are placeholders (tagged "Placeholder — add real review"). Replace with real customer quotes once you have them, and swap the "Read Our Reviews on Google" link for your actual Google Business Profile review link once it's claimed.
- **C-10 License number** — the site currently says "C-10 Contractor License: Pending" in the top bar and footer on every page. **Once CSLB issues your license number, update it everywhere** (search for "C-10 Contractor License" across all `.html` files) — California requires the license number to appear in contractor advertising once issued.
- **Stats** (jobs completed, years in business, team size) were intentionally left out since you didn't have numbers yet — easy to add a stats row later once you have them.

## 6. Local preview before deploying
No install needed — from this folder run:
```
python3 -m http.server 8080
```
Then open `http://localhost:8080` in a browser.

## 7. Design notes
- Colors, fonts and spacing are all defined as CSS variables at the top of `css/style.css` — safe to tweak brand colors there.
- Favicon/app icon were auto-cropped from your logo; `assets/images/logo-full.png` (the full vertical logo) is unused on the live pages but kept in case you want it somewhere (e.g. printed materials, email signature).
