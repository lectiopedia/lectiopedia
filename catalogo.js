let catalogo = {
    "Psicología": ["Psicología Oscura", "Hábitos Atómicos", "Inteligencia Emocional"],
    "Negocios": ["Padre Rico Padre Pobre", "Piense y Hágase Rico"],
    "Seducción": ["El Arte de la Seducción"]
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