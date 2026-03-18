setTimeout(()=> {

const increaseBtns = document.querySelectorAll(".increase")
const decreaseBtns = document.querySelectorAll(".decrease")
const addToCartBtns = document.querySelectorAll(".add-to-cart")

increaseBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        let input = btn.parentElement.querySelector("input")
        input.value = parseInt(input.value) + 1
    })
})

decreaseBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        let input = btn.parentElement.querySelector("input")
        if(input.value > 1){
            input.value = parseInt(input.value) - 1
        }
    })
})

addToCartBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{

        let card = btn.parentElement

        let name = card.querySelector("h3").textContent
        let price = parseInt(card.querySelector(".price").textContent.replace("GHS","").trim())
        let image = card.querySelector("img").src
        let quantity = parseInt(card.querySelector("input").value)

        if(!quantity || quantity <= 0){
            alert("Enter valid quantity")
            return
        }

        //USE GLOBAL CART
        cart.push({ name, price, image, quantity })

        updateCart()

        alert(quantity + " item(s) added")
    })
})

},100)