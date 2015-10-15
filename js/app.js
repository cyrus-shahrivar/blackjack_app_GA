// AUTHOR: CYRUS SHAHRIVAR
// DATE: 10/15/15
// PROJECT: BLACKJACK GAME
//
//

//DECK OBJECT
var Deck = {
    deck: [],
    shuffledDeck: [],
    spentCardStack: [],
    cardValues: [2,3,4,5,6,7,8,9,10,"JACK","QUEEN","KING","ACE"],
    cardRealValues: [2,3,4,5,6,7,8,9,10,10,10,10,1],
    cardSuitsTypes: ["Hearts","Spades","Clubs","Diamonds"],
    createDeck: function(){
      // updates this.deck to a full deck of 52 cards as objects with value and suit
      for(var i=0; i<this.cardSuitsTypes.length; i++){
        for(var j=0; j<this.cardValues.length; j++){
          this.deck.push({value: this.cardValues[j], suit: this.cardSuitsTypes[i], realValue: this.cardRealValues[j]});
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
//set bank amount
var bankAmount = 1000;
$("#bankAmount").text(bankAmount);

//create deck and shuffle
Deck.createDeck();
Deck.shuffleDeck();

//make bet
var betAmount = prompt("Make a bet");
$("#betAmount").text(betAmount);

//deal cards
//give player two cards
var playerCards = [];
var cardTake1 = Deck.shuffledDeck[Deck.shuffledDeck.length - 1];
var cardTake2 = Deck.shuffledDeck[Deck.shuffledDeck.length - 2];
playerCards.push(cardTake1);
playerCards.push(cardTake2);

//give computer two cards
var dealerCards = [];
var cardTake3 = Deck.shuffledDeck[Deck.shuffledDeck.length - 3];
var cardTake4 = Deck.shuffledDeck[Deck.shuffledDeck.length - 4];
dealerCards.push(cardTake3);
dealerCards.push(cardTake4);

//need to pop cards too
Deck.shuffledDeck.pop();
Deck.shuffledDeck.pop();
Deck.shuffledDeck.pop();
Deck.shuffledDeck.pop();

//display all cards
//display player cards
$("#playerCards").text(playerCards[0].value + " " + playerCards[1].value);
//display dealer cards
$("#dealerCards").text(dealerCards[0].value + " " + dealerCards[1].value);

//check for blackjacks
var cardVal1 = playerCards[0].realValue;
var cardVal2 = playerCards[1].realValue;
var cardVal3 = dealerCards[0].realValue;
var cardVal4 = dealerCards[1].realValue;
var playerCurrentSum = cardVal1 + cardVal2;
var dealerCurrentSum = cardVal3 + cardVal4;

if(playerCurrentSum === 21 && dealerCurrentSum !== 21){
  //return "player wins blackjack";
  console.log("player wins blackjack");
}
console.log("player sum", playerCurrentSum);
console.log("dealer sum", dealerCurrentSum);


//choose either hit or stand
//player choice
var hitOrStandPlayer = prompt("Hit or Stand?");
//var dealerChoices = ["hit", "stand"];--OLD

//dealer choice
// var hitOrStandDealer = Math.floor(dealerChoices.length*Math.random()); --OLD
var hitDealer = function(){
  //select dealer cards location
  var dealerCardsElement = $("#dealerCards");

  //take the last card from the end of the deck
  var newCardTake = Deck.shuffledDeck[Deck.shuffledDeck.length-1];
  console.log("hit dealer card value", newCardTake.realValue);

  //add that card to the dealer cards array
  dealerCards.push(newCardTake);

  //remove the last card in the deck "the top of the card stack"
  Deck.shuffledDeck.pop();
  console.log("cards left in deck", Deck.shuffledDeck.length);

  //create new card element for dealer cards area on table and show it
  dealerCardsElement.append($("<p>").text(newCardTake.value));

  //add value to dealerCurrentSum
  dealerCurrentSum += newCardTake.realValue;

  //return dealerCurrentSum
  //return dealerCurrentSum;
  console.log("dealer new sum", dealerCurrentSum);
};

var hitOrStandDealer = function(dealerCurrentSum){
  if(dealerCurrentSum<17){
    hitDealer();
  }
  //return "stand";
  console.log("computer stands or is done");
};
hitOrStandDealer(dealerCurrentSum);


//check for win/tie - evaluate choices
// Get 21 points on the player's first two cards (called a blackjack), without a dealer blackjack
// Reach a final score higher than the dealer without exceeding 21; or
// Let the dealer draw additional cards until his or her hand exceeds 21.
// if( D<17) (D must hit)
// if (P<=21 && P>D) if(P=21)(return P wins, "Blackjack") (return P wins)
// if (P>21 && P<D) (return D wins)
// if(D>21 || D<P) ( return P wins)
// if(P=D)(return TIE)


//if win, add to bank
//if lose, deduct from bank








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
