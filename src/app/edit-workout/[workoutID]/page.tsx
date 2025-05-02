import { prisma } from "@/lib/prisma";
import WorkoutForm from "@/components/WorkoutForm";
import { auth } from "@/lib/auth";
import Head from "next/head";
const EditWorkout = async ({ params }) => {
	// get workoutID
	const { workoutID } = await params;
	const session = await auth();

	// find current workout
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
	// check auth
	if (session.user.id !== currWorkout.user_id) {
		return <div className="text-2xl mt-2">Access Denied.</div>;
	}
	return (
		<div>
			<Head>
				<title>Edit Workout</title>
			</Head>
			<WorkoutForm currWorkout={currWorkout} edit={true} />
		</div>
	);
};

export default EditWorkout;
