// Recuperar datos inmediatamente
let carrito = JSON.parse(localStorage.getItem('carrito-lectio')) || [];

function abrirCarrito() {
    document.getElementById("carritoPanel").classList.toggle("activo");
}

function cerrarCarrito() {
    document.getElementById("carritoPanel").classList.remove("activo");
}

function agregarCarrito(nombre, precio, boton) {
    carrito.push({ nombre, precio });
    const iconoCarrito = document.querySelector(".carritoIcono");
    if (boton) {
        const textoOriginal = boton.innerText;
        boton.innerText = "¡Agregado! ✅";
        boton.classList.add("btn-agregado");
        if (iconoCarrito) iconoCarrito.classList.add("agregando");
        setTimeout(() => {
            boton.innerText = textoOriginal;
            boton.classList.remove("btn-agregado");
            if (iconoCarrito) iconoCarrito.classList.remove("agregando");
        }, 1500);
    }
    actualizarCarrito();
}

function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    if (carrito.length > 0) {
        carrito = [];
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const contenedor = document.getElementById("itemsCarrito");
    const contador = document.getElementById("contadorCarrito");
    const totalDisplay = document.getElementById("totalCarrito");
    
    if (!contenedor || !contador || !totalDisplay) return;

    let total = 0;
    contenedor.innerHTML = ""; 

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p style="opacity:0.5; padding:20px;">Tu biblioteca está vacía...</p>`;
    }

    carrito.forEach((item, i) => {
        const div = document.createElement("div");
        div.classList.add("item-carrito-estilo"); 
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #2d3748; padding-bottom:5px;">
                <span>${item.nombre}</span>
                <div>
                    <span style="color:#d4af37; margin-right:10px;">$${item.precio}</span>
                    <span onclick="eliminarItem(${i})" style="cursor:pointer;">❌</span>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
        total += item.precio;
    });

    contador.innerText = carrito.length;
    totalDisplay.innerText = `$${total}`;
    localStorage.setItem('carrito-lectio', JSON.stringify(carrito));
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + item.precio, 0);
}

function comprarWhatsApp() {
    if (carrito.length === 0) return alert("Agrega algún libro primero");
    let mensaje = "¡Hola! Me interesan estos libros de LECTIO:%0A";
    carrito.forEach((l, i) => mensaje += `${i+1}. ${l.nombre} ($${l.precio})%0A`);
    mensaje += `%0ATotal: $${document.getElementById("totalCarrito").innerText}`;
    window.open(`https://wa.me/543515101643?text=${mensaje}`, '_blank');
}

// Hacer funciones globales
window.abrirCarrito = abrirCarrito;
window.cerrarCarrito = cerrarCarrito;
window.agregarCarrito = agregarCarrito;
window.eliminarItem = eliminarItem;
window.vaciarCarrito = vaciarCarrito;
window.comprarWhatsApp = comprarWhatsApp;
window.actualizarCarrito = actualizarCarrito;

// EJECUTAR AL CARGAR EL SCRIPT PARA QUE EL CARRITO NO ESTE EN 0
actualizarCarrito();