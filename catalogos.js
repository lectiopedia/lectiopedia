
export function startCountdown(){

let time = 7200

setInterval(()=>{

let h=Math.floor(time/3600)
let m=Math.floor((time%3600)/60)
let s=time%60

const el=document.getElementById("countdown")

if(el){
el.innerText =
String(h).padStart(2,'0')+":" +
String(m).padStart(2,'0')+":" +
String(s).padStart(2,'0')
}

time--

if(time<0){time=7200}

},1000)

}
