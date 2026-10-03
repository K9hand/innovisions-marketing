// Mark that the script runs, so content hidden for the reveal animation can appear.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Nav ──
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // ── Close mobile nav on link click ──
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });

  // ── Fade-in on scroll ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ── Contact Form ──
  const form = document.querySelector('.contact-form');
  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = '✓ Message sent!';
      btn.style.background = 'var(--brand-secondary)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ── FAQ Accordion ──
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = answer.style.maxHeight;
      document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
      document.querySelectorAll('.faq-question').forEach(qq => qq.classList.remove('open'));
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        q.classList.add('open');
      }
    });
  });

  // ── Billing Toggle (Annual / Monthly) ──
  const billingCheckbox = document.getElementById('billing-toggle');
  if (billingCheckbox) {
    const labels = document.querySelectorAll('.billing-label');
    const amounts = document.querySelectorAll('.pricing-price .amount');
    const periods = document.querySelectorAll('.pricing-price .period');
    const badges = document.querySelectorAll('.save-badge');

    function updateBilling(isAnnual) {
      labels.forEach(l => l.classList.toggle('active', l.textContent.trim().startsWith(isAnnual ? 'Annual' : 'Monthly')));
      amounts.forEach(el => { el.textContent = el.getAttribute(isAnnual ? 'data-annual' : 'data-monthly'); });
      periods.forEach(el => { el.textContent = el.getAttribute(isAnnual ? 'data-annual' : 'data-monthly'); });
      badges.forEach(b => b.classList.toggle('hidden', !isAnnual));
    }

    billingCheckbox.addEventListener('change', () => updateBilling(billingCheckbox.checked));
  }
});
