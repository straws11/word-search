import { MouseEventHandler } from "react";

interface InstructionsProps {
	handleToggle: MouseEventHandler<HTMLButtonElement>;
}

export default function Instructions(props: InstructionsProps) {
	return (
		<div className="fixed inset-0 flex justify-center items-center z-50">
			<div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
				<div className="bg-blue-100 p-8 rounded-lg shadow-lg w-11/12">
					<h6 className="text-xl font-bold mb-4">Game Instructions</h6>
					<p>
						Words can appear in the following ways, both forwards and backwards:
					</p>
					<ul className="list-disc list-inside">
						<li>Diagonally</li>
						<li>Horizontally</li>
						<li>Vertically</li>
					</ul>
					<br /><p>
						Select words by clicking on the starting letter of the word and then
						the ending letter. This will highlight the word and mark it as
						complete.
					</p>
					<button
						onClick={props.handleToggle}
						className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
