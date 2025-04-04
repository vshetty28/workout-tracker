"use client";
import React from "react";
import Link from "next/link";
import { deleteWorkout } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

type WorkoutType = {
	exercises: ({
		exercise: {
			id: number;
			exercise: string;
			target: string;
		};
	} & {
		exercise_id: number;
		workout_id: number;
	})[];
} & {
	workout: string;
	id: number;
	date: Date;
	duration: number;
	user_id: string;
};

const WorkoutDetails: React.FC<{ workout: WorkoutType }> = ({ workout }) => {
	const router = useRouter();
	const handleDelete = () => {
		if (confirm(`Are you sure you want to delete ${workout.workout}?`)) {
			deleteWorkout(workout.id);
			router.refresh();
		}
	};
	const dateoptions: { year: "numeric"; month: "numeric"; day: "numeric" } = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	};
	const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	return (
		<div className="relative border-2 p-3 rounded-lg border-primary flex flex-col gap-2">
			<div className="absolute right-1 top-1 flex flex-row gap-1">
				<Link href={`/edit-workout/${workout.id}`}>
					<Image src="/edit.svg" alt="Edit" className="btn btn-xs btn-primary btn-square p-1" width={24} height={24} />
				</Link>
				<button onClick={handleDelete}>
					<Image src="/delete.svg" alt="Delete" className="btn btn-xs btn-error btn-square p-1" width={24} height={24} />
				</button>
			</div>
			<div className="mt-3">
				<h1 className="text-primary text-2xl tracking-wide font-semibold w-full">{workout.workout}</h1>
				<h1 className="text-sm font-light tracking-wide">
					<span className="text-accent">{weekday[workout.date.getDay()]}</span> {workout.date.toLocaleDateString(undefined, dateoptions)}
				</h1>
				<h2 className="text-xs">
					<em className="not-italic text-accent font-bold text-base">{workout.duration}</em> min
				</h2>
			</div>
			<div className="flex flex-col justify-center items-center gap-2">
				{workout.exercises.map((exercise) => (
					<div key={exercise.exercise.id} className="flex flex-row justify-between items-center border border-primary p-2 rounded-md gap-2 w-full">
						<div key={exercise.exercise.id} className="grow flex justify-start items-center flex-row">
							<h1 className="px-2 flex-1 text-left">{exercise.exercise.exercise}</h1>
							<p className="shrink badge badge-primary">{exercise.exercise.target}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WorkoutDetails;
