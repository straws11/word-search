import React, { ChangeEvent } from "react";
import { generateGameData, getCategories } from "./Utils";
import Game from "./components/Game";
import "./index.css";
import CategoryDropDown from "./components/CategoryDropDown";

export const BOARD_SIZE = 15;

function App() {
	const [category, setCategory] = React.useState("random");
	const [words, setWords] = React.useState<string[]>([]);
	const [grid, setGrid] = React.useState<string[][]>(
		new Array(BOARD_SIZE).fill(null).map(() => new Array(BOARD_SIZE).fill(""))
	);

	function onCategoryChange(event: ChangeEvent<HTMLSelectElement>) {
		setCategory(event.target.value);
	}

	function submitCategory() {
		var gameCat: string = category;
		if (category === "random") {
			const allCats = getCategories();
			gameCat = allCats[Math.floor(Math.random() * allCats.length)];
		}
		// generate a grid and words for the new game
		const [newGrid, newWords] = generateGameData(gameCat);
		setGrid(newGrid);
		setWords(newWords);
	}

	return (
		<div className="App flex flex-wrap items-start justify-center min-h-screen">
			<div className="flex-none p-4">
				<CategoryDropDown
					handleSelect={onCategoryChange}
					categories={getCategories()}
				/>
			</div>
			<div className="flex-none p-4">
				<button
					onClick={submitCategory}
					className="border border-black rounded-md p-2 m-2 bg-gray-600 text-white"
				>
					Generate Game
				</button>
			</div>
			<div className="flex-grow p-4">
				<Game gameWords={words} grid={grid} />
			</div>
		</div>
	);
}

export default App;
