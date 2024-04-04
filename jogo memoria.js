let container = document.querySelector(".memory-game")
let array = ["vue", 'aurelia', 'backbone', 'angular', 'ember', 'react']
let nivel = Number(prompt("Digite o nivel"))

container.innerHTML = ""

for(let i = 0; nivel == 1 ? i <= 2 : i <= 5; i++) {
  container.innerHTML += `<div class="memory-card" data-framework=${array[i]}>
  <img class="front-face" src="./img/${array[i]}.svg" alt="${array[i]}" />
  <img class="back-face" src="./img/js-badge.svg" alt="JS Badge" />
  </div>`
  
  container.innerHTML += `<div class="memory-card" data-framework=${array[i]}>
  <img class="front-face" src="./img/${array[i]}.svg" alt="${array[i]}" />
  <img class="back-face" src="./img/js-badge.svg" alt="JS Badge" />
  </div>`
  
}

let cartas = document.querySelectorAll(".memory-card")
cartas.forEach((carta) => {
  carta.addEventListener("click", virarCarta)
})

let primeiraCarta, 
  segundaCarta, 
  algumaCartaVirou = false, 
  tabuleiroTravado = false

function virarCarta(e) {
    /* console.log(e.target) */
    /* this - representa o objeto ou tag que chamou a função */

    if(tabuleiroTravado) {
      return;
    }

    console.log("chamei a carta")
    this.classList.add("flip")

    if(!algumaCartaVirou) {
      primeiraCarta = this
      algumaCartaVirou = true
      
      return
    }

    if(this == primeiraCarta) {
      return
    }
    
    segundaCarta = this
    algumaCartaVirou = false

    verificarCartasIguais()
}

const verificarCartasIguais = () => {
  if(primeiraCarta.dataset.framework == segundaCarta.dataset.framework) {
    primeiraCarta.removeEventListener("click", virarCarta)
    segundaCarta.removeEventListener("click", virarCarta)
  } else {
    tabuleiroTravado = true

    setTimeout(() => {
      primeiraCarta.classList.remove("flip")
      segundaCarta.classList.remove("flip")
      tabuleiroTravado = false
    }, 1500)
  }
}

const embaralharCartas = () => {
  for(let carta of cartas) {
    //mesma coisa do forEach
    let aleatorio = Math.floor(Math.random() * 12)

    carta.style.order = aleatorio
  }
}

const reiniciar = () => {
  cartas.forEach(carta => {
    carta.addEventListener("click", virarCarta)
    carta.classList.remove("flip")
  })
  primeiraCarta = null
  segundaCarta = null
  algumaCartaVirou = false
  tabuleiroTravado = false

  setTimeout(embaralharCartas, 400)
}

embaralharCartas()
