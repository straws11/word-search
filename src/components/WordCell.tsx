import { MouseEventHandler } from "react";

interface WordCellProps {
	letter: string;
	filled: boolean;
	focused: boolean;
	handleClick: MouseEventHandler<HTMLElement>;
}

export default function WordCell(props: WordCellProps) {
	var color = props.filled ? "bg-blue-700" : "bg-white";
	if (props.focused) color = "bg-green-500";
	return (
		<div className="w-6 h-6 min-[530px]:w-8 min-[530px]:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center">
			<button
				onClick={props.handleClick}
				className={`text-md sm:text-xl md:text-2xl lg:text-3xl ${color} w-full h-full`}
			>
				{props.letter}
			</button>
		</div>
	);
}
