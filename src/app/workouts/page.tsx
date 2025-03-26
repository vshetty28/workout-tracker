import React from "react";
import { getWorkouts } from "@/actions";
import WorkoutDetails from "@/components/WorkoutDetails";
const Workouts = async () => {
	const workouts = await getWorkouts();
	return (
		<div className="flex flex-col gap-3 mt-2">
			<h1 className="text-2xl font-bold">Workouts</h1>
			<div className="flex flex-col gap-4 overflow-auto">
				{workouts.workouts.map((workout) => (
					<WorkoutDetails key={workout.id} workout={workout} />
				))}
			</div>
		</div>
	);
};

export default Workouts;
