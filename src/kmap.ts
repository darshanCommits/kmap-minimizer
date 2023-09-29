import { chunk } from "../lib/myStdLib";

type Binary = 0 | 1;

class KMap {
	private values: Binary[];
	private cols: number;
	private rows: number;

	constructor(numRows: number, numCols: number) {
		if (numRows < 1 || numCols < 1)
			throw new Error("Rows and columns must be greater than zero.");

		this.rows = numRows;
		this.cols = numCols;
		this.values = Array.from({ length: numRows * numCols }, () => 0);
	}

	getValues() {
		return this.values;
	}

	mapValues(terms: number[]) {
		if (terms.length > this.values.length)
			throw new Error("Length of terms exceeds the length of kmap");

		this.values = this.values.map((x: Binary, i: number) =>
			terms.includes(i) ? 1 : x,
		);
		return this;
	}

	private toMatrix(): Binary[][] {
		return chunk(this.values, this.cols);
	}

	convertToGrayCode(): this {
		const matrix: Binary[][] = this.toMatrix();
		const grayCode: Binary[][] = matrix.map((x: Binary[]): Binary[] =>
			x.map(
				(value: Binary, index: number): Binary =>
					index === 1 ? ((value ^ x[index - 1]) as Binary) : value,
			),
		);

		this.values = grayCode.flat();
		return this;
	}

	logToConsole(): void {
		const matrix = this.toMatrix();
		for (const row of matrix) console.log(`${row.join(" ")}`);
	}

	getPairs(): Binary[][] {
		const matrix = this.toMatrix();
		for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {}
		}
		return matrix;
	}

	// WIP
	generateTT(): Binary[][] {
		const numRows = this.rows;
		const numCols = this.cols;

		const truthTable: Binary[][] = [];

		for (let i = 0; i < numRows; i++) {
			const row: Binary[] = [];
			for (let j = 0; j < numCols; j++) {
				row.push(0);
			}
			truthTable.push(row);
		}

		return truthTable;
	}
}

/** DS that might work for TT?? */
// const TTValue = [
// 	{ A: 0, B: 0, C: 0 },
// 	{ A: 0, B: 0, C: 1 },
// 	{ A: 0, B: 1, C: 0 },
// 	{ A: 0, B: 1, C: 1 },
// 	{ A: 1, B: 0, C: 0 },
// 	{ A: 1, B: 0, C: 1 },
// 	{ A: 1, B: 1, C: 0 },
// 	{ A: 1, B: 1, C: 1 },
// ];

const kmap = new KMap(4, 4);
kmap.mapValues([2, 7, 8, 15]); // kmap.logToConsole();
kmap.logToConsole();
kmap.convertToGrayCode();
console.log();
kmap.logToConsole();
