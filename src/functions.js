// Functions

function getCardinalPosition (row, column) {
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


function getWinner(children) {
	for (let i = 0; i < 3; i++) {
		// Test rows
		if (children[i][0] 
			&& children[i][0] === children[i][1] 
			&& children[i][0] === children[i][2]) {
			return children[i][0];
		}
		// Test columns
		if (children[0][i] 
			&& children[0][i] === children[1][i] 
			&& children[0][i] === children[2][i]) {
			return children[0][i];
		}
	}

	// Test diag 1
	if (children[0][0] 
		&& children[0][0] === children[1][1] 
		&& children[0][0] === children[2][2]) {
		return children[0][0];
	}
	// Test diag 2
	if (children[0][2] 
		&& children[0][2] === children[1][1] 
		&& children[0][2] === children[2][0]) {
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


function array2D(size, fillin) { 
	return Array.from(Array(size), () => new Array(size).fill(fillin)); 
}


function array3D(size, fillin) {
	return Array.from(Array(size), () => new module.exports.array2D(size, fillin));
}


function array4D(size, fillin) {
	return Array.from(Array(size), () => new module.exports.array3D(size, fillin));
}


async function aiMove(stage) {
	await new Promise(r => setTimeout(r, 500));
	alert("aiMove called");
	// var validMoves = module.exports.getValidMoves(stage);
	/* function minimax(validMoves, prevscore) { */
	// for (move in validMoves) {
	//     let score = calculateScore(move);
	//     if score better than prevscore => prevscore = score;
	//
	// }
	//
	/* } */
}


/* function makeMove(board, move) { */
	// if (move)
	// board[move[0]]
/* } */


function getValidMoves(board, last_move) {
	// Throw exception if last_move out of boundaries
	for (let i = 0 ; i < 4 ; i++) {
		if (last_move) {
			if (last_move[i] < 0 || last_move[i] > 2) {
				return () => {throw new RangeError("Out of boundaries")};
			}
		}
	}

	// If bigBoard
	var smallBoard;
	var validMoves = [];
	if (Array.isArray(board[0][0])) {
		// if smallBoard not won => add all valid cells from this smallBoard only
		smallBoard = board[last_move[2]][last_move[3]];
		if (!module.exports.getWinner(smallBoard)) {
			validMoves = module.exports.getValidMoves(smallBoard, [last_move[2], last_move[3], null, null]);
			return validMoves;
		}
		// if smallBoard already won => add all valid moves from all smallboards not won
		for (let i = 0; i < 3 ; i++) {
			for (let j = 0; j < 3; j++) {
				let newsmallBoard = board[i][j];
				if (!module.exports.getWinner(newsmallBoard)) {
					var validMovesSmallBoard = module.exports.getValidMoves(newsmallBoard, [i, j, null, null]);
					validMovesSmallBoard.forEach(validMove => validMoves.push(validMove));
				}
			}
		}
		// console.log(validMoves); // for tests
		return validMoves;
	}
	// If smallBoard => add all empty cells
	for (let i = 0; i < 3 ; i++) {
		for (let j = 0; j < 3; j++) {
			if (!board[i][j]) {
				validMoves.push([last_move[0], last_move[1], i, j]);
			}
		}
	}
	return validMoves;
}


function nbInAlignment(cell1, cell2, cell3, player) {
	// Return 0 if something different than player or null (i.e. opponent or tie)
	if ((cell1 && cell1 !== player) || 
		(cell2 && cell2 !== player) || 
		(cell3 && cell3 !== player)) {
		return 0;
	}
	// Otherwise, count the number of aligned with player in
	var count = 0;
	if (cell1 === player) { count += 1; }
	if (cell2 === player) { count += 1; }
	if (cell3 === player) { count += 1; }
	return count;
}


function evaluate(board, player, opponent, fixedPower = 1) {
	var score = 0;
	
	// If bigBoard => count how many small boards won in alignement and add up score
	if (Array.isArray(board[0][0])) {
		
		// Detect smallBoards won
		var wonSB = module.exports.array2D(3, null);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				wonSB[i][j] = module.exports.getWinner(board[i][j]);
			}
		}
		// Return score if bigBoard won
		if (module.exports.getWinner(wonSB) === player) { return Math.pow(10, 4); }
		else if (module.exports.getWinner(wonSB) === opponent) { return -Math.pow(10, 4); }
		// Augment score for alignments
	}

}

module.exports = {getCardinalPosition, getWinner, array2D, array3D, array4D, aiMove, getValidMoves, evaluate};

