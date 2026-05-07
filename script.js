let currentLink = "";

/* =========================
   HOME NAVIGATION
========================= */

function showCard() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cardEditor").style.display = "block";
    document.getElementById("letterEditor").style.display = "none";
}

function showLetter() {
    document.getElementById("home").style.display = "none";
    document.getElementById("cardEditor").style.display = "none";
    document.getElementById("letterEditor").style.display = "block";

    let today = new Date().toLocaleDateString();
    document.getElementById("liveDate").innerText = today;
}

/* =========================
   MESSAGE SUGGESTION
========================= */

document.getElementById("suggestion").addEventListener("change", function () {
    document.getElementById("message").value = this.value;
});

/* =========================
   CARD GENERATION
========================= */

document.getElementById("letterForm").addEventListener("submit", function (e) {

    e.preventDefault();

    let name = document.getElementById("name").value || "Someone";
    let message = document.getElementById("message").value || "You are special 💖";
    let theme = document.getElementById("theme").value;
    let ending = document.getElementById("ending").value || "Always yours";

    let emoji = "💖";

    if (theme === "flower") emoji = "🌸";
    else if (theme === "romantic") emoji = "💌";
    else if (theme === "aesthetic") emoji = "✨";
    else if (theme === "dark") emoji = "🌙";

    let card = document.getElementById("card");

    card.className = theme;

    card.innerHTML = `
        <h2>${name}</h2>

        <div style="font-size:28px; margin:15px 0;">
            ${emoji}
        </div>

        <p>${message}</p>

        <p style="margin-top:20px;">
            — ${ending}
        </p>
    `;

    createLink(name, message, theme, ending, "card");

    document.getElementById("cardEditor").style.display = "none";
    document.getElementById("actions").style.display = "flex";
});

/* =========================
   LETTER GENERATION
========================= */

function generateLetter() {

    let name = document.getElementById("letterName").value || "Someone";

    let text = document.getElementById("letterText").value || "Your letter...";

    let ending = document.getElementById("letterEnding").value || "Always yours";

    let today = new Date().toLocaleDateString();

    let card = document.getElementById("card");

    card.className = "letter";

    card.innerHTML = `
        <div class="letter-content">

            <p class="date">${today}</p>

            <p class="dear">
                Dear ${name},
            </p>

            <p class="body">
                ${text.replace(/\n/g, "<br>")}
            </p>

            <p class="sign">
                — ${ending}
            </p>

        </div>
    `;

    createLink(name, text, "", ending, "letter");

    document.getElementById("letterEditor").style.display = "none";

    document.getElementById("actions").style.display = "flex";
}

/* =========================
   CREATE SHARE LINK
========================= */

function createLink(name, msg, theme, end, mode) {

    let base = window.location.origin + window.location.pathname;

    currentLink =
        base +
        "?name=" + encodeURIComponent(name) +
        "&msg=" + encodeURIComponent(msg) +
        "&theme=" + encodeURIComponent(theme) +
        "&end=" + encodeURIComponent(end) +
        "&mode=" + encodeURIComponent(mode);

    window.history.replaceState(null, "", currentLink);
}

/* =========================
   COPY LINK
========================= */

document.getElementById("shareBtn").onclick = function () {

    navigator.clipboard.writeText(currentLink);

    alert("Link copied!");
};

/* =========================
   DOWNLOAD
========================= */

document.getElementById("downloadBtn").onclick = function () {

    let target =
        document.querySelector(".letter-content") ||
        document.getElementById("card");

    html2canvas(target).then(canvas => {

        let link = document.createElement("a");

        link.download = "letter.png";

        link.href = canvas.toDataURL("image/png");

        link.click();
    });
};

/* =========================
   LOAD SHARED LINK
========================= */

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

        card.innerHTML = `
            <div class="letter-content">

                <p class="date">${today}</p>

                <p class="dear">
                    Dear ${name},
                </p>

                <p class="body">
                    ${msg.replace(/\n/g, "<br>")}
                </p>

                <p class="sign">
                    — ${end}
                </p>

            </div>
        `;

    } else {

        card.className = theme;

        card.innerHTML = `
            <h2>${name}</h2>

            <p>${msg}</p>

            <p style="margin-top:20px;">
                — ${end}
            </p>
        `;
    }
};