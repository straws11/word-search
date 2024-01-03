import React from "react";
import Board from "./Board";
import GameWords from "./GameWords";
import { BOARD_SIZE } from "../App";

interface GameProps {
	gameWords: string[];
	grid: string[][];
}

export default function Game(props: GameProps) {
	// all state variables
	const [moves, setMoves] = React.useState(0);
	const [info, setInfo] = React.useState("");

	const [gameWordsStatus, setGameWordsStatus] = React.useState<boolean[]>(
		Array.from({ length: props.gameWords.length }, () => false)
	);

	const [filledStatus, setFilledStatus] = React.useState(
		new Array(BOARD_SIZE)
			.fill(null)
			.map(() => new Array(BOARD_SIZE).fill(false))
	);

	function updateFoundWord(newWord: string, cells: number[][]) {
		//update which is the most recent found word, process if valid
		setMoves(moves + 1);

		// if not a game word, do nothing
		if (props.gameWords.indexOf(newWord) === -1) return;
		// is a valid game word, update which items have been found
		const newStatus = [...gameWordsStatus];
		newStatus[props.gameWords.indexOf(newWord)] = true;
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
			<Board
				grid={props.grid}
				onFind={updateFoundWord}
				size={BOARD_SIZE}
				filledCells={filledStatus}
			/>
			<GameWords words={props.gameWords} foundStatus={gameWordsStatus} />
		</div>
	);
}
