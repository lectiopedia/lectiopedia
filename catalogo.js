let catalogo = {
    "Finanzas y Trading": ["Padre Rico, Padre Pobre", "El Hombre más Rico de Babilonia.", "Psicología del Dinero.", "Piense y Hágase Rico"],
    "Desarrollo Personal y Hábitos": ["Hábitos Atómicos", "Piense y Hágase Rico","El Club de las 5 de la mañana","Despertando al Gigante Interior"],
    "Psicología": ["El Arte de la Seducción","Psicología Oscura","Cómo hacer que te pasen cosas buenas","El poder de las palabras"],
    "Éxito y Negocios": ["Los 7 hábitos de la gente altamente efectiva","Psicología de Ventas","Influencia"]
};

function renderizarCatalogo() {
    const contenedor = document.getElementById("contenedorCatalogo");
    
    if (!contenedor) {
        console.error("ERROR: No encontré el div 'contenedorCatalogo'. Revisa tu HTML.");
        return;
    }
    
    contenedor.innerHTML = ""; 
    for (let categoria in catalogo) {
        let bloque = document.createElement("div");
        bloque.className = "categoria";
        bloque.innerHTML = `<h3>${categoria}</h3>`;
        
        let librosDiv = document.createElement("div");
        librosDiv.className = "libros";
        
        catalogo[categoria].forEach(libro => {
            let div = document.createElement("div");
            div.className = "libro";
            div.innerHTML = `
                ${libro}
                <button onclick="agregarCarrito('${libro}', 3900, this)">
                Agregar al carrito
                </button>
            `;
            librosDiv.appendChild(div);
        });
        bloque.appendChild(librosDiv);
        contenedor.appendChild(bloque);
    }
    console.log("Catálogo renderizado con éxito.");
}


window.renderizarCatalogo = renderizarCatalogo;