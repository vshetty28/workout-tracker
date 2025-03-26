import React from "react";
import WorkoutForm from "@/components/WorkoutForm";

const LogWorkout = async () => {
	const workout = {
		workout: "",
		date: new Date(),
		duration: 0,
		exercises: [],
		id:-1,
		user_id:""
	};
	return <WorkoutForm currWorkout={workout} edit={false}/>;
};

export default LogWorkout;
