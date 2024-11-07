import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child, update, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const user = "nombre_usuario"; // Cambia por el nombre de usuario actual

// Función para agregar un producto al carrito
function addToCart(product, quantity, price) {
    const cartRef = ref(db, `cart/${user}`);
    const newItemRef = push(cartRef);

    set(newItemRef, {
        product: product,
        quantity: quantity,
        price: price
    }).then(() => {
        alert("Producto agregado al carrito");
        displayCartItems();
    }).catch((error) => {
        console.error("Error al agregar producto al carrito:", error);
    });
}

// Función para mostrar los productos en el carrito
function displayCartItems() {
    const cartItemsRef = ref(db, `cart/${user}`);
    const cartTableBody = document.getElementById("cart-items");
    cartTableBody.innerHTML = ""; // Limpia el carrito actual en la página

    get(cartItemsRef).then((snapshot) => {
        if (snapshot.exists()) {
            let total = 0;
            snapshot.forEach((item) => {
                const data = item.val();
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${data.product}</td>
                    <td>${data.quantity}</td>
                    <td>$${data.price}</td>
                    <td><button onclick="removeFromCart('${item.key}')">Eliminar</button></td>
                `;
                cartTableBody.appendChild(row);

                total += data.price * data.quantity;
            });

            document.getElementById("total-price").textContent = total.toFixed(2);
        }
    }).catch((error) => {
        console.error("Error al obtener los productos del carrito:", error);
    });
}

// Función para eliminar un producto del carrito
function removeFromCart(itemId) {
    const itemRef = ref(db, `cart/${user}/${itemId}`);
    remove(itemRef).then(() => {
        alert("Producto eliminado del carrito");
        displayCartItems();
    }).catch((error) => {
        console.error("Error al eliminar el producto del carrito:", error);
    });
}

// Llama a la función para mostrar los productos al cargar la página
window.onload = displayCartItems;
