document.addEventListener('DOMContentLoaded', () => {
    const collapseEl = document.getElementById('navbarSupportedContent');
    if (!collapseEl) return;

    // Create the collapse controller (but don't toggle immediately)
    const navCollapse = new bootstrap.Collapse(collapseEl, { toggle: false });

    // Hide on click of any link or item — except the dropdown-toggle itself
    collapseEl.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item')
        .forEach(el => {
            el.addEventListener('click', () => navCollapse.hide());
        });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#menuNav .nav-link');
    const sections = Array.from(navLinks)
        .map(link => document.getElementById(link.getAttribute('href').slice(1)))
        .filter(sec => sec); // only valid sections

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = document.querySelector(`#menuNav .nav-link[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                link && link.classList.add('active');
            }
        });
    }, {
        rootMargin: '0px 0px -50% 0px',  // trigger when section is halfway up
        threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
});

const tracker = document.querySelector('.menu-tracker');
// insert a “sentinel” div just above the tracker
const sent = document.createElement('div');
tracker.parentNode.insertBefore(sent, tracker);
new IntersectionObserver(
    ([e]) => tracker.classList.toggle('stuck', e.intersectionRatio < 1),
    { threshold: [1] }
).observe(sent);