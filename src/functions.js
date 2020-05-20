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
	}

}

