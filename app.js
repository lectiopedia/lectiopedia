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

            const archivos = [
    "adolescentes.json",
    "anthony_robbins.json",
    "aprende_sobre_dinero.json",
    "autoayuda_liderazgo.json",
    "best_sellers_modernos.json",
    "brian_tracy.json",
    "ciencia.json",
    "clasicos.json",
    "conviertete_en_el_mejor_fotografo.json",
    "crea_habitos_inquebrantables.json",
    "cuentos_disney.json",
    "desarrollo_personal.json",
    "divulgacion_cientifica.json",
    "domina_el_ingles.json",
    "dummies_domina_tu_materia.json",
    "esenciales_clasicos.json",
    "exito_y_negocio.json",
    "filosofia.json",
    "genera_clientes_de_por_vida.json",
    "grafologia.json",
    "habitos_productividad.json",
    "historia_america_latina.json",
    "historia_griega_clasica.json",
    "historia.json",
    "historietas.json",
    "inteligencia_emocional.json",
    "jacobo_grinberg.json",
    "lectura_super_rapida.json",
    "libros_biblicos.json",
    "literatura.json",
    "marketing_y_multinivel.json",
    "metabolismo.json",
    "nutricion_y_deporte.json",
    "poesias.json",
    "primeros_auxilios.json",
    "psicologia.json",
    "recetas_diabetes.json",
    "recetas_veganas.json",
    "recetas_y_dietas.json",
    "redes_sociales.json",
    "robert_kiyosaki.json",
    "seduccion.json",
    "supera_tu_duelo.json",
    "tdah.json",
    "terapia_de_pareja.json",
    "terror_suspenso_y_mas.json",
    "trading_forex_mercado.json",
    "yooga.json"
];
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
    grillaResultados.innerHTML = `
        <div class="busqueda-vacia">
            <i class="fas fa-scroll"></i> <p>No se hallaron pergaminos con ese nombre en nuestra biblioteca...</p>
            <span>Intenta con otros escritos</span>
        </div>
    `;
    grillaResultados.style.display = "block";
} else {
    grillaResultados.style.display = "grid";
   

        libros.forEach(libro => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-resultado";
            const precioDefecto = 3500;
            tarjeta.innerHTML = `
               <div class="tarjeta-info">
                    <small>${libro.categoria}</small>
                    <h4>${libro.titulo}</h4>
                    <p class="precio-tarjeta">$${precioDefecto}</p>
                </div>
                <button class="btnWhatsApp" onclick="agregarCarrito('${libro.titulo}', ${precioDefecto}, this)">
                    AGREGAR AL CARRITO
                </button>
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


