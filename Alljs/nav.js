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
},100);









