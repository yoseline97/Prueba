const paquetes = [
    { id: 1, nombre: "Rejuvenecimiento Facial", precio: 1200 },
    { id: 2, nombre: "Anti-Manchas y Cicatrices", precio: 1800 },
    { id: 3, nombre: "Reducción Corporal", precio: 1600 },
    { id: 4, nombre: "Belleza Natural", precio: 1850 },
    { id: 5, nombre: "Detox y Drenaje", precio: 1500 },
    { id: 6, nombre: "Reducción de Grasa", precio: 3100 },
    // Paquetes de Odontología
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

];

function agregarAlCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const paquete = paquetes.find(p => p.id === id);
    const item = carrito.find(p => p.id === id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...paquete, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${paquete.nombre} agregado al carrito.`);
    renderizarCarrito(); // Actualiza el carrito en pantalla
}


function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");

    if (!cartItems || !totalPriceEl) {
        console.error("Elementos del DOM no encontrados.");
        return;
    }

    cartItems.innerHTML = ""; // Limpia antes de renderizar
    let total = 0;

    carrito.forEach((item, index) => {
        console.log(`Agregando al DOM: ${item.nombre}, Cantidad: ${item.cantidad}`);
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

    // Verificar el contenido del carrito en el DOM
    console.log("Contenido de #cart-items después de renderizar:", cartItems.innerHTML);
}

    // Mostrar el total
    console.log('Total calculado:', total);
    totalPriceEl.textContent = total.toFixed(2);

function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function finalizarCompra() {
    alert("Compra finalizada. ¡Gracias!");
    localStorage.removeItem("carrito");
    renderizarCarrito(); // Actualiza la vista
}

const observer = new MutationObserver(() => {
    console.log("Detectado cambio en el DOM. Re-renderizando carrito...");
    renderizarCarrito();
});

// Observar cambios en el contenedor del carrito
observer.observe(document.getElementById("cart-container"), { childList: true, subtree: true });


document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        console.log("Forzando la renderización del carrito...");
        renderizarCarrito();
    }, 100); // Retrasa ligeramente para asegurarte de que otros scripts han terminado
});
