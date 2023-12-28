interface GameWordsProps {
	words: string[];
	foundStatus: boolean[];
}

export default function GameWords(props: GameWordsProps) {
	const elements = [];
	for (let i = 0; i < props.words.length; i++) {
		elements.push(
			props.foundStatus[i] ? (
				<li>
					<s>{props.words[i]}</s>
				</li>
			) : (
				<li>{props.words[i]}</li>
			)
		);
	}

	return (
		<div>
			<ul className="list-disc">{elements}</ul>
		</div>
	);
}