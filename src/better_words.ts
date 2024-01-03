interface WordSet {
	categories: {
		[key: string]: {
			displayName: string;
			values: string[];
		};
	};
}

const wordset: WordSet = {
	categories: {
		travel: {
			displayName: "Travel",
			values: [
				"plane",
				"boat",
				"geography",
				"baggage",
				"guide",
				"sea",
				"air",
				"land",
				"holiday",
			],
		},
		classroom: {
			displayName: "Classroom",
			values: [
				"whiteboard",
				"marker",
				"crayon",
				"pencil",
				"rubber",
				"pen",
				"duster",
				"poster",
				"diagram",
				"apple",
				"colours",
				"mat",
				"books",
				"smartboard",
				"koki",
				"math",
				"english",
				"inclusive",
				"science",
				"play",
				"stickers",
				"highlighter",
				"desk",
				"chair",
			],
		},
		ice_cream: {
			displayName: "Ice Cream",
			values: [
				"chocolate",
				"brownie",
				"vanilla",
				"strawberry",
				"rockyroad",
				"custard",
				"birthday",
				"orange",
				"whitechoc",
				"rumraisin",
				"pecan",
				"cremesoda",
				"cashew",
				"pistachio",
				"amarula",
				"vegan",
				"chocchip",
			],
		},
		hobbies: {
			displayName: "Hobbies",
			values: [
				"swimming",
				"knitting",
				"writing",
				"cubing",
				"coding",
				"drawing",
				"jogging",
				"baking",
				"cooking",
				"videos",
				"decorating",
				"movies",
				"eating",
				"reading",
				"walking",
				"shopping",
				"organizing",
				"driving",
				"hunting",
				"farming",
				"journalling",
				"singing",
			],
		},
	},
};

export default wordset;
