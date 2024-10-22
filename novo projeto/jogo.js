function showAlert() {
    alert("Divirta-se!");
}

const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let board = document.getElementById('gameBoard');
let cardValues = [];
let cardIds = [];
let matchedCards = [];

// Embaralhar as cartas
cards.sort(() => 0.5 - Math.random());

// Criar o tabuleiro
function createBoard() {
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.addEventListener('click', flipCard);
        cardElement.innerHTML = `<div class="card-content">${card}</div>`;
        board.appendChild(cardElement);
    });
}

// Virar a carta
function flipCard() {
    const selected = this;
    const cardId = selected.getAttribute('data-id');

    if (cardIds.length < 2 && !matchedCards.includes(cardId) && !cardValues.includes(selected.innerText)) {
        selected.classList.add('flip');
        cardValues.push(selected.innerText);
        cardIds.push(cardId);

        if (cardValues.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// Checar se as cartas combinam
function checkMatch() {
    const [firstCard, secondCard] = cardIds;

    if (cardValues[0] === cardValues[1]) {
        matchedCards.push(firstCard, secondCard);
    } else {
        document.querySelector(`.card[data-id='${firstCard}']`).classList.remove('flip');
        document.querySelector(`.card[data-id='${secondCard}']`).classList.remove('flip');
    }

    cardValues = [];
    cardIds = [];
}

// Iniciar o jogo
createBoard();
