// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAQIa6cMVOojiZZ5zIPkWLGhN5aiMQ0UYs",
    authDomain: "sabi-70919.firebaseapp.com",
    projectId: "sabi-70919",
    storageBucket: "sabi-70919.firebasestorage.app",
    messagingSenderId: "106476736453",
    appId: "1:106476736453:web:12142ebafdcdfce7f085ac"
};


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Función para enviar datos a Firebase
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Crear referencia en Firebase a la colección `contacts`
    const contactsRef = ref(db, 'contacts');

    // Enviar los datos a Firebase
    try {
        await push(contactsRef, {
            name: name,
            phone: phone,
            message: message,
            timestamp: Date.now()
        });

        // Mostrar mensaje de éxito
        document.getElementById("statusMessage").textContent = "Mensaje enviado con éxito";
        document.getElementById("statusMessage").style.color = "green";

        // Limpiar el formulario
        document.getElementById("contactForm").reset();
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        document.getElementById("statusMessage").textContent = "Error al enviar el mensaje. Inténtalo nuevamente.";
        document.getElementById("statusMessage").style.color = "red";
    }
});
