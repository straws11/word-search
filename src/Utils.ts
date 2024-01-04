import { BOARD_SIZE } from "./App";
import wordset from "./better_words";
/*export async function chooseWords(wordCount: number) {
	try {
		const response = await fetch("three_plus_words.txt");
		if (!response.ok) {
			throw new Error("Network response was not ok.");
		}
		const textData = await response.text();
		var outWords: string[] = [];
		const words = textData.split(/\r?\n/);
		var count = 0;
		while (count < wordCount) {
			const random = Math.floor(Math.random() * words.length);
			if (words[random].length <= BOARD_SIZE) {
				outWords.push(words[random]);
				count++;
			}
		}
		console.log(outWords);
		return outWords;
	} catch (error) {
		console.error("There was a problem fetching the file:", error);
		return [];
	}
}*/

export function getWelcomeBoard(): string[][] {
	const welcomeGrid = [
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "W", "E", "L", "C", "O", "M", "E", "", "T", "O", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "W", "O", "R", "D", "S", "E", "A", "R", "C", "H", "!", "!", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "B", "Y", "", "", ""],
		["", "", "", "", "", "", "", "S", "T", "R", "A", "W", "S", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	];

	return welcomeGrid;
}

export function getWords(wordCount: number): string[] {
	const cats = wordset.categories;
	const categoryKeys = Object.keys(cats);
	const randomCatKey =
		categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
	const randomCat = cats[randomCatKey];
	return randomCat.values.filter((val) => val.length <= BOARD_SIZE);
}

/**
 * Generates a grid with words from the chosen category
 * @param category User's chosen category
 * @returns the grid and list of words
 */
export function generateGameData(category: string): [string[][], string[]] {
	var words: string[] = [""];
	var grid: string[][] = new Array(BOARD_SIZE)
		.fill(null)
		.map(() => new Array(BOARD_SIZE).fill(""));

	// repeatedly attempt to populate grid until successful
	// bit scuffy, but populateGrid will modify `words`, thus it will have that blank
	while (words.indexOf("") !== -1) {
		// reset vars
		words = getCategoryWords(category, Math.floor(BOARD_SIZE / 2));
		grid = new Array(BOARD_SIZE)
			.fill(null)
			.map(() => new Array(BOARD_SIZE).fill(""));
		// repopulate
		populateGrid(grid, words);
	}

	fillBlanks(grid);
	return [grid, words];
}

/**
 * Retrieves all category display names.
 */
export function getCategories(): string[] {
	const categoryKeys = Object.keys(wordset.categories);
	var displayNames: string[] = [];
	categoryKeys.forEach((val) => {
		displayNames.push(wordset.categories[val].displayName);
	});
	return displayNames;
}

/**
 * Get wordCount amount of words from categoryName category.
 */
function getCategoryWords(categoryName: string, wordCount: number): string[] {
	const catKeys = Object.keys(wordset.categories);
	var words: string[] = [];
	catKeys.forEach((val) => {
		if (wordset.categories[val].displayName === categoryName) {
			words = wordset.categories[val].values;
		}
	});

	// sort randomly, return the desired amount
	return words.sort(() => 0.5 - Math.random()).slice(0, wordCount);
}

/**
 * Attempts to add all words to the board
 * @param grid 2d array of empty strings
 * @param words array of words that need to be put into the array
 */
function populateGrid(grid: string[][], words: string[]) {
	for (let i = 0; i < words.length; i++) {
		var placed = false;
		var attempts = 0;
		while (!placed) {
			attempts++;
			if (attempts > 30) {
				// cant place it, for now just remove it
				words[i] = "";
				i--;
				break;
			}

			const direction = Math.floor(Math.random() * 4);
			const side = Boolean(Math.floor(Math.random() * 2));

			switch (direction) {
				case 0:
					placed = placeHorizontal(grid, words[i], side);
					break;
				case 1:
					placed = placeVertical(grid, words[i], side);
					break;
				case 2:
					placed = placeMainDiagonal(grid, words[i], side);
					break;
				case 3:
					placed = placeOtherDiagonal(grid, words[i], side);
					break;
			}
		}
	}
}

export function placeHorizontal(
	grid: string[][],
	word: string,
	fromLeft: boolean = true
) {
	var forward = fromLeft;
	word = forward ? word : word.split("").reduce((acc, cur) => cur + acc, "");

	for (let i = 0; i < 2; i++) {
		const x = Math.floor(Math.random() * (BOARD_SIZE - word.length));
		const y = Math.floor(Math.random() * BOARD_SIZE);

		//loop through word to check its fit
		var valid = true;
		for (let j = 0; j < word.length; j++) {
			valid = grid[y][x + j] === word[j] || grid[y][x + j] === "";
			if (!valid) break;
		}
		if (valid) {
			// this word fit on every letter, place into grid
			for (let k = 0; k < word.length; k++) {
				grid[y][x + k] = word[k];
			}
			return true; // did place it successfully
		}
		// try other direction
		forward = !forward;
		word = word.split("").reduce((acc, cur) => cur + acc, "");
	}
	return false; // neither direction worked
}

export function placeVertical(
	grid: string[][],
	word: string,
	fromTop: boolean = true
) {
	var downward = fromTop;
	word = downward ? word : word.split("").reduce((acc, cur) => cur + acc, "");
	for (let i = 0; i < 2; i++) {
		const x = Math.floor(Math.random() * BOARD_SIZE);
		const y = Math.floor(Math.random() * (BOARD_SIZE - word.length));

		var valid = true;
		for (let j = 0; j < word.length; j++) {
			valid = grid[y + j][x] === word[j] || grid[y + j][x] === "";
			if (!valid) break;
		}
		// fit on every letter, so can place here
		if (valid) {
			for (let k = 0; k < word.length; k++) {
				grid[y + k][x] = word[k];
			}
			return true; // placed successfully
		}
		// now attempt other direction
		downward = !downward;
		word = word.split("").reduce((acc, cur) => cur + acc, "");
	}
	return false;
}

export function placeMainDiagonal(
	grid: string[][],
	word: string,
	fromTop: boolean = true
) {
	var downward = fromTop;
	word = downward ? word : word.split("").reduce((acc, cur) => cur + acc, "");
	for (let i = 0; i < 2; i++) {
		const x = Math.floor(Math.random() * (BOARD_SIZE - word.length));
		const y = Math.floor(Math.random() * (BOARD_SIZE - word.length));

		var valid = true;
		for (let j = 0; j < word.length; j++) {
			valid = grid[y + j][x + j] === word[j] || grid[y + j][x + j] === "";
			if (!valid) break;
		}
		//fit on every letter, so can place here
		if (valid) {
			for (let k = 0; k < word.length; k++) {
				grid[y + k][x + k] = word[k];
			}
			return true; // placed successfully
		}
		// attempt other direction
		downward = !downward;
		word = word.split("").reduce((acc, cur) => cur + acc, "");
	}
	return false;
}

export function placeOtherDiagonal(
	grid: string[][],
	word: string,
	fromTop: boolean = true
) {
	var downward = fromTop;
	word = downward ? word : word.split("").reduce((acc, cur) => cur + acc, "");
	for (let i = 0; i < 2; i++) {
		const x =
			word.length - 1 + Math.floor(Math.random() * (BOARD_SIZE - word.length));
		const y = Math.floor(Math.random() * (BOARD_SIZE - word.length));

		var valid = true;
		for (let j = 0; j < word.length; j++) {
			valid = grid[y + j][x - j] === word[j] || grid[y + j][x - j] === "";
			if (!valid) break;
		}
		//fit on every letter, so can place here
		if (valid) {
			for (let k = 0; k < word.length; k++) {
				grid[y + k][x - k] = word[k];
			}
			return true; // placed successfully
		}
		// attempt other direction
		downward = !downward;
		word = word.split("").reduce((acc, cur) => cur + acc, "");
	}
	return false;
}

export function fillBlanks(grid: string[][]) {
	const ALPHA = "abcdefghijklmnopqrstuvwxyz";
	for (let i = 0; i < BOARD_SIZE; i++) {
		for (let j = 0; j < BOARD_SIZE; j++) {
			if (grid[j][i] === "") {
				const letter = ALPHA[Math.floor(Math.random() * 26)];
				grid[j][i] = letter.toUpperCase();
			}
		}
	}
}
