document.addEventListener('DOMContentLoaded', () => {
    // Function to show a modal with a specific message
    function showModal(message) {
        const modalHtml = `
            <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title nav-font" id="profileModalLabel">Notification</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body content-text">
                            ${message}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = new bootstrap.Modal(document.getElementById('profileModal'));
        modal.show();
    }

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for successful signup
    const signupSuccess = urlParams.get('signup_success');
    if (signupSuccess === 'True') {
        showModal("Your account has been created successfully! You can now log in to comment on articles and book court times.");
    }

    // Check for successful login
    const loginSuccess = urlParams.get('login_success');
    if (loginSuccess === 'True') {
        showModal("Welcome back! You can now comment on articles and book court times.");
    }
});
