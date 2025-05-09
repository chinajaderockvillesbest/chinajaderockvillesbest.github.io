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
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    const cards = Array.from(track.children);
    let current = 0;
    let timer;

    function goNext() {
        current = (current + 1) % cards.length;
        cards[current].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }

    function startAuto() {
        // only on mobile/smaller than md
        if (window.innerWidth < 768) {
            timer = setInterval(goNext, 4000);
        }
    }
    function stopAuto() {
        clearInterval(timer);
    }

    // kick things off if we start small
    startAuto();

    // restart/stop if the user resizes across the 768px threshold
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const w = window.innerWidth;
        // only toggle when crossing the 768px boundary
        if ((lastWidth >= 768 && w < 768) || (lastWidth < 768 && w >= 768)) {
            stopAuto();
            startAuto();
        }
        lastWidth = w;
    });
});
