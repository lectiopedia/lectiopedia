
import {startCountdown} from './modules/contador.js'
import {generateLibrary} from './modules/biblioteca.js'
import {loadCatalogs} from './modules/catalogos.js'
import {createBackground} from './modules/background.js'

startCountdown()
generateLibrary()
loadCatalogs()
createBackground()
function abrirMenu(){

const menu = document.getElementById("menuLateral");

menu.classList.toggle("menuAbierto");

}
async function cargarPopulares(){

const contenedor = document.getElementById("librosPopulares");

const respuesta = await fetch("categorias/psicologia.json");

const data = await respuesta.json();

data.libros.slice(0,20).forEach(libro => {

const item = document.createElement("div");

item.className = "libro";

item.innerHTML = `
<img src="https://source.unsplash.com/200x300/?book" class="portadaLibro">
<p>${libro}</p>
`;

contenedor.appendChild(item);

});

}

cargarPopulares();
async function cargarRecomendados(){

const contenedor = document.getElementById("librosRecomendados");

const respuesta = await fetch("categorias/desarrollo_personal.json");

const data = await respuesta.json();

data.libros.slice(0,15).forEach(libro => {

const item = document.createElement("div");

item.className = "libro";

item.innerHTML = `
<img src="https://source.unsplash.com/200x300/?book" class="portadaLibro">
<p>${libro}</p>
`;

contenedor.appendChild(item);

});

}

async function cargarVendidos(){

const contenedor = document.getElementById("librosVendidos");

const respuesta = await fetch("categorias/exito_y_negocio.json");

const data = await respuesta.json();

data.libros.slice(0,15).forEach(libro => {

const item = document.createElement("div");

item.className = "libro";

item.innerHTML = `
<img src="https://source.unsplash.com/200x300/?bookstore" class="portadaLibro">
<p>${libro}</p>
`;

contenedor.appendChild(item);

});

}

cargarRecomendados();
cargarVendidos();
function crearLibro(titulo){

const card = document.createElement("div");

card.className = "libroCard";

card.textContent = titulo;

return card;

}

function cargarFila(id, libros){

const contenedor = document.getElementById(id);

libros.slice(0,20).forEach(libro => {

contenedor.appendChild(crearLibro(libro));

});

}
