// AUTHOR: CYRUS SHAHRIVAR
// DATE: 10/15/15
// PROJECT: BLACKJACK GAME
//
//

//DOCUMENT READY
$(document).ready(function(){

// var betTotal = 0;
// $("#leftCircle").click(function () {
//        betTotal += 25;
// });


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
  betDrawer: function(){
    var playerCoins = $("#playerCoins");
    for (var i=0; i<(this.currentBet/25); i++){
      var randPlaceTop = 280 + Math.floor(30*Math.random());
      var randPlaceLeft = 640 + Math.floor(30*Math.random());
      var coin = $("<div>");
      coin.addClass("playerCoins");
      coin.addClass("betCoins");
      coin.css("top", randPlaceTop + "px");
      coin.css("left", randPlaceLeft + "px");
      coin.css("box-shadow", "10px 5px 5px black");
      playerCoins.append(coin);
    }
  },
  drawBet: function(){
    if(this.currentBet === 0){
      //remove all coins
      var allCoins = $(".betCoins");
      allCoins.remove();
      //redraw coins
      this.betDrawer();
    } else if (this.currentBet > 0){
      this.betDrawer();
    }
  },
  coinDrawer: function(){
    var playerCoins = $("#playerCoins");
    for (var i=0; i<(this.bankAmount/25); i++){
      var randPlaceTop = 520 + Math.floor(25*Math.random());
      var randPlaceLeft = 465 + Math.floor(100*Math.random());
      var coin = $("<div>");
      coin.addClass("playerCoins");
      coin.css("top", randPlaceTop + "px");
      coin.css("left", randPlaceLeft + "px");
      coin.css("box-shadow", "10px 5px 5px black");
      playerCoins.append(coin);
    }
  },
  drawPlayerCoins: function(){
    if(this.currentBet > 0){
      //remove all coins
      var allCoins = $(".playerCoins");
      allCoins.remove();
      //redraw coins
      this.coinDrawer();
    } else if (this.currentBet === 0){
      this.coinDrawer();
    }
  },
  postBankAmount: function(){
    //post to html
    $("#bankAmount").text("$" + " " + this.bankAmount);
  },
//   betting: function () {
//     var submit = false;
//     var betTotal = 0;
//     $("#leftCircle").click(function () {
//          betTotal += 25;
//     });
//     $("#rightCircle").click(function(){
//        submit = true;
//     });
//     while(submit === false){
//       var timeout = setTimeout(function(){console.log("waiting for bet submission");}, 1000);
//     }
//     return betTotal;
// },
  makeBet: function(){
    //make bet
    var leftTitle = $("#leftTitle");
    leftTitle.text("TAP TO BET");
    var betAmount = prompt("make a bet");
    //var betAmount = this.betting();
    if(betAmount > this.bankAmount){
      return this.makeBet(); //recursive call
    }
    this.currentBet = betAmount;
    $("#alert").text("Current bet: " + "$ " + betAmount);
  },
  playerHitOrStand: function(){
    //player choice
    this.hitStandStatus = prompt("Hit or Stand?").toLowerCase();
    return this.hitStandStatus;
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
    playerCardsElement.append($("<div class='cardLook'>").text(newCardTake.value + Player.playerCards[Player.playerCards.length-1].suit));
  }
};

//DEALER OBJECT
var Dealer = {
  dealerCards: [],
  hitStandStatus: "",
  cardSum: 0,
  numAces: 0,
  houseBank: 12500,
  drawHausCoins: function(){
    var houseCoins = $("#houseCoins");
    console.log(houseCoins);
    for (var i=0; i<(this.houseBank/25); i++){
      var randPlaceTop = 70 + Math.floor(100*Math.random());
      var randPlaceLeft = 465 + Math.floor(100*Math.random());
      var coin = $("<div>");
      coin.addClass("houseCoins");
      coin.css("top", randPlaceTop + "px");
      coin.css("left", randPlaceLeft + "px");
      coin.css("box-shadow", "10px 5px 5px black");
      houseCoins.append(coin);
    }
  },
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
      dealerCardsElement.append($("<div class='cardLook'>").text(newCardTake.value + Dealer.dealerCards[Dealer.dealerCards.length-1].suit));
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
  winLossAmount: 0,
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
    Player.numAces = 0;
    Dealer.numAces = 0;
  },
  clearTableElements: function(){
    $("#alert").text("");
    $("#player").text("");
    $("#dealer").text("");
  },
  displayFirstCards: function(){
    //display player cards
    //maybe append created divs for cards
    var card1Div = $("<div>");
    card1Div.addClass("cardLook");
    card1Div.text(Player.playerCards[0].value + Player.playerCards[0].suit);
    $("#player").append(card1Div);
    var card2Div = $("<div>");
    card2Div.addClass("cardLook");
    card2Div.text(Player.playerCards[1].value + Player.playerCards[1].suit);
    $("#player").append(card2Div);
    //display dealer cards
    var card3Div = $("<div>");
    card3Div.addClass("cardLook");
    card3Div.text(Dealer.dealerCards[0].value + Dealer.dealerCards[0].suit);
    $("#dealer").append(card3Div);
  },
  displayDealerSecondCard: function(){
    //could make this generic for display both player and dealer all cards - two for loops
    var card4Div = $("<div>");
    card4Div.addClass("cardLook");
    card4Div.text(Dealer.dealerCards[1].value + Dealer.dealerCards[1].suit);
    $("#dealer").append(card4Div);
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
  updateBankAmountAndAlert: function(){
    console.log("updating bank");
    if(this.winStatus === "win"){
      Player.bankAmount += Player.currentBet*2;
      this.winLossAmount = Player.currentBet*2;
      $("#alert").text("WON ROUND! WON " + "$ " + this.winLossAmount);
    } else if(this.winStatus === "loss"){
      // Player.bankAmount -= Player.currentBet; just lose bet, not 2nd deduct
      this.winLossAmount = Player.currentBet;
      $("#alert").text("LOST ROUND! LOST " + "$ " + this.winLossAmount);
    } else if(this.winStatus === "blackjack"){
      Player.bankAmount += Player.currentBet*1.5;
      this.winLossAmount = Player.currentBet*1.5;
      $("#alert").text("WON ROUND! GOT BLACKJACK! WON " + "$ " + this.winLossAmount);
    } else {
      $("#alert").text("TIE! LOST NOTHING!");
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
    //dealer win (player loss) due to 21
    if(Dealer.cardSum === 21){
      this.winStatus = "loss";
      console.log("round over due to player loss");
      return "round over";
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
          this.winStatus = "loss";
          console.log("round over due to player loss");
          return "round over";
        }
        //tie
        if(Dealer.cardSum < 21 && Dealer.cardSum === Player.cardSum){
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
    Player.drawBet();
    Dealer.drawHausCoins();
    Player.drawPlayerCoins();
    Player.postBankAmount(); //shows bank amount on game table
    Player.makeBet(); //show bet amount on table and updates currentBet
    Player.bankAmount -= Player.currentBet;
    Player.postBankAmount();
    Player.drawPlayerCoins();
    Player.drawBet();
    Dealer.dealFirstCards(); //two cards given to dealer and
    Game.displayFirstCards(); //displays player cards and first dealer card
    Game.calculateDealerSum(); //calculates sum of dealer two cards only
    Game.calculatePlayerSum(); //calculates sum of player two cards only
    //Discussed with Yuriy 10/16/15, I'm going to try implementing the idea of ACE being 11 in the realCardValue array and subtracting 10 if sum of card in hand is over 21, I agree this really simplifies the play mechanics.
    //Discussed with Ross 10/16/15: Discussed various strategies for function calls in play function.  I think I was trying to tackle all the scenarios in one shot, but Ross encouraged me to break up the problem.
    //
    if(Game.checkForBlackJackOrTie()==="tie" || Game.checkForBlackJackOrTie()==="blackjack" || Game.checkForBlackJackOrTie()==="dealerwin" ){
      Game.displayDealerSecondCard();
      console.log("round over due to tie or player/dealer blackjack");
      return "round over";
    } else {
      if(Player.playerHitOrStand() === "stand"){
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
          //player win (player loss) due to 21
          if(Player.cardSum === 21){
            this.winStatus = "win";
            console.log("round over due to player loss");
            return "round over";
          }
          //complicated scenario --> aces
          if(Player.cardSum > 21 && Player.checkForAces()===true){
            console.log("checking aces");
            Player.cardSum -= (10*Player.numAces);
            //dealer loss (player win)
            if(Player.cardSum < 21 && Player.cardSum < Dealer.cardSum){
              this.winStatus = "loss";
              console.log("round over due to player win");
              return "round over";
            }
            //player win (dealer loss)
            if(Player.cardSum < 21 && Player.cardSum > Dealer.cardSum){
              this.winStatus = "win";
              console.log("round over due to player loss");
              return "round over";
            }
            //tie
            if(Player.cardSum < 21 && Player.cardSum === Dealer.cardSum){
              this.winStatus = "tie";
              console.log("round over due to tie");
              return "round over";
            }
          }
          //player loss (dealer win) due to bust, no aces
          if(Player.cardSum > 21 && Player.checkForAces()===false){
            this.winStatus = "loss";
            console.log("round over due to bust");
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

// var Masterplay = {
//
// };

// Game Intialization
$("#alert").text("CLICK THE BLACKJACK LOGO TO PLAY!");
$("#gameTitle").click(function(){
  Deck.createDeck(); //intializes ordered deck of cards
  Deck.shuffleDeck();
  // Game Play
  var quit = null;
  while(quit !== "quit"){
    if(Deck.shuffledDeck.length <= 10){
      $("#alert").text("NOT ENOUGH CARDS TO PLAY");
      break;
    }
    Game.clearTableElements();
    Game.play();
    Game.updateBankAmountAndAlert();
    //Game.alertWinStatus();
    if(Player.bankAmount <= 0){
      $("#alert").text("LOST ALL MONEY! GAME OVER!");
      // var playAgain = setInterval(function(){
      //   $("#alert").text("CLICK BLACKJACK LOGO TO PLAY AGAIN!");
      // }, 2000);
      quit = "quit";
    } else {
      Game.resetVariables();
      quit = prompt("Quit or continue?").toLowerCase();
    }
  }
});

$("#leftCircle").click();
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
  // alertWinStatus: function(){
  //   console.log("round status", this.winStatus);
  //   if(this.winStatus === "win"){
  //     $("#alert").text("WON ROUND!");
  //   } else if(this.winStatus === "loss"){
  //     $("#alert").text("LOST ROUND!");
  //   } else if(this.winStatus === "blackjack"){
  //     Player.bankAmount += Player.currentBet*1.5;
  //     $("#alert").text("WON ROUND! GOT BLACKJACK!");
  //   } else {
  //     $("#alert").text("TIE!");
  //   }
  // },
  // var containerBorderChange = function(){
  //   var gold = setInterval(function(){$("#container").css("border-color", "gold");},1000);
  //   var whitesmoke = setInterval(function(){$("#container").css("border-color", "whitesmoke");},1000);
  // };
  //
  // containerBorderChange();
