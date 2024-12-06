
// Inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAQIa6cMVOojiZZ5zIPkWLGhN5aiMQ0UYs",
    authDomain: "sabi-70919.firebaseapp.com",
    projectId: "sabi-70919",
    storageBucket: "sabi-70919.firebasestorage.app",
    messagingSenderId: "106476736453",
    appId: "1:106476736453:web:fe15f1e56fe4364a5577da",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Array de paquetes (carrito de compras)
const paquetes = [
    { id: 1, nombre: "Rejuvenecimiento Facial", precio: 1200 },
    { id: 2, nombre: "Anti-Manchas y Cicatrices", precio: 1800 },
    { id: 3, nombre: "Reducción Corporal", precio: 1600 },
    { id: 4, nombre: "Belleza Natural", precio: 1850 },
    { id: 5, nombre: "Detox y Drenaje", precio: 1500 },
    { id: 6, nombre: "Reducción de Grasa", precio: 3100 },
    { id: 7, nombre: "Limpieza Dental", precio: 500 },
    { id: 8, nombre: "Blanqueamiento Dental", precio: 1200 },
    { id: 9, nombre: "Ortodoncia", precio: 8000 },
    { id: 10, nombre: "Extracción de Muelas", precio: 1500 },
    { id: 11, nombre: "Resina Estética", precio: 700 },
    { id: 12, nombre: "Implante Dental", precio: 15000 },
    // Paquetes de Terapia Física
    { id: 13, nombre: "Evaluación Inicial", precio: 800 },
    { id: 14, nombre: "Sesiones Individuales", precio: 4200 },
    { id: 15, nombre: "Rehabilitación Postoperatoria", precio: 7500 },
    { id: 16, nombre: "Terapia para Deportistas", precio: 6500 },
    { id: 17, nombre: "Terapia de Grupo", precio: 3200 },
    { id: 18, nombre: "Mantenimiento", precio: 2500 },
    // Paquetes de Psicologia
    { id: 19, nombre: "Terapia Infantil y Adolescente", precio: 1000 },
    { id: 20, nombre: "Terapia Individual", precio: 800 },
    { id: 21, nombre: "Terapia de Pareja", precio: 1000 },
    { id: 22, nombre: "Manejo del Estrés", precio: 800 },
    { id: 23, nombre: "Orientación Familiar", precio: 1200 },
    { id: 24, nombre: "Desarrollo Personal", precio: 700 },
    // Paquetes de Nutricion
    { id: 25, nombre: "Plan Integral de Bienestar", precio: 1000 },
    { id: 26, nombre: "Nutrición para Condiciones Médicas", precio: 800 },
    { id: 27, nombre: "Nutrición Familiar", precio: 1200 },
    { id: 28, nombre: "Plan para Pérdida de Peso", precio: 700 },
    { id: 29, nombre: "Nutrición Deportiva", precio: 500 },
    { id: 30, nombre: "Plan Básico de Nutrición", precio: 300 },
    // Paquetes de Medicina estetica
    { id: 31, nombre: "Botox", precio: 2000 },
    { id: 32, nombre: "Rellenos Faciales", precio: 3500 },
    { id: 33, nombre: "Rejuvenecimiento con Láser", precio: 4000 },
    { id: 34, nombre: "Peeling Químico", precio: 1500 },
    { id: 35, nombre: "Mesoterapia Facial", precio: 2200 },
    { id: 36, nombre: "Hilos Tensores", precio: 6000 }
    // Otros productos pueden ser añadidos
];

// Función para guardar el carrito en Firebase
function saveCartToFirebase() {
    // Obtener los productos del carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        console.warn("El carrito está vacío, no se puede guardar.");
        return;
    }

    // Generar un identificador único para cada compra
    const timestamp = Date.now(); // Timestamp como ID único
    const cartRef = ref(database, `cart/${timestamp}`); // Guardar bajo la ruta cart/timestamp

    // Guardar los datos del carrito en Firebase
    set(cartRef, carrito)
        .then(() => {
            console.log("Compra guardada exitosamente en Firebase!");
        })
        .catch((error) => {
            console.error("Error al guardar la compra en Firebase: ", error);
        });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const paquete = paquetes.find(p => p.id === id);
    if (!paquete) return;

    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...paquete, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${paquete.nombre} agregado al carrito.`);
    renderizarCarrito();
}


// Función para renderizar el carrito en el HTML
function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    if (!cartItems || !totalPriceEl) {
        console.error("No se encontraron los elementos del carrito en el DOM.");
        return;
    }

    cartItems.innerHTML = ""; // Limpia el contenido previo
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        cartItems.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            </tr>
        `;
    });

    totalPriceEl.textContent = total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

paypal.Buttons({
    createOrder: (data, actions) => {
        const total = document.getElementById("total-price").textContent;
        return actions.order.create({
            purchase_units: [{
                amount: { value: total }
            }]
        });
    },
    onApprove: (data, actions) => {
        return actions.order.capture().then(orderData => {
            alert("Pago exitoso. Gracias por su compra.");

            
            generarFacturaPDF();

            // Guardar el carrito en Firebase
            saveCartToFirebase();

            // Limpiar el carrito local
            localStorage.removeItem("carrito");
            renderizarCarrito(); // Actualizar la interfaz

            // Generar la factura en PDF
            generarFacturaPDF();
        });
    },
    onError: (err) => {
        console.error("Error con PayPal:", err);
    }
}).render("#paypal-button-container");

// Función para generar la factura en PDF
function generarFacturaPDF() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar el contenido del carrito
    console.log(carrito);  // Agrega esto para ver qué contiene el carrito

    const total = document.getElementById("total-price").textContent;
    const fecha = new Date().toLocaleDateString();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título de la factura
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Factura de Compra", 105, 20, null, null, "center");

    // Información de la factura (Fecha y total)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 10, 30);
    doc.text(`Total: $${total}`, 10, 40);

    // Tabla de productos
    doc.text("Productos:", 10, 50);
    const startY = 60; // Comienza la tabla en esta posición
    let y = startY;

    // Recorrer los productos y agregar al PDF
    carrito.forEach(item => {
        console.log(item);  // Verifica los detalles del producto
        doc.text(`${item.nombre} (x${item.cantidad})`, 10, y);
        doc.text(`$${(item.precio * item.cantidad).toFixed(2)}`, 150, y);
        y += 10; // Incrementa la posición para el siguiente producto
    });

    // Línea horizontal al final de la tabla
    doc.line(10, y + 5, 200, y + 5);

    // Total final
    doc.text(`Total: $${total}`, 150, y + 10);

    // Descargar el PDF
    doc.save("factura_compra.pdf");
}


const total = document.getElementById("total-price").textContent;
console.log("Total:", total);
