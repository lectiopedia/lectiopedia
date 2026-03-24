buscador.addEventListener("keypress", async function(e) {
    if (e.key === "Enter") {
        let termino = this.value.toLowerCase().trim();
        if (termino === "") return;

        // Definimos las categorías que tienes (Nombres de tus archivos .json)
        const categorias = ["dinero.json", "mente.json", "productividad.json"]; 
        let resultadosEncontrados = [];

        try {
            // El navegador descarga todos los archivos al mismo tiempo
            const promesas = categorias.map(archivo => 
                fetch(`data/categorias/${archivo}`).then(res => res.json())
            );
            
            const todosLosDatos = await Promise.all(promesas);

            todosLosDatos.forEach(data => {
                const nombreCat = data.categoria;
                const matchCategoria = nombreCat.toLowerCase().includes(termino);

                data.libros.forEach(titulo => {
                    // Si coincide la categoría O el título del libro, lo guardamos
                    if (matchCategoria || titulo.toLowerCase().includes(termino)) {
                        resultadosEncontrados.push({
                            titulo: titulo,
                            categoria: nombreCat
                        });
                    }
                });
            });

            mostrarResultados(resultadosEncontrados);

        } catch (err) {
            console.error("Error: Asegúrate de que los nombres en el array 'categorias' coincidan con tus archivos .json", err);
        }
    }
});