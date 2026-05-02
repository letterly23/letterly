let currentLink = "";

// suggestion autofill
document.getElementById("suggestion").addEventListener("change", function() {
    document.getElementById("message").value = this.value;
});

// form submit
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

    // create link
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

    if (!currentLink) return alert("Create first");

    navigator.clipboard.writeText(currentLink);
    alert("Link copied!");
});

// download
document.getElementById("downloadBtn").addEventListener("click", function() {

    let card = document.getElementById("card");

    if (!card.innerHTML) return alert("Create first");

    html2canvas(card).then(canvas => {
        let link = document.createElement("a");
        link.download = "letter.png";
        link.href = canvas.toDataURL();
        link.click();
    });
});

// load from link
window.onload = function () {

    let params = new URLSearchParams(window.location.search);

    let name = params.get("name");
    let msg = params.get("msg");
    let theme = params.get("theme");
    let end = params.get("end");

    if (name || msg) {

        document.getElementById("name").value = name || "";
        document.getElementById("message").value = msg || "";
        document.getElementById("theme").value = theme || "romantic";
        document.getElementById("ending").value = end || "";

        document.getElementById("letterForm").dispatchEvent(new Event("submit"));
    }
};