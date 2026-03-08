
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
