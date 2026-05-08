let currentLink = "";

/* DATE */

document.getElementById("liveDate").innerText =
new Date().toLocaleDateString();

/* NAVIGATION */

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

/* MESSAGE PICKER */

document.getElementById("suggestion").addEventListener("change", function () {

    document.getElementById("message").value = this.value;
});

/* CARD */

document.getElementById("letterForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value || "Someone";

    let message = document.getElementById("message").value;

    let theme = document.getElementById("theme").value;

    let ending = document.getElementById("ending").value || "Always yours";

    let emoji = "💖";

    if(theme === "flower") emoji = "🌸";

    if(theme === "aesthetic") emoji = "✨";

    if(theme === "dark") emoji = "🌙";

    let card = document.getElementById("card");

    card.className = theme;

    card.innerHTML = `
        <h2>${name}</h2>
        <div style="font-size:50px">${emoji}</div>
        <p style="font-size:22px">${message}</p>
        <p>— ${ending}</p>
    `;

    document.getElementById("cardEditor").style.display = "none";

    document.getElementById("actions").style.display = "block";
});

/* LETTER */

function generateLetter() {

    let name =
    document.getElementById("letterName").value || "Someone";

    let text =
    document.getElementById("letterText").value;

    let words = text.trim().split(/\s+/);

    if(words.length > 320) {

        alert("Your letter is too long for one paper 💌");

        return;
    }

    let ending =
    document.getElementById("letterEnding").value;

    let today =
    new Date().toLocaleDateString();

    let card =
    document.getElementById("card");

    card.className = "letter";

    card.innerHTML = `
        <div class="date">${today}</div>

        <div class="dear">Dear ${name},</div>

        <div class="body">${text}</div>

        ${ending ? `<div class="sign">— ${ending}</div>` : ""}
    `;

    document.getElementById("letterEditor").style.display = "none";

    document.getElementById("actions").style.display = "block";
}

/* COPY LINK */

document.getElementById("shareBtn").onclick = function () {

    navigator.clipboard.writeText(window.location.href);

    alert("Link copied 💌");
};

/* DOWNLOAD */

document.getElementById("downloadBtn").onclick = function () {

    html2canvas(document.getElementById("card"), {

        scale: 3,

        useCORS: true

    }).then(canvas => {

        let link = document.createElement("a");

        link.download = "letterly.png";

        link.href = canvas.toDataURL();

        link.click();
    });
};