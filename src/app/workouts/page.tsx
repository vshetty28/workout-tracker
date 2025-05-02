import { getWorkouts } from "@/lib/actions";
import WorkoutDetails from "@/components/WorkoutDetails";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Workouts",
};
const Workouts = async () => {
	const workouts = await getWorkouts();
	return (
		<div className="lg:w-1/3">
			<div className="flex flex-col gap-3 mt-2">
				<h1 className="text-2xl font-bold">Workouts</h1>
				<div className="flex flex-col gap-4 overflow-auto">
					{workouts.workouts.map((workout) => (
						<WorkoutDetails key={workout.id} workout={workout} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Workouts;
