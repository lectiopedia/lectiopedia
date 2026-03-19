let carrito = JSON.parse(localStorage.getItem('carrito-lectio')) || [];

document.addEventListener("DOMContentLoaded", actualizarCarrito);

// Abrir y cerrar el carrito
function abrirCarrito() {
    const panel = document.getElementById("carritoPanel");
    const estaActivo = panel.classList.toggle("activo");
}

function cerrarCarrito() {
    const panel = document.getElementById("carritoPanel");
    panel.classList.remove("activo");
}

// Agregar nuevos libros
function agregarCarrito(nombre, precio, boton) {
    carrito.push({ nombre, precio });

    const iconoCarrito = document.querySelector(".carritoIcono");
    if (boton) {
        const textoOriginal = boton.innerText;
        boton.innerText = "¡Agregado! ✅";
        boton.classList.add("btn-agregado");
        if (iconoCarrito) {
            iconoCarrito.classList.add("agregando");
        }
        setTimeout(() => {
            boton.innerText = textoOriginal;
            boton.classList.remove("btn-agregado");
            if (iconoCarrito) {
                iconoCarrito.classList.remove("agregando");
            }
        }, 1500);
    }
    actualizarCarrito();
}

// Eliminar libro individual
function eliminarItem(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    if (carrito.length > 0) {
        carrito = [];
        actualizarCarrito();
    }
}

// Actualizar interfaz
function actualizarCarrito() {
    const contenedor = document.getElementById("itemsCarrito");
    const contador = document.getElementById("contadorCarrito");
    const totalDisplay = document.getElementById("totalCarrito");
    
    let total = 0;
    contenedor.innerHTML = ""; // Limpiamos

    // Si el carrito está vacío, se muestra un mensaje 
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

    // Acualizan numeros
    contador.innerText = carrito.length;
    totalDisplay.innerText = `$${total}`;
    localStorage.setItem('carrito-lectio', JSON.stringify(carrito));
    document.getElementById("contadorCarrito").innerText = carrito.length;
    document.getElementById("totalCarrito").innerText = "Total: $" + calcularTotal();
}

// Link al whatsapp
function comprarWhatsApp() {
    if (carrito.length === 0) return alert("Agrega algún libro primero");

    let mensaje = "¡Hola! Me interesan estos libros de LECTIO:%0A";
    carrito.forEach((l, i) => mensaje += `${i+1}. ${l.nombre} ($${l.precio})%0A`);
    mensaje += `%0ATotal: $${document.getElementById("totalCarrito").innerText}`;

    window.open(`https://wa.me/543515101643?text=${mensaje}`, '_blank');
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + item.precio, 0);
}

/* BUSCADOR */

document.getElementById("buscador").addEventListener("keyup",function(){

let filtro=this.value.toLowerCase()

let libros=document.querySelectorAll(".libro")

libros.forEach(libro=>{

let texto=libro.innerText.toLowerCase()

libro.style.display=texto.includes(filtro) ? "block":"none"

})

})

/* CATALOGO AUTOMATICO */

let catalogo={

"Psicología":[
"Psicología Oscura",
"Hábitos Atómicos",
"Inteligencia Emocional"
],

"Negocios":[
"Padre Rico Padre Pobre",
"Piense y Hágase Rico"
],

"Seducción":[
"El Arte de la Seducción"
]

}

let contenedor=document.getElementById("contenedorCatalogo")

for(let categoria in catalogo){

let bloque=document.createElement("div")

bloque.className="categoria"

bloque.innerHTML="<h3>"+categoria+"</h3>"

let librosDiv=document.createElement("div")
librosDiv.className="libros"

catalogo[categoria].forEach(libro=>{

let div=document.createElement("div")

div.className="libro"

div.innerHTML=`
${libro}
<button onclick="agregarCarrito('${libro}',3900)">
Agregar al carrito
</button>
`

librosDiv.appendChild(div)

})

bloque.appendChild(librosDiv)

contenedor.appendChild(bloque)

}

/* NOTIFICACIONES */

let nombres=["Juan","María","Carlos","Lucía"]
let ciudades=["Córdoba","Buenos Aires","Rosario","Mendoza"]

setInterval(()=>{

let nombre=nombres[Math.floor(Math.random()*nombres.length)]
let ciudad=ciudades[Math.floor(Math.random()*ciudades.length)]

let box=document.getElementById("notificacion")

box.innerText=nombre+" de "+ciudad+" compró Psicología Oscura"
box.style.display="block"

setTimeout(()=>box.style.display="none",4000)

},12000)