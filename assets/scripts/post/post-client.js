import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAQIa6cMVOojiZZ5zIPkWLGhN5aiMQ0UYs",
    authDomain: "sabi-70919.firebaseapp.com",
    projectId: "sabi-70919",
    storageBucket: "sabi-70919.firebasestorage.app",
    messagingSenderId: "106476736453",
    appId: "1:106476736453:web:12142ebafdcdfce7f085ac"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById('registerForm');

document.getElementById("adduser").addEventListener('click', function (e) {
    e.preventDefault();

    const nombre = document.getElementById('email').value;
    const contraseña = document.getElementById('password').value;

    set(ref(db, 'clients/' + nombre), {
        nombre: nombre,
        CONTRA: contraseña
    }).then(() => {
        alert("Registro exitoso, ahora puedes iniciar sesión");
        window.location.href = "index2.html";  // Redirecciona a index.html
    }).catch((error) => {
        console.error("Error al registrar:", error);
    });
});
