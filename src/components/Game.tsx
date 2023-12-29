import React from "react";
import Board from "./Board";
import GameWords from "./GameWords";
import { getWords, populateGrid } from "../Utils";

export const BOARD_SIZE = 5;

/*interface GameProps {
	grid: string[][];
	words: string[];
}*/

export default function Game() {
	// all state variables
	const [moves, setMoves] = React.useState(0);
	const [info, setInfo] = React.useState("");

	const [gameWords, setGameWords] = React.useState<string[]>(
		getWords(BOARD_SIZE)
	);
	const [gameWordsStatus, setGameWordsStatus] = React.useState<boolean[]>([]);
	const [grid, setGrid] = React.useState<string[][]>([]);

	const [filledStatus, setFilledStatus] = React.useState(
		new Array(BOARD_SIZE)
			.fill(null)
			.map(() => new Array(BOARD_SIZE).fill(false))
	);
	// create and populate grid ONCE
	React.useEffect(() => {
		const newGrid = new Array(BOARD_SIZE)
			.fill(null)
			.map(() => new Array(BOARD_SIZE).fill(""));
		populateGrid(newGrid, gameWords);
		setGrid(newGrid);
		// update the gameWords because some might not have been successfully placed
		const newGameWords = gameWords.filter((val) => val !== "");
		setGameWords(newGameWords);
		setGameWordsStatus(
			Array.from({ length: newGameWords.length }, () => false)
		);
	}, []);

	function updateFoundWord(newWord: string, cells: number[][]) {
		//update which is the most recent found word, process if valid
		setMoves(moves + 1);

		// if not a game word, do nothing
		if (gameWords.indexOf(newWord) === -1) return;
		// is a valid game word, update which items have been found
		const newStatus = [...gameWordsStatus];
		newStatus[gameWords.indexOf(newWord)] = true;
		setGameWordsStatus(newStatus);
		// update the filledStatus to reflect newly filled cells
		const newFilled = filledStatus.map((val) => val.slice()); // deep copy
		for (let i = 0; i < cells.length; i++) {
			newFilled[cells[i][0]][cells[i][1]] = true;
		}
		setFilledStatus(newFilled);
		// determine game won
		console.log(newStatus);
		if (newStatus.indexOf(false) === -1) {
			setInfo("You found all the words, good job!");
		}
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Moves: {moves}</h1>
			<h2>Info: {info}</h2>
			{grid.length > 0 && (
				<Board
					grid={grid}
					onFind={updateFoundWord}
					size={BOARD_SIZE}
					filledCells={filledStatus}
				/>
			)}
			<GameWords words={gameWords} foundStatus={gameWordsStatus} />
		</div>
	);
}
