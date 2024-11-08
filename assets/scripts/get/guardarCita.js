import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const db = firebase.database(app);

// guardarCita.js

document.getElementById('citaForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Previene el envío y la redirección

// Obtiene los valores del formulario
const nombre = document.getElementById('nombre').value;
const email = document.getElementById('email').value;
const fecha = document.getElementById('fecha').value;
const hora = document.getElementById('hora').value;

try {
    // Crea un identificador único para la colección de citas
    const formattedFecha = fecha.replace(/-/g, '');
    const collectionName = `Citas-${nombre}-${formattedFecha}`;

    // Guarda la cita en Firebase
    const citaRef = db.ref(`citas/`).push();
    await citaRef.set({
        nombre: nombre,
        email: email,
        fecha: fecha,
        hora: hora
    });

    document.getElementById('statusMessage').innerText = "Cita agendada exitosamente.";
    document.getElementById('citaForm').reset();
    console.log("Cita guardada en Firebase");
     // Mensaje de confirmación
     document.getElementById('statusMessage').innerText = "Cita agendada exitosamente.";
     console.log("Cita guardada en Firebase");

     // Mostrar el botón para ir al carrito
     document.getElementById('goToCartBtn').style.display = "block";

} catch (error) {
    document.getElementById('statusMessage').innerText = "Error al agendar la cita: " + error.message;
    console.error("Error al guardar la cita en Firebase:", error);
}
});