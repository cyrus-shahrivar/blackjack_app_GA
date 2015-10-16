// AUTHOR: CYRUS SHAHRIVAR
// DATE: 10/15/15
// PROJECT: BLACKJACK GAME
//
//

//DOCUMENT READY
$(function(){});

//DECK OBJECT
var Deck = {
    numberOfDecks: 1,
    deck: [],
    shuffledDeck: [],
    spentCardStack: [],
    cardValues: [2,3,4,5,6,7,8,9,10,"J","Q","K","A"],
    cardRealValues: [2,3,4,5,6,7,8,9,10,10,10,10,11],
    cardSuitsTypes: ["❤","♠","♣","♦"],
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
  },
  checkForAces: function(){
      for(var i = 0; i<Player.playerCards.length; i++){
        if(Player.playerCards[i].value === "A"){
          return true;
        }
      } return false;
  }
};

//DEALER OBJECT
var Dealer = {
  dealerCards: [],
  hitStandStatus: "",
  cardSum: 0,
  checkForAces: function(){
      for(var i = 0; i<Dealer.dealerCards.length; i++){
        if(Dealer.dealerCards[i].value === "A"){
          return true;
        }
      } return false;
  },
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
      dealerCardsElement.append($("<div>").text(newCardTake.value));

      //add value to dealerCurrentSum
      this.cardSum += newCardTake.realValue;

      //return dealerCurrentSum
      //return dealerCurrentSum;
      console.log("dealer new sum", this.cardSum);
    },
  dealerHitOrStand: function(){
    console.log("entered hit or stand function");
    if(this.cardSum<17){
      console.log("entered IF hit or stand function");
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
    $("#playerCards").text(Player.playerCards[0].value + Player.playerCards[0].suit + " " + Player.playerCards[1].value + Player.playerCards[1].suit);
    //display dealer cards
    $("#dealerCards").text(Dealer.dealerCards[0].value + Dealer.dealerCards[0].suit);
  },
  displayDealerSecondCard: function(){
    $("#dealerCards").text(Dealer.dealerCards[0].value + Dealer.dealerCards[0].suit + " " + Dealer.dealerCards[1].value + Dealer.dealerCards[1].suit);
  },
  calculateSum: function(){
    for(var i = 0; i<Player.playerCards.length; i++){
      Player.cardSum += Player.playerCards[i].realValue;
    }
    for(var j = 0; j<Dealer.dealerCards.length; j++){
      Dealer.cardSum += Dealer.dealerCards[j].realValue;
    }
    console.log("dealer sum", Dealer.cardSum);
    console.log("player sum", Player.cardSum);
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
    } else if(this.winStatus === "blackjack"){
      Player.bankAmount += Player.currentBet*1.5;
    }
  },
  checkForBlackJackOrTie: function(){
    if(Player.cardSum === 21 && Dealer.cardSum === 21){
      this.winStatus = "tie";
      return "tie";
    } else if (Player.cardSum === 21 || Dealer.cardSum === 21){
      if(Player.cardSum === 21){
        this.winStatus = "blackjack";
        return "blackjack";
      } else {
        this.winStatus = "loss";
        return "dealerwin";
      }
    } else {
      return false;
    }
  },
  play: function(){
    Player.postBankAmount(); //shows bank amount on game table
    Player.makeBet(); //show bet amount on table and updates currentBet
    Player.bankAmount -= Player.currentBet;
    Player.postBankAmount();
    Dealer.dealFirstCards(); //two cards given to dealer and
    Game.displayFirstCards(); //displays player cards and first dealer card
    Game.calculateSum(); //calculates sum of player and dealer two cards only
    Player.playerHitOrStand(); //returns "hit" or "stand"
    Game.displayDealerSecondCard();
    //Discussed with Yuriy 10/16/15, I'm going to try implementing the idea of ACE being 11 in the array and subtracting 10 if sum of card in hand is over 21, this really simplifies the play mechanics.
    //Discussed with Ross 10/16/15: strategy for function calls in play function
    //
    if(Game.checkForBlackJackOrTie()==="tie" || Game.checkForBlackJackOrTie()==="blackjack" || Game.checkForBlackJackOrTie()==="dealerwin" ){
      console.log("round over due to tie or player/dealer blackjack");
      return "round over";
    } else {
      if(Player.playerHitOrStand() === "stand"){
        while(Dealer.cardSum < 17){
          console.log("entered while loop");
          Dealer.dealerHitOrStand();
          Game.calculateSum();
          if(Dealer.cardSum === 21){
            this.winStatus = "loss";
            return "round over";
          }
        }
        // dealer hits cards until dealer sum 17 or dealer busts, if bust, player wins
        // Dealer.checkForAces();
        // check for aces after each dealer hit

      }
      //  while(playerHitOrStand === "hit" || dealerbust === false || dealer){
      // //  deal new card
      // }
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

// if(Player.cardSum < 12 && (Player.playerCards[0].value === "ACE" || Player.playerCards[1].value === "ACE")){
//   if(Player.playerCards[0].value === "ACE"){
//     Player.playerCards[0].realValue = 11;
//   } else if (Player.playerCards[1].value === "ACE"){
//     Player.playerCards[1].realValue = 11;
//   }
// }
// if (Player.cardSum < 21 && Dealer.cardSum < 21) {
//   if(Player.hitStandStatus === "hit" && Dealer.cardSum < 17){
//
//   }
//   if(Player.hitStandStatus === "stand" && Dealer.cardSum < 17){
//
//   }
//   if(Player.hitStandStatus === "hit" && Dealer.cardSum >= 17){
//
//   }
//   if(Player.hitStandStatus === "stand" && Dealer.cardSum >= 17){
//
//   }
// } else {
//   checkForWinStatus();
// }
