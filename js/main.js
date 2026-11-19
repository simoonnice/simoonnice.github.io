// Mobile navigation
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
const header = document.querySelector('.nav');
function setMenu(open) {
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}
menu.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Hairline under the header once the page scrolls
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Publication topic filter
const chips = document.querySelectorAll('.chip');
const pubs = document.querySelectorAll('#publications .pub');
const groups = document.querySelectorAll('#publications .year-group');
const empty = document.querySelector('.empty');

function applyFilter(topic) {
  chips.forEach(c => c.setAttribute('aria-pressed', String(c.dataset.filter === topic)));
  let shown = 0;
  pubs.forEach(p => {
    const match = topic === 'all' || p.dataset.topics.split(' ').includes(topic);
    p.hidden = !match;
    if (match) shown++;
  });
  groups.forEach(g => { g.hidden = !g.querySelector('.pub:not([hidden])'); });
  empty.hidden = shown > 0;
}
chips.forEach(c => {
  const f = c.dataset.filter;
  const n = f === 'all' ? pubs.length : [...pubs].filter(p => p.dataset.topics.split(' ').includes(f)).length;
  const s = document.createElement('span'); s.className = 'count'; s.textContent = n; c.append(' ', s);
  c.addEventListener('click', () => applyFilter(f));
});

// "Related papers" buttons in the research cross-section
document.querySelectorAll('.layer-link').forEach(b => b.addEventListener('click', () => {
  applyFilter(b.dataset.filter);
  document.getElementById('publications').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}));
