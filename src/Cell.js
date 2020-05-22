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
			enabled: props.enabled,
		};
	}

	render() {
		var classNameCell = "cell " + this.props.enabled;
		return ( 
			<button 
			className={classNameCell}
			onClick={() => this.props.onClick()}
			> 
			{this.props.value}
			</button> 
		); 
	}
}

export default Cell;

