import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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

// Cargar la información de usuario actual en el perfil
document.addEventListener("DOMContentLoaded", async function () {
    const userName = sessionStorage.getItem("userName");
    const userPassword = sessionStorage.getItem("userPassword");

    if (userName && userPassword) {
        document.getElementById("userName").textContent = userName;
        document.getElementById("userPassword").textContent = userPassword;
    } else {
        alert("Por favor, inicia sesión primero.");
        window.location.href = "login.html";
    }
});

// Función para guardar los cambios
async function saveChanges() {
    const newUserName = document.getElementById("editUserName").value;
    const newUserPassword = document.getElementById("editUserPassword").value;

    // Verificar que se hayan ingresado nuevos valores
    if (newUserName && newUserPassword) {
        // Guardar los datos actualizados en una nueva tabla en Firebase
        try {
            const userId = sessionStorage.getItem("userName"); // Usamos el nombre de usuario como ID para la tabla nueva
            const newRef = ref(db, 'updatedClients/' + userId);
            await set(newRef, {
                NOMBRE: newUserName,
                CONTRA: newUserPassword
            });

            // Actualizar los valores en sessionStorage
            sessionStorage.setItem("userName", newUserName);
            sessionStorage.setItem("userPassword", newUserPassword);

            // Mostrar los nuevos datos en el perfil
            document.getElementById("userName").textContent = newUserName;
            document.getElementById("userPassword").textContent = newUserPassword;

            alert("Información actualizada exitosamente.");
        } catch (error) {
            console.error("Error al guardar los datos en Firebase:", error);
            alert("Hubo un error al guardar los cambios.");
        }
    } else {
        alert("Por favor, completa ambos campos para guardar los cambios.");
    }
}

// Función para cerrar sesión
function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

window.saveChanges = saveChanges;
window.logout = logout;
