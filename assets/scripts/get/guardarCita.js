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

    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `citas/${email}`)); // Busca en el nodo citas usando el correo electrónico
    
        if (snapshot.exists()) {
            const citaData = snapshot.val();
    
            // Puedes cambiar los campos para adaptarlos a los datos que hayas guardado en Firebase
            sessionStorage.setItem("citaNombre", citaData.nombre);
            sessionStorage.setItem("citaEmail", email);
            sessionStorage.setItem("citaFecha", citaData.fecha);
            sessionStorage.setItem("citaHora", citaData.hora);
    
            alert("Cita encontrada y guardada en la sesión");
    
            // Redirigir a profile.html
            window.location.href = "profile.html";
        } else {
            alert("Cita no encontrada");
        }
    } catch (error) {
        console.error("Error al obtener datos de Firebase:", error);
    }
});
