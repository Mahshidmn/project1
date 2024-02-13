/*----- constants -----*/
const cards = [
	{value: 'clubs_4', image: 'images/clubs_4.svg', matched: false},
	{value: 'clubs_6', image: 'images/clubs_6.svg', matched: false},
	{value: 'clubs_7', image: 'images/clubs_7.svg', matched: false},
	{value: 'clubs_king', image: 'images/clubs_king.svg', matched: false},
	{value: 'clubs_queen', image: 'images/clubs_queen.svg', matched: false},
	{value: 'clubs_4', image: 'images/clubs_4.svg', matched: false},
	{value: 'clubs_6', image: 'images/clubs_6.svg', matched: false},
	{value: 'clubs_7', image: 'images/clubs_7.svg', matched: false},
	{value: 'clubs_king', image: 'images/clubs_king.svg', matched: false},
	{value: 'clubs_queen', image: 'images/clubs_queen.svg', matched: false},
	{value: 'diamonds_5', image: 'images/diamonds_5.svg', matched: false},
	{value: 'diamonds_10', image: 'images/diamonds_10.svg', matched: false},
	{value: 'diamonds_jack', image: 'images/diamonds_jack.svg', matched: false},
	{value: 'diamonds_king', image: 'images/diamonds_king.svg', matched: false},
	{value: 'diamonds_queen', image: 'images/diamonds_queen.svg', matched: false},
	{value: 'diamonds_5', image: 'images/diamonds_5.svg', matched: false},
	{value: 'diamonds_10', image: 'images/diamonds_10.svg', matched: false},
	{value: 'diamonds_jack', image: 'images/diamonds_jack.svg', matched: false},
	{value: 'diamonds_king', image: 'images/diamonds_king.svg', matched: false},
	{value: 'diamonds_queen', image: 'images/diamonds_queen.svg', matched: false},
	{value: 'spades_7', image: 'images/spades_7.svg', matched: false},
	{value: 'spades_8', image: 'images/spades_8.svg', matched: false},
	{value: 'spades_ace', image: 'images/spades_ace.svg', matched: false},
	{value: 'spades_jack', image: 'images/spades_jack.svg', matched: false},
	{value: 'spades_king', image: 'images/spades_king.svg', matched: false},
	{value: 'spades_queen', image: 'images/spades_queen.svg', matched: false},
	{value: 'spades_7', image: 'images/spades_7.svg', matched: false},
	{value: 'spades_8', image: 'images/spades_8.svg', matched: false},
	{value: 'spades_ace', image: 'images/spades_ace.svg', matched: false},
	{value: 'spades_jack', image: 'images/spades_jack.svg', matched: false},
	{value: 'spades_king', image: 'images/spades_king.svg', matched: false},
	{value: 'spades_queen', image: 'images/spades_queen.svg', matched: false},
	{value: 'hearts_6', image: 'images/hearts_6.svg', matched: false},
	{value: 'hearts_9', image: 'images/hearts_9.svg', matched: false},
	{value: 'hearts_jack', image: 'images/hearts_jack.svg', matched: false},
	{value: 'hearts_king', image: 'images/hearts_king.svg', matched: false},
	{value: 'hearts_queen', image: 'images/hearts_queen.svg', matched: false},
	{value: 'hearts_6', image: 'images/hearts_6.svg', matched: false},
	{value: 'hearts_9', image: 'images/hearts_9.svg', matched: false},
	{value: 'hearts_jack', image: 'images/hearts_jack.svg', matched: false},
	{value: 'hearts_king', image: 'images/hearts_king.svg', matched: false},
	{value: 'hearts_queen', image: 'images/hearts_queen.svg', matched: false}
]


/*----- state variables -----*/
const playersObject = {
	'1': 'Player1',
	'-1': 'Player2'
 };
let firstGuess;
let guessAllowed;
let pairs;
let matchedCards;
let winner;

/*----- cached elements  -----*/
const cardElements =  document.querySelectorAll('.card');
const player1PairsElement = document.getElementById('player1-pairs');
const player2PairsElement = document.getElementById('player2-pairs');
const player1PairsContainer = document.getElementById('player1');
const player2PairsContainer = document.getElementById('player2');
const messageElement = document.getElementById('winner-message');
const PlayAgainBtn = document.querySelector('button');



/*----- event listeners -----*/
cardElements.forEach(function(element) {
    element.addEventListener('click', clickHandle);
});
PlayAgainBtn.addEventListener('click',init);

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
	'Player1': 0,
	'Player2': 0
	};
	turn = 1;	
	firstGuess = null;
    guessAllowed = true;
	matchedCards = 0;
    winner = null;

	cardElements.forEach(function (element, index) {
		element.setAttribute('src', "images/red.svg");
	});
	cards.forEach(function(card) {
		card.matched = false;
	});
	
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
  let cardIndex = Array.from(cardElements).indexOf(clickedCard);
 // Get the index of the clicked card

 //??? how can i get the right picture not the mirrored image
 /// the next two lines first change the attribute of the clicked card
// back of the card and then rotate 180 dg which mirrors the card contents
 clickedCard.setAttribute('src', cards[cardIndex].image); 	
 clickedCard.classList.toggle('flipped');
 	  //console.log(cardIndex);
 //???? why although i have gaurd the cards which have these conditions after alert the card flip
	  if (firstGuess === cardIndex || cards[cardIndex].matched === true || guessAllowed === false) {
	alert('invalid guess')
	return;
 }
if (firstGuess === null) {
	firstGuess = cardIndex;
	//console.log(cards[firstGuess]);
	//console.log(cards[cardIndex]);
} else if (cards[firstGuess].value === cards[cardIndex].value) {
		cards[firstGuess].matched = true;
		cards[cardIndex].matched = true;
		firstGuess = null;
		pairs[playersObject[turn]] += 1;
		matchedCards += 2;
		turn *= '-1';
		winner = checkWinner();	
		render();	
				
	 } else { 
	    guessAllowed = false;
		setTimeout (function() {
	    cardElements[firstGuess].setAttribute('src', 'images/red.svg');
		cardElements[cardIndex].setAttribute('src', 'images/red.svg');
		cardElements[firstGuess].classList.remove('flipped');
		cardElements[cardIndex].classList.remove('flipped');
		firstGuess = null;
		guessAllowed = true;
		}, 1500)        
		turn *= '-1';
		    }
		render();
}


function render() {
	
	//renderDeck();
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
// function renderDeck () {
	

// }
function renderPairs() {
	player1PairsElement.innerText = pairs['Player1'];
	player2PairsElement.innerText = pairs['Player2'];
}

function renderTurn () {
   if (turn === 1) {
       player1PairsContainer.style.border = "1vmin solid grey";
       player1PairsContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
	   player2PairsContainer.style.border = "none";
	   player2PairsContainer.style.boxShadow = "none"; 
   } else {
       player2PairsContainer.style.border = "1vmin solid grey";
       player2PairsContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
	   player1PairsContainer.style.border = "none";
	   player1PairsContainer.style.boxShadow = "none"; 
   }
}

function checkWinner() {
	// if there is no more unclicked cards, then:
if (matchedCards === cards.length) {
	if (pairs['Player1'] > pairs['Player2']) {
		  return 'Player1';	
	} else {
		return 'Player2';
	}
	}
return;
}
function renderMessage() {
	//if (winner !== null) {
	//messageElement.innerHTML = `${winner} Wins!`;
	messageElement.innerHTML = winner ? `${winner} Wins!`: null;
	messageElement.style.visibility = winner ? 'visible': 'hidden';
	}




//TODO:
//1.after card being clicked or match, if i click on them, 
//it still flip and come bck to front
//2. flip direction doesnt show the right view of card
//3. check messageElement to be rendered on the page
//. css styling
// renderBoard()??