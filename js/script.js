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
