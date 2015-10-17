// AUTHOR: CYRUS SHAHRIVAR
// DATE: 10/15/15
// PROJECT: BLACKJACK GAME
//
//

//DOCUMENT READY
$(document).ready(function(){

//DECK OBJECT
var Deck = {
    numberOfDecks: 1,
    deck: [],
    shuffledDeck: [],
    spentCardStack: [],
    cardValues: [2,3,4,5,6,7,8,9,10,"J","Q","K","A"],
    cardRealValues: [2,3,4,5,6,7,8,9,10,10,10,10,11],
    cardSuitsTypes: ["♥","♠","♣","♦"],
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
  bankStart: 1000,
  playerCards: [],
  currentBet: 0,
  hitStandStatus: "",
  cardSum: 0,
  numAces: 0,
  postBankAmount: function(){
    //post to html
    $("#bankAmount").text("$" + " " + this.bankAmount);
  },
  makeBet: function(){
    //make bet
    var betAmount = prompt("Make a bet");
    $("#betAmount").text("$" + " " + betAmount);
    this.currentBet = betAmount;
  },
  playerHitOrStand: function(){
    //player choice
    this.hitStandStatus = prompt("Hit or Stand?").toLowerCase();
  },
  checkForAces: function(){
      for(var i = 0; i<Player.playerCards.length; i++){
        if(Player.playerCards[i].value === "A"){
          this.numAces += 1;
        }
      }
      if(this.numAces > 0){
        return true;
      } return false;
  },
  playerHit: function(){
    //select dealer cards location
    var playerCardsElement = $("#player");

    //take the last card from the end of the deck
    var newCardTake = Deck.shuffledDeck[Deck.shuffledDeck.length-1];
    console.log("hit player card value", newCardTake.realValue);

    //add that card to the dealer cards array
    this.playerCards.push(newCardTake);

    //remove the last card in the deck "the top of the card stack"
    Deck.shuffledDeck.pop();
    console.log("cards left in deck", Deck.shuffledDeck.length);

    //create new card element for dealer cards area on table and show it
    playerCardsElement.append($("<div>").text(newCardTake.value + Player.playerCards[Player.playerCards.length-1].suit));
  }
};

//DEALER OBJECT
var Dealer = {
  dealerCards: [],
  hitStandStatus: "",
  cardSum: 0,
  numAces: 0,
  checkForAces: function(){
      for(var i = 0; i<Dealer.dealerCards.length; i++){
        if(Dealer.dealerCards[i].value === "A"){
          this.numAces += 1;
        }
      }
      if(this.numAces > 0){
        return true;
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
      var dealerCardsElement = $("#dealer");

      //take the last card from the end of the deck
      var newCardTake = Deck.shuffledDeck[Deck.shuffledDeck.length-1];
      console.log("hit dealer card value", newCardTake.realValue);

      //add that card to the dealer cards array
      this.dealerCards.push(newCardTake);

      //remove the last card in the deck "the top of the card stack"
      Deck.shuffledDeck.pop();
      console.log("cards left in deck", Deck.shuffledDeck.length);

      //create new card element for dealer cards area on table and show it
      dealerCardsElement.append($("<div>").text(newCardTake.value + Dealer.dealerCards[Dealer.dealerCards.length-1].suit));
    },
  dealerHitOrStand: function(){
    if(this.cardSum<17){
      this.hitDealer();
    }
    console.log("dealer hit!");
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
  clearTableElements: function(){
    $("#alert").text("");
    $("#player").text("");
    $("#dealer").text("");
    $("#betAmount").text("");
  },
  displayFirstCards: function(){
    //display player cards
    //maybe append created divs for cards
    $("#player").text(Player.playerCards[0].value + Player.playerCards[0].suit + " " + Player.playerCards[1].value + Player.playerCards[1].suit);
    //display dealer cards
    $("#dealer").text(Dealer.dealerCards[0].value + Dealer.dealerCards[0].suit);
  },
  displayDealerSecondCard: function(){
    //could make this generic for display both player and dealer all cards - two for loops
    $("#dealer").text(Dealer.dealerCards[0].value + Dealer.dealerCards[0].suit + " " + Dealer.dealerCards[1].value + Dealer.dealerCards[1].suit);
  },
  calculatePlayerSum: function(){
    var placeholder1 = 0;
    for(var i = 0; i<Player.playerCards.length; i++){
      placeholder1 += Player.playerCards[i].realValue;
    }
    Player.cardSum = placeholder1;
    console.log("player sum", Player.cardSum);
  },
  calculateDealerSum: function(){
    var placeholder1 = 0;
    for(var j = 0; j<Dealer.dealerCards.length; j++){
      placeholder1 += Dealer.dealerCards[j].realValue;
    }
    Dealer.cardSum = placeholder1;
    console.log("dealer sum", Dealer.cardSum);
  },
  alertWinStatus: function(){
    console.log("round status", this.winStatus);
    if(this.winStatus === "win"){
      $("#alert").text("WON ROUND!");
    } else if(this.winStatus === "loss"){
      $("#alert").text("LOST ROUND!");
    } else if(this.winStatus === "blackjack"){
      Player.bankAmount += Player.currentBet*1.5;
      $("#alert").text("WON ROUND! GOT BLACKJACK!");
    } else {
      $("#alert").text("TIE!");
    }
  },
  updateBankAmount: function(){
    console.log("updating bank");
    if(this.winStatus === "win"){
      Player.bankAmount += Player.currentBet*2;
      $("#alert").text("WON ROUND!");
    } else if(this.winStatus === "loss"){
      // Player.bankAmount -= Player.currentBet; just lose bet, not 2nd deduct
      $("#alert").text("LOST ROUND!");
    } else if(this.winStatus === "blackjack"){
      Player.bankAmount += Player.currentBet*1.5;
      $("#alert").text("WON ROUND! GOT BLACKJACK!");
    }
    Player.postBankAmount();
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
  playerHasStood: function(){
    while(Dealer.cardSum < 17){
      Dealer.dealerHitOrStand();
      Game.calculateDealerSum();
    }
    //dealer win (player loss) due to being greater than 17, below 21 assuming no more hits by dealer
    if(Dealer.cardSum < 21 && Dealer.cardSum >= 17 && Dealer.cardSum > Player.cardSum){
      this.winStatus = "loss";
      console.log("round over due to player loss");
      return "round over";
    }
    //dealer loss (player win) due to being greater than 17, below 21 assuming no more hits by dealer
    if(Dealer.cardSum < 21 && Dealer.cardSum >= 17 && Dealer.cardSum < Player.cardSum){
      this.winStatus = "win";
      console.log("round over due to player win");
      return "round over";
    }
    //tie due to being greater than 17, below 21 assuming no more hits by dealer
    if(Dealer.cardSum < 21 && Dealer.cardSum >= 17 && Dealer.cardSum === Player.cardSum){
      this.winStatus = "tie";
      console.log("round over due to tie");
      return "round over";
    }
    //dealer win (player loss) due to 21
    if(Dealer.cardSum === 21){
      this.winStatus = "loss";
      console.log("round over due to player loss");
      return "round over";
    }
    //complicated case because of aces
    if(Dealer.cardSum > 21 && Dealer.checkForAces()===true){
      console.log("aces being checked");
      Dealer.cardSum -= (10*Dealer.numAces);
      console.log("current dealer sum", Dealer.cardSum);
        //dealer loss (player win)
        if(Dealer.cardSum < 21 && Dealer.cardSum < Player.cardSum){
          this.winStatus = "win";
          console.log("round over due to player win");
          return "round over";
        }
        //dealer win (player loss)
        if(Dealer.cardSum < 21 && Dealer.cardSum > Player.cardSum){
          this.winStatus = "win";
          console.log("round over due to player win");
          return "round over";
        }
        //tie
        if(Dealer.cardSum < 21 && Dealer.cardSum > Player.cardSum){
          this.winStatus = "tie";
          console.log("round over due to tie");
          return "round over";
        }
      }
      //dealer loss (bust)(player win)
      if(Dealer.cardSum > 21 && Dealer.checkForAces()===false){
        this.winStatus = "win";
        console.log("round over due to player win");
        return "round over";
      }
  },
  play: function(){
    Player.postBankAmount(); //shows bank amount on game table
    Player.makeBet(); //show bet amount on table and updates currentBet
    Player.bankAmount -= Player.currentBet;
    Player.postBankAmount();
    Dealer.dealFirstCards(); //two cards given to dealer and
    Game.displayFirstCards(); //displays player cards and first dealer card
    Game.calculateDealerSum(); //calculates sum of dealer two cards only
    Game.calculatePlayerSum(); //calculates sum of player two cards only
    Player.playerHitOrStand(); //returns "hit" or "stand"
    //Discussed with Yuriy 10/16/15, I'm going to try implementing the idea of ACE being 11 in the realCardValue array and subtracting 10 if sum of card in hand is over 21, I agree this really simplifies the play mechanics.
    //Discussed with Ross 10/16/15: Discussed various strategies for function calls in play function.  I think I was trying to tackle all the scenarios in one shot, but Ross encouraged me to break up the problem.
    //
    if(Game.checkForBlackJackOrTie()==="tie" || Game.checkForBlackJackOrTie()==="blackjack" || Game.checkForBlackJackOrTie()==="dealerwin" ){
      Game.displayDealerSecondCard();
      console.log("round over due to tie or player/dealer blackjack");
      return "round over";
    } else {
      if(Player.hitStandStatus === "stand"){
        Game.displayDealerSecondCard();
        Game.playerHasStood();
        return "round over";
      } else { //player hits at least once
        ///////////
        //keep on hitting until declare stand || bust
        //if player has not bust and has stood, call Game.playerHasStood
        while(Player.hitStandStatus === "hit" && Player.cardSum < 21){ //MAY NEED ANOTHER CONDITION FOR WHILE LOOP
          console.log("player hitting");
          //player hit MECH
          Player.playerHit();
          //calculate sum MECH
          Game.calculatePlayerSum();
          console.log("current player card sum", Player.cardSum);
          //complicated scenario --> aces
          if(Player.cardSum > 21 && Player.checkForAces()===true){
            console.log("checking aces");
            Player.cardSum -= (10*Player.numAces);
            if(Player.cardSum > Dealer.cardSum){
              this.winStatus = "win";
              return "round over";
            }
          }
          //player loss (dealer win) due to bust, no aces
          if(Player.cardSum > 21 && Player.checkForAces()===false){
            this.winStatus = "loss";
            Game.displayDealerSecondCard();
            return "round over";
          }
          Player.hitStandStatus = prompt("Hit or stand?");
        }
        //player finally stands if no bust
        Game.displayDealerSecondCard();
        Game.playerHasStood();
        return "round over";
        ///////////
      }
    }
  },
  helpScreen: function(){
    //Help Text HERE
    console.log("");
    //"DEALER MUST CONTINUE HITTING UNTIL CARDS TOTAL 17"
    //"NO DOUBLES, SPLITS, INSURANCE."
    //"ONE STACK OF CARDS"
    //"BEGIN!"
    //...
    //w event listener somewhere
  },
  credits: function(){
    console.log("");
    //Wikipedia
    //Official Book of Card Game Rules
    //...
  }
};

// Game Intialization
Deck.createDeck(); //intializes ordered deck of cards
Deck.shuffleDeck();
// Game Play
var quit = null;
while(quit !== "quit"){
  Game.clearTableElements();
  Game.play();
  Game.alertWinStatus();
  Game.updateBankAmount();
  Game.resetVariables();
  quit = prompt("Quit or continue?").toLowerCase();
}
//Game.credits();
}); //END OF DOCUMENT READY
//CODE GRAVEYARD
//===================1ft=====================
//===================2ft=====================
//===================3ft=====================
//===================4ft=====================
//===================5ft=====================
//===================6ft=====================
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
  // checkForWinStatus: function(){
  //   if(Player.cardSum === Dealer.cardSum){
  //     this.winStatus = "tie";
  //   } else if (Player.cardSum <= 21 && Player.cardSum > Dealer.cardSum){
  //     this.winStatus = "win";
  //   } else if (Player.cardSum > 21 || Dealer.cardSum > Player.cardSum){
  //     this.winStatus = "loss";
  //   } else {
  //     return false;
  //   }
  // },
            // if(Player.cardSum === Dealer.cardSum){
            //   this.winStatus = "tie";
            //   return "round over";
            // }
