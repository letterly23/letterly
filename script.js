// FORM SUBMIT (creates card)
document.getElementById("letterForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let messageBox = document.getElementById("message").value.trim();
    let suggestion = document.getElementById("suggestion").value;
    let message = messageBox !== "" ? messageBox : suggestion;
    let theme = document.getElementById("theme").value;
    let ending = document.getElementById("ending").value.trim();

    // defaults (important)
    if (name === "") name = "Someone special 💖";
    if (message === "") message = "You mean a lot to me ❤️";
    if (ending === "") ending = "Always yours 💌";

    let card = document.getElementById("card");

    // apply theme
    card.className = theme;

    // better emoji logic (cleaner)
    let emoji = "";
    if (theme === "flower") {
        emoji = "🌸";
    } else if (theme === "romantic") {
        emoji = "❤️";
    } else {
        emoji = "✨";
    }
    // generate card
    card.innerHTML =
    "<div class='card-content'>" +

    "<h2>" + name + " 💖</h2>" +

    "<div style='font-size:26px; margin:5px 0; letter-spacing:5px;'>" + emoji + "</div>" +

    "<p>" + message + "</p>" +

    "<p style='margin-top:10px; opacity:0.8;'>— " + ending + "</p>" +

    "</div>";
});


// DOWNLOAD BUTTON
document.getElementById("downloadBtn").addEventListener("click", function() {

    let card = document.getElementById("card");

    // prevent empty download
    if (card.innerHTML.trim() === "") {
        alert("Create a card first!");
        return;
    }

    html2canvas(card).then(function(canvas) {

        let link = document.createElement("a");
        link.download = "love-letter.png";
        link.href = canvas.toDataURL();

        link.click();
    });

});
document.getElementById("copyBtn").addEventListener("click", function() {

    let card = document.getElementById("card").innerText;

    if (card.trim() === "") {
        alert("Create a card first!");
        return;
    }

    navigator.clipboard.writeText(card);

    alert("Copied to clipboard!");
});
document.getElementById("suggestion").addEventListener("change", function() {
    let selectedText = this.value;
    let messageBox = document.getElementById("message");

    if (selectedText !== "") {
        messageBox.value = selectedText;
    }
});