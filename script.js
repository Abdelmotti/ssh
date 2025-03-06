document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("dashboard.html")) {
        caricaDati();
    }
});

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Recupero dati da Firebase (simulazione, da collegare con Firebase)
    let utenti = {
        "mario": { password: "1234", id: "utente_1" },
        "luca": { password: "abcd", id: "utente_2" }
    };

    if (utenti[username] && utenti[username].password === password) {
        localStorage.setItem("userId", utenti[username].id);
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error-msg").innerText = "Credenziali errate!";
    }
}

function caricaDati() {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        window.location.href = "index.html";
        return;
    }

    // Simulazione dati, da collegare con Firebase
    let dati = {
        "utente_1": { NO2_ppb: 15.3, ventola: "ON", led: "ROSSO", oled: "Attenzione: NO2 alto!" },
        "utente_2": { NO2_ppb: 5.8, ventola: "OFF", led: "VERDE", oled: "Qualità dell'aria buona." }
    };

    let info = dati[userId];
    document.getElementById("no2-value").innerText = info.NO2_ppb;
    document.getElementById("ventola-state").innerText = info.ventola;
    document.getElementById("led-state").innerText = info.led;
    document.getElementById("oled-msg").innerText = info.oled;
}

function logout() {
    localStorage.removeItem("userId");
    window.location.href = "index.html";
}

