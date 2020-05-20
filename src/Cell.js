// Cell class
import React from 'react';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cardinalPosition: props.cardinalPosition,
			row: props.row,
			column: props.column,
			value: props.value,
		};
	}

	render() {
		if (this.props.row === 0) { 
			return ( <button className="cellN" > {this.state.value}</button> );
		} else { 
			return ( <button className="cell"> {this.state.value}</button> ); 
		}
	}
}

export default Cell;

