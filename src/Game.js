// Game class
import React from 'react';
import BigBoard from './BigBoard';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTurn: "X",
			players: ["X", "O"],
			value: null,
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
	
	renderBigBoard(board) {
		return (<BigBoard 
			smallboards={board} 
			onClick={this.handleClick} 
			/>);
	}

	render() {
		var bigboard = this.initialiseBigBoard();
		return ( 
			<div className="game">
			<div className="bigboard">
			{this.renderBigBoard(bigboard)}
			</div>
			<div className="game-info">
			{"Next player: " + (this.state.playerTurn)}
			</div>
			</div>
		);
	}

}

export default Game;

