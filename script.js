//modificaciones para dos jugadores
const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
let currentPlayer = 1;
let scores = [0, 0]; // Puntajes de los jugadores

// Función para mezclar las cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Generar el tablero de juego
function createBoard() {
    gameBoard.innerHTML = ''; // Limpiar el tablero
    shuffle(cards).forEach((value, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = '?'; // Mostrar un signo hasta que se dé la vuelta
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para voltear la carta
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerHTML = this.dataset.value;
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
        scores[currentPlayer - 1]++; // Incrementar puntaje del jugador actual
        updateScores();
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert(`¡Jugador ${currentPlayer} ha ganado!`), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '?';
            card2.innerHTML = '?';
            flippedCards = [];
            // Cambiar de jugador
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            alert(`Turno del Jugador ${currentPlayer}`);
        }, 1000);
    }
}

// Actualizar puntajes en la pantalla
function updateScores() {
    document.getElementById('scoreboard').innerHTML = `Jugador 1: ${scores[0]} - Jugador 2: ${scores[1]}`;
}

// Reiniciar el juego
document.getElementById('reset-btn').addEventListener('click', () => {
    flippedCards = [];
    matchedCards = [];
    scores = [0, 0];
    currentPlayer = 1; // Reiniciar al jugador 1
    updateScores();
    createBoard();
});

// Inicializar el juego
createBoard();
updateScores();
