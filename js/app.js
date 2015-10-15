// AUTHOR: CYRUS SHAHRIVAR
// DATE: 10/15/15
// PROJECT: BLACKJACK GAME
//
//

//DECK OBJECT
var Deck = {
    deck: [],
    shuffledDeck: [],
    cardValues: [2,3,4,5,6,7,8,9,10,"JACK","QUEEN","KING","ACE"],
    cardSuitsTypes: ["Hearts","Spades","Clubs","Diamonds"],
    createDeck: function(){
      // updates this.deck to a full deck of 52 cards as objects with value and suit
      for(var i=0; i<this.cardSuitsTypes.length; i++){
        for(var j=0; j<this.cardValues.length; j++){
          this.deck.push({value: this.cardValues[j], suit: this.cardSuitsTypes[i]});
        }
      }
    },
    shuffleDeck: function(){
      // updates shuffledDeck to a full deck of 52 shuffled cards using random selection
      var length = this.deck.length;
      for(var i = 0; i<length; i++){
        var randomNum = Math.floor(this.deck.length*Math.random());
        this.shuffledDeck.push(this.deck[randomNum]);
        this.deck.splice(randomNum,1);
      }
    }
};

// Game Play
Deck.createDeck();
Deck.shuffleDeck();
//var shuffledDeck = Deck.shuffleDeck();
// - Deck Object
//  - deal()
//  - numberOfDecks - optional
// - Dealer Object
//  - hitMe()
//  - standMe()
//  - currentHand
//  - houseBank
// - Player Object
//  - hitMe()
//  - standMe()
//  - currentHand
//  - bet()
//  - currentBet
//  - currentBank
// - Table Object
//  - setTable()
//  - currentPlayer
// - Game Object
//  - gameHelpMenu()
//  - startGame()
//  - continueGame()
//  - endGame()
//  - checkWinStatus()
//  - table
// - Game Calls
//  - Game.startGame
//  - Game.helpMenu
//  - continue Game unless
//    - player quits
//  - Game.endGame
