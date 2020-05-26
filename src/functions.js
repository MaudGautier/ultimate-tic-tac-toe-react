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
	return Array.from(Array(size), () => new array2D(size, fillin));
}


function array4D(size, fillin) {
	return Array.from(Array(size), () => new array3D(size, fillin));
}


function getValidMoves(board, lastMove) {
	var validMoves = [];
	
	// If bigBoard
	if (Array.isArray(board[0][0])) {
		var smallBoard;

		// If bigBoard won => return no Valid Move
		if (getWinner(board)) { return []; }

		// if smallBoard not won => add all valid cells from this smallBoard only
		smallBoard = board[lastMove[2]][lastMove[3]];
		if (!getWinner(smallBoard)) {
			validMoves = getValidMoves(smallBoard, [lastMove[2], lastMove[3], null, null]);
			return validMoves;
		}

		// if smallBoard already won => add all valid moves from all smallboards not won
		for (let i = 0; i < 3 ; i++) {
			for (let j = 0; j < 3; j++) {
				let newSmallBoard = board[i][j];
				if (!getWinner(newSmallBoard)) {
					var validMovesSmallBoard = getValidMoves(newSmallBoard, [i, j, null, null]);
					validMovesSmallBoard.forEach(validMove => validMoves.push(validMove));
				}
			}
		}
		return validMoves;
	}

	// If smallBoard => add all empty cells
	for (let i = 0; i < 3 ; i++) {
		for (let j = 0; j < 3; j++) {
			if (!board[i][j]) {
				validMoves.push([lastMove[0], lastMove[1], i, j]);
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


function getScore(nbAligned, fixedPower) {
	if (nbAligned > 0) {
		return Math.pow(10, nbAligned + fixedPower);
	}
	return 0;
}


function evaluate(board, player, opponent, fixedPower = 1) {
	var score = 0;
	
	// If bigBoard => count how many small boards won in alignement and add up score
	if (Array.isArray(board[0][0])) {
		
		// Detect smallBoards won
		var wonSB = array2D(3, null);
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				wonSB[i][j] = getWinner(board[i][j]);
			}
		}
		
		// Return score if bigBoard won
		if (getWinner(wonSB) === player) { return Math.pow(10, fixedPower + 3); }
		else if (getWinner(wonSB) === opponent) { return -Math.pow(10, fixedPower + 3); }

		// Augment score for alignments of SB => return evaluate(wonSB, player, opponent, 1)
		score += evaluate(wonSB, player, opponent, 1);

		// Augment score for alignments within SB => return evaluate(wonSB, player, opponent, -1)
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!wonSB[i][j]) { 
					score += evaluate(board[i][j], player, opponent, -1) ;
				}
			}
		}
	} 

	// If smallBoard (or wonSB i.e. wonSmallBoards) => augment score for alignments
	var nbAligned;
	// Rows
	for (let i = 0; i < 3 ; i++) {
		nbAligned = nbInAlignment(board[i][0], board[i][1], board[i][2], player);
		score += getScore(nbAligned, fixedPower);
		nbAligned = nbInAlignment(board[i][0], board[i][1], board[i][2], opponent);
		score -= getScore(nbAligned, fixedPower);
	}
	// Columns
	for (let j = 0; j < 3; j++) {
		nbAligned = nbInAlignment(board[0][j], board[1][j], board[2][j], player);
		score += getScore(nbAligned, fixedPower);
		nbAligned = nbInAlignment(board[0][j], board[1][j], board[2][j], opponent);
		score -= getScore(nbAligned, fixedPower);
	}
	// Diag 1
	nbAligned = nbInAlignment(board[0][0], board[1][1], board[2][2], player);
	score += getScore(nbAligned, fixedPower);
	nbAligned = nbInAlignment(board[0][0], board[1][1], board[2][2], opponent);
	score -= getScore(nbAligned, fixedPower);
	// Diag 2
	nbAligned = nbInAlignment(board[0][2], board[1][1], board[2][0], player);
	score += getScore(nbAligned, fixedPower);
	nbAligned = nbInAlignment(board[0][2], board[1][1], board[2][0], opponent);
	score -= getScore(nbAligned, fixedPower);

	// Final score
	return score;
}


/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
	return array;
}


function negamax(board, lastMove, depth, player, alpha, beta) {
	var unshuffledValidMoves = getValidMoves(board, lastMove);
	var validMoves = shuffleArray(unshuffledValidMoves);
	var bestScore, bestMove, newScore;

	if (validMoves.length === 0 || depth === 0) {
		var nodeScore = evaluate(board, player, player === "X" ? "O" : "X", 1);
		return {
			score: nodeScore, 
			move: null
		};
	}
	
	bestScore = -Infinity;
	for (var i = 0; i < validMoves.length; i++) {
		var newMove = validMoves[i];
		let newBoard = JSON.parse(JSON.stringify(board));
		newBoard[newMove[0]][newMove[1]][newMove[2]][newMove[3]] = player;
		newScore = -negamax(newBoard, newMove, depth - 1, player === "X" ? "O" : "X", -beta, -alpha).score;

		if (newScore > bestScore) {
			bestScore = newScore;
			bestMove = newMove;
		}
		if (bestScore > alpha) {
			alpha = bestScore;
		}
		
		if (alpha >= beta) {
			break;
		}

	}
	return {
		score: bestScore,
		move: bestMove
	};

}



module.exports = {getCardinalPosition, getWinner, array2D, array3D, array4D, getValidMoves, evaluate, nbInAlignment, negamax};

