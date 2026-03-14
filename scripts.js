let carrito=[]

function abrirCarrito(){
document.getElementById("carritoPanel").classList.toggle("activo")
}

function agregarCarrito(nombre,precio){
carrito.push({nombre,precio})
actualizarCarrito()
}

function eliminar(index){
carrito.splice(index,1)
actualizarCarrito()
}

function actualizarCarrito(){

let contenedor=document.getElementById("itemsCarrito")
let total=0

contenedor.innerHTML=""

carrito.forEach((item,i)=>{

let div=document.createElement("div")

div.innerHTML=item.nombre+" - $"+item.precio+
" <span onclick='eliminar("+i+")'>❌</span>"

contenedor.appendChild(div)

total+=item.precio

})

document.getElementById("contadorCarrito").innerText=carrito.length
document.getElementById("totalCarrito").innerText="Total: $"+total

}

function comprarWhatsApp(){

let mensaje="Hola quiero comprar:%0A"

carrito.forEach(item=>{
mensaje+=item.nombre+"%0A"
})

window.open("https://wa.me/543515101643?text="+encodeURIComponent(mensaje))

}

/* BUSCADOR */

document.getElementById("buscador").addEventListener("keyup",function(){

let filtro=this.value.toLowerCase()

let libros=document.querySelectorAll(".libro")

libros.forEach(libro=>{

let texto=libro.innerText.toLowerCase()

libro.style.display=texto.includes(filtro) ? "block":"none"

})

})

/* CATALOGO AUTOMATICO */

let catalogo={

"Psicología":[
"Psicología Oscura",
"Hábitos Atómicos",
"Inteligencia Emocional"
],

"Negocios":[
"Padre Rico Padre Pobre",
"Piense y Hágase Rico"
],

"Seducción":[
"El Arte de la Seducción"
]

}

let contenedor=document.getElementById("contenedorCatalogo")

for(let categoria in catalogo){

let bloque=document.createElement("div")

bloque.className="categoria"

bloque.innerHTML="<h3>"+categoria+"</h3>"

let librosDiv=document.createElement("div")
librosDiv.className="libros"

catalogo[categoria].forEach(libro=>{

let div=document.createElement("div")

div.className="libro"

div.innerHTML=`
${libro}
<button onclick="agregarCarrito('${libro}',3900)">
Agregar al carrito
</button>
`

librosDiv.appendChild(div)

})

bloque.appendChild(librosDiv)

contenedor.appendChild(bloque)

}

/* NOTIFICACIONES */

let nombres=["Juan","María","Carlos","Lucía"]
let ciudades=["Córdoba","Buenos Aires","Rosario","Mendoza"]

setInterval(()=>{

let nombre=nombres[Math.floor(Math.random()*nombres.length)]
let ciudad=ciudades[Math.floor(Math.random()*ciudades.length)]

let box=document.getElementById("notificacion")

box.innerText=nombre+" de "+ciudad+" compró Psicología Oscura"
box.style.display="block"

setTimeout(()=>box.style.display="none",4000)

},12000)