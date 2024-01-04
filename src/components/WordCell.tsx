import { MouseEventHandler } from "react";

interface WordCellProps {
	letter: string;
	filled: boolean;
	focused: boolean;
	handleClick: MouseEventHandler<HTMLElement>;
}

export default function WordCell(props: WordCellProps) {
	var color = props.filled ? "bg-orange-200" : "bg-gray-400";
	if (props.focused) color = "bg-green-500";
	return (
		<div className="w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 flex items-center justify-center">
			<button
				onClick={props.handleClick}
				className={`text-md sm:text-xl lg:text-3xl ${color} w-full h-full`}
			>
				{props.letter}
			</button>
		</div>
	);
}
