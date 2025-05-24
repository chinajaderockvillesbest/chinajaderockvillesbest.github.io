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

document.addEventListener('DOMContentLoaded', function() {
    const rewardsForm = document.getElementById('rewards-form');
    let messageContainer = rewardsForm.nextElementSibling; // Check after the form

    if (!messageContainer || !messageContainer.classList.contains('alert')) {
        messageContainer = document.createElement('div');
        rewardsForm.parentNode.insertBefore(messageContainer, rewardsForm.nextSibling); // Insert after the form
        messageContainer.classList.add('mt-2', 'fade');
        messageContainer.setAttribute('role', 'alert');
    }

    rewardsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('rw-name').value;
        const email = document.getElementById('rw-email').value;
        const phone = document.getElementById('rw-phone').value;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);

        let retryCount = 0;
        const maxRetries = 3;
        const initialDelay = 1000;

        function showMessage(message, isSuccess) {
            messageContainer.textContent = message;
            messageContainer.classList.remove('alert-success', 'alert-danger', 'show');
            messageContainer.classList.add('alert', isSuccess ? 'alert-success' : 'alert-danger', 'show');
        }

        function sendDataWithRetry() {
            fetch('js/send_signup_email.php', {
                method: 'POST',
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log(data);
                    rewardsForm.reset();
                    showMessage('Thank you for signing up!', true);
                })
                .catch(error => {
                    console.error('Error sending data:', error);
                    retryCount++;
                    if (retryCount < maxRetries) {
                        const delay = initialDelay * Math.pow(2, retryCount - 1);
                        console.log(`Retrying in ${delay / 1000} seconds... (Attempt ${retryCount}/${maxRetries})`);
                        setTimeout(sendDataWithRetry, delay);
                    } else {
                        console.error('Max retries reached. Submission failed.');
                        showMessage('An error occurred during signup. Please try again.', false);
                    }
                });
        }

        showMessage('Processing...', false); // Initial processing message
        sendDataWithRetry();
    });
});