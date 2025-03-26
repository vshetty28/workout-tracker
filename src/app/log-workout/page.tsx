import React from "react";
import { getExercises } from "@/actions";
import WorkoutForm from "@/components/WorkoutForm";

const LogWorkout = async () => {
	const workout = {
		name: "",
		date: new Date(),
		duration: 0,
		exercises: [],
	};
	const exerciseList = await getExercises();
	return <WorkoutForm currWorkout={workout} edit={false}/>;
};

export default LogWorkout;
