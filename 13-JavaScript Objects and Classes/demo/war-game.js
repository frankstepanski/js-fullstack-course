/* **************************************** 
*  WAR Card Game (Command Line Version)
*  ====================================
*  This is a simplified version of the classic card game "War".
*  The game is built using Object-Oriented Programming (OOP) in JavaScript,
*  and consists of four main classes:
*    - Card: Represents a single playing card with suit and rank
*    - Deck: Represents a full 52-card deck and handles shuffling/dealing
*    - Player: Holds each player's hand and their current score
*    - Dealer: Manages the game loop, distributes cards, and determines round winners
*
*  A third array `values` is used to determine the value of each card rank for comparison.
*  The game plays exactly 26 rounds, one card from each player per round (52 cards total).
*  The player with the most points at the end wins.
******************************************/

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const values = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
  "7": 7, "8": 8, "9": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13, "A": 14
};

// Represents a single playing card
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.value = values[rank];
  }

  describe() {
    return `${this.rank} of ${this.suit}`;
  }
}

// Represents a full deck of cards
class Deck {
  constructor() {
    this.cards = [];
    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  // Shuffle the deck using Fisher-Yates algorithm
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // Deal 26 cards to each player
  deal() {
    const mid = this.cards.length / 2;
    return [this.cards.slice(0, mid), this.cards.slice(mid)];
  }
}

// Represents a player in the game
class Player {
  constructor(name, hand) {
    this.name = name;
    this.hand = hand;
    this.score = 0;
  }

  playCard() {
    return this.hand.shift();
  }

  incrementScore() {
    this.score++;
  }
}

// Manages the game logic
class Dealer {
  constructor(player1Name, player2Name) {
    const deck = new Deck();
    deck.shuffle();
    const [hand1, hand2] = deck.deal();

    this.player1 = new Player(player1Name, hand1);
    this.player2 = new Player(player2Name, hand2);
  }

  playGame() {
    console.log(`🎮 Starting WAR between ${this.player1.name} and ${this.player2.name}
`);

    for (let round = 1; round <= 26; round++) {
      const card1 = this.player1.playCard();
      const card2 = this.player2.playCard();

      console.log(`Round ${round}:`);
      console.log(`${this.player1.name} plays ${card1.describe()}`);
      console.log(`${this.player2.name} plays ${card2.describe()}`);

      if (card1.value > card2.value) {
        this.player1.incrementScore();
        console.log(`👉 ${this.player1.name} wins the round
`);
      } else if (card1.value < card2.value) {
        this.player2.incrementScore();
        console.log(`👉 ${this.player2.name} wins the round
`);
      } else {
        console.log("🤝 It's a tie!");
      }
    }

    console.log("🏁 Game Over!");
    console.log(`${this.player1.name}'s score: ${this.player1.score}`);
    console.log(`${this.player2.name}'s score: ${this.player2.score}`);

    if (this.player1.score > this.player2.score) {
      console.log(`🏆 ${this.player1.name} wins the game!`);
    } else if (this.player1.score < this.player2.score) {
      console.log(`🏆 ${this.player2.name} wins the game!`);
    } else {
      console.log("🤝 It's a draw!");
    }
  }
}

// Create a game and start it
const game = new Dealer("Alice", "Bob");
game.playGame();