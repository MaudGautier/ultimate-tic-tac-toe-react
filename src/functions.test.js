import {sum, getWinner, getValidMoves, array2D, array3D, array4D, evaluate} from './functions';

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

// EVALUATE
test('evaluate: score when bigBoard won', () => {

	var bigBoard = array4D(3, null);
	for (let i = 0; i < 3 ; i++) {
		for (let j = 0; j < 3; j++) {
			bigBoard[i][i][j][j] = "X";
		}
	}
	expect(evaluate(bigBoard, "X", "O")).toBe(10000);
	expect(evaluate(bigBoard, "O", "X")).toBe(-10000);
})

