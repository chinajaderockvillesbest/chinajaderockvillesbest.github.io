// 1) disable browser's built-in scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 2) on every load/pageshow, jump to top
window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});
// (pageshow handles bfcache restores too)
window.addEventListener('pageshow', (e) => {
    if (e.persisted) window.scrollTo(0, 0);
});

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
    setTimeout(() => {
        document.querySelector('.copy-1').classList.add('expanded');
    }, 1000); // delay in ms

    // wire up each close button
    document.querySelectorAll('.overlay-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.remove('expanded');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.interior-1').classList.add('expanded');
    }, 4000); // delay in ms

    // wire up each close button
    document.querySelectorAll('.overlay-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.remove('expanded');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.copy-2').classList.add('expanded');
    }, 2000); // delay in ms

    // wire up each close button
    document.querySelectorAll('.overlay-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.remove('expanded');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.interior-2').classList.add('expanded');
    }, 5000); // delay in ms

    // wire up each close button
    document.querySelectorAll('.overlay-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.remove('expanded');
        });
    });
});