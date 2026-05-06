// ===== Slide-in detail panel =====
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

document.querySelectorAll('[data-panel]').forEach(el => {
    el.addEventListener('click', (e) => {
        // ignore clicks on inner real anchors (so external links still work)
        if (e.target.closest('a[href^="http"]') || e.target.closest('a[href^="mailto:"]')) {
            return;
        }
        openPanel(el.getAttribute('data-panel'));
    });
});

panelClose.addEventListener('click', closePanel);
overlay.addEventListener('click', closePanel);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
});

// ===== Award expand =====
document.querySelectorAll('.award-clickable').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
    });
});

// ===== Scroll fade-in =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.entry, .exp-row, .award-row, .block').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
