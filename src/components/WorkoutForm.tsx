"use client";
import React from "react";
import { useState, useEffect } from "react";
import Exercise from "@/components/Exercise";
import { createWorkout, updateWorkout } from "@/actions";
import { useRouter } from "next/navigation";

type WorkoutType = {
	exercises: ({
		exercise: {
			exercise: string;
			target: string;
			id: number;
		};
	} & {
		exercise_id: number;
		workout_id: number;
	})[];
} & {
	date: Date;
	id: number;
	workout: string;
	duration: number;
	user_id: string;
};

const WorkoutForm: React.FC<{ currWorkout: WorkoutType; edit: boolean }> = ({ currWorkout, edit }) => {
	const router = useRouter();
	const [exercises, setExercises] = useState(
		currWorkout.exercises.map(({ exercise }) => {
			return {
				exercise: exercise.exercise,
				target: exercise.target,
			};
		})
	);

	const [workout, setWorkout] = useState({
		name: currWorkout.workout,
		date: currWorkout.date,
		hours: Math.floor(currWorkout.duration / 60),
		minutes: currWorkout.duration % 60,
		exercises: exercises,
	});
	const [currExercise, setCurrExercise] = useState({
		exercise: "",
		target: "Pick a muscle group",
	});

	useEffect(() => {
		setWorkout((values) => ({ ...values, exercises: exercises }));
	}, [exercises]);

	const formatDate = (date : Date) => {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	};

	const addExercise = () => {
		if (currExercise.exercise && currExercise.target !== "Pick a muscle group") {
			setExercises((prev) => [...prev, { exercise: currExercise.exercise, target: currExercise.target }]);
		}
		setCurrExercise({
			exercise: "",
			target: "Pick a muscle group",
		});
	};
	const handleChange = ({ target }) => {
		setWorkout((values) => ({ ...values, [target.name]: target.value }));
	};
	const handleDateChange = ({ target }) => {
		const currDate = new Date(target.value);
		currDate.setDate(currDate.getDate() + 1);
		setWorkout((values) => ({ ...values, date: currDate }));
	};
	const handleExerciseChange = ({ target }) => {
		setCurrExercise((values) => ({ ...values, [target.name]: target.value }));
	};
	const saveWorkout = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const createdWorkout = await createWorkout(workout);
		console.log(createdWorkout);
		router.push("/workouts");
	};
	const editWorkout = async (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		const updatedWorkout = await updateWorkout(workout, currWorkout.id);
		console.log(updatedWorkout);
		router.push("/workouts");
	};
	const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quadriceps", "Hamstrings", "Glutes", "Calves", "Abs", "Other"];

	return (
		<div className="mt-2">
			<form className="flex flex-col gap-4" onSubmit={edit ? editWorkout : saveWorkout}>
				<h1 className="text-xl font-bold">{edit ? "Edit" : "New"} Workout</h1>
				<input type="text" name="name" placeholder="Workout Name..." className="input input-primary text-center w-full" value={workout.name} onChange={handleChange} required />
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Date</legend>
					<input type="date" name="date" className="input validator w-full" min="1950-01-01" max={formatDate(new Date())} value={formatDate(workout.date)} onChange={handleDateChange} required />
				</fieldset>
				<fieldset className="fieldset flex flex-row ">
					<legend className="fieldset-legend">Duration</legend>
					<label className="input validator">
						Hours
						<input type="number" name="hours" className="text-center" min="0" max="24" value={workout.hours} onChange={handleChange} />
					</label>
					<label className="input validator">
						Minutes
						<input type="number" name="minutes" className="text-center" min="0" max="60" value={workout.minutes} onChange={handleChange} />
					</label>
				</fieldset>
				<h1 className="text-xl font-bold text-center">Exercises</h1>
				{workout.exercises.length ? workout.exercises.map((exercise) => <Exercise key={exercise.exercise} name={exercise.exercise} target={exercise.target} setExercises={setExercises} />) : <p className="text-sm italic mb-2 text-center">No exercises yet.</p>}
				<div tabIndex={0} className="collapse collapse-plus border-primary border">
					<input type="checkbox" />
					<div className="collapse-title font-bold text-left">Create New Exercise</div>
					<div className="collapse-content text-sm">
						<div className="flex flex-col gap-2">
							<div className="flex flex-row gap-2">
								<input type="text" name="exercise" className="input input-sm" value={currExercise.exercise} onChange={handleExerciseChange} placeholder="Exercise name..." />
								<select name="target" className="select select-sm" value={currExercise.target} onChange={handleExerciseChange}>
									<option disabled={true}>Pick a muscle group</option>
									{muscleGroups.map((muscle) => (
										<option key={muscle}>{muscle}</option>
									))}
								</select>
							</div>
							<button className="btn btn-primary btn-sm" onClick={addExercise} type="button">
								Add Exercise
							</button>
						</div>
					</div>
				</div>
				<button className="btn btn-primary" type="submit">
					Save Workout
				</button>
				<button className="btn btn-soft" type='button' onClick={()=>router.back()}>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default WorkoutForm;
