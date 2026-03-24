// ================= LOAD COMPONENT =================
function loadComponent(id, htmlFile, jsFile){
    fetch(htmlFile)
    .then(response => response.text())
    .then(data => {
        document.getElementById(id).innerHTML = data;

        if (jsFile) {
            const script = document.createElement("script");
            script.src = jsFile;
            document.body.appendChild(script);
        }

        // Initialize cart UI AFTER component loads
        initCartUI();

    })
    .catch(error => console.error("Error loading component:", error));
}

//Loading html + respective js
loadComponent("navbar", "./OtherHtmlfiles/nav.html", "./Alljs/nav.js");
loadComponent("hero", "./OtherHtmlfiles/hero.html");
loadComponent("products", "./OtherHtmlfiles/products.html", "./Alljs/products.js");
loadComponent("accessories", "./OtherHtmlfiles/accessories.html", "./Alljs/accessories.js");
loadComponent("services", "./OtherHtmlfiles/services.html", "./Alljs/services.js");
loadComponent("contact", "./OtherHtmlfiles/contact.html", "./Alljs/contact.js");
loadComponent("footer", "./OtherHtmlfiles/footer.html", "./Alljs/footer.js");


// ================= CART SYSTEM =================
let cart = []


// ================= UPDATE CART =================
function updateCart(){

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    if(!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}">

            <div>
                <h4>${item.name}</h4>
                <p>GHS ${item.price}</p>
            </div>

            <div class="cart-controls">
                <button onclick="decreaseItem(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseItem(${index})">+</button>
                <button onclick="removeItem(${index})">x</button>
            </div>

        </div>
        `;
    });

    cartTotal.textContent = "GHS " + total;
    cartCount.textContent = count;

    cartCount.style.display = count > 0 ? "flex" : "none";
}


// ================= CART ACTIONS =================
function increaseItem(index){
    cart[index].quantity++;
    updateCart();
}

function decreaseItem(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
    } else {
        if(confirm("Remove this item?")){
            cart.splice(index, 1);
        }
    }
    updateCart();
}

function removeItem(index){
    if(confirm("Delete this item?")){
        cart.splice(index, 1);
        updateCart();
    }
}


// ================= INIT CART UI =================
function initCartUI(){

    let cartBtn = document.querySelector(".cart");
    let closeBtn = document.querySelector(".close-cart");
    let checkoutBtn = document.querySelector(".checkout-btn");

    if(cartBtn){
        cartBtn.onclick = () => {
            document.getElementById("cart-modal").style.display = "flex";
        }
    }

    if(closeBtn){
        closeBtn.onclick = () => {
            document.getElementById("cart-modal").style.display = "none";
        }
    }

    if(checkoutBtn){
        checkoutBtn.onclick = checkoutFunction;
    }
}

// ===CHECKOUT===
function checkoutFunction(){

    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }

    let message = "Hello, I would like to order:\n\n";

    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - GHS ${item.price * item.quantity}\n`;
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    message += `\nTotal: GHS ${total}`;

    let phoneNumber = "233557078148";

    window.open(`sms:${phoneNumber}?body=${encodeURIComponent(message)}`);
}