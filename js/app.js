// AUTHOR: CYRUS SHAHRIVAR
// DATE: 2/19/16
// PROJECT: BLACKJACK GAME
//

//DOCUMENT READY
$(document).ready(function(){


$('body').append("<iframe style='display:none;' src='https://www.youtube.com/embed/kMDP_sLm8ss?autoplay=1'>");


var tooltip = $("#tooltip");
tooltip.tooltip({
  content: "<p>How to Play: <br>Step(1): Click 'Bet $25' to increase your bet. <br>Step(2): When you are ready, click 'Submit Bet'. <br>Step(3): Decide if you want to 'Stand!' or 'Hit Me!' based on what you have been dealt. <br>Step(4): When round is over, click 'Next Round'. <br>Step(5): If you want to start over or the game is over, click 'Play New Game'.</p>"
});

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
      var randPlaceTop = 270 + Math.floor(30*Math.random());
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
      var randPlaceLeft = 485 + Math.floor(100*Math.random());
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
  makeBet: function(){
    //make bet
    if(Player.bankAmount > 0){
      Player.currentBet += 25;
      console.log(Player.currentBet);
      $("#alert").text("CURRENT BET: $ " + Player.currentBet);
      Player.bankAmount -= 25;
      Player.postBankAmount();
    }
  },
  playerHitOrStand: function(){
    //player choice
    this.hitStandStatus = prompt("Hit or Stand?").toLowerCase();
    return this.hitStandStatus;
  },
  checkForAces: function(){
    this.numAces = 0;
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
      var randPlaceLeft = 485 + Math.floor(100*Math.random());
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
    $(".cardLook").remove();
    // $("#player").text("");
    // $("#dealer").text("");
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
      $("#alert").text("YOU WON " + "$ " + this.winLossAmount);
      // $('body').append("<iframe style='display:none;' id='coinsSound' src='https://www.youtube.com/embed/RfkcI8dhfsQ?autoplay=1'>");
      // $('#coinsSound').remove();
    } else if(this.winStatus === "loss"){
      // Player.bankAmount -= Player.currentBet; just lose bet, not 2nd deduct
      this.winLossAmount = Player.currentBet;
      $("#alert").text("YOU LOST " + "$ " + this.winLossAmount);
    } else if(this.winStatus === "blackjack"){
      Player.bankAmount += Player.currentBet*1.5;
      this.winLossAmount = Player.currentBet*1.5;
      $("#alert").text("BLACKJACK! YOU WON " + "$ " + this.winLossAmount);
      // $('body').append("<iframe style='display:none;' id='coinsSound' src='https://www.youtube.com/embed/RfkcI8dhfsQ?autoplay=1'>");
      // $('#coinsSound').remove();
    } else {
      Player.bankAmount += Player.currentBet;
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

var terminationStatus = function(){
  Game.displayDealerSecondCard();
  Game.updateBankAmountAndAlert();
  if(Player.bankAmount <= 0){
    $("#alert").text("LOST ALL MONEY! GAME OVER!");
  }
};

//STEP 1 - PROMPT USER TO CLICK BET BUTTON TO START BETTING
$("#alert").text("CLICK BET BUTTON TO MAKE YOUR BET");

//STEP 2 - CREATE DECK, SHUFFLE DECK, RENDER COINS, POST INITIAL BANK AMOUNT
var newGame = function(){
  Deck.createDeck(); //create deck
  Deck.shuffleDeck(); //shuffle deck
};

newGame();

var nextRound = function(){
  Player.drawBet(); //render bet, house, and player coins
  Dealer.drawHausCoins();
  Player.drawPlayerCoins();
  Player.postBankAmount(); //shows bank amount on game table
};

nextRound();

//STEP 3 - MAKE BET, THEN SUBMIT ON SUBMIT BUTTON BELOW
$("#makeBetButton").click(Player.makeBet);

//STEP 4 - SUBMIT BET, UPDATE COIN PILES, UPDATE SUM OF TABLE HANDS, CHECK FOR BLACKJACK
$("#submitBetButton").click(function(){
    if(Deck.shuffledDeck.length <= 10){
      $("#alert").text("NOT ENOUGH CARDS TO PLAY");
      return null;
    }
    Game.clearTableElements();
    Player.drawPlayerCoins();
    Player.drawBet();
    Dealer.dealFirstCards(); //two cards given to dealer and
    Game.displayFirstCards(); //displays player cards and first dealer card
    Game.calculateDealerSum(); //calculates sum of dealer two cards only
    Game.calculatePlayerSum(); //calculates sum of player two cards only
    if(Game.checkForBlackJackOrTie()==="tie" || Game.checkForBlackJackOrTie()==="blackjack" || Game.checkForBlackJackOrTie()==="dealerwin" ){
      Game.displayDealerSecondCard();
      console.log("round over due to tie or player/dealer blackjack");
      $("#alert").text("BLACKJACK OR TIE, ROUND OVER!");
      Game.updateBankAmountAndAlert();
      if(Player.bankAmount <= 0){
        $("#alert").text("LOST ALL MONEY! GAME OVER!");
      }
    } else {
      $("#alert").text("CLICK HIT OR STAND!");
    }
});

//STEP 5A - CHECK FOR STAND
$("#standButton").click(function(){
    Player.hitStandStatus = "stand";
    Game.displayDealerSecondCard();
    Game.playerHasStood();

  Game.updateBankAmountAndAlert();
  if(Player.bankAmount <= 0){
    $("#alert").text("LOST ALL MONEY! GAME OVER!");

  }
});

//STEP 5B - CHECK FOR HITS
$("#hitButton").click(function(){

    //keep on hitting until declare stand || bust
    Player.hitStandStatus = "hit";
    if(Player.hitStandStatus === "hit" && Player.cardSum < 21){ //MAY NEED ANOTHER CONDITION FOR WHILE LOOP
      console.log("player hitting");
      //player hit MECH
      Player.playerHit();
      //calculate sum MECH
      Game.calculatePlayerSum();
      console.log("current player card sum", Player.cardSum);
      //player win (player loss) due to 21
      if(Player.cardSum === 21){
        Game.winStatus = "win";
        console.log("round over due to player win");
        terminationStatus();
        return "round over";
      } else if(Player.cardSum > 21 && Player.checkForAces()===true){//complicated scenario --> aces
        console.log("checking aces");
        Player.cardSum -= (10*Player.numAces);
        //player loss (dealer win)
        console.log("player sum is ", Player.cardSum);
        if(Player.cardSum > 21){
          Game.winStatus = "loss";
          console.log("round over due to bust");
          terminationStatus();
          return "round over";
        }
      } else if(Player.cardSum > 21 && Player.checkForAces()===false){ //player loss (dealer win) due to bust, no aces
        Game.winStatus = "loss";
        console.log("round over due to bust");
        terminationStatus();
        return "round over";
      }
    } else {
      terminationStatus();
      return "round over";
    }
});

//STEP 6 - CONTINUE TO NEXT ROUND WITH NEXT ROUND BUTTON
$("#continueButton").click(function(){
      Game.resetVariables();
      if(Deck.shuffledDeck.length <= 10){
        $("#alert").text("NOT ENOUGH CARDS TO PLAY");
        return "round over";
      }
      Game.clearTableElements();
      $("#alert").text("CLICK BET BUTTON TO MAKE YOUR BET");
      nextRound();
});

//STEP 7 - TRY NEW GAME IF NEEDED WITHOUT REFRESHING BROWSWER
$("#quitButton").click(function(){
      Game.resetVariables();
      Game.clearTableElements();
      Player.bankAmount = 1000;
      $("#alert").text("CLICK BET BUTTON TO MAKE YOUR BET");
      newGame();
      nextRound();
});

}); //END OF DOCUMENT READY
