// Authentication Guard and Login Form Classes

class AuthGuard {
    static ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };
    
    static AUTH_KEY = 'admin_auth';
    
    static authenticate(username, password) {
        return username === this.ADMIN_CREDENTIALS.username && 
               password === this.ADMIN_CREDENTIALS.password;
    }
    
    static login(username) {
        const authData = {
            isAuthenticated: true,
            loginTime: new Date().toISOString(),
            username: username
        };
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(authData));
        return true;
    }
    
    static logout() {
        sessionStorage.removeItem(this.AUTH_KEY);
        window.location.href = 'login.html';
    }
    
    static isAuthenticated() {
        const authData = sessionStorage.getItem(this.AUTH_KEY);
        if (!authData) return false;
        
        try {
            const parsed = JSON.parse(authData);
            return parsed.isAuthenticated === true;
        } catch (e) {
            return false;
        }
    }
    
    static getCurrentUser() {
        const authData = sessionStorage.getItem(this.AUTH_KEY);
        if (!authData) return null;
        
        try {
            const parsed = JSON.parse(authData);
            return parsed.username;
        } catch (e) {
            return null;
        }
    }
    
    static requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

class LoginForm {
    constructor() {
        this.form = null;
        this.usernameField = null;
        this.passwordField = null;
        this.errorElement = null;
    }
    
    init() {
        this.form = document.getElementById('loginForm');
        this.usernameField = document.getElementById('username');
        this.passwordField = document.getElementById('password');
        this.errorElement = document.getElementById('loginError');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Clear any existing auth if on login page
        if (window.location.pathname.includes('login.html')) {
            sessionStorage.removeItem(AuthGuard.AUTH_KEY);
        }
        
        // Focus on username field
        if (this.usernameField) {
            this.usernameField.focus();
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        
        const username = this.usernameField.value.trim();
        const password = this.passwordField.value.trim();
        
        // Clear previous errors
        this.clearErrors();
        
        // Validate fields
        if (!username) {
            this.showFieldError('usernameError', 'Vui lòng nhập tên đăng nhập');
            return;
        }
        
        if (!password) {
            this.showFieldError('passwordError', 'Vui lòng nhập mật khẩu');
            return;
        }
        
        // Authenticate
        if (AuthGuard.authenticate(username, password)) {
            AuthGuard.login(username);
            window.location.href = 'admin.html';
        } else {
            this.showError('Sai tài khoản hoặc mật khẩu');
        }
    }
    
    showError(message) {
        if (this.errorElement) {
            this.errorElement.textContent = message;
            this.errorElement.style.display = 'block';
        }
    }
    
    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(fieldId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }
}

// Auto-redirect if already authenticated and on login page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('login.html') && AuthGuard.isAuthenticated()) {
        window.location.href = 'admin.html';
    }
});