const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; // Duplica las cartas para hacer pares
let flippedCards = [];
let matchedCards = [];
let gameBoard = document.getElementById('game-board');
let startTime; // Variable para registrar el tiempo de inicio
let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0; // Obtener puntaje más alto almacenado

// Mostrar puntajes en la página
document.getElementById('current-score').innerText = `Puntaje actual: ${currentScore}`;
document.getElementById('high-score').innerText = `Puntaje más alto: ${highScore}`;

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

    flippedCards = [];
    matchedCards = [];
    currentScore = 0;
    startTime = new Date(); // Registrar el tiempo de inicio
    document.getElementById('current-score').innerText = `Puntaje actual: ${currentScore}`;
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
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            let endTime = new Date(); // Obtener el tiempo de finalización
            let timeTaken = Math.floor((endTime - startTime) / 1000); // Tiempo en segundos
            currentScore = calculateScore(timeTaken); // Calcular el puntaje basado en el tiempo
            document.getElementById('current-score').innerText = `Puntaje actual: ${currentScore}`;
            setTimeout(() => {
                alert(`¡Has ganado! Tiempo: ${timeTaken} segundos. Puntaje: ${currentScore}`);
                saveHighScore(); // Guardar el puntaje más alto si corresponde
            }, 500);
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

// Función para calcular el puntaje basado en el tiempo
function calculateScore(timeTaken) {
    // Cuanto menor sea el tiempo, mayor será el puntaje.
    // Aquí se puede ajustar la fórmula según prefieras la dificultad
    return Math.max(100 - timeTaken, 0); // 100 puntos menos 1 punto por segundo
}

// Guardar puntaje más alto
function saveHighScore() {
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore); // Guardar en localStorage
        document.getElementById('high-score').innerText = `Puntaje más alto: ${highScore}`;
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
