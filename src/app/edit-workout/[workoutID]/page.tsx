import React from "react";
import { prisma } from "@/prisma";
import WorkoutForm from "@/components/WorkoutForm";
import { auth } from "@/auth";
const EditWorkout = async ({ params }) => {
	const { workoutID } = await params;
    const session = await auth()
	const currWorkout = await prisma.workout.findFirst({
		where: {
			id: Number(workoutID),
		},
		include: {
			exercises: {
				include: {
					exercise: true,
				},
			},
		},
		orderBy: [
			{
				date: "desc",
			},
			{
				duration: "asc",
			},
		],
	});
    if(session.user.id !== currWorkout.user_id) {
        return <div className="text-2xl mt-2">Access Denied.</div>
    }
	return <div>
        <WorkoutForm currWorkout={currWorkout} edit={true}/>
    </div>;
};

export default EditWorkout;
