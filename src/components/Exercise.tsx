const Exercise: React.FC<{
	name: string;
	target: string;
	sets: number;
	reps: number;
	setExercises: React.Dispatch<
		React.SetStateAction<
			{
				exercise: string;
				target: string;
				sets: number;
				reps: number;
			}[]
		>
	>;
}> = ({ name, target, sets, reps, setExercises }) => {
	const removeExercise = () => {
		setExercises((prev) => prev.filter((exercise) => exercise.exercise !== name || exercise.sets !== sets || exercise.reps !== reps));
	};
	return (
		<div className="flex flex-row justify-between items-center border-2 border-primary p-2 rounded-md gap-2">
			<div className="grow flex justify-start items-center flex-row gap-5">
				<h1 className="px-2 flex-1 text-left">{name}</h1>
				<h1>
					{sets} x {reps}
				</h1>
				<p className="shrink p-1 px-3 text-left rounded-full bg-opacity-20 bg-primary text-sm">{target}</p>
			</div>
			<button className="btn btn-ghost btn-circle" type="button" onClick={removeExercise}>
				x
			</button>
		</div>
	);
};

export default Exercise;
