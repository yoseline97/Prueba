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

const user = "nombre_usuario"; // Reemplaza con el usuario actual

// Cargar datos de perfil
function loadUserProfile() {
    const profileRef = ref(db, `clients/${user}`);
    get(profileRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            document.getElementById("username").textContent = userData.nombre || "Usuario";
            document.getElementById("user-name").textContent = userData.nombre || "Usuario";
            
            // Opcional: cargar imagen de perfil si existe
            if (userData.profileImage) {
                document.getElementById("profile-logo").src = userData.profileImage;
            }
        } else {
            console.error("No se encontró el perfil del usuario");
        }
    }).catch((error) => {
        console.error("Error al cargar perfil del usuario:", error);
    });
}

// Cargar el perfil al iniciar la página
window.onload = loadUserProfile;
