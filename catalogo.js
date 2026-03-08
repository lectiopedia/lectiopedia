async function cargarCatalogo(nombreCategoria){

const respuesta = await fetch(`categorias/${nombreCategoria}.json`);
const data = await respuesta.json();

const contenedor = document.getElementById("catalogoLibros");

contenedor.innerHTML = "";

let indice = 0;
const cantidad = 40;

function cargarMas(){

for(let i = 0; i < cantidad && indice < data.libros.length; i++){

const libro = data.libros[indice];

const item = document.createElement("div");

item.className = "libro";

item.innerHTML = `
<img src="https://source.unsplash.com/200x300/?book" class="portadaLibro">
<p class="tituloLibro">${libro}</p>
<button class="botonAgregar">Agregar</button>
`;

contenedor.appendChild(item);

indice++;

}

}

cargarMas();

window.onscroll = function(){

if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 200){

cargarMas();

}

};

}
