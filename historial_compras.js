// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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

// Función para obtener el historial de compras
async function obtenerHistorialCompras() {
    const historialRef = ref(db, 'cart'); // Ruta donde están almacenadas las compras en Firebase
    const historialTabla = document.getElementById("historial-items"); // Referencia a la tabla en el DOM

    try {
        const snapshot = await get(historialRef); // Obtener los datos de Firebase
        console.log(snapshot.val()); // Verifica los datos obtenidos

        if (snapshot.exists()) {
            const compras = snapshot.val(); // Datos de las compras
            historialTabla.innerHTML = ""; // Limpiar la tabla antes de llenarla

            // Recorrer las compras y agregarlas a la tabla
            Object.entries(compras).forEach(([idCompra, productos]) => {
                let productosHTML = ""; // Generar los detalles de los productos
                let total = 0;

                productos.forEach((producto) => {
                    productosHTML += `${producto.nombre} (x${producto.cantidad})<br>`;
                    total += producto.precio * producto.cantidad;
                });

                // Agregar una fila a la tabla
                const row = `
                    <tr>
                        <td>${idCompra}</td>
                        <td>${productosHTML}</td>
                        <td>$${total.toFixed(2)}</td>
                        <td>${new Date(parseInt(idCompra)).toLocaleString()}</td>
                    </tr>
                `;
                historialTabla.innerHTML += row;
            });
        } else {
            historialTabla.innerHTML = "<tr><td colspan='4'>No hay compras registradas.</td></tr>";
        }
    } catch (error) {
        console.error("Error al obtener el historial de compras:", error);
        historialTabla.innerHTML = "<tr><td colspan='4'>Error al cargar los datos. Intenta nuevamente.</td></tr>";
    }
}

// Asociar el botón con la función
document.getElementById("historial-btn").addEventListener("click", obtenerHistorialCompras);
