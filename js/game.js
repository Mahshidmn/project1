/*----- constants -----*/
const cards = [
	{value: '4', image: 'images/clubs_4.svg'},
	{value: '6', image: 'images/clubs_6.svg'},
	{value: '7', image: 'images/clubs_7.svg'},
	{value: 'king', image: 'images/clubs_king.svg'},
	{value: 'queen', image: 'images/clubs_queen.svg'},
	{value: '4', image: 'images/clubs_4.svg'},
	{value: '6', image: 'images/clubs_6.svg'},
	{value: '7', image: 'images/clubs_7.svg'},
	{value: 'king', image: 'images/clubs_king.svg'},
	{value: 'queen', image: 'images/clubs_queen.svg'},
	{value: '5', image: 'images/diamonds_5.svg'},
	{value: '10', image: 'images/diamonds_10.svg'},
	{value: 'jack', image: 'images/diamonds_jack.svg'},
	{value: 'king', image: 'images/diamonds_king.svg'},
	{value: 'queen', image: 'images/diamonds_queen.svg'},
	{value: '5', image: 'images/diamonds_5.svg'},
	{value: '10', image: 'images/diamonds_10.svg'},
	{value: 'jack', image: 'images/diamonds_jack.svg'},
	{value: 'king', image: 'images/diamonds_king.svg'},
	{value: 'queen', image: 'images/diamonds_queen.svg'},
	{value: '7', image: 'images/spades_7.svg'},
	{value: '8', image: 'images/spades_8.svg'},
	{value: 'ace', image: 'images/spades_ace.svg'},
	{value: 'jack', image: 'images/spades_jack.svg'},
	{value: 'king', image: 'images/spades_king.svg'},
	{value: 'queen', image: 'images/spades_queen.svg'},
	{value: '7', image: 'images/spades_7.svg'},
	{value: '8', image: 'images/spades_8.svg'},
	{value: 'ace', image: 'images/spades_ace.svg'},
	{value: 'jack', image: 'images/spades_jack.svg'},
	{value: 'king', image: 'images/spades_king.svg'},
	{value: 'queen', image: 'images/spades_queen.svg'},
	{value: '6', image: 'images/hearts_6.svg'},
	{value: '9', image: 'images/hearts_9.svg'},
	{value: 'jack', image: 'images/hearts_jack.svg'},
	{value: 'king', image: 'images/hearts_king.svg'},
	{value: 'queen', image: 'images/hearts_queen.svg'},
	{value: '6', image: 'images/hearts_6.svg'},
	{value: '9', image: 'images/hearts_9.svg'},
	{value: 'jack', image: 'images/hearts_jack.svg'},
	{value: 'king', image: 'images/hearts_king.svg'},
	{value: 'queen', image: 'images/hearts_queen.svg'}
]


/*----- state variables -----*/
let turn = {
	'1': player1,
	'-1': player2
 }
let pairs;
let winner;

/*----- cached elements  -----*/
const cardElements =  document.querySelectorAll('.card');
const player1PairsElement = document.getElementById('player1');
const player2PairsElement = document.getElementById('player2');
const messageEl = document.getElementById('winner-message');


/*----- event listeners -----*/
cardElements.addEventListener('click', clickHandle);
// cardElements.forEach(function(element, index) {
// 	element.addEventListener('click', function () {
// 		let clickedCard = cardElements[index];
// 		let cardIndex = Array.from(cardElements).indexOf(clickedCard); // Get the index of the clicked card
// 		clickedCard.setAttribute('src', cards[cardIndex].image); 
// 		clickedCard.classList.toggle('flipped');
// 	})
// 	})

/*----- functions -----*/
init();

function init () {
	pairs = {
		'player1': 0,
		'player2': 0
		};
	turn = '1';	
    winner = null;
	shuffle(cards);
	render();
	}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function clickHandle(event) {
	const cardIndex = cardElements.indexOf(event.target);
	event.target.setAttribute('src', cards[cardIndex].image); 
    event.target.classList.toggle('flipped');

}

function render() {
	
	renderDeck();
	// updates the pairs matched
	renderPairs();
	// the player whose turn is the player pairs box get border and shadow
	renderTurn();
	// if there is a winner, pop the message of player1/player2 wins!
	renderMessage();
}
// the click cards stay fixed (cant be flipped) 
// if there has been a match,
// keep the matched cards, they should stay fixed and inctivate them by bluring them
function renderDeck () {
	

}
function renderPairs() {
	for (let key in pairs) {
		const pairsElement = document.getElementById(`${key}-pairs`);
		pairsElement.innerText = pairs[key];
	}
}

function renderTurn () {
	if (turn === '1') {
		player1PairsElement.style.border = "1vmin solid grey";
		player1PairsElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";

	} else {
		player2PairsElement.style.border = "1vmin solid grey";
		player2PairsElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
	}
}
function renderMessage () {
	if (winner === '1') {
			messageEl.innerHTML = `${pairs[winner]} wins`;
	}
}function getWinner () {
	// if there is no more unclicked cards, then:
	// if player1 pairs > player2 pairs => player1 wins 
	// else player 2 wins
}
