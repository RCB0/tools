const cardsArray = [
    { 'name': 'A', 'img': 'A' },
    { 'name': 'B', 'img': 'B' },
    { 'name': 'C', 'img': 'C' },
    { 'name': 'D', 'img': 'D' },
    { 'name': 'E', 'img': 'E' },
    { 'name': 'F', 'img': 'F' },
    { 'name': 'G', 'img': 'G' },
    { 'name': 'H', 'img': 'H' }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

const game = document.getElementById('memory-game');
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = item.img;

    game.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

game.addEventListener('click', event => {
    const clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('flip')) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('flip');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('flip');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        }
        previousTarget = clicked;
    }
});

function match() {
    const selected = document.querySelectorAll('.flip');
    selected.forEach(card => {
        card.classList.add('match');
    });
}

function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.flip:not(.match)');
    selected.forEach(card => {
        card.classList.remove('flip');
    });
}
