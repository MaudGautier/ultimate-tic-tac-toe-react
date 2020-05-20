// Game class
import React from 'react';
import BigBoard from './BigBoard';


class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player: "X",
		};
	}
	
	renderBigBoard() {
		var cells = Array(3).fill(Array(3).fill(null));
		var smallboards = Array(3).fill(Array(3).fill(cells));
		return (<BigBoard smallboards={smallboards} />);
	}

	render() {
		return ( 
			<div className="game">
			<div className="game-board">
			{this.renderBigBoard()}
			</div>
			</div>
		);
	}

}

export default Game;

