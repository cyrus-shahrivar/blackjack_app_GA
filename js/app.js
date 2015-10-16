// AUTHOR: CYRUS SHAHRIVAR
// DATE: 10/15/15
// PROJECT: BLACKJACK GAME
//
//

//DOCUMENT READY
//$(function(){}); onload function TO WRAP AROUND all

//DECK OBJECT
var Deck = {
    numberOfDecks: 1,
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

//PLAYER OBJECT
var Player = {
  //set bank amount
  bankAmount: 1000,
  playerCards: [],
  currentBet: 0,
  hitStandStatus: "",
  cardSum: 0,
  postBankAmount: function(){
    //post to html
    $("#bankAmount").text(this.bankAmount);
  },
  makeBet: function(){
    //make bet
    var betAmount = prompt("Make a bet");
    $("#betAmount").text(betAmount);
    this.currentBet = betAmount;
  },
  playerHitOrStand: function(){
    //player choice
    this.hitStandStatus = prompt("Hit or Stand?").toLowerCase();
  }
};

//DEALER OBJECT
var Dealer = {
  dealerCards: [],
  hitStandStatus: "",
  cardSum: 0,
  dealFirstCards: function(){
    //deal cards
    //give player two cards
    var cardTake1 = Deck.shuffledDeck[Deck.shuffledDeck.length - 1];
    var cardTake2 = Deck.shuffledDeck[Deck.shuffledDeck.length - 2];
    Player.playerCards.push(cardTake1);
    Player.playerCards.push(cardTake2);

    //give computer two cards
    var cardTake3 = Deck.shuffledDeck[Deck.shuffledDeck.length - 3];
    var cardTake4 = Deck.shuffledDeck[Deck.shuffledDeck.length - 4];
    this.dealerCards.push(cardTake3);
    this.dealerCards.push(cardTake4);

    //need to pop cards too
    Deck.shuffledDeck.pop();
    Deck.shuffledDeck.pop();
    Deck.shuffledDeck.pop();
    Deck.shuffledDeck.pop();
  },
  hitDealer: function(){
      //select dealer cards location
      var dealerCardsElement = $("#dealerCards");

      //take the last card from the end of the deck
      var newCardTake = Deck.shuffledDeck[Deck.shuffledDeck.length-1];
      console.log("hit dealer card value", newCardTake.realValue);

      //add that card to the dealer cards array
      this.dealerCards.push(newCardTake);

      //remove the last card in the deck "the top of the card stack"
      Deck.shuffledDeck.pop();
      console.log("cards left in deck", Deck.shuffledDeck.length);

      //create new card element for dealer cards area on table and show it
      dealerCardsElement.append($("<p>").text(newCardTake.value));

      //add value to dealerCurrentSum
      this.cardSum += newCardTake.realValue;

      //return dealerCurrentSum
      //return dealerCurrentSum;
      console.log("dealer new sum", this.cardSum);
    },
  dealerHitOrStand: function(){
    if(this.cardSum<17){
      this.hitDealer();
    }
    console.log("stand/done");
    return "stand/done";
    }
};

//GAME OBJECT
var Game = {
  winStatus: "",
  resetVariables: function(){
    Player.currentBet = 0;
    Player.playerCards = [];
    Dealer.dealerCards = [];
    Player.hitStandStatus = "";
    Dealer.hitStandStatus = "";
    Player.cardSum = 0;
    Dealer.cardSum = 0;
    Game.winStatus = "";
  },
  displayFirstCards: function(){
    //display player cards
    $("#playerCards").text(Player.playerCards[0].value + " " + Player.playerCards[1].value);
    //display dealer cards
    $("#dealerCards").text(Dealer.dealerCards[0].value);
  },
  displayDealerSecondCard: function(){
    $("#dealerCards").text(Dealer.dealerCards[0].value + " " + Dealer.dealerCards[1].value);
  },
  calculateFirstSum: function(){
    var cardVal1 = Player.playerCards[0].realValue;
    var cardVal2 = Player.playerCards[1].realValue;
    var cardVal3 = Dealer.dealerCards[0].realValue;
    var cardVal4 = Dealer.dealerCards[1].realValue;
    Player.cardSum = cardVal1 + cardVal2;
    Dealer.cardSum = cardVal3 + cardVal4;
    console.log("player sum", Player.cardSum);
    console.log("dealer sum", Dealer.cardSum);
  },
  checkForWinStatus: function(){
    if(Player.cardSum === Dealer.cardSum){
      this.winStatus = "tie";
    } else if (Player.cardSum <= 21 && Player.cardSum > Dealer.cardSum){
      this.winStatus = "win";
    } else if (Player.cardSum > 21 || Dealer.cardSum > Player.cardSum){
      this.winStatus = "loss";
    } else {
      return false;
    }
  },
  updateBankAmount: function(){
    if(this.winStatus === "win"){
      Player.bankAmount += Player.currentBet*2;
    } else if(this.winStatus === "loss"){
      Player.bankAmount -= Player.currentBet;
    }
  },
  play: function(){
    Player.postBankAmount(); //shows bank amount on game table
    Player.makeBet(); //show bet amount on table and updates currentBet
    Dealer.dealFirstCards(); //two cards given to dealer and
    Game.displayFirstCards(); //displays player cards and first dealer card
    Game.calculateFirstSum(); //calculates sum of player and dealer two cards only
    Player.playerHitOrStand(); //returns "hit" or "stand"
    Game.displayDealerSecondCard();
    // Get 21 points on the player's first two cards (called a blackjack), without a dealer blackjack
    //continue play
    if (Player.cardSum < 21 && Dealer.cardSum < 21) {
      if(Player.hitStandStatus === "hit" && Dealer.cardSum < 17){

      }
      if(Player.hitStandStatus === "stand" && Dealer.cardSum < 17){

      }
      if(Player.hitStandStatus === "hit" && Dealer.cardSum >= 17){

      }
      if(Player.hitStandStatus === "stand" && Dealer.cardSum >= 17){

      }
    } else {
      checkForWinStatus();
    }
  },
  helpScreen: function(){
    //Help Text HERE
    console.log("");
    //w event listener somewhere
  }
};

// Game Intialization
Deck.createDeck(); //intializes ordered deck of cards
Deck.shuffleDeck();
// Game Play
Game.play();
Game.updateBankAmount();
Game.resetVariables();

//CODE GRAVEYARD
// if(Player.hitStandStatus === "stand"){
//   if(Game.checkForWinStatus() !== true){
//     var dealerMove = 0;
//     do{
//       dealerMove = Dealer.dealerHitOrStand();
//     } while (dealerMove !== "stand/done");
//   }
// } else if(Player.hitStandStatus === "hit"){
//   Game.checkForWinStatus();
//   //display new player card
