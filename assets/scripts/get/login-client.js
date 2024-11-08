import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAQIa6cMVOojiZZ5zIPkWLGhN5aiMQ0UYs",
    authDomain: "sabi-70919.firebaseapp.com",
    projectId: "sabi-70919",
    storageBucket: "sabi-70919.firebasestorage.app",
    messagingSenderId: "106476736453",
    appId: "1:106476736453:web:12142ebafdcdfce7f085ac"
};
// Inicializar Firebase y la base de datos
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("loginForm").addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `clients/${email}`));

        if (snapshot.exists()) {
            const userData = snapshot.val();

            if (userData.CONTRA === password) {
                alert("Inicio de sesión exitoso");

                // Guardar los datos del usuario en sessionStorage
                sessionStorage.setItem("userEmail", email);
                sessionStorage.setItem("userName", userData.nombre);
                sessionStorage.setItem("userPassword", userData.CONTRA);

                // Redirigir a profile.html
                window.location.href = "index.html";
            } else {
                alert("Contraseña incorrecta");
            }
        } else {
            alert("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
});
