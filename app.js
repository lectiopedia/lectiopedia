document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado, iniciando componentes...");

    // 1. Dibujar el catálogo (Llamamos a la función de catalogo.js)
    if (typeof window.renderizarCatalogo === "function") {
        window.renderizarCatalogo();
    } else {
        console.error("La función renderizarCatalogo no está disponible.");
    }

    // 2. Actualizar el carrito (Llamamos a la función de scripts.js)
    if (typeof window.actualizarCarrito === "function") {
        window.actualizarCarrito();
    }

    // 3. Tu lógica del Buscador
    const buscador = document.getElementById("buscador");
    if (buscador) {
        buscador.addEventListener("keyup", function() {
            let filtro = this.value.toLowerCase();
            let libros = document.querySelectorAll(".libro");
            libros.forEach(libro => {
                let texto = libro.innerText.toLowerCase();
                libro.style.display = texto.includes(filtro) ? "block" : "none";
            });
        });
    }

    // 4. Tus Notificaciones
    let nombres = ["Juan", "María", "Carlos", "Lucía", "Ana", "Marcelo"];
    let ciudades = ["Córdoba", "Buenos Aires", "Rosario", "Mendoza","La Pampa"];
    let libros = ["Psicología Oscura", "Padre Rico Padre Pobre", "Hábitos Atómicos"]
    setInterval(() => {
        let box = document.getElementById("notificacion");
        if (box) {
            let nombre = nombres[Math.floor(Math.random() * nombres.length)];
            let ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
            let libro = libros[Math.floor(Math.random() * libros.length)];
            box.innerText = `${nombre} de ${ciudad} compró ${libro}`;
            box.style.display = "block";
            setTimeout(() => box.style.display = "none", 4000);
        }
    }, 12000);

    function cargarMasVendidos() {
    const contenedor = document.getElementById("contenedorMasVendidos");
    // Usamos libros de tu objeto catalogo o de donde quieras
    const destacados = ["Hábitos Atómicos", "Padre Rico Padre Pobre", "Psicología Oscura", "El Poder de las Palabras"];
    
    destacados.forEach(libro => {
        let div = document.createElement("div");
        div.className = "libro";
        div.innerHTML = `
            ${libro}
            <button onclick="agregarCarrito('${libro}', 3900, this)">Agregar al carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

// Y la llamas:
cargarMasVendidos();
});