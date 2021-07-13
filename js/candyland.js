var suits = [
	{ id: 1, name: "red" },
	{ id: 2, name: "purple" },
	{ id: 3, name: "yellow" },
	{ id: 4, name: "blue" },
	{ id: 5, name: "orange" },
	{ id: 6, name: "green" },
];
var specialty = [
	{ id: 1, name: "plumpy" },
	{ id: 2, name: "mr-mint" },
	{ id: 3, name: "jolly" },
	{ id: 4, name: "grandma-nutt" },
	{ id: 5, name: "lolly" },
	{ id: 6, name: "frostine" },
];

var stack = document.querySelector("#stack");

let suitCheck = suits.filter((suit) => suit.id === 1);
// console.log(suitCheck);

function Card(suit, number) {
	this.suit = suit;
	this.cardCont = document.createElement("div");
	this.cardCont.className = "card_container";
	this.getSuit = function () {
		let s = suits.filter((suit) => suit.id == this.suit);
		return s.shift().name;
	};
	this.getSpecialty = function () {
		let s = specialty.filter((suit) => suit.id == this.suit);
		return s.shift().name;
	};
	this.number = number;
	this.build = function (parentFrag) {
		var suitCont = document.createElement("div");
		suitCont.className = this.getSuit();
		suitCont.classList.add("color");
		while (number > 0) {
			square = document.createElement("div");
			square.className = "square";
			suitCont.appendChild(square);
			number--;
		}

		this.cardCont.appendChild(suitCont);
		this.cardCont.onclick = cardClick;
		// console.log(this.cardCont);
		parentFrag.appendChild(this.cardCont);
	};
	this.buildSpecialty = function (parentFrag) {
		var suitCont = document.createElement("div");
		suitCont.className = this.getSpecialty();
		suitCont.classList.add("specialty");

		this.cardCont.appendChild(suitCont);
		this.cardCont.onclick = cardClick;
		parentFrag.appendChild(this.cardCont);
	};
}

var cardClick = (function (e) {
	var counter = 0;

	return function (e) {
		e.currentTarget.style.top = 0;
		e.currentTarget.style.left = 0;
		e.currentTarget.style.zIndex = counter;
		counter++;
		// console.log(counter);
		if (counter >= 66) {
			counter = 0;
			deck.rebuildDeck();
		}
		var cardID = e.currentTarget;
		cardID.onclick = "";
		document.querySelector(".discard_div").appendChild(cardID);
	};
})();

function shuffleClick(e) {
	stack.innerHTML = "";
	var deck = new Deck();
	var discard = new DiscardPile();
	stack.appendChild(deck.buildDeck());
	stack.appendChild(discard.init());
	// console.log(e.target.parentNode);
	e.target.parentNode.innerHTML = "";
}

function Deck() {
	this.cards = [];
	for (suit = 6; suit > 0; suit--) {
		for (square = 2; square > 0; square--) {
			if (square == 2) {
				for (number = 4; number > 0; number--) {
					this.cards.push(new Card(suit, square));
				}
			} else {
				for (number = 6; number > 0; number--) {
					this.cards.push(new Card(suit, square));
				}
			}
		}
	}
	for (i = specialty.length; i > 0; i--) {
		this.cards.push(new Card(i, 0));
	}
	this.shuffle = function () {
		var j, x, i;
		for (i = this.cards.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = this.cards[i];
			this.cards[i] = this.cards[j];
			this.cards[j] = x;
		}
	};
	this.buildDeck = function () {
		this.shuffle();
		var parentFrag = document.createDocumentFragment();
		this.cards.map((card) => {
			if (card.number > 0) {
				card.build(parentFrag);
			} else {
				card.buildSpecialty(parentFrag);
			}
		});

		var frag = document.createElement("div");
		frag.className = "deck_div";
		frag.appendChild(parentFrag);
		var cards = frag.children;
		for (var i = cards.length - 1; i >= 0; i--) {
			cards[i].style.top = i + "px";
			cards[i].style.left = i + "px";
		}
		// console.log(frag);
		return frag;
	};
	this.rebuildDeck = function () {
		var button_div = document.createElement("div");
		Object.assign(button_div.style, {
			display: "block",
			flex: "1 0 100%",
		});

		var button = document.createElement("button");
		button.innerText = "Shuffle";
		button_div.appendChild(button);
		console.log(button_div);
		stack.parentNode.appendChild(button_div);
		button.onclick = shuffleClick;
	};
	this.getCards = function (number) {
		if (typeof number === "undefined") number = 1;
		var returnCards = [];
		for (var i = number; i > 0; i--) {
			returnCards.push(this.cards.pop());
		}
		return returnCards;
	};
	this.getCard = function () {
		return this.getCards(1);
	};
	this.shuffle();
}

function DiscardPile() {
	this.init = function () {
		var pile = document.createElement("div");
		pile.className = "discard_div";
		return pile;
	};
}

var deck = new Deck();
var discard = new DiscardPile();
console.log(deck.cards);
var cards = deck.cards;
// console.log(cards.map((card) => Object.values(card)));
stack.innerHTML = "";
stack.appendChild(deck.buildDeck());
stack.appendChild(discard.init());

// console.log(deck.buildDeck());
