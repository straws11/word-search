interface GameWordsProps {
	words: string[];
	foundStatus: boolean[];
}

export default function GameWords(props: GameWordsProps) {
	if (props.words.length === 0) return <></>;
	const elements = [];
	const liFormatting = "mb-4 text-lg";
	for (let i = 0; i < props.words.length; i++) {
		elements.push(
			props.foundStatus[i] ? (
				<li className={`${liFormatting} text-green-500`} key={i}>
					<s>{props.words[i]}</s>
				</li>
			) : (
				<li className={`${liFormatting}`} key={i}>
					{props.words[i]}
				</li>
			)
		);
	}

	return (
		<div className="flex flex-col bg-orange-400 items-center justify-center p-4 border border-red-500 rounded-xl shadow-2xl">
			<h1 className="text-2xl m-4 underline animate-pulse duration-700">
				Word List
			</h1>
			<ul className="space-y-4">{elements}</ul>
			<h2 className="text-xl m-4 pt-2">{`${
				props.foundStatus.filter((val) => val).length
			}/${props.words.length}`}</h2>
		</div>
	);
}
