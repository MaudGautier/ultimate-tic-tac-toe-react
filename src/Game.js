// Game class
import React from 'react';
import BigBoard from './BigBoard';
import {getWinner} from './functions';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTurn: "X",
			players: ["X", "O"],
			gameWinner: null,
			history: [{
				bigBoard: null,
				boardsWinners: null, // Array of 3x3 winner values (each smallBoard)
				move: [null, null, null, null],
			}],
		};
	}

	initialiseBigBoard() {
		let bigBoard = []
		// Create rows of smallboards
		for (let i = 0; i < 3; i++) {
			let smallBoardsInRow = []
			// Create smallboards in row (i.e. columns)
			for (let j = 0; j < 3; j++) {
				let smallBoard = []
				// Create rows of cells
				for (let k = 0; k < 3; k++) {
					let cellsInRow = []
					// Create cells in row (i.e. columns)
					for (let l = 0; l < 3 ; l++) {
						cellsInRow.push(null);
					}
					smallBoard.push(cellsInRow);
				}
				smallBoardsInRow.push(smallBoard);
			}
			bigBoard.push(smallBoardsInRow);
		};
		return bigBoard;
	}

	initialiseWinners() {
		let level1 = []
		for (let i = 0; i < 3; i++) {
			let level2 = []
			for (let j = 0; j < 3; j++) {
				level2.push(null);
			}
			level1.push(level2);
		}
		return level1;
	}



	startGame() {
		var emptyBoard = this.initialiseBigBoard();
		var emptyWinners = this.initialiseWinners();
		this.setState({
			history: [{
				bigBoard: emptyBoard,
				boardsWinners: emptyWinners,
			}],
		});
	}

	renderBigBoard(current) {
		if (current.bigBoard) {
			return (
				<div className="bigboard">
				<BigBoard 
				smallboards={current.bigBoard} 
				onClick={() => (boardRow, boardCol, cellRow, cellCol) => this.handleClick(boardRow, boardCol, cellRow, cellCol)}
				boardsWinners= {current.boardsWinners}
				/>
				</div>
			);
		} 
	}

	renderGameInfo() {
		var status;
		if (this.state.gameWinner) { status = "Winner: " + this.state.gameWinner; }
		else { status = "Next player: " + (this.state.playerTurn) ; }

		return (
			<div className="game-info">
			{status}
			<button onClick={() => this.startGame()} type="button">
			Start playing !
			</button>
			</div>
		);
	}

	handleClick(boardRow, boardCol, cellRow, cellCol) {
		// Deep copy bigBoard
		const history = this.state.history;
		const current = history[history.length - 1];
		// const previous = history[history.length - 2];
		const board = JSON.parse(JSON.stringify(current.bigBoard)); 
		const smallBoard = board[boardRow][boardCol]

		// Return early if game already won
		if (this.state.gameWinner) { return; }

		// Return early if smallBoard won OR if cell not empty
		if (current.boardsWinners[boardRow][boardCol] || 
			smallBoard[cellRow][cellCol]) { return; }

		// Return early if selected board does not correspond to previous move
		// /!\ EXCEPTION: if the smallBoard is won (X, O or tie)
		if (history.length > 1) {
			if (!current.boardsWinners[current.move[2]][current.move[3]]) {
				if (boardRow !== current.move[2] || boardCol !== current.move[3]) {
					return;
				}
			}
		}


		// Put mark on selected cell
		board[boardRow][boardCol][cellRow][cellCol] = this.state.playerTurn;

		// Determine if smallboard won
		var winner = getWinner(smallBoard);
		const boardsWinners = JSON.parse(JSON.stringify(current.boardsWinners));
		boardsWinners[boardRow][boardCol] = winner;

		// Determine if game won
		var gameWinner = getWinner(boardsWinners)

		// Update board display
		this.setState({
			history: history.concat([{
				bigBoard: board,
				boardsWinners: boardsWinners,
				move: [boardRow, boardCol, cellRow, cellCol],
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

