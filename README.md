# Ultimate tic-tac-toe

This ultimate tic-tac-toe game was implemented with a [Create React App](https://github.com/facebook/create-react-app).



## Install and play

1. Clone the repo: `git clone https://github.com/MaudGautier/ultimate-tic-tac-toe-react.git`
2. Install dependencies listed in the `package.json` file: `yarn install`
3. Build the app: `yarn build`
4. (Optional) Install serve if not already installed: `yarn global add serve`
5. Run the app: `serve -s build` and play !



## Ultimate tic-tac-toe rules

The ultimate tic-tac-toe board consists of 3 x 3 small boards.
To win the game, the player must win three aligned small boards, and each small board can be won following the rules of the [standard tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe), i.e. by placing their mark (X or O) on three aligned cells of a small board.

In addition, the coordinates of the cell marked by one player at one given move define the coordinates of the small board in which the opponent will have to play at the next move.
If the selected small board is already won or is a tie, the opponent can play in any available small board.

Check more detailed rules on the dedicated [wikipedia page](https://en.wikipedia.org/wiki/Ultimate_tic-tac-toe).



## Artificial intelligence implementation

The artificial intelligence that allows the bot to play was implemented using a [negamax search](https://en.wikipedia.org/wiki/Negamax) which is a variant form of the [minimax](https://en.wikipedia.org/wiki/Minimax) decision rule.



## TODO

Additional features:

- [x] Remove determinism: choose randomly among all best moves 
- [ ] Count the total number of points: 16 if game won, number of small boards won otherwise
- [ ] Save scores across games
- [ ] When getting into history (jumpTo), un-blur the board
- [ ] Possibility to have colored Xs and Os
- [ ] Nicer settings panel (CSS)
- [ ] Allow some time before won small board is replaced by a big O or big X (to see why won) OR possibility to see full won small board when clicking onto it
- [ ] Possibility to replay using one's pseudo
- [ ] AI: Take into account the value of the third small board in the alignment when two are already won (to improve AI)
- [ ] AI: Change to a Monte-Carlo Tree Search algorithm rather than a minimax algorithm (will outperform ?)
- [ ] Bug fix: Prevent computer from playing when a setting is changed in the middle of a game. E.g. use a "change settings" button to disable board when changing the settings in the middle of a game ?
- [ ] Bug fix: Modify evaluation function so that the new test 'evaluate: classifies correctly' has the boards scores in the correct order (BB\_4 > BB\_5 and BB\_6 > BB\_7)

Development:

- [ ] Remove constructors in Cell, SmallBoard, BigBoard
- [ ] Transform Game.handleClick() into an external function



