document.addEventListener("click", function(e) {

    // ================= ADD TO CART =================
    if (e.target.classList.contains("adds-to-cart")) {

        let card = e.target.closest(".accessory-card");

        let name = card.querySelector("h4").textContent;

        let price = parseInt(
            card.querySelector(".new-price")
                .textContent.replace("GHS", "")
                .trim()
        );

        let image = card.querySelector("img").src;

        // Make sure cart exists
        if (typeof cart === "undefined") {
            console.error("Cart not found!");
            return;
        }

        // Check if item exists
        let existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        updateCart();

        alert(`${name} added to cart`);
    }


    // ================= VIEW ALL / VIEW LESS =================
    if (e.target.classList.contains("view-all-accessories")) {

        const grid = document.querySelector(".accessories-grid");

        grid.classList.toggle("active");

        if (grid.classList.contains("active")) {
            e.target.textContent = "View Less";
            grid.scrollIntoView({ behavior: "smooth" });
        } else {
            e.target.textContent = "View All";
        }
    }

});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, index * 150);

        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".accessory-card").forEach(card => {
    observer.observe(card);
});
