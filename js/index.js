var suits = [
	{ id: 1, name: "hearts" },
	{ id: 2, name: "diamonds" },
	{ id: 3, name: "spades" },
	{ id: 4, name: "clubs" },
];

let suitCheck = suits.filter((suit) => suit.id === 1);
console.log(suitCheck);

function Card(suit, rank) {
	this.suit = suit;
	this.cardCont = document.createElement("div");
	this.cardCont.className = "card_container";
	this.getSuit = function () {
		let s = suits.filter((suit) => suit.id == this.suit);
		return s.shift().name;
	};
	this.rank = rank;
	this.build = function (parentFrag) {
		var suitCont = document.createElement("div"),
			cardValue = document.createElement("div");
		suitCont.className = this.getSuit();
		cardValue.innerHTML = this.rank;

		suitCont.appendChild(cardValue);
		this.cardCont.appendChild(suitCont);
		console.log(this.cardCont);
		parentFrag.appendChild(this.cardCont);
	};
}

function Deck() {
	this.cards = [];
	for (suit = 4; suit > 0; suit--) {
		for (rank = 13; rank > 0; rank--) {
			this.cards.push(new Card(suit, rank));
		}
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
		this.cards.map((card) => card.build(parentFrag));
		var frag = document.createElement("div");
		frag.appendChild(parentFrag);
		console.log(frag);
		return frag;
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
var deck = new Deck();
console.log(deck.cards);
var cards = deck.cards;
console.log(cards.map((card) => Object.values(card)));
var stack = document.querySelector("#stack");
stack.innerHTML = "";
document.getElementById("stack").appendChild(deck.buildDeck());
// console.log(deck.buildDeck());
