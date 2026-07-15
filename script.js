const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const toast = document.querySelector('.toast');
const copyPhone = document.querySelector('.copy-phone');

function closeMenu() {
  body.classList.remove('menu-open');
  if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const active = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
    navLinks.forEach((link) => link.classList.remove('active'));
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-42% 0px -48% 0px' });

sections.forEach((section) => sectionObserver.observe(section));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

if (copyPhone) {
  copyPhone.addEventListener('click', async () => {
    const phone = copyPhone.dataset.phone;
    try {
      await navigator.clipboard.writeText(phone);
      showToast('Phone number copied');
    } catch (error) {
      showToast(phone);
    }
  });
}
