
export function generateLibrary(){

const wall=document.getElementById("libraryWall")

if(!wall) return

for(let i=0;i<300;i++){

const book=document.createElement("div")
book.className="book"

wall.appendChild(book)

}

}
