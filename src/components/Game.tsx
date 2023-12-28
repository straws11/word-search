import React from "react";
import Board from "./Board";
import GameWords from "./GameWords";
import { chooseWords, populateGrid } from "../Utils";

export const BOARD_SIZE = 8;

export default function Game() {
	//dealing with stupid textfile reading and populating grid
	const [gameWords, setGameWords] = React.useState<string[]>([]);
	const [grid, setGrid] = React.useState<string[][]>([]);

	React.useEffect(() => {
		async function fetchWords() {
			try {
				const words = await chooseWords(BOARD_SIZE);
				setGameWords(words);
			} catch (e) {
				console.error(e);
			}
		}
		fetchWords();
	}, []);

	React.useEffect(() => {
		if (gameWords.length > 0) {
			const newGrid = new Array(BOARD_SIZE)
				.fill(null)
				.map(() => new Array(BOARD_SIZE).fill(""));
			console.log(newGrid, gameWords)
			populateGrid(newGrid, gameWords);
			setGrid(newGrid);
		}
	}, [gameWords]);

	const [gameWordsStatus, setGameWordsStatus] = React.useState(
		new Array(gameWords.length).fill(false)
	);
	const [moves, setMoves] = React.useState(0);

	const [filledStatus, setFilledStatus] = React.useState(
		new Array(BOARD_SIZE)
			.fill(null)
			.map(() => new Array(BOARD_SIZE).fill(false))
	);

	// the rest

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
		//TODO determine game won
	}

	return (
		<div className="flex flex-col items-center justify-center">
			<h1>Moves: {moves}</h1>
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
