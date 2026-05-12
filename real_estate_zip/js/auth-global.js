/**
 * GLOBAL LOGIN & AUTH MANAGER
 * Handles authentication across all pages
 */

class AuthManager {
    constructor() {
        this.setupLoginModal();
        this.setupGlobalLoginHandlers();
        this.checkAuthOnPageLoad();
    }

    setupLoginModal() {
        // Create global login modal if it doesn't exist
        if (!document.getElementById('globalLoginModal')) {
            const modalHTML = `
<div class="modal fade" id="globalLoginModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style="border-radius: 15px; border: none; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
            <div class="modal-header" style="border-bottom: 2px solid #2e7d32; background: linear-gradient(135deg, #2e7d32, #1b5e20);">
                <h5 class="modal-title" style="color: white; font-weight: bold;">
                    <i class="fas fa-sign-in-alt"></i> Admin Login
                </h5>
                <button type="button" class="close" data-dismiss="modal" style="color: white;">
                    <span>&times;</span>
                </button>
            </div>
            <div class="modal-body" style="padding: 30px;">
                <form id="globalLoginForm">
                    <div class="form-group mb-3">
                        <label for="globalUsername" style="font-weight: 600; color: #333;">Username</label>
                        <input type="text" class="form-control" id="globalUsername" placeholder="Enter username" required>
                    </div>
                    <div class="form-group mb-3">
                        <label for="globalPassword" style="font-weight: 600; color: #333;">Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" id="globalPassword" placeholder="Enter password" required>
                            <button class="btn btn-outline-secondary" type="button" id="globalTogglePassword">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div id="globalLoginError" class="alert alert-danger" style="display: none; border-radius: 8px;">
                        Invalid username or password
                    </div>
                    <button type="submit" class="btn btn-success w-100" style="background-color: #2e7d32; border: none; padding: 10px; font-weight: 600; border-radius: 8px;">
                        <i class="fas fa-lock-open"></i> Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    setupGlobalLoginHandlers() {
        const form = document.getElementById('globalLoginForm');
        const usernameInput = document.getElementById('globalUsername');
        const passwordInput = document.getElementById('globalPassword');
        const toggleBtn = document.getElementById('globalTogglePassword');
        const errorDiv = document.getElementById('globalLoginError');

        // Password toggle
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                toggleBtn.innerHTML = type === 'password' 
                    ? '<i class="fas fa-eye"></i>' 
                    : '<i class="fas fa-eye-slash"></i>';
            });
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const username = usernameInput.value.trim();
                const password = passwordInput.value;

                if (username === 'Macharia' && password === 'coresphere@123') {
                    localStorage.setItem('adminLoggedIn', 'true');
                    localStorage.setItem('adminUsername', username);
                    localStorage.setItem('loginTime', new Date().toISOString());

                    // Close modal and redirect
                    $('#globalLoginModal').modal('hide');
                    setTimeout(() => {
                        window.location.href = 'admin-dashboard.html';
                    }, 500);
                } else {
                    errorDiv.style.display = 'block';
                    passwordInput.value = '';
                    setTimeout(() => {
                        errorDiv.style.display = 'none';
                    }, 3000);
                }
            });
        }

        // Click all LOGIN links to open modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('a[href="#login"], a[href*="login"], .login-btn, .btn-login')) {
                if (!e.target.href.includes('admin-login')) {
                    e.preventDefault();
                    
                    // Check if already logged in
                    if (localStorage.getItem('adminLoggedIn') === 'true') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        // Show login modal
                        const modal = document.getElementById('globalLoginModal');
                        if (modal) {
                            // Reset form
                            form.reset();
                            errorDiv.style.display = 'none';
                            
                            if ($) {
                                $('#globalLoginModal').modal('show');
                            } else {
                                modal.style.display = 'block';
                            }
                        }
                    }
                }
            }
        });
    }

    checkAuthOnPageLoad() {
        // If on admin pages, check authentication
        const adminPages = ['admin-dashboard', 'admin-images', 'admin-homepage', 'admin-properties', 'admin-agents', 'admin-blog', 'admin-contact', 'admin-settings', 'admin-password'];
        const currentPage = window.location.pathname.split('/').pop().split('.')[0];

        if (adminPages.includes(currentPage) && currentPage !== 'admin-login') {
            if (localStorage.getItem('adminLoggedIn') !== 'true') {
                window.location.href = 'admin-login.html';
            }
        }
    }

    logout() {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('loginTime');
        window.location.href = 'admin-login.html';
    }

    isLoggedIn() {
        return localStorage.getItem('adminLoggedIn') === 'true';
    }

    getUsername() {
        return localStorage.getItem('adminUsername') || '';
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const auth = new AuthManager();
        window.authManager = auth;
    });
} else {
    const auth = new AuthManager();
    window.authManager = auth;
}
