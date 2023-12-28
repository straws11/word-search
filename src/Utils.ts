import { BOARD_SIZE } from "./components/Game";
export async function chooseWords(wordCount: number) {
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
}

export function populateGrid(grid: string[][], words: string[]) {
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
		console.log("placed", words[i]);
	}

	// fill gaps
	fillBlanks(grid);
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
		console.log("AH", grid, word);
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
