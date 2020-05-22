// SmallBoard class
import React from 'react';
import {getCardinalPosition} from './functions';
import Cell from './Cell';

class SmallBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: props.cells, // Contains an array of 3x3 cells 
			cardinalPosition: props.cardinalPosition,
			row: props.row,
			column: props.column,
			winner: props.winner,
			enabled: props.enabled,
		};
	}

	displaySmallBoard = (boardCardPos) => {
		if (this.props.winner === "X" || this.props.winner === "O") {
			return <button className="cell sizeBoard"> {this.props.winner}</button>;
		}
		let smallBoard = []
		// Create rows
		for (let i = 0; i < 3; i++) {
			let cellsInRow = []
			// Create cells in row (i.e. columns)
			for (let j =0; j <3; j++) {
				var cellCardPos = getCardinalPosition(i, j);
				cellsInRow.push(
					<Cell 
					key={boardCardPos+"/"+cellCardPos} 
					cardinalPosition={cellCardPos} 
					row={i} 
					column={j} 
					onClick={() => this.props.onClick()(i, j)}
					value={this.props.cells[i][j]}
					enabled={this.props.enabled}
					/>);
			}
			smallBoard.push(<div className="cells-row" key={i}> {cellsInRow} </div>);
		}
		return smallBoard;
	}


	render() {
		return (<div> { this.displaySmallBoard(this.state.cardinalPosition) } </div>);
	}

}

export default SmallBoard;

