// Game class
import React from 'react';
import BigBoard from './BigBoard';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerTurn: "X",
			players: ["X", "O"],
			// var cells = Array(3).fill(Array(3).fill(null));
			// var board = Array(3).fill(Array(3).fill(cells));
			bigboard: Array(3).fill(Array(3).fill(Array(3).fill(Array(3).fill(null)))),
		};
	}
	
	renderBigBoard(board) {
		return (<BigBoard smallboards={board} />);
	}

	render() {
		return ( 
			<div className="game">
			<div className="bigboard">
			{this.renderBigBoard(this.state.bigboard)}
			</div>
			</div>
		);
	}

}

export default Game;

