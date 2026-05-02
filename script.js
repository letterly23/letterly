let currentLink = "";

// suggestion autofill
document.getElementById("suggestion").addEventListener("change", function() {
    document.getElementById("message").value = this.value;
});

// generate card
document.getElementById("letterForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value || "Someone special";
    let message = document.getElementById("message").value || "You mean a lot 💖";
    let theme = document.getElementById("theme").value;
    let ending = document.getElementById("ending").value || "Always yours 💌";

    let card = document.getElementById("card");
    card.className = theme;

    let emojis = ["💖","💌","✨","🌸","💞"];
    let emoji = emojis[Math.floor(Math.random()*emojis.length)];

    card.innerHTML =
        "<h2>" + name + "</h2>" +
        "<div>" + emoji + "</div>" +
        "<p>" + message + "</p>" +
        "<p>— " + ending + "</p>";

    // create share link
    let base = window.location.origin + window.location.pathname;

    currentLink = base +
        "?name=" + encodeURIComponent(name) +
        "&msg=" + encodeURIComponent(message) +
        "&theme=" + encodeURIComponent(theme) +
        "&end=" + encodeURIComponent(ending);

    // update URL
    window.history.replaceState(null, "", currentLink);
});

// copy link
document.getElementById("shareBtn").addEventListener("click", function() {

    if (!currentLink) {
        alert("Create a card first!");
        return;
    }

    navigator.clipboard.writeText(currentLink);
    alert("Link copied!");
});

// download
document.getElementById("downloadBtn").addEventListener("click", function() {

    let card = document.getElementById("card");

    if (!card.innerHTML) {
        alert("Create a card first!");
        return;
    }

    html2canvas(card).then(canvas => {
        let link = document.createElement("a");
        link.download = "letter.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// LOAD FROM SHARED LINK
window.onload = function () {

    let params = new URLSearchParams(window.location.search);

    let name = params.get("name");
    let msg = params.get("msg");
    let theme = params.get("theme");
    let end = params.get("end");

    let isShared = name || msg;

    if (isShared) {

        // hide editor
        document.getElementById("editor").style.display = "none";
        document.body.classList.add("view-mode");

        // show card
        let card = document.getElementById("card");
        card.className = theme || "romantic";

        card.innerHTML =
            "<h2>" + (name || "") + "</h2>" +
            "<p>" + (msg || "") + "</p>" +
            "<p>— " + (end || "") + "</p>";
    }
};