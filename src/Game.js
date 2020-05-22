// Game class
import React from 'react';
import BigBoard from './BigBoard';
import {getWinner, array2D, array4D} from './functions';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTurn: "X",
			players: ["X", "O"],
			gameWinner: null,
			history: [{
				bigBoard: null, // 4D array of cell values
				boardsWinners: null, // 2D array of winners of smallBoards
				move: [null, null, null, null],
				enabledBoards: null, // 2D array of enabled smallBoards
			}],
		};
	}

	
	startGame() {
		// Initialise boards
		var emptyWinners = array2D(3, null);
		var emptyEnabledBoards = array2D(3, "enabled");
		var emptyBoard = array4D(3, null);

		// Modify state
		this.setState({
			history: [{
				bigBoard: emptyBoard,
				boardsWinners: emptyWinners,
				enabledBoards: emptyEnabledBoards,
			}],
			gameWinner: null,
			move: [null, null, null, null],
			playerTurn: "X",
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


	renderGameInfo() {
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

		return (
			<div className="game-info">
			<div>{status}</div>
			<button onClick={() => this.startGame()} type="button">
			Start a new game
			</button>
			</div>
		);
	}


	handleClick(boardRow, boardCol, cellRow, cellCol) {
		// Deep copy of history and boards
		const history = this.state.history;
		const current = history[history.length - 1];
		const board = JSON.parse(JSON.stringify(current.bigBoard)); 
		const smallBoard = board[boardRow][boardCol]


		// ~~~~~~ INVALID MOVE ~~~~~~ //
		// Return early if:
		if (this.state.gameWinner  // game already won
			|| current.boardsWinners[boardRow][boardCol] // smallboard already won
			|| smallBoard[cellRow][cellCol]) { // cell already full
			return;
		}
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
		});

	}


	render() {
		const history = this.state.history;
		const current = history[history.length - 1];
		return ( 
			<div className="game">
			{this.renderBigBoard(current)}
			{this.renderGameInfo()}
			</div>
		);
	}
}

export default Game;

