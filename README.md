# GRIMM Portfolio — Self-Hosted

A static portfolio site. No build tools, no dependencies. Pure HTML/CSS/JS.

---

### Make sure to update the build.py with any new folders/sketchbooks you add.

## GitHub Pages Setup (one-time)

1. **Create a repo** on github.com — name it anything (e.g. `portfolio`)
   - If you name it `YOUR_USERNAME.github.io` it will live at that URL for free
   - Otherwise it lives at `YOUR_USERNAME.github.io/portfolio`

2. **Clone it and drop these files in:**
   ```
   git clone https://github.com/YOUR_USERNAME/portfolio
   cp -r grimm-portfolio/* portfolio/
   cd portfolio
   git add .
   git commit -m "initial portfolio"
   git push
   ```

3. **Enable Pages:**  
   Repo → Settings → Pages → Source: `Deploy from branch` → `main` → `/ (root)` → Save

   Your site will be live in ~60 seconds at the URL shown.

4. **Custom domain (optional):**  
   Add a file called `CNAME` containing just your domain:
   ```
   yourdomain.com
   ```
   Then in your domain registrar, add a CNAME record pointing to `YOUR_USERNAME.github.io`

---

## Adding New Images

### To a sketchbook / gallery page:

1. Copy your image file into the matching folder:
   ```
   images/sketchbook-ongoing/   ← for the ongoing sketchbook
   images/sketchbook-jan-feb/
   images/sketchbook-nov-jan/
   images/digital/
   ```

2. Open the matching `.html` file and find the `IMAGES` array near the bottom:
   ```js
   const IMAGES = [
     'images/sketchbook-ongoing/sketch-01.jpg',
     'images/sketchbook-ongoing/sketch-02.jpg',
     // ← add more here
   ];
   ```
   Add a new line with your filename. That's it.

3. Push to GitHub:
   ```
   git add .
   git commit -m "add new sketches"
   git push
   ```

### To the Work (homepage) cards:

Open `index.html` and find the `SECTIONS` array. Update the `cover` field to point
to any image in `images/work/` that you want as the card's background.

---

## Adding a New Album

1. Duplicate any existing sketchbook `.html` file, rename it
2. Update the page title and the `IMAGES` array path
3. Create a matching folder in `images/`
4. Add a card for it in `index.html`'s `SECTIONS` array
5. Add a nav link in `nav.js`'s `links` array

---

## Contact Form

The form uses [Formspree](https://formspree.io) (free, no backend needed):

1. Sign up at formspree.io
2. Create a new form
3. Copy your form ID (looks like `xabc1234`)
4. In `contact.html` replace `YOUR_FORM_ID`:
   ```html
   <form action="https://formspree.io/f/xabc1234" ...>
   ```

Free tier: 50 submissions/month.

---

## File Structure

```
├── index.html                  Work / home page
├── about.html                  About me
├── contact.html                Contact
├── digital.html                Digital gallery
├── sketchbook-ongoing.html     Sketchbook 26/02/14-Ongoing
├── sketchbook-jan-feb.html     Sketchbook 26/01/17-26/02/13
├── sketchbook-nov-jan.html     Sketchbook 25/11/29-26/01/17
├── style.css                   All styles
├── nav.js                      Shared nav + lightbox logic
└── images/
    ├── work/                   Cover images for homepage cards
    ├── digital/
    ├── sketchbook-ongoing/
    ├── sketchbook-jan-feb/
    └── sketchbook-nov-jan/
```
