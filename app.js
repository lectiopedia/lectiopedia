document.addEventListener("DOMContentLoaded", () => {
    if (typeof window.renderizarCatalogo === "function") {
        window.renderizarCatalogo();
    }
    
    if (typeof cargarMasVendidos === "function") {
        cargarMasVendidos(); 
    }
    const inputBuscador = document.getElementById("buscador");
    const btnVolver = document.getElementById("btnVolver");

    setTimeout(() => {
        document.querySelectorAll("#masVendidos, #catalogoCompleto, .divisor-scroll").forEach(el => {
            if(el) { 
                el.style.display = "block"; 
                el.style.opacity = "1"; 
            }
        });
    }, 100);
if (inputBuscador) {
    inputBuscador.addEventListener("keypress", async (e) => {
        if (e.key === "Enter") {
            const termino = inputBuscador.value.toLowerCase().trim();
            if (!termino) return;

            const archivos = ["adolescentes.json", "ciencia.json", "filosofia.json"];
            let encontrados = [];

            try {
                const peticiones = archivos.map(archivo => 
                    fetch(`data/categorias/${archivo}`).then(res => res.json())
                );
                const dataCategorias = await Promise.all(peticiones);

                dataCategorias.forEach(data => {
                    const catNombre = data.categoria || "General";
                    data.libros.forEach(titulo => {
                        if (catNombre.toLowerCase().includes(termino) || titulo.toLowerCase().includes(termino)) {
                            encontrados.push({ titulo, categoria: catNombre });
                        }
                    });
                });

                ejecutarCambioDeSeccion(encontrados);
            } catch (err) {
                console.error("Error en búsqueda:", err);
            }
        }
    });
}
    // BOTÓN VOLVER 
    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            const res = document.getElementById("contenedorBusqueda");
            res.style.display = "none";
            res.style.opacity = "0";
            
            inputBuscador.value = "";

            // 3. MOSTRAR TODO DE NUEVO
            document.querySelectorAll("#masVendidos, #catalogoCompleto, .divisor-scroll").forEach(sec => {
                if (sec) {
                    sec.style.display = "block";
                    setTimeout(() => { sec.style.opacity = "1"; }, 10);
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

function ejecutarCambioDeSeccion(libros) {
    const contenedorPrincipal = document.getElementById("contenedorBusqueda");
    const grillaResultados = document.getElementById("resultadosBusqueda");
    const seccionesOcultar = document.querySelectorAll("#masVendidos, #catalogoCompleto, .divisor-scroll");

    // OCULTAR
    seccionesOcultar.forEach(sec => {
        if (sec) {
            sec.style.opacity = "0";
            setTimeout(() => { sec.style.display = "none"; }, 500);
        }
    });

    // RENDERIZAR
    grillaResultados.innerHTML = "";
    if (libros.length === 0) {
        grillaResultados.innerHTML = `<p style="color:white; padding:40px; text-align:center;">No se hallaron pergaminos con ese nombre...</p>`;
    } else {
        libros.forEach(libro => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "item-carrito-estilo";
            tarjeta.innerHTML = `
                <small style="color:#d4af37; text-transform:uppercase;">${libro.categoria}</small>
                <h4 style="color:white; margin:10px 0;">${libro.titulo}</h4>
                <button class="btnWhatsApp" onclick="agregarAlCarrito('${libro.titulo}')">Añadir</button>
            `;
            grillaResultados.appendChild(tarjeta);
        });
    }

    // MOSTRAR
    setTimeout(() => {
        contenedorPrincipal.style.display = "block";
        setTimeout(() => {
            contenedorPrincipal.style.opacity = "1";
            contenedorPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }, 550);
}

    const btnVolver = document.getElementById("btnVolver");

if (btnVolver) {
    btnVolver.onclick = () => {
        const contenedorBusqueda = document.getElementById("contenedorBusqueda");
        const buscadorInput = document.getElementById("buscador");
        const seccionesARestaurar = document.querySelectorAll("#masVendidos, #catalogoCompleto, .divisor-scroll");

        // 1. Desvanecer resultados
        contenedorBusqueda.style.opacity = "0";

        setTimeout(() => {
            contenedorBusqueda.style.display = "none";
            if (buscadorInput) buscadorInput.value = "";

            seccionesARestaurar.forEach(sec => {
                if (sec) {
                    sec.style.display = "block";
                    setTimeout(() => { sec.style.opacity = "1"; }, 10);
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    };


    // 3. MOSTRAR Y BAJAR
    setTimeout(() => {
        contenedorPrincipal.style.display = "block";
        setTimeout(() => {
            contenedorPrincipal.style.opacity = "1";
            contenedorPrincipal.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }, 550);
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


