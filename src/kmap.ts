import { chunk } from "../lib/myStdLib";

type TruthTable = Record<string, Binary>;
type Binary = 0 | 1;

// if(1) var = [2,1] => 2bit
// if(2) var = [2,2] => 4bit
// if(3) var = [2,4] => 8bit
// if(4) var = [4,4] => 16bit

function getKmapDimension(numVars: number): [number, number] {
	const rows = Math.pow(2, Math.ceil(numVars / 2));
	const cols = Math.pow(2, Math.floor(numVars / 2));

	return [rows, cols];
}
class KMap {
	private values: Binary[];
	private cols: number;
	private rows: number;

	constructor(vars: number) {
		if (vars > 4 || vars < 1)
			throw new Error("Expected number of variables b/w 1 & 4");

		[this.rows, this.cols] = getKmapDimension(vars);

		this.values = Array.from({ length: this.rows * this.cols }, () => 0);
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
	generateTT(vars: number): TruthTable[] {
		const truthTable: TruthTable[] = [];

		for (let i = 0; i < 2 ** vars; i++) {
			const entry = {};
			for (let j = 0; j < vars; j++) {
				entry[String.fromCharCode(65 + j)] =
					(i >> (vars - 1 - j)) & (1 as Binary);
			}
			truthTable.push(entry);
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

const kmap = new KMap(4);
kmap.mapValues([2, 7, 8, 15]); // kmap.logToConsole();
kmap.logToConsole();
kmap.convertToGrayCode();
console.log();
kmap.logToConsole();

// console.table(kmap.generateTT(3));
