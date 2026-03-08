async function cargarCatalogo(nombreCategoria){

const respuesta = await fetch(`categorias/${nombreCategoria}.json`);
const data = await respuesta.json();

const contenedor = document.getElementById("catalogo");
contenedor.innerHTML = "";

data.libros.forEach(libro => {

const item = document.createElement("div");

item.className = "libro";

item.textContent = libro;

contenedor.appendChild(item);

});

}
