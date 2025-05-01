"use server";
import { signIn, signOut, auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const signInAction = async () => {
	await signIn("google");
};
export const signOutAction = async () => {
	await signOut({ redirectTo: "/" });
};

export const createWorkout = async (workout) => {
	const session = await auth();
	const createdWorkout = await prisma.workout.create({
		data: {
			workout: workout.name,
			date: workout.date,
			duration: Number(workout.hours) * 60 + Number(workout.minutes),
			user: {
				connect: {
					id: session?.user?.id,
				},
			},
			exercises: {
				create: workout.exercises.map((exercise) => {
					return {
						exercise: {
							create: {
								exercise: exercise.exercise,
								target: exercise.target,
								sets: Number(exercise.sets),
								reps: Number(exercise.reps),
							},
						},
					};
				}),
			},
		},
	});
	return createdWorkout;
};

export const updateWorkout = async (workout, workoutID) => {
	const createdWorkout = await prisma.workout.update({
		where: {
			id: workoutID,
		},
		data: {
			workout: workout.name,
			date: workout.date,
			duration: Number(workout.hours) * 60 + Number(workout.minutes),
			exercises: {
				deleteMany: {},
				create: workout.exercises.map((exercise) => {
					return {
						exercise: {
							create: {
								exercise: exercise.exercise,
								target: exercise.target,
								sets: Number(exercise.sets),
								reps: Number(exercise.reps)
							},
						},
					};
				}),
			},
		},
	});
	return createdWorkout;
};

export const getWorkouts = async () => {
	const session = await auth();
	const workouts = await prisma.user.findFirst({
		where: {
			id: session?.user?.id,
		},
		include: {
			workouts: {
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
			},
		},
	});
	return workouts;
};

export const deleteWorkout = async (workoutID) => {
	const deleted = await prisma.$transaction([
		prisma.workout_Exercises.deleteMany({
			where: {
				workout_id: workoutID,
			},
		}),
		prisma.workout.delete({
			where: {
				id: workoutID,
			},
		}),
	]);
	return deleted[1];
};

export const getAllExercises = async (startDate: Date, endDate: Date, minReps: number, maxReps: number, sort: string, order: string) => {
	const session = await auth();
	const sortCol = Prisma.sql([sort]);
	const sortOrder = Prisma.sql([order]);
	let exercises = await prisma.$queryRaw`SELECT * FROM "Exercise" e \
										   JOIN "Workout_Exercises" we ON we.exercise_id = e.id \
										   JOIN "Workout" w ON we.workout_id = w.id \
										   WHERE w.user_id=${session.user.id} \
										   AND w.date >= ${startDate} AND w.date <= ${endDate} \
										   AND e.reps <= ${maxReps} AND e.reps >= ${minReps} \
										   ORDER BY ${sortCol} ${sortOrder}`;
	//console.log(exercises[0]);
	return exercises;
};

export const getAverageDuration = async (startDate: Date, endDate: Date, minReps: number, maxReps: number) => {
	const session = await auth();
	let averages = await prisma.$queryRaw`SELECT AVG(e.sets) AS avg_sets, AVG(e.reps) AS avg_reps, AVG(w.duration) AS avg_duration FROM "Exercise" e \
										   JOIN "Workout_Exercises" we ON we.exercise_id = e.id \
										   JOIN "Workout" w ON we.workout_id = w.id \
										   WHERE w.user_id=${session.user.id} \
										   AND w.date >= ${startDate} AND w.date <= ${endDate} \
										   AND e.reps <= ${maxReps} AND e.reps >= ${minReps}`;
	return {avg_sets: Number(averages[0].avg_sets), avg_reps: Number(averages[0].avg_reps), avg_duration: Number(averages[0].avg_duration)};
};

export const getTopTargets = async (startDate: Date, endDate: Date, minReps: number, maxReps: number) => {
	const session = await auth();
	let targets = await prisma.$queryRaw`SELECT e.target, SUM(e.sets) as total_sets, SUM(e.reps) as total_reps, COUNT(*) AS count \
										   FROM "Exercise" e \
										   JOIN "Workout_Exercises" we ON we.exercise_id = e.id \
										   JOIN "Workout" w ON we.workout_id = w.id \
										   WHERE w.user_id=${session.user.id} \
										   AND w.date >= ${startDate} AND w.date <= ${endDate} \
										   AND e.reps <= ${maxReps} AND e.reps >= ${minReps}\
										   GROUP BY e.target ORDER BY 2 DESC,3 DESC LIMIT 5`;
	return targets;
};

export const getTopExercises = async (startDate: Date, endDate: Date, minReps: number, maxReps: number) => {
	const session = await auth();
	let exercises = await prisma.$queryRaw`SELECT e.exercise, COUNT(*) AS count, SUM(e.sets) AS total_sets, SUM(e.reps) AS total_reps FROM "Exercise" e \
										   JOIN "Workout_Exercises" we ON we.exercise_id = e.id \
										   JOIN "Workout" w ON we.workout_id = w.id \
										   WHERE w.user_id=${session.user.id} \
										   AND w.date >= ${startDate} AND w.date <= ${endDate} \
										   AND e.reps <= ${maxReps} AND e.reps >= ${minReps}\
										   GROUP BY e.exercise ORDER BY 2 DESC, 3 DESC LIMIT 5`;
	return exercises;
};
