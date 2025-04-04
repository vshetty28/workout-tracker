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
							connectOrCreate: {
								where: {
									exercise: exercise.exercise,
								},
								create: {
									exercise: exercise.exercise,
									target: exercise.target,
								},
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
							connectOrCreate: {
								where: {
									exercise: exercise.exercise,
								},
								create: {
									exercise: exercise.exercise,
									target: exercise.target,
								},
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
	const workoutExercisesDeleted = await prisma.workout_Exercises.deleteMany({
		where: {
			workout_id: workoutID,
		},
	});
	const deleted = await prisma.workout.delete({
		where: {
			id: workoutID,
		},
	});
	return deleted;
};

export const getAllExercises = async (startDate : Date, endDate: Date, minDuration: number, maxDuration : number, sort: string, order: string) => {
	const session = await auth();
	const sortCol = Prisma.sql([sort]);
	const sortOrder = Prisma.sql([order]);
	let exercises = await prisma.$queryRaw`SELECT * FROM "Exercise" e \
										   JOIN "Workout_Exercises" we ON we.exercise_id = e.id \
										   JOIN "Workout" w ON we.workout_id = w.id \
										   WHERE w.user_id=${session.user.id} \
										   AND w.duration <= ${maxDuration} AND w.duration >= ${minDuration} \
										   AND w.date >= ${startDate} AND w.date <= ${endDate} \
										   ORDER BY ${sortCol} ${sortOrder}`;
	//console.log(exercises[0]);
	return exercises;
};
