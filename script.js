
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    const offset = -currentIndex * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentIndex + step);
}

// Auto-slide every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);


// -------- CARRITO DE COMPRAS --------

// Función para agregar productos al carrito
function addToCart(productName, price) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Comprobar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex(item => item.productName === productName);
    
    if (existingItemIndex >= 0) {
        // Si el producto ya existe, aumentar la cantidad
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // Si el producto no está en el carrito, añadirlo con cantidad 1
        cartItems.push({ productName, quantity: 1, price });
    }

    // Guardar los productos actualizados en localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // -------- Configuración Firestore --------
const db = firebase.firestore();
    
    // Mostrar el modal de confirmación
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = 'none';
}

// Función para actualizar el carrito en la página carrito.html
function updateCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');

    // Limpiar el contenido actual de la tabla
    cartTable.innerHTML = '';
    let totalPrice = 0;

    // Iterar sobre los productos del carrito y agregarlos a la tabla
    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');

        // Crear las celdas de producto, cantidad, precio y botón eliminar
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-btn" data-index="${index}">Eliminar</button></td>
        `;

        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;  // Sumar al total
    });

    // Actualizar el precio total
    totalPriceElem.textContent = totalPrice.toFixed(2);
}

// Función para eliminar un producto del carrito
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
        // Obtener el índice del producto que se desea eliminar
        const index = e.target.getAttribute('data-index');
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Eliminar el producto del carrito
        cartItems.splice(index, 1);
        
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        
        // Actualizar la vista del carrito
        updateCart();
    }
});

// Cargar los productos del carrito al abrir la página carrito.html
window.onload = updateCart;

// Botón de pago de PayPal (simulación)
document.getElementById('paypal-button-container').addEventListener('click', function (e) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cartItems.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    // Aquí podrías redirigir a PayPal o a otra pasarela de pago
    alert('Redirigiendo a PayPal para realizar el pago');
});

// Función para limpiar el carrito después del pago o si se cancela el pedido
function clearCart() {
    localStorage.removeItem('cart'); // Elimina todos los productos del carrito
    updateCart(); // Actualiza la vista para mostrar un carrito vacío
}


