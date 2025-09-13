// LuxeMarket Login page functionality
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
    const keepSignedInCheckbox = document.getElementById('keepSignedIn');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const createAccountLink = document.getElementById('createAccountLink');

    // Application data from JSON
    const appData = {
        brandInfo: {
            name: "LuxeMarket",
            tagline: "Where Premium Meets Convenience",
            logoIcon: "fas fa-gem"
        },
        formFields: {
            email: {
                label: "Email Address",
                placeholder: "Enter your email address",
                type: "email",
                required: true,
                icon: "fas fa-envelope"
            },
            password: {
                label: "Password",
                placeholder: "Enter your password",
                type: "password",
                required: true,
                icon: "fas fa-lock"
            }
        },
        formOptions: {
            keepSignedIn: "Keep me signed in",
            submitButton: "Sign In to Your Account",
            forgotPassword: "Forgot your password?",
            createAccount: "Don't have an account? Create one now"
        },
        validationMessages: {
            emptyEmail: "Please enter your email address",
            invalidEmail: "Please enter a valid email address",
            emptyPassword: "Please enter your password",
            shortPassword: "Password must be at least 6 characters",
            signInSuccess: "Welcome back! Signing you in...",
            signInError: "Invalid credentials. Please try again."
        },
        trustIndicators: {
            security: "🔒 Secured with 256-bit SSL encryption",
            privacy: "Your data is protected and never shared"
        },
        demoCredentials: {
            email: "demo@luxemarket.com",
            password: "demo123"
        }
    };

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Password validation function
    function isValidPassword(password) {
        return password && password.length >= 6;
    }

    // Show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        const inputElement = errorElement.parentElement.querySelector('.form-control');
        if (inputElement) {
            inputElement.style.borderColor = 'var(--color-error)';
            inputElement.setAttribute('aria-invalid', 'true');
        }
    }

    // Clear error message
    function clearError(errorElement) {
        errorElement.textContent = '';
        const inputElement = errorElement.parentElement.querySelector('.form-control');
        if (inputElement) {
            inputElement.style.borderColor = '';
            inputElement.removeAttribute('aria-invalid');
        }
    }

    // Show success/error message in container
    function showMessage(message, type = 'error') {
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
        messageContainer.setAttribute('role', type === 'error' ? 'alert' : 'status');
    }

    // Hide message container
    function hideMessage() {
        messageContainer.className = 'message-container hidden';
        messageContainer.removeAttribute('role');
    }

    // Validate individual field
    function validateField(field, value) {
        switch (field) {
            case 'email':
                if (!value.trim()) {
                    return appData.validationMessages.emptyEmail;
                }
                if (!isValidEmail(value.trim())) {
                    return appData.validationMessages.invalidEmail;
                }
                return null;
            
            case 'password':
                if (!value.trim()) {
                    return appData.validationMessages.emptyPassword;
                }
                if (!isValidPassword(value.trim())) {
                    return appData.validationMessages.shortPassword;
                }
                return null;
            
            default:
                return null;
        }
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;
        
        // Clear previous errors and messages
        clearError(emailError);
        clearError(passwordError);
        hideMessage();

        // Validate email
        const email = emailInput.value.trim();
        const emailValidationError = validateField('email', email);
        if (emailValidationError) {
            showError(emailError, emailValidationError);
            isValid = false;
        }

        // Validate password
        const password = passwordInput.value.trim();
        const passwordValidationError = validateField('password', password);
        if (passwordValidationError) {
            showError(passwordError, passwordValidationError);
            isValid = false;
        }

        return isValid;
    }

    // Show loading state
    function showLoading() {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        loginBtn.setAttribute('aria-busy', 'true');
        btnSpinner.classList.remove('hidden');
    }

    // Hide loading state
    function hideLoading() {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        loginBtn.removeAttribute('aria-busy');
        btnSpinner.classList.add('hidden');
    }

    // Mock login function (simulates API call)
    function mockLogin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Check demo credentials or any valid email with demo password
                const isValidDemo = (email === appData.demoCredentials.email && password === appData.demoCredentials.password);
                const isValidGeneric = (isValidEmail(email) && password === 'password123');
                
                if (isValidDemo || isValidGeneric) {
                    resolve({ 
                        success: true, 
                        message: appData.validationMessages.signInSuccess,
                        user: { email: email, name: email.split('@')[0] }
                    });
                } else {
                    reject({ 
                        success: false, 
                        message: appData.validationMessages.signInError 
                    });
                }
            }, 1800); // Simulate realistic network delay
        });
    }

    // Handle form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Validate form first
        if (!validateForm()) {
            // Focus on first invalid field
            if (emailError.textContent) {
                emailInput.focus();
            } else if (passwordError.textContent) {
                passwordInput.focus();
            }
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const keepSignedIn = keepSignedInCheckbox.checked;

        // Show loading immediately after validation passes
        showLoading();

        try {
            const result = await mockLogin(email, password);
            
            // Handle keep me signed in functionality
            if (keepSignedIn && typeof(Storage) !== "undefined") {
                localStorage.setItem('luxemarket_remembered_email', email);
                localStorage.setItem('luxemarket_keep_signed_in', 'true');
            } else if (typeof(Storage) !== "undefined") {
                localStorage.removeItem('luxemarket_remembered_email');
                localStorage.removeItem('luxemarket_keep_signed_in');
            }

            showMessage(result.message, 'success');
            
            // Simulate successful sign-in process
            setTimeout(() => {
                showMessage(`Welcome to ${appData.brandInfo.name}! Redirecting to your dashboard...`, 'success');
            }, 1500);

        } catch (error) {
            showMessage(error.message, 'error');
        } finally {
            hideLoading();
        }
    });

    // Password visibility toggle
    passwordToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        passwordToggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
        
        // Update aria-label for accessibility
        this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        
        // Maintain focus on password input
        passwordInput.focus();
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
        const validationError = validateField('email', email);
        if (validationError) {
            showError(emailError, validationError);
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        const password = this.value.trim();
        clearError(passwordError);
        
        if (password && !isValidPassword(password)) {
            showError(passwordError, appData.validationMessages.shortPassword);
        }
    });

    passwordInput.addEventListener('blur', function() {
        const password = this.value.trim();
        const validationError = validateField('password', password);
        if (validationError) {
            showError(passwordError, validationError);
        }
    });

    // Clear errors when user focuses on inputs
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
            showMessage('Password reset link would be sent to your email. Please check your inbox and spam folder.', 'success');
        }, 100);
    });

    // Handle create account link
    createAccountLink.addEventListener('click', function(e) {
        e.preventDefault();
        hideMessage();
        setTimeout(() => {
            showMessage('Registration page would open here. You would be able to create a new LuxeMarket account.', 'success');
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
            clearError(emailError);
            clearError(passwordError);
        }
    });

    // Handle checkbox keyboard interaction
    keepSignedInCheckbox.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.checked = !this.checked;
        }
    });

    // Initialize remember me from localStorage (if available)
    if (typeof(Storage) !== "undefined") {
        const rememberedEmail = localStorage.getItem('luxemarket_remembered_email');
        const keepSignedInPref = localStorage.getItem('luxemarket_keep_signed_in');
        
        if (rememberedEmail && keepSignedInPref === 'true') {
            emailInput.value = rememberedEmail;
            keepSignedInCheckbox.checked = true;
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
            max-width: 300px;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        demoHint.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--space-8); margin-bottom: var(--space-8);">
                <i class="fas fa-info-circle" style="color: var(--color-primary);"></i>
                <strong style="color: var(--color-text);">Demo Credentials</strong>
            </div>
            <div style="margin-bottom: var(--space-4);">
                <strong>Email:</strong> ${appData.demoCredentials.email}
            </div>
            <div style="margin-bottom: var(--space-4);">
                <strong>Password:</strong> ${appData.demoCredentials.password}
            </div>
            <small style="opacity: 0.8;">Or use any valid email with password "password123"</small>
        `;
        document.body.appendChild(demoHint);

        // Remove hint after 10 seconds or on click
        const removeHint = () => {
            if (demoHint.parentNode) {
                demoHint.style.transform = 'translateX(100%)';
                demoHint.style.opacity = '0';
                setTimeout(() => demoHint.remove(), 300);
            }
        };

        setTimeout(removeHint, 10000);
        demoHint.addEventListener('click', removeHint);
    }, 2500);

    // Form accessibility enhancements
    loginForm.setAttribute('novalidate', 'true'); // Disable native validation
    loginForm.setAttribute('role', 'form');
    loginForm.setAttribute('aria-label', 'Sign in form');

    // Associate error messages with inputs
    emailInput.setAttribute('aria-describedby', 'emailError');
    passwordInput.setAttribute('aria-describedby', 'passwordError');

    // Initialize page state
    console.log(`${appData.brandInfo.name} login page loaded successfully`);
    
    // Focus management - focus on appropriate field
    setTimeout(() => {
        if (!emailInput.value) {
            emailInput.focus();
        } else {
            passwordInput.focus();
        }
    }, 100);

    // Form analytics (mock)
    let formInteractions = {
        emailFocused: false,
        passwordFocused: false,
        submitAttempts: 0
    };

    emailInput.addEventListener('focus', () => {
        formInteractions.emailFocused = true;
    });

    passwordInput.addEventListener('focus', () => {
        formInteractions.passwordFocused = true;
    });

    loginForm.addEventListener('submit', () => {
        formInteractions.submitAttempts++;
        console.log('Form interaction data:', formInteractions);
    });

    // Performance monitoring (mock)
    const startTime = performance.now();
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    });
});