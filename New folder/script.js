document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const toggleToSignup = document.getElementById('toggle-signup');
    const toggleToLogin = document.getElementById('toggle-login');
    const loginMsg = document.getElementById('login-message');
    const signupMsg = document.getElementById('signup-message');

    // Show signup form
    toggleToSignup.addEventListener('click', function() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginMsg.textContent = '';
        signupMsg.textContent = '';
    });

    // Show login form
    toggleToLogin.addEventListener('click', function() {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        loginMsg.textContent = '';
        signupMsg.textContent = '';
    });

    // Handle login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = loginForm.username.value;
        const password = loginForm.password.value;
        const stored = localStorage.getItem('user_' + username);
        if (stored) {
            const user = JSON.parse(stored);
            if (user.password === password) {
                loginMsg.textContent = 'Login successful!';
                loginMsg.className = 'success-message';
            } else {
                loginMsg.textContent = 'Incorrect password.';
                loginMsg.className = 'error-message';
            }
        } else {
            loginMsg.textContent = 'User not found.';
            loginMsg.className = 'error-message';
        }
    });

    // Handle signup
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = signupForm.username.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;
        if (localStorage.getItem('user_' + username)) {
            signupMsg.textContent = 'Username already exists.';
            signupMsg.className = 'error-message';
            return;
        }
        localStorage.setItem('user_' + username, JSON.stringify({ username, email, password }));
        signupMsg.textContent = 'Signup successful! You can now log in.';
        signupMsg.className = 'success-message';
        signupForm.reset();
    });
});
