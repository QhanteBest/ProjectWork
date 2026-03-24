setTimeout(() => {
const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");
if (!hamburger) return;

//Opening menu
hamburger.addEventListener("click", function(){
    navLinks.classList.add("show");
    closeMenu.style.display="block";
    hamburger.style.display="none";
    logo.classList.add("hide");
});

//Closing menu
closeMenu.addEventListener("click", function(){
    navLinks.classList.remove("show");
    closeMenu.style.display="none";
    logo.classList.remove("hide");
    hamburger.style.display = "block";
});

// CLOSE MENU WHEN ANY LINK IS CLICKED (MOBILE)
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        closeMenu.style.display = "none";
        hamburger.style.display = "block";
        logo.classList.remove("hide");
    });
});
},100);

// RESET MENU STATE ON RESIZE (FIX DESKTOP ISSUE)
window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
        const navLinks = document.querySelector(".nav-links");
        const hamburger = document.querySelector(".hamburger");
        const closeMenu = document.querySelector(".close-menu");
        const logo = document.querySelector(".logo");

        navLinks.classList.remove("show");
        closeMenu.style.display = "none";
        hamburger.style.display = "none";
        logo.classList.remove("hide");
    }
});


// ================= AUTH MODAL =================
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

// Open Login
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.classList.add("show");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
});

// Open Register
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    authModal.classList.add("show");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
});

// Close Modal
closeAuth.addEventListener("click", () => {
    authModal.classList.remove("show");
});

// Switch Forms
switchToRegister.addEventListener("click", () => {
    loginForm.classList.remove("active");
    registerForm.classList.add("active");
});

switchToLogin.addEventListener("click", () => {
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
});

// Close when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === authModal) {
        authModal.classList.remove("show");
    }
});


// ================= FORM SUBMISSION =================

// LOGIN
const loginFormEl = document.getElementById("loginForm");

if (loginFormEl) {
    loginFormEl.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }

        alert("Login successful ✅");

        // Close modal
        authModal.classList.remove("show");

        // Reset form
        loginFormEl.reset();
    });
}


// REGISTER
const registerFormEl = document.getElementById("registerForm");

if (registerFormEl) {
    registerFormEl.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const confirm = document.getElementById("regConfirm").value.trim();

        if (name === "" || email === "" || password === "" || confirm === "") {
            alert("Please fill all fields");
            return;
        }
        if (password !== confirm) {
            alert("Passwords do not match ❌");
            return;
        }
        alert("Registration successful 🎉");

        // Switch to login
        registerForm.classList.remove("active");
        loginForm.classList.add("active");

        // Reset form
        registerFormEl.reset();
    });
}