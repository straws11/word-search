interface GameWordsProps {
	words: string[];
	foundStatus: boolean[];
}

export default function GameWords(props: GameWordsProps) {
	if (props.words.length === 0) return <></>;
	const elements = [];
	const liFormatting = "mb-4 text-sm sm:text-md lg:text-xl text-lg";
	for (let i = 0; i < props.words.length; i++) {
		elements.push(
			props.foundStatus[i] ? (
				<li className={`${liFormatting} text-green-500`} key={i}>
					<s>{props.words[i]}</s>
				</li>
			) : (
				<li className={`${liFormatting} text-white`} key={i}>
					{props.words[i]}
				</li>
			)
		);
	}

	return (
		<div className="flex flex-col bg-blue-900 items-center justify-center p-2 xl:p-6 border border-black rounded-xl shadow-md shadow-white w-11/12 lg:w-fit">
			<h1 className="lg:text-2xl m-4 tracking-widest underline animate-pulse duration-700 text-white">
				Word List
			</h1>
			<ul className="grid grid-cols-3 min-[400px]:grid-cols-4 sm:grid-cols-5 lg:grid-cols-1 gap-x-4">
				{elements}
			</ul>
			<h2 className="text-white text-sm sm:text-lg lg:text-2xl mb-2 pt-2">{`${
				props.foundStatus.filter((val) => val).length
			}/${props.words.length}`}</h2>
		</div>
	);
}
