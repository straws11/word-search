	import React, { ChangeEvent } from "react";
import { generateGameData, getCategories, getWelcomeBoard } from "./Utils";
import Game from "./components/Game";
import "./index.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CategoryDropDown from "./components/CategoryDropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
		<>
			<div className="App flex flex-col w-full min-h-screen bg-blue-300">
				<nav className="w-full bg-blue-700 flex items-center justify-between p-2 gap-2">
					<div className="flex items-center">
						<div className="items-center gap-3 block">
							<a href="https://straws11.github.io">
								<img
									className="max-w-12 rounded-full"
									src={process.env.PUBLIC_URL + "/favicon.ico"}
								/>
							</a>
						</div>
						<h3 className="text-xs md:text-lg p-2 text-white">
							Choose a Category
						</h3>
						<CategoryDropDown
							handleSelect={onCategoryChange}
							categories={getCategories()}
						/>
						<button
							onClick={submitCategory}
							className="text-xs md:text-xl border border-black rounded-md p-2 m-1 bg-gray-600 text-white"
						>
							Generate Game
						</button>
					</div>
					<div className="items-center gap-3 hidden md:flex">
						<FontAwesomeIcon icon={faMagnifyingGlass} />
						<h2 className="text-sm md:text-xl font-bold text-white">
							Word Search
						</h2>
					</div>
				</nav>
				<div className="w-full">
					<Game gameWords={words} grid={grid} />
				</div>
			</div>
			<div className="bg-blue-950 text-white text-sm flex justify-between items-center p-4">
				<a
					className="text-md hover:text-gray-400 hover:underline"
					href="https://straws11.github.io"
				>
					My Site
				</a>
				<div>Copyright &copy; {new Date().getFullYear()} Dylan Swarts</div>
			</div>
		</>
	);
}

export default App;
