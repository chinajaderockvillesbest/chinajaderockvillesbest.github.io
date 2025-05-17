// scroll to top on load/pageshow
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('DOMContentLoaded', () => window.scrollTo(0,0));
window.addEventListener('pageshow', e => { if (e.persisted) window.scrollTo(0,0); });

// bootstrap navbar collapse on link click
document.addEventListener('DOMContentLoaded', () => {
    const collapseEl = document.getElementById('navbarSupportedContent');
    if (collapseEl) {
        const navCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });
        collapseEl.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item')
            .forEach(el => el.addEventListener('click', () => navCollapse.hide()));
    }
});

// unified slide-in for all 4 panels and one handler for close buttons
document.addEventListener('DOMContentLoaded', () => {
    const panels = [
        { sel: '.copy-1', delay: 1000 },
        { sel: '.copy-2', delay: 2000 },
        { sel: '.interior-1', delay: 3000 },
        { sel: '.interior-2', delay: 4000 }
    ];

    panels.forEach(({ sel, delay }) => {
        const el = document.querySelector(sel);
        if (el) setTimeout(() => el.classList.add('expanded'), delay);
    });

    document.querySelectorAll('.overlay-close')
        .forEach(btn => btn.addEventListener('click', () => {
            btn.parentElement.classList.remove('expanded');
        }));
});

<!-- Google Maps JS API (free tier) -->