const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');

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
            card1.innerHTML = '?';
            card2.innerHTML = '?';
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
