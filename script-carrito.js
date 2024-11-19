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
    { id: 12, nombre: "Implante Dental", precio: 15000 }
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
}

function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartItems = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        cartItems.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio * item.cantidad}</td>
                <td><button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
            </tr>
        `;
    });
    totalPriceEl.textContent = total.toFixed(2);
}

function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function finalizarCompra() {
    alert("Compra finalizada. ¡Gracias!");
    localStorage.removeItem("carrito");
    renderizarCarrito();
}

document.addEventListener("DOMContentLoaded", renderizarCarrito);
