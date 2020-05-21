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
			bigBoard: null,
			winners: null, // Array of 3x3 winner values (each smallBoard)
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
			bigBoard: emptyBoard,
			winners: emptyWinners,
		});
	}

	renderBigBoard() {
		if (this.state.bigBoard) {
			return (
				<div className="bigboard">
				<BigBoard 
				smallboards={this.state.bigBoard} 
				onClick={() => (boardRow, boardCol, cellRow, cellCol) => this.handleClick(boardRow, boardCol, cellRow, cellCol)}
				winners= {this.state.winners}
				/>
				</div>
			);
		} 
	}

	renderGameInfo() {
		return (
			<div className="game-info">
			{"Next player: " + (this.state.playerTurn)}
			<button onClick={() => this.startGame()} type="button">
			Start playing !
			</button>
			</div>
		);
	}

	handleClick(boardRow, boardCol, cellRow, cellCol) {
		const board = JSON.parse(JSON.stringify(this.state.bigBoard));  // Deep copy for array of arrays
		const smallBoard = board[boardRow][boardCol]

		// Return early if move invalid
		if (this.state.winners[boardRow][boardCol] || smallBoard[cellRow][cellCol]) {
			return;
		}


		// Change player turn
		board[boardRow][boardCol][cellRow][cellCol] = this.state.playerTurn;
		this.setState({
			bigBoard: board,
			playerTurn: this.state.playerTurn === "X" ? "O" : "X",
		});


		// Determine if board won
		var winner = getWinner(smallBoard);
		if (winner) {
			const winners = JSON.parse(JSON.stringify(this.state.winners));
			winners[boardRow][boardCol] = winner;
			this.setState({
				winners: winners,
			})
		}

	}

	render() {
		return ( 
			<div className="game">
			{this.renderBigBoard()}
			{this.renderGameInfo()}
			</div>
		);
	}

}

export default Game;

