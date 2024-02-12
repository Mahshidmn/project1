/*----- constants -----*/
const cards = [
	{value: 'clubs_4', image: 'images/clubs_4.svg'},
	{value: 'clubs_6', image: 'images/clubs_6.svg'},
	{value: 'clubs_7', image: 'images/clubs_7.svg'},
	{value: 'clubs_king', image: 'images/clubs_king.svg'},
	{value: 'clubs_queen', image: 'images/clubs_queen.svg'},
	{value: 'clubs_4', image: 'images/clubs_4.svg'},
	{value: 'clubs_6', image: 'images/clubs_6.svg'},
	{value: 'clubs_7', image: 'images/clubs_7.svg'},
	{value: 'clubs_king', image: 'images/clubs_king.svg'},
	{value: 'clubs_queen', image: 'images/clubs_queen.svg'},
	{value: 'diamonds_5', image: 'images/diamonds_5.svg'},
	{value: 'diamonds_10', image: 'images/diamonds_10.svg'},
	{value: 'diamonds_jack', image: 'images/diamonds_jack.svg'},
	{value: 'diamonds_king', image: 'images/diamonds_king.svg'},
	{value: 'diamonds_queen', image: 'images/diamonds_queen.svg'},
	{value: 'diamonds_5', image: 'images/diamonds_5.svg'},
	{value: 'diamonds_10', image: 'images/diamonds_10.svg'},
	{value: 'diamonds_jack', image: 'images/diamonds_jack.svg'},
	{value: 'diamonds_king', image: 'images/diamonds_king.svg'},
	{value: 'diamonds_queen', image: 'images/diamonds_queen.svg'},
	{value: 'spades_7', image: 'images/spades_7.svg'},
	{value: 'spades_8', image: 'images/spades_8.svg'},
	{value: 'spades_ace', image: 'images/spades_ace.svg'},
	{value: 'spades_jack', image: 'images/spades_jack.svg'},
	{value: 'spades_king', image: 'images/spades_king.svg'},
	{value: 'spades_queen', image: 'images/spades_queen.svg'},
	{value: 'spades_7', image: 'images/spades_7.svg'},
	{value: 'spades_8', image: 'images/spades_8.svg'},
	{value: 'spades_ace', image: 'images/spades_ace.svg'},
	{value: 'spades_jack', image: 'images/spades_jack.svg'},
	{value: 'spades_king', image: 'images/spades_king.svg'},
	{value: 'spades_queen', image: 'images/spades_queen.svg'},
	{value: 'hearts_6', image: 'images/hearts_6.svg'},
	{value: 'hearts_9', image: 'images/hearts_9.svg'},
	{value: 'hearts_jack', image: 'images/hearts_jack.svg'},
	{value: 'hearts_king', image: 'images/hearts_king.svg'},
	{value: 'hearts_queen', image: 'images/hearts_queen.svg'},
	{value: 'hearts_6', image: 'images/hearts_6.svg'},
	{value: 'hearts_9', image: 'images/hearts_9.svg'},
	{value: 'hearts_jack', image: 'images/hearts_jack.svg'},
	{value: 'hearts_king', image: 'images/hearts_king.svg'},
	{value: 'hearts_queen', image: 'images/hearts_queen.svg'}
]


/*----- state variables -----*/
const playersObject = {
	'1': 'player1',
	'-1': 'player2'
 };
let firstGuess = null;
let pairs = {};
let winner = null;

/*----- cached elements  -----*/
const cardElements =  document.querySelectorAll('.card');
const player1PairsElement = document.getElementById('player1');
const player2PairsElement = document.getElementById('player2');
const messageEl = document.getElementById('winner-message');


/*----- event listeners -----*/
cardElements.forEach(function(element) {
    element.addEventListener('click', clickHandle);
});

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
	turn = 1;	
    winner = null;
	shuffle(cards);
	render();
	}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;
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
  let clickedCard = event.target;
  let cardIndex = Array.from(cardElements).indexOf(clickedCard); // Get the index of the clicked card
	  clickedCard.setAttribute('src', cards[cardIndex].image); 	
	  clickedCard.classList.toggle('flipped');
 	  //console.log(cardIndex);
		
	  if (firstGuess === null) {
			firstGuess = cardIndex;
			//console.log(cards[firstGuess]);
			// fix the card, no rotate
			//console.log(cards[cardIndex]);
	  } else if (cards[firstGuess].value === cards[cardIndex].value) {
			firstGuess = null;
			pairs[playersObject[turn]] += 1;
					// check for the winner)
				
			turn *= '-1';		
				
	  } else { 
			 setTimeout (function() {
			 cardElements[firstGuess].setAttribute('src', 'images/red.svg');
			 cardElements[cardIndex].setAttribute('src', 'images/red.svg');
			 cardElements[firstGuess].classList.remove('flipped');
			 cardElements[cardIndex].classList.remove('flipped');
			 firstGuess = null;
			}, 1500)
			        
			 turn *= '-1';
		    }
			
			render();
}


function render() {
	
	//renderDeck();
	// updates the pairs matched
	//renderPairs();
	// the player whose turn is the player pairs box get border and shadow
	renderTurn();
	// if there is a winner, pop the message of player1/player2 wins!
	//renderMessage();
}
// the click cards stay fixed (cant be flipped) 
// if there has been a match,
// keep the matched cards, they should stay fixed and inctivate them by bluring them
// function renderDeck () {
	

// }
// function renderPairs() {
// 	for (let key in pairs) {
// 		const pairsElement = document.getElementById(`${key}-pairs`);
// 		pairsElement.innerText = pairs[key];
// 	}
// }

function renderTurn () {
   if (turn === 1) {
       player1PairsElement.style.border = "1vmin solid grey";
       player1PairsElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
	   player2PairsElement.style.border = "none";
	   player2PairsElement.style.boxShadow = "none"; 
   } else {
       player2PairsElement.style.border = "1vmin solid grey";
       player2PairsElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
	   player1PairsElement.style.border = "none";
	   player1PairsElement.style.boxShadow = "none"; 
   }
}
//function renderMessage () {
// 	if (winner === '1') {
// 			messageEl.innerHTML = `${pairs[winner]} wins`;
// 			console.log(messageEl.innerHTMl);
// 	}
//}
//function getWinner () {
	// if there is no more unclicked cards, then:
	// if player1 pairs > player2 pairs => player1 wins 
	// else player 2 wins
//}
