// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Shared slide-in panel logic
const panel = document.getElementById('detailPanel');
const overlay = document.getElementById('panelOverlay');
const panelContent = document.getElementById('panelContent');
const panelClose = document.getElementById('panelClose');

function openPanel(templateId) {
    const tmpl = document.getElementById('tmpl-' + templateId);
    if (!tmpl) return;
    panelContent.innerHTML = tmpl.innerHTML;
    panel.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('panel-open');
    panel.scrollTop = 0;
}

function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('panel-open');
}

// Project cards open panel
document.querySelectorAll('.project-card[data-panel]').forEach(card => {
    card.addEventListener('click', () => {
        openPanel(card.getAttribute('data-panel'));
    });
});

// Experience cards open panel
document.querySelectorAll('.exp-clickable[data-panel]').forEach(card => {
    card.addEventListener('click', () => {
        openPanel(card.getAttribute('data-panel'));
    });
});

panelClose.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
});

// Prevent GitHub link inside panel from closing panel
document.getElementById('panelContent').addEventListener('click', (e) => {
    if (e.target.closest('.project-github-link')) {
        e.stopPropagation();
    }
});

// Clickable award cards
document.querySelectorAll('.award-clickable').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Apply fade-in to sections and cards
document.querySelectorAll('.project-card, .award-card, .skill-card, .edu-card, .exp-card, .about-text, .contact-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
