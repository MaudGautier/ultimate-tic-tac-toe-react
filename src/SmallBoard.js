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
		};
	}

	displaySmallBoard = (boardCardPos) => {
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
					onClick={() => this.handleClick(i,j)}
					value={this.state.cells[i][j]}
					/>);
			}
			smallBoard.push(<div className="cells-row" key={i}> {cellsInRow} </div>);
		}
		return smallBoard;
	}

	handleClick(row, column) {
		const cells = JSON.parse(JSON.stringify(this.state.cells)); // Deep copy for array of arrays
		cells[row][column] = 'X';
		this.setState({cells : cells});
	}


	render() {
		return (<div> { this.displaySmallBoard(this.state.cardinalPosition) } </div>);
	}

}

export default SmallBoard;

