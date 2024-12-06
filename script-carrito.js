const coupons = {
    "DESCUENTO10": 10, // 10% de descuento
    "DESCUENTO20": 20, // 20% de descuento
    "DESCUENTO50": 50  // 50% de descuento
};

let discountPercentage = 0; // Descuento aplicado

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

// Función para aplicar el cupón
function applyCoupon() {
    const couponCode = document.getElementById("couponCode").value.toUpperCase();
    const discountMessage = document.getElementById("discountMessage");

    if (coupons[couponCode]) {
        discountPercentage = coupons[couponCode];
        discountMessage.textContent = `¡Cupón aplicado! Descuento del ${discountPercentage}%.`;
        discountMessage.style.color = "green";
    } else {
        discountPercentage = 0;
        discountMessage.textContent = "Cupón inválido. Intenta de nuevo.";
        discountMessage.style.color = "red";
    }

    renderizarCarrito(); // Recalcula el total con el descuento
}

// Función para renderizar el carrito
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

    // Aplicar el descuento al total
    const discount = (total * discountPercentage) / 100;
    total -= discount;

    totalPriceEl.textContent = total.toFixed(2);
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

// Inicializar el carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});


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
            localStorage.removeItem("carrito");
            renderizarCarrito();
        });
    },
    onError: (err) => {
        console.error("Error con PayPal:", err);
    }
}).render("#paypal-button-container");