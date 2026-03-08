const fs = require("fs");
const path = require("path");

const carpetaCategorias = "./categorias";
let todosLosLibros = [];

const archivos = fs.readdirSync(carpetaCategorias);

archivos.forEach(archivo => {

if(archivo.endsWith(".json")){

const ruta = path.join(carpetaCategorias, archivo);

const data = JSON.parse(fs.readFileSync(ruta, "utf8"));

if(data.libros){

todosLosLibros = todosLosLibros.concat(data.libros);

}

}

});

const resultado = {
libros: todosLosLibros
};

fs.writeFileSync("libros.json", JSON.stringify(resultado, null, 2));

console.log("Indice creado con", todosLosLibros.length, "libros");
