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
    const carousel = document.getElementById('testimonialCarousel');
    const cards    = carousel.querySelectorAll('.testimonial-card');
    let idx = 0;

    function step(i) {
        const w = cards[0].getBoundingClientRect().width + 16; // card + gutter
        carousel.scrollTo({ left: i * w, behavior: 'smooth' });
    }

    let timer = setInterval(() => {
        idx = (idx + 1) % cards.length;
        step(idx);
    }, 5000);

    document.getElementById('prevBtn').onclick = () => {
        clearInterval(timer);
        idx = Math.max(0, idx - 1);
        step(idx);
    };
    document.getElementById('nextBtn').onclick = () => {
        clearInterval(timer);
        idx = Math.min(cards.length - 1, idx + 1);
        step(idx);
    };
});
