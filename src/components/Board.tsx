import React from "react";
import WordCell from "./WordCell";

interface BoardProps {
	grid: string[][];
	size: number;
	filledCells: boolean[][];
	onFind: Function;
}

export default function Board(props: BoardProps) {
	const SIZE = props.size;

	// var clickedPos: [number | null, number | null] = [null, null]; // [row, col]
	const [clickedPos, setClickedPos] = React.useState<
		[number | null, number | null]
	>([null, null]);

	const [focusStatus, setFocusStatus] = React.useState(
		new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(false))
	);

	/*const letters = new Array(SIZE)
		.fill(null)
		.map(() => new Array(SIZE).fill("a"));
*/
	const grid = props.grid;

	function isColSelect(row: number, col: number) {
		if (clickedPos[0] === null || clickedPos[1] === null) return false;
		const colTravel = Math.abs(clickedPos[0] - row);
		const rowTravel = Math.abs(clickedPos[1] - col);
		return colTravel > 0 && rowTravel === 0;
	}

	function isRowSelect(row: number, col: number) {
		if (clickedPos[0] === null || clickedPos[1] === null) return false;
		const alongColTravel = Math.abs(clickedPos[0] - row);
		const alongRowTravel = Math.abs(clickedPos[1] - col);
		return alongRowTravel > 0 && alongColTravel === 0;
	}

	function isDiagonalSelect(row: number, col: number) {
		if (clickedPos[0] === null || clickedPos[1] === null) return false;
		return Math.abs(clickedPos[0] - row) === Math.abs(clickedPos[1] - col);
	}

	function updateFocus(row: number = -1, col: number = -1) {
		// mark the cell as focused, or reset if none selected
		const newFocus = new Array(SIZE)
			.fill(null)
			.map(() => new Array(SIZE).fill(false));
		if (row !== -1 && col !== -1) newFocus[row][col] = true;
		setFocusStatus(newFocus);
	}

	function cellClick(row: number, col: number) {
		if (clickedPos[0] === null || clickedPos[1] === null) {
			setClickedPos([row, col]);
			updateFocus(row, col);
		} else if (isRowSelect(row, col)) {
			// extract selected row word text
			var word = "";
			var wordCells: number[][] = [];
			const smallest = Math.min(col, clickedPos[1]);
			for (let i = 0; i < Math.abs(col - clickedPos[1]) + 1; i++) {
				word += grid[row][smallest + i];
				wordCells.push([row, smallest + i]);
			}
			// reverse if the select was big to small index
			word =
				col < clickedPos[1]
					? word.split("").reduce((acc, cur) => cur + acc, "")
					: word;

			console.log("row word", word);
			props.onFind(word, wordCells);
			updateFocus();

			setClickedPos([null, null]);
		} else if (isColSelect(row, col)) {
			// extract selected column word text
			var word = "";
			var wordCells: number[][] = [];
			const smallest = Math.min(row, clickedPos[0]);
			for (let i = 0; i < Math.abs(row - clickedPos[0]) + 1; i++) {
				word += grid[smallest + i][col];
				wordCells.push([smallest + i, col]);
			}
			// reverse if the select was big to small index
			word =
				row < clickedPos[0]
					? word.split("").reduce((acc, cur) => cur + acc, "")
					: word;

			console.log("Col word", word);
			props.onFind(word, wordCells);
			updateFocus();
			setClickedPos([null, null]);
		} else if (isDiagonalSelect(row, col)) {
			// if same cell, ignore
			if (row == clickedPos[0]) {
				updateFocus();
				setClickedPos([null, null]);
				return;
			}

			// extract valid diagonal word text
			var word = "";
			var wordCells: number[][] = [];
			const distance = Math.abs(row - clickedPos[0]);

			for (let i = 0; i < distance + 1; i++) {
				const rowTarget =
					clickedPos[0] + ((row - clickedPos[0]) / distance) * i;
				const colTarget =
					clickedPos[1] + ((col - clickedPos[1]) / distance) * i;
				word += grid[rowTarget][colTarget];
				wordCells.push([rowTarget, colTarget]);
			}

			console.log("diag word", word);
			props.onFind(word, wordCells);
			updateFocus();
			setClickedPos([null, null]);
		} else {
			// not diagonal
			updateFocus();
			setClickedPos([null, null]);
		}
	}

	// Fill board with word cell components
	const rows: JSX.Element[] = [];

	for (let i = 0; i < SIZE; i++) {
		var row = [];
		for (let j = 0; j < SIZE; j++) {
			row.push(
				<WordCell
					key={i * SIZE + j}
					handleClick={() => cellClick(j, i)}
					letter={grid[j][i]}
					filled={props.filledCells[j][i]}
					focused={focusStatus[j][i]}
				/>
			);
		}
		rows.push(
			<div key={i} className="inline-block">
				{row}
			</div>
		);
	}

	return <div className="border border-black m-10">{rows}</div>;
}
