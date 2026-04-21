/* nav.js — shared navigation injected into every page */
/* Call buildNav(activeHref) after DOM load              */

function buildNav(activeHref) {
  const links = [
    { href: 'about.html',              label: 'About me' },
    { href: '#',                       label: 'WORK', class: 'section-label' },
    { href: 'digital.html',            label: 'Digital',                   sub: true },
    { href: 'sketchbook-feb-april.html', label: 'Sketchbook 26/02/14–26/04/01', sub: true },
    { href: 'sketchbook-jan-feb.html', label: 'Sketchbook 26/01/17–26/02/13', sub: true },
    { href: 'sketchbook-nov-jan.html', label: 'Sketchbook 25/11/29–26/01/17', sub: true },
    { href: 'sketchbook-april4th-april12th.html', label: 'Sketchbook 26/04/04–26/04/12', sub: true },
    { href: 'sketchbook-april-ongoing.html', label: 'Sketchbook 26/04/18-Ongoing', sub: true },
    { href: '#spacer',                 label: '',      class: 'spacer' },
    { href: 'contact.html',            label: 'Contact' },
  ];

  const nav = document.getElementById('nav');
  if (!nav) return;

  links.forEach(({ href, label, class: cls, sub }) => {
    if (cls === 'spacer') {
      const d = document.createElement('div');
      d.className = 'spacer';
      nav.appendChild(d);
      return;
    }
    if (cls === 'section-label') {
      const d = document.createElement('div');
      d.className = 'section-label';
      d.textContent = label;
      nav.appendChild(d);
      return;
    }
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (sub) a.classList.add('sub-link');
    // Mark active
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
    nav.appendChild(a);
  });
}

/* ── Lightbox helper ── */
function buildLightbox(images) {
  let current = 0;
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lightbox-img');
  const close  = document.getElementById('lightbox-close');
  const prev   = document.getElementById('lightbox-prev');
  const next   = document.getElementById('lightbox-next');

  if (!lb) return;

  function show(i) {
    current = (i + images.length) % images.length;
    lbImg.src = images[current];
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Wire thumbnails
  document.querySelectorAll('.thumb').forEach((el, i) => {
    el.addEventListener('click', () => show(i));
  });

  close.addEventListener('click', hide);
  lb.addEventListener('click', e => { if (e.target === lb) hide(); });
  prev.addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
  next.addEventListener('click', e => { e.stopPropagation(); show(current + 1); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'Escape')     hide();
  });
}
