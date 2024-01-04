import React, { ChangeEvent } from "react";
import { generateGameData, getCategories, getWelcomeBoard } from "./Utils";
import Game from "./components/Game";
import "./index.css";
import CategoryDropDown from "./components/CategoryDropDown";

export const BOARD_SIZE = 15;

function App() {
	const [category, setCategory] = React.useState("random");
	const [words, setWords] = React.useState<string[]>([]);
	const [grid, setGrid] = React.useState<string[][]>(getWelcomeBoard());

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
		<div className="App flex flex-col w-full min-h-screen">
			<div className="w-full bg-green-400 border border-green-600 flex items-center justify-left p-4 gap-2">
				<h3 className="text-lg pr-2">Choose a Category</h3>
				<CategoryDropDown
					handleSelect={onCategoryChange}
					categories={getCategories()}
				/>
				<button
					onClick={submitCategory}
					className="border border-black rounded-md p-2 m-2 bg-gray-600 text-white"
				>
					Generate Game
				</button>
			</div>
			<div className="w-full">
				<Game gameWords={words} grid={grid} />
			</div>
		</div>
	);
}

export default App;
