document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
    let status = document.getElementById("form-status");

    if(!name || !phone || !message){
        status.textContent = "Please fill all fields!";
        status.style.color = "red";
        return;
    }

    // Create message
    let fullMessage = `Hello, my name is ${name}%0A
    Phone: ${phone}%0A
    Message: ${message}`;

    let yourNumber = "233557078148";

    // Open SMS
    window.open(`sms:${yourNumber}?body=${fullMessage}`);

    // Feedback
    status.textContent = "Message ready! Opening SMS...";
    status.style.color = "#f1c40f";

    // Reset form
    document.getElementById("contactForm").reset();

});