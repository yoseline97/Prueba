// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// Configuración de Firebase (reemplaza con tu configuración de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyAQIa6cMVOojiZZ5zIPkWLGhN5aiMQ0UYs",
    authDomain: "sabi-70919.firebaseapp.com",
    projectId: "sabi-70919",
    storageBucket: "sabi-70919.firebasestorage.app",
    messagingSenderId: "106476736453",
    appId: "1:106476736453:web:12142ebafdcdfce7f085ac"
};

// Inicializa Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// guardarCita.js

document.getElementById('citaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    // Crear un identificador de colección usando el nombre y la fecha
    const formattedFecha = fecha.replace(/-/g, ''); // Elimina guiones de la fecha
    const collectionName = `Citas-${nombre}-${formattedFecha}`;

    const citaRef = db.ref(collectionName).push();
    citaRef.set({
        nombre: nombre,
        email: email,
        fecha: fecha,
        hora: hora
    }).then(() => {
        document.getElementById('statusMessage').innerText = "Cita agendada exitosamente.";
        document.getElementById('citaForm').reset();
    }).catch((error) => {
        document.getElementById('statusMessage').innerText = "Error al agendar la cita: " + error.message;
    });
});
