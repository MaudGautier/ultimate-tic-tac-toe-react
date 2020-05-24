import {sum, getWinner, getValidMoves, array2D, array3D, array4D, evaluate, nbInAlignment, negamax} from './functions';

// getWinner
test('getWinner', () => {
	var BB_won = array4D(3, null);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			BB_won[i][0][j][0] = "X";
		}
	}
	expect(getWinner(BB_won)).toBe("X");
})

// getValidMoves
test('getValidMoves: full smallBoard', () => {
	let smallBoard = array2D(3, "X");
	expect(getValidMoves(smallBoard, [0,0,0,0]).toBeNull);
});

test('getValidMoves: smallBoard with one position left', () => {
	let smallBoard = array2D(3, "X");
	smallBoard[0][0] = null;
	expect(getValidMoves(smallBoard, [0,0,0,0])).toEqual([[0, 0, 0, 0]]);
});

test('getValidMoves: empty smallBoard', () => {
	let smallBoard = array2D(3, null);
	let rowSB = 0;
	let colSB = 0;
	let expected_output = [
		[rowSB, colSB, 0, 0], [rowSB, colSB, 0, 1], [rowSB, colSB, 0, 2],
		[rowSB, colSB, 1, 0], [rowSB, colSB, 1, 1], [rowSB, colSB, 1, 2],
		[rowSB, colSB, 2, 0], [rowSB, colSB, 2, 1], [rowSB, colSB, 2, 2],
	];
	expect(getValidMoves(smallBoard, [rowSB, colSB, 0, 0])).toEqual(expected_output);
	expect(getValidMoves(smallBoard, [rowSB, colSB, 2, 2])).toEqual(expected_output);
});

test('getValidMoves: test out of boundaries', () => {
	let smallBoard = array2D(3, null);
	expect(getValidMoves(smallBoard, [-1, 1, 1, 1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [1, -1, 1, 1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [1, 1, -1, -1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [1, 1, -1, -1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [3, 1, 1, 1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [1, 3, 1, 1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [1, 1, 3, 1])).toThrow(RangeError);
	expect(getValidMoves(smallBoard, [1, 1, 1, 3])).toThrow(RangeError);
})

test('getValidMoves: bigBoard with smallBoard not won', () => {
	let bigBoard = array4D(3, null);
	let rowBigB = 2;
	let colBigB = 1;
	let rowSB = 2;
	let colSB = 0;
	let expected_output = [
		[rowSB, colSB, 0, 0], [rowSB, colSB, 0, 1], [rowSB, colSB, 0, 2],
		[rowSB, colSB, 1, 0], [rowSB, colSB, 1, 1], [rowSB, colSB, 1, 2],
		[rowSB, colSB, 2, 0], [rowSB, colSB, 2, 1], [rowSB, colSB, 2, 2],
	];
	// console.log(bigBoard[0][0]);
	// console.log(bigBoard[0][1]);
	// console.log(bigBoard[0][2]);
	// console.log(bigBoard[1][0]);
	// console.log(bigBoard[1][1]);
	// console.log(bigBoard[1][2]);
	// console.log(bigBoard[2][0]);
	// console.log(bigBoard[2][1]);
	// console.log(bigBoard[2][2]);
	expect(getValidMoves(bigBoard, [rowBigB,colBigB,rowSB,colSB])).toEqual(expected_output);
})

test('getValidMoves: bigBoard with smallBoard won', () => {
	let bigBoard = array4D(3, null);
	let rowBigB = 2;
	let colBigB = 1;
	let rowSB = 2;
	let colSB = 0;
	bigBoard[rowSB][colSB][0][0] = "X";
	bigBoard[rowSB][colSB][1][1] = "X";
	bigBoard[rowSB][colSB][2][2] = "X";

	let expected_output = [];
	for (let r = 0; r < 3; r++) {
		for (let c = 0; c < 3; c++) {
			if (r != rowSB || c != colSB) {
				expected_output.push(
					[r, c, 0, 0], [r, c, 0, 1], [r, c, 0, 2],
					[r, c, 1, 0], [r, c, 1, 1], [r, c, 1, 2],
					[r, c, 2, 0], [r, c, 2, 1], [r, c, 2, 2]
				);
			}
		}
	}
	// console.log(bigBoard[rowSB][colSB]);
	// getValidMoves(bigBoard, [rowBigB,colBigB,rowSB,colSB]);
	// console.log(expected_output);
	expect(getValidMoves(bigBoard, [rowBigB,colBigB,rowSB,colSB])).toEqual(expected_output);

})


// nbInAlignment
test('nbInAlignment', () => {
	var SB_3X = array2D(3, null);
	for (let i = 0; i < 3 ; i++) { SB_3X[i][i] = "X"; }
	var SB_2X = array2D(3, null);
	for (let i = 0; i < 2 ; i++) { SB_2X[i][i] = "X"; }
	var SB_1X = array2D(3, null);
	for (let i = 0; i < 1 ; i++) { SB_1X[i][i] = "X"; }
	var SB_empty = array2D(3, null);

	var SB_2X_O = array2D(3, null);
	for (let i = 0; i < 2 ; i++) { SB_2X[i][i] = "X"; }
	SB_2X_O[2][2] = "O";

	expect(nbInAlignment(SB_3X[0][0], SB_3X[1][1], SB_3X[2][2], "X")).toBe(3);
	expect(nbInAlignment(SB_2X[0][0], SB_2X[1][1], SB_2X[2][2], "X")).toBe(2);
	expect(nbInAlignment(SB_1X[0][0], SB_1X[1][1], SB_1X[2][2], "X")).toBe(1);
	expect(nbInAlignment(SB_2X_O[0][0], SB_2X_O[1][1], SB_2X_O[2][2], "X")).toBe(0);
	expect(nbInAlignment(SB_3X[0][0], SB_3X[1][1], SB_3X[2][2], "O")).toBe(0);
})


// evaluate
test('evaluate: score when bigBoard won', () => {

	var bigBoard = array4D(3, null);
	for (let i = 0; i < 3 ; i++) {
		for (let j = 0; j < 3; j++) {
			bigBoard[i][i][j][j] = "X";
		}
	}
	expect(evaluate(bigBoard, "X", "O")).toBe(10000);
	expect(evaluate(bigBoard, "X", "O", 1)).toBe(10000);
	expect(evaluate(bigBoard, "O", "X")).toBe(-10000);
	expect(evaluate(bigBoard, "O", "X", 1)).toBe(-10000);
})

test('evaluate: score for a smallboard', () => {
	var SB_3X = array2D(3, null);
	for (let i = 0; i < 3 ; i++) { SB_3X[0][i] = "X"; }

	var SB_2X = array2D(3, null);
	for (let i = 0; i < 2 ; i++) { SB_2X[0][i] = "X"; }

	var SB_1X = array2D(3, null);
	for (let i = 0; i < 1 ; i++) { SB_1X[0][i] = "X"; }

	var SB_2X_O = array2D(3, null);
	for (let i = 0; i < 2 ; i++) { SB_2X_O[i][i] = "X"; }
	SB_2X_O[2][2] = "O";

	// console.log(evaluate(SB_3X, "X", "O", -1));
	// console.log(evaluate(SB_2X, "X", "O", -1));
	// console.log(evaluate(SB_2X_O, "X", "O", -1));
	// console.log(evaluate(SB_1X, "X", "O", -1));

	expect(evaluate(SB_3X, "X", "O", -1)).toBeGreaterThan(100);
	expect(evaluate(SB_2X, "X", "O", -1)).toBeGreaterThan(10);
	expect(evaluate(SB_1X, "X", "O", -1)).toBeGreaterThan(0);
	expect(evaluate(SB_3X, "X", "O", -1)).toBeGreaterThan(evaluate(SB_2X, "X", "O", -1));
	expect(evaluate(SB_2X, "X", "O", -1)).toBeGreaterThan(evaluate(SB_1X, "X", "O", -1));

	expect(evaluate(SB_2X_O, "X", "O", -1)).toBeLessThan(evaluate(SB_2X, "X", "O", -1));
	expect(evaluate(SB_2X_O, "X", "O", -1)).toBeCloseTo(evaluate(SB_1X, "X", "O", -1), 1);

	var SB_2X_O_middle = array2D(3, null); SB_2X_O_middle[0][0] = "X" ; SB_2X_O_middle[1][1] = "O" ; SB_2X_O_middle[2][2] = "X" ;
	expect(evaluate(SB_2X_O_middle, "X", "O", -1)).toBeLessThan(evaluate(SB_2X_O, "X", "O", -1));

})


// Negamax
test('negamax: choose to win when can', () => {
	var BB = array4D(3, null);
	for (let i = 0; i < 3 ; i++) {
		for (let j = 0; j < 3 ; j++) {
			BB[0][1][i][j] = "X";
			BB[1][0][i][j] = "O";
			BB[1][1][i][j] = "O";
			BB[2][1][i][j] = "X";
			BB[0][0][i][j] = "X";
		}
	}


	BB[0][2][1][0] = "X";
	BB[0][2][2][0] = "X";
	BB[0][2][2][1] = "O";
	BB[0][2][1][2] = "O";
	BB[0][2][2][2] = "O";

	BB[1][2][0][0] = "X";
	BB[1][2][1][0] = "X";
	BB[1][2][0][1] = "O";
	BB[1][2][2][1] = "O";
	BB[1][2][1][2] = "O";

	BB[2][2][0][2] = "X";
	BB[2][2][1][2] = "X";

	BB[2][0][0][2] = "X";
	BB[2][0][1][2] = "X";
	BB[2][0][0][0] = "O";
	BB[2][0][1][0] = "O";

	// for (let i = 0; i < 3; i++) {
		// for (let j = 0; j < 3 ; j++) {
		//     console.log(i, j, BB[i][j]);
		// }
	// }

	var last_move = [0,0,0,1];

	// console.log(negamax(BB, last_move, 3, "O", "X", true));
	var bestNeg = negamax(BB, last_move, 1, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);

	var bestNeg = negamax(BB, last_move, 2, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);

	var bestNeg = negamax(BB, last_move, 3, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);

})




test('negamax: choose to win when can within ONLY 1 SB FREE', () => {
	var BB = array4D(3, null);
	for (let i = 0; i < 3 ; i++) {
		for (let j = 0; j < 3 ; j++) {
			BB[0][0][i][j] = "X";
			BB[0][1][i][j] = "X";
			BB[0][2][i][j] = "tie";
			BB[1][0][i][j] = "O";
			BB[1][1][i][j] = "O";
			BB[2][0][i][j] = "tie";
			BB[2][1][i][j] = "X";
			BB[2][2][i][j] = "tie";
		}
	}
	BB[1][2][0][0] = "X";
	BB[1][2][1][0] = "X";
	BB[1][2][0][1] = "O";
	BB[1][2][2][1] = "O";
	BB[1][2][1][2] = "O";

	/* for (let i = 0; i < 3; i++) { */
		// for (let j = 0; j < 3 ; j++) {
		//     console.log(i, j, BB[i][j]);
		// }
	/* } */

	var last_move = [0,0,0,1];

	var bestNeg = negamax(BB, last_move, 1, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);

	var bestNeg = negamax(BB, last_move, 2, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);

	var bestNeg = negamax(BB, last_move, 3, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);

	var bestNeg = negamax(BB, last_move, 4, "O", "X", true);
	expect(bestNeg.move).toEqual([1, 2, 1, 1 ]);
	expect(bestNeg.score).toBe(10000);



})




