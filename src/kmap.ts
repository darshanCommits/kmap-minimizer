import { chunk } from "../lib/myStdLib";

type Binary = 0 | 1;
type TruthTable = Record<string, Binary>;
// Truth Table is actually TruthTable[], this is singular entry represented by A:1, B:0, etc.

class KMap {
	private values: Binary[];
	private cols: number;
	private rows: number;
	private vars: number;

	constructor(vars: number) {
		if (vars > 4 || vars < 1)
			throw new Error("Expected number of variables b/w 1 & 4");

		const getKmapDimension = (numVars: number): [number, number] => [
			2 ** Math.floor(numVars / 2), // rows
			2 ** Math.ceil(numVars / 2), // cols
		];

		[this.rows, this.cols] = getKmapDimension(vars);

		this.vars = vars;
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

	generateTT(): TruthTable[] {
		const vars = this.vars;
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

	convertToGrayCode(
		truthTable: TruthTable[] = this.generateTT(),
	): TruthTable[] {
		// using this default parameter approach to avoid recreating the TT if it has been created once.

		if (truthTable.length !== this.values.length)
			throw new Error("Truth Table doesn't match the K-Map length.");
		const grayCode: TruthTable[] = [];

		for (const entry of truthTable) {
			const grayCodeEntry: TruthTable = {};

			for (let i = 0; i < this.vars; i++) {
				const variableName = String.fromCharCode(65 + i);
				const prevValue = entry[String.fromCharCode(65 + i - 1)];
				const currentValue = entry[variableName];

				grayCodeEntry[variableName] = (currentValue ^ prevValue) as Binary;
			}
			grayCode.push(grayCodeEntry);
		}

		return grayCode;
	}

	// this function to represent it
	prettyPrintGray(grayCode: TruthTable[]) {
		let output = "";

		grayCode.map((x) => {
			for (const values in x) {
				output += `${x[values]} `;
			}
			output += "\n";
		});
		return output;
	}
}

const kmap = new KMap(3);
kmap.mapValues([2, 7, 8, 15]); // kmap.logToConsole();
// kmap.logToConsole();
const tt = kmap.generateTT();
const gray = kmap.convertToGrayCode();
const pretty = kmap.prettyPrintGray(tt);
console.log("A B C");
console.log(pretty);
// kmap.logToConsole();

// console.table(kmap.generateTT(3));
