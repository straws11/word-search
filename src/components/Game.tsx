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
	const [gameWon, setGameWon] = React.useState(false);
	const [gameWordsStatus, setGameWordsStatus] = React.useState<boolean[]>([]);

	const [filledStatus, setFilledStatus] = React.useState<boolean[][]>(
		new Array(BOARD_SIZE)
			.fill(null)
			.map(() => new Array(BOARD_SIZE).fill(false))
	);

	// when a new game is created, reset stuff, fill other stuff
	React.useEffect(() => {
		const newStatus = Array.from(
			{ length: props.gameWords.length },
			() => false
		);
		setGameWordsStatus(newStatus);
		setGameWon(false);
		setMoves(0);
		setFilledStatus(
			new Array(BOARD_SIZE)
				.fill(null)
				.map(() => new Array(BOARD_SIZE).fill(false))
		);
	}, [props.gameWords]);

	function updateFoundWord(newWord: string, cells: number[][]) {
		//update which is the most recent found word, process if valid
		setMoves(moves + 1);
		newWord = newWord.toLowerCase();
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
		if (newStatus.indexOf(false) === -1) {
			processGameWon();
		} else {
			// if not won, still place the successful select sound
			const audio = new Audio(process.env.PUBLIC_URL + "/found_word.wav");
			audio.volume = 0.5;
			audio.play();
		}
	}

	function processGameWon() {
		const cacheCompletes = localStorage.getItem("wordSearchCount");
		var userCompletes = cacheCompletes ? parseInt(cacheCompletes) : 0;
		localStorage.setItem("wordSearchCount", (userCompletes + 1).toString());
		const audio = new Audio(process.env.PUBLIC_URL + "/win_game.wav");
		audio.volume = 0.5;
		audio.play();
		// delay visual to wait for sound
		setTimeout(() => {
			setGameWon(true);
		}, 1000);
	}

	function getCompletedCount() {
		return localStorage.getItem("wordSearchCount");
	}

	return (
		<div className="flex flex-col lg:flex-row items-center justify-evenly">
			{/*<h1>Moves: {moves}</h1>
			<h2>Info: {info}</h2>*/}
			{gameWon ? (
				<div className="flex flex-col items-center justify-center text-lg lg:text-2xl p-5 mt-10 border border-blue-500 bg-blue-950 text-white shadow-2xl rounded-lg">
					<h1>You found all {props.gameWords.length} words!</h1>
					<h2>
						In total, you've finished{" "}
						<div className="animate-bounce duration-1000 inline-block text-green-400 font-bold text-3xl p-2">
							{getCompletedCount()}
						</div>{" "}
						word searches!
					</h2>
				</div>
			) : (
				<>
					<GameWords words={props.gameWords} foundStatus={gameWordsStatus} />

					<Board
						grid={props.grid}
						onFind={updateFoundWord}
						size={BOARD_SIZE}
						filledCells={filledStatus}
					/>
				</>
			)}
		</div>
	);
}
