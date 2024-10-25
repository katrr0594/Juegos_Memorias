let cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
let n=0;
let contador = 0;

// Función para mezclar las cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generar el tablero de juego
function createBoard() {
    gameBoard.innerHTML = ''; // Limpiar el tablero
    n=numeros();
    shuffle(cards).forEach((value, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.style.backgroundImage= "url('img/fondo"+n+".jpg')";
        card.style.color="#fff"
        card.innerHTML = ''; // Mostrar un signo hasta que se dé la vuelta
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

//Crear objetos de sonidos

var coincidencia = new Audio('coincidencia.mp3');
var giro = new Audio('giro.mp3');

// Función para reproducir sonido
function playcoincidencia()
{
    coincidencia.play();
}



// Función para voltear la carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.value;
        giro.play();
        flippedCards.push(this);
contador++;
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Verificar si las cartas coinciden
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        coincidencia.play();
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }

}


// Reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    createBoard();
});

// Inicializar el juego
createBoard();

function numeros(){
    return Math.floor(Math.random() * 4) + 1;
}

function cambiaIconos(){
    maestro=[
        {
            datos: ['1','2','3','4','5','6','7','8']
        },
        {
            datos: ['©','®','۝','Ø','¢','@','Δ','۞']
        },
        {
            datos: ['I','II','III','IV','V','VI','VII','X']
        },
        {
            datos: ['֍','۞','ۨ','♫','♣','☺','♠','▲']
        }

    ]
    let n=numeros();
    let cards_nuevo=maestro[n-1].datos;
    cards = [...cards_nuevo, ...cards_nuevo];
    createBoard();
}
let movimientos = 0; // Variable global para contar los movimientos

// Función para inicializar el juego
function iniciarJuego() {
    // Aquí va la lógica para generar las cartas
    // Por ejemplo, podrías agregar cartas a tu tablero:
    // const cartas = ['A', 'A', 'B', 'B', ...]; // Ejemplo de cartas
    // barajar y crear las cartas en el tablero
    movimientos = 0; // Reiniciar el contador de movimientos
    mostrarMovimientos(); // Mostrar el contador inicial
}

// Función para manejar el movimiento del jugador
function hacerMovimiento() {
    // Aquí puedes agregar la lógica para procesar el movimiento (ej. descubrir carta)
    // ...

    // Incrementa el contador de movimientos
    movimientos += 1;

    // Actualiza el contador en la interfaz
    mostrarMovimientos();
}

// Función para mostrar el número de movimientos
function mostrarMovimientos() {
    document.getElementById("movimientos").innerText = "Movimientos realizados: " + movimientos;
}

// Asignar eventos a las cartas
// Supongamos que tienes un array de cartas generadas dinámicamente
const cartas = document.querySelectorAll(".carta");
cartas.forEach(carta => {
    carta.addEventListener("click", hacerMovimiento);
});

// Reiniciar el juego
document.getElementById("reset-btn").addEventListener("click", iniciarJuego);

// Iniciar el juego cuando cargue la página
window.onload = iniciarJuego;
