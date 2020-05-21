// Functions

module.exports = {
	getCardinalPosition: function(row, column) {
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
	},

	getWinner: function(children) {
		for (let i = 0; i < 3; i++) {
			// Test rows
			if (children[i][0] && children[i][0] === children[i][1] && children[i][0] === children[i][2]) {
				return children[i][0];
			}
			// Test columns
			if (children[0][i] && children[0][i] === children[1][i] && children[0][i] === children[2][i]) {
				return children[0][i];
			}
		}

		// Test diag 1
		if (children[0][0] && children[0][0] === children[1][1] && children[0][0] === children[2][2]) {
			return children[0][0];
		}
		// Test diag 2
		if (children[0][2] && children[0][2] === children[1][1] && children[0][2] === children[2][0]) {
			return children[0][2];
		}

		// Return null (i.e. no winner) if at least one child not full
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!children[i][j]) {return null;}
			}
		}

		// Tie in other case (i.e. no alignment and everything full)
		return "tie";
	}




}

