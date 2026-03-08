async function cargarCatalogo(nombreCategoria){

const respuesta = await fetch(`categorias/${nombreCategoria}.json`);
const data = await respuesta.json();

const contenedor = document.getElementById("catalogo");
contenedor.innerHTML = "";

data.libros.forEach(libro => {

const item = document.createElement("div");

item.className = "libro";

item.innerHTML = `
<img src="imagenes/libro.png" class="portadaLibro">
<p class="tituloLibro">${libro}</p>
<button class="botonAgregar">Agregar</button>
`;

contenedor.appendChild(item);

});

}
