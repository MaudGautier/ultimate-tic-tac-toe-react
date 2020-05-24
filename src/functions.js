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

	// If bigBoard
	if (Array.isArray(children[0][0])) {
		var wonSB = array2D(3, null);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				wonSB[i][j] = getWinner(children[i][j])
			}
		}
		return getWinner(wonSB);
	}

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
		if (module.exports.getWinner(wonSB) === player) { return Math.pow(10, fixedPower + 3); }
		else if (module.exports.getWinner(wonSB) === opponent) { return -Math.pow(10, fixedPower + 3); }
		
		// Augment score for alignments of SB => return evaluate(wonSB, player, opponent, 1)
		score += evaluate(wonSB, player, opponent, 1);

		// Augment score for alignments within SB => return evaluate(wonSB, player, opponent, -1)
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!wonSB[i][j]) { score += evaluate(wonSB, player, opponent, -1) ;}
			}
		}
	} 

	// If smallBoard (or wonSB i.e. wonSmallBoards)
	// Augment score for alignments
	var nbAligned;
	// Rows
	for (let i = 0; i < 3 ; i++) {
		nbAligned = nbInAlignment(board[i][0], board[i][1], board[i][2], player);
		score += Math.pow(10, nbAligned + fixedPower);
		nbAligned = nbInAlignment(board[i][0], board[i][1], board[i][2], opponent);
		score -= Math.pow(10, nbAligned + fixedPower);
	}
	// Columns
	for (let j = 0; j < 3; j++) {
		nbAligned = nbInAlignment(board[0][j], board[1][j], board[2][j], player);
		score += Math.pow(10, nbAligned + fixedPower);
		nbAligned = nbInAlignment(board[0][j], board[1][j], board[2][j], opponent);
		score -= Math.pow(10, nbAligned + fixedPower);
	}
	// Diag 1
	nbAligned = nbInAlignment(board[0][0], board[1][1], board[2][2], player);
	score += Math.pow(10, nbAligned + fixedPower);
	nbAligned = nbInAlignment(board[0][0], board[1][1], board[2][2], opponent);
	score -= Math.pow(10, nbAligned + fixedPower);
	// Diag 2
	nbAligned = nbInAlignment(board[0][2], board[1][1], board[2][0], player);
	score += Math.pow(10, nbAligned + fixedPower);
	nbAligned = nbInAlignment(board[0][2], board[1][1], board[2][0], opponent);
	score -= Math.pow(10, nbAligned + fixedPower);

	// Final score
	return score;
}

function negamax(board, last_move, depth, player, opponent) {
	var validMoves = getValidMoves(board, last_move);
	var bestScore, bestMove;

	// If terminal node (i.e. no move possible) or reached AI level => evaluate score
	if (depth === 0 || validMoves.length === 0) {
		bestScore = evaluate(board, player, opponent, 1);
		return {
			score: bestScore,
			move: null
		};
	}

	// Search for best move
	bestScore = -Infinity;
	bestMove = null;
	for (let i = 0; i < validMoves.length; i++) {
		let newMove = validMoves[i];
		let newBoard = JSON.parse(JSON.stringify(board));
		newBoard[newMove[0]][newMove[1]][newMove[2]][newMove[3]] = player;
		let newScore = -module.exports.negamax(newBoard, newMove, depth - 1, opponent, player).score;
		if (newScore > bestScore) {
			bestScore = newScore;
			bestMove = newMove;
		}
	}

	// Return value
	return {
		score: bestScore,
		move: bestMove
	};

}

module.exports = {getCardinalPosition, getWinner, array2D, array3D, array4D, getValidMoves, evaluate, nbInAlignment, negamax};

