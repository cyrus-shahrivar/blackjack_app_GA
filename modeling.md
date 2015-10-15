# MODELING THE PROBLEM

## BASIC OBJECTIVES

"A basic implementation of this project must include:
- A way to keep track of the current player bankroll
- A way for players to make a bet
- A way for players to get more cards, or declare themselves happy with their current hand
- A way for players to bust
- A way for players to win or tie
- Game logic for the dealer to hit until a certain point

Additionally you should use CSS to ensure a reasonable amount of styling to keep your project presentable."
(GA PROJECT ONE PROMPT)

###  A way to keep track of the current player bankroll

- JS:
  - object property for amount
  - object functions for CRUD
- HTML/CSS:
  - update a text box showing player bankroll

### A way for players to make a bet

- JS:
  - object property for amount
  - object functions for CRUD
- HTML/CSS:
  - button to makeBet
  - text box that user input for amount

### A way for players to get more cards, or declare themselves happy with their current hand

- JS:
  - object holding game actions (hit me, hold position)
- HTML/CSS:
  - buttons for these actions

### A way for players to bust

- JS:
  - object functions to check for bust and wins
  - triggers other actions
- HTML/CSS:
  - notify with big text on screen

### A way for players to win or tie
- JS:
  - object function statements in check win function
  - if out of money, player loses
  - asks if you want to play again
- HTML/CSS:
  - notify with big text on screen

### Game logic for the dealer to hit until a certain point
- JS:
  - object functions to randomize dealer choices
- HTML/CSS
  - make plays similar to real life player(s)

## Outline of Game Elements and Flow

1. Scene 1 - Home Screen (Priority 2)
  2. "BLACKJACK"
  2. Click to play button
  3. Click to help button
3. Scene 2.2 - Help Screen (Out of Order Due to Simiplicity) (Priority 2)
  4. "HELP"
  4. Text describing rules of game
  4. Back to Scene 1 - Home Screen
3. Scene 2.1 - Play Screen (MVP Level Element - Priority 1)
  1. Game board look
  2. Card stack
  3. Card holding places for dealer and players
  4. Money holding places for dealer and players
  5. Money holding place for bets for players
  6. Cards in play holding areas
  7. Buttons for various moves
  8. Mouse action handlers
  9. Text boxes for money info
4. Scene 3 - Win Screen
  1. X "Player Wins" / "Game Tied"
  1. Displays win or tie message
  2. Button to start new game, going to home screen or continuing with current "war"

### Advanced Features To Consider
2. A way for players to 'split' a hand
3. A way for players to 'double down' on a hand
4. Appropriate handling of 'insurance' and dealer blackjack

## Objects/Functions Outline - JS

Read about game and try some other online versions to get sense of gameplay and what could be done better.

- Card Object Constructor and/or Array
- Deck Object
 - shuffle()
 - deal()
 - numberOfDecks - optional
- Dealer Object
 - hitMe()
 - standMe()
 - currentHand
 - houseBank
- Player Object
 - hitMe()
 - standMe()
 - currentHand
 - bet()
 - currentBet
 - currentBank
- Table Object
 - setTable()
 - currentPlayer
- Game Object
 - gameHelpMenu()
 - startGame()
 - continueGame()
 - endGame()
 - checkWinStatus()
 - table
- Game Calls
 - Game.startGame
 - Game.helpMenu
 - continue Game unless
   - player quits
 - Game.endGame












  <!-- Pushes Page Down -->
