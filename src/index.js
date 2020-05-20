// REACT COMPONENTS TO CREATE:
// Game
// BigBoard
// SmallBoard
// Cell

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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

class BigBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			smallboards: props.smallboards,
		};
	}

	displayBigBoard = () => {
		let bigBoard = []
		// Create rows
		for (let i = 0; i < 3; i++) {
			let boardsInRow = []
			// Create cells in row (i.e. columns)
			for (let j =0; j <3; j++) {
				var boardCardPos = getCardinalPosition(i, j);
				boardsInRow.push(
					<div className="smallboard" key={boardCardPos}>
					<SmallBoard 
					key={boardCardPos} 
					cardinalPosition={boardCardPos} 
					row={i} 
					column={j}
					cells={this.state.smallboards[i][j]}
					/>
					</div>
				);
			}
			bigBoard.push(<div className="smallboard-row" key={i}> {boardsInRow} </div>);
		}
		return bigBoard;
	}

	render() {
		return (<div> {this.displayBigBoard()} </div>);
	}
}

class SmallBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: props.cells,
			cardinalPosition: props.cardinalPosition,
			// smallBoardLocation: props.smallBoardLocation,
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
				cellsInRow.push(<Cell key={boardCardPos+"/"+cellCardPos} cardinalPosition={cellCardPos} row={i} column={j} />);
			}
			smallBoard.push(<div className="cells-row" key={i}> {cellsInRow} </div>);
		}
		return smallBoard;
	}

	render() {
		return (<div> { this.displaySmallBoard(this.state.cardinalPosition) } </div>);
	}

}

function Cell(props) {
	// [> return ( <]
		// <button className="cell" row={props.row} onClick={props.onClick}>
		// {props.value}
		// </button>
	// [> ); <]

	if (props.row == "1") { return ( <button className="cellN" onClick={props.onClick}> {props.value}</button> );
	} else { return ( <button className="cell" onClick={props.onClick}> {props.value}</button> ); }


}


// class Cell extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             row: null,
//             column: null,
//             value: null,
//         };
//     }
//
//     render() {
//         if (this.props.row == "1") { return ( <button className="cellN" > {this.state.value}</button> );
//         } else { return ( <button className="cell"> {this.state.value}</button> ); }
//     }
// }
/*  */


// ====================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
)

function getCardinalPosition(row, column) {
	var cardinalPosition = "";
	
	// Define N/S
	if (row === 0) {
		cardinalPosition += "N";
	} else if (row === 2) {
		cardinalPosition += "S";
	}

	// Define W/E
	if (column === 0) {
		cardinalPosition += "W";
	} else if (column === 2) {
		cardinalPosition += "E";
	}

	// Center
	if (cardinalPosition.length === 0) {
		cardinalPosition = "C";
	}
	return cardinalPosition;
}

