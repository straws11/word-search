import { useEffect, useState } from "react";
import Game, { BOARD_SIZE } from "./Game";
import { getWords, populateGrid } from "../Utils";

export default function Cringe() {
	const [grid, setGrid] = useState<string[][]>([]);
	const [gameWords, setGameWords] = useState<string[]>([]);

	useEffect(() => {
		async function fetchWords() {
			try {
				//const words = await chooseWords(BOARD_SIZE);
				const words = getWords(BOARD_SIZE);
				setGameWords(words);
			} catch (e) {
				console.error(e);
			}
		}
		fetchWords();
	}, []);

	useEffect(() => {
		if (gameWords.length > 0) {
			const newGrid = new Array(BOARD_SIZE)
				.fill(null)
				.map(() => new Array(BOARD_SIZE).fill(""));
			populateGrid(newGrid, gameWords);
			setGrid(newGrid);
		}
	}, [gameWords]);

	return (
		/*<Game grid={grid} words={gameWords.filter((val) => val !== "")} />*/
		<div></div>
	);
}
