let catalogo = {
    "Finanzas y Trading": ["Padre Rico, Padre Pobre", "El Hombre más Rico de Babilonia.", "Psicología del Dinero.", "Piense y Hágase Rico"],
    "Desarrollo Personal y Hábitos": ["Hábitos Atómicos", "Piense y Hágase Rico","El Club de las 5 de la mañana","Despertando al Gigante Interior"],
    "Psicología": ["El Arte de la Seducción","El Futuro de Nuestra Mente","Cómo hacer que te pasen cosas buenas","El poder de las palabras"],
    "Éxito y Negocios": ["Los 7 hábitos de la gente altamente efectiva","Psicología de Ventas","Influencia"]
};

function renderizarCatalogo() {
    const contenedor = document.getElementById("contenedorCatalogo");
    
    if (!contenedor) return;
    
    contenedor.innerHTML = ""; 
    for (let categoria in catalogo) {
        let bloque = document.createElement("div");
        bloque.className = "categoria";
        bloque.innerHTML = `<h3>${categoria}</h3>`;
        
        let librosDiv = document.createElement("div");
        librosDiv.className = "libros";
        
        catalogo[categoria].forEach(libro => {
            // CONVERSIÓN DE NOMBRE: "Padre Rico, Padre Pobre" -> "padre-rico-padre-pobre.webp"
            const nombreArchivo = libro.toLowerCase()
                           .replace(/ /g, "-")
                           .replace(/[.,]/g, "")
                           .normalize("NFD")
                           .replace(/[\u0300-\u036f]/g, "");

// Cambiamos a ruta relativa explícita
            const rutaImagen = `./assets/${nombreArchivo}.webp`;

            let div = document.createElement("div");
            div.className = "libro";
            
            div.innerHTML = `
                <div class="libro-portada">
                    <img src="${rutaImagen}" 
                         alt="${libro}" 
                         loading="lazy" 
                         onerror="this.style.display='none'">
                </div>
                <div class="libro-info">
                    <h4>${libro}</h4>
                    <p class="precio-busqueda">$3900</p>
                </div>
                <button class="btnWhatsApp" onclick="agregarCarrito('${libro}', 3900, this)">
                    Agregar al carrito
                </button>
            `;
            librosDiv.appendChild(div);
        });
        bloque.appendChild(librosDiv);
        contenedor.appendChild(bloque);
    }
}


window.renderizarCatalogo = renderizarCatalogo;