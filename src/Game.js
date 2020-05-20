// Game class
import React from 'react';
import BigBoard from './BigBoard';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTurn: "X",
			players: ["X", "O"],
			bigBoard: null,
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

	startGame() {
		var emptyBoard = this.initialiseBigBoard();
		this.setState({bigBoard: emptyBoard});
	}

	renderBigBoard() {
		if (this.state.bigBoard) {
			return (
				<div className="bigboard">
				<BigBoard 
				smallboards={this.state.bigBoard} 
				onClick={this.handleClick} 
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

	// handleClick(boardRow, boardCol, cellRow, cellCol) {
    //
	//     const board = JSON.parse(JSON.stringify(this.state.bigboard));  // Deep copy for array of arrays
    //
    //
	//
    //
	//     // Changer le player
	//     // Mettre image dans la case - SI smallBoard pas deja gagne OU case pas deja selectionnee
    //
	//     this.setState({
	//         // playerTurn: this.state.playerTurn === "X" ? "O" : "X",
	//         value: i,
	//
	//     })
	/* } */

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

