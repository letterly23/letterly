let currentLink = "";

// NAV
function showCard() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cardEditor").style.display = "block";
    document.getElementById("letterEditor").style.display = "none";
}

function showLetter() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cardEditor").style.display = "none";
    document.getElementById("letterEditor").style.display = "block";
}

// suggestion
document.getElementById("suggestion").addEventListener("change", function() {
    document.getElementById("message").value = this.value;
});

// CARD
document.getElementById("letterForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value || "Someone";
    let message = document.getElementById("message").value;
    let theme = document.getElementById("theme").value;
    let ending = document.getElementById("ending").value || "Always yours";

    let emoji = "💖";
    if (theme === "flower") emoji = "🌸";
    else if (theme === "romantic") emoji = "💌";
    else if (theme === "aesthetic") emoji = "✨";

    let card = document.getElementById("card");
    card.className = theme;

    card.innerHTML =
        "<h2>" + name + "</h2>" +
        "<div style='font-size:24px'>" + emoji + "</div>" +
        "<p>" + message + "</p>" +
        "<p>— " + ending + "</p>";

    createLink(name, message, theme, ending, "card");

    document.getElementById("cardEditor").style.display = "none";
    document.getElementById("actions").style.display = "block";
});

// LETTER
function generateLetter() {

    let name = document.getElementById("letterName").value || "Someone";
    let text = document.getElementById("letterText").value;
    let ending = document.getElementById("letterEnding").value || "Always yours";

    let today = new Date().toLocaleDateString();

    let card = document.getElementById("card");
    card.className = "letter";

    card.innerHTML =
        "<p style='text-align:right; font-size:12px; opacity:0.6;'>" + today + "</p>" +
        "<p>Dear " + name + ",</p>" +
        "<p style='margin:30px 0; font-family:Dancing Script; font-size:22px;'>" + text + "</p>" +
        "<p style='text-align:right; font-family:Great Vibes; font-size:26px;'>— " + ending + "</p>";

    createLink(name, text, "", ending, "letter");

    document.getElementById("letterEditor").style.display = "none";
    document.getElementById("actions").style.display = "block";
}

// LINK
function createLink(name, msg, theme, end, mode) {
    let base = window.location.origin + window.location.pathname;

    currentLink = base +
        "?name=" + encodeURIComponent(name) +
        "&msg=" + encodeURIComponent(msg) +
        "&theme=" + theme +
        "&end=" + encodeURIComponent(end) +
        "&mode=" + mode;

    window.history.replaceState(null, "", currentLink);
}

// SHARE
document.getElementById("shareBtn").onclick = function() {
    navigator.clipboard.writeText(currentLink);
    alert("Link copied!");
};

// DOWNLOAD
document.getElementById("downloadBtn").onclick = function() {
    html2canvas(document.getElementById("card")).then(canvas => {
        let link = document.createElement("a");
        link.download = "letter.png";
        link.href = canvas.toDataURL();
        link.click();
    });
};

// LOAD LINK
window.onload = function () {

    let params = new URLSearchParams(window.location.search);

    let name = params.get("name");
    let msg = params.get("msg");
    let theme = params.get("theme");
    let end = params.get("end");
    let mode = params.get("mode");

    if (!name && !msg) return;

    document.body.classList.add("view-mode");

    let card = document.getElementById("card");

    if (mode === "letter") {

        let today = new Date().toLocaleDateString();

        card.className = "letter";

        card.innerHTML =
            "<p style='text-align:right; font-size:12px; opacity:0.6;'>" + today + "</p>" +
            "<p>Dear " + name + ",</p>" +
            "<p style='margin:30px 0; font-family:Dancing Script; font-size:20px;'>" + msg + "</p>" +
            "<p style='text-align:right; font-family:Great Vibes; font-size:26px;'>— " + end + "</p>";

    } else {

        card.className = theme;

        card.innerHTML =
            "<h2>" + name + "</h2>" +
            "<p>" + msg + "</p>" +
            "<p>— " + end + "</p>";
    }
};