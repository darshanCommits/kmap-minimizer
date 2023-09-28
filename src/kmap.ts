import { chunk } from "../localLib/myStdLib";

class KMap {
	private values: number[];
	private numRows: number;
	private numCols: number;

	constructor(numRows: number, numCols: number) {
		if (numRows < 1 || numCols < 1)
			throw new Error("Rows and columns must be greater than zero.");

		this.numRows = numRows;
		this.numCols = numCols;
		this.values = Array.from({ length: numRows * numCols }, () => 0);
	}

	mapValues(terms: number[]) {
		if (terms.length > this.values.length)
			throw new Error("Length of terms exceeds the length of kmap");

		this.values = this.values.map((x: number, i: number) =>
			terms.includes(i) ? 1 : x,
		);
		return this;
	}

	private toMatrix(): number[][] {
		return chunk(this.values, this.numCols);
	}

	convertToGrayCode() {
		const matrix = this.toMatrix();
		const result = matrix.map((x) =>
			x.map((value, index) => (index ? value ^ x[index - 1] : value)),
		);

		this.values = result.flat();
		return this;
	}

	logToConsole(): void {
		const matrix = this.toMatrix();
		for (const row of matrix) {
			console.log(`${row.join(" ")}`);
		}
	}
}

const kmap = new KMap(4, 4);
kmap.mapValues([2, 7, 8, 15]);
kmap.logToConsole();

console.log();

kmap.convertToGrayCode();
kmap.logToConsole();
