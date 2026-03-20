document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM cargado, iniciando componentes...");


    if (typeof window.renderizarCatalogo === "function") {
        window.renderizarCatalogo();
    } else {
        console.error("La función renderizarCatalogo no está disponible.");
    }


    if (typeof window.actualizarCarrito === "function") {
        window.actualizarCarrito();
    }


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


cargarMasVendidos();
});