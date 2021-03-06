// Game class
import React from 'react';
import BigBoard from './BigBoard';
import {getCardinalPosition, getWinner, array2D, array4D, negamax} from './functions';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTurn: "X",
			players: ["X", "O"],
			gameWinner: null,
			stepNumber: 0,
			level: 2,
			opponent: "bot", // Default: play against bot
			botPlayer: "O", // Default: bot plays second
			history: [{
				bigBoard: null, // 4D array of cell values
				boardsWinners: null, // 2D array of winners of smallBoards
				move: [null, null, null, null], // Coordinates of last move
				enabledBoards: null, // 2D array of enabled smallBoards
			}],
		};
		this.handleOpponentChange = this.handleOpponentChange.bind(this);
		this.handleBotBegins = this.handleBotBegins.bind(this);
		this.handleLevelSelection = this.handleLevelSelection.bind(this);
	}

	
	startGame() {
		// Initialise boards
		var emptyWinners = array2D(3, null);
		var emptyEnabledBoards;
		if (this.state.opponent === "bot" && this.state.botPlayer === "X") { 
			emptyEnabledBoards = array2D(3, "disabled"); 
		} else { 
			emptyEnabledBoards = array2D(3, "enabled"); 
		}
		var emptyBoard = array4D(3, null);

		// Modify state with empty boards and info
		this.setState({
			history: [{
				bigBoard: emptyBoard,
				boardsWinners: emptyWinners,
				enabledBoards: emptyEnabledBoards,
			}],
			gameWinner: null,
			move: [null, null, null, null],
			playerTurn: "X",
			stepNumber: 0,
		});
	}


	renderBigBoard(current) {
		var classBigBoard = "bigboard";
		if (current.bigBoard) {
			if (this.state.gameWinner) { classBigBoard += " disabled"; }
			return (
				<div className={classBigBoard}>
				<BigBoard 
				smallboards={current.bigBoard} 
				onClick={() => (boardRow, boardCol, cellRow, cellCol) => this.handleClick(boardRow, boardCol, cellRow, cellCol)}
				boardsWinners= {current.boardsWinners}
				enabledBoards={current.enabledBoards}
				/>
				</div>
			);
		} 
	}


	jumpTo(step) {
		this.setState({
			stepNumber: step,
			playerTurn: (step % 2) === 0 ? "X" : "O",
		});

	}


	handleOpponentChange(event) {
		this.setState({opponent: event.target.value});
	}


	handleLevelSelection(event) {
		this.setState({level: parseInt(event.target.value)});
	}


	handleBotBegins(event) {
		this.setState({botPlayer: event.target.value});
	}
	
		
	botSettingsSelection() {
		return(
			<div>

			<label>
			Computer begins? &nbsp;
			<select defaultValue={"O"} onChange={this.handleBotBegins}>
			<option value="X">yes</option>
			<option value="O">no</option>
			</select>
			</label>

			<label>
			<br/> Level: &nbsp;
			<select defaultValue={"2"} onChange={this.handleLevelSelection}>
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			</select>
			</label>

			</div>
		);
	}



	opponentSelection() {
		return(<label>
			Play against &nbsp;
			<select defaultValue={"bot"} onChange={this.handleOpponentChange}>
			<option value="bot">the computer</option>
			<option value="human">a friend</option>
			</select>
			</label>

		);
	}


	settingsForm() {
		return (
			<form>
			
			<div>{this.opponentSelection()}</div>
			{
				this.state.opponent === "bot" &&
				<div>{this.botSettingsSelection()} </div>
			}
			
			<button onClick={() => this.startGame()} type="button">
			Start a new game
			</button>
			
			</form>
		);
	}


	renderGameInfo(history) {
		// Define status
		var status;
		if (this.state.gameWinner === "tie") { 
			status = "It's a tie!" ;
		} else if (this.state.gameWinner) { 
			status = "Winner: " + this.state.gameWinner; 
		} else if (!this.state.history[this.state.history.length - 1].bigBoard) { 
			status = "Welcome to the ultimate tic-tac-toe game!"; 
		} else { 
			status = "Next player: " + (this.state.playerTurn) ; 
		}

		// Write time travel of moves (with buttons)
		const movebuttons = history.map((stage, moveNo) => {
			var SBpos, Cpos;
			if (stage.move) {
				SBpos = getCardinalPosition(stage.move[0], stage.move[1]); 
				Cpos = getCardinalPosition(stage.move[2], stage.move[3]);
			} else {
				SBpos = null; 
				Cpos = null;
			}
			var player = (moveNo % 2) === 1 ? "X" : "O";

			const desc = 'Go to move #' + moveNo + ": " + 
				player + " plays " + SBpos + "/" + Cpos;
			return (
				<li key={moveNo}>
				<button onClick={() => this.jumpTo(moveNo)}>{desc}</button>
				</li>
			);
		});

		return (
			<div className="game-info">
			<div>{status}</div>
			<div>{this.settingsForm()}</div>
			<div><ol>{movebuttons.slice(1,movebuttons.length)}</ol></div>
			</div>
		);
	}


	handleClick(boardRow, boardCol, cellRow, cellCol, humanClicked = true) {
		// Deep copy of history and boards
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const board = JSON.parse(JSON.stringify(current.bigBoard)); 
		const smallBoard = board[boardRow][boardCol]


		// ~~~~~~ INVALID MOVE ~~~~~~ //
		// Return early if:
		if (this.state.gameWinner  // game already won
			|| current.boardsWinners[boardRow][boardCol] // smallboard already won
			|| smallBoard[cellRow][cellCol] // cell already full
			|| (humanClicked && this.state.playerTurn === this.state.botPlayer)) // human clicked while it is bot's turn
		{ return; }
		// Or if smallBoard is not valid (based on previous move)
		// unless if the expected smallBoard is already won
		if (history.length > 1) {
			if (!current.boardsWinners[current.move[2]][current.move[3]]) {
				if (boardRow !== current.move[2] || boardCol !== current.move[3]) {
					return;
				}
			}
		}


		// ~~~~~~ VALID MOVE ~~~~~~ //
		
		// Put X or O in selected cell
		board[boardRow][boardCol][cellRow][cellCol] = this.state.playerTurn;

		// Determine if smallboard won
		var winner = getWinner(smallBoard);
		const boardsWinners = JSON.parse(JSON.stringify(current.boardsWinners));
		boardsWinners[boardRow][boardCol] = winner;

		// Determine if game won
		var gameWinner = getWinner(boardsWinners)
		
		// Define valid smallboards for next move (unless game already won)
		var enabledBoards = array2D(3, "disabled");
		if (!gameWinner) {
			if (!boardsWinners[cellRow][cellCol]) {
				enabledBoards[cellRow][cellCol] = "enabled";
			} else {
				for (let i = 0; i < 3; i++) {
					for (let j =0; j <3; j++) {
						if (!boardsWinners[i][j]) {
							enabledBoards[i][j] = "enabled";
						}
					}
				}
			}
		}

		// Update state
		this.setState({
			history: history.concat([{
				bigBoard: board,
				boardsWinners: boardsWinners,
				move: [boardRow, boardCol, cellRow, cellCol],
				enabledBoards: enabledBoards,
			}]),
			playerTurn: this.state.playerTurn === "X" ? "O" : "X",
			gameWinner: gameWinner,
			stepNumber: history.length,
		});

	}

	async componentDidUpdate() {
		
		// Return if board not already available
		if (!this.state.history[0].bigBoard) { return; }

		// If bot has to play, do it after board update when it is the bot's turn
		if (this.state.opponent === "bot" && this.state.playerTurn === this.state.botPlayer) {
			
			// Deep copy of history and boards
			const history = this.state.history.slice(0, this.state.stepNumber + 1);
			const current = history[history.length - 1];
			const board = JSON.parse(JSON.stringify(current.bigBoard)); 
			const player = this.state.playerTurn;
			var lastMove;


			// First move when bot plays first has no previous move => select one at random
			if (this.state.history.length === 1) {
				await new Promise(r => setTimeout(r, 500));
				lastMove = [
					Math.floor(Math.random()*3), // SB row
					Math.floor(Math.random()*3), // SB col
					Math.floor(Math.random()*3), // cell row
					Math.floor(Math.random()*3)  // cell col
				];
			} else {
				lastMove = current.move;
			}

			// Then, play
			if (!this.state.gameWinner) {
				this.aiMove(board, lastMove, this.state.level, player);
			}			
		}
	}

	async aiMove(board, lastMove, level, player) {
		var timeout = level < 6 ? 800 : 400;
		await new Promise(r => setTimeout(r, timeout));
		var move = negamax(board, lastMove, level, player, -Infinity, Infinity).move;

		// Make Move
		this.handleClick(move[0], move[1], move[2], move[3], false);

	}


	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		return ( 
			<div className="game">
			{this.renderBigBoard(current)}
			{this.renderGameInfo(history)}
			</div>
		);
	}
}


export default Game;

