import { MouseEventHandler } from "react";

interface WordCellProps {
	letter: string;
	filled: boolean;
	focused: boolean;
	handleClick: MouseEventHandler<HTMLElement>;
}

export default function WordCell(props: WordCellProps) {
	var color = props.filled ? "bg-orange-200" : "bg-white";
	if (props.focused) color = "bg-green-500";
	return (
		<div className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 border flex items-center justify-center">
			<button
				onClick={props.handleClick}
				className={`text-xl sm:text-2xl md:text-3xl lg:text-5xl ${color} w-full h-full`}
			>
				{props.letter}
			</button>
		</div>
	);
}
