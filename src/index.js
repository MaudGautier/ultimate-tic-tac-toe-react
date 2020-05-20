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

	renderSmallBoard(cells) {
		return (<SmallBoard cells={cells} />);
	}

	render() {
		return (
			<div>
			<div className="smallboard-row">
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[0,0])}</div>
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[0,1])}</div>
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[0,2])}</div>
			</div>
			<div className="smallboard-row">
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[1,0])}</div>
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[1,1])}</div>
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[1,2])}</div>
			</div>
			<div className="smallboard-row">
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[2,0])}</div>
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[2,1])}</div>
			<div className="smallboard">{this.renderSmallBoard(this.state.smallboards[2,2])}</div>
			</div>

			</div>
		);
	}
}

class SmallBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cells: props.cells,
			// smallBoardLocation: props.smallBoardLocation,
		};
	}

	renderCell([row, column]) {
		return (
			<Cell row={row} column={column} />
		);
	}

   /*  createSmallBoard = () => { */
	//     let smallBoardDisplay = []
	//     // Create rows
	//     for (let i = 0; i < 3; i++) {
	//         let cellsInRow = []
	//         // Create cells in row (i.e. columns)
	//         for (let j =0; j <3; j++) {
	//             cellsInRow.push(<Cell row={i} column={j} />);
	//         }
	//         smallBoardDisplay.push(<div className="cells-row"> {cellsInRow} </div>);
	//     }
	//     return smallBoardDisplay;
    //
	// }
	// render() {
	//     return (<div> { this.createSmallBoard() } </div>);
	// }
/*  */

	render() {
		return (
			<div>
			<div className="cells-row">
			{this.renderCell([0, 0])}
			{this.renderCell([0, 1])}
			{this.renderCell([0, 2])}
			</div>
			<div className="cells-row">
			{this.renderCell([1, 0])}
			{this.renderCell([1, 1])}
			{this.renderCell([1, 2])}
			</div>
			<div className="cells-row">
			{this.renderCell([2, 0])}
			{this.renderCell([2, 1])}
			{this.renderCell([2, 2])}
			</div>
			</div>
		);
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
//     [> renderCell(row, column) { <]
//         // if (row === "1") {return (<button className="cellN" onClick={props.onClick})}
//     [> } <]
// }
/*  */


// ====================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
)
