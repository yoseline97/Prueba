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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reemplaza "nombre_usuario" con el identificador real del usuario
const user = "nombre_usuario";

function loadUserProfile() {
    const profileRef = ref(db, `clients/${user}`);
    get(profileRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById("user-name").textContent = `Nombre: ${userData.nombre || "No disponible"}`;
            document.getElementById("user-email").textContent = `Correo: ${userData.email || "No disponible"}`;
            document.getElementById("user-info").textContent = `Información adicional: ${userData.info || "No disponible"}`;
            
            if (userData.profileImage) {
                document.getElementById("profile-image").src = userData.profileImage;
            }
        } else {
            document.getElementById("user-name").textContent = "Usuario no encontrado";
            document.getElementById("user-email").textContent = "";
            document.getElementById("user-info").textContent = "";
        }
    }).catch((error) => {
        console.error("Error al obtener el perfil del usuario:", error);
    });
}

// Cargar el perfil al iniciar la página
window.onload = loadUserProfile;
