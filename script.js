// Inizializza Firebase (devi inserire la tua configurazione in firebase-config.js)
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const auth = getAuth();
const db = getDatabase();

// REGISTRAZIONE UTENTE
function register() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    if (email === "" || password === "" || username === "") {
        document.getElementById("register-msg").innerText = "Compila tutti i campi!";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            let userId = userCredential.user.uid;

            // Salviamo l'utente nel database
            set(ref(db, 'utenti/' + userId), {
                username: username,
                email: email,
                NO2_ppb: 0,
                ventola: "OFF",
                led: "SPENTO",
                oled: "Benvenuto!"
            });

            document.getElementById("register-msg").innerText = "Registrazione riuscita!";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        })
        .catch((error) => {
            document.getElementById("register-msg").innerText = error.message;
        });
}

// LOGIN UTENTE
function login() {
    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem("userId", userCredential.user.uid);
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            document.getElementById("error-msg").innerText = "Credenziali errate!";
        });
}

// CARICA DATI SULLA DASHBOARD
function caricaDati() {
    let userId = localStorage.getItem("userId");

    if (!userId) {
        window.location.href = "index.html";
        return;
    }

    const userRef = ref(db, 'utenti/' + userId);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            let dati = snapshot.val();
            document.getElementById("no2-value").innerText = dati.NO2_ppb;
            document.getElementById("ventola-state").innerText = dati.ventola;
            document.getElementById("led-state").innerText = dati.led;
            document.getElementById("oled-msg").innerText = dati.oled;
        }
    });
}

// LOGOUT
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "index.html";
}
