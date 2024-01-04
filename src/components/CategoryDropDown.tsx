import { ChangeEventHandler } from "react";

interface DropdownProps {
	categories: string[]; // change to pass full categories, or pass names AND ids
	handleSelect: ChangeEventHandler<HTMLSelectElement>;
}

export default function CategoryDropDown(props: DropdownProps) {
	const options = props.categories.map((cat, idx) => (
		<option key={idx} value={cat} className="text-xs md:text-lg">
			{cat}
		</option>
	));

	return (
		<div className="relative inline-block text-left">
			<span className="rounded-md shadow-sm text-xs md:text-lg">
				<select
					defaultValue="random"
					onChange={props.handleSelect}
					className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				>
					{options}
					<option value="random">Random</option>
				</select>
			</span>
		</div>
	);
}
