// BigBoard class
import React from 'react';
import {getCardinalPosition} from './functions';
import SmallBoard from './SmallBoard';

class BigBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			smallboards: props.smallboards, // Contains an array of 3X3 smallboards
			boardsWinners: props.boardsWinners,
			enabledBoards: props.enabledBoards,
		};
	}

	displayBigBoard = () => {
		let bigBoard = [];
		// Create rows
		for (let i = 0; i < 3; i++) {
			let boardsInRow = []
			// Create cells in row (i.e. columns)
			for (let j =0; j <3; j++) {
				var boardCardPos = getCardinalPosition(i, j);
				var classNameBoard = "smallboard " + this.props.enabledBoards[i][j];
				boardsInRow.push(
					<div className={classNameBoard} key={boardCardPos}>
					<SmallBoard 
					key={boardCardPos} 
					cardinalPosition={boardCardPos} 
					row={i} 
					column={j}
					cells={this.props.smallboards[i][j]}
					onClick={() => (k, l) => this.props.onClick()(i,j, k, l)}
					winner={this.props.boardsWinners[i][j]}
					enabled={this.props.enabledBoards[i][j]}
					/>
					</div>
				);
			}
			bigBoard.push(<div className="board-row" key={i}> {boardsInRow} </div>);
		}
		return bigBoard;
	}

	render() {
		return (<div> {this.displayBigBoard()} </div>);
	}
}

export default BigBoard;

