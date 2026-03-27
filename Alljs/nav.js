setTimeout(() => {
    // --- 1. SELECTIONS ---
    const hamburger = document.querySelector(".hamburger");
    const closeMenu = document.querySelector(".close-menu");
    const navLinks = document.querySelector(".nav-links");
    const logo = document.querySelector(".logo");
    const searchBox = document.querySelector('.search-box');
    const searchIcon = document.getElementById('toggleSearch');
    const searchInput = document.getElementById('searchInput');
    const productGrid = document.querySelector('.product-grid');
    
    // Elements to hide/show during search
    const sectionsToHide = [
        document.getElementById('hero'),
        document.getElementById('services'),
        document.getElementById('contact'),
        document.getElementById('footer')
    ];

    // Titles and Intro text to hide for a clean search view
    const extraUIs = document.querySelectorAll('.product-title, .services-intro, .services-section h2, .work-title, .work-intro, .accessories-section h2, .upgrade, .view-all-accessories');
    const servicesGrid = document.querySelector('.services-grid'); // Hide regular services grid

    if (!hamburger || !searchInput) return;

    // --- 2. HELPER FUNCTION TO RESET VIEW ---
    function resetLayout() {
        logo.classList.remove("hide");
        if (window.innerWidth <= 992) hamburger.style.display = "block";
        
        // Show all main sections
        sectionsToHide.forEach(section => { if(section) section.style.display = ""; });
        
        // Show all titles/intros
        extraUIs.forEach(el => { if(el) el.style.display = ""; });
        if(servicesGrid) servicesGrid.style.display = "";
    }

    // --- 3. MOBILE MENU LOGIC ---
    hamburger.addEventListener("click", function() {
        navLinks.classList.add("show");
        closeMenu.style.display = "block";
        hamburger.style.display = "none";
        logo.classList.add("hide");
        searchBox.classList.add("hide"); 
    });

    closeMenu.addEventListener("click", function() {
        navLinks.classList.remove("show");
        closeMenu.style.display = "none";
        resetLayout();
        searchBox.classList.remove("hide");
    });

    // --- 4. SEARCH BOX VISIBILITY ---
    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            
            if (searchBox.classList.contains('active')) {
                logo.classList.add("hide");
                hamburger.style.display = "none";
                searchInput.focus();
            } else {
                searchInput.value = ""; 
                triggerSearch(""); 
                resetLayout();
            }
        });
    }

    // --- 5. LIVE SEARCH & GLOBAL HIDING ---
    function triggerSearch(term) {
        const isSearching = term.length > 0;

        // Hide UI elements if user is typing
        sectionsToHide.forEach(section => {
            if(section) section.style.display = isSearching ? "none" : "";
        });
        extraUIs.forEach(el => {
            if(el) el.style.display = isSearching ? "none" : "";
        });
        if(servicesGrid) servicesGrid.style.display = isSearching ? "none" : "";

        let visibleItemsCount = 0;

        // Filter 1: Main Products
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            const desc = product.querySelector('p').textContent.toLowerCase();
            const match = title.includes(term) || desc.includes(term);
            product.style.display = match ? 'block' : 'none';
            if(match) visibleItemsCount++;
        });

        // Filter 2: Accessories
        const accessories = document.querySelectorAll('.accessory-card');
        accessories.forEach(acc => {
            const title = acc.querySelector('h4').textContent.toLowerCase();
            const match = title.includes(term);
            acc.style.display = match ? 'block' : 'none';
            if(match) visibleItemsCount++;
        });

        // Filter 3: Recent Work (Showcase)
        const works = document.querySelectorAll('.work-card');
        works.forEach(work => {
            const text = work.querySelector('p').textContent.toLowerCase();
            const match = text.includes(term);
            work.style.display = match ? 'block' : 'none';
            if(match) visibleItemsCount++;
        });

        // Handle "No Results" message
        let msg = document.querySelector('.no-results-msg');
        if (visibleItemsCount === 0 && isSearching) {
            if (!msg && productGrid) {
                msg = document.createElement('p');
                msg.className = 'no-results-msg';
                msg.style.cssText = "grid-column: 1/-1; text-align: center; padding: 40px; color: #333; font-weight: bold; font-size: 1.2rem;"; 
                msg.textContent = "No products or projects found matching your search.";
                productGrid.parentNode.insertBefore(msg, productGrid);
            }
        } else if (msg) {
            msg.remove();
        }
    }

    searchInput.addEventListener('keyup', (e) => {
        triggerSearch(e.target.value.toLowerCase());
    });

    // --- 6. CLICK OUTSIDE TO CLOSE ---
    document.addEventListener('click', (e) => {
        if (searchBox && !searchBox.contains(e.target) && searchBox.classList.contains('active')) {
            searchBox.classList.remove('active');
            searchInput.value = ""; 
            triggerSearch(""); 
            resetLayout();
        }
    });

    // --- 7. NAV LINK CLICKS ---
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
            closeMenu.style.display = "none";
            resetLayout();
            searchBox.classList.remove("hide");
        });
    });

    // --- 8. WINDOW RESIZE ---
    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) {
            navLinks.classList.remove("show");
            closeMenu.style.display = "none";
            hamburger.style.display = "none";
            logo.classList.remove("hide");
            searchBox.classList.remove("hide");
            if (!searchBox.classList.contains("active")) resetLayout();
        } else {
            if (!navLinks.classList.contains("show") && !searchBox.classList.contains('active')) {
                hamburger.style.display = "block";
            }
        }
    });

}, 100);



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

        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if user exists
        const user = users.find(user => user.email === email);

        if (!user) {
            alert("Account not found ❌ Please register first");
            return;
        }

        // Check password
        if (user.password !== password) {
            alert("Incorrect password ❌");
            return;
        }

        alert("Login successful ✅ Welcome " + user.name);

        authModal.classList.remove("show");
        loginFormEl.reset();
    });
}


// REGISTER
// REGISTER
const registerFormEl = document.getElementById("registerForm");

if (registerFormEl) {
    registerFormEl.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();
        const confirm = document.getElementById("regConfirm").value.trim();

        if (!name || !email || !password || !confirm) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirm) {
            alert("Passwords do not match ❌");
            return;
        }

        // Check if user already exists
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.email === email);

        if (userExists) {
            alert("Account already exists. Please login.");
            return;
        }

        // Save user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful 🎉");

        registerFormEl.reset();

        // Switch to login
        registerForm.classList.remove("active");
        loginForm.classList.add("active");
    });
}