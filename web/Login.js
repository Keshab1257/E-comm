// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnSpinner = loginBtn.querySelector('.btn-spinner');
    const messageContainer = document.getElementById('messageContainer');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordToggleIcon = document.getElementById('passwordToggleIcon');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const signupLink = document.getElementById('signupLink');

    // Application data from JSON
    const appData = {
        brandName: "ShopElite",
        loginPlaceholders: {
            email: "Enter your email address",
            password: "Enter your password"
        },
        validationMessages: {
            emptyEmail: "Please enter your email address",
            invalidEmail: "Please enter a valid email address",
            emptyPassword: "Please enter your password",
            loginSuccess: "Login successful! Redirecting...",
            loginError: "Invalid email or password. Please try again."
        },
        links: {
            forgotPassword: "Forgot your password?",
            signUp: "Don't have an account? Sign up here",
            termsOfService: "Terms of Service",
            privacyPolicy: "Privacy Policy"
        }
    };

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        const inputElement = errorElement.parentElement.querySelector('.form-control');
        if (inputElement) {
            inputElement.style.borderColor = 'var(--color-error)';
        }
    }

    // Clear error message
    function clearError(errorElement) {
        errorElement.textContent = '';
        const inputElement = errorElement.parentElement.querySelector('.form-control');
        if (inputElement) {
            inputElement.style.borderColor = '';
        }
    }

    // Show success/error message in container
    function showMessage(message, type = 'error') {
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
    }

    // Hide message container
    function hideMessage() {
        messageContainer.className = 'message-container hidden';
    }

    // Validate form fields
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors and messages
        clearError(emailError);
        clearError(passwordError);
        hideMessage();

        // Validate email
        const email = emailInput.value.trim();
        if (!email) {
            showError(emailError, appData.validationMessages.emptyEmail);
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailError, appData.validationMessages.invalidEmail);
            isValid = false;
        }

        // Validate password
        const password = passwordInput.value.trim();
        if (!password) {
            showError(passwordError, appData.validationMessages.emptyPassword);
            isValid = false;
        }

        return isValid;
    }

    // Show loading state
    function showLoading() {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        btnSpinner.classList.remove('hidden');
    }

    // Hide loading state
    function hideLoading() {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        btnSpinner.classList.add('hidden');
    }

    loginForm.addEventListener('submit', function(e) {
    if (!validateForm()) {
        e.preventDefault(); // block only if invalid
        return;
    }
    // ✅ No mockLogin here, let the form submit naturally to LoginServlet
    showLoading();
});


    // Password visibility toggle
    passwordToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    });

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        const email = this.value.trim();
        clearError(emailError); // Clear previous errors first
        
        if (email && !isValidEmail(email)) {
            showError(emailError, appData.validationMessages.invalidEmail);
        }
    });

    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (!email) {
            showError(emailError, appData.validationMessages.emptyEmail);
        } else if (!isValidEmail(email)) {
            showError(emailError, appData.validationMessages.invalidEmail);
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('blur', function() {
        const password = this.value.trim();
        if (!password) {
            showError(passwordError, appData.validationMessages.emptyPassword);
        }
    });

    // Clear errors when user starts typing
    emailInput.addEventListener('focus', function() {
        clearError(emailError);
        hideMessage();
    });

    passwordInput.addEventListener('focus', function() {
        clearError(passwordError);
        hideMessage();
    });

    // Handle forgot password link
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideMessage();
        setTimeout(() => {
            showMessage('Password reset functionality would be available here. Check your email for reset instructions.', 'success');
        }, 100);
    });

    // Handle sign up link
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideMessage();
        setTimeout(() => {
            showMessage('Sign up page would be available here. You would be redirected to create a new account.', 'success');
        }, 100);
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Allow Enter to submit form when focused on inputs
        if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }

        // Allow Escape to clear messages
        if (e.key === 'Escape') {
            hideMessage();
        }
    });

    // Handle checkbox keyboard interaction
    rememberMeCheckbox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.checked = !this.checked;
        }
    });

    // Initialize remember me from localStorage (if available)
    if (typeof(Storage) !== "undefined") {
        const rememberedEmail = localStorage.getItem('shopelite_remembered_email');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
        }
    }

    // Add demo credentials hint
    setTimeout(() => {
        const demoHint = document.createElement('div');
        demoHint.className = 'demo-hint';
        demoHint.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-base);
            padding: var(--space-12);
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            box-shadow: var(--shadow-md);
            max-width: 280px;
            z-index: 1000;
        `;
        demoHint.innerHTML = `
            <strong style="color: var(--color-text);">Demo Credentials:</strong><br>
            Email: demo@shopelite.com<br>
            Password: demo123<br>
            <small>Or any valid email with password "password123"</small>
        `;
        document.body.appendChild(demoHint);

        // Remove hint after 8 seconds
        setTimeout(() => {
            if (demoHint.parentNode) {
                demoHint.remove();
            }
        }, 8000);
    }, 2000);

    // Initialize page
    console.log('ShopElite login page loaded successfully');
    
    // Focus on email input if not pre-filled
    setTimeout(() => {
        if (!emailInput.value) {
            emailInput.focus();
        } else {
            passwordInput.focus();
        }
    }, 100);
});