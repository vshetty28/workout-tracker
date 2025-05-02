import WorkoutForm from "@/components/WorkoutForm";
import { Metadata } from "next";
export const metadata: Metadata = {
	title: "Log Workout",
};
const LogWorkout = async () => {
	const workout = {
		workout: "",
		date: new Date(),
		duration: 0,
		exercises: [],
		id: -1,
		user_id: "",
	};
	return (
		<div>
			<WorkoutForm currWorkout={workout} edit={false} />
		</div>
	);
};

export default LogWorkout;
